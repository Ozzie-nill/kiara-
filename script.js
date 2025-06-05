const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'red';
ctx.lineWidth = 1;

let angle = 0;
const x_scale = 35; // Ajusta este valor para el ancho del corazón
const y_scale = 12; // Ajusta este valor para la altura del corazón
const animationSpeed = 0.05; // Velocidad con la que se dibuja el corazón (más alto = más rápido)

let animationComplete = false;
let textAlpha = 0;
const fadeSpeed = 0.02;

// ************************************************************
// ¡CAMBIA ESTE MENSAJE A TU PROPIA DECLARACIÓN DE AMOR!
// USA LOS APÓSTROFES INVERSOS (`` ` ``) PARA MENSAJES LARGOS Y DE MÚLTIPLES LÍNEAS.
// Puedes presionar Enter dentro de estos apóstrofes para crear nuevas líneas.
const loveMessage = `si estas leyendo esto,
es por que ya no puedo contenerlo la verdad
no se como paso. poco a poco me fui dando 
cuenta de la chica que eres.eres bastante 
hermosa, eres especial cada vez que estas
cerca no puedo evitar mirarte a los ojos 
a ese lunar que tienes en el. me siento 
bastante atraido hacia ti. me gustas mucho.
¡yo se bien que no me puedes corresponder 
pero queria decirte lo que siento 
lo unico que te pido es que 
no dejes de ser mi amiga por eso 
por favor 🥺 ! ❤️`;
// ************************************************************

const textColor = "white"; // Color del texto
const textFont = "bold 28px sans-serif"; // Fuente y TAMAÑO DEL TEXTO ajustado a 28px para que quepa más
const lineHeight = 35; // Espacio entre líneas (ajusta si el texto se superpone o queda muy separado)

function drawHeartPoint(t) {
    const x = x_scale * Math.pow(Math.sin(t), 3);
    const y = y_scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x: x, y: -y };
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;

    const center_x = canvas.width / 2;
    const center_y = canvas.height / 2;

    for (let i = 0; i < angle; i += 0.05) {
        const point = drawHeartPoint(i);
        ctx.beginPath();
        ctx.moveTo(center_x, center_y);
        ctx.lineTo(center_x + point.x, center_y + point.y);
        ctx.stroke();
    }

    angle += animationSpeed;

    if (angle <= 2 * Math.PI + animationSpeed) {
        requestAnimationFrame(animate);
    } else {
        animationComplete = true;
        // Asegurarse de que el corazón esté completamente dibujado al final
        for (let i = 0; i <= 2 * Math.PI; i += 0.05) {
            const point = drawHeartPoint(i);
            ctx.beginPath();
            ctx.moveTo(center_x, center_y);
            ctx.lineTo(center_x + point.x, center_y + point.y);
            ctx.stroke();
        }
        requestAnimationFrame(fadeInText);
    }
}

function fadeInText() {
    if (animationComplete) {
        // Redibuja el corazón completo en cada frame para que no desaparezca
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        const center_x = canvas.width / 2;
        const center_y = canvas.height / 2;
        for (let i = 0; i <= 2 * Math.PI; i += 0.05) {
            const point = drawHeartPoint(i);
            ctx.beginPath();
            ctx.moveTo(center_x, center_y);
            ctx.lineTo(center_x + point.x, center_y + point.y);
            ctx.stroke();
        }

        ctx.fillStyle = `rgba(${textColor === "white" ? '255, 255, 255' : '255, 0, 0'}, ${textAlpha})`;
        ctx.font = textFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // ***** NUEVA LÓGICA PARA MÚLTIPLES LÍNEAS *****
        const lines = loveMessage.split('\n'); // Divide el mensaje por saltos de línea
        let startY = canvas.height / 2 + 70; // Posición Y inicial para el texto

        // Ajustar la posición inicial para centrar múltiples líneas verticalmente
        startY -= (lines.length - 1) * lineHeight / 2;

        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], canvas.width / 2, startY + i * lineHeight);
        }
        // ********************************************

        if (textAlpha < 1) {
            textAlpha += fadeSpeed;
            requestAnimationFrame(fadeInText);
        }
    }
}

animate();