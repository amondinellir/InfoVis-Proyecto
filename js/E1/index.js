// Definición de datos
var years = incendios.map(function(incendio) { return incendio.Año; });
var hects = incendios.map(function(incendio) { return (incendio.Hectareas/1000).toFixed(1); });
var posiciones = [true, true, true, true, false, true, false, true, true, false, false, true, false];

var textPositions = posiciones.map(function(pos) {
    return pos ? 'top center' : 'bottom center';
});




var processed = {
    x: years,
    y: hects,
    text: hects.map(function(h) { return '<b>' + h + '</b>'; }),
    textposition: textPositions,
    textfont: { 
        family: 'Courier New, monospace',  
        size: 15,                         
        color: '#0D0D0D'
    },
    mode: 'lines+markers+text',
    marker: { size: 10, opacity: 1, line: { width: 3 } },
    line: { color: 'rgb(182, 0, 0)', width: 4 }
};

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


let contextDiv = document.createElement("div");
contextDiv.setAttribute("id", "context");
contextDiv.style.margin = "20px auto";
contextDiv.style.padding = "10px";
contextDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
contextDiv.style.borderRadius = "10px";

contextDiv.innerHTML = `
  <h2>Contexto de los datos</h2>
  <p>
    Chile ha sido recurrentemente afectado por incendios forestales en las últimas décadas, impactando gravemente su superficie forestal. 
    Estos incendios tienen múltiples causas, que van desde condiciones climáticas extremas como olas de calor, hasta la intervención humana
  </p>
  <h2>Años críticos</h2>
  <p>
    <strong>2017:</strong> El año 2017 destaca por ser el más destructivo en la historia reciente,  fue una combinación de una sequía prolongada, 
    altas temperaturas y vientos fuertes, que, sumado a la intervención humana y la presencia de monocultivos inflamables (pinos y eucaliptos), 
    provocó que los incendios se extendieran rápidamente.
  </p>
  <p>
    <strong>2023:</strong> En 2023, los incendios fueron causados por olas de calor extremo, condiciones de sequía severa, y la expansión de 
    los monocultivos, factores que facilitaron la rápida propagación de los incendios. Además, la intervención humana, tanto accidental 
    como intencionada, jugó un papel importante en el inicio y la magnitud de los incendios.
  </p>
`;

document.getElementById("myDiv").appendChild(contextDiv);

let container = document.getElementById("myDiv");
container.parentNode.insertBefore(contextDiv, container);


Plotly.newPlot('myDiv', [processed], layout, {
    staticPlot: true,
    width: 1000,   
    height: 380   
});