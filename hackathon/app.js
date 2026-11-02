
// ── DATA ─────────────────────────────────────────────────────────────────────
const ROLES = [
  { id:'swe', icon:'💻', title:'Software Developer',
    desc:'Build scalable applications using modern languages and frameworks.',
    skills:['Data Structures & Algorithms','C/C++','Java','Python','OOP','SQL','Git/GitHub','System Design'] },
  { id:'uiux', icon:'🎨', title:'UI/UX Designer',
    desc:'Create intuitive, beautiful user interfaces and seamless experiences.',
    skills:['Figma','Wireframing','Prototyping','UX Research','Design Principles','Adobe XD','User Testing'] },
  { id:'cyber', icon:'🔒', title:'Cybersecurity Analyst',
    desc:'Protect systems and networks from digital attacks and vulnerabilities.',
    skills:['Networking','Linux','Ethical Hacking','Cryptography','Security Tools','SIEM','Penetration Testing'] },
  { id:'data', icon:'📊', title:'Data Scientist',
    desc:'Analyze complex data to uncover insights and build predictive models.',
    skills:['Python','Machine Learning','Statistics','Data Visualization','SQL','Deep Learning','NumPy/Pandas'] },
  { id:'cloud', icon:'☁️', title:'Cloud Engineer',
    desc:'Design and manage scalable cloud infrastructure and services.',
    skills:['AWS','Azure','GCP','Networking','Docker','Kubernetes','CI/CD','Terraform'] },
  { id:'devops', icon:'⚙️', title:'DevOps Engineer',
    desc:'Bridge development and operations to enable rapid, reliable delivery.',
    skills:['Jenkins','Docker','Kubernetes','Linux','Scripting','CI/CD','Ansible','Git'] }
];

const COURSES = {
  swe:[
    {platform:'Coursera',title:'Algorithms Specialization',desc:'Stanford\'s DSA deep-dive',url:'https://coursera.org'},
    {platform:'freeCodeCamp',title:'Full Stack Development',desc:'HTML to Node.js for free',url:'https://freecodecamp.org'},
    {platform:'Udemy',title:'Java Masterclass',desc:'Most comprehensive Java course',url:'https://udemy.com'}
  ],
  uiux:[
    {platform:'Coursera',title:'Google UX Design Certificate',desc:'Industry-recognized credential',url:'https://coursera.org'},
    {platform:'Udemy',title:'Complete Figma Bootcamp',desc:'From basics to prototyping',url:'https://udemy.com'},
    {platform:'YouTube',title:'DesignCourse Free UX',desc:'Top-rated free UX curriculum',url:'https://youtube.com'}
  ],
  cyber:[
    {platform:'Coursera',title:'IBM Cybersecurity Certificate',desc:'Hands-on security training',url:'https://coursera.org'},
    {platform:'TryHackMe',title:'Ethical Hacking Path',desc:'Learn by doing CTFs',url:'https://tryhackme.com'},
    {platform:'Udemy',title:'CompTIA Security+ Prep',desc:'Top certification prep',url:'https://udemy.com'}
  ],
  data:[
    {platform:'Coursera',title:'Machine Learning Specialization',desc:'Andrew Ng\'s famous course',url:'https://coursera.org'},
    {platform:'Kaggle',title:'Intro to ML (Free)',desc:'Hands-on Kaggle notebooks',url:'https://kaggle.com'},
    {platform:'Udemy',title:'Python for Data Science',desc:'Pandas, NumPy, Matplotlib',url:'https://udemy.com'}
  ],
  cloud:[
    {platform:'AWS',title:'AWS Cloud Practitioner',desc:'Official AWS beginner cert',url:'https://aws.amazon.com/training'},
    {platform:'Coursera',title:'Google Cloud Fundamentals',desc:'GCP for beginners',url:'https://coursera.org'},
    {platform:'Udemy',title:'Docker & Kubernetes Bootcamp',desc:'Container orchestration mastery',url:'https://udemy.com'}
  ],
  devops:[
    {platform:'Udemy',title:'DevOps Bootcamp',desc:'Jenkins, Docker, K8s, Ansible',url:'https://udemy.com'},
    {platform:'Linux Foundation',title:'Kubernetes for Developers',desc:'Official CNCF training',url:'https://training.linuxfoundation.org'},
    {platform:'freeCodeCamp',title:'Linux Command Line',desc:'Full Linux bash for free',url:'https://freecodecamp.org'}
  ]
};

