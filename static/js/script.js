// 1. Функція музики
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    if (music.paused) {
        music.play();
        btn.innerText = "🔊 Музика: On";
    } else {
        music.pause();
        btn.innerText = "🔇 Музика: Off";
    }
}

// 2. Створення літаючих сердечок
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'bg-heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.opacity = Math.random();
    document.body.appendChild(heart);

    setTimeout(() => { heart.remove(); }, 5000);
}
setInterval(createFloatingHeart, 500);

// 3. Основна функція
async function getWish() {
    const input = document.getElementById('nameInput');
    const name = input.value.trim();
    const display = document.getElementById('wishDisplay');
    const shareBtn = document.getElementById('shareBtn');

    if (!name) {
        display.innerText = "Будь ласка, напиши своє ім'я! 😊";
        return;
    }

    try {
        const response = await fetch(`/api/greeting/${encodeURIComponent(name)}`);
        const data = await response.json();
        
        // Запуск конфетті
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff0000', '#ff69b4'] });

        display.style.opacity = 0;
        setTimeout(() => {
            display.innerText = data.text;
            display.style.opacity = 1;
            shareBtn.style.display = "inline-block"; // Показуємо кнопку поділитися
        }, 300);
        
        input.value = ""; 
    } catch (e) {
        display.innerText = "Сервер трохи втомився.";
    }
}

// 4. Функція "Поділитися"
function shareWish() {
    alert("Круто! Тепер зроби скріншот екрану та викладай у сторіз з тегом @book.ua! 📸✨");
}

document.getElementById('nameInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') getWish(); });
