document.addEventListener("DOMContentLoaded", async () => {
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/cl/cl-all.topo.json'
    ).then(response => response.json());
    

    // Prepare demo data. The data is joined to map using the value of the 'hc-key'
    const data = [
        { 'hc-key': 'cl-2730', value: 10, customInfo: 'IX' },
        { 'hc-key': 'cl-bi', value: 11, customInfo: 'VIII' },
        { 'hc-key': 'cl-ll', value: 12, customInfo: 'X' },
        { 'hc-key': 'cl-li', value: 13, customInfo: 'VI' },
        { 'hc-key': 'cl-ai', value: 14, customInfo: 'XI' },
        { 'hc-key': 'cl-ma', value: 15, customInfo: 'XII' },
        { 'hc-key': 'cl-co', value: 16, customInfo: 'IV' },
        { 'hc-key': 'cl-at', value: 17, customInfo: 'III' },
        { 'hc-key': 'cl-vs', value: 18, customInfo: 'V' },
        { 'hc-key': 'cl-rm', value: 19, customInfo: 'RM' },
        { 'hc-key': 'cl-ar', value: 20, customInfo: 'XIV' },
        { 'hc-key': 'cl-ml', value: 21, customInfo: 'VII' },
        { 'hc-key': 'cl-ta', value: 22, customInfo: 'I' },
        { 'hc-key': 'cl-2740', value: 23, customInfo: 'XV' },
        { 'hc-key': 'cl-an', value: 24, customInfo: 'II' }
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
            max: 252556.10,
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
                format: '{point.customInfo}'
            }
        }],
        legend: {enabled: false}
    });
});
