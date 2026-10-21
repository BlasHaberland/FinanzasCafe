// public/js/estadisticas.js

const contenedorDatos = document.getElementById('datosServidor');

const ingresosPorCategoria = JSON.parse(contenedorDatos.dataset.ingresos || "[]");
const egresosPorCategoria = JSON.parse(contenedorDatos.dataset.egresos || "[]");
const totales = JSON.parse(contenedorDatos.dataset.totales || "[]");

const totalIngreso = Number(totales.find(t => t.tipo === 'ingreso')?.total || 0);
const totalEgreso = Number(totales.find(t => t.tipo === 'egreso')?.total || 0);
const balanceTotal = totalIngreso - totalEgreso;

new Chart(document.getElementById('chartIngresos'), {
    type: 'bar',
    data: {
        labels: ingresosPorCategoria.map(i => i.nombre),
        datasets: [{
            label: 'Ingresos ($)',
            data: ingresosPorCategoria.map(i => i.total),
            backgroundColor: 'rgb(21, 128, 61)',
            borderColor: 'rgb(21, 128, 61)',
            borderWidth: 1,
            borderRadius: 6,
        }]
    },
    options: { responsive: true, aspectRatio: 2, plugins: { legend: { display: false } } }
});

new Chart(document.getElementById('chartEgresos'), {
    type: 'bar',
    data: {
        labels: egresosPorCategoria.map(e => e.nombre),
        datasets: [{
            label: 'Gastos ($)',
            data: egresosPorCategoria.map(e => e.total),
            backgroundColor: 'rgb(127, 29, 29)',
            borderColor: 'rgb(127, 29, 29)',
            borderWidth: 1,
            borderRadius: 6,
        }]
    },
    options: { responsive: true, aspectRatio: 2, plugins: { legend: { display: false } } }
});


// PLUGIN: Escribe el balance y escala usando píxeles para que nunca desborde
const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: function (chart) {
        let ctx = chart.ctx;
        let chartArea = chart.chartArea;

        if (!chartArea) return;

        ctx.restore();

        let text = "$" + balanceTotal.toFixed(2);

        // 1. Usamos un tamaño base en píxeles para poder medir con precisión
        let baseFontSize = 25;
        ctx.font = "bold " + baseFontSize + "px sans-serif";

        // 2. Medimos cuánto ocupa ese texto y cuánto espacio real tenemos (85% del agujero)
        let textWidth = ctx.measureText(text).width;
        let availableWidth = (chart.innerRadius * 2) * 0.85;

        // 3. Calculamos la escala exacta
        let scaleFactor = availableWidth / textWidth;

        // 4. Aplicamos la escala al tamaño base (y ponemos un límite máximo para que los números cortos no sean gigantes)
        let finalFontSize = Math.min(baseFontSize * scaleFactor, chart.innerRadius * 0.6);

        ctx.font = "bold " + finalFontSize + "px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        let centerX = (chartArea.left + chartArea.right) / 2;
        let centerY = (chartArea.top + chartArea.bottom) / 2;

        ctx.fillStyle = balanceTotal >= 0 ? 'rgb(21, 128, 61)' : 'rgb(127, 29, 29)';
        ctx.fillText(text, centerX, centerY);
        ctx.save();
    }
};

new Chart(document.getElementById('chartBalance'), {
    type: 'doughnut',
    data: {
        labels: ['Ingresos', 'Gastos'],
        datasets: [{
            data: [totalIngreso, totalEgreso],
            backgroundColor: ['rgb(21, 128, 61)', 'rgb(127, 29, 29)'],
            borderColor: ['rgb(21, 128, 61)', 'rgb(127, 29, 29)'],
            borderWidth: 2,
        }]
    },
    options: { responsive: true, aspectRatio: 1.5, cutout: '75%' },
    plugins: [centerTextPlugin]
});