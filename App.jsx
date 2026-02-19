import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  Cpu, 
  Award,
  ChevronRight,
  Download,
  Menu,
  X,
  Brain,
  Bot,
  TrendingUp,
  Zap,
  Globe,
  Info
} from 'lucide-react';

/**
 * Irfan Demircioglu - AI & RPA Strategy Manager Portfolio
 * Bu dosya Vite/React projenizdeki src/App.jsx dosyasıyla değiştirilmelidir.
 */
const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Sayfa kaydırma efektini yönetir
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const userData = {
    name: "Irfan Demircioglu",
    title: "AI & RPA Strategy Manager",
    location: "Istanbul, Turkey",
    education: "Sabancı University",
    scholarship: "%100 Onur Bursu (Tam Akademik Başarı Bursu)",
    summary: "LLM orkestrasyonu, GenAI ajanları ve uçtan uca bilişsel otomasyon konusunda uzmanlaşmış Kıdemli AI ve Otomasyon Lideri. Yapay Zeka ile kurumsal ölçekteki RPA arasındaki boşluğu doldurarak dönüştürücü ROI sağlıyorum.",
    contact: {
      linkedin: "https://www.linkedin.com/in/irfandemircioglu/",
      email: "mailto:demircioglu.irfan@outloook.com",
      github: "https://github.com/irfandemircioglu" 
    },
    skills: [
      { 
        category: "Artificial Intelligence", 
        icon: <Brain className="text-purple-400" size={20} />,
        items: ["Generative AI (GPT-4, Claude, Llama 3)", "AI Agents & LangChain / CrewAI", "RAG Systems", "Prompt Engineering"] 
      },
      { 
        category: "Automation Systems", 
        icon: <Bot className="text-blue-400" size={20} />,
        items: ["UiPath Autopilot", "Blue Prism / Power Automate", "Cognitive OCR / IDP", "Process Mining"] 
      },
      { 
        category: "Engineering & Dev", 
        icon: <Code className="text-emerald-400" size={20} />,
        items: ["Advanced Python", "Vector Databases", "Cloud Architecture (Azure AI)", "Enterprise APIs"] 
      },
      { 
        category: "Leadership", 
        icon: <Award className="text-amber-400" size={20} />,
        items: ["AI Strategy & Governance", "COE Establishment", "ROI Analysis", "Agile Leadership"] 
      }
    ],
    experience: [
      {
        company: "AKBANK",
        role: "AI & RPA Strategy Manager / CoE Leader",
        period: "2022 - Present",
        description: "Geleneksel RPA'den 'Ajan Temelli İş Akışlarına' (Agentic Workflows) geçişi yönetiyorum.",
        highlights: [
          "AI Center of Excellence'ı kurarak otomasyonu 10'dan 150+ sürece ölçeklendirdim.",
          "Müşteri hizmetleri çözüm sürelerini %70 azaltan özel LLM destekli ajanlar devreye aldım.",
          "Hiper-otomasyon girişimleriyle yıllık 2 milyon dolardan fazla operasyonel tasarruf sağladım.",
          "15+ geliştirici ve veri bilimcisinden oluşan çapraz fonksiyonlu bir ekibe liderlik ediyorum."
        ]
      },
      {
        company: "NTT DATA",
        role: "Senior Solutions Architect (Cognitive Automation)",
        period: "2020 - 2022",
        description: "Fortune 500 müşterileri için yüksek erişilebilirlikli karmaşık otomasyon sistemleri mimarisi oluşturdum.",
        highlights: [
          "Finansal mutabakat süreçleri için hibrit Python-UiPath framework'ü tasarladım.",
          "Karmaşık, çok dilli hukuk sözleşmeleri için Akıllı Doküman İşleme (IDP) uyguladım.",
          "Tahminleyici ML model entegrasyonları ile süreç hata oranlarını %95 azalttım."
        ]
      },
      {
        company: "NovaCore Information Systems",
        role: "Automation Consultant / Analyst",
        period: "2018 - 2020",
        description: "Stratejik süreç değerlendirmesi ve otomasyon yol haritası geliştirme.",
        highlights: [
          "Finans, İK ve Tedarik Zinciri genelinde 50'den fazla süreç keşif çalıştayı gerçekleştirdim.",
          "Türkiye'nin önde gelen bir perakende bankası için ilk kurum çapında RPA yol haritasını oluşturdum."
        ]
      }
    ],
    projects: [
      {
        title: "Agentic Banking Support",
        tech: "GPT-4, LangChain, UiPath",
        impact: "%70 daha hızlı çözüm",
        description: "Müşteri niyetini anlayan ve insan müdahalesi olmadan arka ofis RPA iş akışlarını yürüten otonom yapay zeka ajan sistemi."
      },
      {
        title: "Global IDP Framework",
        tech: "Python, Azure AI, OCR",
        impact: "%99.9 Doğruluk",
        description: "Karmaşık çok dilli sözleşmelerden veri çıkaran kurumsal ölçekli Akıllı Doküman İşleme çözümü."
      }
    ]
  };

  const handleDownloadCV = () => {
    setShowToast(true);
    try {
      window.print();
    } catch (e) {
      console.error("Print failed:", e);
    }
    setTimeout(() => setShowToast(false), 5000);
  };

  const NavItem = ({ href, children }) => (
    <a href={href} className="text-slate-300 hover:text-blue-400 transition-colors duration-200 font-medium">
      {children}
    </a>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 scroll-smooth">
      {/* Toast Bildirimi */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-[100] bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce print:hidden border border-blue-400">
          <Info size={20} />
          <div className="text-sm font-medium">
            PDF Hazırlanıyor... <br/>
            <span className="text-[10px] opacity-80">(Pencere açılmazsa Ctrl+P kullanabilirsiniz)</span>
          </div>
          <button onClick={() => setShowToast(false)}><X size={16}/></button>
        </div>
      )}

      {/* Navigasyon - Logo güncellendi */}
      <nav className={`fixed w-full z-50 transition-all duration-300 print:hidden ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            {userData.name.toUpperCase()}
          </div>
          
          <div className="hidden md:flex space-x-8">
            <NavItem href="#experience">Deneyim</NavItem>
            <NavItem href="#projects">Projeler</NavItem>
            <NavItem href="#skills">Yetenekler</NavItem>
            <NavItem href="#education">Eğitim</NavItem>
            <NavItem href="#contact">İletişim</NavItem>
          </div>

          <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden print:pt-0 print:pb-12">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] print:hidden"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px] print:hidden"></div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 print:items-start print:text-left">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-300 text-sm font-medium mb-8 print:hidden">
            <Brain size={16} className="text-purple-400" />
            <span>Pioneering GenAI in Enterprise Automation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight print:text-black print:text-4xl print:mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent print:text-black">
              {userData.name}
            </span>
          </h1>
          <h2 className="hidden print:block text-2xl text-slate-700 font-bold mb-4 uppercase tracking-wider">{userData.title}</h2>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-10 leading-relaxed print:text-slate-800 print:text-sm print:mb-6">
            {userData.summary}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 print:hidden">
            <a href="#projects" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
              Projeleri Keşfet <ChevronRight size={20} />
            </a>
            <button onClick={handleDownloadCV} className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-slate-700">
              CV Olarak İndir <Download size={20} />
            </button>
          </div>

          <div className="hidden print:grid grid-cols-2 gap-4 text-slate-800 text-sm border-t border-slate-300 pt-6 w-full font-medium">
            <span className="flex items-center gap-2"><Mail size={14} className="text-blue-600" /> demircioglu.irfan@outloook.com</span>
            <span className="flex items-center gap-2"><Linkedin size={14} className="text-blue-600" /> linkedin.com/in/irfandemircioglu</span>
            <span className="flex items-center gap-2"><Globe size={14} className="text-blue-600" /> Istanbul, Turkey</span>
            <span className="flex items-center gap-2"><Github size={14} className="text-blue-600" /> github.com/irfandemircioglu</span>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-slate-900/30 print:bg-transparent print:py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16 print:mb-4">
            <h2 className="text-3xl font-bold mb-4 print:text-black print:text-xl print:border-b-2 print:border-black print:pb-1 print:uppercase">Professional Experience</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full print:hidden"></div>
          </div>

          <div className="space-y-16 print:space-y-6">
            {userData.experience.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l border-slate-700/50 group print:border-slate-300 print:pl-4">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-0 border-4 border-slate-950 shadow-[0_0_10px_rgba(59,130,246,0.5)] print:bg-black print:border-white print:shadow-none"></div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors print:text-black print:text-lg">{exp.role}</h3>
                  <span className="text-blue-400 font-mono text-xs bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20 mt-2 md:mt-0 print:text-black print:bg-transparent print:border-none print:font-bold print:text-sm">{exp.period}</span>
                </div>
                <p className="text-slate-300 font-semibold mb-2 text-sm tracking-wide uppercase print:text-blue-700 print:font-bold">{exp.company}</p>
                <p className="text-slate-400 mb-4 italic text-sm print:text-slate-700 print:mb-2">{exp.description}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 print:grid-cols-1 print:mt-1">
                  {exp.highlights.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2 text-slate-300 text-sm bg-white/5 p-3 rounded-lg border border-white/5 print:bg-transparent print:border-none print:text-slate-800 print:p-0 print:leading-tight">
                      <TrendingUp size={14} className="text-emerald-400 mt-1 shrink-0 print:text-black" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-slate-950 print:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 print:mb-4">
            <h2 className="text-3xl font-bold mb-4 print:text-black print:text-xl print:border-b-2 print:border-black print:pb-1 print:uppercase">Key AI Projects</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full print:hidden"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 print:grid-cols-1 print:gap-4">
            {userData.projects.map((project, idx) => (
              <div key={idx} className="group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all print:bg-transparent print:border-none print:p-0">
                <div className="p-8 print:p-0">
                  <div className="flex justify-between items-start mb-6 print:hidden">
                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                      <Zap size={24} />
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                      {project.impact}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white print:text-black print:text-base print:mb-1">{project.title}</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed print:text-slate-800 print:text-xs print:mb-1">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-slate-900/30 print:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 print:text-left print:mb-4">
            <h2 className="text-3xl font-bold mb-4 print:text-black print:text-xl print:border-b-2 print:border-black print:pb-1 print:uppercase">Technical Stack</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 print:grid-cols-2 print:gap-x-12 print:gap-y-4">
            {userData.skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-300 group print:bg-transparent print:border-none print:p-0">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-white print:text-blue-700 print:text-sm print:mb-2 print:uppercase">
                  <span className="print:hidden">{skillGroup.icon}</span>
                  {skillGroup.category}
                </h3>
                <ul className="space-y-3 print:space-y-1">
                  {skillGroup.items.map((skill, sIdx) => (
                    <li key={sIdx} className="text-slate-400 group-hover:text-slate-300 flex items-center gap-2 print:text-slate-800 print:text-xs">
                      <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full print:bg-black"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 relative print:py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-900 to-blue-900/20 border border-slate-800 p-10 rounded-3xl relative overflow-hidden print:bg-transparent print:border-none print:p-0">
            <div className="absolute -top-4 -right-4 bg-amber-500 text-slate-950 font-bold px-8 py-6 rotate-12 shadow-xl border-4 border-amber-600/20 z-20 print:hidden">
              %100 ONUR BURSU
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10 print:flex-col print:items-start print:gap-1">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-4 uppercase tracking-widest text-sm print:text-black print:mb-1">
                  <span>Education</span>
                </div>
                <h2 className="text-4xl font-bold mb-4 text-white print:text-black print:text-xl print:mb-1">{userData.education}</h2>
                <p className="text-blue-400 font-semibold mb-6 text-xl print:text-blue-700 print:text-sm print:mb-1">
                  {userData.scholarship}
                </p>
                <p className="text-slate-400 mb-8 leading-relaxed text-lg print:text-slate-800 print:text-xs print:mb-1">
                  Yüksek başarı derecesiyle mezuniyet. Analitik Modelleme ve Endüstri Mühendisliği uzmanlığı.
                </p>
              </div>
              
              <div className="w-56 h-56 bg-white rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl overflow-hidden group shrink-0 p-4 print:hidden">
                 <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Sabanc%C4%B1_University_logo.svg/500px-Sabanc%C4%B1_University_logo.svg.png" 
                    alt="Sabancı University Logo" 
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-20 border-t border-slate-900 print:hidden">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Geleceği Birlikte İnşa Edelim</h2>
              <p className="text-slate-400">Yapay Zeka odaklı dönüşüm ve ölçeklenebilir otomasyon için iletişime geçin.</p>
            </div>
            <div className="flex gap-4">
              <a href={userData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-900 hover:bg-blue-600 rounded-xl transition-all border border-slate-800 group">
                <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href={userData.contact.email} className="p-4 bg-slate-900 hover:bg-blue-600 rounded-xl transition-all border border-slate-800 group">
                <Mail size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          <div className="text-center pt-12 border-t border-slate-900 text-slate-500 text-sm">
            © {new Date().getFullYear()} {userData.name}. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;