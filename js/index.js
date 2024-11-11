document.addEventListener("DOMContentLoaded", async () => {
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/cl/cl-all.topo.json'
    ).then(response => response.json());

    const data = [
        { 'hc-key': 'cl-2730', id: 'IX' }, { 'hc-key': 'cl-bi', id: 'VIII' },
        { 'hc-key': 'cl-ll', id: 'X' }, { 'hc-key': 'cl-li', id: 'VI' },
        { 'hc-key': 'cl-ai', id: 'XI' }, { 'hc-key': 'cl-ma', id: 'XII' },
        { 'hc-key': 'cl-co', id: 'IV' }, { 'hc-key': 'cl-at', id: 'III' },
        { 'hc-key': 'cl-vs', id: 'V' }, { 'hc-key': 'cl-rm', id: 'RM' },
        { 'hc-key': 'cl-ar', id: 'XIV' }, { 'hc-key': 'cl-ml', id: 'VII' },
        { 'hc-key': 'cl-ta', id: 'I' }, { 'hc-key': 'cl-2740', id: 'XV' },
        { 'hc-key': 'cl-an', id: 'II' }
    ];

    function getDataForYear(year) {
        const yearDataHectareas = hectareas.find(item => item.Año === year);
        const yearDataIncendios = cant_incendios.find(item => item.Año === year);

        if (yearDataHectareas && yearDataIncendios) {
            return data.map(region => ({
                ...region,
                hectareas: yearDataHectareas[region.id] || 0,
                incendios: yearDataIncendios[region.id] || 0,
                value: yearDataHectareas[region.id] || 0 // Usa hectáreas para el color del mapa
            }));
        }
        return data;
    }

    document.getElementById('yearSelector').addEventListener('change', function() {
        const selectedYear = parseInt(this.value);
        chart.series[0].setData(getDataForYear(selectedYear));
    });

    const chart = Highcharts.mapChart('mapContainer', {
        chart: { 
            map: topology,
            width: null, // Permite que el contenedor del mapa determine su ancho
            height: null // Permite que el contenedor del mapa determine su altura
        },
        title: {
            text: 'Mapa de Incendios Forestales en Chile', 
            align: 'center', 
            style: {
                fontSize: '18px', 
                color: '#400600' 
            }
        },
        exporting: { enabled: false },
        credits: { enabled: false },
        legend: { enabled: false },
        mapNavigation: {
            enabled: true,
            buttonOptions: { verticalAlign: 'bottom' }
        },
        colorAxis: {
            min: 0,
            max: 252556.10,
            stops: [
                [0, '#FFFFFF'],
                [0.000001, '#FFEDA0'],
                [0.01, '#FEB24C'],
                [0.1, '#F03B20']
            ]
        },
        tooltip: {
            pointFormatter: function() {
                return `<b>${this.name || this.id}</b><br>Hectáreas Quemadas: ${this.hectareas}<br>Incendios: ${this.incendios}`;
            }
        },
        series: [{
            name: '',
            data: getDataForYear(2024),
            joinBy: 'hc-key',
            states: { hover: { color: '#BADA55' } },
            dataLabels: {
                enabled: true,
                format: '{point.id}'
            },
            point: {
                events: {
                    click: function() {
                        playFireSound(this.hectareas); // Reproduce sonido según hectáreas
                    }
                }
            }
        }]
    });

    const dataForLineChart = hectareas.map(entry => entry.Total);
    const years = hectareas.map(entry => entry.Año);
    const explanations = {
        2017: "El año 2017 registró una gran cantidad de incendios forestales debido a una ola de calor excepcional y condiciones extremadamente secas. Además, la actividad agrícola y la expansión urbana en áreas forestales incrementaron el riesgo.",
        2023: "En 2023, el impacto de la sequía prolongada y las altas temperaturas continuaron contribuyendo al aumento de incendios forestales, con una respuesta limitada debido a los recursos agotados."
    };
    
    const lineChartData = {
        labels: years,
        datasets: [{
            label: 'Superficie Total Afectada (Hectáreas)',
            data: dataForLineChart,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.4
        }]
    };

    const lineChartConfig = {
        type: 'line',
        data: lineChartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Superficie Total Afectada por Incendios Forestales por Año',
                    font: { size: 18 }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Año'},

                },
                y: {
                    title: { display: true, text: 'Hectáreas Quemadas' },
                    beginAtZero: true
                }
            },
            layout: {
                padding: { left: 20, right: 50, top: 10, bottom: 10 }
            },
            elements: {
                point: {
                    radius: function(context) {
                        const year = context.chart.data.labels[context.dataIndex];
                        return (year === 2017 || year === 2023) ? 6 : 3; // Aumenta el tamaño en años críticos
                    },
                    backgroundColor: function(context) {
                        const year = context.chart.data.labels[context.dataIndex];
                        return (year === 2017 || year === 2023) ? 'red' : 'rgba(75, 192, 192, 1)';
                    }
                }
            },
            // Detecta clics en puntos específicos del gráfico
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const year = lineChartData.labels[index];
                    if (explanations[year]) {
                        showModal(year);
                    }
                }
            }
        }
    };
    
    // Crear el gráfico de superficie afectada
    new Chart(document.getElementById('hectareasChart'), lineChartConfig);
});

