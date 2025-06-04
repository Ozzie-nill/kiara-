const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

// Color y grosor de las líneas
ctx.strokeStyle = 'red';
ctx.lineWidth = 1;

// Variables para la animación
let angle = 0; // Ángulo actual para dibujar las líneas
const x_scale = 35; // Ajusta este valor para controlar el ANCHO del corazón (prueba 40, 50, etc.)
const y_scale = 12; // Ajusta este valor para controlar la ALTURA del corazón (prueba 15, 20, etc.)
const animationSpeed = 0.05; // Ajusta para la VELOCIDAD de la animación (más alto = más rápido)

// Función para calcular un punto en el contorno del corazón
function drawHeartPoint(t) {
    const x = x_scale * Math.pow(Math.sin(t), 3);
    const y = y_scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    // Invertimos la Y para que el corazón no aparezca invertido en el canvas
    return { x: x, y: -y };
}

// Función principal de animación
function animate() {
    // No limpiamos el canvas aquí para que las líneas se acumulen
    // Si quieres que el corazón se "dibuje y luego desaparezca y se redibuje", descomenta la línea de abajo:
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Asegurarse de que el color y grosor sean correctos para cada línea
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;

    const center_x = canvas.width / 2;
    const center_y = canvas.height / 2;

    // Dibuja las líneas desde el centro hasta el ángulo actual
    // El paso de 0.05 aquí determina qué tan "espesas" se dibujan las líneas a medida que avanza la animación
    // Podrías ajustar este paso si quieres un efecto diferente
    for (let i = 0; i < angle; i += 0.05) { 
        const point = drawHeartPoint(i);
        ctx.beginPath(); // Inicia un nuevo camino de dibujo
        ctx.moveTo(center_x, center_y); // Mueve al centro del canvas
        ctx.lineTo(center_x + point.x, center_y + point.y); // Dibuja la línea hasta el punto del corazón
        ctx.stroke(); // Dibuja la línea
    }

    // Incrementa el ángulo para la próxima iteración de la animación
    // 2 * Math.PI es un círculo completo en radianes
    angle += animationSpeed; 

    // Si la animación no ha terminado (es decir, no hemos recorrido todo el corazón)
    if (angle <= 2 * Math.PI + animationSpeed) {
        // Solicita al navegador que llame a 'animate' de nuevo antes del próximo repintado
        requestAnimationFrame(animate);
    } else {
        // Opcional: Si quieres que el corazón completo se mantenga después de la animación,
        // puedes asegurarte de que todas las líneas se dibujen al final
        for (let i = 0; i < 2 * Math.PI; i += 0.05) { 
            const point = drawHeartPoint(i);
            ctx.beginPath();
            ctx.moveTo(center_x, center_y);
            ctx.lineTo(center_x + point.x, center_y + point.y);
            ctx.stroke();
        }
    }
}

// Inicia la animación cuando la página está lista
animate();