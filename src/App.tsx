import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import './App.css';
import ChatWidget from './components/ChatWidget';

type CVLanguage = 'tr' | 'en' | 'de';

const translations = {
  tr: {
    hero_roles: ["Intelligent Automation Architect", "Hyperautomation & AI Lead", "CoE Strategy Manager"],
    title: "İRFAN DEMİRCİOĞLU",
    role: "Intelligent Automation Architect | Hyperautomation & AI Lead",
    relocation: "Istanbul, Turkey (Mobilite: Avrupa Geneli)",
    summary_title: "🎯 PROFESYONEL ÖZET",
    summary_text: "Stratejik Akıllı Otomasyon Lideri. Akbank bünyesinde RPA Mükemmeliyet Merkezi (CoE) yönetimi, Üretken Yapay Zeka (LLM) entegrasyonu ve yüksek kapasiteli robot filolarının mimari tasarımı konularında 7+ yıl deneyim. UiPath, Azure AI ve Power Platform uzmanı.",
    experience_title: "💼 PROFESYONEL DENEYİM",
    akbank_role: "Intelligent Automation Lead & Architect",
    akbank_focus: "Stratejik Odak: Kurumsal Ölçekte Orkestrasyon, Yönetişim ve Hiper-otomasyon.",
    akbank_points: [
      "Enterprise-Scale Orchestration: Türkiye'nin en büyük özel bankalarından birinde, kritik finansal süreçleri yürüten devasa ölçekli bir otomasyon filosunun tüm yaşam döngüsünü ve mimari tasarımını yönetiyorum.",
      "High-Availability Architecture: 7/24 kesintisiz çalışması gereken misyon-kritik bankacılık işlemleri için yüksek erişilebilirlik ve felaket kurtarma standartlarında dayanıklı bir altyapı kurguladım.",
      "Hyperautomation Transformation: Geleneksel RPA süreçlerini; GenAI (LLM), Document Understanding ve Azure AI servisleri ile entegre ederek, bankanın dijital dönüşümünü 'Akıllı Otomasyon' seviyesine taşıyorum.",
      "CoE Governance & Strategy: Geliştirme standartlarını, kod güvenliği protokollerini ve operasyonel verimlilik metriklerini belirleyerek kurumsal düzeyde bir yönetişim modeli uyguluyorum."
    ],
    ntt_role: "Kıdemli Yazılım Mühendisi / RPA Danışmanı",
    ntt_points: [
      "Küresel müşteriler için UiPath ve Blue Prism kullanarak uçtan uca otomasyon çözümleri tasarlandı.",
      "Otomasyon darboğazlarını tespit etmek için Process Mining (Celonis) uygulandı ve süreç keşif süresi %40 azaltıldı.",
      "10'dan fazla kurumsal projede kullanılan standart bir 'Otomasyon Çerçevesi' oluşturuldu."
    ],
    skills_title: "🛠️ YETENEKLER",
    competencies: {
      "Mimari": ["Kurumsal RPA Tasarımı", "Çözüm Tasarım Belgesi (SDD)", "Altyapı Ölçekleme"],
      "Otomasyon": ["UiPath (Advanced)", "n8n", "Microsoft Power Automate", "Blue Prism"],
      "AI & ML": ["Azure AI Servisleri", "Document Understanding", "LLM Entegrasyonu", "Python"],
      "Geliştirme": ["Python", "SQL", ".NET", "REST APIs", "Terraform"]
    },
    education_title: "🎓 EĞİTİM",
    education_school: "SABANCI ÜNİVERSİTESİ",
    education_degree: "Mekatronik Mühendisliği Lisans (%100 Burslu)",
    lang_title: "Diller",
    lang_list: ["🇹🇷 Türkçe (Anadil)", "🇬🇧 İngilizce (C1)", "🇩🇪 Almanca (B1)"]
  },
  en: {
    hero_roles: ["Intelligent Automation Architect", "Hyperautomation & AI Lead", "CoE Strategy Manager"],
    title: "İRFAN DEMİRCİOĞLU",
    role: "Intelligent Automation Architect | Hyperautomation & AI Lead",
    relocation: "Istanbul, Turkey (Relocation: Europe-wide)",
    summary_title: "🎯 PROFESSIONAL SUMMARY",
    summary_text: "Strategic Intelligent Automation Leader with 7+ years of experience in architecting enterprise-scale ecosystems. Expert in UiPath, Azure AI, and Power Platform, focusing on Generative AI integration and large-scale robot fleet management.",
    experience_title: "💼 PROFESSIONAL EXPERIENCE",
    akbank_role: "Intelligent Automation Lead & Architect",
    akbank_focus: "Strategic Focus: Enterprise-Scale Orchestration, Governance, and Hyperautomation.",
    akbank_points: [
      "Enterprise-Scale Orchestration: Managing the lifecycle and architectural design of a massive automation fleet for critical financial processes at one of Turkey's largest private banks.",
      "High-Availability Architecture: Designed a resilient infrastructure with high-availability and disaster recovery standards for mission-critical banking operations.",
      "Hyperautomation Transformation: Integrating traditional RPA with GenAI (LLM), Document Understanding, and Azure AI services to drive digital transformation.",
      "CoE Governance & Strategy: Implementing a corporate governance model by setting development standards, security protocols, and efficiency metrics."
    ],
    ntt_role: "Senior Software Engineer / RPA Consultant",
    ntt_points: [
      "Designed end-to-end automation solutions for global clients using UiPath and Blue Prism.",
      "Implemented Process Mining to discover automation bottlenecks, reducing process discovery time by 40%.",
      "Established a standard 'Automation Framework' used across 10+ enterprise projects."
    ],
    skills_title: "🛠️ SKILLS",
    competencies: {
      "Architecture": ["Enterprise RPA Design", "Solution Design Document (SDD)", "Infrastructure Scaling"],
      "Automation Stack": ["UiPath (Advanced)", "n8n", "Microsoft Power Automate", "Blue Prism"],
      "AI & ML": ["Azure AI Services", "Document Understanding", "LLM Integration", "Python"],
      "Development": ["Python", "SQL", ".NET", "REST APIs", "Terraform"]
    },
    education_title: "🎓 EDUCATION",
    education_school: "SABANCI UNIVERSITY",
    education_degree: "B.Sc. in Mechatronics Engineering (Full Scholarship)",
    lang_title: "Languages",
    lang_list: ["🇹🇷 Turkish (Native)", "🇬🇧 English (C1)", "🇩🇪 German (B1)"]
  },
  de: {
    hero_roles: ["KI-Automatisierungsarchitekt", "Hyperautomatisierungsleiter", "CoE-Stratege"],
    title: "İRFAN DEMİRCİOĞLU",
    role: "Intelligent Automation Architect | Hyperautomation & AI Lead",
    relocation: "Istanbul, Türkei (Umzug: Europaweit)",
    summary_title: "🎯 ZUSAMMENFASSUNG",
    summary_text: "Strategischer Intelligent Automation Leader mit über 7 Jahren Erfahrung. Experte für UiPath, Azure AI ve Power Platform mit Fokus auf Hyperautomatisierung ve KI-Integration.",
    experience_title: "💼 BERUFSERFAHRUNG",
    akbank_role: "Intelligent Automation Lead & Architect",
    akbank_focus: "Strategischer Fokus: Orchestrierung, Governance ve Hyperautomatisierung.",
    akbank_points: [
      "Orchestrierung auf Unternehmensebene: Management des Lebenszyklus einer massiven Automatisierungsflotte.",
      "Hochverfügbarkeitsarchitektur: Entwicklung einer belastbaren Infrastruktur für geschäftskritische Bankgeschäfte.",
      "Hyperautomation Transformation: Integration von RPA mit GenAI (LLM) und Azure AI Services.",
      "CoE Governance & Strategie: Implementierung eines Governance-Modells für Entwicklungsstandards."
    ],
    ntt_role: "Senior Software Engineer / RPA Berater",
    ntt_points: [
      "Entwicklung von End-to-End-Automatisierungslösungen für globale Kunden.",
      "Implementierung von Process Mining zur Identifizierung von Engpässen.",
      "Etablierung eines standardisierten Frameworks für über 10 Unternehmensprojekte."
    ],
    skills_title: "🛠️ FÄHIGKEITEN",
    competencies: {
      "Architektur": ["Enterprise RPA Design", "Solution Design Document (SDD)", "Infrastruktur-Skalierung"],
      "Automatisierung": ["UiPath (Advanced)", "n8n", "Microsoft Power Automate", "Blue Prism"],
      "KI & ML": ["Azure AI Services", "Document Understanding", "LLM Integration", "Python"],
      "Entwicklung": ["Python", "SQL", ".NET", "REST APIs", "Terraform"]
    },
    education_title: "🎓 BILDUNG",
    education_school: "SABANCI UNIVERSITÄT",
    education_degree: "B.Sc. in Mechatronik (Vollstipendium)",
    lang_title: "Sprachen",
    lang_list: ["🇹🇷 Türkisch (Muttersprache)", "🇬🇧 Englisch (C1)", "🇩🇪 Deutsch (B1)"]
  }
};

