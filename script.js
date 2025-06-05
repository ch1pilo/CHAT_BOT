document.addEventListener('DOMContentLoaded', () => {
    const droopyCharacter = document.getElementById('droopyCharacter');
    const leftPupil = document.getElementById('left-pupil');
    const rightPupil = document.getElementById('right-pupil');
    const leftEye = document.getElementById('left-eye');
    const rightEye = document.getElementById('right-eye');
    const droopyExpressionElement = document.getElementById('droopyExpression');
    const thinkingBubble = document.getElementById('thinking-bubble');
    const droopyTextElement = document.getElementById('droopyText');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    // const droopyBaseImage = document.getElementById('droopyBaseImage'); // Si cambias toda la imagen

    // --- Configuración de Droopy ---
    const expressions = [
        { name: "Neutral", image: "placeholder_droopy_neutral.png" }, // Reemplaza con tus imágenes
        { name: "Contento", image: "placeholder_droopy_happy.png" },
        { name: "Pensativo", image: "placeholder_droopy_thinking.png" }
    ];
    let currentExpressionIndex = 0;
    const expressionChangeInterval = 10000; // 10 segundos
    const blinkInterval = 5000; // Parpadeo cada 5 segundos
    const thinkingTime = 3000; // 3 segundos de "pensando"
    const typingSpeed = 50; // Milisegundos por caracter

    // --- Movimiento de Ojos ---
    document.addEventListener('mousemove', (e) => {
        if (!leftPupil || !rightPupil) return; // Si no existen los elementos

        const movePupil = (pupil, eye) => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;

            // Diferencia entre el centro del ojo y el cursor
            let deltaX = e.clientX - eyeCenterX;
            let deltaY = e.clientY - eyeCenterY;

            // Limitar el movimiento para que la pupila no se salga del ojo
            // Estos valores son empíricos, ajústalos según el tamaño de tu pupila y ojo
            const maxPupilMoveX = eyeRect.width / 4;
            const maxPupilMoveY = eyeRect.height / 4;

            deltaX = Math.max(-maxPupilMoveX, Math.min(maxPupilMoveX, deltaX));
            deltaY = Math.max(-maxPupilMoveY, Math.min(maxPupilMoveY, deltaY));
            
            pupil.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        };

        movePupil(leftPupil, leftEye);
        movePupil(rightPupil, rightEye);
    });

    // --- Parpadeo ---
    function blink() {
        if (!leftEye || !rightEye) return;
        leftEye.classList.add('blinking');
        rightEye.classList.add('blinking');

        // Alternativa si cambias src de imagen:
        // leftEye.src = 'droopy_eyes_blink_full.png';
        // rightEye.src = 'droopy_eyes_blink_full.png';

        setTimeout(() => {
            leftEye.classList.remove('blinking');
            rightEye.classList.remove('blinking');
            // leftEye.src = 'droopy_eyes_open.png';
            // rightEye.src = 'droopy_eyes_open.png';
        }, 200); // Duración del parpadeo
    }
    setInterval(blink, blinkInterval);

    // --- Cambio de Expresión ---
    function changeExpression() {
        currentExpressionIndex = (currentExpressionIndex + 1) % expressions.length;
        const newExpression = expressions[currentExpressionIndex];
        
        // Opción 1: Cambiar el texto del overlay (como está ahora)
        droopyExpressionElement.textContent = newExpression.name;

        // Opción 2: Cambiar la imagen base de Droopy (si cada expresión es una imagen completa)
        // droopyBaseImage.src = newExpression.image;

        // Opción 3: Si tienes una capa de expresión PNG transparente sobre una base
        // droopyExpressionOverlayImageElement.src = newExpression.image; // Necesitarías otro <img>
        
        console.log("Expresión cambiada a:", newExpression.name);
    }
    setInterval(changeExpression, expressionChangeInterval);

    // --- Escritura Letra por Letra ---
    function typeMessage(message, callback) {
        droopyTextElement.textContent = '';
        let i = 0;
        function typeChar() {
            if (i < message.length) {
                droopyTextElement.textContent += message.charAt(i);
                i++;
                setTimeout(typeChar, typingSpeed);
            } else if (callback) {
                callback();
            }
        }
        typeChar();
    }

    // --- Mostrar Burbuja de Pensamiento ---
    function showThinkingBubble(show = true) {
        if (show) {
            thinkingBubble.classList.add('visible');
        } else {
            thinkingBubble.classList.remove('visible');
        }
    }

    // --- Lógica del Chat ---
    function handleUserMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        // Limpiar input
        userInput.value = "";

        // Mostrar "pensando"
        showThinkingBubble(true);
        droopyTextElement.textContent = ''; // Limpiar texto anterior de Droopy

        setTimeout(() => {
            showThinkingBubble(false);
            const droopyResponse = getDroopyResponse(userMessage);
            typeMessage(droopyResponse);
        }, thinkingTime);
    }

    function getDroopyResponse(userMessage) {
        // Lógica simple de respuesta (puedes expandirla mucho)
        userMessage = userMessage.toLowerCase();
        if (userMessage.includes("hola") || userMessage.includes("hey") || userMessage.includes("buenos días")) {
            return "Oh, hola... supongo.";
        } else if (userMessage.includes("cómo estás") || userMessage.includes("que tal")) {
            return "Aquí estoy... como siempre. ¿Y tú qué cuentas?";
        } else if (userMessage.includes("chiste") || userMessage.includes("cuéntame algo")) {
            return "Hmm... ¿Sabes por qué los pájaros vuelan hacia el sur en invierno?... Porque es demasiado lejos para ir caminando. Ja. Ja.";
        } else if (userMessage.includes("adiós") || userMessage.includes("nos vemos")) {
            return "Sí, bueno... adiós.";
        } else if (userMessage.includes("droopy")) {
            return "¿Sí?... ¿Qué se te ofrece?";
        } else {
            const randomResponses = [
                "Vaya, vaya...",
                "No estoy seguro de qué decir a eso.",
                "Hmmmm...",
                "Interesante... o no.",
                "Podría ser.",
                "Ya veo."
            ];
            return randomResponses[Math.floor(Math.random() * randomResponses.length)];
        }
    }

    // Event Listeners
    sendButton.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Mensaje inicial de Droopy
    function initialGreeting() {
        showThinkingBubble(true);
        setTimeout(() => {
            showThinkingBubble(false);
            typeMessage("Hola... Soy Droopy. Puedes hablar conmigo si quieres...");
        }, 1500); // Un poco menos de espera para el saludo inicial
    }

    initialGreeting();
    changeExpression(); // Poner una expresión inicial
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (your existing JavaScript code) ...

    const mainFloatingButton = document.getElementById('mainFloatingButton');
    const subButtonsWrapper = document.getElementById('subButtonsWrapper');

    let subButtonsVisible = false;

    // Function to toggle sub-buttons visibility
    function toggleSubButtons() {
        if (subButtonsVisible) {
            subButtonsWrapper.classList.remove('active');
        } else {
            subButtonsWrapper.classList.add('active');
        }
        subButtonsVisible = !subButtonsVisible;
    }

    // Add event listener to the main floating button
    if (mainFloatingButton) {
        mainFloatingButton.addEventListener('click', toggleSubButtons);
    }

    // Optional: Close sub-buttons if clicking anywhere else on the document
    document.addEventListener('click', (event) => {
        // Check if the click was outside the main floating button and sub-buttons wrapper
        if (subButtonsVisible && !mainFloatingButton.contains(event.target) && !subButtonsWrapper.contains(event.target)) {
            toggleSubButtons(); // Close sub-buttons
        }
    });

    // ... (rest of your existing JavaScript code) ...
});