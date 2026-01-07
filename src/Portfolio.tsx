import React from 'react';

export const Portfolio: React.FC = () => {
  React.useEffect(() => {
    // Add portfolio-specific styles
    const style = document.createElement('style');
    style.textContent = portfolioStyles;
    document.head.appendChild(style);

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // Navigation scroll effect
    const handleScroll = () => {
      const nav = document.querySelector('.nav');
      if (nav) {
        if (window.scrollY > 50) {
          (nav as HTMLElement).style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
          (nav as HTMLElement).style.background = 'rgba(15, 23, 42, 0.9)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Smooth scroll for navigation links
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          const offsetTop = (element as HTMLElement).offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Cleanup on unmount
    return () => {
      document.head.removeChild(style);
      window.removeEventListener('scroll', handleScroll);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="nav" aria-label="Main navigation">
        <div className="nav-content">
          <div className="logo" aria-label="Victor Saez portfolio logo">victorsaez.dev</div>
          <ul className="nav-links" role="menubar" aria-label="Main menu">
            <li role="menuitem"><a href="#about" aria-label="Navigate to About section">About</a></li>
            <li role="menuitem"><a href="#projects" aria-label="Navigate to Projects section">Projects</a></li>
            <li role="menuitem"><a href="#experience" aria-label="Navigate to Experience section">Experience</a></li>
            <li role="menuitem"><a href="#contact" aria-label="Navigate to Contact section">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" aria-label="Hero introduction">
        <div className="container">
          <div className="hero-content">
            <p className="hero-subtitle" aria-label="Job title">Senior Software Engineer & Tech Lead</p>
            <h1 className="hero-title" aria-label="Main heading">Hi, I'm Victor — building scalable systems across Finance, HealthTech, and E-commerce.</h1>
            <p className="hero-description" aria-label="Professional summary">
              Over 8 years of experience architecting cloud-native backends, leading dev teams, and solving complex engineering challenges with Java, Python, Node.js, and distributed systems.
            </p>
            <div className="cta-buttons" aria-label="Call to action buttons">
              <a href="#projects" className="btn btn-primary" aria-label="View my portfolio projects">View My Work</a>
              <a href="#contact" className="btn btn-secondary" aria-label="Get in touch with me">Get In Touch</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section" aria-label="About me section">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title" aria-label="About me heading">About Me</h2>
            <p className="section-subtitle" aria-label="About me subtitle">Passionate about designing resilient systems and mentoring teams</p>
          </div>

          <div className="about-content">
            <div className="fade-in-up">
              <p className="about-text" aria-label="Professional description">
                I'm a backend-focused software engineer passionate about designing resilient systems, mentoring teams, and shipping business-critical features.
              </p>
              <p className="about-text" aria-label="Educational background and experience">
                With a strong foundation in Computer Engineering and Computer Science from UNICAMP, I've led and contributed to projects across regulated industries — from banking and healthcare to retail — delivering impact in high-availability environments using modern cloud-native stacks.
              </p>
            </div>

            <div className="fade-in-up">
              <div className="tech-grid" aria-label="Technical skills grid">
                <div className="tech-item" aria-label="Backend technologies" style={{ '--item-index': 0 } as React.CSSProperties}>
                  <div className="tech-category">Backend</div>
                  <div className="tech-list">Java, Python, Node.js</div>
                </div>
                <div className="tech-item" aria-label="Architecture patterns" style={{ '--item-index': 1 } as React.CSSProperties}>
                  <div className="tech-category">Architecture</div>
                  <div className="tech-list">Microservices, DDD</div>
                </div>
                <div className="tech-item" aria-label="Messaging technologies" style={{ '--item-index': 2 } as React.CSSProperties}>
                  <div className="tech-category">Messaging</div>
                  <div className="tech-list">Kafka, RabbitMQ</div>
                </div>
                <div className="tech-item" aria-label="Database technologies" style={{ '--item-index': 3 } as React.CSSProperties}>
                  <div className="tech-category">Data</div>
                  <div className="tech-list">PostgreSQL, MongoDB, Redis</div>
                </div>
                <div className="tech-item" aria-label="Cloud platforms" style={{ '--item-index': 4 } as React.CSSProperties}>
                  <div className="tech-category">Cloud</div>
                  <div className="tech-list">AWS, Azure</div>
                </div>
                <div className="tech-item" aria-label="DevOps tools" style={{ '--item-index': 5 } as React.CSSProperties}>
                  <div className="tech-category">DevOps</div>
                  <div className="tech-list">Kubernetes, Terraform</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section" aria-label="Featured projects section">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title" aria-label="Featured projects heading">Featured Projects</h2>
            <p className="section-subtitle" aria-label="Projects description">Key contributions across different industries and technical challenges</p>
          </div>

          <div className="projects-grid" aria-label="Projects showcase grid">
            <div className="project-card fade-in-up" aria-label="HIPAA-Compliant Logging Pipeline project" style={{ '--card-index': 0 } as React.CSSProperties}>
              <div className="project-header">
                <div>
                  <h3 className="project-title">HIPAA-Compliant Logging Pipeline</h3>
                  <p className="project-company" aria-label="Company and duration">Luma Health • 2022–2023</p>
                </div>
              </div>
              <p className="project-description" aria-label="Project description">
                Refactored the platform's logging architecture to reduce system-wide storage and processing costs by 70%.
                Resolved concurrency bugs affecting 100k+ daily job executions.
                Designed and implemented FHIR-compliant bidirectional form sync across 80+ EHR systems.
              </p>
              <div className="project-stack" aria-label="Technology stack used">
                <span className="stack-tag" aria-label="Node.js technology">Node.js</span>
                <span className="stack-tag" aria-label="TypeScript technology">TypeScript</span>
                <span className="stack-tag" aria-label="RabbitMQ technology">RabbitMQ</span>
                <span className="stack-tag" aria-label="Redis technology">Redis</span>
                <span className="stack-tag" aria-label="MongoDB technology">MongoDB</span>
                <span className="stack-tag" aria-label="Kubernetes technology">Kubernetes</span>
                <span className="stack-tag" aria-label="AWS technology">AWS</span>
              </div>
            </div>

            <div className="project-card fade-in-up" aria-label="Smart Locker Delivery System project" style={{ '--card-index': 1 } as React.CSSProperties}>
              <div className="project-header">
                <div>
                  <h3 className="project-title">Smart Locker Delivery System</h3>
                  <p className="project-company" aria-label="Company and duration">Stoom • 2019–2021</p>
                </div>
              </div>
              <p className="project-description" aria-label="Project description">
                Designed a Smart Locker delivery platform integrated with physical hardware for secure pickup.
                Server-side logic in Python (Django) optimized container allocation using order data.
                Built the client interface in React running on embedded hardware.
              </p>
              <div className="project-stack" aria-label="Technology stack used">
                <span className="stack-tag" aria-label="Python technology">Python</span>
                <span className="stack-tag" aria-label="Django technology">Django</span>
                <span className="stack-tag" aria-label="React technology">React</span>
                <span className="stack-tag" aria-label="PostgreSQL technology">PostgreSQL</span>
                <span className="stack-tag" aria-label="Shell Scripts technology">Shell Scripts</span>
              </div>
            </div>

            <div className="project-card fade-in-up" aria-label="Hybrid Cloud Modernization project" style={{ '--card-index': 2 } as React.CSSProperties}>
              <div className="project-header">
                <div>
                  <h3 className="project-title">Hybrid Cloud Modernization</h3>
                  <p className="project-company" aria-label="Company and duration">Bradesco • 2024–Now</p>
                </div>
              </div>
              <p className="project-description" aria-label="Project description">
                Leading legacy-to-cloud modernization efforts for a national-scale credit card application.
                Built secure APIs and robust services in a hybrid Azure + On-Premises environment.
                Delivered full-stack features using Java, Node.js, and React.
              </p>
              <div className="project-stack" aria-label="Technology stack used">
                <span className="stack-tag" aria-label="Java technology">Java</span>
                <span className="stack-tag" aria-label="Node.js technology">Node.js</span>
                <span className="stack-tag" aria-label="React technology">React</span>
                <span className="stack-tag" aria-label="Azure technology">Azure</span>
                <span className="stack-tag" aria-label="Microservices technology">Microservices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section" aria-label="Professional experience section">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title" aria-label="Professional journey heading">Professional Journey</h2>
            <p className="section-subtitle" aria-label="Experience description">Career progression across leading companies</p>
          </div>

          <div className="timeline" aria-label="Professional experience timeline">
            <div className="timeline-item fade-in-up" aria-label="Sydecar experience">
              <div className="timeline-content">
                <div className="timeline-date" aria-label="Employment period">2025 - Present</div>
                <h3 className="experience-title">Senior Software Engineer</h3>
                <p className="experience-company" aria-label="Company name">Sydecar, Inc.</p>
                <p aria-label="Role description">Leading development of scalable fintech infrastructure and investment platform solutions.</p>
              </div>
            </div>

            <div className="timeline-item fade-in-up" aria-label="Bradesco experience">
              <div className="timeline-content">
                <div className="timeline-date" aria-label="Employment period">2024 - 2025</div>
                <h3 className="experience-title">Senior Software Engineer</h3>
                <p className="experience-company" aria-label="Company name">Banco Bradesco</p>
                <p aria-label="Role description">Leading modernization of legacy systems to cloud-native architecture.</p>
              </div>
            </div>

            <div className="timeline-item fade-in-up" aria-label="Luma Health experience">
              <div className="timeline-content">
                <div className="timeline-date" aria-label="Employment period">2022 - 2023</div>
                <h3 className="experience-title">Senior Backend Engineer</h3>
                <p className="experience-company" aria-label="Company name">Luma Health</p>
                <p aria-label="Role description">Architected HIPAA-compliant systems and optimized healthcare data processing.</p>
              </div>
            </div>

            <div className="timeline-item fade-in-up" aria-label="Stoom Tech Lead experience">
              <div className="timeline-content">
                <div className="timeline-date" aria-label="Employment period">2020 - 2021</div>
                <h3 className="experience-title">Tech Lead</h3>
                <p className="experience-company" aria-label="Company name">Stoom</p>
                <p aria-label="Role description">Led development of IoT-integrated e-commerce delivery solutions.</p>
              </div>
            </div>

            <div className="timeline-item fade-in-up" aria-label="Stoom Backend Developer experience">
              <div className="timeline-content">
                <div className="timeline-date" aria-label="Employment period">2018 - 2020</div>
                <h3 className="experience-title">Backend Developer</h3>
                <p className="experience-company" aria-label="Company name">Stoom</p>
                <p aria-label="Role description">Developed scalable backend services for retail and logistics platforms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" aria-label="Contact information section">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="section-title" aria-label="Contact heading">Let's Connect</h2>
            <p className="section-subtitle" aria-label="Contact description">Open to new collaborations, mentoring, and consulting opportunities</p>
          </div>

          <div className="contact fade-in-up" aria-label="Contact information card">
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }} aria-label="Contact introduction">
              I'm always interested in discussing new opportunities, technical challenges, and innovative projects.
            </p>

            <div className="contact-links" aria-label="Contact links">
              <a href="mailto:victor.fontana.saez@gmail.com" className="contact-link" aria-label="Send email to victor.fontana.saez@gmail.com">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                victor.fontana.saez@gmail.com
              </a>

              <a href="https://linkedin.com/in/victorfsaez" className="contact-link" target="_blank" aria-label="Visit Victor's LinkedIn profile">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                linkedin.com/in/victorfsaez
              </a>

              <a href="https://github.com/vfsaez" className="contact-link" target="_blank" aria-label="Visit Victor's GitHub profile">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                </svg>
                github.com/vfsaez
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const portfolioStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    /* Core Colors - Dark theme with improved contrast */
    --background: hsl(220, 27%, 8%);
    --surface: hsl(220, 20%, 11%);
    --surface-elevated: hsl(220, 16%, 14%);
    --foreground: hsl(220, 15%, 25%);
    --foreground-muted: hsl(220, 10%, 45%);

    /* Brand Colors */
    --primary: hsl(220, 91%, 54%);
    --primary-hover: hsl(220, 91%, 58%);
    --primary-foreground: hsl(220, 27%, 8%);

    /* Accent Colors */
    --accent: hsl(47, 96%, 58%);
    --accent-hover: hsl(47, 96%, 62%);
    --accent-foreground: hsl(220, 27%, 8%);

    /* UI Colors */
    --card: hsl(220, 16%, 14%);
    --card-foreground: hsl(210, 40%, 98%);
    --border: hsl(220, 20%, 20%);
    --input: hsl(220, 20%, 16%);
    --ring: hsl(220, 91%, 54%);

    /* Status Colors */
    --success: hsl(142, 76%, 48%);
    --warning: hsl(38, 92%, 58%);
    --error: hsl(0, 84%, 68%);

    /* Gradients */
    --gradient-primary: linear-gradient(135deg, hsl(220, 91%, 54%), hsl(220, 91%, 46%));
    --gradient-accent: linear-gradient(135deg, hsl(47, 96%, 58%), hsl(38, 92%, 58%));
    --gradient-surface: linear-gradient(135deg, hsl(220, 16%, 14%), hsl(220, 20%, 11%));

    /* Shadows */
    --shadow-sm: 0 4px 8px 0 rgba(59, 130, 246, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(100, 100, 100, 0.06);
    --shadow-md: 0 12px 24px -4px rgba(59, 130, 246, 0.25), 0 6px 12px -2px rgba(0, 0, 0, 0.12), 0 3px 6px -1px rgba(80, 80, 80, 0.08);
    --shadow-lg: 0 20px 40px -6px rgba(59, 130, 246, 0.3), 0 10px 20px -4px rgba(0, 0, 0, 0.18), 0 5px 10px -2px rgba(120, 120, 120, 0.1);
    --shadow-xl: 0 40px 80px -12px rgba(59, 130, 246, 0.35), 0 20px 40px -8px rgba(0, 0, 0, 0.25), 0 10px 20px -4px rgba(150, 150, 150, 0.12);

    /* Glass Effect */
    --glass-bg: hsla(220, 16%, 14%, 0.8);
    --glass-border: hsla(220, 20%, 20%, 0.5);

    /* Legacy mappings for compatibility */
    --text: var(--foreground);
    --text-muted: var(--foreground-muted);
    --radius: 0.75rem;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9)),
                radial-gradient(ellipse 800px 600px at 5% 10%, rgba(65, 105, 225, 0.4), transparent 70%),
                radial-gradient(ellipse 600px 400px at 95% 90%, rgba(100, 149, 237, 0.3), transparent 60%),
                radial-gradient(ellipse 700px 500px at 20% 80%, rgba(123, 170, 207, 0.35), transparent 65%),
                radial-gradient(ellipse 500px 800px at 80% 15%, rgba(106, 137, 204, 0.32), transparent 55%),
                radial-gradient(ellipse 400px 300px at 60% 40%, rgba(30, 64, 175, 0.25), transparent 50%),
                radial-gradient(ellipse 900px 700px at 15% 35%, rgba(0, 0, 0, 0.15), transparent 65%),
                radial-gradient(ellipse 700px 500px at 85% 65%, rgba(50, 50, 50, 0.12), transparent 55%),
                radial-gradient(ellipse 500px 400px at 65% 15%, rgba(120, 120, 120, 0.08), transparent 45%),
                radial-gradient(ellipse 600px 300px at 10% 80%, rgba(80, 80, 80, 0.1), transparent 50%),
                radial-gradient(ellipse 400px 600px at 90% 20%, rgba(40, 40, 40, 0.09), transparent 40%),
                radial-gradient(ellipse 300px 200px at 40% 90%, rgba(160, 160, 160, 0.06), transparent 35%),
                #ffffff;
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
    text-shadow: -1px -1px 2px rgba(255, 255, 255, 0.8), -2px -2px 4px rgba(255, 255, 255, 0.6), -3px -3px 6px rgba(255, 255, 255, 0.4);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* Navigation */
  .nav {
    position: fixed;
    top: 0;
    width: 100%;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--glass-border);
    z-index: 1000;
    transition: all 0.3s ease;
  }

  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(90deg, #ffffff, #f8f9fa, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: all 0.3s ease;
    animation: subtle-pulse 3s ease-in-out infinite;
    text-shadow: none;
  }

  .logo:hover {
    background: linear-gradient(90deg, #e0f2fe, #b3e5fc, #e0f2fe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .nav-links a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
    text-shadow: none;
  }

  .nav-links a:hover {
    color: var(--primary);
  }

  /* Hero Section */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
    padding-top: 80px;
  }

  .hero-content {
    max-width: 800px;
    animation: slideInUp 1s ease-out;
  }

  .hero-subtitle {
    color: var(--primary);
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 1rem;
    animation: fadeIn 1s ease-out 0.2s both;
  }

  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeIn 1s ease-out 0.4s both;
    text-shadow: -0.5px -0.5px 1px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.2);
  }

  .hero-description {
    font-size: 1.25rem;
    color: var(--text-muted);
    margin-bottom: 2.5rem;
    animation: fadeIn 1s ease-out 0.6s both;
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    animation: fadeIn 1s ease-out 0.8s both;
  }

  .btn {
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-primary {
    background:
      radial-gradient(ellipse at 20% 30%, rgba(255, 255, 255, 0.3), transparent 60%),
      radial-gradient(ellipse at 80% 70%, rgba(240, 248, 255, 0.4), transparent 50%),
      radial-gradient(ellipse at 60% 10%, rgba(248, 250, 252, 0.25), transparent 40%),
      var(--gradient-primary);
    color: var(--primary-foreground);
    border: 2px solid transparent;
    text-shadow: none;
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, rgba(135, 206, 250, 0.9), rgba(176, 224, 230, 0.95));
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .btn-secondary {
    background: transparent;
    color: var(--text);
    border: 2px solid var(--border);
  }

  .btn-secondary:hover {
    border-color: rgba(135, 206, 250, 0.8);
    color: rgba(135, 206, 250, 1);
    background: rgba(135, 206, 250, 0.1);
    transform: translateY(-2px);
  }

  /* Section Styling */
  .section {
    padding: 5rem 0;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text);
    text-shadow: -2px -2px 4px rgba(255, 255, 255, 0.9), -4px -4px 8px rgba(255, 255, 255, 0.7), -6px -6px 12px rgba(255, 255, 255, 0.5);
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
  }

  /* About Section */
  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .about-text {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-muted);
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }

  .tech-item {
    background:
      radial-gradient(ellipse at 25% 20%, rgba(200, 200, 200, 0.15), transparent 50%),
      radial-gradient(ellipse at 75% 80%, rgba(180, 180, 180, 0.12), transparent 40%),
      radial-gradient(ellipse at 50% 60%, rgba(220, 220, 220, 0.08), transparent 35%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.9), rgba(255, 255, 255, 0.7));
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    padding: 1rem;
    border-radius: var(--radius);
    text-align: center;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
    animation: gentle-bounce 4s ease-in-out infinite;
    animation-delay: calc(var(--item-index, 0) * 0.2s);
  }

  .tech-item:hover {
    border-color: rgba(135, 206, 250, 0.6);
    background: radial-gradient(ellipse 67% 67% at center, rgba(224, 242, 254, 0.2), rgba(186, 230, 253, 0.15), rgba(135, 206, 250, 0.1));
    transform: translateY(-2px) scale(1.05);
    box-shadow: var(--shadow-xl);
  }

  .tech-category {
    font-size: 0.9rem;
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .tech-list {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  /* Projects Section */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background:
      radial-gradient(ellipse at 15% 25%, rgba(160, 160, 160, 0.18), transparent 55%),
      radial-gradient(ellipse at 85% 75%, rgba(140, 140, 140, 0.14), transparent 45%),
      radial-gradient(ellipse at 60% 10%, rgba(190, 190, 190, 0.1), transparent 40%),
      radial-gradient(ellipse at 30% 90%, rgba(170, 170, 170, 0.12), transparent 35%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(252, 252, 252, 0.95), rgba(248, 250, 252, 0.85));
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: var(--radius);
    padding: 2rem;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    animation: float 6s ease-in-out infinite;
    animation-delay: calc(var(--card-index, 0) * 0.5s);
  }

  .project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .project-card:hover::before {
    background: var(--gradient-accent);
    transform: scaleX(1);
  }

  .project-card:hover {
    background: radial-gradient(ellipse 67% 67% at center, rgba(224, 242, 254, 0.2), rgba(186, 230, 253, 0.15), rgba(135, 206, 250, 0.1));
    transform: translateY(-5px) scale(1.02);
    border-color: rgba(135, 206, 250, 0.6);
    box-shadow: var(--shadow-xl);
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .project-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.5rem;
    text-shadow: -1px -1px 3px rgba(255, 255, 255, 0.8), -2px -2px 6px rgba(255, 255, 255, 0.6), -3px -3px 9px rgba(255, 255, 255, 0.4);
  }

  .project-company {
    color: var(--primary);
    font-weight: 600;
    font-size: 0.9rem;
  }

  .project-description {
    color: var(--text-muted);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .project-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .stack-tag {
    background: hsla(220, 91%, 64%, 0.1);
    color: var(--primary);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid hsla(220, 91%, 64%, 0.2);
    transition: all 0.3s ease;
  }

  .stack-tag:hover {
    background: hsla(220, 91%, 64%, 0.2);
    border-color: var(--primary);
    transform: translateY(-1px);
  }

  /* Experience Timeline */
  .timeline {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: -30px;
    bottom: -30px;
    width: 4px;
    background: linear-gradient(180deg,
      transparent 0%,
      rgba(30, 64, 175, 0.1) 8%,
      rgba(30, 64, 175, 0.3) 15%,
      rgba(30, 64, 175, 0.6) 22%,
      #1e40af 28%,
      #3b82f6 50%,
      #1e40af 72%,
      rgba(30, 64, 175, 0.6) 78%,
      rgba(30, 64, 175, 0.3) 85%,
      rgba(30, 64, 175, 0.1) 92%,
      transparent 100%);
    transform: translateX(-50%);
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
  }


  .timeline {
    position: relative;
  }

  @keyframes float-dots {
    0% { transform: translateX(-50%) translateY(1px); opacity: 0.6; }
    100% { transform: translateX(-50%) translateY(-1px); opacity: 0.3; }
  }

  .timeline-item {
    display: flex;
    margin-bottom: 3rem;
    position: relative;
    align-items: center;
  }

  .timeline-item::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    background: linear-gradient(135deg, #1e40af, #3b82f6);
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 15px rgba(59, 130, 246, 0.4);
    z-index: 10;
    animation: pulse-dot 2s infinite;
  }

  @keyframes pulse-dot {
    0%, 100% {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 15px rgba(59, 130, 246, 0.4);
    }
    50% {
      box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.6);
    }
  }

  .timeline-item:nth-child(odd) {
    flex-direction: row-reverse;
  }

  .timeline-item:nth-child(odd) .timeline-content {
    margin-left: 2rem;
  }

  .timeline-item:nth-child(even) .timeline-content {
    margin-right: 2rem;
  }

  @media (max-width: 768px) {
    .timeline-item:nth-child(odd) .timeline-content,
    .timeline-item:nth-child(even) .timeline-content {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .timeline-content {
    background:
      radial-gradient(ellipse at 20% 30%, rgba(180, 180, 180, 0.16), transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(160, 160, 160, 0.12), transparent 45%),
      radial-gradient(ellipse at 50% 90%, rgba(200, 200, 200, 0.09), transparent 35%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(250, 251, 252, 0.9), rgba(245, 247, 250, 0.8));
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    padding: 1.5rem;
    padding-top: 4rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    width: calc(50% - 3rem);
    position: relative;
    transition: all 0.3s ease;
  }

  .timeline-content:hover {
    background: radial-gradient(ellipse 67% 67% at center, rgba(224, 242, 254, 0.2), rgba(186, 230, 253, 0.15), rgba(135, 206, 250, 0.1));
    box-shadow: var(--shadow-xl);
    transform: translateY(-2px) scale(1.02);
  }

  .timeline-date {
    position: absolute;
    right: 1.5rem;
    top: 1rem;
    transform: none;
    background: rgba(0, 0, 0, 0.1);
    color: black;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .experience-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 0.5rem;
    text-shadow: -1px -1px 2px rgba(255, 255, 255, 0.7), -2px -2px 4px rgba(255, 255, 255, 0.5), -3px -3px 6px rgba(255, 255, 255, 0.3);
  }

  .experience-company {
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  /* Contact Section */
  .contact {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(253, 253, 253, 0.95), rgba(250, 251, 252, 0.85));
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: var(--radius);
    padding: 3rem;
    text-align: center;
    box-shadow: var(--shadow-md);
    margin-top: 2rem;
    transition: all 0.3s ease;
  }

  .contact:hover {
    background: radial-gradient(ellipse 67% 67% at center, rgba(224, 242, 254, 0.2), rgba(186, 230, 253, 0.15), rgba(135, 206, 250, 0.1));
    box-shadow: var(--shadow-xl);
    transform: translateY(-2px) scale(1.02);
  }

  .contact-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.3s ease;
    font-weight: 500;
  }

  .contact-link:hover {
    color: var(--primary);
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes gentle-bounce {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-3px);
    }
  }

  @keyframes subtle-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.02);
      opacity: 0.9;
    }
  }

  @keyframes background-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .about-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .tech-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }

    .timeline::before {
      left: 1rem;
    }

    .timeline-item {
      flex-direction: row !important;
      margin-left: 3rem;
      align-items: flex-start;
    }

    .timeline-item::after {
      display: none;
    }

    .timeline-content {
      width: calc(100% - 3rem);
      margin-left: 0;
      margin-right: 0;
      z-index: 10;
      position: relative;
    }

    .timeline-date {
      right: 1.5rem;
      left: auto;
      top: 1rem;
      transform: none;
      transform-origin: center;
    }

    .contact-links {
      flex-direction: column;
      align-items: center;
    }

    .cta-buttons {
      flex-direction: column;
    }

    .btn {
      text-align: center;
      justify-content: center;
    }
  }

  /* Scroll animations */
  .fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }

  .fade-in-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Modern utility classes */
  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
  }

  .hover-lift {
    transition: all 0.3s ease-out;
  }

  .hover-lift:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-lg);
  }

  .text-gradient-primary {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .text-gradient-accent {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Animated gradient background */
  .bg-gradient-animated {
    background: linear-gradient(-45deg, var(--primary), var(--accent), var(--primary), var(--accent));
    background-size: 400% 400%;
    animation: gradient-shift 8s ease-in-out infinite;
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

