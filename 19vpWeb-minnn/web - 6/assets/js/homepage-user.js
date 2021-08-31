/* show menu */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/* Open Menu */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Close menu */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


 
// const navLink = document.querySelectorAll('.nav__link')
// function linkAction(){
//     const navMenu = document.getElementById('nav-menu')
//     //click and it remove Menu
//     navMenu.classList.remove('show-menu')
// }
// navLink.forEach(n => n.addEventListener('click', linkAction))

/* background header */
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* swiper */ 
var swiper = new Swiper(".about2__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

/* Video */
const videoFile = document.getElementById('video-file');
const videoButton = document.getElementById('video-button');
const videoIcon = document.getElementById('video-icon');

videoButton.addEventListener('click', playAndPause)

function playAndPause(){
    if(videoFile.paused){
        videoFile.play()
        videoIcon.classList.add('ri-pause-line')
        videoIcon.classList.remove('ri-play-line')
    }

    else{
        videoFile.pause()
        videoIcon.classList.remove('ri-pause-line')
        videoIcon.classList.add('ri-play-line')
    }
}

videoFile.addEventListener('ended', endVideo)

function endVideo(){
    videoIcon.classList.remove('ri-pause-line')
    videoIcon.classList.add('ri-play-line')
}

/* show scroll */           
function scrollup(){
    const scrollup = document.getElementById('scroll-up');

    if(this.scrollY >= 200) scrollup.classList.add('show-scroll'); 
    else scrollup.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollup)

/* active scroll */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 200;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* theme */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const lightTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(lightTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](lightTheme)
}

themeButton.addEventListener('click', () => {
    // Add or remove the dark/lìht theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(lightTheme)
    // Save the theme and the light chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* scroll animation */
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    // reset: true,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
            .section__title, .about2__container`,{
    origin: 'top',
    interval: 100,
})

sr.reveal(`.subcribe__description, .video__description, 
            .about__data, .footer__data`,{
    origin: 'left',
    
})

sr.reveal(`.subcribe__form, .video__content, 
            .about__img-overlay, .footer__rights`,{
    origin: 'right',
    interval: 100,
    
})

/* Log in - Sign up*/
document.getElementById('login__btn').addEventListener('click',
function(){
    document.querySelector('.bg__modal').style.display = 'flex';
});

document.querySelector('.close__btn').addEventListener('click',
function(){
    document.querySelector('.bg__modal').style.display = 'none';
})

const signUp = document.getElementById('sign-up')
const signIn = document.getElementById('sign-in')
const loginIn = document.getElementById('login-in')
const loginUp = document.getElementById('login-up')

signUp.addEventListener('click', ()=>{
    // Remove if exist
    loginIn.classList.remove('block')
    loginUp.classList.remove('none')

    // Add classes
    loginIn.classList.toggle('none')
    loginUp.classList.toggle('block')
})

signIn.addEventListener('click', ()=>{
    // Remove exist
    loginIn.classList.remove('none')
    loginUp.classList.remove('block')

    // Add classes
    loginIn.classList.toggle('block')
    loginUp.classList.toggle('none')
})
