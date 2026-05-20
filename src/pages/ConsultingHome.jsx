import { useState } from 'react';
import '../consulting.css';

export default function ConsultingHome() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', role: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="consulting-page">

      {/* NAV */}
      <nav className="c-nav">
        <a href="#" className="c-nav-logo">Coherence<span>.</span></a>
        <ul className="c-nav-links">
          <li><a href="#problem">The Problem</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#science">The Research</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#contact">Start Here</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="c-hero">
        <div className="c-hero-left">
          <div className="c-hero-eyebrow">Strategic Design &amp; Technology Consulting</div>
          <h1>Your team is <em>drowning</em> in features they'll never use.</h1>
          <p className="c-hero-body">
            Every quarter, your software vendors ship dozens of new capabilities. Your team ignores most of them — or worse, struggles through them. That confusion is costing you more than you think. We help mid-market companies stop the bleeding.
          </p>
          <a href="#contact" className="c-hero-cta">Start the Conversation</a>
        </div>
        <div className="c-hero-right">
          <div className="c-stat-block">
            <div className="c-stat-number">80%</div>
            <div className="c-stat-label">of software features never achieve meaningful adoption — Pendo, 2024</div>
          </div>
          <div className="c-stat-block">
            <div className="c-stat-number">40%</div>
            <div className="c-stat-label">of available enterprise features are ever actually used — industry research</div>
          </div>
          <div className="c-stat-block">
            <div className="c-stat-number">$—</div>
            <div className="c-stat-label">hidden cost of training time, support tickets, and churn you're not tracking</div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="c-section c-problem" id="problem">
        <div className="c-problem-grid">
          <div>
            <div className="c-section-label">The Problem</div>
            <h2>Feature velocity became the wrong KPI.</h2>
            <div className="c-problem-body">
              <p>
                Software vendors have trained the market to measure success by how much they ship.
                More features equals more value — or so the story goes.
              </p>
              <p>
                But your employees are human beings with a finite capacity for change.{' '}
                <strong>Every new feature is a new cognitive load.</strong> Every forced upgrade is another
                day of lost productivity. The tools that were supposed to accelerate your business
                are quietly exhausting the people running it.
              </p>
              <p>
                This is called <strong>change fatigue</strong> — and it has a measurable dollar cost that
                almost no one is accounting for. Microsoft called 2025 a "quality reset" year after users
                revolted against Copilot integration. Salesforce implementations fail routinely because
                every feature is shipped enabled by default. Adobe Creative Cloud is losing subscribers
                to simpler alternatives.
              </p>
              <p>
                This is your opportunity — <strong>if you can see it.</strong>
              </p>
            </div>
          </div>
          <div>
            <ul className="c-evidence-list">
              <li className="c-evidence-item">
                <div className="c-evidence-pct">↑ Churn</div>
                <div className="c-evidence-desc">
                  Adobe Creative Cloud subscribers abandoning for simpler alternatives like Affinity —
                  driven by interface complexity, not pricing
                </div>
                <div className="c-evidence-source">Market Observation, 2024–2025</div>
              </li>
              <li className="c-evidence-item">
                <div className="c-evidence-pct">Millions</div>
                <div className="c-evidence-desc">
                  Average cost of a failed Salesforce implementation — most failures attributed to
                  adoption resistance from interface overload
                </div>
                <div className="c-evidence-source">Salesforce Partner Data, 2024</div>
              </li>
              <li className="c-evidence-item">
                <div className="c-evidence-pct">6–8 mo.</div>
                <div className="c-evidence-desc">
                  Typical time employees spend avoiding or working around a new enterprise tool before
                  management notices the non-adoption
                </div>
                <div className="c-evidence-source">Change Management Research</div>
              </li>
              <li className="c-evidence-item">
                <div className="c-evidence-pct">"Reset"</div>
                <div className="c-evidence-desc">
                  Microsoft's own word for what they had to do in 2025 after Windows 11 and Copilot
                  feature overload destroyed user trust
                </div>
                <div className="c-evidence-source">Microsoft Internal Announcement, 2025</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="c-section" id="services">
        <div className="c-services-intro">
          <div className="c-section-label">Services</div>
          <h2>Three ways we work together.</h2>
          <p>
            Whether you're navigating a platform rollout, rethinking your software stack, or trying to
            understand why adoption is stalling — we have a structured engagement for you.
          </p>
        </div>
        <div className="c-services-grid">
          <div className="c-service-card">
            <span className="c-service-num">01</span>
            <div className="c-service-title">The Feature Audit</div>
            <p className="c-service-desc">
              We map every tool and feature your organization currently licenses, measure actual
              adoption rates, and calculate the true cost of what's being ignored. The result is a
              clear picture of where money is evaporating — and what to do about it.
            </p>
            <ul className="c-service-items">
              <li>Software stack inventory</li>
              <li>Adoption rate measurement</li>
              <li>Hidden cost calculation</li>
              <li>Priority rationalization map</li>
              <li>Executive-ready findings report</li>
            </ul>
          </div>
          <div className="c-service-card">
            <span className="c-service-num">02</span>
            <div className="c-service-title">Change Coherence Planning</div>
            <p className="c-service-desc">
              Before your next platform rollout, tool migration, or AI implementation, we build you a
              change plan that accounts for human cognitive limits — not just technical timelines. We
              help you phase, sequence, and frame change so people can actually absorb it.
            </p>
            <ul className="c-service-items">
              <li>Rollout sequencing strategy</li>
              <li>Cognitive load mapping</li>
              <li>Stakeholder communication architecture</li>
              <li>Adoption milestone tracking</li>
              <li>Facilitator playbooks</li>
            </ul>
          </div>
          <div className="c-service-card">
            <span className="c-service-num">03</span>
            <div className="c-service-title">Leadership Advisory</div>
            <p className="c-service-desc">
              Ongoing strategic counsel for technology and operations leaders navigating accelerating
              change. We become your sounding board for vendor decisions, tooling strategy, and
              organizational design — before the cost of a wrong move becomes visible.
            </p>
            <ul className="c-service-items">
              <li>Monthly strategy sessions</li>
              <li>Vendor evaluation support</li>
              <li>Technology roadmap review</li>
              <li>Team readiness assessment</li>
              <li>On-call advisory access</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SCIENCE */}
      <section className="c-section c-science" id="science">
        <div className="c-science-layout">
          <div className="c-science-intro">
            <div className="c-section-label">The Research</div>
            <h2>This isn't intuition. It's documented science.</h2>
            <p>
              Feature fatigue and cognitive overload aren't feelings — they're measurable,
              peer-reviewed phenomena with direct business consequences. Here's what the research says.
            </p>
            <div className="c-divider">
              <div className="c-divider-inner">Key Studies</div>
            </div>
            <p>
              The science is clear: when software complexity outpaces cognitive capacity, users
              disengage, resist, and eventually abandon. The question isn't whether this is happening
              in your organization — it's how much it's costing you.
            </p>
          </div>
          <div className="c-study-cards">
            <div className="c-study-card">
              <div className="c-study-title">"Feature Fatigue" — Technology Overload in the Workplace</div>
              <div className="c-study-finding">
                When technology is too complex for a given task, system feature overload arises.
                Complex software design can cause "feature fatigue" or "feature creep" — conditions
                that affect human cognition negatively, slow system usability, and reduce employee
                productivity.
              </div>
              <div className="c-study-meta">Sage Journals — Systematic Review, 2022</div>
            </div>
            <div className="c-study-card">
              <div className="c-study-title">System Function Overload &amp; User Fatigue</div>
              <div className="c-study-finding">
                The accumulation of complex system features elevates cognitive and operational demands,
                fostering frustration. Research confirms this drives behavioral responses including
                discontinuous usage and active avoidance — even when users need the tool to do their job.
              </div>
              <div className="c-study-meta">ScienceDirect — SOR Framework Study, 2025</div>
            </div>
            <div className="c-study-card">
              <div className="c-study-title">Digital Fatigue as a Managerial Challenge</div>
              <div className="c-study-finding">
                A cross-sectional study of 400 employees found digital fatigue and cognitive overload
                have direct, measurable impact on employee performance — and that workload management
                (not more training) is the primary moderating factor.
              </div>
              <div className="c-study-meta">Critical Review of Social Sciences, 2025</div>
            </div>
            <div className="c-study-card">
              <div className="c-study-title">AI Tools &amp; Choice Overload</div>
              <div className="c-study-finding">
                Despite AI being pitched as reducing effort, research shows that when users perceive
                "too many choices," AI tools can contribute to choice paralysis and increased mental
                burden — directly contradicting the efficiency promises being sold to your organization
                right now.
              </div>
              <div className="c-study-meta">PMC / NIH — Cognitive Cost of AI Study, 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="c-section" id="process">
        <div className="c-section-label">How We Work</div>
        <h2>A diagnostic-first approach.</h2>
        <div className="c-process-steps">
          <div className="c-step">
            <span className="c-step-num">01</span>
            <div className="c-step-title">Discovery</div>
            <p className="c-step-desc">
              We map your current software landscape — every tool, license, and rollout in the last
              18 months. We interview key stakeholders and frontline users to understand where
              friction lives.
            </p>
            <div className="c-step-deliverable">→ Deliverable: Discovery Report</div>
          </div>
          <div className="c-step">
            <span className="c-step-num">02</span>
            <div className="c-step-title">Diagnostic</div>
            <p className="c-step-desc">
              We measure actual feature adoption rates, calculate the cost of unused licenses and
              abandoned tools, and identify the specific patterns creating the most drag on your team.
            </p>
            <div className="c-step-deliverable">→ Deliverable: Cost-Impact Analysis</div>
          </div>
          <div className="c-step">
            <span className="c-step-num">03</span>
            <div className="c-step-title">Articulation</div>
            <p className="c-step-desc">
              We translate findings into business language your leadership can act on — not UX jargon,
              not IT acronyms. A clear picture of what's broken and what it's costing you.
            </p>
            <div className="c-step-deliverable">→ Deliverable: Executive Briefing</div>
          </div>
          <div className="c-step">
            <span className="c-step-num">04</span>
            <div className="c-step-title">Prescription</div>
            <p className="c-step-desc">
              A prioritized, phased roadmap for rationalization, coherent rollout, and sustainable
              adoption — built around your team's actual capacity to absorb change without burning out.
            </p>
            <div className="c-step-deliverable">→ Deliverable: Coherence Roadmap</div>
          </div>
        </div>
      </section>

      {/* CALLOUT BANNER */}
      <div className="c-callout">
        <div className="c-callout-text">
          "You shipped X features last year. Your team actively uses{' '}
          <em>Y percent</em> of them. Here's what that gap costs you."
        </div>
        <a href="#contact" className="c-callout-cta">Get Your Audit</a>
      </div>

      {/* WHO IT'S FOR */}
      <section className="c-section">
        <div className="c-section-label">Who We Serve</div>
        <h2>Built for mid-market leaders who feel the friction.</h2>
        <div className="c-audience-grid">
          <div className="c-audience-card">
            <span className="c-audience-icon">⬡</span>
            <div className="c-audience-title">Operations Leaders</div>
            <p className="c-audience-desc">
              You're responsible for making the tools work — but you keep inheriting implementations
              that weren't designed around how your team actually works. We help you right-size the
              stack and build a rollout strategy that sticks.
            </p>
          </div>
          <div className="c-audience-card">
            <span className="c-audience-icon">⬡</span>
            <div className="c-audience-title">Technology Executives</div>
            <p className="c-audience-desc">
              You're being sold the next AI platform, the next enterprise suite, the next must-have
              integration. We help you evaluate vendor promises against organizational reality —
              before the contract is signed.
            </p>
          </div>
          <div className="c-audience-card">
            <span className="c-audience-icon">⬡</span>
            <div className="c-audience-title">HR &amp; People Leaders</div>
            <p className="c-audience-desc">
              You're watching turnover, disengagement, and burnout rise — and nobody's connecting it
              to the constant churn of new tools and processes. We help you make the case, and build
              a better path forward.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="c-section c-contact" id="contact">
        <div>
          <div className="c-section-label">Start Here</div>
          <h2>Let's find out what feature fatigue is costing you.</h2>
          <p className="c-contact-body">
            The first conversation is a diagnostic call — no pitch deck, no proposal. We ask
            questions, you describe the friction, and together we figure out whether there's a fit.
            Most engagements begin with a Feature Audit.
          </p>
          <p className="c-contact-location">
            Indianapolis, Indiana — serving mid-market companies nationally
          </p>
        </div>
        <div>
          {submitted ? (
            <div className="c-form-success">
              <h3>Message received.</h3>
              <p>
                We'll be in touch within one business day to schedule your diagnostic call.
              </p>
            </div>
          ) : (
            <form className="c-contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Work email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company name"
                value={form.company}
                onChange={handleChange}
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="" disabled>What's your role?</option>
                <option value="ops">Operations Leader</option>
                <option value="tech">Technology Executive (CTO / CIO / VP Eng)</option>
                <option value="hr">HR / People Leader</option>
                <option value="ceo">CEO / Founder</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="message"
                placeholder="Briefly describe the friction your team is feeling with technology right now..."
                value={form.message}
                onChange={handleChange}
              />
              <button type="submit" className="c-form-submit">
                Request a Diagnostic Call
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="c-footer">
        <div className="c-footer-logo">Coherence.</div>
        <div className="c-footer-copy">© 2026 — Clarity in the Age of Too Much</div>
      </footer>

    </div>
  );
}
