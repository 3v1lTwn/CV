import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1 className="name">İrfan Demircioğlu</h1>
        <h2 className="title">Manager / Senior Software Engineer</h2>
        <div className="contact-info">
          <div className="contact-item">📧 <a href="mailto:demircioglu.irfan@outlook.com">demircioglu.irfan@outlook.com</a></div>
          <div className="contact-item">📞 +90 553 184 12 31</div>
          <div className="contact-item">📍 Kadıköy/Istanbul</div>
          <div className="contact-item">🔗 <a href="https://linkedin.com/in/irfandemircioglu/" target="_blank" rel="noreferrer">linkedin.com/in/irfandemircioglu/</a></div>
        </div>
      </header>

      <main>
        <section className="section">
          <h2 className="section-title">Experience</h2>
          
          <div className="experience-item">
            <div className="job-header">
              <div>
                <span className="company">Akbank</span> <span className="job-title">- Manager</span>
              </div>
              <span className="date-range">Dec. 2022 – Present</span>
            </div>
            <ul className="job-details">
              <li><strong>IT risk management:</strong> Spearheaded initiatives to proactively identify vulnerabilities, formulating robust mitigation strategies to safeguard enterprise infrastructure.</li>
              <li><strong>Project management:</strong> Directed cross-functional teams, orchestrating comprehensive project lifecycles to guarantee timely, budget-compliant delivery.</li>
              <li><strong>AI & Compliance:</strong> Pioneered the strategic integration of Artificial Intelligence (AI) into core business processes while maintaining rigorous oversight of IT general controls.</li>
              <li><strong>RPA:</strong> Championed digital transformation by engineering scalable Robotic Process Automation (RPA) strategies that significantly amplified operational efficiency.</li>
              <li><strong>Data analysis:</strong> Leveraged advanced Power BI analytics to distill complex data into actionable insights, delivering strategic reports that empowered executive decision-making.</li>
            </ul>
          </div>

          <div className="experience-item">
            <div className="job-header">
              <div>
                <span className="company">NTT DATA Business Solutions</span> <span className="job-title">- Senior Software Engineer</span>
              </div>
              <span className="date-range">Apr. 2021 - Dec. 2022</span>
            </div>
            <ul className="job-details">
              <li>Architected and deployed end-to-end technical project plans in seamless collaboration with diverse, cross-functional execution teams.</li>
              <li>Engineered high-performance, resilient applications leveraging advanced OCR technologies and robust REST/SOAP API integrations.</li>
              <li>Designed and administered comprehensive digital workspaces utilizing SharePoint, Power BI dashboards, and Power Automate to streamline enterprise workflows.</li>
              <li>Conducted rigorous process assessments, strategically redesigning workflows to exceed client requirements and adhere to stringent corporate standards.</li>
              <li>Collaborated closely with agile teams to optimize project velocity and fully automate the Robotic Process Automation (RPA) lifecycle.</li>
            </ul>
          </div>

          <div className="experience-item">
            <div className="job-header">
              <div>
                <span className="company">Itelligence Business Solutions</span> <span className="job-title">- RPA Consultant</span>
              </div>
              <span className="date-range">Jul. 2020 - Apr. 2021</span>
            </div>
            <ul className="job-details">
              <li>Developed and implemented strategic project plans, fostering alignment and execution across multiple delivery teams.</li>
              <li>Constructed integrated digital solutions combining SharePoint, Power BI, and Power Automate to optimize data management and operational transparency.</li>
              <li>Re-engineered legacy processes to align with dynamic customer needs, establishing automated, scalable RPA lifecycles.</li>
            </ul>
          </div>

          <div className="experience-item">
            <div className="job-header">
              <div>
                <span className="company">Novacore Information Systems and Consulting</span> <span className="job-title">- Junior RPA Consultant</span>
              </div>
              <span className="date-range">Jun. 2018 - Jul. 2020</span>
            </div>
            <ul className="job-details">
              <li>Contributed to the design and execution of holistic project strategies in partnership with cross-functional technical teams.</li>
              <li>Streamlined enterprise data management and reporting by developing integrated solutions using SharePoint, Power BI, and Power Automate.</li>
              <li>Evaluated and optimized business processes to ensure strict compliance with corporate operational standards.</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3>Technical Skills</h3>
              <div className="skill-list">
                {['Python', 'Go', 'LLMs & LangChain', 'RAG (Retrieval-Augmented Generation)', 'Prompt Engineering', 'Machine Learning', 'Computer Vision', 'Basic C#', 'HTML & CSS', 'SQL/MySQL', 'Docker', 'Power BI', 'BI Data Modeling', 'Microsoft Power Automate', 'Microsoft Power Apps', 'UiPath', 'BluePrism', 'Kofax'].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>Soft Skills</h3>
              <div className="skill-list">
                {['Project Management', 'Communication', 'Time Management', 'Business Development', 'Flexibility', 'Multitasking', 'Organizational Talent'].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Hobby Projects</h2>
          <div className="project-item">
            <div className="project-title">Autonomous Multi-Agent AI Research Assistant</div>
            <p className="project-desc">Engineered a multi-agent system using LangChain and GPT-4 to automate complex research tasks. The system coordinates specialized agents for web searching, document analysis, and synthesis, providing comprehensive reports with cited sources.</p>
          </div>
          <div className="project-item">
            <div className="project-title">Breast Cancer Detection Using AI</div>
            <p className="project-desc">Developed an AI system to determine the size of breast cancer masses and classify the cells as benign or malignant. Utilized Python for development and code upgrades.</p>
          </div>
          <div className="project-item">
            <div className="project-title">Sales Bot for LinkedIn</div>
            <p className="project-desc">Created a Sales Bot that sends connection requests, checks for new connections, and uses a chatbot API to initiate conversations and set up meetings. Implemented using Python and RPA technologies.</p>
          </div>
          <div className="project-item">
            <div className="project-title">Cryptocurrency Trading Bot</div>
            <p className="project-desc">Currently developing a bot that monitors at least 50 cryptocurrencies approximately every 20 seconds, and opens future positions with specific take profit/stop loss settings based on volume. Utilizes Python for development.</p>
          </div>
        </section>

        <div className="two-col">
          <section className="section">
            <h2 className="section-title">Academic Background</h2>
            <div className="education-item">
              <div className="job-header">
                <span className="company">Sabanci University</span>
                <span className="date-range">09/2012 - 06/2018</span>
              </div>
              <div className="job-title">Bachelor of Science in Mechatronics Engineering</div>
              <p>Istanbul, Turkey<br/>Studied with a 100% scholarship</p>
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">Languages & Interests</h2>
            <div className="experience-item">
              <h3>Languages</h3>
              <ul className="job-details" style={{listStyleType: 'none', paddingLeft: 0, marginTop: '0.5rem', marginBottom: '1.5rem'}}>
                <li>🇹🇷 Turkish (Native)</li>
                <li>🇬🇧 English (Fluent)</li>
                <li>🇩🇪 German (B1)</li>
              </ul>
              <h3>Interests</h3>
              <div className="skill-list" style={{marginTop: '0.5rem'}}>
                {['IT Automation', 'Languages & Cultures', 'Linux', 'Sports (Karate, Fitness)'].map(interest => (
                  <span key={interest} className="skill-tag">{interest}</span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
