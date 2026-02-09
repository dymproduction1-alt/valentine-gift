async function getWish() {
    const input = document.getElementById('nameInput');
    const name = input.value.trim();
    const display = document.getElementById('wishDisplay');

    if (!name) {
        display.innerText = "Будь ласка, введи своє ім'я! 😊";
        display.style.color = "#d9534f";
        return;
    }

    try {
        const response = await fetch(`/api/greeting/${encodeURIComponent(name)}`);
        const data = await response.json();
        
        display.style.opacity = 0;
        display.style.color = "#4a3728"; // Повертаємо нормальний колір
        
        setTimeout(() => {
            display.innerText = data.text;
            display.style.opacity = 1;
        }, 300);
        
        // Очищаємо поле для наступного разу
        input.value = ""; 
        
    } catch (e) {
        display.innerText = "Сервер трохи втомився. Перевір термінал!";
    }
}

// Дозволяємо натискати Enter замість кнопки
document.getElementById('nameInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWish();
    }
});