/**
 * TEI CLASS X - Script Interaktivitas Utama
 * Mencakup:
 * 1. Navigasi & Responsive Hamburger
 * 2. Pencarian Materi Cepat
 * 3. Mode Belajar Tabs
 * 4. Kalkulator Hukum Ohm & Rangkaian
 * 5. Kalkulator Kode Warna Resistor
 * 6. Simulator Gerbang Logika Dasar
 * 7. Boolean Expression to Circuit Visualizer & Simulator ((AB+CD)E)
 * 8. Simulator Menyolder PCB Interaktif (Solder Lab & Smoke Animation)
 * 9. Simulator Osiloskop Digital Real-Time
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMateriSearch();
  initModeTabs();
  initOhmCalculator();
  initSeriesParallelCalculator();
  initResistorColorCalculator();
  initLogicGateSimulator();
  initBooleanCircuitGenerator();
  initPeriodicTableExplorer();
  initSolderingLabSimulator();
  initOscilloscopeSimulator();
  initSelfCheckToggles();
  initVisualTransitions();
});

/* ==========================================================================
   8b. TABEL PERIODIK INTERAKTIF (GRID / SPHERE / HELIX)
   ========================================================================== */
function initPeriodicTableExplorer() {
  const lab = document.getElementById('periodic-lab');
  const stage = document.getElementById('periodic-stage');
  const detail = document.getElementById('periodic-detail');
  const legend = document.getElementById('periodic-legend');
  const modeButtons = document.querySelectorAll('.periodic-mode-btn');
  const fullscreenButton = document.getElementById('periodic-fullscreen-btn');
  const controls = document.getElementById('periodic-3d-controls');
  const resetButton = document.getElementById('periodic-reset-view');
  if (!lab || !stage || !detail || !legend) return;

  const viewState = {
    rotationX: 0,
    rotationY: 0,
    zoom: 1,
    pointers: new Map(),
    pinchDistance: 0,
    dragging: false,
    lastX: 0,
    lastY: 0
  };

  const rawElements = `
H|Hidrogen|1.008|nonlogam
He|Helium|4.003|gas-mulia
Li|Litium|6.94|alkali
Be|Berilium|9.012|alkali-tanah
B|Boron|10.81|metaloid
C|Karbon|12.011|nonlogam
N|Nitrogen|14.007|nonlogam
O|Oksigen|15.999|nonlogam
F|Fluorin|18.998|halogen
Ne|Neon|20.180|gas-mulia
Na|Natrium|22.990|alkali
Mg|Magnesium|24.305|alkali-tanah
Al|Aluminium|26.982|logam-pasca-transisi
Si|Silikon|28.085|metaloid
P|Fosfor|30.974|nonlogam
S|Sulfur|32.06|nonlogam
Cl|Klorin|35.45|halogen
Ar|Argon|39.948|gas-mulia
K|Kalium|39.098|alkali
Ca|Kalsium|40.078|alkali-tanah
Sc|Skandium|44.956|transisi
Ti|Titanium|47.867|transisi
V|Vanadium|50.942|transisi
Cr|Kromium|51.996|transisi
Mn|Mangan|54.938|transisi
Fe|Besi|55.845|transisi
Co|Kobalt|58.933|transisi
Ni|Nikel|58.693|transisi
Cu|Tembaga|63.546|transisi
Zn|Seng|65.38|transisi
Ga|Galium|69.723|logam-pasca-transisi
Ge|Germanium|72.630|metaloid
As|Arsen|74.922|metaloid
Se|Selenium|78.971|nonlogam
Br|Bromin|79.904|halogen
Kr|Kripton|83.798|gas-mulia
Rb|Rubidium|85.468|alkali
Sr|Stronsium|87.62|alkali-tanah
Y|Itrium|88.906|transisi
Zr|Zirkonium|91.224|transisi
Nb|Niobium|92.906|transisi
Mo|Molibdenum|95.95|transisi
Tc|Teknesium|98|transisi
Ru|Rutenium|101.07|transisi
Rh|Rodium|102.91|transisi
Pd|Paladium|106.42|transisi
Ag|Perak|107.87|transisi
Cd|Kadmium|112.41|transisi
In|Indium|114.82|logam-pasca-transisi
Sn|Timah|118.71|logam-pasca-transisi
Sb|Antimon|121.76|metaloid
Te|Telurium|127.60|metaloid
I|Iodin|126.90|halogen
Xe|Xenon|131.29|gas-mulia
Cs|Sesium|132.91|alkali
Ba|Barium|137.33|alkali-tanah
La|Lantanum|138.91|lantanida
Ce|Serium|140.12|lantanida
Pr|Praseodimium|140.91|lantanida
Nd|Neodimium|144.24|lantanida
Pm|Prometium|145|lantanida
Sm|Samarium|150.36|lantanida
Eu|Europium|151.96|lantanida
Gd|Gadolinium|157.25|lantanida
Tb|Terbium|158.93|lantanida
Dy|Disprosium|162.50|lantanida
Ho|Holmium|164.93|lantanida
Er|Erbium|167.26|lantanida
Tm|Tulium|168.93|lantanida
Yb|Iterbium|173.05|lantanida
Lu|Lutetium|174.97|lantanida
Hf|Hafnium|178.49|transisi
Ta|Tantalum|180.95|transisi
W|Wolfram|183.84|transisi
Re|Renium|186.21|transisi
Os|Osmium|190.23|transisi
Ir|Iridium|192.22|transisi
Pt|Platina|195.08|transisi
Au|Emas|196.97|transisi
Hg|Raksa|200.59|transisi
Tl|Talium|204.38|logam-pasca-transisi
Pb|Timbal|207.2|logam-pasca-transisi
Bi|Bismut|208.98|logam-pasca-transisi
Po|Polonium|209|metaloid
At|Astatin|210|halogen
Rn|Radon|222|gas-mulia
Fr|Fransium|223|alkali
Ra|Radium|226|alkali-tanah
Ac|Aktinium|227|aktinida
Th|Torium|232.04|aktinida
Pa|Protaktinium|231.04|aktinida
U|Uranium|238.03|aktinida
Np|Neptunium|237|aktinida
Pu|Plutonium|244|aktinida
Am|Amerisium|243|aktinida
Cm|Kurium|247|aktinida
Bk|Berkelium|247|aktinida
Cf|Kalifornium|251|aktinida
Es|Einsteinium|252|aktinida
Fm|Fermium|257|aktinida
Md|Mendelevium|258|aktinida
No|Nobelium|259|aktinida
Lr|Lawrensium|266|aktinida
Rf|Rutherfordium|267|transisi
Db|Dubnium|268|transisi
Sg|Seaborgium|269|transisi
Bh|Bohrium|270|transisi
Hs|Hassium|277|transisi
Mt|Meitnerium|278|transisi
Ds|Darmstadtium|281|transisi
Rg|Roentgenium|282|transisi
Cn|Kopernisium|285|transisi
Nh|Nihonium|286|logam-pasca-transisi
Fl|Flerovium|289|logam-pasca-transisi
Mc|Moskowium|290|logam-pasca-transisi
Lv|Livermorium|293|logam-pasca-transisi
Ts|Tenesin|294|halogen
Og|Oganesson|294|gas-mulia`.trim().split('\n').map((line, index) => {
    const [symbol, name, mass, category] = line.split('|');
    return { number: index + 1, symbol, name, mass, category };
  });

  const gridRows = [
    ['H', ...Array(16).fill(null), 'He'],
    ['Li', 'Be', ...Array(10).fill(null), 'B', 'C', 'N', 'O', 'F', 'Ne'],
    ['Na', 'Mg', ...Array(10).fill(null), 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
    ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
    ['Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'],
    ['Cs', 'Ba', 'La', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'],
    ['Fr', 'Ra', 'Ac', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'],
    [null, null, null, 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu'],
    [null, null, null, 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr']
  ];
  const positions = {};
  gridRows.forEach((row, rowIndex) => row.forEach((symbol, columnIndex) => {
    if (symbol) positions[symbol] = { row: rowIndex < 7 ? rowIndex + 1 : rowIndex + 2, column: columnIndex + 1 };
  }));

  const categories = [...new Set(rawElements.map(element => element.category))];
  legend.innerHTML = categories.map(category => `<span class="periodic-legend-item"><i class="periodic-swatch category-${category}"></i>${category.replaceAll('-', ' ')}</span>`).join('');

  function selectElement(element, card) {
    stage.querySelectorAll('.periodic-element.is-selected').forEach(item => item.classList.remove('is-selected'));
    card.classList.add('is-selected');
    detail.innerHTML = `<span class="periodic-detail-symbol">${element.symbol}</span><div><strong>${element.name}</strong><span>No. atom ${element.number} · Massa ${element.mass} · ${element.category.replaceAll('-', ' ')}</span></div>`;
  }

  function getStageMetrics(mode) {
    const width = Math.max(stage.clientWidth, 280);
    const height = Math.max(stage.clientHeight, mode === 'helix' ? 680 : 520);
    const compact = width < 620;
    const cardSize = compact ? 18 : Math.max(24, Math.min(30, width * 0.027));
    return {
      width,
      height,
      compact,
      cardSize,
      radius: Math.max(cardSize * 3.8, Math.min(compact ? 115 : 250, width * (compact ? 0.43 : 0.46))),
      verticalStep: compact ? cardSize * 3.6 : cardSize * 3.2
    };
  }

  function applySceneTransform() {
    const scene = stage.querySelector('.periodic-scene');
    if (!scene) return;
    scene.style.setProperty('--scene-rotation-x', `${viewState.rotationX}deg`);
    scene.style.setProperty('--scene-rotation-y', `${viewState.rotationY}deg`);
    scene.style.setProperty('--scene-zoom', viewState.zoom);
  }

  function resetView() {
    viewState.rotationX = 0;
    viewState.rotationY = 0;
    viewState.zoom = 1;
    applySceneTransform();
  }

  function render(mode) {
    stage.className = `periodic-stage mode-${mode}`;
    stage.innerHTML = mode === 'grid' ? '' : '<div class="periodic-scene" aria-label="Scene 3D tabel periodik"></div>';
    const scene = stage.querySelector('.periodic-scene') || stage;
    const metrics = getStageMetrics(mode);
    if (controls) controls.hidden = mode === 'grid';
    rawElements.forEach((element, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `periodic-element category-${element.category}`;
      card.style.setProperty('--element-index', index);
      if (mode !== 'grid') {
        card.style.setProperty('--card-size', `${metrics.cardSize}px`);
      }
      const position = positions[element.symbol];
      if (mode === 'grid' && position) {
        card.style.gridRow = position.row;
        card.style.gridColumn = position.column;
      } else if (mode === 'sphere') {
        const sphereRows = [6, 8, 10, 11, 12, 12, 12, 12, 11, 10, 8, 6];
        let row = 0;
        let rowStart = 0;
        while (index >= rowStart + sphereRows[row]) {
          rowStart += sphereRows[row];
          row++;
        }
        const rowCount = sphereRows[row];
        const column = index - rowStart;
        const y = (row - (sphereRows.length - 1) / 2) * metrics.cardSize * 3;
        const xSpacing = Math.min(metrics.cardSize * 1.55, (metrics.width * 1) / rowCount);
        const x = (column - (rowCount - 1) / 2) * xSpacing;
        const rowCurve = 1 - Math.abs(row - (sphereRows.length - 1) / 2) / ((sphereRows.length - 1) / 2);
        const z = rowCurve * metrics.radius * 0.58 * (1 - Math.abs(x) / Math.max(metrics.radius, 1));
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.setProperty('--z', `${z}px`);
      } else if (mode === 'helix') {
        const strand = index % 3;
        const strandIndex = Math.floor(index / 3);
        const angle = strandIndex * 0.52 + strand * (Math.PI * 2 / 3);
        card.style.setProperty('--x', `${(strand - 1) * metrics.cardSize * 2.25}px`);
        card.style.setProperty('--y', `${(strandIndex - 19.5) * metrics.verticalStep}px`);
        card.style.setProperty('--z', `${Math.sin(angle) * metrics.radius}px`);
        card.style.setProperty('--rotate', `${angle * 57.3 + 90}deg`);
      }
      card.setAttribute('aria-label', `${element.name}, ${element.symbol}, nomor atom ${element.number}`);
      card.innerHTML = `<small>${element.number}</small><strong>${element.symbol}</strong><span>${element.name}</span>`;
      card.addEventListener('click', () => selectElement(element, card));
      scene.appendChild(card);
    });
    applySceneTransform();
  }

  modeButtons.forEach(button => button.addEventListener('click', () => {
    modeButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    render(button.dataset.periodicMode);
  }));

  function updateZoom(delta) {
    viewState.zoom = Math.max(0.55, Math.min(2.4, viewState.zoom + delta));
    applySceneTransform();
  }

  stage.addEventListener('pointerdown', event => {
    if (!stage.classList.contains('mode-sphere') && !stage.classList.contains('mode-helix')) return;
    stage.setPointerCapture(event.pointerId);
    viewState.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (viewState.pointers.size === 1) {
      viewState.dragging = true;
      viewState.lastX = event.clientX;
      viewState.lastY = event.clientY;
      stage.classList.add('is-dragging');
    } else if (viewState.pointers.size === 2) {
      const points = [...viewState.pointers.values()];
      viewState.pinchDistance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
    }
  });

  stage.addEventListener('pointermove', event => {
    const point = viewState.pointers.get(event.pointerId);
    if (!point) return;
    point.x = event.clientX;
    point.y = event.clientY;
    if (viewState.pointers.size === 2) {
      const points = [...viewState.pointers.values()];
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      if (viewState.pinchDistance) updateZoom((distance - viewState.pinchDistance) * 0.004);
      viewState.pinchDistance = distance;
    } else if (viewState.dragging) {
      viewState.rotationY += (event.clientX - viewState.lastX) * 0.42;
      viewState.rotationX -= (event.clientY - viewState.lastY) * 0.32;
      viewState.rotationX = Math.max(-75, Math.min(75, viewState.rotationX));
      viewState.lastX = event.clientX;
      viewState.lastY = event.clientY;
      applySceneTransform();
    }
  });

  function releasePointer(event) {
    viewState.pointers.delete(event.pointerId);
    if (viewState.pointers.size < 2) viewState.pinchDistance = 0;
    if (viewState.pointers.size === 0) {
      viewState.dragging = false;
      stage.classList.remove('is-dragging');
    }
  }
  stage.addEventListener('pointerup', releasePointer);
  stage.addEventListener('pointercancel', releasePointer);
  stage.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') releasePointer(event);
  });
  stage.addEventListener('wheel', event => {
    if (!stage.classList.contains('mode-sphere') && !stage.classList.contains('mode-helix')) return;
    event.preventDefault();
    updateZoom(event.deltaY > 0 ? -0.08 : 0.08);
  }, { passive: false });
  resetButton?.addEventListener('click', resetView);

  function setFullscreenState(active) {
    lab.classList.toggle('periodic-focus-mode', active);
    fullscreenButton?.setAttribute('aria-pressed', String(active));
    if (fullscreenButton) {
      fullscreenButton.innerHTML = active
        ? '⛶ <span>Keluar layar penuh</span>'
        : '⛶ <span>Layar penuh</span>';
      fullscreenButton.setAttribute('aria-label', active ? 'Keluar dari layar penuh tabel periodik' : 'Buka tabel periodik dalam layar penuh');
    }
    requestAnimationFrame(() => {
      const activeMode = document.querySelector('.periodic-mode-btn.active')?.dataset.periodicMode || 'grid';
      render(activeMode);
    });
  }

  if (fullscreenButton) {
    fullscreenButton.addEventListener('click', async () => {
      try {
        if (document.fullscreenElement === lab) {
          await document.exitFullscreen();
        } else if (lab.requestFullscreen) {
          await lab.requestFullscreen();
        } else {
          setFullscreenState(!lab.classList.contains('periodic-focus-mode'));
        }
      } catch (error) {
        console.warn('Fullscreen browser tidak tersedia, memakai mode fokus lokal.', error);
        setFullscreenState(!lab.classList.contains('periodic-focus-mode'));
      }
    });
    document.addEventListener('fullscreenchange', () => {
      setFullscreenState(document.fullscreenElement === lab);
    });
  }

  render('grid');
}

/* ==========================================================================
   1. Navigasi & Hamburger Menu
   ========================================================================== */
function initNavbar() {
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navbar = document.querySelector('.navbar');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('is-active');
      navMenu.classList.toggle('is-active', isActive);
      hamburger.setAttribute('aria-expanded', isActive);
    });

    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-active');
      }
    });
  }

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

