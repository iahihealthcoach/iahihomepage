# Deep Navy Editorial 홈페이지 리디자인 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `index.html` / `styles.css` / `script.js`의 비주얼을 "Deep Navy Editorial" 방향(딥네이비+골드 포인트+실사진)으로 재단장한다. 콘텐츠(카피)·섹션 구조·앵커는 그대로 둔다.

**Architecture:** 정적 사이트(빌드 도구 없음, `<link>`/`<script>` 직접 로드)이므로 변경은 `styles.css`의 디자인 토큰·컴포넌트 스타일, `index.html`의 히어로 이미지 마크업, `script.js`의 `caseStudies` 데이터/렌더 템플릿에 국한된다. 자동화된 테스트 스위트가 없는 정적 페이지이므로, 각 태스크의 "테스트"는 Playwright MCP(`mcp__playwright__browser_navigate` 등)로 `file://` 경로의 `index.html`을 열어 스크린샷으로 육안 검증하는 것으로 대체한다.

**Tech Stack:** 순수 HTML/CSS/JS (프레임워크 없음), 이미지 소싱은 `images.unsplash.com` 직접 hotlink.

## Global Constraints

- 기존 8개 섹션(`#top` 히어로, `#about`, 운영흐름, `#program`, 강점, `#cases`, `#certification`, `#membership`, `#contact`) 구조와 앵커 id는 변경하지 않는다. (spec: "채택 방향")
- 콘텐츠 카피(제목/본문 텍스트)는 수정하지 않는다. (spec: "목표")
- 신규 웹폰트를 로드하지 않는다. Noto Sans KR만 사용한다. (spec: "타이포그래피")
- 골드 포인트 컬러 `#c9a227`는 뱃지/아이콘/구분선/hover 등 강조 요소에만 쓰고, 버튼·링크 등 기존 인터랙션 요소의 블루 팔레트(`--primary`, `--accent`)는 유지한다. (spec: "컬러 시스템")
- 이미지는 Unsplash CDN에서 다운로드 없이 `<img src>`로 직접 hotlink한다. (spec: "이미지 소싱")
- 기존 `hero-image.svg`, `logo.svg` 파일은 삭제하지 않는다. (spec: "범위 밖")
- 반응형 브레이크포인트(860px, 680px)와 그리드 컬럼 축소 로직은 그대로 유지한다. (spec: "반응형")

이번 계획에서 사용할 확정 이미지 URL (사전에 `curl -o /dev/null -w "%{http_code}"`로 200 응답 확인, 실제 사진 내용도 다운로드 후 육안 확인 완료):

| 용도 | URL |
|---|---|
| 히어로 (전문가 회의 테이블) | `https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop` |
| 사례 카드 1 — 전문가 회의 (포스트잇 브레인스토밍) | `https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop` |
| 사례 카드 2 — 교육 현장 (강의실) | `https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop` |
| 사례 카드 3 — 협회 성과 공유 (하이파이브) | `https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop` |

---

### Task 1: 디자인 토큰 & 타이포그래피 베이스

**Files:**
- Modify: `styles.css:1-11` (`:root` 변수)
- Modify: `styles.css:123-140` (`.eyebrow`, `h1`)
- Modify: `styles.css:287-289` (`.section-heading`)

**Interfaces:**
- Produces: CSS 커스텀 프로퍼티 `--navy-900`, `--navy-800`, `--navy-700`, `--gold`, `--gold-soft` — 이후 모든 태스크가 이 값을 참조한다.
- Produces: `.section-heading::before` 골드 룰바 — 모든 섹션 헤딩에 공통 적용되므로 이후 태스크에서 별도 처리 불필요.

- [ ] **Step 1: `:root` 변수에 네이비/골드 토큰 추가**

`styles.css`의 기존 `:root` 블록(1~11번째 줄)을:

```css
:root {
  --bg: #f4f7fb;
  --surface: #ffffff;
  --primary: #0c5972;
  --primary-dark: #033d52;
  --accent: #1b98d1;
  --accent-soft: #e5f3fb;
  --text: #112d3f;
  --muted: #5f7686;
  --border: #dce6ef;
}
```

다음으로 교체한다:

