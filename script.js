/* =========================================================
   JUST UNTIL THE 17TH
   CINEMATIC FRIENDSHIP WEBSITE
   JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loadingScreen = document.getElementById("loadingScreen");

    const app = document.getElementById("app");

    const backgroundLayer =
        document.getElementById("backgroundLayer");

    const scenes =
        Array.from(document.querySelectorAll(".scene"));

    const currentNumber =
        document.getElementById("currentNumber");

    const progressBar =
        document.getElementById("progressBar");

    const prevBtn =
        document.getElementById("prevBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const music =
        document.getElementById("backgroundMusic");

    const musicToggle =
        document.getElementById("musicToggle");

    const musicStatus =
        document.getElementById("musicStatus");

    const particles =
        document.getElementById("particles");

    const hearts =
        document.getElementById("hearts");

    const stayButton =
        document.getElementById("stayButton");

    const thinkButton =
        document.getElementById("thinkButton");

    const yesScreen =
        document.getElementById("yesScreen");

    const closeThink =
        document.getElementById("closeThink");

    const thinkScreen =
        document.getElementById("thinkScreen");

    const restartButton =
        document.getElementById("restartButton");


    /* =====================================================
       STATE
    ===================================================== */

    let currentScene = 1;

    const totalScenes = scenes.length;

    let isTransitioning = false;

    let musicPlaying = false;

    let touchStartX = 0;

    let touchEndX = 0;

    let wheelLocked = false;


    /* =====================================================
       SCENE BACKGROUNDS
    ===================================================== */

    const backgroundImages = [
        "screen01.png",
        "screen02.png",
        "screen03.png",
        "screen04.png",
        "screen05.png",
        "screen06.png",
        "screen07.png",
        "screen08.png",
        "screen09.png"
    ];


    /* =====================================================
       PRELOAD IMAGES
    ===================================================== */

    function preloadImages() {

        backgroundImages.forEach((src) => {

            const img = new Image();

            img.src = src;

        });


        [
            "photo1.png",
            "photo2.png",
            "photo3.png",
            "photo4.png"
        ].forEach((src) => {

            const img = new Image();

            img.src = src;

        });
    }


    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    function hideLoadingScreen() {

        setTimeout(() => {

            if (loadingScreen) {

                loadingScreen.classList.add("hide");

            }

        }, 1800);
    }


    /* =====================================================
       BACKGROUND
    ===================================================== */

    function setBackground(sceneNumber) {

        const image =
            backgroundImages[sceneNumber - 1];

        if (!image) return;

        backgroundLayer.classList.remove("zooming");

        /*
         * Small delay creates a cleaner
         * cinematic background change.
         */

        setTimeout(() => {

            backgroundLayer.style.backgroundImage =
                `url("${image}")`;

            backgroundLayer.classList.add("zooming");

        }, 80);
    }


    /* =====================================================
       UPDATE UI
    ===================================================== */

    function updateUI() {

        currentNumber.textContent =
            String(currentScene).padStart(2, "0");

        const progress =
            (currentScene / totalScenes) * 100;

        progressBar.style.width =
            `${progress}%`;

        prevBtn.disabled =
            currentScene === 1;

        nextBtn.disabled =
            currentScene === totalScenes;
    }


    /* =====================================================
       TRANSITION TYPE
    ===================================================== */

    function setTransitionClass(sceneNumber) {

        document.body.classList.remove(
            "transition-zoom",
            "transition-rise",
            "transition-focus",
            "transition-slide",
            "transition-heart",
            "transition-film",
            "transition-warm",
            "transition-soft",
            "transition-final"
        );

        const transitionClasses = [
            "transition-zoom",
            "transition-rise",
            "transition-focus",
            "transition-slide",
            "transition-heart",
            "transition-film",
            "transition-warm",
            "transition-soft",
            "transition-final"
        ];

        const selected =
            transitionClasses[sceneNumber - 1];

        if (selected) {

            document.body.classList.add(selected);

        }
    }


    /* =====================================================
       LOAD SCENE
    ===================================================== */

    function loadScene(sceneNumber, direction = "next") {

        if (isTransitioning) return;

        if (
            sceneNumber < 1 ||
            sceneNumber > totalScenes
        ) {
            return;
        }

        if (sceneNumber === currentScene) {
            return;
        }

        isTransitioning = true;

        const oldScene =
            scenes[currentScene - 1];

        const newScene =
            scenes[sceneNumber - 1];


        /* -----------------------------------------------
           Direction
        ------------------------------------------------ */

        newScene.dataset.direction =
            direction;


        /* -----------------------------------------------
           Prepare new scene
        ------------------------------------------------ */

        newScene.classList.add("active");


        /* -----------------------------------------------
           Background
        ------------------------------------------------ */

        setBackground(sceneNumber);

        setTransitionClass(sceneNumber);


        /* -----------------------------------------------
           Update current scene
        ------------------------------------------------ */

        currentScene = sceneNumber;

        updateUI();


        /* -----------------------------------------------
           Remove old scene
        ------------------------------------------------ */

        setTimeout(() => {

            if (oldScene) {

                oldScene.classList.remove("active");

            }

            isTransitioning = false;

        }, 900);


        /* -----------------------------------------------
           Scene-specific effects
        ------------------------------------------------ */

        runSceneEffects(sceneNumber);
    }


    /* =====================================================
       NEXT SCENE
    ===================================================== */

    function nextScene() {

        if (currentScene < totalScenes) {

            loadScene(
                currentScene + 1,
                "next"
            );

        }
    }


    /* =====================================================
       PREVIOUS SCENE
    ===================================================== */

    function previousScene() {

        if (currentScene > 1) {

            loadScene(
                currentScene - 1,
                "previous"
            );

        }
    }


    /* =====================================================
       BUTTON NAVIGATION
    ===================================================== */

    nextBtn.addEventListener(
        "click",
        nextScene
    );

    prevBtn.addEventListener(
        "click",
        previousScene
    );


    /* =====================================================
       INTERNAL NEXT BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".next-btn")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        Number(button.dataset.next);

                    if (target) {

                        loadScene(
                            target,
                            target > currentScene
                                ? "next"
                                : "previous"
                        );

                    } else {

                        nextScene();

                    }

                }
            );

        });


    /* =====================================================
       MUSIC
    ===================================================== */

    async function startMusic() {

        if (!music) return;

        try {

            music.volume = 0.55;

            await music.play();

            musicPlaying = true;

            updateMusicUI();

        } catch (error) {

            console.log(
                "Music autoplay was blocked by browser."
            );

            musicPlaying = false;

            updateMusicUI();

        }
    }


    function pauseMusic() {

        if (!music) return;

        music.pause();

        musicPlaying = false;

        updateMusicUI();

    }


    function updateMusicUI() {

        if (!musicToggle || !musicStatus) {
            return;
        }

        if (musicPlaying) {

            musicToggle.textContent = "🔊";

            musicToggle.classList.add(
                "playing"
            );

            musicStatus.textContent =
                "MUSIC ON";

        } else {

            musicToggle.textContent = "🎵";

            musicToggle.classList.remove(
                "playing"
            );

            musicStatus.textContent =
                "MUSIC OFF";

        }

    }


    musicToggle.addEventListener(
        "click",
        async () => {

            if (musicPlaying) {

                pauseMusic();

            } else {

                await startMusic();

            }

        }
    );


    /* =====================================================
       FIRST USER INTERACTION
       ===================================================== */

    /*
     * Browser autoplay policies often block
     * background music.
     *
     * So when Likhi clicks the first button,
     * we try starting the music.
     */

    document.addEventListener(
        "click",
        () => {

            if (
                !musicPlaying &&
                currentScene === 1
            ) {

                startMusic();

            }

        },
        {
            once: true
        }
    );


    /* =====================================================
       SCENE EFFECTS
    ===================================================== */

    function runSceneEffects(sceneNumber) {

        clearParticles();

        clearHearts();


        switch (sceneNumber) {

            case 1:

                createParticles(45);

                break;


            case 2:

                createParticles(35);

                createFloatingHearts(3);

                break;


            case 3:

                createParticles(55);

                break;


            case 4:

                createParticles(25);

                break;


            case 5:

                createParticles(40);

                createFloatingHearts(10);

                break;


            case 6:

                createParticles(30);

                animateMemoryCards();

                break;


            case 7:

                createParticles(35);

                createFloatingHearts(7);

                break;


            case 8:

                createParticles(20);

                break;


            case 9:

                createParticles(60);

                createFloatingHearts(15);

                break;

        }

    }


    /* =====================================================
       PARTICLES
    ===================================================== */

    function createParticles(amount = 30) {

        if (!particles) return;

        for (let i = 0; i < amount; i++) {

            const particle =
                document.createElement("span");

            particle.className =
                "particle";

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.setProperty(
                "--duration",
                `${5 + Math.random() * 9}s`
            );

            particle.style.setProperty(
                "--drift",
                `${-80 + Math.random() * 160}px`
            );

            particle.style.opacity =
                `${0.2 + Math.random() * 0.7}`;

            const size =
                1 + Math.random() * 3;

            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;

            particles.appendChild(
                particle
            );

        }

    }


    function clearParticles() {

        if (!particles) return;

        particles.innerHTML = "";

    }


    /* =====================================================
       FLOATING HEARTS
    ===================================================== */

    function createFloatingHearts(amount = 8) {

        if (!hearts) return;

        for (let i = 0; i < amount; i++) {

            const heart =
                document.createElement("span");

            heart.className =
                "floating-heart";

            heart.textContent =
                Math.random() > 0.5
                    ? "♡"
                    : "♥";

            heart.style.left =
                `${10 + Math.random() * 80}%`;

            heart.style.bottom =
                `${-10 + Math.random() * 10}%`;

            heart.style.setProperty(
                "--size",
                `${12 + Math.random() * 25}px`
            );

            heart.style.setProperty(
                "--duration",
                `${5 + Math.random() * 5}s`
            );

            heart.style.animationDelay =
                `${Math.random() * 2}s`;

            hearts.appendChild(
                heart
            );

        }

    }


    function clearHearts() {

        if (!hearts) return;

        hearts.innerHTML = "";

    }


    /* =====================================================
       MEMORY CARD ANIMATION
    ===================================================== */

    function animateMemoryCards() {

        const cards =
            document.querySelectorAll(
                ".memory-card"
            );

        cards.forEach(
            (card, index) => {

                card.style.opacity = "0";

                card.style.transform =
                    `translateY(35px)
                     rotate(${(index % 2 === 0 ? -3 : 3)}deg)
                     scale(0.9)`;

                setTimeout(() => {

                    card.style.transition =
                        "all 0.8s cubic-bezier(0.22,0.61,0.36,1)";

                    card.style.opacity = "1";

                    card.style.transform =
                        `translateY(0)
                         rotate(${index % 2 === 0 ? -3 : 3}deg)
                         scale(1)`;

                }, 180 + index * 140);

            }
        );

    }


    /* =====================================================
       YES BUTTON
    ===================================================== */

    stayButton.addEventListener(
        "click",
        () => {

            createBigHeartBurst(30);

            createConfetti(100);

            setTimeout(() => {

                yesScreen.classList.add(
                    "show"
                );

            }, 500);

        }
    );


    /* =====================================================
       THINK BUTTON
    ===================================================== */

    thinkButton.addEventListener(
        "click",
        () => {

            thinkScreen.classList.add(
                "show"
            );

        }
    );


    /* =====================================================
       CLOSE THINK SCREEN
    ===================================================== */

    closeThink.addEventListener(
        "click",
        () => {

            thinkScreen.classList.remove(
                "show"
            );

        }
    );


    /* =====================================================
       RESTART
    ===================================================== */

    restartButton.addEventListener(
        "click",
        () => {

            yesScreen.classList.remove(
                "show"
            );

            currentScene = 1;

            scenes.forEach(
                (scene) => {

                    scene.classList.remove(
                        "active"
                    );

                }
            );

            scenes[0].classList.add(
                "active"
            );

            setBackground(1);

            updateUI();

            runSceneEffects(1);

            window.scrollTo(
                0,
                0
            );

        }
    );


    /* =====================================================
       BIG HEART BURST
    ===================================================== */

    function createBigHeartBurst(amount = 25) {

        const container =
            document.createElement("div");

        container.style.position =
            "fixed";

        container.style.inset =
            "0";

        container.style.pointerEvents =
            "none";

        container.style.zIndex =
            "10000";

        document.body.appendChild(
            container
        );


        for (let i = 0; i < amount; i++) {

            const heart =
                document.createElement("span");

            heart.textContent =
                Math.random() > 0.5
                    ? "❤️"
                    : "♡";

            heart.style.position =
                "absolute";

            heart.style.left =
                "50%";

            heart.style.top =
                "50%";

            heart.style.fontSize =
                `${15 + Math.random() * 25}px`;

            const angle =
                Math.random() * Math.PI * 2;

            const distance =
                100 + Math.random() * 450;

            const x =
                Math.cos(angle) * distance;

            const y =
                Math.sin(angle) * distance;

            heart.animate(
                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(0.2)",
                        opacity: 0
                    },
                    {
                        transform:
                            "translate(-50%, -50%) scale(1)",
                        opacity: 1,
                        offset: 0.15
                    },
                    {
                        transform:
                            `translate(
                                calc(-50% + ${x}px),
                                calc(-50% + ${y}px)
                            )
                            rotate(${Math.random() * 90 - 45}deg)
                            scale(1.3)`,
                        opacity: 0
                    }
                ],
                {
                    duration:
                        1800 + Math.random() * 1200,

                    delay:
                        Math.random() * 350,

                    easing:
                        "cubic-bezier(.17,.67,.3,1)"
                }
            );

            container.appendChild(
                heart
            );

        }


        setTimeout(() => {

            container.remove();

        }, 3500);

    }


    /* =====================================================
       CONFETTI
    ===================================================== */

    function createConfetti(amount = 80) {

        const container =
            document.createElement("div");

        container.style.position =
            "fixed";

        container.style.inset =
            "0";

        container.style.pointerEvents =
            "none";

        container.style.overflow =
            "hidden";

        container.style.zIndex =
            "10001";

        document.body.appendChild(
            container
        );


        for (let i = 0; i < amount; i++) {

            const piece =
                document.createElement("span");

            piece.style.position =
                "absolute";

            piece.style.left =
                `${Math.random() * 100}%`;

            piece.style.top =
                "-20px";

            piece.style.width =
                `${5 + Math.random() * 7}px`;

            piece.style.height =
                `${8 + Math.random() * 12}px`;

            piece.style.background =
                [
                    "#ff6fae",
                    "#ffd1e4",
                    "#ffffff",
                    "#ffb45c",
                    "#c9a7ff"
                ][
                    Math.floor(
                        Math.random() * 5
                    )
                ];

            piece.style.borderRadius =
                Math.random() > 0.5
                    ? "2px"
                    : "50%";

            const rotate =
                Math.random() * 720 - 360;

            const drift =
                Math.random() * 300 - 150;

            piece.animate(
                [
                    {
                        transform:
                            "translateY(0) rotate(0deg)",
                        opacity: 1
                    },
                    {
                        transform:
                            `translate(
                                ${drift}px,
                                110vh
                            )
                            rotate(${rotate}deg)`,
                        opacity: 0.8
                    }
                ],
                {
                    duration:
                        2200 + Math.random() * 1800,

                    delay:
                        Math.random() * 500,

                    easing:
                        "cubic-bezier(.15,.7,.3,1)"
                }
            );

            container.appendChild(
                piece
            );

        }


        setTimeout(() => {

            container.remove();

        }, 5000);

    }


    /* =====================================================
       KEYBOARD NAVIGATION
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "ArrowRight" ||
                event.key === " "
            ) {

                event.preventDefault();

                nextScene();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                event.preventDefault();

                previousScene();

            }


            if (
                event.key.toLowerCase() === "m"
            ) {

                if (musicPlaying) {

                    pauseMusic();

                } else {

                    startMusic();

                }

            }


            if (
                event.key === "Escape"
            ) {

                thinkScreen.classList.remove(
                    "show"
                );

                yesScreen.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       TOUCH SWIPE
    ===================================================== */

    document.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        {
            passive: true
        }
    );


    function handleSwipe() {

        const distance =
            touchEndX - touchStartX;

        const minimumSwipe =
            60;

        if (
            Math.abs(distance) <
            minimumSwipe
        ) {
            return;
        }

        if (distance < 0) {

            nextScene();

        } else {

            previousScene();

        }

    }


    /* =====================================================
       MOUSE WHEEL
    ===================================================== */

    document.addEventListener(
        "wheel",
        (event) => {

            if (wheelLocked) return;

            wheelLocked = true;

            if (event.deltaY > 0) {

                nextScene();

            } else {

                previousScene();

            }

            setTimeout(() => {

                wheelLocked = false;

            }, 1000);

        },
        {
            passive: true
        }
    );


    /* =====================================================
       CLICK BACKGROUND = NEXT
    ===================================================== */

    document.addEventListener(
        "dblclick",
        () => {

            nextScene();

        }
    );


    /* =====================================================
       AUDIO VOLUME
    ===================================================== */

    if (music) {

        music.volume = 0.55;

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initialize() {

        preloadImages();

        currentScene = 1;

        scenes.forEach(
            (scene, index) => {

                scene.classList.toggle(
                    "active",
                    index === 0
                );

            }
        );

        setBackground(1);

        updateUI();

        runSceneEffects(1);

        updateMusicUI();

        hideLoadingScreen();

    }


    initialize();

});