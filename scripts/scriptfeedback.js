function enviarFeedback(event) {
  event.preventDefault();

  const select = document.getElementById('satisfaccion');
  const comentario = document.getElementById('comentario').value.trim();
  const status = document.getElementById('feedbackStatus');

  if (!select.value) {
    status.style.color = 'red';
    status.textContent = 'Por favor selecciona una opción.';
    return false;
  }

  console.log('Valoración:', select.value);
  console.log('Comentario:', comentario);

  status.style.color = 'green';
  status.textContent = '¡Gracias por tu opinión!';

  setTimeout(() => {
    select.selectedIndex = 0;
    document.getElementById('comentario').value = '';
    status.textContent = '';
  }, 2000);

  return false;
}
