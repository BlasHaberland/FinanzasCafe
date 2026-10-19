
function abrirModalIngreso() {
    console.log('entre');
    document.getElementById('modalIngreso').classList.remove('hidden');

    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaVisual').value = hoy;
}

function cerrarModalIngreso() {
    document.getElementById('modalIngreso').classList.add('hidden');
}

// Leer el tipo asociado a la categoría seleccionada
function actualizarTipoCategoria() {
    const select = document.getElementById('categoriaSelect');
    const opcionSeleccionada = select.options[select.selectedIndex];

    const tipoAsociado = opcionSeleccionada.getAttribute('data-tipo');

    if (tipoAsociado) {
        document.getElementById('tipoIngreso').value = tipoAsociado;
    }
}

// Antes de enviar el formulario, combinar el día seleccionado con la hora actual
document.getElementById('formIngreso').addEventListener('submit', function (e) {
    const fechaElegida = document.getElementById('fechaVisual').value;

    const ahora = new Date();
    const horaExacta = ahora.toTimeString().split(' ')[0];

    const fechaFormateada = `${fechaElegida} ${horaExacta}`;

    document.getElementById('fechaReal').value = fechaFormateada;
});