/* ==========================================================================
   2. Pencarian Materi Live
   ========================================================================== */
function initMateriSearch() {
  const searchInput = document.getElementById('materi-search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const materiCards = document.querySelectorAll('.materi-card');
  const emptyMessage = document.getElementById('search-empty-state');

  if (!searchInput || materiCards.length === 0) return;

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    materiCards.forEach(card => {
      const title = card.querySelector('.materi-header-title')?.textContent.toLowerCase() || '';
      const content = card.textContent.toLowerCase();
      const keywords = card.getAttribute('data-keywords')?.toLowerCase() || '';

      const isMatch = title.includes(query) || content.includes(query) || keywords.includes(query);

      if (isMatch) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyMessage) {
      emptyMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  searchInput.addEventListener('input', performSearch);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      performSearch();
      searchInput.focus();
    });
  }
}

/* ==========================================================================
   3. Mode Belajar Tabs
   ========================================================================== */
function initModeTabs() {
  const materiCards = document.querySelectorAll('.materi-card');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  materiCards.forEach(card => {
    const tabs = card.querySelectorAll('.mode-tab');
    const panes = card.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const activePane = card.querySelector(`.tab-pane[data-pane="${targetTab}"]`);
        if (activePane) {
          activePane.classList.add('active');
          if (!reduceMotion && activePane.animate) {
            activePane.animate(
              [
                { opacity: 0, transform: 'translateY(8px)' },
                { opacity: 1, transform: 'translateY(0)' }
              ],
              { duration: 360, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
            );
          }
        }
      });
    });
  });
}

