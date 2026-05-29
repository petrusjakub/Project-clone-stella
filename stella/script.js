const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('#nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navMenu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const qnaForm = document.querySelector('#qna-form');
const qnaResult = document.querySelector('#qna-result');
const qnaResultTitle = document.querySelector('#qna-result-title');
const qnaResultDesc = document.querySelector('#qna-result-desc');
const qnaResultCta = document.querySelector('#qna-result-cta');

const qnaProducts = {
  health: {
    title: 'MiUltimate HealthCare',
    desc: 'Cocok untuk Anda yang fokus menjaga biaya rawat inap/rawat jalan agar lebih terkontrol dengan manfaat kesehatan komprehensif.',
    wa: 'https://wa.me/6282255291890?text=Halo%2C%20saya%20baru%20isi%20QnA%20dan%20ingin%20tanya%20tentang%20MiUltimate%20HealthCare.'
  },
  critical: {
    title: 'MiUltimate Critical Care / Manulife Critical Care Protection',
    desc: 'Cocok bila prioritas Anda antisipasi dampak finansial saat terjadi penyakit kritis pada diri sendiri atau keluarga.',
    wa: 'https://wa.me/6282255291890?text=Halo%2C%20saya%20baru%20isi%20QnA%20dan%20ingin%20tanya%20tentang%20produk%20critical%20care.'
  },
  retirement: {
    title: 'MiFuture Income Protector (kategori perencanaan pensiun)',
    desc: 'menjaga kesinambungan dana',
    wa: 'https://wa.me/6282255291890?text=Halo%2C%20saya%20baru%20isi%20QnA%20dan%20ingin%20tanya%20tentang%20produk%20pensiun.'
  },
  invest: {
    title: 'Manulife Dynamic Smart Assurance (MDSA)',
    desc: 'Cocok untuk kebutuhan perlindungan jiwa yang disertai opsi investasi agar rencana keuangan lebih fleksibel.',
    wa: 'https://wa.me/6282255291890?text=Halo%2C%20saya%20baru%20isi%20QnA%20dan%20ingin%20tanya%20tentang%20MDSA.'
  },
  syariah: {
    title: 'MiSmart Insurance Solution Syariah / MiUltimate HealthCare Syariah',
    desc: 'Pilihan menarik jika Anda mengutamakan perlindungan dan pengelolaan dana dengan prinsip syariah.',
    wa: 'https://wa.me/6282255291890?text=Halo%2C%20saya%20baru%20isi%20QnA%20dan%20ingin%20tanya%20tentang%20produk%20syariah.'
  }
};

if (qnaForm && qnaResult && qnaResultTitle && qnaResultDesc && qnaResultCta) {
  qnaForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(qnaForm);
    const scores = { health: 0, critical: 0, retirement: 0, invest: 0, syariah: 0 };

    for (const value of formData.values()) {
      const key = String(value);
      if (Object.prototype.hasOwnProperty.call(scores, key)) {
        scores[key] += 1;
      }
    }

    const bestKey = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];
    const recommendation = qnaProducts[bestKey] || qnaProducts.health;

    qnaResultTitle.textContent = recommendation.title;
    qnaResultDesc.textContent = recommendation.desc;
    qnaResultCta.setAttribute('href', recommendation.wa);
    qnaResult.hidden = false;
    qnaResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}
