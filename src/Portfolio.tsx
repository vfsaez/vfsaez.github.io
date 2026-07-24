import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------------- Content ---------------- */

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#impact', label: 'Impact' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const TECH = [
  { category: 'Backend', list: 'Java · Python · Node.js' },
  { category: 'Architecture', list: 'Microservices · DDD' },
  { category: 'Messaging', list: 'Kafka · RabbitMQ' },
  { category: 'Data', list: 'PostgreSQL · MongoDB · Redis' },
  { category: 'Cloud', list: 'AWS · Azure' },
  { category: 'DevOps', list: 'Kubernetes · Terraform' },
];

type Stat = {
  from: number;
  target: number;
  suffix: string;
  label: string;
  format?: (v: number) => string;
};

// Daily-job counter formats thousands → "100k" … "1.5M"
const fmtJobs = (v: number) =>
  v >= 1000
    ? `${Number.isInteger(v / 1000) ? (v / 1000).toFixed(0) : (v / 1000).toFixed(1)}M`
    : `${Math.round(v)}k`;

const STATS: Stat[] = [
  { from: 1, target: 8, suffix: '+', label: 'Years shipping to production' },
  { from: 6, target: 80, suffix: '+', label: 'EHR systems integrated' },
  { from: 6, target: 70, suffix: '%', label: 'Infrastructure cost reduced' },
  { from: 100, target: 1500, suffix: '+', label: 'Daily job executions handled', format: fmtJobs },
];

const statFmt = (s: Stat, v: number) => (s.format ? s.format(v) : String(Math.round(v)));

/* Gauge geometry — a 270° dial with a gap at the bottom */
const GAUGE = { cx: 60, cy: 60, r: 42, start: -135, sweep: 270 };
const GAUGE_IDLE = 0.08; // "low rev" resting position (fraction of the sweep)

const polar = (deg: number, radius: number): [number, number] => {
  const rad = (deg * Math.PI) / 180;
  return [GAUGE.cx + radius * Math.sin(rad), GAUGE.cy - radius * Math.cos(rad)];
};
const angleAt = (p: number) => GAUGE.start + p * GAUGE.sweep;