```css
:root {
  --bg: #f4f7fb;
  --surface: #ffffff;
  --primary: #0c5972;
  --primary-dark: #033d52;
  --accent: #1b98d1;
  --accent-soft: #e5f3fb;
  --text: #112d3f;
  --muted: #5f7686;
  --border: #dce6ef;
  --navy-900: #0a1929;
  --navy-800: #0d2c47;
  --navy-700: #123a5c;
  --gold: #c9a227;
  --gold-dark: #8a6d13;
  --gold-soft: #f5ecd2;
}
```

- [ ] **Step 2: `h1`과 `.eyebrow` 타이포 스케일 확대**

`h1` 규칙(137~140번째 줄):

```css
h1 {
  font-size: clamp(2rem, 3.5vw, 3rem);
  margin: 0.2rem 0 1rem;
}
```

을 다음으로 교체:

```css
h1 {
  font-size: clamp(2.25rem, 4vw, 3.4rem);
  letter-spacing: -0.01em;
  margin: 0.2rem 0 1rem;
}
```

- [ ] **Step 3: 섹션 헤딩에 골드 룰바와 h2 스타일 추가**

`.section-heading` 규칙(287~289번째 줄):

```css
.section-heading {
  margin-bottom: 1.5rem;
}
```

을 다음으로 교체:

```css
.section-heading {
  margin-bottom: 1.5rem;
}

.section-heading::before {
  content: '';
  display: block;
  width: 46px;
  height: 3px;
  background: var(--gold);
  margin-bottom: 0.9rem;
}

.section-heading h2 {
  font-size: clamp(1.5rem, 2.4vw, 2.1rem);
  font-weight: 900;
  letter-spacing: -0.01em;
}
```

- [ ] **Step 4: 브라우저에서 확인**

Playwright MCP로 확인:
1. `mcp__playwright__browser_navigate`로 `file:///c:/Users/BAE/Desktop/드라이브/AI자동화/iahi_homepage/index.html` 열기
2. `mcp__playwright__browser_take_screenshot`로 전체 페이지 스크린샷

기대 결과: 각 섹션 제목(`h2`) 위에 짧은 골드색 가로줄이 보이고, 히어로 `h1` 글자 크기가 이전보다 커져 있다. 레이아웃이 깨지지 않아야 한다(카드 그리드, 네비게이션 정상).

- [ ] **Step 5: 커밋**

```bash
git add styles.css
git commit -m "style: add navy/gold design tokens and heading typography"
```

---

### Task 2: 히어로 섹션 — 실사진 + 네이비 팔레트 정리

**Files:**
- Modify: `index.html:64-72` (`.hero-card` 블록)
- Modify: `styles.css:110-114` (`.hero`), `styles.css:218-237` (`.hero-card`, `.hero-illustration`)

**Interfaces:**
- Consumes: Task 1의 `--navy-900/800/700` 변수
- Produces: 없음 (다른 태스크가 히어로 마크업/스타일에 의존하지 않음)

- [ ] **Step 1: 히어로 배경을 토큰 기반으로 정리**

`styles.css`의 `.hero` 규칙(110~114번째 줄):

```css
.hero {
  padding: 5.2rem 0 4.4rem;
  background: linear-gradient(180deg, #091b28 0%, #0d405f 48%, #13668c 100%);
  color: #fff;
}
```

을 다음으로 교체:

```css
.hero {
  padding: 5.6rem 0 4.6rem;
  background: linear-gradient(160deg, var(--navy-900) 0%, var(--navy-800) 55%, var(--navy-700) 100%);
  color: #fff;
}
```

- [ ] **Step 2: `index.html`의 히어로 일러스트를 실사진으로 교체**

`index.html`의 히어로 카드 블록(64~72번째 줄):

```html
          <div class="hero-card">
            <img class="hero-illustration" src="hero-image.svg" alt="협회 기관 이미지" />
            <h3>핵심 운영 영역</h3>
            <ul>
              <li>기업형 협회 운영과 전문 커리큘럼</li>
              <li>실무 기반 교육과 인증 프로세스</li>
              <li>회원 네트워크 중심의 지속 성장</li>
            </ul>
          </div>
```

을 다음으로 교체 (이미지를 감싸는 `.hero-illustration-wrap` 추가, `alt` 텍스트를 실사진에 맞게 수정):

