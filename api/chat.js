import OpenAI from 'openai';

// In-memory rate limiting (Note: This is per execution environment instance)
const rateLimitMap = new Map();

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

const SYSTEM_PROMPT = `
Sen İrfan Demircioğlu'nun Dijital Asistanısın. Görevin, İrfan'ın kariyeri, projeleri ve yetenekleri hakkında bilgi vermektir.

KRİTİK KURALLAR:
1. Sadece aşağıda sağlanan verileri kullan. Bilmediğin konularda "Bu konuda detaylı bilgim yok, ancak İrfan'ın [ilgili bir yeteneği] hakkında bilgi verebilirim" de.
2. Siyaset, din, kişisel yaşam veya genel dünya haberleri gibi konulardaki soruları "Ben sadece İrfan'ın profesyonel geçmişi hakkında bilgi vermek üzere programlandım." diyerek nazikçe reddet.
3. Tonun: Profesyonel, yardımsever ve kurumsal.
4. Yanıtlarını kısa ve öz tut.

İRFAN'IN VERİLERİ:
- Ünvan: Intelligent Automation Architect | Hyperautomation & AI Lead.
- Uzmanlık: UiPath, Power Platform, Azure AI, Python, LLM Integration (LangChain), n8n.
- Akbank Deneyimi: RPA Manager / Lead Architect. Enterprise Scale: Architected a high-density automation ecosystem. Hyperautomation Strategy: Leading evolution to Hyperautomation framework with Azure AI. Strategic ROI: Driving massive organizational capacity reclamation.
- Önceki Deneyimler: NTT DATA (Senior RPA Consultant), Itelligence/Novacore (RPA Consultant).
- Eğitim: Sabancı Üniversitesi, Mekatronik Mühendisliği (%100 Burslu).
- Sertifikalar: Microsoft Azure AI, Data & Fundamentals; UiPath Advanced Developer & Solution Architect.
- Dil: Türkçe (Anadil), İngilizce (Full Professional Proficiency), Almanca (B1).
`;

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();

  // Rate Limiting (3 requests per minute)
  if (!rateLimitMap.has(clientIp)) {
    rateLimitMap.set(clientIp, []);
  }
  const userRequests = rateLimitMap.get(clientIp).filter(t => now - t < 60000);
  
  if (userRequests.length >= 3) {
    return res.status(429).json({ error: "Dakikalık soru limitine ulaştınız, lütfen 1 dakika bekleyin." });
  }

  userRequests.push(now);
  rateLimitMap.set(clientIp, userRequests);

  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
      ],
      max_tokens: 500,
    });

    return res.status(200).json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error('DeepSeek Error:', error);
    return res.status(500).json({ error: "İletişim sırasında bir hata oluştu." });
  }
}
