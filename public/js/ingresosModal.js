function abrirModalIngreso(tipo) {
    document.getElementById('modalIngreso').classList.remove('hidden');
    document.getElementById('tipoIngreso').value = tipo;

    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaVisual').value = hoy;

    const select = document.getElementById('categoriaSelect');
    const opciones = select.querySelectorAll('option');
    opciones.forEach(opcion => {

        if (!opcion.value) return;
        if (opcion.getAttribute('data-tipo') === tipo) {
            opcion.style.display = '';
        } else {
            opcion.style.display = 'none';
        }
    });

    select.value = '';

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

document.getElementById('formIngreso').addEventListener('submit', function () {
    const fechaElegida = document.getElementById('fechaVisual').value;
    const ahora = new Date();
    const horaExacta = ahora.toTimeString().split(' ')[0];
    document.getElementById('fechaReal').value = `${fechaElegida} ${horaExacta}`;
});