function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.currentTime = 0; // Reinicia el audio por si se ejecuta varias veces
    audio.play().catch(error => {
        console.error("Error al reproducir el sonido:", error);
    });
}

document.addEventListener('DOMContentLoaded', function() {

    if (!localStorage.getItem('hasVisited')) {
        document.getElementById('welcomeModal').style.display = 'block';
    }
    
    
    document.getElementById('startTour').onclick = function() {
        document.getElementById('welcomeModal').style.display = 'none';
        playSound('sounds/fire-start.mp3'); 
        startTour(); 
        localStorage.setItem('hasVisited', 'true');
    };
});


function startTour() {
    const tour = introJs();
    tour.setOptions({
        steps: [
            {
                intro: "¡Bienvenido! Aquí descubrirás cómo utilizar las principales funciones de esta página para explorar los datos de incendios forestales en Chile."
            },
            {
                element: document.querySelector('#yearSelector'),
                intro: "Selecciona un año con este menú desplegable para visualizar los datos específicos de incendios y hectáreas quemadas en cada región de Chile. Al cambiar de año, se actualizarán automáticamente los datos en el mapa.",
                position: 'right'
            },
            {
                element: document.querySelector('#mapContainer'),
                intro: "Este es un mapa interactivo de Chile. Pasa el cursor sobre cada región para ver la información detallada de hectáreas quemadas y número de incendios en el año seleccionado. Al hacer clic en una región, se activará un sonido ambiental cuya intensidad varía según el impacto del incendio en esa zona.",
                position: 'left'
            },
            {
                element: document.querySelector('#hectareasChart'),
                intro: "Aquí puedes ver el gráfico de la superficie total afectada por incendios forestales a lo largo de los años. Al pasar el cursor sobre cada punto, se mostrará el dato específico para ese año. Si seleccionas los puntos de los años 2017 o 2023, considerados los más críticos, se abrirá una ventana emergente con una breve explicación sobre las razones detrás del aumento significativo de incendios en esos años.",
                position: 'top'
            },
            {
                intro: "¡Todo listo! Ahora puedes explorar y analizar los datos libremente. Disfruta de la experiencia interactiva."
            }
            
        ],
        showStepNumbers: false,
        showProgress: true,
        exitOnOverlayClick: false,
        overlayOpacity: 0.6,
        nextLabel: 'Siguiente',
        prevLabel: 'Anterior',
        doneLabel: 'Terminar'
    });
    tour.onbeforechange(function() {
        playSound('sounds/click.mp3'); 
    });

    tour.start();
}

let currentAudio = null;

function playFireSound(hectareas) {

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; 
    }

    let audio;
    if (hectareas > 1000) {
        audio = new Audio('sounds/fire.mp3'); 
        audio.volume = 1.0; 
    } else {
        audio = new Audio('sounds/fire.mp3'); 
        audio.volume = 0.3; 
    }

   
    currentAudio = audio;
    audio.play().catch(error => {
        console.error("Error al reproducir el sonido:", error);
    });
}

document.addEventListener('click', (event) => {
    if (currentAudio && !event.target.closest('#mapContainer')) { 
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null; 
    }
});


// Explicaciones de los años críticos
const explanations = {
    2017: "El año 2017 registró una gran cantidad de incendios forestales debido a una ola de calor excepcional y condiciones extremadamente secas. Además, la actividad agrícola y la expansión urbana en áreas forestales incrementaron el riesgo.",
    2023: "En 2023, el impacto de la sequía prolongada y las altas temperaturas continuaron contribuyendo al aumento de incendios forestales, con una respuesta limitada debido a los recursos agotados."
};

// Función para mostrar el modal
function showModal(year) {
    document.getElementById('modalTitle').innerText = `Explicación de Incendios en ${year}`;
    document.getElementById('modalContent').innerText = explanations[year];
    document.getElementById('explanationModal').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('explanationModal').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none';
}
