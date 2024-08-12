document.addEventListener('DOMContentLoaded', () => {
    // Toggle menu icon and navbar
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };
    } else {
        console.error('Menu icon or navbar not found.');
    }

    // Section highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        const top = window.scrollY;

        sections.forEach(sec => {
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
            }
        });

        // Sticky navbar
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        } else {
            console.error('Header not found.');
        }

        // Remove toggle icon and navbar when clicked
        if (menuIcon && navbar) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    };

    // Initialize ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal({
            reset: true,
            distance: '80px',
            duration: 1500,
            delay: 200
        });
        ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
        ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
        ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
        ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
    } else {
        console.error('ScrollReveal is not defined.');
    }

    // Initialize Typed.js
    const typedElement = document.querySelector('.multiple-text');
    if (typedElement) {
        new Typed('.multiple-text', {
            strings: ['Frontend Developer', 'YouTuber', 'Blogger'],
            typeSpeed: 100,
            backDelay: 1000,
            backSpeed: 100,
            loop: true
        });
    } else {
        console.error('Element with class "multiple-text" not found.');
    }

    // Form submission handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => { data[key] = value });

            try {
                const response = await fetch('/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    alert('Message sent successfully!');
                    form.reset();
                } else {
                    alert('Error sending message.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error sending message.');
            }
        });
    } else {
        console.error('Form with id "contact-form" not found.');
    }
});
