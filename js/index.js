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
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4
        }]
    };

    const lineChartConfig = {
        type: 'line',
        data: lineChartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#FFFFFF' }
                },
                title: {
                    display: true,
                    text: 'Superficie Total Afectada por Incendios Forestales por Año',
                    color: '#FFFFFF',
                    font: { size: 18 }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Año', color: '#FFFFFF' },
                    ticks: { color: '#FFFFFF' }
                },
                y: {
                    title: { display: true, text: 'Hectáreas Quemadas', color: '#FFFFFF' },
                    ticks: { color: '#FFFFFF' },
                    beginAtZero: true
                }
            },
            layout: {
                padding: { left: 20, right: 20, top: 20, bottom: 20 }
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