```html
          <div class="hero-card">
            <div class="hero-illustration-wrap">
              <img
                class="hero-illustration"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
                alt="전문가들이 테이블에 모여 회의하는 모습"
                loading="lazy"
              />
            </div>
            <h3>핵심 운영 영역</h3>
            <ul>
              <li>기업형 협회 운영과 전문 커리큘럼</li>
              <li>실무 기반 교육과 인증 프로세스</li>
              <li>회원 네트워크 중심의 지속 성장</li>
            </ul>
          </div>
```

- [ ] **Step 3: 실사진에 네이비 듀오톤 오버레이 CSS 추가**

`styles.css`의 `.hero-card`, `.hero-illustration` 규칙(218~237번째 줄):

```css
.hero-card {
  padding: 1.8rem;
  min-height: 390px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-illustration {
  width: 100%;
  border-radius: 1rem;
  margin-bottom: 1.2rem;
  border: 1px solid rgba(16, 80, 112, 0.08);
}

.hero-card ul {
  padding-left: 1rem;
  margin: 0;
  color: var(--muted);
}

.hero-card h3 {
  margin-top: 0;
}
```

을 다음으로 교체:

```css
.hero-card {
  padding: 1.8rem;
  min-height: 390px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-illustration-wrap {
  position: relative;
  border-radius: 0.65rem;
  overflow: hidden;
  margin-bottom: 1.2rem;
  border: 1px solid rgba(16, 80, 112, 0.08);
}

.hero-illustration-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(10, 25, 41, 0.55) 0%, rgba(18, 58, 92, 0.15) 100%);
}

.hero-illustration {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  filter: saturate(0.9) contrast(1.05);
}

.hero-card ul {
  padding-left: 1rem;
  margin: 0;
  color: var(--muted);
}

.hero-card h3 {
  margin-top: 0;
}
```

- [ ] **Step 4: 브라우저에서 확인**

Playwright MCP로 확인:
1. `mcp__playwright__browser_navigate`로 `index.html` 새로고침(재탐색)
2. `mcp__playwright__browser_take_screenshot`로 히어로 섹션 스크린샷

기대 결과: 히어로 배경이 어두운 네이비 대각선 그라디언트이고, 우측 카드 안에 실제 회의 사진이 둥근 모서리로 표시되며 사진 위에 은은한 네이비 톤 오버레이가 덮여 있다. 이미지가 깨지지 않고 로드되어야 한다.

- [ ] **Step 5: 커밋**

```bash
git add index.html styles.css
git commit -m "feat: replace hero illustration with real photo and navy overlay"
```

---

### Task 3: 사례(`#cases`) 카드에 이미지 추가

**Files:**
- Modify: `script.js:70-83` (`caseStudies` 배열)
- Modify: `script.js:157-169` (`caseCards` 렌더 템플릿)
- Modify: `styles.css:166-186` (`.case-grid`, `.case-card`)

**Interfaces:**
- Consumes: 없음 (독립적인 컴포넌트)
- Produces: `caseStudies` 배열 항목에 `image` 필드 추가 — 이 필드명은 다른 태스크에서 참조되지 않는다.

- [ ] **Step 1: `caseStudies` 배열에 `image` 필드 추가**

`script.js`의 `caseStudies` 배열(70~83번째 줄):

```javascript
const caseStudies = [
  {
    title: '전문가 회의 기반 교육 기획',
    body: '협회 전문가들이 모여 실제 건강코치 현장을 분석하고 교육 커리큘럼을 설계하는 회의를 정기적으로 진행합니다.'
  },
  {
    title: '현장 적용형 교육 운영',
    body: '실제 사례 중심의 실습과 평가를 통해 교육생들이 전문 건강코치로서 현업에 바로 투입될 수 있도록 준비합니다.'
  },
  {
    title: '협회 실제 사례 공유',
    body: '회원 활동 사례와 인증 과정, 교육 성과를 협회 네트워크에서 공유하여 지속 가능한 성장 기반을 마련합니다.'
  }
];
```

을 다음으로 교체:

```javascript
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
```

- [ ] **Step 2: 렌더 템플릿에 이미지 태그 추가**

