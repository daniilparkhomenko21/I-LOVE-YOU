document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('magic-btn');
    const movieSection = document.getElementById('movie-section');
    const finalVideo = document.getElementById('final-video');

    let clickCount = 0; // Лічильник натискань


// Обробник кліку по кнопці
    btn.addEventListener('click', function() {
        clickCount++;

        if (clickCount === 1) {
            // ЕТАП 1: Запуск сердечок
            createHearts();
            this.innerText = "Ого, скільки любові! 😍"; // Тимчасовий текст
            this.style.pointerEvents = "none"; // Вимикаємо кнопку, поки летять сердечка

            // Чекаємо 9 секунди (поки закінчиться основний водоспад)
            setTimeout(() => {
                btn.innerText = "Натисни ще раз на кнопку✨";
                btn.style.pointerEvents = "auto"; // Знову вмикаємо кнопку
                btn.style.backgroundColor = "#ff758f"; // Злегка змінюємо колір для заклику
            }, 9000);

        } else if (clickCount === 2) {
            // ЕТАП 2: Скрол до відео
            this.innerText = "Дивись... ❤️";
            this.style.pointerEvents = "none"; // Вимикаємо кнопку остаточно

            setTimeout(() => {
                movieSection.scrollIntoView({ behavior: 'smooth' });

                // Автозапуск відео після того, як скрол завершиться
                setTimeout(() => {
                    finalVideo.play().catch(error => {
                        console.log("Автоплей потребує кліку");
                    });
                }, 1000);
            }, 500);
        }
    });
});


// Функція для створення сердечок
function createHearts() {
    for (let i = 0; i < 120; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerText = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            const duration = Math.random() * 5 + 10; // Випадкова тривалість від 4 до 10 секунд
            heart.style.animationDuration = duration + 's';
            heart.style.opacity = Math.random();
            document.body.appendChild(heart);
            setTimeout(() => {
                heart.remove();
            }, 16000);
        }, i * 200);
    }
}

