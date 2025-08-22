document.addEventListener('DOMContentLoaded', function() {
    // Music toggle functionality
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Scroll down arrow functionality
    document.querySelector('.scroll-down').addEventListener('click', function() {
        document.querySelector('#memories').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Create floating hearts in footer
    const heartsContainer = document.querySelector('.hearts-animation');
    const colors = ['#ff6b6b', '#ffa3a3', '#ffd3d3', '#ffb8b8'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = -20 + 'px';
        heart.style.opacity = Math.random();
        heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    // Add CSS for falling animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Generate hearts periodically
    setInterval(createHeart, 300);
    
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            
            lightbox.appendChild(img);
        });
    });
    
    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
    });
    
    // Add lightbox styles dynamically
    const lightboxStyle = document.createElement('style');
    lightboxStyle.innerHTML = `
        #lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
        }
        
        #lightbox.active {
            opacity: 1;
            pointer-events: all;
        }
        
        #lightbox img {
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
        }
    `;
    document.head.appendChild(lightboxStyle);
    
    // Scroll animation for sections
    const sections = document.querySelectorAll('.section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Set initial styles for animation
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});