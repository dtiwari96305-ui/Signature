document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        const navContent = nav.querySelector('.max-w-[1400px]');
        if (window.scrollY > 20) {
            navContent.classList.add('shadow-2xl', 'bg-white/95', 'border-slate-100');
            navContent.classList.remove('bg-white/80');
        } else {
            navContent.classList.remove('shadow-2xl', 'bg-white/95', 'border-slate-100');
            navContent.classList.add('bg-white/80');
        }
    });

    // Accordion Logic
    window.toggleAccordion = function (button) {
        const allAccordions = document.querySelectorAll('.group.bg-white.rounded-3xl');
        const content = button.nextElementSibling;
        const icon = button.querySelector('[data-lucide="chevron-down"]');

        // Close other items
        allAccordions.forEach(item => {
            const itemContent = item.querySelector('.max-h-96, .max-h-0');
            if (itemContent && itemContent !== content) {
                itemContent.classList.remove('max-h-96');
                itemContent.classList.add('max-h-0');
                const otherIcon = item.querySelector('[data-lucide="chevron-down"]');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current item
        if (content.classList.contains('max-h-0')) {
            content.classList.remove('max-h-0');
            content.classList.add('max-h-96');
            icon.style.transform = 'rotate(180deg)';
        } else {
            content.classList.remove('max-h-96');
            content.classList.add('max-h-0');
            icon.style.transform = 'rotate(0deg)';
        }
    };

    // GSAP Reveal Animations
    gsap.utils.toArray('.reveal').forEach((elem) => {
        gsap.fromTo(elem,
            {
                opacity: 0,
                y: 20,
                scale: 0.98
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 92%", // Trigger even earlier for mobile safety
                    toggleActions: "play none none none",
                    onEnter: () => elem.classList.add('revealed') // Tag for safety
                }
            }
        );
    });

    // Back to Top Logic
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Carousel Logic
    const track = document.querySelector('.testimonial-track');
    const nextBtn = document.getElementById('nextTestimonial');
    const prevBtn = document.getElementById('prevTestimonial');

    if (track && nextBtn && prevBtn) {
        let index = 0;

        function updateCarousel() {
            const gap = window.innerWidth > 768 ? 30 : 20;
            const card = track.querySelector('.testimonial-card');
            if (!card) return;

            const cardWidth = card.offsetWidth;
            const totalStep = cardWidth + gap;

            const visibleCards = window.innerWidth > 1024 ? 3 : (window.innerWidth > 768 ? 2 : 1);
            const maxIndex = track.children.length - visibleCards;

            index = Math.max(0, Math.min(index, maxIndex));
            track.style.transform = `translateX(${-index * totalStep}px)`;

            prevBtn.disabled = index === 0;
            nextBtn.disabled = index >= maxIndex;
            prevBtn.style.opacity = index === 0 ? '0.2' : '1';
            nextBtn.style.opacity = index >= maxIndex ? '0.2' : '1';
        }

        nextBtn.addEventListener('click', () => {
            index++;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            index--;
            updateCarousel();
        });

        window.addEventListener('resize', () => {
            updateCarousel();
            ScrollTrigger.refresh();
        });

        setTimeout(updateCarousel, 100);
    }

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }

    // Proactive ScrollTrigger refresh for mobile layout shifts
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // Refresh after a slight delay to account for dynamic height changes
    setTimeout(() => ScrollTrigger.refresh(), 1000);
});
