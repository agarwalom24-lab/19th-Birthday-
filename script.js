/* =========================================================
   BIRTHDAY WEBSITE — main script
   Organized into clear sections:
   1. Floating petals / sparkles / butterflies
   2. Entry screen -> main content transition + music
   3. Hero title letter-by-letter animation
   4. Envelope open + typewriter letter
   5. Music toggle control
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1. FLOATING LAYER — petals, sparkles, butterflies
     ========================================================= */
  const floatingLayer = document.getElementById('floatingLayer');

  // A soft pink/cream petal, drawn as a simple SVG shape
  function createPetalSVG() {
    const hue = Math.random() > 0.5 ? '#f6d9d9' : '#e6cba0';
    return `
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2 C28 2 36 10 36 20 C36 30 28 38 20 38 C12 38 4 30 4 20 C4 10 12 2 20 2 Z"
              fill="${hue}" opacity="0.85"/>
      </svg>`;
  }

  // A small, delicate 5-petal flower bloom, in one of a few soft palettes
  function createFlowerSVG() {
    const palettes = [
      { petal: '#f6d9d9', center: '#e6cba0' },
      { petal: '#ded3e8', center: '#f6d9d9' },
      { petal: '#fdf1e6', center: '#cdd9c4' },
      { petal: '#f1e0e6', center: '#cba36b' }
    ];
    const p = palettes[Math.floor(Math.random() * palettes.length)];
    return `
      <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(30,30)">
          <ellipse cx="0" cy="-16" rx="9" ry="14" fill="${p.petal}" opacity="0.92"/>
          <ellipse cx="0" cy="-16" rx="9" ry="14" fill="${p.petal}" opacity="0.92" transform="rotate(72)"/>
          <ellipse cx="0" cy="-16" rx="9" ry="14" fill="${p.petal}" opacity="0.92" transform="rotate(144)"/>
          <ellipse cx="0" cy="-16" rx="9" ry="14" fill="${p.petal}" opacity="0.92" transform="rotate(216)"/>
          <ellipse cx="0" cy="-16" rx="9" ry="14" fill="${p.petal}" opacity="0.92" transform="rotate(288)"/>
          <circle cx="0" cy="0" r="7" fill="${p.center}"/>
        </g>
      </svg>`;
  }

  function createButterflySVG() {
    return `
      <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 20 C20 0 0 0 4 14 C6 22 20 22 30 20 Z" fill="#ded3e8" opacity="0.9"/>
        <path d="M30 20 C40 0 60 0 56 14 C54 22 40 22 30 20 Z" fill="#f6d9d9" opacity="0.9"/>
        <path d="M30 20 C22 34 6 36 8 26 C10 20 22 20 30 20 Z" fill="#cdd9c4" opacity="0.85"/>
        <path d="M30 20 C38 34 54 36 52 26 C50 20 38 20 30 20 Z" fill="#e6cba0" opacity="0.85"/>
        <ellipse cx="30" cy="20" rx="1.6" ry="8" fill="#a3565f"/>
      </svg>`;
  }

  function spawnPetal() {
    const el = document.createElement('div');
    el.className = 'petal';
    el.innerHTML = createPetalSVG();
    const size = 14 + Math.random() * 16;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${Math.random() * 100}vw`;
    el.style.setProperty('--drift', `${(Math.random() - 0.5) * 200}px`);
    const duration = 12 + Math.random() * 10;
    el.style.animation = `fallDrift ${duration}s linear forwards`;
    floatingLayer.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
  }

  function spawnSparkle() {
    const el = document.createElement('div');
    el.className = 'sparkle';
    const size = 4 + Math.random() * 6;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${Math.random() * 100}vw`;
    el.style.top = `${Math.random() * 100}vh`;
    const duration = 3 + Math.random() * 3;
    el.style.animation = `twinkle ${duration}s ease-in-out infinite`;
    floatingLayer.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000 * 3);
  }

  function spawnFlower() {
    const el = document.createElement('div');
    el.className = 'flower';
    el.innerHTML = createFlowerSVG();
    const size = 28 + Math.random() * 26;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.top = `${5 + Math.random() * 80}vh`;

    // alternate: drift in from the left or the right, for gentle variety
    const fromLeft = Math.random() > 0.5;
    el.style.left = fromLeft ? '-8vw' : 'auto';
    el.style.right = fromLeft ? 'auto' : '-8vw';
    el.style.setProperty('--drift-x', fromLeft ? '116vw' : '-116vw');
    el.style.setProperty('--rot', `${(Math.random() - 0.5) * 60}deg`);

    const duration = 16 + Math.random() * 8;
    el.style.animation = `driftAcross ${duration}s ease-in-out forwards`;
    floatingLayer.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
  }

  function spawnButterfly() {
    const el = document.createElement('div');
    el.className = 'butterfly';
    el.innerHTML = createButterflySVG();
    const size = 26 + Math.random() * 14;
    el.style.width = `${size}px`;
    el.style.height = `${size * 0.66}px`;
    el.style.left = `${Math.random() * 90}vw`;
    el.style.top = `${60 + Math.random() * 30}vh`;
    const duration = 8 + Math.random() * 4;
    el.style.animation = `flutter ${duration}s ease-in-out forwards`;
    floatingLayer.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
  }

  // Gentle, sparse spawning — quality over quantity, keeps 60fps calm
  setInterval(spawnPetal, 1400);
  setInterval(spawnSparkle, 900);
  setInterval(spawnButterfly, 6000);

  // seed a few immediately so the page doesn't feel empty on load
  for (let i = 0; i < 5; i++) setTimeout(spawnPetal, i * 300);
  for (let i = 0; i < 8; i++) setTimeout(spawnSparkle, i * 200);


  /* =========================================================
     2. ENTRY SCREEN -> MAIN CONTENT + MUSIC START
     ========================================================= */
  const entryScreen = document.getElementById('entryScreen');
  const beginBtn = document.getElementById('beginBtn');
  const mainContent = document.getElementById('mainContent');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  beginBtn.addEventListener('click', () => {
    // Attempt to play music (user gesture satisfies autoplay policies)
    bgMusic.volume = 0;
    bgMusic.play().then(() => {
      fadeInAudio(bgMusic, 0.6, 1800);
      musicToggle.classList.add('show', 'spinning');
    }).catch(() => {
      // If playback fails for any reason, still continue the experience
      musicToggle.classList.add('show');
    });

    entryScreen.classList.add('hide');
    mainContent.classList.add('reveal');
    mainContent.setAttribute('aria-hidden', 'false');

    // Fire the hero title letter animation once revealed
    setTimeout(animateHeroTitle, 400);
  });

  function fadeInAudio(audio, targetVolume, duration) {
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(targetVolume, (targetVolume * currentStep) / steps);
      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);
  }


  /* =========================================================
     3. HERO TITLE — letter-by-letter reveal
     ========================================================= */
  const heroTitle = document.getElementById('heroTitle');
  let heroAnimated = false;

  function animateHeroTitle() {
    if (heroAnimated) return;
    heroAnimated = true;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.style.animationDelay = `${i * 0.035}s`;
      span.textContent = char === ' ' ? '\u00A0' : char;
      heroTitle.appendChild(span);
    });
  }


  /* =========================================================
     4. ENVELOPE + TYPEWRITER LETTER
     ========================================================= */
  const openLetterBtn = document.getElementById('openLetterBtn');
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const envelope = document.getElementById('envelope');
  const closeLetterBtn = document.getElementById('closeLetterBtn');
  const envelopeSeal = document.querySelector('.envelope-seal');
  const typewriterText = document.getElementById('typewriterText');

  // ---- PLACE YOUR LETTER TEXT HERE ----
  const LETTER_TEXT = "PASTE MY LETTER HERE";
  // --------------------------------------

  let typewriterStarted = false;

  function openEnvelope() {
    envelopeOverlay.classList.add('show');
    envelopeOverlay.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      envelope.classList.add('open');
      if (!typewriterStarted) {
        typewriterStarted = true;
        setTimeout(typeLetter, 1100);
      }
    }, 500);
  }

  function closeEnvelope() {
    envelopeOverlay.classList.remove('show');
    envelopeOverlay.setAttribute('aria-hidden', 'true');
  }

  function typeLetter() {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '\u00A0';
    typewriterText.appendChild(cursor);

    const typingSpeed = 38; // ms per character — elegant, unhurried pace

    function typeNext() {
      if (i < LETTER_TEXT.length) {
        cursor.insertAdjacentText('beforebegin', LETTER_TEXT.charAt(i));
        i++;
        setTimeout(typeNext, typingSpeed);
      } else {
        cursor.remove();
        envelope.classList.add('letter-done');
      }
    }
    typeNext();
  }

  openLetterBtn.addEventListener('click', openEnvelope);
  closeLetterBtn.addEventListener('click', closeEnvelope);
  envelopeSeal.addEventListener('click', () => envelope.classList.add('open'));

  // close overlay when clicking the dark backdrop (not the envelope itself)
  envelopeOverlay.addEventListener('click', (e) => {
    if (e.target === envelopeOverlay) closeEnvelope();
  });


  /* =========================================================
     5. MUSIC TOGGLE — play / pause control
     ========================================================= */
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.classList.add('spinning');
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('spinning');
    }
  });

});
