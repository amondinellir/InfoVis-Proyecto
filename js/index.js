// Definición de datos
var years = incendios.map(function(incendio) { return incendio.Año; });
var hects = incendios.map(function(incendio) { return (incendio.Hectareas/1000).toFixed(1); });
var posiciones = [true, true, true, true, false, true, false, true, true, false, false, true, false];

var textPositions = posiciones.map(function(pos) {
    return pos ? 'top' : 'bottom';
});

// Datos de tickets procesados
var processed = {
    x: years,
    y: hects,
    text: hects,
    textposition: textPositions,
    textfont: { color: 'rgb(82, 82, 82)', },
    mode: 'lines+markers+text',
    marker: { size: 10,	opacity: 1, line: { width: 0 } },
    line: {	color: 'rgb(182, 0, 0)', width: 4 }
};

// Configuración del diseño del gráfico
var layout = {
    showlegend: false,
    xaxis: {
        showline: true,	showgrid: false, showticklabels: true,
        linecolor: 'rgb(82, 82, 82)', linewidth: 1,	autotick: false,
        tickfont: {	family: 'Arial', size: 12, color: 'rgb(82, 82, 82)'	}
    },
    yaxis: {
        showgrid: false, zeroline: false, showline: true,
        linewidth: 1, range: [-30, 630], showticklabels: false, linecolor: 'rgb(82, 82, 82)',
        tickfont: { family: 'Arial', size: 12, color: 'rgb(82, 82, 82)' }
    },
    margin: { autoexpand: false, l: 70, r: 100,	t: 130 },
    
    annotations: [{
            xref: 'paper', yref: 'paper', x: -0.04, y: 1.03, textangle: -90, xanchor: 'left', yanchor: 'top',
            text: 'Hectáreas totales quemadas (x 10^3)',
            showarrow: false, font: { family: 'Arial', size: 13, color: 'rgb(100,100,100)' },
        }
    ]
};

// Genera el gráfico
Plotly.newPlot('myDiv', [processed], layout, {
    staticPlot: true
});