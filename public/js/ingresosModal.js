
// Mostrar el modal y poner la fecha de hoy por defecto
function abrirModalIngreso() {
    console.log('entre');
    document.getElementById('modalIngreso').classList.remove('hidden');

    // Cargar la fecha actual (solo formato YYYY-MM-DD)
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

    // Obtenemos el valor del atributo data-tipo (por ejemplo: "ingreso")
    const tipoAsociado = opcionSeleccionada.getAttribute('data-tipo');

    if (tipoAsociado) {
        document.getElementById('tipoIngreso').value = tipoAsociado;
    }
}

// Antes de enviar el formulario, combinar el día seleccionado con la hora actual
document.getElementById('formIngreso').addEventListener('submit', function (e) {
    const fechaElegida = document.getElementById('fechaVisual').value; // Ej: "2026-10-13"

    // Obtenemos la hora local actual (Ej: "14:30:00")
    const ahora = new Date();
    const horaExacta = ahora.toTimeString().split(' ')[0];

    // Juntamos ambas partes para la base de datos de MySQL
    const fechaFormateada = `${fechaElegida} ${horaExacta}`;

    // Se lo asignamos al input oculto que viaja al backend
    document.getElementById('fechaReal').value = fechaFormateada;
});