const ROADMAPS = {
  swe:['Learn a programming language (Python or Java)','Master Data Structures & Algorithms','Build 3 portfolio projects','Learn Git and version control','Study system design basics','Apply and ace coding interviews'],
  uiux:['Learn design fundamentals & color theory','Master Figma for UI design','Study UX research methods','Build a portfolio of 4+ case studies','Learn prototyping & user testing','Apply for junior design roles'],
  cyber:['Learn networking fundamentals (TCP/IP)','Get comfortable with Linux CLI','Study cryptography basics','Practice ethical hacking on TryHackMe','Earn CompTIA Security+ cert','Apply for SOC Analyst positions'],
  data:['Learn Python and statistics','Master pandas, NumPy, matplotlib','Take Andrew Ng\'s ML course','Complete 5 Kaggle projects','Learn SQL and data wrangling','Build a capstone ML project'],
  cloud:['Learn cloud fundamentals','Earn AWS/Azure/GCP beginner cert','Master Docker containerization','Learn Kubernetes orchestration','Build CI/CD pipelines','Earn professional cloud certification'],
  devops:['Learn Linux and shell scripting','Master Docker and containers','Set up Jenkins CI/CD pipeline','Learn Kubernetes & orchestration','Study infrastructure as code','Build and showcase a DevOps pipeline']
};

const AI_TIPS = [
  '🎯 Focus on your weakest skills first — improvement there gives the biggest readiness boost.',
  '📅 Dedicate 1–2 hours daily to learning. Consistency beats intensity!',
  '🏗️ Build real projects with your skills. Employers value portfolios over certificates.',
  '🤝 Network on LinkedIn with professionals in your target role.',
  '📝 Tailor your resume for each job application using role-specific keywords.',
  '🔄 Reassess your skills every 4–6 weeks to track progress.',
  '🌐 Contribute to open-source projects to get real-world experience.'
];

// ── STATE ─────────────────────────────────────────────────────────────────────
let state = {
  selectedRole: null,
  selectedSkills: {},   // { skillName: 'Beginner'|'Intermediate'|'Advanced' }
  history: JSON.parse(localStorage.getItem('cf_history') || '[]')
};

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.getElementById('progressWizard').style.display =
    ['roles','skills','results'].includes(page) ? 'block' : 'none';
  updateWizard(page);
  window.scrollTo({top:0, behavior:'smooth'});
  if (page === 'roles') renderRoles();
  if (page === 'skills') renderSkills();
  if (page === 'results') renderResults();
  if (page === 'profile') renderProfile();
}

function updateWizard(page) {
  const steps = {roles:'step1', skills:'step2', results:'step3'};
  const pages = ['roles','skills','results'];
  const idx = pages.indexOf(page);
  pages.forEach((p,i) => {
    const el = document.getElementById('step'+(i+1));
    if (!el) return;
    el.classList.toggle('active', i === idx);
    el.classList.toggle('done', i < idx);
  });
  ['line1','line2'].forEach((l,i) => {
    const el = document.getElementById(l);
    if (el) el.classList.toggle('done', i < idx);
  });
}

// ── THEME ─────────────────────────────────────────────────────────────────────
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
}

// ── ROLES PAGE ────────────────────────────────────────────────────────────────
function renderRoles(filter = '') {
  const grid = document.getElementById('rolesGrid');
  const filtered = ROLES.filter(r =>
    r.title.toLowerCase().includes(filter.toLowerCase()) ||
    r.desc.toLowerCase().includes(filter.toLowerCase())
  );
  grid.innerHTML = filtered.map(role => `
    <div class="role-card ${state.selectedRole?.id === role.id ? 'selected':''}" id="card-${role.id}">
      <div class="role-icon">${role.icon}</div>
      <h3>${role.title}</h3>
      <p>${role.desc}</p>
      <button class="role-select-btn" onclick="selectRole('${role.id}')">
        ${state.selectedRole?.id === role.id ? '✓ Selected' : 'Select Role'}
      </button>
    </div>
  `).join('');
}

function filterRoles() {
  renderRoles(document.getElementById('roleSearch').value);
}

function selectRole(id) {
  state.selectedRole = ROLES.find(r => r.id === id);
  state.selectedSkills = {};
  showPage('skills');
}

