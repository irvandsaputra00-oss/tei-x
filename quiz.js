/**
 * TEI CLASS X - Engine Kuis Interaktif (25 Soal Pilihan Ganda Vokasi TEI)
 * Menampilkan 1 soal per halaman, pilihan A/B/C/D, navigasi, skor, review & pembahasan.
 */

const TEI_QUIZ_DATA = [
  {
    id: 1,
    category: "Listrik Dasar",
    question: "Besaran listrik yang menyatakan beda potensial atau dorongan gaya gerak listrik antar dua titik dalam suatu rangkaian disebut...",
    options: [
      "Kuat Arus (I)",
      "Tegangan / Beda Potensial (V)",
      "Resistansi (R)",
      "Daya Listrik (P)"
    ],
    answer: 1,
    explanation: "Tegangan (Voltage) dengan simbol V dan satuan Volt adalah besaran beda potensial listrik yang menggerakkan muatan elektron bebas dalam suatu penghantar."
  },
  {
    id: 2,
    category: "Hukum Ohm",
    question: "Sebuah lampu indikator DC terhubung dengan sumber tegangan 12 Volt. Jika hambatan total rangkaian adalah 240 Ohm, berapakah kuat arus yang mengalir?",
    options: [
      "0,05 Ampere (50 mA)",
      "0,5 Ampere (500 mA)",
      "2 Ampere",
      "20 Ampere"
    ],
    answer: 0,
    explanation: "Berdasarkan Hukum Ohm: I = V / R = 12 V / 240 Ω = 0,05 A atau 50 mA."
  },
  {
    id: 3,
    category: "Hukum Ohm",
    question: "Jika sebuah pemanas solder memiliki tegangan kerja 220 Volt dan menarik arus sebesar 0,5 Ampere, berapakah daya listrik yang dikonsumsi solder tersebut?",
    options: [
      "44 Watt",
      "110 Watt",
      "220 Watt",
      "440 Watt"
    ],
    answer: 1,
    explanation: "Rumus daya listrik: P = V × I = 220 V × 0,5 A = 110 Watt."
  },
  {
    id: 4,
    category: "Komponen Elektronika",
    question: "Resistor memiliki gelang warna: Cokelat, Hitam, Merah, dan Emas. Berapakah nilai resistansi dan toleransinya?",
    options: [
      "100 Ω ± 5%",
      "1.000 Ω (1 kΩ) ± 5%",
      "10.000 Ω (10 kΩ) ± 10%",
      "100 Ω ± 10%"
    ],
    answer: 1,
    explanation: "Gelang 1: Cokelat (1), Gelang 2: Hitam (0), Gelang 3: Merah (pengali 10² = 100), Gelang 4: Emas (toleransi ±5%). Nilai = 10 × 100 = 1.000 Ω (1 kΩ) ± 5%."
  },
  {
    id: 5,
    category: "Komponen Elektronika",
    question: "Komponen semikonduktor pasif yang nilai hambatannya akan turun drastis saat terkena intensitas cahaya terang adalah...",
    options: [
      "Thermistor NTC",
      "Potensiometer",
      "LDR (Light Dependent Resistor)",
      "Kapasitor Elektrolit"
    ],
    answer: 2,
    explanation: "LDR (Light Dependent Resistor) adalah resistor peka cahaya berbahan Kadmium Sulfida (CdS). Saat gelap hambatannya sangat tinggi (megaohm), saat terang hambatannya turun menjadi beberapa ratus ohm."
  },
  {
    id: 6,
    category: "Komponen Elektronika",
    question: "Kapasitor yang memiliki kutub positif dan negatif (terpolarisasi) sehingga pemasangannya tidak boleh terbalik adalah...",
    options: [
      "Kapasitor Keramik",
      "Kapasitor Mylar",
      "Kapasitor Elektrolit (ELCO)",
      "Kapasitor Kertas"
    ],
    answer: 2,
    explanation: "Kapasitor Elektrolit (Elco) adalah kapasitor bipolar/polar. Pemasangan polaritas yang terbalik dapat menyebabkan kapasitor panas berlebih hingga meletup/rusak."
  },
  {
    id: 7,
    category: "Komponen Elektronika",
    question: "Komponen aktif yang berfungsi sebagai penyearah arus bolak-balik (AC) menjadi arus searah (DC) dengan sifat menghantarkan arus satu arah adalah...",
    options: [
      "Transistor",
      "Dioda Penyearah",
      "Induktor",
      "Relay"
    ],
    answer: 1,
    explanation: "Dioda penyearah (P-N junction) hanya mengalirkan arus listrik ketika diberi bias maju (Forward Bias: Anoda lebih positif dari Katoda), dan memblokir arus saat bias mundur (Reverse Bias)."
  },
  {
    id: 8,
    category: "Komponen Elektronika",
    question: "Tiga kaki elektroda terminal utama pada sebuah transistor bipolar (BJT) adalah...",
    options: [
      "Anoda, Katoda, Gate",
      "Basis, Kolektor, Emitor",
      "Gate, Drain, Source",
      "Input, Output, Ground"
    ],
    answer: 1,
    explanation: "Transistor BJT (Bipolar Junction Transistor) memiliki tiga elektroda: Basis (B - pengendali arus masuk), Kolektor (C - pengumpul muatan utama), dan Emitor (E - pemancar muatan)."
  },
  {
    id: 9,
    category: "Rangkaian Listrik",
    question: "Dua buah resistor masing-masing berukuran R1 = 6 Ω dan R2 = 3 Ω dirangkai secara paralel. Hambatan pengganti totalnya (R_total) adalah...",
    options: [
      "9 Ω",
      "2 Ω",
      "18 Ω",
      "0,5 Ω"
    ],
    answer: 1,
    explanation: "Rumus paralel 2 resistor: R_total = (R1 × R2) / (R1 + R2) = (6 × 3) / (6 + 3) = 18 / 9 = 2 Ω."
  },
  {
    id: 10,
    category: "Alat Ukur",
    question: "Saat hendak mengukur kuat arus DC yang mengalir pada suatu rangkaian beban menggunakan multimeter digital, cara pemasangan probe alat ukur harus dirangkai secara...",
    options: [
      "Paralel terhadap beban",
      "Seri memutus jalur yang dialiri arus beban",
      "Bebas tanpa mematikan sumber tegangan",
      "Dihubungkan langsung antara kutub positif dan negatif baterai"
    ],
    answer: 1,
    explanation: "Pengukuran kuat arus (Amperemeter) wajib dipasang secara SERI dengan cara menyisipkan multimeter pada jalur yang dibuka/diputus, karena arus yang diukur harus mengalir menembus alat ukur."
  },
  {
    id: 11,
    category: "Alat Ukur",
    question: "Fitur pada multimeter yang mengeluarkan suara 'beep' untuk mendeteksi apakah suatu jalur tembaga PCB atau kabel terhubung utuh (tidak putus) adalah...",
    options: [
      "Voltmeter AC",
      "Continuity Test / Uji Kontinuitas",
      "Frequency Counter",
      "Ohmmeter skala 100k"
    ],
    answer: 1,
    explanation: "Uji kontinuitas (Continuity Test) menggunakan buzzer internal multimeter yang akan berbunyi jika hambatan antar probe mendekati 0 Ω, menandakan jalur kabel/PCB tidak terputus."
  },
  {
    id: 12,
    category: "Penyolderan & K3",
    question: "Ciri-ciri hasil penyolderan komponen pada PCB yang baik, kokoh, dan standar industri adalah...",
    options: [
      "Bentuk menggumpal bulat besar dan berwarna abu-abu kusam",
      "Bentuk cekung runcing menyerupai kerucut/gunung api dan permukaannya mengkilap (shiny)",
      "Timah sangat sedikit sehingga kaki komponen masih goyang",
      "Bantalan PCB (pad) hangus terkelupas"
    ],
    answer: 1,
    explanation: "Hasil solderan yang ideal (good joint) memiliki bentuk lereng kerucut gunung berapi (concave fillet), menutupi seluruh pad dan kaki komponen secara merata dengan kilauan logam yang bersih."
  },
  {
    id: 13,
    category: "Penyolderan & K3",
    question: "Fenomena listrik statis yang dapat merusak komponen semikonduktor sensitif seperti IC CMOS dan MOSFET saat perakitan disebut...",
    options: [
      "Korsleting (Short Circuit)",
      "ESD (Electrostatic Discharge)",
      "Overheat Solder",
      "Reverse Polarity"
    ],
    answer: 1,
    explanation: "ESD (Electrostatic Discharge) adalah pelepasan muatan listrik statis dari tubuh manusia ke komponen. Pencegahannya menggunakan gelang antistatis (antistatic wrist strap) dan alas meja konduktif."
  },
  {
    id: 14,
    category: "Digital",
    question: "Angka desimal 13 jika dikonversikan ke dalam sistem bilangan biner 4-bit adalah...",
    options: [
      "1010",
      "1100",
      "1101",
      "1111"
    ],
    answer: 2,
    explanation: "13 dalam biner: 8 (bobot bit 3) + 4 (bobot bit 2) + 0 (bobot bit 1) + 1 (bobot bit 0) = 1101₂."
  },
  {
    id: 15,
    category: "Digital",
    question: "Gerbang logika yang hanya menghasilkan output logika 1 (HIGH) jika SEMUA inputnya bernilai logika 1 adalah gerbang...",
    options: [
      "OR",
      "AND",
      "NOT",
      "XOR"
    ],
    answer: 1,
    explanation: "Gerbang AND (konjungsi) memiliki prinsip perkalian logika (Y = A · B). Output hanya berlogika 1 jika kedua input A=1 DAN B=1."
  },
  {
    id: 16,
    category: "Digital",
    question: "Gerbang logika yang menghasilkan output berlogika 1 hanya jika kedua inputnya BERBEDA nilai (misal A=0, B=1 atau A=1, B=0) adalah...",
    options: [
      "XOR (Exclusive-OR)",
      "XNOR",
      "NAND",
      "NOR"
    ],
    answer: 0,
    explanation: "Gerbang XOR (Exclusive-OR) menghasilkan output 1 hanya jika salah satu input aktif secara eksklusif (input berbeda). Jika kedua input bernilai sama (0-0 atau 1-1), output bernilai 0."
  },
  {
    id: 17,
    category: "Arduino",
    question: "Dua fungsi wajib yang harus selalu ada di dalam struktur penulisan program (sketch) Arduino adalah...",
    options: [
      "start() dan stop()",
      "void setup() dan void loop()",
      "main() dan exit()",
      "input() dan output()"
    ],
    answer: 1,
    explanation: "Program Arduino memerlukan: 'void setup()' yang dijalankan sekali saat mikrokontroler menyala untuk inisialisasi pin, dan 'void loop()' yang dieksekusi secara berulang terus-menerus."
  },
  {
    id: 18,
    category: "Arduino",
    question: "Perintah bahasa C Arduino untuk mengatur fungsi suatu pin (misalnya pin nomor 13) sebagai jalur pengeluaran sinyal tegangan adalah...",
    options: [
      "digitalWrite(13, HIGH);",
      "pinMode(13, OUTPUT);",
      "analogRead(13);",
      "setPin(13, OUT);"
    ],
    answer: 1,
    explanation: "Fungsi 'pinMode(pin, mode)' digunakan untuk mengonfigurasi pin tertentu, contoh: pinMode(13, OUTPUT) untuk menetapkan pin 13 sebagai digital output."
  },
  {
    id: 19,
    category: "Arduino",
    question: "Resolusi konverter Analog ke Digital (ADC) pada papan Arduino Uno adalah 10-bit, yang artinya nilai pembacaan sensor pada pin Analog (A0-A5) berkisar antara...",
    options: [
      "0 hingga 255",
      "0 hingga 1023",
      "0 hingga 5000",
      "0 hingga 4095"
    ],
    answer: 1,
    explanation: "ADC 10-bit menghasilkan rentang nilai sebesar 2¹⁰ = 1024 level diskrit, yaitu dari angka 0 (merepresentasikan 0 Volt) hingga 1023 (merepresentasikan 5 Volt)."
  },
  {
    id: 20,
    category: "Elektronika Industri",
    question: "Saklar mekanik yang digerakkan oleh medan elektromagnetik untuk mengendalikan beban tegangan tinggi dengan menggunakan sinyal tegangan rendah disebut...",
    options: [
      "Resistor Geser",
      "Relay / Kontaktor Magnit",
      "Potensiometer",
      "Kapasitor Trimmer"
    ],
    answer: 1,
    explanation: "Relay memanfaatkan koil elektromagnet untuk menarik jangkar mekanis, membuka atau menutup kontak saklar (NO/NC), sehingga rangkaian kontrol tegangan rendah terisolasi aman dari tegangan beban besar."
  },
  {
    id: 21,
    category: "Elektronika Industri",
    question: "Sensor industri yang mampu mendeteksi keberadaan benda padat berbahan LOGAM tanpa kontak fisik langsung dengan memanfaatkan medan frekuensi tinggi adalah...",
    options: [
      "Inductive Proximity Sensor",
      "Capacitive Proximity Sensor",
      "Thermocouple",
      "Sensor LDR"
    ],
    answer: 0,
    explanation: "Sensor Proximity Induktif bekerja berdasarkan hukum induksi elektromagnetik yang mendeteksi objek logam (besi, tembaga, aluminium) saat memasuki medan elektromagnet kumparannya."
  },
  {
    id: 22,
    category: "Elektronika Industri",
    question: "Perangkat pengendali berbasis mikroprosesor khusus yang dirancang tangguh untuk bekerja di lingkungan industri pabrik dan dapat diprogram dengan diagram tangga (Ladder Diagram) adalah...",
    options: [
      "Arduino Uno",
      "PLC (Programmable Logic Controller)",
      "Raspberry Pi",
      "Personal Computer (PC)"
    ],
    answer: 1,
    explanation: "PLC (Programmable Logic Controller) adalah komputer industri standar otomasi yang tahan terhadap derau listrik, kelembapan, dan getaran bengkel untuk mengontrol proses mesin secara otomatis."
  },
  {
    id: 23,
    category: "Elektronika Industri",
    question: "Pada kontaktor magnetik industri, singkatan terminal kontak bantu 'NO' dan 'NC' memiliki arti...",
    options: [
      "Normally Open dan Normally Closed",
      "Not Operational dan Not Connected",
      "Negative Output dan Negative Common",
      "New Operation dan Next Control"
    ],
    answer: 0,
    explanation: "NO (Normally Open) adalah kontak yang dalam kondisi koil mati berada pada posisi terbuka/memutus arus. Sedangkan NC (Normally Closed) adalah kontak yang secara normal tertutup/terhubung sebelum koil dialiri listrik."
  },
  {
    id: 24,
    category: "Listrik Dasar",
    question: "Hambatan listrik kawat penghantar akan semakin BESAR jika kawat tersebut...",
    options: [
      "Semakin pendek dan semakin tebal luas penampangnya",
      "Semakin panjang dan luas penampang kawat semakin kecil",
      "Bahan penghantar terbuat dari perak murni",
      "Suhu kawat mendekati nol derajat absolut"
    ],
    answer: 1,
    explanation: "Sesuai rumus resistansi kawat: R = ρ · (L / A). Hambatan berbanding lurus dengan panjang kawat (L) dan berbanding terbalik dengan luas penampang (A). Kawat panjang dan kurus memiliki resistansi lebih tinggi."
  },
  {
    id: 25,
    category: "Elektronika Industri",
    question: "Komponen proteksi beban lebih (overload) pada motor listrik industri yang bekerja berdasarkan prinsip pemuaian bimetal saat arus melebihi batas adalah...",
    options: [
      "TOR (Thermal Overload Relay)",
      "Push Button Stop",
      "Lampu Pilot Hijau",
      "Kabel Duct"
    ],
    answer: 0,
    explanation: "Thermal Overload Relay (TOR) berfungsi memutuskan kontak rangkaian kontrol kontaktor ketika terdeteksi arus berlebih yang mengalir ke motor 3 fasa secara terus menerus untuk mencegah motor terbakar."
  }
];

