// ===========================
// USMAN FIAZ — Personal Site
// Interactions & Animations
// ===========================

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // --- Scroll Reveal Animations ---
    const revealElements = () => {
        const elements = document.querySelectorAll(
            '.section-label, .section-headline, .section-sub, ' +
            '.intro-layout, .work-card, .venture-card, .case-card, ' +
            '.growth-layout, .philosophy-layout, .audience-item, ' +
            '.logo-grid, .testimonial, .gallery-item, .cta-layout, ' +
            '.intro-callout, .growth-rules, .audience-closer, ' +
            '.doodle-note, .philosophy-doodle, .case-annotation'
        );

        elements.forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });
    };

    revealElements();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- Stagger work cards ---
    const staggerCards = (selector, baseDelay = 0) => {
        const cards = document.querySelectorAll(selector);
        cards.forEach((card, i) => {
            card.style.transitionDelay = `${baseDelay + (i * 0.1)}s`;
        });
    };

    staggerCards('.work-card');
    staggerCards('.venture-card');
    staggerCards('.audience-item');
    staggerCards('.gallery-item', 0);

    // --- Nav background on scroll ---
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            nav.style.boxShadow = '0 1px 20px rgba(0,0,0,0.06)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScroll = scrollY;
    }, { passive: true });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Parallax-lite for hero visual ---
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`;
            }
        }, { passive: true });
    }

    // --- Hover tilt on work cards ---
    document.querySelectorAll('.work-card, .venture-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // --- Cursor follower dot (subtle) ---
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-dot');
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        dotX += (mouseX - dotX) * 0.15;
        dotY += (mouseY - dotY) * 0.15;
        cursor.style.left = `${dotX}px`;
        cursor.style.top = `${dotY}px`;
        requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Expand cursor on interactive elements
    document.querySelectorAll('a, button, .work-card, .venture-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'));
    });

    // --- Active nav link based on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const updateActiveNav = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --- Handwriting reveal on scroll ---
    const handwriteElements = document.querySelectorAll(
        '.doodle-note, .work-doodle, .venture-annotation, ' +
        '.case-annotation, .philosophy-doodle, .gallery-note, ' +
        '.cta-doodle, .footer-tagline, .audience-closer strong, ' +
        '.intro-callout strong, .growth-rule .handwritten'
    );

    handwriteElements.forEach(el => el.classList.add('handwrite-reveal'));

    const handwriteObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('written');
                handwriteObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -30px 0px'
    });

    handwriteElements.forEach(el => handwriteObserver.observe(el));
});
