// for the changing color of the nav bar
let navbar = document.querySelector('.navbarcontrol');
let uparrow = document.querySelector('.uparrow');
let home = document.querySelector('.home');
let about = document.querySelector('.about');
let services = document.querySelector('.services');
let contact = document.querySelector('.contact');

window.addEventListener('scroll', ()=>{
    // console.log(window.scrollY);
    if(window.scrollY >= 50){
        navbar.classList.add('navbarcontrolscroll')
    }else{
        navbar.classList.remove('navbarcontrolscroll')
    }
})
window.addEventListener('scroll', ()=>{
    // console.log(window.scrollY);
    if(window.scrollY >= 600){
        uparrow.classList.add('arrow')
    }else{
        uparrow.classList.remove('arrow')
    }
})
// for nav bar and hamburger
let menu = document.querySelector('.hamburgercont');
let menu2 = document.querySelector('.navcollapsone');
let menu22 = document.querySelector('.navbarlist');

menu.onclick = function(){
    menu.classList.toggle("openclose");
    menu2.classList.toggle("navcollapsoneactive");
    menu22.classList.toggle("navbarlistacive");
}

home.addEventListener('click', ()=>{
    menu.classList.toggle("openclose");
    menu2.classList.toggle("navcollapsoneactive");
    // menu22.classList.toggle("navbarlistacive");
})

about.addEventListener('click', ()=>{
    menu.classList.toggle("openclose");
    menu2.classList.toggle("navcollapsoneactive");
    // menu22.classList.toggle("navbarlistacive");
})
services.addEventListener('click', ()=>{
    menu.classList.toggle("openclose");
    menu2.classList.toggle("navcollapsoneactive");
    // menu22.classList.toggle("navbarlistacive");
})
contact.addEventListener('click', ()=>{
    menu.classList.toggle("openclose");
    menu2.classList.toggle("navcollapsoneactive");
    // menu22.classList.toggle("navbarlistacive");
})
// for nav bar and hamburger ends

// for main sliding section
let slideIndex = 1;
let isTransitioning = false;
let slideTimeout;

showSlides(slideIndex);

function plusSlides(n) {
    if (isTransitioning) return; // Exit if a transition is in progress

    clearTimeout(slideTimeout); // Clear any existing timeout to prevent overlapping
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    if (isTransitioning) return; // Exit if a transition is in progress

    clearTimeout(slideTimeout); // Clear any existing timeout to prevent overlapping
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.querySelectorAll(".main2 img");
    let dots = document.querySelectorAll(".dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Set the flag to true to indicate that a transition is in progress
    isTransitioning = true;

    // Adjust the position of the slides container based on the current slide index
    document.querySelector(".main2").style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.className = dot.className.replace(" active", "");
        if (index === slideIndex - 1) {
            dot.className += " active";
        }
    });

    // After transition ends, reset the flag to allow further interactions
    document.querySelector(".main2").addEventListener('transitionend', () => {
        isTransitioning = false;
    }, { once: true });

    // Reset the slide timeout to allow automatic transitions after the current one completes
    slideTimeout = setTimeout(() => {
        if (!isTransitioning) {
            plusSlides(1);
        }
    }, 5000); // Change image every 5 seconds
}


