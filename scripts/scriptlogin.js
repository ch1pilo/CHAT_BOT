function loginUser(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('loginMessage');

  // Simulación básica (reemplazar con validación real)
  if (username === "admin" && password === "1234") {
    message.style.color = "green";
    message.textContent = "Inicio de sesión exitoso.";
    // Redirigir a dashboard o chat
    setTimeout(() => window.location.href = "../index.html", 1000);
  } else {
    message.style.color = "red";
    message.textContent = "Usuario o contraseña incorrectos.";
  }

  return false;
}