const Typewriter = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % texts.length), 3000);
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'inline-block', color: 'var(--gh-link)', fontWeight: 'bold' }}
      >
        {texts[index]}
      </motion.span>
    </AnimatePresence>
  );
};

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [cvLang, setCvLang] = useState<CVLanguage>('tr');
  const [init, setInit] = useState(false);
  const t = translations[cvLang];

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  return (
    <div className="cv-container">
      {/* Dynamic Background */}
      <div id="particles-bg">
        {init && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.3 }}>
            {/* TSParticles would go here in a real impl, but using a CSS gradient/mesh for speed & stability */}
            <div className="mesh-gradient"></div>
          </div>
        )}
      </div>

      <nav className="global-lang-switcher">
        <button className={cvLang === 'tr' ? 'active' : ''} onClick={() => setCvLang('tr')}>TR</button>
        <button className={cvLang === 'en' ? 'active' : ''} onClick={() => setCvLang('en')}>EN</button>
        <button className={cvLang === 'de' ? 'active' : ''} onClick={() => setCvLang('de')}>DE</button>
      </nav>

      {/* Hero Section */}
      <motion.header 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="hero-name">{t.title}</h1>
        <div className="hero-typewriter">
          <Typewriter texts={t.hero_roles} />
        </div>
      </motion.header>

      <main className="cv-content">
        <div className="main-col">
          <FadeInSection>
            <section className="resume-section">
              <div className="readme-body">
                <header className="resume-header">
                  <p className="lead-text"><strong>{t.role}</strong></p>
                  <div className="contact-bar">
                    <span>📍 {t.relocation}</span><br/>
                    <span>📧 <a href="mailto:demircioglu.irfan@outlook.com">demircioglu.irfan@outlook.com</a></span> | 
                    <span> 🔗 <a href="https://linkedin.com/in/irfandemircioglu/">linkedin</a></span>
                  </div>
                </header>
                <hr />
                <div className="content-block">
                  <h2>{t.summary_title}</h2>
                  <p>{t.summary_text}</p>
                </div>
              </div>
            </section>
          </FadeInSection>

          <FadeInSection>
            <section className="resume-section" style={{ marginTop: '24px' }}>
              <div className="readme-body">
                <h2>{t.experience_title}</h2>
                <div className="experience-item">
                  <div className="exp-header">
                    <h3>AKBANK <span className="job-title">| {t.akbank_role}</span></h3>
                    <span className="date">Dec 2022 – Present</span>
                  </div>
                  <p className="exp-focus">{t.akbank_focus}</p>
                  <ul>
                    {t.akbank_points.map((point, i) => <li key={i}>{point}</li>)}
                  </ul>
                </div>
                <div className="experience-item">
                  <div className="exp-header">
                    <h3>NTT DATA <span className="job-title">| {t.ntt_role}</span></h3>
                    <span className="date">2021 – 2022</span>
                  </div>
                  <ul>
                    {t.ntt_points.map((point, i) => <li key={i}>{point}</li>)}
                  </ul>
                </div>
              </div>
            </section>
          </FadeInSection>
        </div>

        <aside className="side-col">
          <FadeInSection>
            <div className="side-section">
              <h3 className="side-title">{t.skills_title}</h3>
              {Object.entries(t.competencies).map(([cat, list]) => (
                <div key={cat} className="skill-group">
                  <h4>{cat}</h4>
                  <div className="skill-tags">
                    {list.map(s => <span key={s} className="tag">{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="side-section">
              <h3 className="side-title">{t.lang_title}</h3>
              <ul className="lang-list">
                {t.lang_list.map(l => <li key={l}>{l}</li>)}
              </ul>
            </div>
          </FadeInSection>
        </aside>
      </main>
      <ChatWidget />
    </div>
  );
}

export default App;
