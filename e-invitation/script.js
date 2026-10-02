// ============================================
// WEDDING INVITATION - WAWAN & RIA
// Ultra Interactive & Responsive JavaScript
// ============================================

// ============================================
// GUEST LIST - EDIT NAMA TAMU DI SINI
// ============================================
const guestList = [
    // Tambahkan nama tamu di sini
    // Contoh format:
    // "Nama Lengkap Tamu 1",
    // "Nama Lengkap Tamu 2",
    // "Nama Lengkap Tamu 3 / Pasangan",
];

// ============================================
// MOBILE DETECTION & OPTIMIZATION
// ============================================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Prevent zoom on double tap for mobile
if (isMobile) {
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// ============================================
// GET URL PARAMETER
// ============================================
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Set guest name from URL parameter
const guestName = getUrlParameter('to');
if (guestName) {
    const envelopeGuestElem = document.getElementById('envelopeGuestName');
    const coverGuestElem = document.getElementById('guestName');
    if (envelopeGuestElem) envelopeGuestElem.textContent = guestName;
    if (coverGuestElem) coverGuestElem.textContent = guestName;
}

// ============================================
// ENVELOPE ANIMATION - TOUCH & CLICK
// ============================================
let envelopeOpened = false;
const envelopeWrapper = document.getElementById('envelopeWrapper');

function openEnvelope() {
    if (!envelopeOpened) {
        envelopeOpened = true;
        
        // Add haptic feedback for mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Open envelope
        envelopeWrapper.classList.add('open');
        
        // After animation, hide envelope and show cover
        setTimeout(() => {
            document.getElementById('envelopeContainer').classList.add('opened');
            document.getElementById('cover').classList.add('show');
        }, 1500);
    }
}

// Support both click and touch
if (envelopeWrapper) {
    envelopeWrapper.addEventListener('click', openEnvelope);
    envelopeWrapper.addEventListener('touchend', function(e) {
        e.preventDefault();
        openEnvelope();
    });
}

// ============================================
// RENDER GUEST LIST - RESPONSIVE
// ============================================
function renderGuestList() {
    const container = document.getElementById('guestListContainer');
    if (!container) return;
    
    if (guestList.length === 0) {
        container.innerHTML = '<p class="text-center col-span-2 opacity-70" style="color: var(--accent);">Belum ada daftar tamu. Silakan edit di file script.js</p>';
        return;
    }
    
    container.innerHTML = guestList.map((guest, index) => `
        <div class="p-5 rounded-xl transition-all duration-300 hover:transform hover:scale-105" 
             style="background: rgba(60, 48, 32, 0.4); border: 1px solid rgba(212, 175, 137, 0.15);"
             data-aos="fade-up" 
             data-aos-delay="${index * 50}">
            <p class="text-center" style="color: var(--accent);">${guest}</p>
        </div>
    `).join('');
}

// ============================================
// OPEN INVITATION - SMOOTH TRANSITION
// ============================================
function openInvitation() {
    const cover = document.getElementById('cover');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    
    // Hide cover with smooth animation
    cover.classList.add('hidden');
    document.body.classList.remove('cover-active');
    
    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(30);
    }
    
    // Show music button and play music
    setTimeout(() => {
        if (musicBtn) musicBtn.style.display = 'flex';
        
        // Try to play music
        if (bgMusic) {
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Music playing');
                }).catch(e => {
                    console.log('Autoplay prevented. Waiting for user interaction...');
                    // Add one-time click/touch listener to play
                    const playOnInteraction = () => {
                        bgMusic.play();
                        document.removeEventListener('click', playOnInteraction);
                        document.removeEventListener('touchstart', playOnInteraction);
                    };
                    document.addEventListener('click', playOnInteraction, { once: true });
                    document.addEventListener('touchstart', playOnInteraction, { once: true });
                });
            }
        }
        
        // Initialize AOS with device-specific settings
        AOS.init({
            duration: isMobile ? 800 : 1200,
            once: true,
            offset: isMobile ? 50 : 100,
            easing: 'ease-out-cubic',
            mirror: false,
            anchorPlacement: 'top-bottom'
        });
    }, 600);
}

// ============================================
// MUSIC CONTROL - ENHANCED
// ============================================
let musicPlaying = true;
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');