// ── SKILLS PAGE ───────────────────────────────────────────────────────────────
function renderSkills() {
  if (!state.selectedRole) { showPage('roles'); return; }
  document.getElementById('currentRoleBadge').textContent = state.selectedRole.title;
  document.getElementById('skillsSubtitle').textContent =
    `Select your skills for ${state.selectedRole.title} and rate your proficiency.`;
  renderSkillTags();
  renderSelectedSkills();
}

function renderSkillTags() {
  const container = document.getElementById('skillTags');
  container.innerHTML = state.selectedRole.skills.map(skill => {
    const level = state.selectedSkills[skill];
    const dot = level ? `<span class="level-dot level-${level.toLowerCase()}"></span>` : '';
    return `<div class="skill-tag ${level?'selected':''}" onclick="toggleSkill('${skill}')">
      ${dot}${skill}
    </div>`;
  }).join('');
}

function toggleSkill(skill) {
  if (state.selectedSkills[skill]) {
    delete state.selectedSkills[skill];
  } else {
    // Cycle: add as Intermediate by default; show level picker inline
    showLevelPicker(skill);
    return;
  }
  renderSkillTags();
  renderSelectedSkills();
}

function showLevelPicker(skill) {
  const level = prompt(`Skill: "${skill}"\nChoose level:\n1 = Beginner\n2 = Intermediate\n3 = Advanced\n\nEnter 1, 2 or 3:`, '2');
  const map = {'1':'Beginner','2':'Intermediate','3':'Advanced'};
  state.selectedSkills[skill] = map[level] || 'Intermediate';
  renderSkillTags();
  renderSelectedSkills();
}

function renderSelectedSkills() {
  const container = document.getElementById('selectedSkills');
  const skills = Object.entries(state.selectedSkills);
  document.getElementById('selectedCount').textContent = skills.length + ' selected';
  document.getElementById('analyzeBtn').disabled = skills.length === 0;
  if (!skills.length) {
    container.innerHTML = '<div class="empty-skills">Click skills on the left to add them →</div>';
    return;
  }
  container.innerHTML = skills.map(([name, level]) => `
    <div class="selected-skill-item">
      <div class="skill-info">
        <span class="level-dot level-${level.toLowerCase()}"></span>
        <span>${name}</span>
        <span class="level-badge ${level}">${level}</span>
      </div>
      <button class="remove-skill" onclick="removeSkill('${name}')">✕</button>
    </div>
  `).join('');
}

function removeSkill(name) {
  delete state.selectedSkills[name];
  renderSkillTags();
  renderSelectedSkills();
}

function addCustomSkill() {
  const input = document.getElementById('customSkillInput');
  const level = document.getElementById('customSkillLevel').value;
  const name = input.value.trim();
  if (!name) { showToast('Please enter a skill name'); return; }
  state.selectedSkills[name] = level;
  input.value = '';
  renderSkillTags();
  renderSelectedSkills();
  showToast(`Added: ${name} (${level})`);
}

// ── ANALYSIS ─────────────────────────────────────────────────────────────────
function analyzeSkills() {
  if (!Object.keys(state.selectedSkills).length) return;
  showPage('results');
}

function calcScore() {
  const roleSkills = state.selectedRole.skills;
  const userSkills = Object.keys(state.selectedSkills);
  const levelWeight = { Advanced:1, Intermediate:0.7, Beginner:0.4 };
  let earned = 0, total = roleSkills.length;
  roleSkills.forEach(skill => {
    const level = state.selectedSkills[skill];
    if (level) earned += levelWeight[level];
  });
  // bonus for extra skills
  userSkills.forEach(s => { if (!roleSkills.includes(s)) earned += 0.2; });
  return Math.min(Math.round((earned / total) * 100), 99);
}

