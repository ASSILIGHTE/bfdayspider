/**
 * SPIDER-MAN: ACROSS YOUR STORY 🕷️🕸️
 * National Boyfriend Day Story (Bittersweet & Heartfelt Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const pages = document.querySelectorAll('.page');
  const btnPage1 = document.getElementById('btn-page1');
  const btnPage2 = document.getElementById('btn-page2');
  const btnPage3 = document.getElementById('btn-page3');
  const btnSurprise = document.getElementById('btn-surprise');
  const surpriseToast = document.getElementById('surprise-toast');
  const btnRestart = document.getElementById('btn-restart');
  const p4Intro = document.getElementById('p4-intro');
  const p4Main = document.getElementById('p4-main');

  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  const confettiContainer = document.getElementById('confetti-container');

  // Spider-Man Mascot Character Elements
  const spideyMascot = document.getElementById('spidey-mascot');
  const spideyBubble = document.getElementById('spidey-bubble');

  // Envelope Elements
  const waxSeal = document.getElementById('wax-seal');
  const envelopeWrapper = document.getElementById('envelope-wrapper');

  // 3D Flip Cards
  const flipCards = document.querySelectorAll('.flip-card');

  // Photo Modal Elements
  const photoModal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const photoTriggers = document.querySelectorAll('.photo-trigger');

  let currentPage = 1;
  let audioStarted = false;
  let p4Timeout = null;
  let mousePos = { x: -1000, y: -1000 };

  // --------------------------------------------------------------------------
  // Interactive Swinging Spider-Man Character Mascot Handler 🕷️🕸️
  // --------------------------------------------------------------------------
  const spideyQuotes = [
    'Happy Boyfriend Day! 🕸️',
    'Terima Kasih Ya! ⚡',
    'Semoga Bahagia Selalu! 🕷️',
    'You Were My Hero! ❤️',
    'Best Wishes For You! 🕸️',
    'Thank You For Memories! 💥'
  ];

  if (spideyMascot) {
    spideyMascot.addEventListener('click', (e) => {
      e.stopPropagation();
      playWebShooterSound();
      playSpiderSenseSound();

      // Trigger 360 web flip animation
      spideyMascot.classList.remove('flip');
      void spideyMascot.offsetWidth;
      spideyMascot.classList.add('flip');

      // Web particle bursts
      spawn3DWebShooterBurst(e.clientX, e.clientY, 22);
      createSpideyBurst(18);

      // Random speech bubble quote
      if (spideyBubble) {
        const nextQuote = spideyQuotes[Math.floor(Math.random() * spideyQuotes.length)];
        const span = spideyBubble.querySelector('span');
        if (span) span.textContent = nextQuote;
      }
    });
  }

  // --------------------------------------------------------------------------
  // Interactive Spidey Envelope Opening Handler ✉️🕸️
  // --------------------------------------------------------------------------
  function openEnvelope() {
    if (envelopeWrapper && !envelopeWrapper.classList.contains('open')) {
      playWebShooterSound();
      playSpiderSenseSound();
      envelopeWrapper.classList.add('open');
      spawn3DWebShooterBurst(window.innerWidth / 2, window.innerHeight / 2, 20);
      createSpideyBurst(16);
    }
  }

  if (waxSeal) waxSeal.addEventListener('click', openEnvelope);
  if (envelopeWrapper) envelopeWrapper.addEventListener('click', openEnvelope);

  // --------------------------------------------------------------------------
  // 3D Flip Cards Click Listener 🕷️⚡
  // --------------------------------------------------------------------------
  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      playWebShooterSound();
      card.classList.toggle('flipped');
    });
  });

  // --------------------------------------------------------------------------
  // Photo Modal / Lightbox Handlers 📸
  // --------------------------------------------------------------------------
  photoTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const imgSrc = trigger.getAttribute('data-img');
      const captionText = trigger.getAttribute('data-caption') || 'Special Memory 🕷️❤️';

      if (imgSrc) {
        modalImg.src = imgSrc;
        modalCaption.textContent = captionText;
        photoModal.classList.remove('hidden');
        playSpiderSenseSound();
        spawn3DWebShooterBurst(e.clientX, e.clientY, 10);
      }
    });
  });

  function closeModal() {
    photoModal.classList.add('hidden');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !photoModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // Spider-Man Web & Particle Canvas Engine (Sleek Ambient Multiverse Web Physics) 🕷️🕸️
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d', { alpha: true });
  let spiderEmblems = [];
  let webNodes = [];
  let webSparks = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  window.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      mousePos.x = e.touches[0].clientX;
      mousePos.y = e.touches[0].clientY;
    }
  });

  // Sleek Ambient 3D Spider Emblem
  class SpiderEmblem3D {
    constructor(x, y, isBurst = false) {
      this.x = x !== undefined ? x : Math.random() * canvas.width;
      this.y = y !== undefined ? y : Math.random() * canvas.height;
      this.size = Math.random() * 5 + 7;

      this.angle = Math.random() * Math.PI * 2;
      this.speed = isBurst ? Math.random() * 3.5 + 1.8 : Math.random() * 1.2 + 0.6;

      this.vx = Math.cos(this.angle) * this.speed;
      this.vy = Math.sin(this.angle) * this.speed;

      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.03;

      this.turnPhase = Math.random() * Math.PI * 2;
      this.turnSpeed = Math.random() * 0.02 + 0.01;

      this.opacity = isBurst ? Math.random() * 0.6 + 0.4 : Math.random() * 0.25 + 0.15;
      this.life = 1;
      this.isBurst = isBurst;
      this.decay = isBurst ? Math.random() * 0.02 + 0.015 : 0;
      this.colorMain = ['rgba(255, 30, 39, ', 'rgba(0, 132, 255, ', 'rgba(255, 204, 0, '][Math.floor(Math.random() * 3)];
    }

    update() {
      this.rot += this.rotSpeed;
      this.turnPhase += this.turnSpeed;
      this.angle += Math.sin(this.turnPhase) * 0.04;

      this.vx = Math.cos(this.angle) * this.speed;
      this.vy = Math.sin(this.angle) * this.speed;

      this.x += this.vx;
      this.y += this.vy;

      if (this.isBurst) {
        this.speed *= 0.96;
        this.life -= this.decay;
        this.opacity = Math.max(0, this.life);
      } else {
        if (this.x < -30) this.x = canvas.width + 30;
        if (this.x > canvas.width + 30) this.x = -30;
        if (this.y < -30) this.y = canvas.height + 30;
        if (this.y > canvas.height + 30) this.y = -30;
      }
    }

    draw() {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);

      const s = this.size;
      const alpha = Math.max(0, this.opacity);

      // Fine Subtle Spider Legs
      ctx.strokeStyle = this.colorMain + alpha + ')';
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';

      // Left Legs
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.1);
      ctx.quadraticCurveTo(-s * 0.8, -s * 0.8, -s * 1.1, -s * 0.3);
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-s * 0.8, -s * 0.3, -s * 1.3, 0);
      ctx.moveTo(0, s * 0.1);
      ctx.quadraticCurveTo(-s * 0.8, s * 0.3, -s * 1.2, s * 0.6);
      ctx.stroke();

      // Right Legs
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.1);
      ctx.quadraticCurveTo(s * 0.8, -s * 0.8, s * 1.1, -s * 0.3);
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(s * 0.8, -s * 0.3, s * 1.3, 0);
      ctx.moveTo(0, s * 0.1);
      ctx.quadraticCurveTo(s * 0.8, s * 0.3, s * 1.2, s * 0.6);
      ctx.stroke();

      // Spider Body
      ctx.fillStyle = this.colorMain + alpha + ')';
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.2, s * 0.22, s * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(0, s * 0.25, s * 0.35, s * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Interactive Web Node
  class WebNode3D {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.color = ['#ff1e27', '#0084ff', '#ffffff'][Math.floor(Math.random() * 3)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Ambient Web Sparks
  class WebSpark3D {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.size = Math.random() * 3 + 1.5;
      this.speedY = Math.random() * 0.6 + 0.3;
      this.swayFreq = Math.random() * 0.03 + 0.01;
      this.swayAmp = Math.random() * 1.2 + 0.4;
      this.swayPhase = Math.random() * 6.28;
      this.opacity = Math.random() * 0.4 + 0.2;
      this.color = ['#ff1e27', '#0084ff', '#ffcc00'][Math.floor(Math.random() * 3)];
    }

    update() {
      this.swayPhase += this.swayFreq;
      this.x += Math.sin(this.swayPhase) * this.swayAmp;
      this.y -= this.speedY;

      if (this.y < -20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Initialize Particles & Web Nodes
  const nodeCount = window.innerWidth < 600 ? 15 : 25;
  const sparkCount = window.innerWidth < 600 ? 10 : 16;
  const emblemCount = window.innerWidth < 600 ? 6 : 10;

  for (let i = 0; i < nodeCount; i++) {
    webNodes.push(new WebNode3D());
  }

  for (let i = 0; i < sparkCount; i++) {
    webSparks.push(new WebSpark3D());
  }

  for (let i = 0; i < emblemCount; i++) {
    spiderEmblems.push(new SpiderEmblem3D());
  }

  function spawn3DWebShooterBurst(x, y, count = 16) {
    for (let i = 0; i < count; i++) {
      if (spiderEmblems.length < 40) {
        spiderEmblems.push(new SpiderEmblem3D(x, y, true));
      }
    }
  }

  // Canvas Render Loop with Subtle Ambient Web Lines
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < webSparks.length; i++) {
      webSparks[i].update();
      webSparks[i].draw();
    }

    for (let i = 0; i < webNodes.length; i++) {
      webNodes[i].update();
      webNodes[i].draw();

      for (let j = i + 1; j < webNodes.length; j++) {
        const dx = webNodes[i].x - webNodes[j].x;
        const dy = webNodes[i].y - webNodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.save();
          ctx.strokeStyle = 'rgba(0, 132, 255, ' + (1 - dist / 100) * 0.18 + ')';
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(webNodes[i].x, webNodes[i].y);
          ctx.lineTo(webNodes[j].x, webNodes[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }

      if (mousePos.x > 0) {
        const mdx = webNodes[i].x - mousePos.x;
        const mdy = webNodes[i].y - mousePos.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 140) {
          ctx.save();
          ctx.strokeStyle = 'rgba(255, 30, 39, ' + (1 - mdist / 140) * 0.3 + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(webNodes[i].x, webNodes[i].y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    for (let i = spiderEmblems.length - 1; i >= 0; i--) {
      const emb = spiderEmblems[i];
      emb.update();
      emb.draw();
      if (emb.isBurst && emb.opacity <= 0) spiderEmblems.splice(i, 1);
    }

    requestAnimationFrame(loop);
  }

  loop();

  // --------------------------------------------------------------------------
  // Audio Player Control 🎵🕷️
  // --------------------------------------------------------------------------
  function playAudio() {
    if (!audioStarted) {
      bgMusic.volume = 0.5;
      bgMusic.play().then(() => {
        audioStarted = true;
        musicToggle.classList.add('playing');
      }).catch(err => {
        console.log('Autoplay prevented:', err);
      });
    }
  }

  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      audioStarted = true;
      musicToggle.classList.add('playing');
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
    }
  });

  // --------------------------------------------------------------------------
  // Audio Synthesizer (Web Shooter & Spider Sense Sound FX) ⚡
  // --------------------------------------------------------------------------
  function playWebShooterSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();

      const bufferSize = audioCtx.sampleRate * 0.08;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(3500, audioCtx.currentTime + 0.07);
      filter.Q.value = 4;

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();
      noise.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  function playSpiderSenseSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();

      const freqs = [880, 1174.66, 1760];
      freqs.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.03);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.25, audioCtx.currentTime + idx * 0.03 + 0.12);

        gain.gain.setValueAtTime(0.06, audioCtx.currentTime + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.03 + 0.12);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + idx * 0.03);
        osc.stop(audioCtx.currentTime + idx * 0.03 + 0.12);
      });
    } catch (e) {}
  }

  // --------------------------------------------------------------------------
  // Confetti Layer 🕷️
  // --------------------------------------------------------------------------
  function createSpideyBurst(count = 18) {
    const emojis = ['🕷️', '🕸️', '⚡', '💥', '🦸‍♂️', '❤️'];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-heart spidey-confetti';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const left = 10 + Math.random() * 80;
      el.style.left = `${left}vw`;
      el.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
      el.style.animationDelay = `${Math.random() * 0.2}s`;

      confettiContainer.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, 3000);
    }
  }

  // --------------------------------------------------------------------------
  // Navigation & Page Manager 🕷️
  // --------------------------------------------------------------------------
  function goToPage(pageNumber) {
    playWebShooterSound();
    playAudio();

    pages.forEach((page, idx) => {
      if (idx + 1 === pageNumber) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    currentPage = pageNumber;

    if (pageNumber === 4) {
      triggerPage4Sequence();
    } else {
      document.body.classList.remove('spidey-warm-bg');
      if (p4Timeout) clearTimeout(p4Timeout);
      p4Intro.classList.remove('fade-out');
      p4Main.classList.add('hidden');
    }
  }

  function triggerPage4Sequence() {
    p4Intro.classList.remove('fade-out');
    p4Intro.classList.remove('hidden');
    p4Main.classList.add('hidden');

    p4Timeout = setTimeout(() => {
      p4Intro.classList.add('fade-out');
      
      setTimeout(() => {
        p4Intro.classList.add('hidden');
        p4Main.classList.remove('hidden');
        document.body.classList.add('spidey-warm-bg');
        spawn3DWebShooterBurst(window.innerWidth / 2, window.innerHeight / 2, 25);
        createSpideyBurst(20);
        playSpiderSenseSound();
      }, 500);
    }, 2000);
  }

  // Button Listeners
  btnPage1.addEventListener('click', (e) => {
    spawn3DWebShooterBurst(e.clientX, e.clientY);
    createSpideyBurst(12);
    goToPage(2);
  });

  btnPage2.addEventListener('click', (e) => {
    spawn3DWebShooterBurst(e.clientX, e.clientY);
    goToPage(3);
  });

  btnPage3.addEventListener('click', (e) => {
    spawn3DWebShooterBurst(e.clientX, e.clientY);
    goToPage(4);
  });

  // Page 3 Web Shooter Interaction
  btnSurprise.addEventListener('click', (e) => {
    playWebShooterSound();
    playSpiderSenseSound();
    spawn3DWebShooterBurst(e.clientX, e.clientY, 20);
    createSpideyBurst(20);
    surpriseToast.classList.remove('hidden');
    
    surpriseToast.style.animation = 'none';
    void surpriseToast.offsetWidth;
    surpriseToast.style.animation = 'toastPop 0.4s ease forwards';
  });

  // Restart Button
  btnRestart.addEventListener('click', () => {
    goToPage(1);
    if (surpriseToast) surpriseToast.classList.add('hidden');
    if (envelopeWrapper) envelopeWrapper.classList.remove('open');
  });

  // Floating Spidey Stickers Click Listeners
  const cuteStickers = document.querySelectorAll('.cute-sticker');
  cuteStickers.forEach(sticker => {
    sticker.addEventListener('click', (e) => {
      e.stopPropagation();
      playWebShooterSound();
      spawn3DWebShooterBurst(e.clientX, e.clientY, 8);
      createSpideyBurst(8);
      
      sticker.style.transform = 'scale(1.25) rotate(15deg)';
      setTimeout(() => {
        sticker.style.transform = '';
      }, 350);
    });
  });

  let lastTrailTime = 0;
  const trailEmojis = ['🕷️', '🕸️', '⚡', '💥'];

  function createCursorTrail(x, y) {
    const now = Date.now();
    if (now - lastTrailTime < 65) return;
    lastTrailTime = now;

    const el = document.createElement('div');
    el.className = 'mouse-heart-trail spidey-trail';
    el.textContent = trailEmojis[Math.floor(Math.random() * trailEmojis.length)];
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    document.body.appendChild(el);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1000);
  }

  window.addEventListener('mousemove', (e) => {
    createCursorTrail(e.clientX, e.clientY);
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      createCursorTrail(e.touches[0].clientX, e.touches[0].clientY);
    }
  });

  // 3D Animated Spider Emblem Core Click Listener 🕷️
  const flower3DWrappers = document.querySelectorAll('.flower-3d-wrapper');
  flower3DWrappers.forEach(flower => {
    flower.addEventListener('click', (e) => {
      e.stopPropagation();
      playWebShooterSound();
      playSpiderSenseSound();
      spawn3DWebShooterBurst(e.clientX, e.clientY, 15);
      createSpideyBurst(12);
    });
  });

  // Fullscreen Mode Toggle Handler
  const fullscreenToggle = document.getElementById('fullscreen-toggle');
  if (fullscreenToggle) {
    fullscreenToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      playWebShooterSound();
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
          docEl.requestFullscreen().catch(() => {});
        } else if (docEl.webkitRequestFullscreen) {
          docEl.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target.closest('.modal-content') || e.target.closest('.btn-primary') || e.target.closest('.btn-interactive') || e.target.closest('.cute-sticker') || e.target.closest('#wax-seal') || e.target.closest('.flower-3d-wrapper') || e.target.closest('.fullscreen-widget') || e.target.closest('#spidey-mascot')) return;
    spawn3DWebShooterBurst(e.clientX, e.clientY, 4);
  });

});
