import { useState } from 'react';
import './App.css';
import ChatWidget from './components/ChatWidget';

type CVLanguage = 'tr' | 'en' | 'de';

const translations = {
  tr: {
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
      "CoE Governance & Strategy: Geliştirme standartlarını, kod güvenliği protokollerini ve operasyonel verimlilik metriklerini belirleyerek kurumsal düzeyde bir yönetişim modeli uyguluyorum.",
      "Cross-Functional Impact: Hazine, Operasyon ve Kredi süreçlerinde karmaşık iş akışlarını optimize ederek ölçülebilir verimlilik artışı ve risk azaltımı sağlıyorum."
    ],
    skills_title: "🛠️ YETENEKLER",
    projects_title: "🚀 TEKNİK PROJELER",
    education_title: "🎓 EĞİTİM",
    education_school: "SABANCI ÜNİVERSİTESİ",
    education_degree: "Mekatronik Mühendisliği Lisans",
    cert_title: "📜 SERTİFİKALAR"
  },
  en: {
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
      "CoE Governance & Strategy: Implementing a corporate governance model by setting development standards, security protocols, and efficiency metrics.",
      "Cross-Functional Impact: Optimizing complex workflows across Treasury, Operations, and Credits to reduce risk and increase measurable efficiency."
    ],
    skills_title: "🛠️ SKILLS",
    projects_title: "🚀 TECHNICAL PROJECTS",
    education_title: "🎓 EDUCATION",
    education_school: "SABANCI UNIVERSITY",
    education_degree: "B.Sc. in Mechatronics Engineering",
    cert_title: "📜 CERTIFICATIONS"
  },
  de: {
    title: "İRFAN DEMİRCİOĞLU",
    role: "Intelligent Automation Architect | Hyperautomation & AI Lead",
    relocation: "Istanbul, Türkei (Umzug: Europaweit)",
    summary_title: "🎯 ZUSAMMENFASSUNG",
    summary_text: "Strategischer Intelligent Automation Leader mit über 7 Jahren Erfahrung. Experte für UiPath, Azure AI und Power Platform mit Fokus auf Hyperautomation und KI-Integration.",
    experience_title: "💼 BERUFSERFAHRUNG",
    akbank_role: "Intelligent Automation Lead & Architect",
    akbank_focus: "Strategischer Fokus: Orchestrierung, Governance und Hyperautomatisierung auf Unternehmensebene.",
    akbank_points: [
      "Orchestrierung auf Unternehmensebene: Management des gesamten Lebenszyklus einer massiven Automatisierungsflotte.",
      "Hochverfügbarkeitsarchitektur: Entwicklung einer belastbaren Infrastruktur für geschäftskritische Bankgeschäfte.",
      "Hyperautomation Transformation: Integration von RPA mit GenAI (LLM) und Azure AI Services.",
      "CoE Governance & Strategie: Implementierung eines Governance-Modells für Entwicklungsstandards und Sicherheit.",
      "Cross-Functional Impact: Optimierung komplexer Workflows zur Steigerung der messbaren Effizienz."
    ],
    skills_title: "🛠️ FÄHIGKEİTEN",
    projects_title: "🚀 PROJEKTE",
    education_title: "🎓 BILDUNG",
    education_school: "SABANCI UNIVERSITÄT",
    education_degree: "B.Sc. in Mechatronik",
    cert_title: "📜 ZERTIFIZIERUNGEN"
  }
};

function App() {
  const [cvLang, setCvLang] = useState<CVLanguage>('tr');
  const t = translations[cvLang];

  const competencies = {
    "Architecture": ["Enterprise RPA Design", "Solution Design Document (SDD)", "Infrastructure Scaling"],
    "Automation Stack": ["UiPath (Advanced)", "n8n", "Microsoft Power Automate", "Blue Prism"],
    "AI & ML": ["Azure AI Services", "Document Understanding", "LLM Integration", "Python"],
    "Development": ["Python", "SQL", ".NET", "REST APIs", "Terraform"]
  };

  return (
    <div className="cv-container">
      {/* Global Language Switcher */}
      <div className="global-lang-switcher">
        <button className={cvLang === 'tr' ? 'active' : ''} onClick={() => setCvLang('tr')}>TR</button>
        <button className={cvLang === 'en' ? 'active' : ''} onClick={() => setCvLang('en')}>EN</button>
        <button className={cvLang === 'de' ? 'active' : ''} onClick={() => setCvLang('de')}>DE</button>
      </div>

      <main className="cv-content">
        <div className="main-col">
          <section className="resume-section">
            <div className="readme-body">
              <header className="resume-header">
                <h1>{t.title}</h1>
                <p className="lead-text"><strong>{t.role}</strong></p>
                <div className="contact-bar">
                  <span>📍 {t.relocation}</span><br/>
                  <span>📧 <a href="mailto:demircioglu.irfan@outlook.com">demircioglu.irfan@outlook.com</a></span> | 
                  <span> 🔗 <a href="https://linkedin.com/in/irfandemircioglu/">linkedin</a></span> | 
                  <span> 🌐 <a href="https://irfandemircioglu.com">irfandemircioglu.com</a></span>
                </div>
              </header>

              <hr />

              <section className="content-block">
                <h2>{t.summary_title}</h2>
                <p>{t.summary_text}</p>
              </section>

              <section className="content-block">
                <h2>{t.experience_title}</h2>
                
                <div className="experience-item">
                  <div className="exp-header">
                    <h3>AKBANK <span className="job-title">| {t.akbank_role}</span></h3>
                    <span className="date">Dec 2022 – Present</span>
                  </div>
                  <p style={{fontStyle: 'italic', marginBottom: '10px', color: '#656d76'}}>{t.akbank_focus}</p>
                  <ul>
                    {t.akbank_points.map((point, i) => <li key={i}>{point}</li>)}
                  </ul>
                </div>

                <div className="experience-item">
                  <div className="exp-header">
                    <h3>NTT DATA <span className="job-title">| Senior RPA Consultant</span></h3>
                    <span className="date">2021 – 2022</span>
                  </div>
                </div>
              </section>

              <section className="content-block">
                <h2>{t.education_title}</h2>
                <div className="education-item">
                  <div className="exp-header">
                    <h3>{t.education_school} <span className="job-title">| {t.education_degree}</span></h3>
                    <span className="date">2012 – 2018</span>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>

        <aside className="side-col">
          <div className="side-section">
            <h3 className="side-title">{t.skills_title}</h3>
            {Object.entries(competencies).map(([cat, list]) => (
              <div key={cat} className="skill-group">
                <h4>{cat}</h4>
                <div className="skill-tags">
                  {list.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="side-section">
            <h3 className="side-title">Languages</h3>
            <ul className="lang-list">
              <li>🇹🇷 Turkish (Native)</li>
              <li>🇬🇧 English (C1)</li>
              <li>🇩🇪 German (B1)</li>
            </ul>
          </div>
        </aside>
      </main>
      <ChatWidget />
    </div>
  );
}

export default App;
