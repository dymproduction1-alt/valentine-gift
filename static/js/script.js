// Функція для запуску сердечок
function launchHearts() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#ff69b4'],
            shapes: ['circle'] // Можна додати кастомні фігури, але коло + кольори вже дають ефект
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#ff69b4'],
            shapes: ['circle']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

async function getWish() {
    const input = document.getElementById('nameInput');
    const name = input.value.trim();
    const display = document.getElementById('wishDisplay');

    if (!name) {
        display.innerText = "Будь ласка, напиши своє ім'я! 😊";
        return;
    }

    try {
        const response = await fetch(`/api/greeting/${encodeURIComponent(name)}`);
        const data = await response.json();
        
        // Запускаємо ефект сердечок!
        launchHearts();

        display.style.opacity = 0;
        setTimeout(() => {
            display.innerText = data.text;
            display.style.opacity = 1;
        }, 300);
        
        input.value = ""; 
        
    } catch (e) {
        display.innerText = "Сервер трохи втомився. Спробуй ще раз!";
    }
}

// Обробка Enter
document.getElementById('nameInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWish();
    }
});
