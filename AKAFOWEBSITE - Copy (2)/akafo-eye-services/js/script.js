const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

/* SCROLL ANIMATION */

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {

    sections.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top;

        if(sectionTop < window.innerHeight - 100){
            section.classList.add('show');
        }

    });

});
const bioButtons = document.querySelectorAll(".bio-btn");

bioButtons.forEach(button => {

    button.addEventListener("click", () => {

        const bio = button.nextElementSibling;

        if (bio.style.maxHeight) {

            bio.style.maxHeight = null;
            button.innerText = "Read Biography";

        } else {

            bio.style.maxHeight = bio.scrollHeight + "px";
            button.innerText = "Hide Biography";

        }

    });

});

function openProfile(name, role, bio){

    document.getElementById("modalName").innerHTML = name;

    document.getElementById("modalRole").innerHTML = role;

    document.getElementById("modalBio").innerHTML = bio;

    document.getElementById("profileModal").style.display = "block";
}

function closeProfile(){

    document.getElementById("profileModal").style.display = "none";
}

window.onclick = function(event){

    const modal = document.getElementById("profileModal");

    if(event.target == modal){

        modal.style.display = "none";
    }
}

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
    const target = parseInt(counter.dataset.target);
    const symbol = counter.dataset.symbol || "";
    let count = 0;

    const increment = target / 100;

    const updateCounter = () => {
        if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count) + symbol;
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = target + symbol;
        }
    };

    updateCounter();
};

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;

                if (!counter.classList.contains("counted")) {
                    startCounter(counter);
                    counter.classList.add("counted");
                }
            }
        });
    },
    { threshold: 0.5 }
);

counters.forEach(counter => observer.observe(counter));


function openProfileFromCard(button) {

    const card = button.closest(".team-card");

    const name = card.querySelector(".team-info > h3").innerText;

    const role = card.querySelector(".team-info > p").innerText;

    const bio = card.querySelector(".staff-bio").innerHTML;

    openProfile(name, role, bio);
}

/* ==================== IMAGE LIGHTBOX ==================== */

function openLightbox(image) {

    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.style.display = "flex";
}


function closeLightbox() {

    const lightbox = document.getElementById("imageLightbox");

    lightbox.style.display = "none";
}


/* Close lightbox when clicking outside the image */

document.getElementById("imageLightbox").addEventListener("click", function(event) {

    if (event.target === this) {
        closeLightbox();
    }

});


/* Close lightbox with ESC key */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeLightbox();
    }

});