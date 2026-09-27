/* =========================================
   OPENING INTERACTION
   ========================================= */


/*
   Ambil elemen hati
*/

const heartButton =
    document.getElementById("heartButton");


/*
   Saat hati ditekan
*/

heartButton.addEventListener("click", function () {
const music =
    document.getElementById("backgroundMusic");

music.volume = 0.45;

music.play();
    /*
       Cegah supaya animasi
       tidak dijalankan berkali-kali
    */

    if (heartButton.classList.contains("clicked")) {
        return;
    }


    /*
       Tambahkan efek hati meletup
    */

    heartButton.classList.add("clicked");


    /*
       Buat partikel hati
    */

    createParticles();


    /*
       Setelah animasi selesai,
       buka halaman berikutnya
    */

    setTimeout(function () {

        document
            .getElementById("opening")
            .style.opacity = "0";


    }, 700);


    setTimeout(function () {

        document
            .getElementById("opening")
            .style.display = "none";


        document
            .getElementById("birthday")
            .classList.add("show");


    }, 1500);

});


/* =========================================
   MEMBUAT PARTIKEL
   ========================================= */

function createParticles() {

    const container =
        document.getElementById("particles");


    /*
       Kita buat 24 hati kecil
    */

    for (let i = 0; i < 24; i++) {

        const particle =
            document.createElement("div");


        particle.classList.add("particle");


        /*
           Posisi awal
           berada di sekitar tengah hati
        */

        particle.style.left =
            "calc(50% + " +
            (Math.random() * 30 - 15) +
            "px)";

        particle.style.top =
            "calc(49% + " +
            (Math.random() * 30 - 15) +
            "px)";


        /*
           Tentukan arah terbang
        */

        const x =
            (Math.random() * 400 - 200);

        const y =
            (Math.random() * 400 - 200);


        particle.style.setProperty(
            "--x",
            x + "px"
        );

        particle.style.setProperty(
            "--y",
            y + "px"
        );


        /*
           Ukuran acak
        */

        const size =
            5 + Math.random() * 8;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";


        /*
           Warna biru acak
        */

        const colors = [
            "#286A9E",
            "#4B9ED2",
            "#5EA9DD",
            "#8ED0F5",
            "#FFFFFF"
        ];

        particle.style.background =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];


        /*
           Masukkan ke halaman
        */

        container.appendChild(particle);

    }

}

const memoryButton = document.getElementById("memoryButton");

memoryButton.addEventListener("click", function () {
    document.getElementById("memories").scrollIntoView({
        behavior: "smooth"
    });
});

function createFloatingHearts(containerId, amount) {
    const container = document.getElementById(containerId);

    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("span");

        heart.classList.add("floating-heart");
        heart.innerHTML = "♡";

        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = (14 + Math.random() * 18) + "px";
        heart.style.animationDuration = (10 + Math.random() * 8) + "s";
heart.style.animationDelay = (Math.random() * 10) + "s";

        container.appendChild(heart);
    }
}

createFloatingHearts("letterHearts", 15);
createFloatingHearts("finalHearts", 14);

// COUNTDOWN MENUJU 29 SEPTEMBER 2026, PUKUL 00.00 WIB
const birthdayTarget = Date.now() - 1000;

const countDays = document.getElementById("countDays");
const countHours = document.getElementById("countHours");
const countMinutes = document.getElementById("countMinutes");
const countSeconds = document.getElementById("countSeconds");

const countdownMessage = document.getElementById("countdownMessage");
const countdownContinue = document.getElementById("countdownContinue");
const countdownPage = document.getElementById("countdownPage");

// Siapkan interval terlebih dahulu
let countdownInterval;

function updateBirthdayCountdown() {
    const now = Date.now();
    const remaining = Math.max(0, birthdayTarget - now);

    const totalSeconds = Math.floor(remaining / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countDays.textContent = String(days).padStart(2, "0");
    countHours.textContent = String(hours).padStart(2, "0");
    countMinutes.textContent = String(minutes).padStart(2, "0");
    countSeconds.textContent = String(seconds).padStart(2, "0");

    if (remaining <= 0) {
        clearInterval(countdownInterval);

        countdownMessage.textContent =
            "It's your day! Happy Birthday, sayang. ♡";

        countdownContinue.hidden = false;
    }
}

// Jalankan sekali saat halaman dibuka
updateBirthdayCountdown();

// Lanjutkan pembaruan setiap detik
countdownInterval = setInterval(updateBirthdayCountdown, 1000);
// Tombol lanjut — untuk sementara menuju halaman hati.
// Pada langkah berikutnya, kita sisipkan mini game sebelum halaman hati.
// COUNTDOWN SELESAI -> MASUK KE MINI GAME
countdownContinue.addEventListener("click", function () {
    countdownPage.style.display = "none";

    const gamePage = document.getElementById("gamePage");
    gamePage.classList.add("show-game");

    startMemoryGame();
});

// MINI GAME: 6 PASANG ILUSTRASI
const memorySymbols = ["🩵", "🧸", "🐳", "🌙", "🎀", "⭐"];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function startMemoryGame() {
    const gameBoard = document.getElementById("memoryGame");
    const pairsDisplay = document.getElementById("pairsFound");
    const winMessage = document.getElementById("gameWinMessage");

    // Reset game setiap kali dimulai
    gameBoard.innerHTML = "";
    pairsDisplay.textContent = "0 / 6";
    winMessage.hidden = true;

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;

    // Gandakan simbol supaya setiap gambar punya pasangan
    const cards = [...memorySymbols, ...memorySymbols];

    // Acak posisi kartu
    cards.sort(() => Math.random() - 0.5);

    cards.forEach((symbol) => {
        const card = document.createElement("button");

        card.type = "button";
        card.className = "game-tile";
        card.dataset.symbol = symbol;
        card.setAttribute("aria-label", "Kartu tertutup");

        card.innerHTML = `
            <span class="tile-back">♡</span>
            <span class="tile-front">${symbol}</span>
        `;

        card.addEventListener("click", () => flipCard(card));

        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (
        lockBoard ||
        card.classList.contains("is-flipped") ||
        card.classList.contains("is-matched")
    ) {
        return;
    }

    card.classList.add("is-flipped");
    card.setAttribute("aria-label", "Kartu " + card.dataset.symbol);

    if (firstCard === null) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
        firstCard.classList.add("is-matched");
        secondCard.classList.add("is-matched");

        firstCard.disabled = true;
        secondCard.disabled = true;

        matchedPairs++;
        document.getElementById("pairsFound").textContent =
            matchedPairs + " / 6";

        resetTurn();

        if (matchedPairs === 6) {
            document.getElementById("gameWinMessage").hidden = false;
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("is-flipped");
            secondCard.classList.remove("is-flipped");

            firstCard.setAttribute("aria-label", "Kartu tertutup");
            secondCard.setAttribute("aria-label", "Kartu tertutup");

            resetTurn();
        }, 850);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// SEMUA PASANGAN COCOK -> MENUJU HALAMAN HATI
document.getElementById("gameContinueButton").addEventListener("click", function () {
    document.getElementById("gamePage").style.display = "none";

    const openingPage = document.getElementById("opening");
    openingPage.classList.add("show-opening");
});