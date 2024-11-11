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
            }
        }]
    });

    const dataForLineChart = hectareas.map(entry => entry.Total);
    const years = hectareas.map(entry => entry.Año);

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
                line: {
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    tension: 0.4
                },
                point: {
                    radius: 3,
                    backgroundColor: 'rgba(75, 192, 192, 1)'
                }
            }
        }
    };

    new Chart(document.getElementById('hectareasChart'), lineChartConfig);
});


document.addEventListener('DOMContentLoaded', function() {

    if (!localStorage.getItem('hasVisited')) {
        document.getElementById('welcomeModal').style.display = 'block';
    }
    
    
    document.getElementById('startTour').onclick = function() {
        document.getElementById('welcomeModal').style.display = 'none';
        startTour(); 
        localStorage.setItem('hasVisited', 'true');
    };
});


function startTour() {
    const tour = introJs();
    tour.setOptions({
        steps: [
            { 
                intro: "¡Bienvenido! Aquí aprenderás a usar las funciones principales de esta página."
            },
            {
                element: document.querySelector('#yearSelector'),
                intro: "Usa este selector para elegir el año que deseas visualizar en el mapa. Cambiar el año actualiza la información de hectáreas quemadas y cantidad de incendios en cada región.",
                position: 'right'
            },
            {
                element: document.querySelector('#mapContainer'),
                intro: "Este es el mapa interactivo. Pasa el cursor sobre las regiones para ver los datos específicos de hectáreas quemadas e incendios en el año seleccionado.",
                position: 'left'
            },
            {
                element: document.querySelector('#hectareasChart'),
                intro: "Este gráfico muestra la superficie total afectada por incendios forestales a lo largo de los años. Puedes pasar el cursor sobre los puntos del gráfico para ver datos específicos por año.",
                position: 'top'
            },
            {
                intro: "¡Listo! Ahora puedes explorar la página y analizar los datos a tu gusto."
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
    tour.start();
}