/* ==========================================================================
   3b. Transisi Halaman, Section, dan Tab
   ========================================================================== */
function initVisualTransitions() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('page-ready');

  if (!reduceMotion) {
    const revealTargets = document.querySelectorAll(
      '.hero-content, .hero-visual, .section, .section-header, .materi-card, .project-card, .feature-card'
    );
    revealTargets.forEach((element, index) => {
      element.classList.add('reveal-on-scroll');
      element.classList.add(`reveal-variant-${index % 3}`);
      element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 70}ms`);
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, revealObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
      revealTargets.forEach(element => observer.observe(element));
    } else {
      revealTargets.forEach(element => element.classList.add('is-visible'));
    }
  }

  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', event => {
      if (reduceMotion || event.defaultPrevented || event.button !== 0) return;
      const href = link.getAttribute('href') || '';
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        link.hasAttribute('download') ||
        link.target === '_blank' ||
        new URL(link.href, window.location.href).origin !== window.location.origin
      ) return;

      event.preventDefault();
      document.body.classList.add('page-exit');
      window.setTimeout(() => {
        window.location.href = link.href;
      }, 260);
    });
  });
}

/* ==========================================================================
   4. Kalkulator Hukum Ohm
   ========================================================================== */
function initOhmCalculator() {
  const calcBtn = document.getElementById('btn-calc-ohm');
  if (!calcBtn) return;

  const inputV = document.getElementById('calc-v');
  const inputR = document.getElementById('calc-r');
  const resultI = document.getElementById('calc-res-i');
  const resultP = document.getElementById('calc-res-p');
  const stepFormula = document.getElementById('calc-step-formula');

  function calculateOhm() {
    const v = parseFloat(inputV.value);
    const r = parseFloat(inputR.value);

    if (isNaN(v) || isNaN(r) || r <= 0) {
      if (resultI) resultI.textContent = '--- A';
      if (resultP) resultP.textContent = '--- W';
      if (stepFormula) stepFormula.textContent = '⚠️ Masukkan nilai Tegangan (V) dan Hambatan (R > 0) yang valid!';
      return;
    }

    const currentAmp = v / r;
    const currentMilli = currentAmp * 1000;
    const powerWatt = v * currentAmp;

    let currentFormatted = currentAmp.toFixed(3) + ' A';
    if (currentAmp < 1) {
      currentFormatted += ` (${currentMilli.toFixed(1)} mA)`;
    }

    if (resultI) resultI.textContent = currentFormatted;
    if (resultP) resultP.textContent = powerWatt.toFixed(3) + ' W';

    if (stepFormula) {
      stepFormula.innerHTML = `
        <strong>Langkah Perhitungan:</strong><br>
        1. Kuat Arus: <code>I = V / R = ${v} V / ${r} Ω = ${currentAmp.toFixed(4)} A</code><br>
        2. Daya Disipasi: <code>P = V × I = ${v} V × ${currentAmp.toFixed(4)} A = ${powerWatt.toFixed(3)} Watt</code>
      `;
    }
  }

  calcBtn.addEventListener('click', calculateOhm);

  [inputV, inputR].forEach(input => {
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') calculateOhm();
      });
    }
  });
}

/* ==========================================================================
   5. Kalkulator Hambatan Rangkaian Seri & Paralel
   ========================================================================== */
function initSeriesParallelCalculator() {
  const calcBtn = document.getElementById('btn-calc-circuit');
  if (!calcBtn) return;

  const inputR1 = document.getElementById('calc-circuit-r1');
  const inputR2 = document.getElementById('calc-circuit-r2');
  const resultSeri = document.getElementById('calc-res-seri');
  const resultParalel = document.getElementById('calc-res-paralel');
  const stepBox = document.getElementById('calc-circuit-step');

  function calculateCircuit() {
    const r1 = parseFloat(inputR1.value);
    const r2 = parseFloat(inputR2.value);

    if (isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0) {
      if (stepBox) stepBox.textContent = '⚠️ Masukkan nilai R1 dan R2 yang bernilai positif!';
      return;
    }

    const rSeri = r1 + r2;
    const rParalel = (r1 * r2) / (r1 + r2);

    if (resultSeri) resultSeri.textContent = `${rSeri.toFixed(2)} Ω`;
    if (resultParalel) resultParalel.textContent = `${rParalel.toFixed(2)} Ω`;

    if (stepBox) {
      stepBox.innerHTML = `
        <strong>Rumus & Pembuktian:</strong><br>
        • Seri: <code>R_total = R1 + R2 = ${r1} + ${r2} = ${rSeri.toFixed(2)} Ω</code><br>
        • Paralel: <code>R_total = (R1 × R2) / (R1 + R2) = (${r1} × ${r2}) / (${r1} + ${r2}) = ${rParalel.toFixed(2)} Ω</code>
      `;
    }
  }

  calcBtn.addEventListener('click', calculateCircuit);
}

/* ==========================================================================
   6. Kalkulator Kode Warna Resistor (4 Gelang)
   ========================================================================== */
function initResistorColorCalculator() {
  const b1 = document.getElementById('resistor-band-1');
  const b2 = document.getElementById('resistor-band-2');
  const b3 = document.getElementById('resistor-band-3');
  const b4 = document.getElementById('resistor-band-4');

  if (!b1 || !b2 || !b3 || !b4) return;

  const resultVal = document.getElementById('resistor-value-display');

  function calculateColor() {
    const val1 = parseInt(b1.value, 10);
    const val2 = parseInt(b2.value, 10);
    const multiplier = parseFloat(b3.value);
    const tolerance = b4.value;

    const baseValue = (val1 * 10 + val2) * multiplier;

    let displayStr = '';
    if (baseValue >= 1000000) {
      displayStr = (baseValue / 1000000).toLocaleString('id-ID') + ' MΩ';
    } else if (baseValue >= 1000) {
      displayStr = (baseValue / 1000).toLocaleString('id-ID') + ' kΩ';
    } else {
      displayStr = baseValue.toLocaleString('id-ID') + ' Ω';
    }

    if (resultVal) {
      resultVal.innerHTML = `<strong>${displayStr}</strong> ±${tolerance}%`;
    }

    const bandElements = document.querySelectorAll('.visual-band');
    if (bandElements.length >= 4) {
      const b1Color = b1.options[b1.selectedIndex].getAttribute('data-color') || '#8b4513';
      const b2Color = b2.options[b2.selectedIndex].getAttribute('data-color') || '#000000';
      const b3Color = b3.options[b3.selectedIndex].getAttribute('data-color') || '#ef4444';
      const b4Color = b4.options[b4.selectedIndex].getAttribute('data-color') || '#ffd700';

      bandElements[0].style.backgroundColor = b1Color;
      bandElements[1].style.backgroundColor = b2Color;
      bandElements[2].style.backgroundColor = b3Color;
      bandElements[3].style.backgroundColor = b4Color;
    }
  }

  [b1, b2, b3, b4].forEach(sel => {
    sel.addEventListener('change', calculateColor);
  });

  calculateColor();
}

/* ==========================================================================
   7. Simulator Gerbang Logika Dasar
   ========================================================================== */
function initLogicGateSimulator() {
  const gateSelect = document.getElementById('sim-gate-type');
  const btnA = document.getElementById('sim-switch-a');
  const btnB = document.getElementById('sim-switch-b');
  const valA = document.getElementById('sim-val-a');
  const valB = document.getElementById('sim-val-b');
  const led = document.getElementById('sim-led-output');
  const ledText = document.getElementById('sim-led-text');
  const gateName = document.getElementById('sim-active-gate-name');
  const gateFormula = document.getElementById('sim-active-gate-formula');
  const inputBWrap = document.getElementById('sim-input-b-wrap');

  if (!gateSelect || !btnA || !led) return;

  let stateA = 0;
  let stateB = 0;

  function updateSimulator() {
    const gate = gateSelect.value;
    const isSingleInput = gate === 'NOT';

    if (inputBWrap) {
      inputBWrap.style.display = isSingleInput ? 'none' : 'flex';
    }

    let output = 0;
    let formulaStr = '';

    switch (gate) {
      case 'AND':
        output = (stateA === 1 && stateB === 1) ? 1 : 0;
        formulaStr = 'Y = A · B (Perkalian Logika)';
        break;
      case 'OR':
        output = (stateA === 1 || stateB === 1) ? 1 : 0;
        formulaStr = 'Y = A + B (Penjumlahan Logika)';
        break;
      case 'NOT':
        output = stateA === 0 ? 1 : 0;
        formulaStr = 'Y = Ā (Inversi / Pembalik)';
        break;
      case 'NAND':
        output = !(stateA === 1 && stateB === 1) ? 1 : 0;
        formulaStr = 'Y = (A · B)̄ (NOT-AND)';
        break;
      case 'NOR':
        output = !(stateA === 1 || stateB === 1) ? 1 : 0;
        formulaStr = 'Y = (A + B)̄ (NOT-OR)';
        break;
      case 'XOR':
        output = (stateA !== stateB) ? 1 : 0;
        formulaStr = 'Y = A ⊕ B (Exclusive-OR: Output 1 jika input beda)';
        break;
      case 'XNOR':
        output = (stateA === stateB) ? 1 : 0;
        formulaStr = 'Y = (A ⊕ B)̄ (Output 1 jika kedua input sama)';
        break;
    }

    if (output === 1) {
      led.classList.add('active');
      if (ledText) {
        ledText.innerHTML = '<span style="color: var(--orange-primary); font-weight: 800;">MENYALA (LOGIKA 1 / HIGH)</span>';
      }
    } else {
      led.classList.remove('active');
      if (ledText) {
        ledText.innerHTML = '<span style="color: var(--text-dim); font-weight: 600;">PADAM (LOGIKA 0 / LOW)</span>';
      }
    }

    if (gateName) gateName.textContent = `Gerbang ${gate}`;
    if (gateFormula) gateFormula.textContent = formulaStr;

    // Highlight tabel kebenaran
    const rows = document.querySelectorAll('.truth-table-row');
    rows.forEach(row => {
      const rowA = parseInt(row.getAttribute('data-a'), 10);
      const rowB = parseInt(row.getAttribute('data-b'), 10);
      const isNot = gate === 'NOT';

      let isMatch = false;
      if (isNot) {
        isMatch = (rowA === stateA);
      } else {
        isMatch = (rowA === stateA && rowB === stateB);
      }

      if (isMatch) {
        row.classList.add('active-row');
      } else {
        row.classList.remove('active-row');
      }
    });
  }

  btnA.addEventListener('click', () => {
    stateA = stateA === 0 ? 1 : 0;
    btnA.classList.toggle('on', stateA === 1);
    if (valA) {
      valA.textContent = stateA;
      valA.className = stateA === 1 ? 'toggle-status-val high' : 'toggle-status-val low';
    }
    updateSimulator();
  });

  if (btnB) {
    btnB.addEventListener('click', () => {
      stateB = stateB === 0 ? 1 : 0;
      btnB.classList.toggle('on', stateB === 1);
      if (valB) {
        valB.textContent = stateB;
        valB.className = stateB === 1 ? 'toggle-status-val high' : 'toggle-status-val low';
      }
      updateSimulator();
    });
  }

  gateSelect.addEventListener('change', updateSimulator);
  updateSimulator();
}

/* ==========================================================================
   8. BOOLEAN EXPRESSION TO CIRCUIT GENERATOR ((AB+CD)E)
   Fitur Generator Rangkaian Logika Interaktif dari Formula Boolean
   ========================================================================== */
function initBooleanCircuitGenerator() {
  const inputExp = document.getElementById('bool-input-expr');
  const genBtn = document.getElementById('bool-gen-btn');
  const viewport = document.getElementById('bool-circuit-canvas');
  const switchesContainer = document.getElementById('bool-switches-strip');
  const outputLed = document.getElementById('bool-output-led');
  const outputText = document.getElementById('bool-output-text');
  const truthTableContainer = document.getElementById('bool-truth-table-wrap');
  const presetBtns = document.querySelectorAll('.bool-preset-btn');

  if (!inputExp || !viewport) return;

  let variableValues = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  let currentExpression = '(AB+CD)E';

  // Parser Boolean kecil dengan precedence NOT > AND > OR.
  function parseExpression(expr) {
    const source = expr.toUpperCase().replace(/\s+/g, '');
    const tokens = source.match(/[A-Z]|[01]|[+*!'()]|\*/g) || [];
    let position = 0;

    if (tokens.join('') !== source || tokens.length === 0) {
      throw new Error('Gunakan variabel A-Z, konstanta 0/1, +, *, kurung, atau NOT (! / apostrof).');
    }

    const peek = () => tokens[position];
    const consume = (token) => {
      if (token && peek() !== token) {
        throw new Error(`Operator "${token}" tidak pada tempatnya.`);
      }
      return tokens[position++];
    };
    const startsPrimary = token => Boolean(token && (/^[A-Z01]$/.test(token) || token === '(' || token === '!'));

    function parseOr() {
      let node = parseAnd();
      while (peek() === '+') {
        consume('+');
        node = { type: 'OR', left: node, right: parseAnd() };
      }
      return node;
    }

    function parseAnd() {
      let node = parseUnary();
      while (peek() === '*' || startsPrimary(peek())) {
        if (peek() === '*') consume('*');
        node = { type: 'AND', left: node, right: parseUnary() };
      }
      return node;
    }

    function parseUnary() {
      if (peek() === '!') {
        consume('!');
        return { type: 'NOT', input: parseUnary() };
      }
      let node;
      if (peek() === '(') {
        consume('(');
        node = parseOr();
        consume(')');
      } else if (/^[A-Z]$/.test(peek() || '')) {
        node = { type: 'VAR', name: consume() };
      } else if (peek() === '0' || peek() === '1') {
        node = { type: 'CONST', value: Number(consume()) };
      } else {
        throw new Error('Ada bagian ekspresi yang belum lengkap.');
      }
      if (peek() === "'") {
        consume("'");
        node = { type: 'NOT', input: node };
      }
      return node;
    }

    const ast = parseOr();
    if (position !== tokens.length) throw new Error('Ekspresi memiliki operator atau kurung yang tidak valid.');
    return ast;
  }

  function evaluateAst(node, varMap) {
    if (node.type === 'VAR') return varMap[node.name] || 0;
    if (node.type === 'CONST') return node.value;
    if (node.type === 'NOT') return evaluateAst(node.input, varMap) ? 0 : 1;
    if (node.type === 'AND') return evaluateAst(node.left, varMap) && evaluateAst(node.right, varMap) ? 1 : 0;
    return evaluateAst(node.left, varMap) || evaluateAst(node.right, varMap) ? 1 : 0;
  }

  function parseAndEvaluate(expr, varMap) {
    try {
      return evaluateAst(parseExpression(expr), varMap);
    } catch (error) {
      console.warn('Gagal mengevaluasi ekspresi:', error.message);
      return 0;
    }
  }

  // Ekstrak nama variabel yang ada di ekspresi
  function extractVariables(expr) {
    const matches = expr.toUpperCase().match(/[A-Z]/g);
    if (!matches) return ['A', 'B'];
    return [...new Set(matches)].sort().slice(0, 5);
  }

  // Gambar Rangkaian SVG Dinamis Berdasarkan Ekspresi
  function renderCircuitDiagram(expr, vars, values) {
    const finalVal = parseAndEvaluate(expr, values);
    const upper = expr.toUpperCase().replace(/\s+/g, '');

    let svgHtml = '';

    // Semua ekspresi memakai renderer AST yang sama agar bentuk input dan kabel konsisten.
    if (false && (upper === '(AB+CD)E' || upper === '(AB+CD)*E' || upper === 'E(AB+CD)')) {
      const valA = values.A || 0;
      const valB = values.B || 0;
      const valC = values.C || 0;
      const valD = values.D || 0;
      const valE = values.E || 0;

      const outAB = (valA && valB) ? 1 : 0;
      const outCD = (valC && valD) ? 1 : 0;
      const outOR = (outAB || outCD) ? 1 : 0;
      const outFinal = (outOR && valE) ? 1 : 0;

      svgHtml = `
        <svg viewBox="0 0 760 320" width="100%" height="320" style="max-width: 760px; overflow: visible;">
          <defs>
            <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <!-- Input labels and wires -->
          <!-- Input A -->
          <text x="20" y="55" fill="${valA ? '#ff8c00' : '#64748b'}" font-family="monospace" font-weight="bold" font-size="14">A</text>
          <path d="M 65 50 L 140 50" stroke="${valA ? '#ff8c00' : '#334155'}" stroke-width="${valA ? '3.5' : '2'}" class="${valA ? 'wire-active' : ''}" fill="none"/>

          <!-- Input B -->
          <text x="20" y="95" fill="${valB ? '#ff8c00' : '#64748b'}" font-family="monospace" font-weight="bold" font-size="14">B</text>
          <path d="M 65 90 L 140 90" stroke="${valB ? '#ff8c00' : '#334155'}" stroke-width="${valB ? '3.5' : '2'}" class="${valB ? 'wire-active' : ''}" fill="none"/>

          <!-- Gerbang AND 1 (AB) -->
          <g transform="translate(140, 40)">
            <path d="M 0 0 L 25 0 C 45 0 50 15 50 30 C 50 45 45 60 25 60 L 0 60 Z" fill="#141822" stroke="${outAB ? '#ff6b00' : '#475569'}" stroke-width="2.5" />
            <text x="12" y="35" fill="#f8fafc" font-family="monospace" font-weight="bold" font-size="12">AND</text>
          </g>

          <!-- Input C -->
          <text x="20" y="175" fill="${valC ? '#ff8c00' : '#64748b'}" font-family="monospace" font-weight="bold" font-size="14">C</text>
          <path d="M 65 170 L 140 170" stroke="${valC ? '#ff8c00' : '#334155'}" stroke-width="${valC ? '3.5' : '2'}" class="${valC ? 'wire-active' : ''}" fill="none"/>

          <!-- Input D -->
          <text x="20" y="215" fill="${valD ? '#ff8c00' : '#64748b'}" font-family="monospace" font-weight="bold" font-size="14">D</text>
          <path d="M 65 210 L 140 210" stroke="${valD ? '#ff8c00' : '#334155'}" stroke-width="${valD ? '3.5' : '2'}" class="${valD ? 'wire-active' : ''}" fill="none"/>

          <!-- Gerbang AND 2 (CD) -->
          <g transform="translate(140, 160)">
            <path d="M 0 0 L 25 0 C 45 0 50 15 50 30 C 50 45 45 60 25 60 L 0 60 Z" fill="#141822" stroke="${outCD ? '#ff6b00' : '#475569'}" stroke-width="2.5" />
            <text x="12" y="35" fill="#f8fafc" font-family="monospace" font-weight="bold" font-size="12">AND</text>
          </g>

          <!-- Wire from AND1 to OR -->
          <path d="M 190 70 L 260 70 L 260 125 L 300 125" stroke="${outAB ? '#ff8c00' : '#334155'}" stroke-width="${outAB ? '3.5' : '2'}" class="${outAB ? 'wire-active' : ''}" fill="none"/>

          <!-- Wire from AND2 to OR -->
          <path d="M 190 190 L 260 190 L 260 155 L 300 155" stroke="${outCD ? '#ff8c00' : '#334155'}" stroke-width="${outCD ? '3.5' : '2'}" class="${outCD ? 'wire-active' : ''}" fill="none"/>

          <!-- Gerbang OR (AB + CD) -->
          <g transform="translate(300, 110)">
            <path d="M 0 0 C 15 15 15 45 0 60 C 20 60 45 55 60 30 C 45 5 20 0 0 0 Z" fill="#141822" stroke="${outOR ? '#ff6b00' : '#475569'}" stroke-width="2.5" />
            <text x="18" y="35" fill="#f8fafc" font-family="monospace" font-weight="bold" font-size="12">OR</text>
          </g>

          <!-- Input E -->
          <text x="20" y="275" fill="${valE ? '#ff8c00' : '#64748b'}" font-family="monospace" font-weight="bold" font-size="14">E</text>
          <path d="M 65 270 L 460 270 L 460 195 L 490 195" stroke="${valE ? '#ff8c00' : '#334155'}" stroke-width="${valE ? '3.5' : '2'}" class="${valE ? 'wire-active' : ''}" fill="none"/>

          <!-- Wire from OR to final AND -->
          <path d="M 360 140 L 430 140 L 430 165 L 490 165" stroke="${outOR ? '#ff8c00' : '#334155'}" stroke-width="${outOR ? '3.5' : '2'}" class="${outOR ? 'wire-active' : ''}" fill="none"/>

          <!-- Final AND Gate [(AB+CD) · E] -->
          <g transform="translate(490, 150)">
            <path d="M 0 0 L 25 0 C 45 0 50 15 50 30 C 50 45 45 60 25 60 L 0 60 Z" fill="#141822" stroke="${outFinal ? '#ff6b00' : '#475569'}" stroke-width="2.5" />
            <text x="10" y="35" fill="#f8fafc" font-family="monospace" font-weight="bold" font-size="11">AND</text>
          </g>

          <!-- Output wire to LED -->
          <path d="M 540 180 L 640 180" stroke="${outFinal ? '#ff8c00' : '#334155'}" stroke-width="${outFinal ? '4' : '2'}" class="${outFinal ? 'wire-active' : ''}" fill="none"/>

          <!-- Output Lamp / Indicator -->
          <g transform="translate(640, 155)">
            <circle cx="25" cy="25" r="22" fill="${outFinal ? 'url(#glow-orange)' : '#141822'}" stroke="${outFinal ? '#ffa940' : '#334155'}" stroke-width="3" />
            <circle cx="25" cy="25" r="14" fill="${outFinal ? '#ff6b00' : '#1e2433'}" />
            <text x="-5" y="65" fill="${outFinal ? '#ff8c00' : '#64748b'}" font-family="monospace" font-weight="bold" font-size="13">OUT = ${outFinal}</text>
          </g>
        </svg>
      `;
    } else {
      let ast;
      try {
        ast = parseExpression(expr);
      } catch (error) {
        viewport.innerHTML = `<div class="bool-error-state" role="alert">⚠️ ${error.message}</div>`;
        if (outputLed) outputLed.classList.remove('active');
        if (outputText) outputText.textContent = 'INPUT TIDAK VALID';
        return;
      }

      const nodes = [];
      const wires = [];
      let leafIndex = 0;
      function layout(node, depth = 0) {
        const item = { node, depth, index: nodes.length, x: 120 + depth * 150, y: 70 };
        nodes.push(item);
        if (node.type === 'VAR' || node.type === 'CONST') {
          item.y = 45 + leafIndex * 48;
          leafIndex++;
          return item;
        }
        if (node.type === 'NOT') {
          const child = layout(node.input, depth + 1);
          item.y = child.y;
          wires.push({ from: child, to: item, port: 'center' });
          return item;
        }
        const left = layout(node.left, depth + 1);
        const right = layout(node.right, depth + 1);
        item.y = (left.y + right.y) / 2;
        wires.push({ from: left, to: item, port: 'top' }, { from: right, to: item, port: 'bottom' });
        return item;
      }

      const root = layout(ast);
      const maxDepth = Math.max(...nodes.map(item => item.depth));
      nodes.forEach(item => {
        item.x = 100 + (maxDepth - item.depth) * 150;
      });
      const width = Math.max(720, (maxDepth + 2) * 150);
      const height = Math.max(220, Math.min(520, leafIndex * 48 + 70));
      const nodeMarkup = nodes.map(item => {
        const { node, x, y } = item;
        const nodeValue = evaluateAst(node, values);
        if (node.type === 'VAR' || node.type === 'CONST') {
          const label = node.type === 'VAR' ? node.name : node.value;
          return `<g class="logic-node logic-input">
            <text x="${x}" y="${y + 5}" text-anchor="middle" fill="${nodeValue ? '#ff8c00' : '#64748b'}" font-family="monospace" font-weight="bold" font-size="14">${label}</text>
          </g>`;
        }
        const label = node.type === 'NOT' ? 'NOT' : node.type;
        const path = node.type === 'OR'
          ? `M ${x - 30} ${y - 25} Q ${x - 10} ${y} ${x - 30} ${y + 25} Q ${x + 5} ${y + 28} ${x + 30} ${y} Q ${x + 5} ${y - 28} ${x - 30} ${y - 25} Z`
          : `M ${x - 30} ${y - 25} L ${x - 8} ${y - 25} Q ${x + 30} ${y - 25} ${x + 30} ${y} Q ${x + 30} ${y + 25} ${x - 8} ${y + 25} L ${x - 30} ${y + 25} Z`;
        return `<g class="logic-node">
          <path d="${path}" fill="#141822" stroke="${nodeValue ? '#ff6b00' : '#475569'}" stroke-width="2.5"/>
          <text x="${x}" y="${y + 5}" text-anchor="middle" fill="#f8fafc" font-family="monospace" font-weight="bold" font-size="11">${label}</text>
        </g>`;
      }).join('');
      const wireMarkup = wires.map(({ from, to, port }) => {
        const signal = evaluateAst(from.node, values);
        const sourceOffset = from.node.type === 'VAR' || from.node.type === 'CONST' ? 18 : 30;
        const targetY = port === 'top' ? to.y - 14 : port === 'bottom' ? to.y + 14 : to.y;
        const targetX = to.x - 30;
        const elbowX = from.x + Math.max(46, (targetX - from.x) * 0.52);
        return `<path d="M ${from.x + sourceOffset} ${from.y} H ${elbowX} V ${targetY} H ${targetX}" class="${signal ? 'wire-active' : ''}" stroke="${signal ? '#ff8c00' : '#334155'}" stroke-width="${signal ? 3.5 : 2}" fill="none"/>`;
      }).join('');
      svgHtml = `<svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" style="max-width: ${width}px; overflow: visible;" role="img" aria-label="Diagram gerbang untuk ${expr}">
        <text x="24" y="28" fill="#94a3b8" font-family="monospace" font-size="12">INPUT</text>
        ${wireMarkup}
        ${nodeMarkup}
        <path d="M ${root.x + 32} ${root.y} L ${width - 95} ${root.y}" class="${finalVal ? 'wire-active' : ''}" stroke="${finalVal ? '#ff8c00' : '#334155'}" stroke-width="${finalVal ? 4 : 2}" fill="none"/>
        <circle cx="${width - 65}" cy="${root.y}" r="22" fill="${finalVal ? '#ff6b00' : '#141822'}" stroke="${finalVal ? '#ffa940' : '#334155'}" stroke-width="3"/>
        <text x="${width - 65}" y="${root.y + 48}" text-anchor="middle" fill="${finalVal ? '#ff8c00' : '#64748b'}" font-family="monospace" font-weight="bold" font-size="13">OUT = ${finalVal}</text>
      </svg>`;
    }

    viewport.innerHTML = svgHtml;

    // Update LED visual
    if (outputLed) {
      outputLed.classList.toggle('active', finalVal === 1);
      outputLed.classList.remove('output-pulse');
      void outputLed.offsetWidth;
      outputLed.classList.add('output-pulse');
    }
    if (outputText) {
      outputText.innerHTML = finalVal === 1
        ? '<span style="color: var(--orange-primary); font-weight: 800;">OUTPUT: LOGIKA 1 (HIGH / MENYALA)</span>'
        : '<span style="color: var(--text-dim); font-weight: 600;">OUTPUT: LOGIKA 0 (LOW / PADAM)</span>';
    }
  }

  // Render Saklar Switch Interaktif
  function renderSwitches(vars) {
    if (!switchesContainer) return;
    switchesContainer.innerHTML = '';

    vars.forEach(v => {
      if (variableValues[v] === undefined) {
        variableValues[v] = 0;
      }

      const item = document.createElement('div');
      item.className = 'var-toggle-item variable-chip-wrap';
      item.innerHTML = `
        <button type="button" class="variable-chip ${variableValues[v] === 1 ? 'is-high' : ''}" data-var="${v}" aria-pressed="${variableValues[v] === 1}" aria-label="Input ${v}, nilai ${variableValues[v] ? 'HIGH' : 'LOW'}">
          <span class="variable-chip-letter">${v}</span>
          <span class="variable-chip-state" id="bool-val-${v}">${variableValues[v] ? 'HIGH' : 'LOW'}</span>
          <span class="variable-chip-dot" aria-hidden="true"></span>
        </button>
      `;

      const btn = item.querySelector('.variable-chip');
      btn.addEventListener('click', () => {
        variableValues[v] = variableValues[v] === 1 ? 0 : 1;
        const isHigh = variableValues[v] === 1;
        btn.classList.toggle('is-high', isHigh);
        btn.setAttribute('aria-pressed', String(isHigh));
        btn.setAttribute('aria-label', `Input ${v}, nilai ${isHigh ? 'HIGH' : 'LOW'}`);
        btn.classList.remove('chip-pulse');
        void btn.offsetWidth;
        btn.classList.add('chip-pulse');
        const valSpan = item.querySelector(`#bool-val-${v}`);
        if (valSpan) {
          valSpan.textContent = isHigh ? 'HIGH' : 'LOW';
        }

        renderCircuitDiagram(currentExpression, vars, variableValues);
        highlightTruthTableRow(vars, variableValues);
      });

      switchesContainer.appendChild(item);
    });
  }

  // Render Tabel Kebenaran Lengkap
  function renderTruthTable(expr, vars) {
    if (!truthTableContainer) return;

    const totalRows = Math.min(32, Math.pow(2, vars.length)); // Batasi maks 5 variabel
    let tableHtml = `
      <table class="tech-table" style="font-size: 0.85rem;">
        <thead>
          <tr>
            ${vars.map(v => `<th>${v}</th>`).join('')}
            <th>Ekspresi: ${expr}</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (let i = 0; i < totalRows; i++) {
      const rowVals = {};
      const bitStrs = [];

      vars.forEach((v, idx) => {
        // Ambil bit ke-idx dari integer i
        const bit = (i >> (vars.length - 1 - idx)) & 1;
        rowVals[v] = bit;
        bitStrs.push(bit);
      });

      const rowOut = parseAndEvaluate(expr, rowVals);
      const rowDataKey = bitStrs.join('-');

      tableHtml += `
        <tr class="bool-tt-row" data-bits="${rowDataKey}">
          ${vars.map(v => `<td>${rowVals[v]}</td>`).join('')}
          <td style="font-weight: bold; color: ${rowOut ? 'var(--orange-primary)' : 'var(--text-muted)'};">${rowOut}</td>
          <td>${rowOut ? '🔥 HIGH' : 'LOW'}</td>
        </tr>
      `;
    }

    tableHtml += `</tbody></table>`;
    truthTableContainer.innerHTML = tableHtml;
    highlightTruthTableRow(vars, variableValues);
  }

  function highlightTruthTableRow(vars, values) {
    const curBits = vars.map(v => values[v] || 0).join('-');
    const rows = document.querySelectorAll('.bool-tt-row');
    rows.forEach(r => {
      const match = r.getAttribute('data-bits') === curBits;
      r.classList.toggle('active-row', match);
    });
  }

  function updateWholeSystem() {
    currentExpression = inputExp.value.trim() || '(AB+CD)E';
    const vars = extractVariables(currentExpression);
    Object.keys(variableValues).forEach(key => {
      if (!vars.includes(key)) delete variableValues[key];
    });
    renderSwitches(vars);
    renderCircuitDiagram(currentExpression, vars, variableValues);
    renderTruthTable(currentExpression, vars);
  }

  if (genBtn) {
    genBtn.addEventListener('click', updateWholeSystem);
  }

  inputExp.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') updateWholeSystem();
  });

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      inputExp.value = btn.getAttribute('data-expr') || '(AB+CD)E';
      updateWholeSystem();
    });
  });

  updateWholeSystem();
}

/* ==========================================================================
   9. SIMULATOR MENYOLDER INTERAKTIF (SOLDER LAB & SMOKE PARTICLES)
   Animasi Pemanasan Kaki Komponen, Pelelehan Timah, Uap Asap & Uji Kualitas
   ========================================================================== */
function initSolderingLabSimulator() {
  const tempSlider = document.getElementById('solder-temp-slider');
  const tempDisplay = document.getElementById('solder-temp-val');
  const heatBtn = document.getElementById('btn-apply-solder');
  const tinBtn = document.getElementById('btn-apply-tin');
  const resetBtn = document.getElementById('btn-reset-solder');
  const jointShape = document.getElementById('solder-joint-blob');
  const smokeCanvas = document.getElementById('solder-smoke-canvas');
  const timerText = document.getElementById('solder-timer-val');
  const verdictBox = document.getElementById('solder-verdict-box');
  const ironVisual = document.getElementById('solder-iron-tip');
  const heatGlow = document.getElementById('solder-heat-glow');
  const fluxRing = document.getElementById('solder-flux-ring');
  const moltenDrop = document.getElementById('solder-molten-drop');
  const tipGlow = document.getElementById('solder-tip-glow');

  if (!tempSlider || !heatBtn) return;

  let currentTemp = 350;
  let heatDuration = 0;
  let hasTinApplied = false;
  let isHeating = false;
  let heatTimerInterval = null;

  // Animasi asap solder menggunakan Canvas
  let smokeParticles = [];
  let animId = null;

  function initSmokeCanvas() {
    if (!smokeCanvas) return;
    const ctx = smokeCanvas.getContext('2d');
    smokeCanvas.width = smokeCanvas.offsetWidth || 300;
    smokeCanvas.height = smokeCanvas.offsetHeight || 200;

    function renderSmoke() {
      ctx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);

      if (isHeating && currentTemp >= 250) {
        // Spawn partikel uap flux
        for (let i = 0; i < 2; i++) {
          smokeParticles.push({
            x: smokeCanvas.width / 2 + (Math.random() * 20 - 10),
            y: smokeCanvas.height - 30,
            radius: Math.random() * 4 + 2,
            opacity: 0.7,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -(Math.random() * 2 + 1.5)
          });
        }
      }

      // Update partikel
      for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const p = smokeParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.radius += 0.15;
        p.opacity -= 0.012;

        if (p.opacity <= 0 || p.y <= 0) {
          smokeParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 230, 240, ${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(renderSmoke);
    }

    if (!animId) {
      animId = requestAnimationFrame(renderSmoke);
    }
  }

  initSmokeCanvas();

  tempSlider.addEventListener('input', () => {
    currentTemp = parseInt(tempSlider.value, 10);
    if (tempDisplay) tempDisplay.textContent = `${currentTemp} °C`;
  });

  // Tombol Panaskan Solder
  heatBtn.addEventListener('click', () => {
    if (isHeating) {
      // Hentikan pemanasan
      stopHeating();
    } else {
      startHeating();
    }
  });

  function startHeating() {
    isHeating = true;
    document.querySelector('.solder-stage')?.classList.add('is-heating');
    heatBtn.textContent = '⏹️ Lepaskan Ujung Solder';
    heatBtn.className = 'btn btn-danger-outline';
    if (ironVisual) ironVisual.style.transform = 'translate(-30px, 30px) rotate(-25deg)';
    if (heatGlow) heatGlow.style.opacity = '0.25';
    if (fluxRing) fluxRing.style.opacity = '0.8';
    if (tipGlow) tipGlow.style.opacity = '0.8';

    heatTimerInterval = setInterval(() => {
      heatDuration += 0.5;
      if (timerText) timerText.textContent = `${heatDuration.toFixed(1)} dtk`;
      evaluateLiveStatus();
    }, 500);
  }

  function stopHeating() {
    isHeating = false;
    clearInterval(heatTimerInterval);
    document.querySelector('.solder-stage')?.classList.remove('is-heating');
    heatBtn.textContent = '🔥 Tempelkan Ujung Solder ke Pad';
    heatBtn.className = 'btn btn-primary';
    if (ironVisual) ironVisual.style.transform = 'translate(0, 0) rotate(0deg)';
    if (heatGlow) heatGlow.style.opacity = '0';
    if (fluxRing) fluxRing.style.opacity = '0';
    if (tipGlow) tipGlow.style.opacity = '0';
    evaluateFinalJoint();
  }

  // Tombol Beri Timah
  if (tinBtn) {
    tinBtn.addEventListener('click', () => {
      if (!isHeating) {
        alert('Pad tembaga belum dipanaskan! Tempelkan mata solder terlebih dahulu.');
        return;
      }
      if (currentTemp < 200) {
        alert('Suhu solder terlalu rendah (<200°C), timah tidak dapat meleleh!');
        return;
      }

      hasTinApplied = true;
      if (jointShape) {
        jointShape.style.display = 'block';
        jointShape.style.transform = 'scale(0.35)';
        requestAnimationFrame(() => {
          jointShape.style.transform = 'scale(1)';
        });
      }
      if (moltenDrop) {
        moltenDrop.style.opacity = '1';
        moltenDrop.classList.add('is-molten');
      }
      evaluateLiveStatus();
    });
  }

  function evaluateLiveStatus() {
    if (heatDuration > 8) {
      // Pad terkelupas (overheating)
      if (jointShape) {
        jointShape.setAttribute('fill', '#451a03'); // Gosong
      }
    } else if (hasTinApplied && currentTemp >= 300 && currentTemp <= 380 && heatDuration >= 2.5 && heatDuration <= 5) {
      if (jointShape) {
        jointShape.setAttribute('fill', 'url(#solder-shiny-gradient)');
      }
    }
  }

  function evaluateFinalJoint() {
    if (!verdictBox) return;

    if (!hasTinApplied) {
      verdictBox.innerHTML = `
        <div class="callout callout-warning">
          <strong>Belum Ada Timah:</strong> Anda belum memasukkan kawat timah ke pad yang dipanaskan.
        </div>
      `;
      return;
    }

    if (heatDuration > 8 || currentTemp > 420) {
      verdictBox.innerHTML = `
        <div class="callout callout-danger">
          <strong>❌ Overheated / Pad PCB Hangus Terkelupas!</strong><br>
          Waktu pemanasan terlalu lama (${heatDuration.toFixed(1)} dtk) atau suhu terlalu tinggi (${currentTemp}°C). Lapisan lem tembaga PCB rusak permanen.
        </div>
      `;
    } else if (currentTemp < 290 || heatDuration < 2.0) {
      verdictBox.innerHTML = `
        <div class="callout callout-warning">
          <strong>⚠️ Cold Solder (Solder Dingin / Kusam)!</strong><br>
          Suhu atau durasi pemanasan kurang memadai. Timah tidak menempel sempurna (poor wetting) dan rapuh jika terkena getaran.
        </div>
      `;
    } else if (heatDuration >= 2.5 && heatDuration <= 5.5 && currentTemp >= 310 && currentTemp <= 380) {
      verdictBox.innerHTML = `
        <div class="callout callout-success">
          <strong>✅ Solderan Sempurna (Perfect Shiny Joint)!</strong><br>
          Luar biasa! Bentuk kerucut cekung mengkilap (concave fillet), menyelimuti kaki komponen dan pad tembaga secara merata sesuai standar ISO/K3 TEI.
        </div>
      `;
    } else {
      verdictBox.innerHTML = `
        <div class="callout callout-info">
          <strong>Sambungan Cukup Baik:</strong> Sambungan menyatu, namun usahakan waktu ideal 3 - 4 detik pada suhu 350°C.
        </div>
      `;
    }
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      stopHeating();
      heatDuration = 0;
      hasTinApplied = false;
      if (timerText) timerText.textContent = '0.0 dtk';
      if (jointShape) {
        jointShape.style.display = 'none';
        jointShape.setAttribute('fill', '#94a3b8');
      }
      if (moltenDrop) {
        moltenDrop.style.opacity = '0';
        moltenDrop.classList.remove('is-molten');
      }
      if (heatGlow) heatGlow.style.opacity = '0';
      if (fluxRing) fluxRing.style.opacity = '0';
      if (tipGlow) tipGlow.style.opacity = '0';
      if (verdictBox) {
        verdictBox.innerHTML = '<span style="color: var(--text-muted);">Siap untuk simulasi baru. Atur suhu dan tekan tombol panaskan.</span>';
      }
    });
  }
}

/* ==========================================================================
   10. SIMULATOR OSILOSKOP DIGITAL REAL-TIME
   Visualisasi Berkas Elektron Gelombang Sinus, Kotak (PWM), dan Segitiga
   ========================================================================== */
function initOscilloscopeSimulator() {
  const canvas = document.getElementById('oscilloscope-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const freqSlider = document.getElementById('scope-freq-slider');
  const voltSlider = document.getElementById('scope-volt-slider');
  const waveSelect = document.getElementById('scope-wave-type');
  const freqLabel = document.getElementById('scope-freq-label');
  const voltLabel = document.getElementById('scope-volt-label');
  const freezeBtn = document.getElementById('scope-freeze-btn');

  let frequency = 50;
  let amplitude = 5;
  let waveType = 'sine';
  let isFrozen = false;
  let phase = 0;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth || 500;
    canvas.height = 220;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  if (freqSlider) {
    freqSlider.addEventListener('input', () => {
      frequency = parseInt(freqSlider.value, 10);
      if (freqLabel) freqLabel.textContent = `${frequency} Hz`;
    });
  }

  if (voltSlider) {
    voltSlider.addEventListener('input', () => {
      amplitude = parseFloat(voltSlider.value);
      if (voltLabel) voltLabel.textContent = `${amplitude.toFixed(1)} V`;
    });
  }

  if (waveSelect) {
    waveSelect.addEventListener('change', () => {
      waveType = waveSelect.value;
    });
  }

  if (freezeBtn) {
    freezeBtn.addEventListener('click', () => {
      isFrozen = !isFrozen;
      freezeBtn.textContent = isFrozen ? '▶️ Lanjutkan' : '⏸️ Bekukan (Freeze)';
    });
  }

  function drawGrid() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.strokeStyle = '#1b2230';
    ctx.lineWidth = 1;

    // Garis horizontal
    const divY = 8;
    for (let i = 0; i <= divY; i++) {
      const y = (h / divY) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Garis vertikal
    const divX = 10;
    for (let i = 0; i <= divX; i++) {
      const x = (w / divX) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Sumbu tengah utama
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
  }

  function renderWave() {
    const w = canvas.width;
    const h = canvas.height;
    const midY = h / 2;

    ctx.fillStyle = '#06080d';
    ctx.fillRect(0, 0, w, h);

    drawGrid();

    // Gambar berkas gelombang
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ff6b00';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff8c00';

    const scaleY = (h / 2 - 20) * (amplitude / 10);
    const cycles = (frequency / 20);

    for (let x = 0; x < w; x++) {
      const t = (x / w) * cycles * 2 * Math.PI + phase;
      let yOffset = 0;

      if (waveType === 'sine') {
        yOffset = Math.sin(t);
      } else if (waveType === 'square') {
        yOffset = Math.sin(t) >= 0 ? 0.9 : -0.9;
      } else if (waveType === 'triangle') {
        yOffset = (2 / Math.PI) * Math.asin(Math.sin(t));
      }

      const y = midY - yOffset * scaleY;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    if (!isFrozen) {
      phase += 0.08;
    }

    requestAnimationFrame(renderWave);
  }

  requestAnimationFrame(renderWave);
}

/* ==========================================================================
   11. Toggle Jawaban Latihan Mandiri Materi
   ========================================================================== */
function initSelfCheckToggles() {
  const toggles = document.querySelectorAll('.self-check-reveal-btn');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const answerBox = btn.nextElementSibling;
      if (answerBox) {
        const isHidden = answerBox.style.display === 'none' || !answerBox.style.display;
        answerBox.style.display = isHidden ? 'block' : 'none';
        btn.textContent = isHidden ? 'Sembunyikan Pembahasan ▲' : 'Buka Kunci Jawaban & Pembahasan ▼';
      }
    });
  });
}
