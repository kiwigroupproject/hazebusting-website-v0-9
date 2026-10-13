const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '..');

const I = (d, s = 24) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ic = {
  users: I('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.5a3.5 3.5 0 010 7M18 14.3c2.2.7 3.5 2.6 3.5 5.7"/>'),
  money: I('<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.7"/><path d="M6 9.5v.01M18 14.5v.01"/>'),
  shield: I('<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'),
  doc: I('<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'),
  chart: I('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  heart: I('<path d="M12 20s-8-4.6-8-10.5A4.5 4.5 0 0112 7a4.5 4.5 0 018 2.5C20 15.4 12 20 12 20z"/>'),
  target: I('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
  cap: I('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6"/>'),
  scale: I('<path d="M12 3v18M5 21h14M5 7h14"/><path d="M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z"/>'),
  search: I('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),
  phone: I('<path d="M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z"/>'),
  mail: I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
  pin: I('<path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  wa: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11 11 0 003.3 17.3L2 22l4.8-1.3A11 11 0 0020.5 3.5zM12 20.2a9 9 0 01-4.6-1.3l-.3-.2-2.8.8.8-2.7-.2-.3a9 9 0 1117 -4.9 9 9 0 01-9.9 8.6zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6 0a7.3 7.3 0 01-3.6-3.1c-.3-.5.3-.5.8-1.5a.5.5 0 000-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.900 11.900 0 004.600 4.100c1.700.700 2.400.800 3.200.700a2.700 2.700 0 001.800-1.300 2.200 2.200 0 00.2-1.300c-.1-.1-.3-.2-.6-.3z"/></svg>',
  fb: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6.5c0-.7.2-1 1.200-1H17V2h-2.600C11.300 2 10 3.700 10 6.200V8H8v3.500h2V22h4V11.500h2.700L17 8z"/></svg>',
  li: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.500 9H8v12H4.500zM6.200 3.500a2 2 0 110 4 2 2 0 010-4zM10 9h3.300v1.700c.5-.9 1.700-2 3.600-2 3.700 0 4.100 2.400 4.100 5.600V21h-3.500v-6c0-1.400 0-3.200-2-3.200s-2.200 1.500-2.200 3.100V21H10z"/></svg>',
  ig: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.500" cy="6.500" r=".5" fill="currentColor"/></svg>',
  yt: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.600 7.200a2.500 2.500 0 00-1.800-1.800C18.200 5 12 5 12 5s-6.200 0-7.800.4A2.500 2.500 0 002.400 7.200C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 001.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 001.800-1.800c.4-1.600.4-4.800.4-4.800s0-3.200-.4-4.800zM10 15V9l5.200 3z"/></svg>',
  flip: I('<path d="M3 12a9 9 0 0115.5-6.3L21 8M21 3v5h-5M21 12a9 9 0 01-15.5 6.3L3 16M3 21v-5h5"/>', 16),
  arrow: I('<path d="M5 12h14M13 5l7 7-7 7"/>', 18),
};

const arrow = ic.arrow.replace('<svg', '<svg class="arrow"');
const phoneSm = ic.phone.replace(/width="24" height="24"/, 'width="18" height="18"');
const TEL = 'tel:+919503860095';
const nav = [['index.html', 'Home'], ['about.html', 'About Us'], ['hr-services.html', 'HR Services'], ['other-services.html', 'Other Services'], ['contact.html', 'Contact Us']];
const logoImg = '<img src="assets/logo.png" alt="Haze-Busting Global Services" width="203" height="105">';

const head = (title, desc, file) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#5b1db0">
<link rel="icon" href="assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script>document.documentElement.classList.add('js')</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"ProfessionalService","name":"Haze Busting Global Services","url":"https://hazebusting.com/","telephone":"+91 9503860095","email":"sunil@hazebusting.com","foundingDate":"2012-10-04","address":{"@type":"PostalAddress","streetAddress":"SRPF Road, Ramtekadi, Hadapsar","addressLocality":"Pune","addressRegion":"Maharashtra","postalCode":"411013","addressCountry":"IN"}}</script>
</head>
<body>
<div class="progress"></div>
<nav class="nav" aria-label="Main">
  <div class="container nav-inner">
    <a class="brand" href="index.html" aria-label="Haze-Busting Global Services — home">${logoImg}</a>
    <div class="nav-links">${nav.map(([h, t]) => `<a href="${h}"${h === file ? ' class="active" aria-current="page"' : ''}>${t}</a>`).join('')}</div>
    <a href="${TEL}" class="btn btn-gold nav-cta">${phoneSm} Call Now</a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="drawer" aria-label="Open menu">
      <svg class="icon-menu" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
      <svg class="icon-close" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>
    </button>
  </div>
</nav>
<div class="drawer" id="drawer">
  ${nav.map(([h, t], i) => `<a href="${h}"><span>0${i + 1}</span>${t}</a>`).join('\n  ')}
  <div class="drawer-cta"><a href="${TEL}" class="btn btn-gold">${phoneSm} Call Now</a><a href="https://wa.me/919503860095" class="btn btn-outline-light" target="_blank" rel="noopener">WhatsApp us</a></div>
</div>
<main>`;

const foot = `</main>
<footer class="footer"><div class="container">
  <div class="footer-grid">
    <div><a class="brand" href="index.html" aria-label="Haze-Busting Global Services — home">${logoImg}</a>
      <p class="footer-about">Finding, Connecting, Building Success. A trusted HR partner to businesses across Pune and India since 2012.</p>
      <div class="socials">
        <a href="https://www.facebook.com/profile.php?id=100063641512581" target="_blank" rel="noopener" aria-label="Facebook">${ic.fb}</a>
        <a href="https://www.linkedin.com/company/hazebusting-consultancy-services" target="_blank" rel="noopener" aria-label="LinkedIn">${ic.li}</a>
        <a href="https://www.instagram.com/hazebustingconsultancy/" target="_blank" rel="noopener" aria-label="Instagram">${ic.ig}</a>
        <a href="https://www.youtube.com/@hazebustingconsultancy" target="_blank" rel="noopener" aria-label="YouTube">${ic.yt}</a>
      </div></div>
    <div class="footer-col"><h4>Explore</h4><ul>${nav.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
    <div class="footer-col"><h4>Other Services</h4><ul><li><a href="other-services.html#recruitment">Recruitment</a></li><li><a href="other-services.html#certification">HR Certification Course</a></li></ul></div>
    <div class="footer-col"><h4>Visit &amp; Call</h4><ul><li><a href="https://maps.google.com/?q=SRPF+Road+Ramtekadi+Hadapsar+Pune+411013" target="_blank" rel="noopener">SRPF Road, Ramtekadi, Hadapsar,<br>Pune, Maharashtra 411013</a></li><li><a href="${TEL}">+91 95038 60095</a></li><li><a href="tel:+919923108516">+91 99231 08516</a></li><li><a href="mailto:sunil@hazebusting.com">sunil@hazebusting.com</a></li></ul></div>
  </div>
  <div class="footer-base"><span>© <span class="yr"></span> Haze-Busting Global Services. All rights reserved.</span><span>Mon – Sat · 9 AM – 8 PM</span></div>
</div></footer>
<div class="fab"><a class="wa" href="https://wa.me/919503860095" target="_blank" rel="noopener" aria-label="WhatsApp us">${ic.wa}</a><a class="ph" href="${TEL}" aria-label="Call us">${ic.phone}</a></div>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"></script>
<script src="js/main.js"></script>
</body></html>`;

const fxu = (d = 0) => `fx fx-up" data-fx-delay="${d}`;
const hero = (kicker, h1, sub, ctaHtml, img, extra = '', cls = '') => `
<section class="hero ${cls}">
  <div class="hero-bg"><img src="assets/img/${img}.jpg" alt="" data-parallax fetchpriority="high"></div>
  <div class="container hero-content">
    ${extra}<div class="hero-kicker fx fx-down">${kicker}</div>
    <h1 class="${fxu(.1)}">${h1}</h1>
    <p class="hero-sub ${fxu(.2)}">${sub}</p>
    ${ctaHtml ? `<div class="hero-cta ${fxu(.3)}">${ctaHtml}</div>` : ''}
  </div>
  __STATS__
</section>`;
const pageHero = (crumb, h1, sub, img) => hero('Haze-Busting · Pune', h1, sub, '', img, `<div class="crumbs fx fx-down"><a href="index.html">Home</a> &nbsp;/&nbsp; ${crumb}</div>`, 'page-hero').replace('__STATS__', '');

const cta = `<section class="cta-band"><div class="container cta-inner">
  <div class="fx fx-left"><h2>Ready to clear the <em>haze</em>?</h2><p>Talk to our HR team today — available Monday to Saturday, 9 AM to 8 PM.</p></div>
  <div class="cta-actions fx fx-right"><a href="${TEL}" class="btn btn-gold">${phoneSm} Call Now</a><a href="https://wa.me/919503860095" target="_blank" rel="noopener" class="btn btn-outline-light">WhatsApp us</a></div>
</div></section>`;

const card = (i, t, p, n, d = 0) => `<article class="card fx fx-up" data-fx-delay="${d}"><span class="num">${String(n).padStart(2, '0')}</span><div class="ic">${ic[i]}</div><h3>${t}</h3><p>${p}</p></article>`;
const flip = (n, img, i, t, p, pts, d = 0) => `<div class="flip fx fx-up" data-fx-delay="${d}" tabindex="0" aria-label="${t} — flip for details"><div class="flip-inner"><div class="flip-face flip-front"><img src="assets/img/${img}.jpg" alt="" loading="lazy"><span class="flip-num">0${n}</span><span class="flip-hint">${ic.flip}<em class="h-mouse">Hover</em><em class="h-touch">Tap</em></span><span class="t-ic">${ic[i]}</span><h3>${t}</h3><span class="gold-rule"></span></div><div class="flip-face flip-back"><span class="flip-num">0${n}</span><span class="t-ic">${ic[i]}</span><h3>${t}</h3><p>${p}</p><ul>${pts.map(x => `<li>${x}</li>`).join('')}</ul><a class="flip-link" href="hr-services.html">Explore service ${arrow}</a></div></div></div>`;
const faq = items => `<div class="faq-list">${items.map(([q, a], i) => `<div class="faq-item fx fx-up" data-fx-delay="${i * .08}"><button class="faq-q" aria-expanded="false">${q}<span class="faq-icon"></span></button><div class="faq-a"><div><p>${a}</p></div></div></div>`).join('')}</div>`;
const industries = ['Manufacturing', 'Telecom Technology', 'Real Estate', 'IT — Hardware & Software', 'Automobile', 'Hospitality & Tourism', 'Agriculture', 'Pharmaceutical & Veterinary', 'Media & Entertainment', 'Food Industries', 'FMCG', 'Automation'];
const ticker = `<div class="ticker" aria-label="Industries we serve"><div class="ticker-track">${[0, 1].map(() => industries.map(i => `<span>${i}</span>`).join('')).join('')}</div></div>`;
const yrs = new Date().getFullYear() - 2012;
const faqHome = [
  ['Can you handle HR for a small company?', 'Yes. Many of our clients are growing SMEs that do not yet need a full-time HR team. We scale the engagement to your headcount.'],
  ['Do you offer one-time projects as well as ongoing support?', 'Both. Engage us for a single project — like an HR manual or audit — or for continuous HR outsourcing.'],
  ['Is our company information kept confidential?', 'Always. Confidentiality is core to how we work with every employer and employee.'],
  ['How quickly can we get started?', 'Call us and we will scope your needs in the very first conversation.'],
];

const pages = {};

/* ---------- HOME ---------- */
pages['index.html'] = head('Haze-Busting Global Services | HR Services in Pune', 'Haze-Busting Global Services — end-to-end HR services for growing businesses. Policies, payroll, compliance, performance and HR outsourcing. Hadapsar, Pune since 2012.', 'index.html') +
  hero('HR Consultancy · Pune', 'We clear the <em>haze</em><br>from your HR.', 'Finding, Connecting, Building Success. Practical, compliant and discreet HR services that keep your people, policies and payroll in perfect clarity — so you can focus on growing the business.',
    `<a href="hr-services.html" class="btn btn-gold">View HR Services ${arrow}</a><a href="${TEL}" class="btn btn-outline-light">${phoneSm} +91 95038 60095</a>`, 'highfive', '', 'hero-bright')
    .replace('__STATS__', `<div class="hero-stats"><div class="container hero-stats-inner">
      <div class="hstat"><b data-count="${yrs}" data-suffix="+">0</b><span>Years of experience</span></div>
      <div class="hstat"><b data-count="12">0</b><span>Industries served</span></div>
      <div class="hstat"><b data-count="12">0</b><span>HR services offered</span></div>
      <div class="hstat"><b data-count="24" data-suffix="×7">0</b><span>Support mindset</span></div>
    </div></div>`) + ticker + `

<section class="services"><div class="container">
  <div class="section-head center"><div class="eyebrow center fx fx-down">HR Services</div><h2 class="${fxu(.1)}">Complete HR <em>solutions</em> for your business</h2><p class="${fxu(.2)}">From the first policy to the final settlement — one accountable HR partner for the entire employee lifecycle.</p></div>
  <div class="tiles">
    ${flip(1, 'team-office', 'users', 'HR Outsourcing', 'A dedicated HR team on tap — on-site or remote — at a fraction of the cost of building a department.', ['Dedicated HR executive or team', 'On-site or remote working', 'Scales with your headcount'], 0)}
    ${flip(2, 'documents', 'doc', 'Policy & Documentation', 'Handbooks, appointment letters and SOPs drafted to fit your culture and the law.', ['HR manuals & handbooks', 'Appointment & confirmation letters', 'SOPs and templates'], .12)}
    ${flip(3, 'payroll', 'money', 'Payroll Processing', 'Accurate, on-time payroll with statutory deductions fully handled.', ['Monthly salary & payslips', 'Statutory deductions', 'F&F settlements'], .24)}
    ${flip(4, 'interview', 'shield', 'Statutory Compliance', 'PF, ESIC, PT, gratuity and labour-law compliance without surprises.', ['PF, ESIC & Professional Tax', 'Gratuity & Bonus', 'Registrations & returns'], 0)}
    ${flip(5, 'analytics', 'chart', 'Performance & Analytics', 'KRA/KPI frameworks, appraisal cycles and MIS reports that drive real results.', ['KRA / KPI & appraisal design', 'Competency mapping', 'HR MIS dashboards'], .12)}
    ${flip(6, 'training', 'heart', 'Engagement & Retention', 'Programs and feedback systems that lift morale and cut attrition.', ['Surveys & feedback loops', 'Recognition programs', 'Culture-building'], .24)}
  </div>
  <div style="text-align:center;margin-top:5rem" class="${fxu()}"><a href="hr-services.html" class="btn btn-dark">See all 12 HR services ${arrow}</a></div>
</div></section>

<section class="why on-dark"><div class="why-bg"><img src="assets/img/team-office.jpg" alt="" data-parallax loading="lazy"></div>
  <div class="container why-grid">
    <div class="why-sticky"><div class="eyebrow fx fx-down">Why Haze-Busting</div>
      <div class="section-head"><h2 class="${fxu(.1)}">HR that works like <em>part of your team</em></h2></div>
      <p class="${fxu(.2)}">You get senior HR expertise without the overhead of a full department — and a partner who stays until the job is truly done.</p>
      <a href="${TEL}" class="btn btn-gold ${fxu(.3)}">${phoneSm} Call Now</a></div>
    <div class="why-list">
      <div class="why-item ${fxu(0)}"><h3>Right fit, always</h3><p>Solutions matched closely to your real requirement — never copy-paste templates.</p></div>
      <div class="why-item ${fxu(.1)}"><h3>Strict confidentiality</h3><p>Every conversation, employee record and company detail is handled with discretion.</p></div>
      <div class="why-item ${fxu(.2)}"><h3>Compliance-first</h3><p>Experienced professionals who understand Indian labour law and keep you audit-ready.</p></div>
      <div class="why-item ${fxu(.3)}"><h3>24×7 support mindset</h3><p>Timely, quality delivery and a team that stays reachable when you need us.</p></div>
    </div>
  </div></section>

<section class="bg-paper"><div class="container split">
  <div class="frame fx fx-left"><div class="img-reveal"><img src="assets/sunil-mali.jpg" alt="Sunil B. Mali, founder of Haze-Busting Global Services" loading="lazy" width="1024" height="684"></div></div>
  <div class="about-copy"><div class="eyebrow fx fx-down">About us</div>
    <h2 class="${fxu(.1)}">Fourteen years of <em>practical HR</em></h2>
    <p class="${fxu(.2)}">Haze-Busting Global Services was founded on 4 October 2012 by <b>Sunil B. Mali</b> — an HR professional with hands-on experience at Star Mech Controls India Pvt. Ltd. and Japfa Comfeed India Pvt. Ltd.</p>
    <p class="${fxu(.25)}">What began as a staffing consultancy has grown into a full HR practice, trusted by businesses across twelve industries.</p>
    <div class="quals ${fxu(.3)}"><span>MBA – HR</span><span>MPM – HR</span><span>LLB</span><span>Diploma in Journalism</span></div>
    <a href="about.html" class="btn btn-outline ${fxu(.35)}">Our story ${arrow}</a></div>
</div></section>

<section><div class="container">
  <div class="section-head center"><div class="eyebrow center fx fx-down">How we work</div><h2 class="${fxu(.1)}">A clear, <em>five-step</em> process</h2></div>
  <div class="steps">
    <div class="step ${fxu(0)}"><h3>Understand</h3><p>We study your requirement in full.</p></div>
    <div class="step ${fxu(.1)}"><h3>Plan &amp; Build</h3><p>We design the right solution for you.</p></div>
    <div class="step ${fxu(.2)}"><h3>Evaluate</h3><p>Careful, confidential review at every step.</p></div>
    <div class="step ${fxu(.3)}"><h3>Deliver</h3><p>We present results for your decision.</p></div>
    <div class="step ${fxu(.4)}"><h3>Follow up</h3><p>We stay until the job is truly done.</p></div>
  </div>
</div></section>

<section class="bg-paper"><div class="container">
  <div class="section-head center"><div class="eyebrow center fx fx-down">Client stories</div><h2 class="${fxu(.1)}">Trusted by <em>HR leaders</em></h2></div>
  <div class="testi">
    <figure class="quote ${fxu(0)}"><q>Very professional and fast end-to-end service. They supplied most of the candidates we ended up hiring.</q><cite><span class="av">S</span><span>Sudhir<small>Assistant Manager, HR &amp; Admin</small></span></cite></figure>
    <figure class="quote ${fxu(.1)}"><q>Highly professional, with a good database — and they helped us set up competence mapping.</q><cite><span class="av">R</span><span>Rakesh S.<small>Senior HR</small></span></cite></figure>
    <figure class="quote ${fxu(.2)}"><q>Excellent hires, found quickly. Suitable people turned up in only a few resumes.</q><cite><span class="av">K</span><span>Kavita D.<small>HR</small></span></cite></figure>
  </div>
</div></section>

<section><div class="container">
  <div class="section-head center"><div class="eyebrow center fx fx-down">Good to know</div><h2 class="${fxu(.1)}">Frequently asked <em>questions</em></h2></div>
  ${faq(faqHome)}
</div></section>
${cta}` + foot;

/* ---------- ABOUT ---------- */
pages['about.html'] = head('About Us | Haze-Busting Global Services', 'Founded in 2012 by Sunil B. Mali, Haze-Busting Global Services is a trusted HR partner in Pune.', 'about.html') +
  pageHero('About Us', 'Clarity in HR,<br><em>since 2012</em>', 'A Pune-based HR consultancy built on one idea: good people practices should be simple, fair and practical.', 'team-office') + `
<section><div class="container split">
  <div class="frame fx fx-left"><div class="img-reveal"><img src="assets/sunil-mali.jpg" alt="Sunil B. Mali, founder of Haze-Busting Global Services" width="1024" height="684"></div><div class="namecard"><b>Sunil B. Mali</b><span>Founder · Since 2012</span></div></div>
  <div class="about-copy"><div class="eyebrow fx fx-down">Our founder</div>
    <h2 class="${fxu(.1)}">Sunil B. <em>Mali</em></h2>
    <p class="${fxu(.2)}">Haze-Busting was founded on 4 October 2012 by Sunil B. Mali, who brought hands-on HR experience from Star Mech Controls India Pvt. Ltd. and Japfa Comfeed India Pvt. Ltd.</p>
    <p class="${fxu(.25)}">What began as a staffing consultancy grew into a full HR practice — adding HR Services and HR Certification Courses along the way.</p>
    <div class="quals ${fxu(.3)}"><span>MBA – HR</span><span>MPM – HR</span><span>LLB</span><span>Diploma in Journalism</span></div>
    <a href="${TEL}" class="btn btn-gold ${fxu(.35)}">${phoneSm} Speak to Sunil</a></div>
</div></section>

<section class="bg-dark on-dark"><div class="container">
  <div class="section-head center"><div class="eyebrow center fx fx-down">Direction</div><h2 class="${fxu(.1)}">Our vision &amp; <em>mission</em></h2></div>
  <div class="cards two">
    <article class="card dark fx fx-up"><div class="ic">${ic.target}</div><h3>Our Vision</h3><p>To become a valued staffing and HR consultant across India, delivering timely, quality service with 24×7 support — while continuously improving and innovating to raise the standard of what we deliver.</p></article>
    <article class="card dark fx fx-up" data-fx-delay=".1"><div class="ic">${ic.heart}</div><h3>Our Mission</h3><p>To help clients with recruitment and high-quality manpower staffing, understand their needs deeply, and keep them informed about current market conditions.</p></article>
  </div>
</div></section>

<section><div class="container">
  <div class="section-head center"><div class="eyebrow center fx fx-down">Journey</div><h2 class="${fxu(.1)}">How we've <em>grown</em></h2></div>
  <div class="timeline">
    <div class="tl-item ${fxu(0)}"><b>2012</b><p>Haze-Busting Global Services is founded in Pune on 4 October, focused on recruitment.</p></div>
    <div class="tl-item ${fxu(.05)}"><b>Growth</b><p>HR Services added — policy, payroll, compliance and outsourced HR for growing businesses.</p></div>
    <div class="tl-item ${fxu(.05)}"><b>Academy</b><p>HR Certification Course launched with online and offline batches and lifetime placement support.</p></div>
    <div class="tl-item ${fxu(.05)}"><b>Today</b><p>Serving 12 industries as a three-vertical HR partner for businesses and professionals.</p></div>
  </div>
</div></section>

<section class="bg-paper"><div class="container">
  <div class="section-head center"><div class="eyebrow center fx fx-down">Our values</div><h2 class="${fxu(.1)}">What guides <em>every engagement</em></h2></div>
  <div class="cards">
    ${card('target', 'Right fit, always', 'We add value by matching people and solutions closely to your real requirement.', 1, 0)}
    ${card('shield', 'Confidentiality', 'Every conversation, candidate and company detail is handled with discretion.', 2, .1)}
    ${card('chart', 'Effectiveness', 'We improve outcomes through well-suited referrals and relevant market information.', 3, .2)}
  </div>
</div></section>
${cta}` + foot;

/* ---------- HR SERVICES ---------- */
const svc = [
  ['core', 'doc', 'HR Policy & Documentation', 'Employee handbooks, HR manuals, appointment and confirmation letters, SOPs and templates.'],
  ['core', 'money', 'Payroll Processing', 'Monthly salary processing, payslips, reimbursements, F&F settlements and reports.'],
  ['core', 'users', 'HR Outsourcing', 'A dedicated HR executive or team working with you on-site or remotely.'],
  ['core', 'users', 'Onboarding & Induction', 'Joining formalities, documentation, background verification and induction programs.'],
  ['core', 'doc', 'Exit & Separation Management', 'Resignation handling, exit interviews, full & final settlement and relieving documentation.'],
  ['comp', 'shield', 'Statutory Compliance', 'PF, ESIC, Professional Tax, Gratuity, Bonus and labour law registrations and returns.'],
  ['comp', 'scale', 'HR Audit & Risk Review', 'A diagnostic of your HR practices with a clear, prioritised action plan.'],
  ['comp', 'scale', 'Employee Relations', 'Disciplinary processes, domestic inquiries, POSH setup and grievance handling.'],
  ['talent', 'chart', 'Performance Management', 'KRA/KPI design, appraisal cycles, competency mapping and review systems.'],
  ['talent', 'heart', 'Engagement & Retention', 'Surveys, recognition programs and culture-building that reduce attrition.'],
  ['talent', 'chart', 'HR Analytics & MIS Reports', 'Headcount, attrition and cost dashboards that turn HR data into decisions.'],
  ['talent', 'cap', 'Training & Development', 'Soft-skill, leadership and HR-function workshops for your teams.'],
];
const svcCard = (s, k) => `<a class="svc fx fx-up" data-fx-delay="${(k % 3) * .1}" href="contact.html" style="--i:${k}"><span class="svc-n">${String(k + 1).padStart(2, '0')}</span><div class="svc-ic">${ic[s[1]]}</div><h3>${s[2]}</h3><p>${s[3]}</p><span class="svc-more">Enquire ${arrow}</span></a>`;
const cats = [['all', 'All Services', svc.length], ['core', 'Core HR', svc.filter(s => s[0] === 'core').length], ['comp', 'Compliance', svc.filter(s => s[0] === 'comp').length], ['talent', 'Talent & Culture', svc.filter(s => s[0] === 'talent').length]];
const life = [['Hire', 'Recruitment support'], ['Onboard', 'Induction & documents'], ['Pay', 'Payroll & benefits'], ['Comply', 'Statutory compliance'], ['Perform', 'KRA / KPI & appraisals'], ['Engage', 'Retention & culture'], ['Exit', 'F&F & separation']];
const models = [
  ['Project-based', 'One-time engagement', ['HR manuals, policies & templates', 'HR audit & risk review', 'KRA / KPI & appraisal design', 'Fixed scope, clear deliverables'], false],
  ['Monthly Support', 'Ongoing HR partner', ['Payroll & statutory compliance', 'Employee relations & documentation', 'MIS reports every month', 'A named HR contact for your team'], true],
  ['Full HR Outsourcing', 'Your HR department, on call', ['Dedicated HR executive or team', 'On-site or remote working', 'End-to-end employee lifecycle', 'Scales with your headcount'], false],
];
pages['hr-services.html'] = head('HR Services | Payroll, Compliance, Policies & HR Outsourcing | Haze-Busting', 'End-to-end HR services in Pune — policies, payroll, statutory compliance, performance management, engagement and HR outsourcing.', 'hr-services.html') +
  pageHero('HR Services', 'Your complete <em>HR department</em>, on call', 'Our core practice. A team of seasoned HR professionals handling the people side of your business — accurately, compliantly and discreetly.', 'interview') + `
<section class="explorer"><div class="container">
  <div class="section-head center"><div class="eyebrow center fx fx-down">What we do</div><h2 class="${fxu(.1)}">Twelve services. <em>One accountable</em> partner.</h2><p class="${fxu(.2)}">Choose a focus area to explore — every service is delivered by the same team that knows your business.</p></div>
  <div class="cat-row" data-tabs role="tablist">
    ${cats.map((c, i) => `<button class="cat fx fx-up${i ? '' : ' active'}" data-fx-delay="${i * .08}" data-tab="${c[0]}" role="tab"><span class="cat-n">0${i + 1}</span><b>${c[1]}</b><small>${String(c[2]).padStart(2, '0')} services</small></button>`).join('')}
  </div>
  <div>${['all', 'core', 'comp', 'talent'].map((g, n) => `<div class="panel${n ? '' : ' active'}" data-panel="${g}"><div class="cards">${svc.filter(s => g === 'all' || s[0] === g).map((s, k) => svcCard(s, k)).join('')}</div></div>`).join('')}</div>
</div></section>

<section class="lifecycle bg-dark on-dark"><div class="container">
  <div class="section-head center"><div class="eyebrow center fx fx-down">Employee lifecycle</div><h2 class="${fxu(.1)}">We cover every stage, <em>from hire to exit</em></h2><p class="${fxu(.2)}">One partner across the whole journey — so nothing falls between the cracks.</p></div>
  <ol class="life fx" aria-label="Employee lifecycle">
    <span class="life-fill" aria-hidden="true"></span>
    ${life.map((l, i) => `<li style="--i:${i}"><span class="dot">0${i + 1}</span><b>${l[0]}</b><small>${l[1]}</small></li>`).join('')}
  </ol>
</div></section>

<section><div class="container">
  <div class="section-head center"><div class="eyebrow center fx fx-down">Engagement models</div><h2 class="${fxu(.1)}">Work with us <em>the way that suits you</em></h2></div>
  <div class="models">
    ${models.map((m, i) => `<article class="model fx fx-up${m[3] ? ' featured' : ''}" data-fx-delay="${i * .12}">${m[3] ? '<span class="model-tag">Recommended</span>' : ''}<small>${m[1]}</small><h3>${m[0]}</h3><ul>${m[2].map(x => `<li>${x}</li>`).join('')}</ul><a href="${TEL}" class="btn ${m[3] ? 'btn-gold' : 'btn-outline'}">${phoneSm} Discuss this model</a></article>`).join('')}
  </div>
</div></section>

<section class="bg-paper"><div class="container split">
  <div class="about-copy"><div class="eyebrow fx fx-down">Why Haze-Busting</div>
    <h2 class="${fxu(.1)}">HR that works <em>like part of your team</em></h2>
    <p class="${fxu(.2)}">You get senior HR expertise without the overhead of building a department.</p>
    <ul class="checks ${fxu(.25)}"><li><span><b>Experienced professionals</b> who understand Indian labour law</span></li><li><span><b>Practical, tailor-made systems</b> — not copy-paste templates</span></li><li><span><b>Strict confidentiality</b> in every engagement</span></li><li><span><b>Responsive, 24×7</b> support mindset</span></li></ul>
    <a href="${TEL}" class="btn btn-gold ${fxu(.3)}">${phoneSm} Talk to an HR expert</a></div>
  <div class="photo fx fx-right"><div class="img-reveal"><img src="assets/img/team-office.jpg" alt="Team collaborating in a modern office" loading="lazy"></div></div>
</div></section>

<section><div class="container">
  <div class="section-head center"><div class="eyebrow center fx fx-down">FAQ</div><h2 class="${fxu(.1)}">Common <em>questions</em></h2></div>
  ${faq(faqHome)}
</div></section>
${cta}` + foot;

/* ---------- OTHER SERVICES ---------- */
pages['other-services.html'] = head('Other Services | Recruitment & HR Certification Course | Haze-Busting', 'Recruitment services and a 3-month HR Certification Course with lifetime placement support from Haze-Busting Global Services, Pune.', 'other-services.html') +
  pageHero('Other Services', 'Talent and <em>learning</em>, covered', 'Beyond HR services, we help you hire the right people and help professionals build a career in HR.', 'training') + `
<section><div class="container">
  <div class="filter-row center fx fx-up" data-tabs role="tablist"><button class="filter-btn active" data-tab="recruitment" role="tab">Recruitment</button><button class="filter-btn" data-tab="certification" role="tab">HR Certification Course</button></div>
  <div>
    <div class="panel active" data-panel="recruitment">
      <div class="split">
        <div class="about-copy"><div class="eyebrow">Recruitment</div><h2>The right people, <em>found faster</em></h2>
          <p>We manage the whole hiring cycle so your team spends time interviewing the best — not sorting through resumes.</p>
          <ul class="checks"><li><span>Job analysis &amp; role definition</span></li><li><span>Candidate sourcing across channels</span></li><li><span>Resume screening &amp; confidential interviews</span></li><li><span>Interview coordination &amp; assessment testing</span></li><li><span>Onboarding support until the candidate joins</span></li></ul>
          <a href="${TEL}" class="btn btn-gold">${phoneSm} Discuss your hiring</a></div>
        <div class="photo"><div class="img-reveal"><img src="assets/banner.jpg" alt="Consultant shaking hands with a client" loading="lazy" width="740" height="494" style="object-position:30% 40%"></div></div>
      </div>
      <div class="section-head center" style="margin:8rem auto 3rem"><div class="eyebrow center">Sectors we hire for</div></div>
      <div class="chips">${industries.map(i => `<span class="chip">${i}</span>`).join('')}</div>
    </div>
    <div class="panel" data-panel="certification">
      <div class="split">
        <div class="about-copy"><div class="eyebrow">HR Certification Course</div><h2>Build an <em>HR career</em> with confidence</h2>
          <p>A practical program covering the full spectrum of HR disciplines — ideal for recent graduates and working professionals alike.</p>
          <ul class="checks"><li><span><b>3 months</b> of hands-on, practical training</span></li><li><span><b>Online and offline</b> batches to suit your schedule</span></li><li><span><b>Lifetime placement support</b></span></li><li><span>Taught by working HR professionals</span></li></ul>
          <a href="${TEL}" class="btn btn-gold">${phoneSm} Enquire about the course</a></div>
        <div class="photo"><div class="img-reveal"><img src="assets/img/team-office.jpg" alt="Learners collaborating in a modern workspace" loading="lazy"></div></div>
      </div>
      <div class="cards" style="margin-top:7rem">
        ${card('users', 'Recruitment & Staffing', 'Sourcing, interviewing and selection techniques.', 1, 0)}
        ${card('money', 'Payroll & Compensation', 'Salary structures, payroll and statutory deductions.', 2, .1)}
        ${card('scale', 'Labour Law & Compliance', 'Key acts, registrations and real-world compliance.', 3, .2)}
      </div>
      <p style="text-align:center;margin-top:3rem;color:var(--muted)">Detailed curriculum, fees and upcoming batch dates are shared on enquiry.</p>
    </div>
  </div>
</div></section>
${cta}` + foot;

/* ---------- CONTACT ---------- */
pages['contact.html'] = head('Contact Us | Haze-Busting Global Services, Hadapsar Pune', 'Call Haze-Busting Global Services on +91 95038 60095, WhatsApp or visit us in Hadapsar, Pune. Open Monday to Saturday, 9 AM to 8 PM.', 'contact.html') +
  pageHero('Contact Us', "Let's <em>talk</em>", 'No forms, no waiting. Pick up the phone or message us — a real person from our HR team will answer.', 'highfive') + `
<section><div class="container">
  <div class="call-panel fx fx-up">
    <div class="call-main">
      <div class="eyebrow" style="color:var(--gold)">Speak to us directly</div>
      <a class="big-number" href="${TEL}">+91 95038 60095</a>
      <p class="l">Tap to call from your phone. We'll scope your HR needs in the very first conversation.</p>
      <div class="call-actions"><a href="${TEL}" class="btn btn-gold">${phoneSm} Call Now</a><a href="https://wa.me/919503860095" target="_blank" rel="noopener" class="btn btn-outline-light">WhatsApp us</a></div>
      <p class="alt-line">Alternate line &nbsp;<a href="tel:+919923108516">+91 99231 08516</a></p>
    </div>
    <aside class="hours"><small>Working hours</small><br><span class="open-badge"><i></i><span>Checking…</span></span>
      <ul><li><span>Monday – Friday</span><b>9 AM – 8 PM</b></li><li><span>Saturday</span><b>9 AM – 8 PM</b></li><li class="off"><span>Sunday</span><b>Closed</b></li></ul></aside>
  </div>
  <div class="channels">
    <a class="channel fx fx-up" href="https://wa.me/919503860095" target="_blank" rel="noopener"><span class="ic">${ic.wa.replace('width="26" height="26"', 'width="24" height="24"')}</span><small>WhatsApp</small><b>Chat with us instantly</b><span class="go">Open chat →</span></a>
    <a class="channel fx fx-up" data-fx-delay=".1" href="mailto:sunil@hazebusting.com"><span class="ic">${ic.mail}</span><small>Email</small><b>sunil@hazebusting.com</b><span class="go">Write to us →</span></a>
    <a class="channel fx fx-up" data-fx-delay=".2" href="https://maps.google.com/?q=SRPF+Road+Ramtekadi+Hadapsar+Pune+411013" target="_blank" rel="noopener"><span class="ic">${ic.pin}</span><small>Visit</small><b>SRPF Road, Ramtekadi, Hadapsar, Pune 411013</b><span class="go">Get directions →</span></a>
  </div>
  <div class="map-wrap fx fx-up">
    <div class="map"><iframe title="Haze-Busting Global Services location" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=SRPF+Road+Ramtekadi+Hadapsar+Pune+411013&output=embed"></iframe></div>
    <div class="map-card"><small>Our office</small><b>Haze-Busting Global Services</b><p>SRPF Road, Ramtekadi, Hadapsar,<br>Pune, Maharashtra 411013</p><a href="https://maps.google.com/?q=SRPF+Road+Ramtekadi+Hadapsar+Pune+411013" target="_blank" rel="noopener">Open in Maps →</a></div>
  </div>
</div></section>` + foot;

for (const [f, h] of Object.entries(pages)) fs.writeFileSync(path.join(OUT, f), h);
console.log('built', Object.keys(pages).join(', '));
