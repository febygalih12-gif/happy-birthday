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