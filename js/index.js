document.addEventListener("DOMContentLoaded", async () => {
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/cl/cl-all.topo.json'
    ).then(response => response.json());
    

    // Prepare demo data. The data is joined to map using the value of the 'hc-key'
    const data = [
        ['cl-2730', 10], ['cl-bi', 11], ['cl-ll', 12], ['cl-li', 13],
        ['cl-ai', 14], ['cl-ma', 15], ['cl-co', 16], ['cl-at', 17],
        ['cl-vs', 18], ['cl-rm', 19], ['cl-ar', 20], ['cl-ml', 21],
        ['cl-ta', 22], ['cl-2740', 23], ['cl-an', 24]
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
            min: 10,
            max: 24,
            stops: [
                [0, '#FFFFFF'],   // White at the minimum value
                [0.2, '#FFEDA0'], // Light yellow
                [0.6, '#FEB24C'], // Intermediate orange
                [1, '#F03B20']    // Dark red at the maximum value
            ]
        },
        series: [{
            data: data,
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: false,
                format: '{point.name}'
            }
        }],
        legend: {enabled: false}
    });
});