`script.js`의 `caseCards` 렌더 블록(157~169번째 줄):

```javascript
  const caseCards = document.getElementById('caseCards');
  if (caseCards) {
    caseCards.innerHTML = caseStudies
      .map(
        (item) => `
          <article class="case-card">
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          </article>
        `
      )
      .join('');
  }
```

을 다음으로 교체:

```javascript
  const caseCards = document.getElementById('caseCards');
  if (caseCards) {
    caseCards.innerHTML = caseStudies
      .map(
        (item) => `
          <article class="case-card">
            <img class="case-card-image" src="${item.image}" alt="${item.title}" loading="lazy" />
            <div class="case-card-body">
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </div>
          </article>
        `
      )
      .join('');
  }
```

- [ ] **Step 3: 카드에 이미지 썸네일 CSS 추가, radius 축소**

`styles.css`의 `.case-grid`, `.case-card` 규칙(166~186번째 줄):

```css
.case-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.case-card {
  padding: 1.6rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1.2rem;
  box-shadow: 0 14px 34px rgba(15, 122, 122, 0.06);
}

.case-card h3 {
  margin-top: 0;
}

.case-card p {
  color: var(--muted);
}
```

을 다음으로 교체:

```css
.case-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.case-card {
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  box-shadow: 0 10px 26px rgba(10, 25, 41, 0.07);
}

.case-card-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.case-card-body {
  padding: 1.4rem 1.6rem 1.6rem;
  border-top: 3px solid var(--gold);
}

.case-card h3 {
  margin-top: 0;
}

.case-card p {
  color: var(--muted);
}
```

- [ ] **Step 4: 브라우저에서 확인**

Playwright MCP로 확인:
1. `mcp__playwright__browser_navigate`로 `index.html` 재탐색
2. `#cases` 섹션까지 스크롤 후 `mcp__playwright__browser_take_screenshot`

기대 결과: "실제 사례" 섹션의 카드 3개 각각 상단에 실사진 썸네일이 보이고, 사진 아래 골드색 얇은 구분선과 함께 제목/본문이 표시된다.

- [ ] **Step 5: 커밋**

```bash
git add script.js styles.css
git commit -m "feat: add stock photo thumbnails to case study cards"
```

---

### Task 4: 카드·뱃지 프리미엄 폴리시 (골드 포인트, radius 통일)

**Files:**
- Modify: `styles.css:211-216` (`.hero-card, .card, .contact-box, .info-strip` 공통 규칙)
- Modify: `styles.css:271-285` (`.feature-card`)
- Modify: `styles.css:344-353` (`.product-badge`)
- Modify: `styles.css:355-373` (`.pill-list`, `.pill-item`)

**Interfaces:**
- Consumes: Task 1의 `--gold`, `--gold-dark`, `--gold-soft` 변수
- Produces: 없음 (최종 시각 폴리시 태스크)

- [ ] **Step 1: 공통 카드 radius/shadow를 프리미엄 톤으로 축소**

`styles.css`의 공통 카드 규칙(211~216번째 줄):

```css
.hero-card, .card, .contact-box, .info-strip {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(20, 102, 66, 0.08);
}
```

을 다음으로 교체:

```css
.hero-card, .card, .contact-box, .info-strip {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  box-shadow: 0 10px 26px rgba(10, 25, 41, 0.07);
}
```

- [ ] **Step 2: `.feature-card` radius/shadow 통일 및 상단 골드 라인 추가**

`styles.css`의 `.feature-card` 규칙(271~277번째 줄):

```css
.feature-card {
  padding: 1.4rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  box-shadow: 0 12px 28px rgba(15, 122, 122, 0.08);
}
```

을 다음으로 교체:

```css
.feature-card {
  padding: 1.4rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 3px solid var(--gold);
  border-radius: 0.75rem;
  box-shadow: 0 10px 24px rgba(10, 25, 41, 0.06);
}
```

- [ ] **Step 3: `.product-badge` 색상을 골드 톤으로 변경**

`styles.css`의 `.product-badge` 규칙(344~353번째 줄):

```css
.product-badge {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: rgba(27, 152, 209, 0.12);
  color: var(--primary-dark);
  font-size: 0.82rem;
  font-weight: 700;
}
```

