function guardarSolucion(event) {
  event.preventDefault();

  const problema = document.getElementById('problema').value.trim();
  const solucion = document.getElementById('solucion').value.trim();
  const status = document.getElementById('statusMessage');

  if (problema === '' || solucion === '') {
    status.style.color = 'red';
    status.textContent = 'Todos los campos son obligatorios.';
    return false;
  }

  // Aquí podrías enviar los datos a una API, localStorage o base de datos.
  console.log('Problema:', problema);
  console.log('Solución:', solucion);

  status.style.color = 'green';
  status.textContent = 'Solución guardada correctamente.';

  setTimeout(() => {
    document.getElementById('problema').value = '';
    document.getElementById('solucion').value = '';
    status.textContent = '';
  }, 2000);

  return false;
}
