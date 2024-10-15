// Definición de datos
var years = incendios.map(function(incendio) { return incendio.Año; });
var hects = incendios.map(function(incendio) { return (incendio.Hectareas/1000).toFixed(1); });
var posiciones = [true, true, true, true, false, true, false, true, true, false, false, true, false];

var textPositions = posiciones.map(function(pos) {
    return pos ? 'top center' : 'bottom center';
});

// Datos de tickets procesados
var processed = {
    x: years,
    y: hects,
    text: hects.map(function(h) { return '<b>' + h + '</b>'; }),
    textposition: textPositions,
    textfont: { 
        family: 'Courier New, monospace',  // Cambia el estilo de la fuente
        size: 15,                          // Ajusta el tamaño de la letra
        color: '#0D0D0D'
    },
    mode: 'lines+markers+text',
    marker: { size: 10, opacity: 1, line: { width: 3 } },
    line: { color: 'rgb(182, 0, 0)', width: 4 }
};

// Configuración del diseño del gráfico
var layout = {
    showlegend: false,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    xaxis: {
        title: "Año",
        titlefont: {
            family: 'Courier New Black',
            size: 16,
            color: '#4D1919',
            weight: 'bold'
        },
        showline: false,
        showgrid: false,
        showticklabels: true,
        linecolor: 'rgb(82, 82, 82)',
        linewidth: 2,
        autotick: false,
        tickfont: {  // Aquí aseguramos que sea igual al eje Y
            family: 'Courier New Black', // Mismo estilo
            size: 16,                   // Mismo tamaño
            color: '#4D1919'            // Mismo color
        }
    },

    yaxis: {
        title: 'Hectáreas totales quemadas (x 10^3)', // Título del eje Y
        titlefont: {
            family: 'Courier New Black',
            size: 16,
            color: '#4D1919',
            weight: 'bold'
        },
        showgrid: true,
        zeroline: false,
        showline: true,
        linewidth: 0.5,
        range: [-10, 630],
        showticklabels: true,
        linecolor: 'rgb(82, 82, 82)',
        tickfont: {  // Asegúrate de que el tickfont sea igual al del eje X
            family: 'Courier New Black', // Mismo estilo
            size: 16,                   // Mismo tamaño
            color: '#4D1919'            // Mismo color
        },
        dtick: 50,
        tickvals: [0, 100, 200, 300, 400, 500, 600],
        ticktext: ['0', '100', '200', '300', '400', '500', '600']
    },
    margin: { autoexpand: false, l: 70, r: 100, t: 130 },
};

// Genera el gráfico
Plotly.newPlot('myDiv', [processed], layout, {
    staticPlot: true,
    width: 1000,   // Ajusta el ancho del gráfico
    height: 380    // Ajusta la altura del gráfico
});
