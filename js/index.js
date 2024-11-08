document.addEventListener("DOMContentLoaded", async () => {
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/cl/cl-all.topo.json'
    ).then(response => response.json());
    

    // Prepare demo data. The data is joined to map using the value of the 'hc-key'
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

    // Create the map
    const chart = Highcharts.mapChart('mapContainer', {
        chart: {map: topology},
        title: {text: ''},
        exporting: {enabled: false},
        credits: {enabled: false},
        legend: {enabled: false},

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        
        colorAxis: {
            min: 0,
            max: 252556.10,
            stops: [
                [0, '#FFFFFF'],   // White at the minimum value
                [0.000001, '#FFEDA0'], // Light yellow
                [0.4, '#FEB24C'], // Intermediate orange
                [1, '#F03B20']    // Dark red at the maximum value
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
});