을 다음으로 교체:

```css
.product-badge {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: var(--gold-soft);
  color: var(--gold-dark);
  font-size: 0.82rem;
  font-weight: 700;
}
```

- [ ] **Step 4: `.pill-item`에 골드 좌측 보더 추가, radius 통일**

`styles.css`의 `.pill-list`, `.pill-item` 규칙(355~373번째 줄):

```css
.pill-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.pill-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.15rem 1.2rem;
  box-shadow: 0 8px 20px rgba(20, 102, 66, 0.05);
}

.pill-item strong {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--primary-dark);
}
```

을 다음으로 교체:

```css
.pill-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.pill-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--gold);
  border-radius: 0.65rem;
  padding: 1.15rem 1.2rem;
  box-shadow: 0 8px 18px rgba(10, 25, 41, 0.05);
}

.pill-item strong {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--primary-dark);
}
```

- [ ] **Step 5: 브라우저에서 확인**

Playwright MCP로 확인:
1. `mcp__playwright__browser_navigate`로 `index.html` 재탐색
2. `#program`, 강점, `#certification` 섹션까지 각각 스크롤 후 스크린샷

기대 결과: 교육상품 카드의 뱃지("입문"/"실무"/"전문")가 골드 톤 배경으로 보이고, 강점 카드 상단에 얇은 골드 라인이, 인증 섹션 pill 카드 좌측에 골드 보더가 보인다. 카드 모서리가 이전보다 각지게(덜 둥글게) 바뀌어야 한다.

- [ ] **Step 6: 커밋**

```bash
git add styles.css
git commit -m "style: apply gold accents and unify card radius across sections"
```

---

### Task 5: 전체 반응형 검증 및 배포

**Files:**
- 없음 (검증 전용 태스크, 코드 변경 없음)

**Interfaces:**
- Consumes: Task 1~4의 모든 변경사항

- [ ] **Step 1: 데스크톱 뷰포트 전체 페이지 검증 + 앵커 링크 동작 확인**

Playwright MCP:
1. `mcp__playwright__browser_resize`로 1280x900 설정
2. `mcp__playwright__browser_navigate`로 `index.html` 열기
3. `mcp__playwright__browser_take_screenshot` (fullPage 옵션으로 전체 페이지)
4. `mcp__playwright__browser_click`으로 상단 네비게이션의 "교육"(`#program`) 링크 클릭 후 `mcp__playwright__browser_snapshot`으로 해당 섹션이 뷰포트에 들어왔는지 확인
5. 같은 방식으로 "문의"(`#contact`) 링크도 클릭해 확인

기대 결과: 헤더부터 푸터까지 8개 섹션이 모두 정상 렌더링되고, 히어로/사례 섹션 이미지가 깨지지 않으며, 골드 포인트가 카드 전반에 일관되게 보인다. 네비게이션 앵커 클릭 시 해당 섹션으로 정상 스크롤된다.

- [ ] **Step 2: 태블릿 뷰포트(860px) 검증**

Playwright MCP:
1. `mcp__playwright__browser_resize`로 820x1000 설정 (860px 브레이크포인트 아래)
2. `mcp__playwright__browser_take_screenshot`

기대 결과: `.hero-grid`, `.grid-2`, `.card-grid`, `.pill-list`, `.feature-grid`, `.case-grid`가 1열로 스택되고, `.contact-box`, `.info-strip`이 세로 정렬된다.

- [ ] **Step 3: 모바일 뷰포트(375px) 검증**

Playwright MCP:
1. `mcp__playwright__browser_resize`로 375x812 설정
2. `mcp__playwright__browser_take_screenshot`
3. `mcp__playwright__browser_click`으로 `.menu-toggle` 클릭 후 다시 스크린샷

기대 결과: 햄버거 메뉴 버튼이 나타나고, 클릭 시 `.site-nav.open`이 펼쳐진다. 히어로 실사진과 사례 카드 이미지가 좁은 화면에서도 비율 깨짐 없이 보인다.

- [ ] **Step 4: GitHub에 푸시**

```bash
git push origin main
```

Vercel이 자동으로 재배포한다. 사용자에게 배포 URL(`https://iahihomepage-psi.vercel.app`)에서 최종 확인을 요청한다.
