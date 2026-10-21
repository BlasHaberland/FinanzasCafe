function abrirModalIngreso(tipo) {
    console.log('Abriendo modal para:', tipo);
    document.getElementById('modalIngreso').classList.remove('hidden');
    document.getElementById('tipoIngreso').value = tipo;

    // Poner la fecha de hoy
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaVisual').value = hoy;

    // Filtrar categorías por tipo
    const select = document.getElementById('categoriaSelect');
    const opciones = select.querySelectorAll('option');

    opciones.forEach(opcion => {
        if (!opcion.value) return; // saltar el "Seleccione una categoría"
        if (opcion.getAttribute('data-tipo') === tipo) {
            opcion.style.display = '';
        } else {
            opcion.style.display = 'none';
        }
    });

    select.value = '';

    // Estilo
    const titulo = document.getElementById('modalTitulo');
    const btnGuardar = document.getElementById('btnGuardar');
    if (tipo === 'ingreso') {
        titulo.textContent = 'Agregar Nuevo Ingreso';
        btnGuardar.textContent = 'Guardar Ingreso';
        btnGuardar.className = 'bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition';
    } else {
        titulo.textContent = 'Agregar Nuevo Gasto';
        btnGuardar.textContent = 'Guardar Gasto';
        btnGuardar.className = 'bg-red-900 text-white px-4 py-2 rounded hover:bg-red-800 transition';
    }
}
function cerrarModalIngreso() {
    document.getElementById('modalIngreso').classList.add('hidden');
}