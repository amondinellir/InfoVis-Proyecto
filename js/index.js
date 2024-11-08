document.addEventListener("DOMContentLoaded", async () => {
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/cl/cl-all.topo.json'
    ).then(response => response.json());
    

    // Prepare demo data. The data is joined to map using the value of the 'hc-key'
    const data = [
        { 'hc-key': 'cl-2730', value: 10, id: 'IX' },
        { 'hc-key': 'cl-bi', value: 11, id: 'VIII' },
        { 'hc-key': 'cl-ll', value: 12, id: 'X' },
        { 'hc-key': 'cl-li', value: 13, id: 'VI' },
        { 'hc-key': 'cl-ai', value: 14, id: 'XI' },
        { 'hc-key': 'cl-ma', value: 15, id: 'XII' },
        { 'hc-key': 'cl-co', value: 16, id: 'IV' },
        { 'hc-key': 'cl-at', value: 17, id: 'III' },
        { 'hc-key': 'cl-vs', value: 18, id: 'V' },
        { 'hc-key': 'cl-rm', value: 19, id: 'RM' },
        { 'hc-key': 'cl-ar', value: 20, id: 'XIV' },
        { 'hc-key': 'cl-ml', value: 21, id: 'VII' },
        { 'hc-key': 'cl-ta', value: 22, id: 'I' },
        { 'hc-key': 'cl-2740', value: 23, id: 'XV' },
        { 'hc-key': 'cl-an', value: 24, id: 'II' }
    ];

    // Create the map
    Highcharts.mapChart('mapContainer', {
        chart: {map: topology},
        title: {text: ''},

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        exporting: {enabled: false},
        credits: {enabled: false},
        colorAxis: {
            min: 0,
            max: 30, // Debe ser 252556.10
            stops: [
                [0, '#FFFFFF'],   // White at the minimum value
                [0.2, '#FFEDA0'], // Light yellow
                [0.6, '#FEB24C'], // Intermediate orange
                [1, '#F03B20']    // Dark red at the maximum value
            ]
        },
        series: [{
            data: data,
            joinBy: 'hc-key',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.id}'
            }
        }],
        legend: {enabled: false}
    });
});