const TRACK_D = (() => {
  const [x1, y1] = polar(GAUGE.start, GAUGE.r);
  const [x2, y2] = polar(GAUGE.start + GAUGE.sweep, GAUGE.r);
  const large = GAUGE.sweep > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${GAUGE.r} ${GAUGE.r} 0 ${large} 1 ${x2.toFixed(
    2
  )} ${y2.toFixed(2)}`;
})();

const TICKS = Array.from({ length: 9 }, (_, i) => {
  const deg = GAUGE.start + (i / 8) * GAUGE.sweep;
  const [ox, oy] = polar(deg, GAUGE.r - 7.5);
  const [ix, iy] = polar(deg, GAUGE.r - 12);
  return { ox, oy, ix, iy, major: i % 2 === 0 };
});

// Analytic arc length of the track — drives the stroke-dash fill (no pathLength quirks)
const ARC_LEN = (GAUGE.r * GAUGE.sweep * Math.PI) / 180;

const PROJECTS = [
  {
    company: 'Luma Health · 2022–2023',
    title: 'HIPAA-Compliant Logging Pipeline',
    description:
      "Refactored the platform's logging architecture to cut system-wide storage and processing costs by 70%. Resolved concurrency bugs affecting 100k+ daily job executions and built FHIR-compliant bidirectional form sync across 80+ EHR systems.",
    stack: ['Node.js', 'TypeScript', 'RabbitMQ', 'Redis', 'MongoDB', 'Kubernetes', 'AWS'],
  },
  {
    company: 'Stoom · 2019–2021',
    title: 'Smart Locker Delivery System',
    description:
      'Designed a smart-locker delivery platform integrated with physical hardware for secure pickup. Server-side logic in Python (Django) optimized container allocation from order data, with a React client running on embedded hardware.',
    stack: ['Python', 'Django', 'React', 'PostgreSQL', 'Shell Scripts'],
  },
  {
    company: 'Bradesco · 2024–2025',
    title: 'Hybrid Cloud Modernization',
    description:
      'Led legacy-to-cloud modernization for a national-scale credit-card application. Built secure APIs and resilient services across a hybrid Azure + on-premises environment, delivering full-stack features with Java, Node.js, and React.',
    stack: ['Java', 'Node.js', 'React', 'Azure', 'Microservices'],
  },
];

const EXPERIENCE = [
  {
    date: '2025 — Present',
    title: 'Senior Software Engineer',
    company: 'Sydecar, Inc.',
    desc: 'Building scalable fintech infrastructure and investment-platform solutions.',
  },
  {
    date: '2024 — 2025',
    title: 'Senior Software Engineer',
    company: 'Banco Bradesco',
    desc: 'Led modernization of legacy systems toward a cloud-native architecture.',
  },
  {
    date: '2022 — 2023',
    title: 'Senior Backend Engineer',
    company: 'Luma Health',
    desc: 'Architected HIPAA-compliant systems and optimized healthcare data processing.',
  },
  {
    date: '2020 — 2021',
    title: 'Tech Lead',
    company: 'Stoom',
    desc: 'Led development of IoT-integrated e-commerce delivery solutions.',
  },
  {
    date: '2018 — 2020',
    title: 'Backend Developer',
    company: 'Stoom',
    desc: 'Built scalable backend services for retail and logistics platforms.',
  },
];

const TITLE = "Hi, I'm Victor — building scalable systems across Finance, HealthTech & E-commerce.";
const TITLE_WORDS = TITLE.split(' ');
const GRAD_FROM = TITLE_WORDS.length - 4; // last 4 words get the gradient

/* ---------------- Component ---------------- */

export const Portfolio: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      // Nav scrolled state — independent of motion preference
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) =>
          navRef.current?.classList.toggle('is-scrolled', self.scroll() > 60),
      });

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          fine: '(pointer: fine) and (min-width: 861px)',
          wide: '(min-width: 861px)',
        },
        (ctx) => {
          const conditions = ctx.conditions as {
            motion: boolean;
            fine: boolean;
            wide: boolean;
          };
          const { motion, fine, wide } = conditions;

          /* ---- Scroll progress bar (cheap, always on) ---- */
          gsap.to('.scroll-progress', {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
          });

          if (!motion) {
            // Reduced motion: reveal everything, finalize dynamic values, no scrubbing/pinning.
            gsap.set('.reveal, [data-hero]', { opacity: 1, clearProps: 'transform' });
            gsap.set('.timeline-line .fill', { scaleY: 1 });
            q('.stat').forEach((stat, i) => {
              gsap.set(stat.querySelector('.needle-rot'), {
                rotation: angleAt(1),
                svgOrigin: '60 60',
              });
              gsap.set(stat.querySelector('.gauge-fill'), {
                strokeDasharray: ARC_LEN,
                strokeDashoffset: 0,
              });
              const num = stat.querySelector('.num');
              if (num) num.textContent = statFmt(STATS[i], STATS[i].target);
            });
            return;
          }

          /* ---- Hero entrance timeline ---- */
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
          tl.fromTo(
            '.hero-title .word',
            { yPercent: 120, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.045 }
          )
            .fromTo(
              '.hero-description',
              { y: 24, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.7 },
              '-=0.5'
            )
            .fromTo(
              '.cta-buttons',
              { y: 20, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6 },
              '-=0.45'
            )
            .fromTo(
              '.eyebrow',
              { y: 16, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6 },
              '-=0.3'
            )
            .fromTo(
              '.hero-meta',
              { y: 16, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6 },
              '-=0.4'
            );

          /* ---- Availability status: live pulse ---- */
          gsap.fromTo(
            '.status-ping',
            { scale: 1, autoAlpha: 0.55 },
            {
              scale: 2.8,
              autoAlpha: 0,
              duration: 1.8,
              repeat: -1,
              ease: 'power2.out',
              transformOrigin: '50% 50%',
            }
          );

          /* ---- Animated hero backdrop (continuous drift) ---- */
          gsap.to('.blob-1', {
            x: 60,
            y: 40,
            duration: 13,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
          gsap.to('.blob-2', {
            x: -50,
            y: 60,
            duration: 16,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
          gsap.to('.blob-3', {
            x: 40,
            y: -50,
            duration: 18,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          /* ---- Parallax layers on hero scroll ---- */
          gsap.to('.hero-bg', {
            yPercent: 34,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
          gsap.to('.hero-grid', {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
          gsap.to('.hero-content', {
            y: 80,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });

          /* ---- Generic scroll reveals ---- */
          q('.reveal').forEach((el) => {
            gsap.fromTo(
              el,
              { y: 34, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 86%', once: true },
              }
            );
          });

          /* ---- Staggered groups (tech grid, project cards) ---- */
          q('[data-stagger]').forEach((group) => {
            gsap.fromTo(
              group.children,
              { y: 40, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                ease: 'power2.out',
                stagger: 0.1,
                scrollTrigger: { trigger: group, start: 'top 82%', once: true },
              }
            );
          });

          /* ---- Stats backdrop: gentle blob drift (matches the hero) ---- */
          gsap.to('.sblob-1', {
            x: 45,
            y: 30,
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
          gsap.to('.sblob-2', {
            x: -40,
            y: -35,
            duration: 18,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
          gsap.to('.sblob-3', {
            x: 30,
            y: -45,
            duration: 21,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          /* ---- Stats: gauges idle low, then rev up on a pinned scrub ---- */
          const statsTl = gsap.timeline({
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top top',
              end: '+=115%',
              pin: true,
              scrub: 0.6,
            },
          });
          q('.stat').forEach((stat, i) => {
            const needleRot = stat.querySelector('.needle-rot');
            const needle = stat.querySelector('.gauge-needle');
            const fill = stat.querySelector('.gauge-fill');
            const num = stat.querySelector('.num');
            const s = STATS[i];
            // Number sweeps from its idle "from" value up to the target
            const valueAt = (p: number) =>
              s.from + (s.target - s.from) * ((p - GAUGE_IDLE) / (1 - GAUGE_IDLE));

            // Resting "low rev" state
            gsap.set(needleRot, { rotation: angleAt(GAUGE_IDLE), svgOrigin: '60 60' });
            gsap.set(fill, {
              strokeDasharray: ARC_LEN,
              strokeDashoffset: ARC_LEN * (1 - GAUGE_IDLE),
            });
            if (num) num.textContent = statFmt(s, s.from);

            // Faint idle tremor on the needle itself (composes with the sweep group)
            gsap.fromTo(
              needle,
              { rotation: -0.9 },
              {
                rotation: 0.9,
                svgOrigin: '60 60',
                duration: 0.12,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              }
            );

            // Rev up: needle sweeps, arc fills, number climbs — all tied to the scrub
            const proxy = { p: GAUGE_IDLE };
            statsTl
              .to(needleRot, { rotation: angleAt(1), svgOrigin: '60 60', ease: 'none' }, 0)
              .to(fill, { strokeDashoffset: 0, ease: 'none' }, 0)
              .to(
                proxy,
                {
                  p: 1,
                  ease: 'none',
                  onUpdate: () => {
                    if (num) num.textContent = statFmt(s, valueAt(proxy.p));
                  },
                },
                0
              );
          });

          /* ---- Experience timeline: line draw + item reveals ---- */
          gsap.fromTo(
            '.timeline-line .fill',
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '.timeline',
                start: 'top 65%',
                end: 'bottom 80%',
                scrub: 0.5,
              },
            }
          );
          q('.timeline-item').forEach((item, i) => {
            const content = item.querySelector('.timeline-content');
            const dot = item.querySelector('.timeline-dot');
            // Side-slide only on wide screens (alternating); on mobile slide up
            // so the entrance offset never pokes past the viewport edge.
            const fromX = wide ? (i % 2 === 0 ? -28 : 28) : 0;
            gsap.fromTo(
              content,
              { x: fromX, y: wide ? 0 : 24, autoAlpha: 0 },
              {
                x: 0,
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: { trigger: item, start: 'top 82%', once: true },
              }
            );
            gsap.fromTo(
              dot,
              { scale: 0 },
              {
                scale: 1,
                duration: 0.4,
                ease: 'back.out(2)',
                scrollTrigger: { trigger: item, start: 'top 82%', once: true },
              }
            );
          });

          /* ---- Magnetic buttons (fine pointer / desktop only) ---- */
          const cleanups: Array<() => void> = [];
          if (fine) {
            (q('.magnetic') as HTMLElement[]).forEach((btn) => {
              const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
              const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
              const onMove = (e: MouseEvent) => {
                const r = btn.getBoundingClientRect();
                xTo((e.clientX - (r.left + r.width / 2)) * 0.4);
                yTo((e.clientY - (r.top + r.height / 2)) * 0.6);
              };
              const onLeave = () => {
                xTo(0);
                yTo(0);
              };
              btn.addEventListener('mousemove', onMove);
              btn.addEventListener('mouseleave', onLeave);
              cleanups.push(() => {
                btn.removeEventListener('mousemove', onMove);
                btn.removeEventListener('mouseleave', onLeave);
              });
            });
          }

          return () => cleanups.forEach((fn) => fn());
        }
      );

      // Recalculate trigger positions once webfonts have loaded (layout shifts).
      if (typeof document !== 'undefined' && 'fonts' in document) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <div className="scroll-progress" aria-hidden="true" />

      {/* Navigation */}
      <nav className="nav" ref={navRef} aria-label="Main navigation">
        <div className="nav-content">
          <a href="#top" className="logo" aria-label="Victor Saez — home">
            victorsaez.dev
          </a>
          <ul className="nav-links">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero" id="top" aria-label="Introduction">
        <div className="hero-bg" aria-hidden="true">
          <span className="blob blob-1" />
          <span className="blob blob-2" />
          <span className="blob blob-3" />
        </div>
        <div className="hero-grid" aria-hidden="true" />

        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              {TITLE_WORDS.map((word, i) => (
                <span key={i}>
                  <span className={i >= GRAD_FROM ? 'word grad' : 'word'}>{word}</span>
                  {i < TITLE_WORDS.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>

            <p className="hero-description" data-hero>
              Senior Software Engineer &amp; Tech Lead with 8+ years architecting cloud-native
              backends, leading teams, and solving complex engineering challenges with Java,
              Python, Node.js, and distributed systems.
            </p>

            <div className="cta-buttons" data-hero>
              <a href="#projects" className="btn btn-primary magnetic">
                View my work
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#contact" className="btn btn-secondary magnetic">
                Get in touch
              </a>
            </div>

            <span className="eyebrow" data-hero>
              <span className="status" aria-hidden="true">
                <span className="status-ping" />
                <span className="status-core" />
              </span>
              Open to new opportunities
            </span>

            <div className="hero-meta" data-hero>
              <span>
                <b>8+ yrs</b> in production
              </span>
              <span>
                <b>Regulated</b> Finance · Health · Retail
              </span>
              <span>
                <b>UNICAMP</b> CE &amp; CS
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* About */}
      <section className="section" id="about" aria-label="About">
        <div className="container">
          <div className="section-header reveal">
            <p className="kicker">About</p>
            <h2 className="section-title">Backend-focused, systems-minded</h2>
            <p className="section-subtitle">
              Designing resilient systems, mentoring teams, and shipping business-critical
              features.
            </p>
          </div>

          <div className="about-content">
            <div className="reveal">
              <p className="about-text">
                I'm a backend-focused software engineer who enjoys designing resilient systems,
                mentoring teams, and shipping features that move the business.
              </p>
              <p className="about-text">
                With a foundation in Computer Engineering and Computer Science from UNICAMP, I've
                led and contributed to projects across regulated industries — from banking and
                healthcare to retail — delivering impact in high-availability environments with
                modern cloud-native stacks.
              </p>
            </div>

            <div className="tech-grid" data-stagger>
              {TECH.map((t) => (
                <div className="tech-item" key={t.category}>
                  <div className="tech-category">{t.category}</div>
                  <div className="tech-list">{t.list}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact / Stats — gauges that rev up as you scroll */}
      <section className="stats" id="impact" ref={statsRef} aria-label="Impact by the numbers">
        <div className="stats-bg" aria-hidden="true">
          <span className="blob sblob-1" />
          <span className="blob sblob-2" />
          <span className="blob sblob-3" />
        </div>
        <div className="stats-grid" aria-hidden="true" />

        <div className="container">
          <div className="stats-inner">
            {STATS.map((s, i) => (
              <div className="stat" key={s.label}>
                <div className="gauge">
                  <svg
                    className="gauge-svg"
                    viewBox="0 0 120 100"
                    role="img"
                    aria-label={`${statFmt(s, s.target)}${s.suffix} — ${s.label}`}
                  >
                    <defs>
                      <linearGradient id={`gaugeGrad${i}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#2563eb" />
                        <stop offset="0.55" stopColor="#6366f1" />
                        <stop offset="1" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <path className="gauge-track" d={TRACK_D} />
                    <path
                      className="gauge-fill"
                      d={TRACK_D}
                      style={{
                        stroke: `url(#gaugeGrad${i})`,
                        strokeDasharray: ARC_LEN,
                        strokeDashoffset: ARC_LEN,
                      }}
                    />
                    <g className="gauge-ticks">
                      {TICKS.map((t, i) => (
                        <line
                          key={i}
                          className={t.major ? 'gauge-tick major' : 'gauge-tick'}
                          x1={t.ox.toFixed(2)}
                          y1={t.oy.toFixed(2)}
                          x2={t.ix.toFixed(2)}
                          y2={t.iy.toFixed(2)}
                        />
                      ))}
                    </g>
                    <g className="needle-rot">
                      <path className="gauge-needle" d="M57.9 60 L60 21 L62.1 60 Z" />
                    </g>
                    <circle className="gauge-hub" cx="60" cy="60" r="5" />
                    <circle className="gauge-hub-dot" cx="60" cy="60" r="1.9" />
                  </svg>
                  <div className="gauge-readout">
                    <span className="stat-value">
                      <span className="num">{statFmt(s, s.from)}</span>
                      <span className="suffix">{s.suffix}</span>
                    </span>
                  </div>
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section" id="projects" aria-label="Featured projects">
        <div className="container">
          <div className="section-header reveal">
            <p className="kicker">Selected work</p>
            <h2 className="section-title">Featured projects</h2>
            <p className="section-subtitle">
              Key contributions across different industries and technical challenges.
            </p>
          </div>

          <div className="projects-grid" data-stagger>
            {PROJECTS.map((p) => (
              <article className="project-card" key={p.title}>
                <p className="project-company">{p.company}</p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-description">{p.description}</p>
                <div className="project-stack">
                  {p.stack.map((tag) => (
                    <span className="stack-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section" id="experience" aria-label="Professional experience">
        <div className="container">
          <div className="section-header reveal">
            <p className="kicker">Career</p>
            <h2 className="section-title">Professional journey</h2>
            <p className="section-subtitle">Progression across leading companies.</p>
          </div>

          <div className="timeline">
            <div className="timeline-line" aria-hidden="true">
              <span className="fill" />
            </div>
            {EXPERIENCE.map((e) => (
              <div className="timeline-item" key={`${e.company}-${e.date}`}>
                <span className="timeline-dot" aria-hidden="true" />
                <div className="timeline-content">
                  <span className="timeline-date">{e.date}</span>
                  <h3 className="experience-title">{e.title}</h3>
                  <p className="experience-company">{e.company}</p>
                  <p className="experience-desc">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section" id="contact" aria-label="Contact">
        <div className="container">
          <div className="section-header reveal">
            <p className="kicker">Contact</p>
            <h2 className="section-title">Let's connect</h2>
            <p className="section-subtitle">
              Open to new collaborations, mentoring, and consulting opportunities.
            </p>
          </div>

          <div className="contact-card reveal">
            <p className="contact-intro">
              I'm always interested in discussing new opportunities, technical challenges, and
              innovative projects. The fastest way to reach me is email.
            </p>
            <div className="contact-links">
              <a className="contact-link" href="mailto:victor.fontana.saez@gmail.com">
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                victor.fontana.saez@gmail.com
              </a>
              <a
                className="contact-link"
                href="https://linkedin.com/in/victorfsaez"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                linkedin.com/in/victorfsaez
              </a>
              <a
                className="contact-link"
                href="https://github.com/vfsaez"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                github.com/vfsaez
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        © {2026} Victor Saez · Built with React &amp; GSAP
      </footer>
    </div>
  );
};
