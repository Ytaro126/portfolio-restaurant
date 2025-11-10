console.log("JSは読み込まれている")

const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) =>{
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if(targetElement){
            
            const rect = targetElement.getBoundingClientRect();
            const offset = window.pageY0ffset + rect.top - 80;

            window.scrollTo({
                top: offset,
                behavior: 'smooth',
            });
        }
    });
});

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if(window.scrollY > 50){
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});