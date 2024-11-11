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
        const yearData = hectareas.find(item => item.Año === year);
        if (yearData) {
            return data.map(region => ({
                ...region,
                value: yearData[region.id] || 0
            }));
        }
        return data;
    }

    document.getElementById('yearSelector').addEventListener('change', function() {
        const selectedYear = parseInt(this.value);
        chart.series[0].setData(getDataForYear(selectedYear));
    });

    const chart = Highcharts.mapChart('mapContainer', {
        chart: { map: topology },
        title: { text: '' },
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
        series: [{
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

    // --- Integración de sonido de fuego ---

    // Cargar el sonido de fuego
    const fireSound = new Tone.Player("sounds/fuego.mp3").toDestination();
    fireSound.loop = true; // Hacer que el sonido se repita mientras el cursor esté en la región

    // Función para ajustar el volumen según hectáreas quemadas
    function setVolumeByHectares(hectareas) {
        const maxHectareas = 252556.10; // Valor máximo de hectáreas según los datos
        const volume = -30 + (30 * (hectareas / maxHectareas)); // Escala de -30 dB a 0 dB
        fireSound.volume.value = volume;
    }

    // Función para manejar el evento mouseover en la región del mapa
    function onRegionHover(event) {
        const regionId = event.point.id; // Id de la región seleccionada
        const selectedYear = parseInt(document.getElementById('yearSelector').value);
        
        // Obtener el valor de hectáreas quemadas para la región y año seleccionados
        const yearData = hectareas.find(item => item.Año === selectedYear);
        const hectareasQuemadas = yearData ? yearData[regionId] || 0 : 0;
        
        // Ajustar volumen según las hectáreas y comenzar el sonido
        setVolumeByHectares(hectareasQuemadas);
        fireSound.start();
    }

    // Detener el sonido cuando se sale de la región
    function onRegionOut() {
        fireSound.stop();
    }

    // Configurar los eventos para las regiones del mapa
    chart.series[0].points.forEach(point => {
        point.on('mouseOver', onRegionHover);
        point.on('mouseOut', onRegionOut);
    });

    // Iniciar el sonido al cargar la página para probarlo
    fireSound.start();
});
