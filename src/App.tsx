import './App.css';
import ChatWidget from './components/ChatWidget';

function App() {
  const competencies = {
    "Architecture": ["Enterprise RPA Design", "Solution Design Document (SDD)", "Infrastructure Scaling (Azure/On-prem)"],
    "Automation Stack": ["UiPath (Advanced)", "n8n", "Microsoft Power Automate", "Blue Prism"],
    "AI & ML": ["Azure AI Services", "Document Understanding", "LLM Integration (LangChain)", "Python"],
    "Strategy": ["CoE Governance", "Process Mining (Celonis/UiPath)", "Agile Methodology", "ROI Analysis"],
    "Development": ["Python", "SQL", ".NET", "REST APIs", "Infrastructure as Code (Terraform)"]
  };

  const certifications = [
    { name: "Microsoft Certified: Azure AI Fundamentals", icon: "🤖" },
    { name: "Microsoft Certified: Azure Data Fundamentals", icon: "📊" },
    { name: "Microsoft Certified: Azure Fundamentals", icon: "☁️" },
    { name: "UiPath Certified Advanced RPA Developer", icon: "⚙️" },
    { name: "UiPath Certified Solution Architect", icon: "📐" }
  ];

  return (
    <div className="cv-container">
      <main className="cv-content">
        <div className="main-col">
          <section className="resume-section">
            <div className="readme-body">
              <header className="resume-header">
                <h1>İRFAN DEMİRCİOĞLU</h1>
                <p className="lead-text">
                  <strong>Intelligent Automation Architect | Hyperautomation & AI Lead</strong>
                </p>
                <div className="contact-bar">
                  <span>📍 Istanbul, Turkey (Open to Relocation: Europe-wide)</span><br/>
                  <span>📧 <a href="mailto:demircioglu.irfan@outlook.com">demircioglu.irfan@outlook.com</a></span> | 
                  <span> 🔗 <a href="https://linkedin.com/in/irfandemircioglu/" target="_blank" rel="noreferrer">linkedin.com/in/irfandemircioglu</a></span> | 
                  <span> 🌐 <a href="https://irfandemircioglu.com" target="_blank" rel="noreferrer">irfandemircioglu.com</a></span>
                </div>
              </header>

              <hr />

              <section className="content-block">
                <h2>🎯 PROFESSIONAL SUMMARY</h2>
                <p>
                  Strategic <strong>Intelligent Automation Leader</strong> with 7+ years of experience in architecting enterprise-scale automation ecosystems. 
                  Proven track record at <strong>Akbank</strong> in leading RPA Centers of Excellence (CoE), integrating <strong>Generative AI (LLMs)</strong> with traditional RPA, and managing high-throughput robot fleets. 
                  Expert in <strong>UiPath, Azure AI, and Power Platform</strong>, focusing on delivering measurable ROI and operational resilience through Hyperautomation.
                </p>
              </section>

              <section className="content-block">
                <h2 id="experience">💼 PROFESSIONAL EXPERIENCE</h2>
                
                <div className="experience-item">
                  <div className="exp-header">
                    <h3>AKBANK <span className="job-title">| RPA Manager / Lead Architect</span></h3>
                    <span className="date">Dec 2022 – Present</span>
                  </div>
                  <ul>
                  <li><strong>Enterprise Scale:</strong> Architected a high-density automation ecosystem, ensuring maximum resilience and peak performance for mission-critical banking operations.</li>
                  <li><strong>Hyperautomation Strategy:</strong> Leading the evolution from traditional RPA to a comprehensive <strong>Hyperautomation</strong> framework, integrating Azure AI and Document Understanding to handle complex, unstructured data at scale.</li>
                  <li><strong>Strategic ROI:</strong> Driving massive organizational capacity reclamation and transformative operational efficiency by identifying and automating high-impact financial workflows.</li>
                  <li><strong>Governance & Leadership:</strong> Orchestrating a cross-functional CoE, establishing industry-standard best practices for code quality, security, and CI/CD pipelines in automation.</li>
                  </ul>
                </div>

                <div className="experience-item">
                  <div className="exp-header">
                    <h3>NTT DATA Business Solutions <span className="job-title">| Senior RPA Consultant</span></h3>
                    <span className="date">Apr 2021 – Dec 2022</span>
                  </div>
                  <ul>
                    <li>Designed end-to-end automation solutions for global clients using <strong>UiPath</strong> and <strong>Blue Prism</strong>.</li>
                    <li>Implemented <strong>Process Mining</strong> to discover automation bottlenecks, reducing process discovery time by 40%.</li>
                    <li>Mentored junior developers and established a standard "Automation Framework" used across 10+ enterprise projects.</li>
                  </ul>
                </div>

                <div className="experience-item">
                  <div className="exp-header">
                    <h3>Itelligence / Novacore <span className="job-title">| RPA Consultant</span></h3>
                    <span className="date">Jun 2018 – Apr 2021</span>
                  </div>
                  <ul>
                    <li>Developed complex automation workflows for diverse industries, focusing on scalability and robust error handling.</li>
                    <li>Integrated <strong>Power Automate</strong> with legacy systems to streamline back-office operations.</li>
                  </ul>
                </div>
              </section>

              <section className="content-block">
                <h2 id="projects">🚀 TECHNICAL PROJECTS</h2>
                <div className="project-grid">
                  <div className="project-card">
                    <h4>AI-Powered Customer Service</h4>
                    <p>Integrated GPT-4 with UiPath to automate 60% of inbound email classifications and responses for high-volume support channels.</p>
                  </div>
                  <div className="project-card">
                    <h4>Personalized Automation Platform</h4>
                    <p>Built a custom orchestration layer using <strong>n8n</strong> and <strong>Python</strong> on <a href="https://irfandemircioglu.com">irfandemircioglu.com</a> to demonstrate open-source automation capabilities.</p>
                  </div>
                </div>
              </section>

              <section className="content-block">
                <h2 id="education">🎓 EDUCATION</h2>
                <div className="education-item">
                  <div className="exp-header">
                    <h3>SABANCI UNIVERSITY <span className="job-title">| B.Sc. in Mechatronics Engineering</span></h3>
                    <span className="date">2012 – 2018</span>
                  </div>
                  <ul>
                    <li><strong>Full Scholarship (100% Merit-based)</strong></li>
                    <li>Focus: Robotics, Automation Systems, and Control Engineering.</li>
                  </ul>
                </div>
              </section>
            </div>
          </section>
        </div>

        <aside className="side-col">
          <div className="side-section">
            <h3 className="side-title">About</h3>
            <p className="side-desc">Transforming Enterprise through Intelligent Automation & AI. Specialized in Hyperautomation and ROI-driven architecture.</p>
          </div>

          <div className="side-section">
            <h3 className="side-title">Core Competencies</h3>
            {Object.entries(competencies).map(([category, list]) => (
              <div key={category} className="skill-group">
                <h4>{category}</h4>
                <div className="skill-tags">
                  {list.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div className="side-section">
            <h3 className="side-title">Certifications</h3>
            <ul className="cert-list">
              {certifications.map(cert => (
                <li key={cert.name} title={cert.name}>
                  <span className="cert-icon">{cert.icon}</span>
                  <span className="cert-name">{cert.name.replace('Microsoft Certified: ', '')}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="side-section">
            <h3 className="side-title">Languages</h3>
            <div className="lang-stat">
              <div className="lang-bar">
                <div className="bar-fill tr" style={{width: '45%'}}></div>
                <div className="bar-fill en" style={{width: '45%'}}></div>
                <div className="bar-fill de" style={{width: '10%'}}></div>
              </div>
              <ul className="lang-list">
                <li><span className="dot tr"></span> Turkish (Native)</li>
                <li><span className="dot en"></span> English (Full Professional)</li>
                <li><span className="dot de"></span> German (B1)</li>
              </ul>
            </div>
          </div>
        </aside>
      </main>
      <ChatWidget />
    </div>
  );
}

export default App;
