document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('magic-btn');
    const movieSection = document.getElementById('movie-section');
    const finalVideo = document.getElementById('final-video');

    let clickCount = 0;

    btn.addEventListener('click', function() {
        clickCount++;

        if (clickCount === 1) {
            createHearts();
            this.innerText = "Ого, скільки любові! 😍"; 
            this.style.pointerEvents = "none"; 

            setTimeout(() => {
                btn.innerText = "Натисни ще раз ✨";
                btn.style.pointerEvents = "auto"; 
                btn.style.backgroundColor = "#ff758f"; 
            }, 9000);

        } else if (clickCount === 2) {
            this.innerText = "Дивись... ❤️";
            this.style.pointerEvents = "none"; 

            finalVideo.load();

            setTimeout(() => {
                movieSection.scrollIntoView({ behavior: 'smooth' });

                setTimeout(() => {
                    finalVideo.play().then(() => {
                        // ПАНЕЛЬ З'ЯВЛЯЄТЬСЯ ТІЛЬКИ ТУТ
                        finalVideo.addEventListener('click', () => {
                        finalVideo.controls = true; // Панель з'явиться лише при натисканні на саме відео
                        }, { once: true }); // Спрацює лише один раз при першому торканні
                    }).catch(error => {
                        console.log("Помилка відтворення:", error);
                        // Якщо автоплей заблоковано, все одно показуємо панель, щоб можна було натиснути Play
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