// ── RESULTS PAGE ──────────────────────────────────────────────────────────────
function renderResults() {
  if (!state.selectedRole) { showPage('roles'); return; }
  const score = calcScore();
  const roleSkills = state.selectedRole.skills;
  const userSkills = Object.entries(state.selectedSkills);

  // Categorize
  const strong = [], weak = [], missing = [];
  roleSkills.forEach(skill => {
    const level = state.selectedSkills[skill];
    if (!level) missing.push(skill);
    else if (level === 'Advanced' || level === 'Intermediate') strong.push({skill, level});
    else weak.push({skill, level});
  });
  userSkills.forEach(([s]) => { if (!roleSkills.includes(s)) strong.push({skill:s, level:state.selectedSkills[s]}); });

  // Score animation
  const circle = document.getElementById('scoreCircle');
  const numEl = document.getElementById('scoreNumber');
  const label = document.getElementById('scoreLabel');
  const offset = 502 - (502 * score / 100);
  setTimeout(() => { circle.style.transition = 'stroke-dashoffset 1.5s ease'; circle.style.strokeDashoffset = offset; }, 100);
  let cur = 0;
  const timer = setInterval(() => {
    cur = Math.min(cur + 2, score);
    numEl.textContent = cur + '%';
    if (cur >= score) clearInterval(timer);
  }, 30);
  label.textContent = score >= 80 ? 'Job Ready! 🎉' : score >= 60 ? 'Almost There 💪' : score >= 40 ? 'Keep Learning 📚' : 'Just Starting 🌱';
  document.getElementById('roleResultBadge').textContent = state.selectedRole.icon + ' ' + state.selectedRole.title;

  // Breakdown
  document.getElementById('strongSkills').innerHTML = strong.length ? `
    <div class="skill-group-title">✅ Strong Skills (${strong.length})</div>
    <div class="skill-group-items">${strong.map(s => `<span class="skill-chip chip-strong">${s.skill}</span>`).join('')}</div>
  ` : '';
  document.getElementById('weakSkills').innerHTML = weak.length ? `
    <div class="skill-group-title">⚠️ Needs Improvement (${weak.length})</div>
    <div class="skill-group-items">${weak.map(s => `<span class="skill-chip chip-weak">${s.skill}</span>`).join('')}</div>
  ` : '';
  document.getElementById('missingSkills').innerHTML = missing.length ? `
    <div class="skill-group-title">❌ Missing Skills (${missing.length})</div>
    <div class="skill-group-items">${missing.map(s => `<span class="skill-chip chip-missing">${s}</span>`).join('')}</div>
  ` : '';

  // Suggestions
  const suggestions = [];
  if (missing.length) suggestions.push({icon:'🎯', title:`Learn ${missing[0]}`, text:`This is one of the most critical missing skills for ${state.selectedRole.title}.`});
  if (weak.length) suggestions.push({icon:'💪', title:`Strengthen ${weak[0].skill}`, text:`Level up from Beginner to Intermediate by building a small project.`});
  suggestions.push({icon:'🏗️', title:'Build Portfolio Projects', text:`Create 2–3 real-world projects showcasing your ${state.selectedRole.title} skills.`});
  suggestions.push({icon:'🤝', title:'Network Actively', text:`Connect with ${state.selectedRole.title} professionals on LinkedIn for referrals.`});
  document.getElementById('suggestionsGrid').innerHTML = suggestions.map(s => `
    <div class="suggestion-item">
      <div class="suggestion-icon">${s.icon}</div>
      <div><h4>${s.title}</h4><p>${s.text}</p></div>
    </div>
  `).join('');

  // Courses
  const courses = COURSES[state.selectedRole.id] || [];
  document.getElementById('coursesGrid').innerHTML = courses.map(c => `
    <div class="course-card">
      <div class="course-platform">${c.platform}</div>
      <h4>${c.title}</h4>
      <p>${c.desc}</p>
      <a class="course-link" href="${c.url}" target="_blank" rel="noopener">View Course →</a>
    </div>
  `).join('');

  // Roadmap
  const steps = ROADMAPS[state.selectedRole.id] || [];
  const durations = ['Week 1–2','Week 3–4','Month 2','Month 3','Month 4','Month 5–6'];
  document.getElementById('roadmapTimeline').innerHTML = steps.map((s,i) => `
    <div class="roadmap-step">
      <div class="step-dot">${i+1}</div>
      <div class="step-content">
        <h4>${s}</h4>
        <p>Focus consistently and track your progress with small milestones.</p>
        <span class="step-duration">${durations[i] || 'Ongoing'}</span>
      </div>
    </div>
  `).join('');

  // Save to history
  const entry = { role: state.selectedRole.title, icon: state.selectedRole.icon, score, date: new Date().toLocaleDateString(), skills: Object.keys(state.selectedSkills).length };
  state.history.unshift(entry);
  if (state.history.length > 10) state.history.pop();
  localStorage.setItem('cf_history', JSON.stringify(state.history));
}