if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(20);
        }
        
        if (musicPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                </svg>
            `;
        }
        musicPlaying = !musicPlaying;
    });
    
    // Prevent music button from interfering with scrolling
    musicBtn.addEventListener('touchstart', function(e) {
        e.stopPropagation();
    }, { passive: true });
}

// ============================================
// COUNTDOWN TIMER - OPTIMIZED
// ============================================
function updateCountdown() {
    const weddingDate = new Date('2026-10-04T09:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update with smooth transition
    updateCountdownNumber('days', days >= 0 ? days : 0);
    updateCountdownNumber('hours', hours >= 0 ? hours : 0);
    updateCountdownNumber('minutes', minutes >= 0 ? minutes : 0);
    updateCountdownNumber('seconds', seconds >= 0 ? seconds : 0);
    
    if (distance < 0) {
        ['days', 'hours', 'minutes', 'seconds'].forEach(id => updateCountdownNumber(id, 0));
    }
}

function updateCountdownNumber(id, value) {
    const element = document.getElementById(id);
    if (element && element.textContent !== value.toString()) {
        element.style.transform = 'scale(1.1)';
        element.textContent = value;
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// Update every second
setInterval(updateCountdown, 1000);
updateCountdown();

// ============================================
// RSVP FORM HANDLER - ENHANCED
// ============================================
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nama = document.getElementById('nama').value;
        const kehadiran = document.getElementById('kehadiran').value;
        const pesan = document.getElementById('pesan').value;
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }
        
        // Create new ucapan element
        const ucapanList = document.getElementById('ucapanList');
        if (ucapanList) {
            const newUcapan = document.createElement('div');
            newUcapan.className = 'ucapan-item';
            
            const statusColor = kehadiran === 'Hadir' ? 'var(--secondary)' : 'var(--accent)';
            
            newUcapan.innerHTML = `
                <p class="font-semibold text-lg mb-2" style="color: var(--light);">${escapeHtml(nama)}</p>
                <p class="text-sm mb-3" style="color: ${statusColor};">${escapeHtml(kehadiran)}</p>
                <p class="opacity-90" style="color: var(--accent);">${escapeHtml(pesan)}</p>
            `;
            
            // Insert at the beginning with smooth animation
            newUcapan.style.opacity = '0';
            newUcapan.style.transform = 'translateY(-20px)';
            ucapanList.insertBefore(newUcapan, ucapanList.firstChild);
            
            setTimeout(() => {
                newUcapan.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                newUcapan.style.opacity = '1';
                newUcapan.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Reset form
        this.reset();
        
        // Show success message
        showSuccessMessage();
        
        // Scroll to ucapan list smoothly
        setTimeout(() => {
            if (ucapanList) {
                ucapanList.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 500);
    });
}

// ============================================
// ESCAPE HTML - SECURITY
// ============================================
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ============================================
// SUCCESS MESSAGE - RESPONSIVE
// ============================================
function showSuccessMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: ${isMobile ? '20px' : '30px'};
            right: ${isMobile ? '20px' : '30px'};
            left: ${isMobile ? '20px' : 'auto'};
            max-width: ${isMobile ? 'calc(100% - 40px)' : '400px'};
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            padding: ${isMobile ? '16px 20px' : '20px 30px'};
            border-radius: 15px;
            box-shadow: 0 15px 40px rgba(139, 115, 85, 0.5);
            z-index: 10000;
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            gap: 15px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: slideInRight 0.5s ease;
        ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
                <p style="font-weight: 600; margin-bottom: 4px;">Terima Kasih!</p>
                <p style="font-size: 14px; opacity: 0.9;">Ucapan Anda telah terkirim</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Remove after 4 seconds
    setTimeout(() => {
        const msgElem = message.firstElementChild;
        if (msgElem) {
            msgElem.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                if (document.body.contains(message)) {
                    document.body.removeChild(message);
                }
            }, 500);
        }
    }, 4000);
}

// ============================================
// GALLERY INTERACTIONS
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// VIEWPORT HEIGHT FIX FOR MOBILE
// ============================================
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    renderGuestList();
    
    // Add smooth transition to countdown numbers
    const countdownElements = ['days', 'hours', 'minutes', 'seconds'];
    countdownElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.transition = 'transform 0.2s ease';
        }
    });
    
    // Add animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Preload critical images
    const criticalImages = [
        'asset/bg 2.jpg',
        'asset/IMG_1447.JPG.jpeg',
        'asset/IMG_1448.JPG.jpeg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION - LAZY LOADING
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PREVENT CONTEXT MENU ON IMAGES (OPTIONAL)
// ============================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', e => e.preventDefault());
});

// ============================================
// CONSOLE GREETING
// ============================================
console.log('%c💍 Wawan & Ria Wedding Invitation', 'font-size: 20px; font-weight: bold; color: #D4AF89;');
console.log('%cMade with love ❤️', 'font-size: 14px; color: #8B7355;');
