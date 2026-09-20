/**
 * TEI CLASS X - Sistem Manajemen Progress Belajar (localStorage)
 * Menyimpan kemajuan membaca modul (1-11), proyek praktik (1-6), dan skor kuis
 */

const TEI_STORAGE = {
  MATERI_KEY: 'tei_materi_completed',
  PRAKTIK_KEY: 'tei_praktik_completed',
  QUIZ_KEY: 'tei_quiz_result',
  TOTAL_MATERI: 11,
  TOTAL_PRAKTIK: 6,

  // Mengambil daftar materi yang telah selesai dibaca
  getCompletedMateri() {
    try {
      const data = localStorage.getItem(this.MATERI_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Gagal membaca progress materi dari localStorage', e);
      return [];
    }
  },

  // Menyimpan toggle status selesai materi
  toggleMateri(materiId) {
    const list = this.getCompletedMateri();
    const index = list.indexOf(materiId);
    let isCompleted = false;

    if (index > -1) {
      list.splice(index, 1);
      isCompleted = false;
    } else {
      list.push(materiId);
      isCompleted = true;
    }

    try {
      localStorage.setItem(this.MATERI_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Gagal menyimpan progress materi', e);
    }

    this.updateAllUI();
    return isCompleted;
  },

  isMateriDone(materiId) {
    const list = this.getCompletedMateri();
    return list.includes(materiId);
  },

  // Mengambil daftar praktik yang telah dicoba
  getCompletedPraktik() {
    try {
      const data = localStorage.getItem(this.PRAKTIK_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Gagal membaca progress praktik dari localStorage', e);
      return [];
    }
  },

  togglePraktik(praktikId) {
    const list = this.getCompletedPraktik();
    const index = list.indexOf(praktikId);
    let isCompleted = false;

    if (index > -1) {
      list.splice(index, 1);
      isCompleted = false;
    } else {
      list.push(praktikId);
      isCompleted = true;
    }

    try {
      localStorage.setItem(this.PRAKTIK_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Gagal menyimpan progress praktik', e);
    }

    this.updateAllUI();
    return isCompleted;
  },

  isPraktikDone(praktikId) {
    const list = this.getCompletedPraktik();
    return list.includes(praktikId);
  },

  // Menyimpan hasil kuis
  saveQuizResult(score, correctCount, totalQuestions) {
    const resultData = {
      score: Math.round(score),
      correctCount: correctCount,
      totalQuestions: totalQuestions,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    try {
      localStorage.setItem(this.QUIZ_KEY, JSON.stringify(resultData));
    } catch (e) {
      console.error('Gagal menyimpan hasil kuis', e);
    }

    this.updateAllUI();
    return resultData;
  },

  getQuizResult() {
    try {
      const data = localStorage.getItem(this.QUIZ_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Gagal membaca hasil kuis', e);
      return null;
    }
  },

  // Menghitung statistik keseluruhan
  calculateStats() {
    const completedMateri = this.getCompletedMateri();
    const completedPraktik = this.getCompletedPraktik();
    const quizResult = this.getQuizResult();

    const materiCount = completedMateri.length;
    const praktikCount = completedPraktik.length;

    // Bobot persentase total: Materi (60%), Praktik (30%), Kuis (10%)
    const materiPercent = (materiCount / this.TOTAL_MATERI) * 60;
    const praktikPercent = (praktikCount / this.TOTAL_PRAKTIK) * 30;
    const quizPercent = quizResult ? (quizResult.score / 100) * 10 : 0;

    const overallPercent = Math.min(100, Math.round(materiPercent + praktikPercent + quizPercent));

    return {
      materiCount,
      totalMateri: this.TOTAL_MATERI,
      praktikCount,
      totalPraktik: this.TOTAL_PRAKTIK,
      quizScore: quizResult ? quizResult.score : 0,
      quizCompleted: !!quizResult,
      overallPercent
    };
  },

  // Memperbarui semua tampilan progress di halaman web
  updateAllUI() {
    const stats = this.calculateStats();

    // 1. Update elemen progress bar umum
    const fillBars = document.querySelectorAll('.global-progress-fill, #global-progress-fill');
    fillBars.forEach(bar => {
      bar.style.width = `${stats.overallPercent}%`;
    });

    const percentLabels = document.querySelectorAll('.global-progress-text, #global-progress-text');
    percentLabels.forEach(lbl => {
      lbl.textContent = `${stats.overallPercent}%`;
    });

    // 2. Update badge di Navbar
    const navBadge = document.getElementById('nav-progress-text');
    if (navBadge) {
      navBadge.textContent = `${stats.overallPercent}% Selesai`;
    }

    // 3. Update statistik dashboard di Halaman Utama (jika ada)
    const statMateri = document.getElementById('stat-materi-count');
    if (statMateri) {
      statMateri.textContent = `${stats.materiCount}/${stats.totalMateri}`;
    }

    const statPraktik = document.getElementById('stat-praktik-count');
    if (statPraktik) {
      statPraktik.textContent = `${stats.praktikCount}/${stats.totalPraktik}`;
    }

    const statQuiz = document.getElementById('stat-quiz-score');
    if (statQuiz) {
      statQuiz.textContent = stats.quizCompleted ? `${stats.quizScore}` : '-';
    }

    // 4. Update status tombol dan indikator di halaman Materi
    const materiButtons = document.querySelectorAll('[data-materi-id]');
    materiButtons.forEach(btn => {
      const id = btn.getAttribute('data-materi-id');
      const isDone = this.isMateriDone(id);
      
      if (btn.classList.contains('materi-toggle-btn')) {
        if (isDone) {
          btn.classList.add('btn-emerald');
          btn.classList.remove('btn-outline-cyan');
          btn.innerHTML = '✓ Selesai Dipelajari';
        } else {
          btn.classList.remove('btn-emerald');
          btn.classList.add('btn-outline-cyan');
          btn.innerHTML = 'Tandai Selesai';
        }
      }

      // Update badge card
      const badge = document.querySelector(`.materi-status-badge[data-target="${id}"]`);
      if (badge) {
        if (isDone) {
          badge.className = 'badge badge-emerald materi-status-badge';
          badge.textContent = '✓ Selesai';
        } else {
          badge.className = 'badge badge-cyan materi-status-badge';
          badge.textContent = 'Belum Selesai';
        }
      }
    });

    // 5. Update status tombol dan indikator di halaman Praktik
    const praktikButtons = document.querySelectorAll('[data-praktik-id]');
    praktikButtons.forEach(btn => {
      const id = btn.getAttribute('data-praktik-id');
      const isDone = this.isPraktikDone(id);

      if (btn.classList.contains('praktik-toggle-btn')) {
        if (isDone) {
          btn.classList.add('btn-emerald');
          btn.classList.remove('btn-secondary');
          btn.innerHTML = '✓ Praktik Selesai';
        } else {
          btn.classList.remove('btn-emerald');
          btn.classList.add('btn-secondary');
          btn.innerHTML = 'Tandai Telah Dicoba';
        }
      }
    });
  },

  // Reset semua progress
  resetAll() {
    if (confirm('Apakah Anda yakin ingin mereset seluruh progress belajar dan riwayat kuis TEI CLASS X?')) {
      localStorage.removeItem(this.MATERI_KEY);
      localStorage.removeItem(this.PRAKTIK_KEY);
      localStorage.removeItem(this.QUIZ_KEY);
      this.updateAllUI();
      alert('Seluruh progress belajar berhasil direset ke awal.');
      window.location.reload();
    }
  }
};

// Auto-inisialisasi saat dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  TEI_STORAGE.updateAllUI();

  // Event listener tombol reset progress jika ada
  const resetBtn = document.getElementById('btn-reset-progress');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      TEI_STORAGE.resetAll();
    });
  }

  // Delegasi event listener untuk tombol toggle materi
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.materi-toggle-btn');
    if (target) {
      const id = target.getAttribute('data-materi-id');
      if (id) {
        TEI_STORAGE.toggleMateri(id);
      }
    }

    const targetPraktik = e.target.closest('.praktik-toggle-btn');
    if (targetPraktik) {
      const id = targetPraktik.getAttribute('data-praktik-id');
      if (id) {
        TEI_STORAGE.togglePraktik(id);
      }
    }
  });
});
