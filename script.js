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
            this.innerText = "Ого, скільки любові! 😍"; 
            this.style.pointerEvents = "none"; 

            // Чекаємо 9 секунд
            setTimeout(() => {
                btn.innerText = "Натисни ще раз ✨";
                btn.style.pointerEvents = "auto"; 
                btn.style.backgroundColor = "#ff758f"; 
            }, 9000);

        } else if (clickCount === 2) {
            // ЕТАП 2: Скрол до відео та Fullscreen для iPad
            this.innerText = "Дивись... ❤️";
            this.style.pointerEvents = "none"; 

            // Попереднє завантаження для стабільності на iOS
            finalVideo.load();

            setTimeout(() => {
                movieSection.scrollIntoView({ behavior: 'smooth' });

                // Автозапуск відео
                setTimeout(() => {
                    finalVideo.play().then(() => {
                        // Магія для iPad: примусове відкриття на весь екран
                        if (finalVideo.webkitEnterFullscreen) {
                            finalVideo.webkitEnterFullscreen();
                        } else if (finalVideo.requestFullscreen) {
                            finalVideo.requestFullscreen();
                        }
                    }).catch(error => {
                        console.log("iOS блокує автоплей без прямої взаємодії:", error);
                        // Якщо не спрацювало автоматично, показуємо контролери, щоб людина натиснула сама
                        finalVideo.controls = true;
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

