const agregarBtn = document.getElementById('agregar-btn');
const nuevaTareaInput = document.getElementById('nueva-tarea');
const listaTareas = document.getElementById('lista-tareas');

// Función para guardar todas las tareas en LocalStorage
function guardarTareas() {
  const tareas = [];
  document.querySelectorAll('#lista-tareas li').forEach(li => {
    tareas.push({
      texto: li.childNodes[0].nodeValue,
      completada: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para crear una tarea en el DOM
function crearTarea(t) {
  const li = document.createElement('li');
  li.textContent = t.texto;

  if (t.completada) {
    li.classList.add('completed');
  }

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    guardarTareas(); // GUARDAMOS CAMBIOS
  });

  const eliminarBtn = document.createElement('button');
  eliminarBtn.textContent = 'X';
  eliminarBtn.addEventListener('click', () => {
    listaTareas.removeChild(li);
    guardarTareas(); // GUARDAMOS CAMBIOS
  });

  li.appendChild(eliminarBtn);
  listaTareas.appendChild(li);
}

// Al hacer click en el botón, agregamos una nueva tarea
agregarBtn.addEventListener('click', () => {
  const tareaTexto = nuevaTareaInput.value.trim();
  if (tareaTexto !== "") {
    const tareaObj = { texto: tareaTexto, completada: false };
    crearTarea(tareaObj);
    guardarTareas(); // GUARDAMOS CAMBIOS
    nuevaTareaInput.value = '';
  }
});

// Cargamos las tareas guardadas al iniciar la página
window.addEventListener('load', () => {
  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareas.forEach(t => crearTarea(t));
});