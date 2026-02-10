function launchHearts() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#ff69b4', '#ff85a2']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#ff69b4', '#ff85a2']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Функція для зміни кольору фону на святковий
function changeBackground() {
    const colors = [
        'linear-gradient(135deg, #fdf5e6 0%, #ffcbd1 100%)',
        'linear-gradient(135deg, #fdf5e6 0%, #faedcd 100%)',
        'linear-gradient(135deg, #fdf5e6 0%, #e9edc9 100%)',
        'linear-gradient(135deg, #fdf5e6 0%, #ffe5ec 100%)'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
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
        
        launchHearts();
        changeBackground();

        display.style.opacity = 0;
        setTimeout(() => {
            display.innerText = data.text;
            display.style.opacity = 1;
        }, 300);
        
        input.value = ""; 
        
    } catch (e) {
        display.innerText = "Ой, щось пішло не так. Перевір інтернет!";
    }
}

document.getElementById('nameInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWish();
    }
});