class QuizApp {
  constructor(quizData) {
    this.questions = quizData;
    this.currentIndex = 0;
    this.userAnswers = new Array(quizData.length).fill(null);
    this.isCompleted = false;

    // Element references
    this.quizContainer = document.getElementById('quiz-box');
    this.categoryBadge = document.getElementById('quiz-category');
    this.questionNumBadge = document.getElementById('quiz-q-num');
    this.progressBar = document.getElementById('quiz-progress-bar-fill');
    this.questionText = document.getElementById('quiz-question-text');
    this.optionsContainer = document.getElementById('quiz-options-container');
    this.prevBtn = document.getElementById('quiz-prev-btn');
    this.nextBtn = document.getElementById('quiz-next-btn');
    this.submitBtn = document.getElementById('quiz-submit-btn');
    this.resultContainer = document.getElementById('quiz-result-container');

    this.init();
  }

  init() {
    if (!this.quizContainer) return;

    this.bindEvents();
    this.renderQuestion();
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.goToPrev());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.goToNext());
    }

    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', () => this.finishQuiz());
    }
  }

  renderQuestion() {
    const q = this.questions[this.currentIndex];
    if (!q) return;

    // Update Header badges
    if (this.categoryBadge) this.categoryBadge.textContent = q.category;
    if (this.questionNumBadge) {
      this.questionNumBadge.textContent = `Soal ${this.currentIndex + 1} dari ${this.questions.length}`;
    }

    // Update Progress bar
    if (this.progressBar) {
      const percent = ((this.currentIndex + 1) / this.questions.length) * 100;
      this.progressBar.style.width = `${percent}%`;
    }

    // Update Question text
    if (this.questionText) {
      this.questionText.textContent = q.question;
    }

    // Render Options
    if (this.optionsContainer) {
      this.optionsContainer.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option-btn';
        if (this.userAnswers[this.currentIndex] === idx) {
          btn.classList.add('selected');
        }

        btn.innerHTML = `
          <span class="option-prefix">${letters[idx]}</span>
          <span class="option-label">${optText}</span>
        `;

        btn.addEventListener('click', () => this.selectOption(idx));
        this.optionsContainer.appendChild(btn);
      });
    }

    // Manage button states
    if (this.prevBtn) {
      this.prevBtn.style.display = this.currentIndex > 0 ? 'inline-flex' : 'none';
    }

    const isLast = this.currentIndex === this.questions.length - 1;
    if (this.nextBtn) {
      this.nextBtn.style.display = isLast ? 'none' : 'inline-flex';
    }
    if (this.submitBtn) {
      this.submitBtn.style.display = isLast ? 'inline-flex' : 'none';
    }
  }

  selectOption(optionIndex) {
    this.userAnswers[this.currentIndex] = optionIndex;
    
    // Highlight UI
    const allBtns = this.optionsContainer.querySelectorAll('.quiz-option-btn');
    allBtns.forEach((btn, idx) => {
      if (idx === optionIndex) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
  }

  goToNext() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    }
  }

  goToPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderQuestion();
    }
  }

  finishQuiz() {
    // Validasi apakah ada soal yang belum dijawab
    const unansweredCount = this.userAnswers.filter(ans => ans === null).length;
    if (unansweredCount > 0) {
      const confirmSubmit = confirm(`Masih ada ${unansweredCount} soal yang belum dijawab. Tetap kumpulkan sekarang?`);
      if (!confirmSubmit) return;
    }

    let correctCount = 0;
    this.questions.forEach((q, idx) => {
      if (this.userAnswers[idx] === q.answer) {
        correctCount++;
      }
    });

    const score = (correctCount / this.questions.length) * 100;

    // Simpan ke localStorage melalui TEI_STORAGE
    if (typeof TEI_STORAGE !== 'undefined') {
      TEI_STORAGE.saveQuizResult(score, correctCount, this.questions.length);
    }

    this.renderResults(score, correctCount);
  }

  renderResults(score, correctCount) {
    if (this.quizContainer) {
      this.quizContainer.style.display = 'none';
    }

    if (!this.resultContainer) return;
    this.resultContainer.style.display = 'block';

    let verdictTitle = '';
    let verdictClass = '';
    let verdictDesc = '';

    if (score >= 85) {
      verdictTitle = 'Sangat Memuaskan (Sangat Kompeten)';
      verdictClass = 'badge-emerald';
      verdictDesc = 'Luar biasa! Pemahaman Anda terhadap materi dasar Teknik Elektronika Industri Kelas 10 sangat mendalam dan siap berlanjut ke kompetensi berikutnya.';
    } else if (score >= 70) {
      verdictTitle = 'Kompeten (Lulus KKM)';
      verdictClass = 'badge-cyan';
      verdictDesc = 'Bagus! Anda telah melampaui kriteria ketuntasan minimal. Pelajari kembali materi yang masih keliru untuk menyempurnakan kompetensi Anda.';
    } else {
      verdictTitle = 'Perlu Pendalaman (Belum Tuntas)';
      verdictClass = 'badge-amber';
      verdictDesc = 'Tetap semangat! Silakan ulangi membaca modul materi 1 hingga 10, pelajari kembali rumus dan fungsi komponen, lalu coba kuis kembali.';
    }

    // Bangun tampilan review jawaban
    let reviewHtml = '';
    const letters = ['A', 'B', 'C', 'D'];

    this.questions.forEach((q, idx) => {
      const userAns = this.userAnswers[idx];
      const isCorrect = userAns === q.answer;
      const userAnsText = userAns !== null ? `${letters[userAns]}. ${q.options[userAns]}` : 'Tidak dijawab';
      const correctAnsText = `${letters[q.answer]}. ${q.options[q.answer]}`;

      reviewHtml += `
        <div class="review-card-item ${isCorrect ? 'correct' : 'incorrect'}">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="badge ${isCorrect ? 'badge-emerald' : 'badge-danger'}">
              ${isCorrect ? '✓ Benar' : '✕ Salah'}
            </span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${q.category}</span>
          </div>
          <p style="font-weight: 700; margin-bottom: 0.6rem;">Soal ${idx + 1}: ${q.question}</p>
          <div style="font-size: 0.9rem; margin-bottom: 0.4rem;">
            Jawaban Anda: <strong style="color: ${isCorrect ? 'var(--emerald-accent)' : 'var(--rose-danger)'};">${userAnsText}</strong>
          </div>
          ${!isCorrect ? `<div style="font-size: 0.9rem; color: var(--emerald-accent); margin-bottom: 0.5rem;">Jawaban Benar: <strong>${correctAnsText}</strong></div>` : ''}
          <div style="background: rgba(0,0,0,0.25); padding: 0.75rem; border-radius: 6px; font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">
            💡 <strong>Pembahasan Ilmiah:</strong> ${q.explanation}
          </div>
        </div>
      `;
    });

    this.resultContainer.innerHTML = `
      <div class="quiz-result-view">
        <div class="score-badge-circle">
          <span class="score-num">${Math.round(score)}</span>
          <span class="score-total">dari 100</span>
        </div>
        <div style="margin-bottom: 1rem;">
          <span class="badge ${verdictClass}" style="font-size: 0.95rem; padding: 0.4rem 1.2rem;">${verdictTitle}</span>
        </div>
        <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto 1.5rem;">
          Benar <strong>${correctCount}</strong> dari total <strong>${this.questions.length}</strong> butir soal vokasi.
          <br>${verdictDesc}
        </p>

        <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 2.5rem; flex-wrap: wrap;">
          <button type="button" id="btn-restart-quiz" class="btn btn-primary">
            🔄 Ulangi Quiz
          </button>
          <a href="materi.html" class="btn btn-secondary">
            📖 Buka Kembali Materi
          </a>
          <a href="index.html" class="btn btn-outline-cyan">
            🏠 Kembali ke Beranda
          </a>
        </div>

        <div style="text-align: left; margin-top: 2rem;">
          <h3 style="font-size: 1.3rem; margin-bottom: 1.2rem; color: var(--cyan-primary); display: flex; align-items: center; gap: 0.5rem;">
            📝 Review Hasil & Pembahasan Jawaban
          </h3>
          <div class="review-list">
            ${reviewHtml}
          </div>
        </div>
      </div>
    `;

    // Bind event tombol ulangi quiz
    const restartBtn = document.getElementById('btn-restart-quiz');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.resetQuiz();
      });
    }

    // Scroll ke atas
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }

  resetQuiz() {
    this.currentIndex = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);
    if (this.resultContainer) this.resultContainer.style.display = 'none';
    if (this.quizContainer) this.quizContainer.style.display = 'block';
    this.renderQuestion();
  }
}

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('quiz-box')) {
    new QuizApp(TEI_QUIZ_DATA);
  }
});