// ── PROFILE PAGE ──────────────────────────────────────────────────────────────
function renderProfile() {
  const h = state.history;
  document.getElementById('totalAssessments').textContent = h.length;
  document.getElementById('bestScore').textContent = h.length ? Math.max(...h.map(e=>e.score))+'%' : '—';
  document.getElementById('totalSkills').textContent = h.reduce((a,e)=>a+e.skills,0);
  const list = document.getElementById('historyList');
  if (!h.length) { list.innerHTML = '<div class="empty-history">No assessments yet. <a href="#" onclick="showPage(\'roles\')">Start your first one!</a></div>'; return; }
  list.innerHTML = h.map(e => `
    <div class="history-item">
      <div class="hi-info">
        <h4>${e.icon} ${e.role}</h4>
        <small>${e.date} · ${e.skills} skills</small>
      </div>
      <div class="hi-score">${e.score}%</div>
    </div>
  `).join('');
}

// ── AI POPUP ─────────────────────────────────────────────────────────────────
function openAiPopup() {
  const popup = document.getElementById('aiPopup');
  popup.classList.add('open');
  const body = document.getElementById('aiPopupBody');
  const tips = AI_TIPS.sort(()=>Math.random()-.5).slice(0,3);
  body.innerHTML = tips.map(t => `<div class="ai-msg">${t}</div>`).join('');
}
function closeAiPopup() { document.getElementById('aiPopup').classList.remove('open'); }

// ── UTILITIES ─────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2500);
}

function saveResults() {
  if (!state.selectedRole) return;
  showToast('✅ Results saved to your profile!');
}

function shareResults() {
  const score = calcScore();
  const text = `I scored ${score}% readiness for ${state.selectedRole.title} on CareerFit! 🚀`;
  if (navigator.share) { navigator.share({title:'CareerFit Results', text}); }
  else { navigator.clipboard.writeText(text).then(()=>showToast('📋 Copied to clipboard!')); }
}

function scrollToFeatures() {
  document.getElementById('features').scrollIntoView({behavior:'smooth'});
}

// ── INIT ──────────────────────────────────────────────────────────────────────
showPage('landing');

// ── PARTICLES ────────────────────────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + 0.3;
    this.dx = (Math.random() - 0.5) * 0.4;
    this.dy = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '99,102,241' : '168,85,247';
  }

  function init() {
    particles = Array.from({length: 80}, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    // draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${0.06 * (1 - d/100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  resize(); init(); draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

// ── INTERSECTION OBSERVER (scroll reveal) ────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold: 0.1});
document.querySelectorAll('.feature-card, .testimonial-card, .role-card').forEach(el => observer.observe(el));

// ── TYPING EFFECT on hero subtitle ───────────────────────────────────────────
function typeWriter(el, text, speed = 28) {
  el.textContent = '';
  let i = 0;
  const t = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(t);
  }, speed);
}
window.addEventListener('load', () => {
  const sub = document.querySelector('.hero-subtitle');
  if (sub) {
    const orig = sub.textContent;
    typeWriter(sub, orig);
  }
});

// ── MOUSE PARALLAX on hero visual ────────────────────────────────────────────
document.addEventListener('mousemove', e => {
  const xRatio = (e.clientX / window.innerWidth - 0.5) * 20;
  const yRatio = (e.clientY / window.innerHeight - 0.5) * 20;
  const visual = document.querySelector('.hero-visual');
  if (visual) visual.style.transform = `translate(${xRatio * 0.3}px, ${yRatio * 0.3}px)`;
  const blobs = document.querySelectorAll('.blob');
  blobs.forEach((b, i) => {
    b.style.transform = `translate(${xRatio * (i+1) * 0.5}px, ${yRatio * (i+1) * 0.5}px)`;
  });
});

// ── ANIMATED COUNTER for stats ────────────────────────────────────────────────
function animateCounter(el, target, suffix='', duration=1500) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
// observe stats
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const statNums = e.target.querySelectorAll('.stat-num');
      statNums.forEach(el => {
        const val = el.textContent;
        if (val.includes('K')) animateCounter(el, 50, 'K+');
        else if (val.includes('%')) animateCounter(el, 95, '%');
        else animateCounter(el, 6);
      });
      statsObs.unobserve(e.target);
    }
  });
}, {threshold: 0.5});
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObs.observe(heroStats);

