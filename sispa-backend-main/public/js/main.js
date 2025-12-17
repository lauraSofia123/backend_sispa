import { fetchData } from './utils.js';

const tabla = document.getElementById('tablaAprendices');
const mensaje = document.getElementById('mensaje');

const nombreInput = document.getElementById('nombre');
const programaInput = document.getElementById('programa_id');
const instructorInput = document.getElementById('instructor_id');

const guardarBtn = document.getElementById('guardarBtn');
const recargarBtn = document.getElementById('recargarBtn');

/* Cargar aprendices */
const cargarAprendices = async () => {
  tabla.innerHTML = `<tr><td colspan="4">Cargando...</td></tr>`;

  const result = await fetchData('/aprendices');

  if (!result.success) {
    tabla.innerHTML = `<tr><td colspan="4">Error al cargar</td></tr>`;
    return;
  }

  tabla.innerHTML = '';

  result.data.forEach(aprendiz => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${aprendiz.id}</td>
      <td>${aprendiz.nombre}</td>
      <td>${aprendiz.programa_id}</td>
      <td>${aprendiz.instructor_id}</td>
    `;

    tabla.appendChild(row);
  });
};

/* Guardar aprendiz */
guardarBtn.addEventListener('click', async () => {
  mensaje.textContent = '';

  const nombre = nombreInput.value.trim();
  const programa_id = programaInput.value;
  const instructor_id = instructorInput.value;

  if (!nombre || !programa_id || !instructor_id) {
    mensaje.textContent = 'Todos los campos son obligatorios';
    return;
  }

  const result = await fetchData('/aprendices', {
    method: 'POST',
    body: JSON.stringify({
      nombre,
      programa_id,
      instructor_id
    })
  });

  if (result.success) {
    nombreInput.value = '';
    programaInput.value = '';
    instructorInput.value = '';
    cargarAprendices();
  } else {
    mensaje.textContent = 'Error al guardar aprendiz';
  }
});

/* Recargar */
recargarBtn.addEventListener('click', cargarAprendices);

/* Inicial */
cargarAprendices();
