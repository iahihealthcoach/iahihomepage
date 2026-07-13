const site = {
  brandName: '국제건강관리지도사협회',
  badge: '국제 전문 교육 협회',
  heroTitle: '건강을 배우고, 건강을 전하는 전문 인력을 키우는 협회',
  heroDescription:
    '건강코치 양성교육, 민간자격증 운영, 회원 기반 교육 네트워크를 연결해 실무형 건강교육 인력을 양성합니다.',
  contactLine: '교육과정·회원가입·자격증 발급 관련 상담을 언제든지 받습니다.',
  contactDescription:
    '실제 운영 단계에 맞춰 회원가입, 교육 참여, 자격 인증, 자료 제공까지 이어지는 흐름을 안내해 드립니다. 배포와 연동은 운영 계정 정보를 확인한 뒤 안전하게 진행하는 것을 권장합니다.',
  footerEmail: '문의: iahi.healthcoach@gmail.com',
  footerNote: 'Vercel 배포 전 건강이음 / iahi 계정 정보 확인 권장',
  productNote:
    '교육 과정별 세부 커리큘럼, 교육시간, 수료 기준과 평가 방식까지 이어질 수 있는 구조로 확장할 수 있습니다.'
};

const aboutPoints = [
  {
    title: '협회의 역할',
    body: '국제건강관리지도사협회는 건강관리 교육과 민간자격 인증을 통해, 개인의 생활습관 개선부터 건강코치 양성과 전문 교육까지 이어지는 실무형 인재를 양성하는 교육기관입니다.'
  },
  {
    title: '교육기관의 차별성',
    body: '단순한 교육 제공이 아니라, 교육·평가·자격·회원 운영이 하나로 연결되는 구조로 운영되며, 교육생과 회원이 지속적으로 성장할 수 있는 커뮤니티를 제공합니다.'
  },
  {
    title: '운영 방향',
    body: '교육, 인증, 회원 관리, 자격 발급이 연계된 체계적인 협회 운영을 통해 신뢰성 있는 교육기관으로 성장합니다.'
  }
];

const products = [
  {
    title: '기초 건강코치 과정',
    badge: '입문',
    body: '건강상담, 생활습관 개선, 기본 상담기법을 배우는 입문 과정으로, 건강코치로서의 기초 역량을 익힙니다.'
  },
  {
    title: '심화 건강관리 과정',
    badge: '실무',
    body: '다양한 대상자에게 적용 가능한 건강관리 전략과 실무 지식을 확장하는 과정으로, 교육 운영과 상담 실무에 대한 이해를 높입니다.'
  },
  {
    title: '전문가 연수 과정',
    badge: '전문',
    body: '교육강사, 운영진, 자격 인증 중심의 실무 역량을 강화하는 전문 과정으로, 협회 활동과 교육 운영에 필요한 역량을 높입니다.'
  }
];

const valueStack = [
  { title: '회원가입', body: '교육생과 회원의 기본 정보 등록, 권한 관리, 로그인 구조를 포함한 가입 시스템으로 운영됩니다.' },
  { title: '결제시스템', body: '교육 참여비, 멤버십, 자격증 관련 비용의 안전한 결제 연동을 위한 시스템으로 운영됩니다.' },
  { title: '자료보관 / PDF 발급', body: '수료증, 자격증, 학습자료, PDF 다운로드를 제공할 수 있는 자료 보관 및 인증 시스템입니다.' }
];

const features = [
  {
    title: '전문가 교육 설계',
    body: '건강코치 실무 역량을 중심으로 설계된 커리큘럼으로, 현장 적용 가능한 교육 체계를 제공합니다.'
  },
  {
    title: '자격 인증 연계',
    body: '교육 이수 후 자격 검증과 발급까지 이어지는 구조로 학습 성과와 신뢰성을 확보합니다.'
  },
  {
    title: '회원 중심 네트워크',
    body: '협회 회원 간 정보 공유와 교육 참여를 활성화하여 지속적인 전문성 성장을 지원합니다.'
  }
];

const caseStudies = [
  {
    title: '전문가 회의 기반 교육 기획',
    body: '협회 전문가들이 모여 실제 건강코치 현장을 분석하고 교육 커리큘럼을 설계하는 회의를 정기적으로 진행합니다.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: '현장 적용형 교육 운영',
    body: '실제 사례 중심의 실습과 평가를 통해 교육생들이 전문 건강코치로서 현업에 바로 투입될 수 있도록 준비합니다.',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: '협회 실제 사례 공유',
    body: '회원 활동 사례와 인증 과정, 교육 성과를 협회 네트워크에서 공유하여 지속 가능한 성장 기반을 마련합니다.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop'
  }
];

function renderContent() {
  const brandName = document.querySelector('[data-role="brand-name"]');
  const brandBadge = document.querySelector('[data-role="brand-badge"]');
  const heroTitle = document.querySelector('[data-role="hero-title"]');
  const heroDescription = document.querySelector('[data-role="hero-description"]');
  const heroContact = document.querySelector('[data-role="hero-contact"]');
  const aboutCards = document.getElementById('aboutCards');
  const productCards = document.getElementById('productCards');
  const productNote = document.querySelector('[data-role="product-note"]');
  const valueStackContainer = document.getElementById('valueStack');
  const contactDescription = document.querySelector('[data-role="contact-description"]');
  const footerTitle = document.querySelector('[data-role="footer-title"]');
  const footerEmail = document.querySelector('[data-role="footer-email"]');

  if (brandName) brandName.textContent = site.brandName;
  if (brandBadge) brandBadge.textContent = site.badge;
  if (heroTitle) heroTitle.textContent = site.heroTitle;
  if (heroDescription) heroDescription.textContent = site.heroDescription;
  if (heroContact) heroContact.innerHTML = `<strong>문의</strong> ${site.contactLine}`;
  if (aboutCards) {
    aboutCards.innerHTML = aboutPoints
      .map(
        (item) => `
          <article class="card">
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          </article>
        `
      )
      .join('');
  }
  if (productCards) {
    productCards.innerHTML = products
      .map(
        (item) => `
          <article class="card product-card">
            <span class="product-badge">${item.badge}</span>
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          </article>
        `
      )
      .join('');
  }
  if (productNote) productNote.textContent = site.productNote;
  if (valueStackContainer) {
    valueStackContainer.innerHTML = valueStack
      .map(
        (item) => `
          <div class="pill-item">
            <strong>${item.title}</strong>
            <span>${item.body}</span>
          </div>
        `
      )
      .join('');
  }

  const featureCards = document.getElementById('featureCards');
  if (featureCards) {
    featureCards.innerHTML = features
      .map(
        (item) => `
          <article class="feature-card">
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          </article>
        `
      )
      .join('');
  }

  const caseCards = document.getElementById('caseCards');
  if (caseCards) {
    caseCards.innerHTML = caseStudies
      .map(
        (item) => `
          <article class="case-card">
            <img class="case-card-image" src="${item.image}" alt="" loading="lazy" />
            <div class="case-card-body">
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </div>
          </article>
        `
      )
      .join('');
  }

  if (contactDescription) contactDescription.textContent = site.contactDescription;
  if (footerTitle) footerTitle.textContent = site.brandName;
  if (footerEmail) footerEmail.textContent = site.footerEmail;
}

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? '✕' : '☰';
  });
}

renderContent();
