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
        color: '#0D0D0D' },        
        /* color: 'rgb(82, 82, 82)', }, */
    mode: 'lines+markers+text',
    marker: { size: 10,	opacity: 1, line: { width: 3 } },
    line: {	color: 'rgb(182, 0, 0)', width: 4 }
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
            size: 16,  // Tamaño del texto del título
            color: '#4D1919',  // Color del texto del título
            weight: 'bold'  // Estilo del texto (negrita)
        },
        showline: true,	showgrid: false, showticklabels: true,
        linecolor: 'rgb(82, 82, 82)', linewidth: 4,	autotick: false,
        tickfont: {	family: 'Courier New Black', size: 16, color: '#4D1919'	}
    },

    yaxis: {
        title: 'Hectáreas quemadas (x 10^3)', // Título del eje Y
        titlefont: {
            family: 'Arial, sans-serif',
            size: 14,
            color: 'rgb(82, 82, 82)',
            weight: 'bold'
        },
        showgrid: true,                // Muestra las líneas de la cuadrícula
        zeroline: false,               // No muestra la línea en el cero
        showline: true,
        linewidth: 1,
        range: [-30, 630],             // Rango de los valores en el eje Y
        showticklabels: true,          // Asegura que se muestren los números en el eje Y
        linecolor: 'rgb(82, 82, 82)',
        tickfont: {
            family: 'Arial',
            size: 12,
            color: 'rgb(82, 82, 82)'
        },
        dtick: 50,                     // Espaciado entre las graduaciones (cada 50 unidades)
        tickvals: [0, 100, 200, 300, 400, 500, 600], // Opcional: valores específicos para los ticks
        ticktext: ['0', '100', '200', '300', '400', '500', '600'] // Opcional: texto específico para cada tick
    },
    margin: { autoexpand: false, l: 70, r: 100, t: 130 },
    annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: -0.04,
        y: 1.03,
        textangle: -90,
        xanchor: 'left',
        yanchor: 'top',
        text: 'Hectáreas totales quemadas (x 10^3)',
        showarrow: false,
        font: {
            family: 'Arial',
            size: 14,
            color: 'rgb(100, 100, 100)'
        }
    }]
};

/*    yaxis: {
        showgrid: false, zeroline: false, showline: true,
        linewidth: 3, range: [-30, 630], showticklabels: false, linecolor: 'rgb(82, 82, 82)',
        tickfont: { family: 'Courier New', size: 16, color: '#4D1919' }
    },
    margin: { autoexpand: false, l: 70, r: 100,	t: 130 },
    
    annotations: [{
            xref: 'paper', yref: 'paper', x: -0.04, y: 1.1, textangle: -90, xanchor: 'left', yanchor: 'top',
            text: '<b>Hectáreas totales quemadas (x10^3)</b>',
            showarrow: false, font: { family: 'Courier New', size: 16, color: '#4D1919' },
        }
    ]
}; */

// Genera el gráfico
Plotly.newPlot('myDiv', [processed], layout, {
    staticPlot: true,
    width: 1000,   // Ajusta el ancho del gráfico
    height: 450   // Ajusta la altura del gráfico
});