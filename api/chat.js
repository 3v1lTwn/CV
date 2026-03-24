import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

const SECTOR_KEYWORDS = [
  'HR', 'IK', 'FINANCE', 'FINANS', 'LOGISTICS', 'LOJISTIK', 'SUPPLY CHAIN', 
  'RETAIL', 'PERAKENDE', 'BANKING', 'BANKACILIK', 'HEALTHCARE', 'SAGLIK', 
  'MANUFACTURING', 'URETIM', 'RECRUITMENT', 'ISE ALIM', 'E-COMMERCE', 'E-TICARET'
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, language } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const upperMsg = message.toUpperCase();

  const langNames = { tr: 'Türkçe', en: 'English', de: 'Deutsch', other: 'the user\'s language' };
  const targetLang = langNames[language] || 'the user\'s language';

  const BASE_SYSTEM_PROMPT = `
Sen İrfan Demircioğlu'nun Dijital Asistanısın. Görevin, İrfan'ın kariyeri hakkında bilgi vermektir.

DİL KURALLARI:
- Yanıtlarını KESİNLİKLE ${targetLang} dilinde ver.
- Kullanıcı farklı dilde yazsa bile sen ${targetLang} dilinde kalmaya çalış.
- Eğer 'other' seçiliyse, kullanıcının konuştuğu dili tespit et ve o dilde yanıt ver.

HAFIZA VE PROAKTİFLİK KURALLARI:
1. Eğer sana sağlanan bir "Kayıtlı Sektörel Proje" varsa, o projeyi İrfan'ın o alandaki gerçek deneyimi gibi profesyonelce anlat.
2. Eğer "Kayıtlı Sektörel Proje" YOKSA ve soru belirli bir sektör ile ilgiliyse; İrfan'ın yeteneklerini (UiPath, Azure AI, Python) kullanarak teknik olarak mantıklı bir projeyi <PROJECT_START>...<PROJECT_END> etiketleri arasında kurgula.
3. Tonun: Profesyonel, yardımsever ve kurumsal.

İRFAN'IN ANA VERİLERİ:
- Ünvan: Intelligent Automation Architect | Hyperautomation & AI Lead.
- Uzmanlık: UiPath, Power Platform, Azure AI, Python, LLM Integration, n8n.
- Akbank: RPA Manager / Lead Architect. High-density automation ecosystem.
- Eğitim: Sabancı Üniversitesi, Mekatronik Mühendisliği (%100 Burslu).
`;

  const foundKeyword = SECTOR_KEYWORDS.find(kw => upperMsg.includes(kw));
  let cachedProject = null;

  try {
    if (foundKeyword && supabaseUrl && supabaseKey) {
      const { data, error } = await supabase
        .from('ai_knowledge')
        .select('project_content')
        .eq('keyword', foundKeyword)
        .maybeSingle();
      
      if (!error && data) cachedProject = data.project_content;
    }

    const finalPrompt = `${BASE_SYSTEM_PROMPT}\n\nSEKTÖREL DURUM: ${foundKeyword ? `Kullanıcı ${foundKeyword} sektörü hakkında soruyor.` : 'Genel soru.'}\nKayıtlı Sektörel Proje: ${cachedProject || 'Yok'}`;

    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: finalPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 800,
    });

    let assistantResponse = completion.choices[0].message.content;

    if (!cachedProject && foundKeyword && assistantResponse.includes('<PROJECT_START>') && supabaseUrl && supabaseKey) {
      const projectMatch = assistantResponse.match(/<PROJECT_START>([\s\S]*?)<PROJECT_END>/);
      if (projectMatch && projectMatch[1]) {
        const newProjectContent = projectMatch[1].trim();
        await supabase.from('ai_knowledge').insert([{ keyword: foundKeyword, project_content: newProjectContent }]);
        assistantResponse = assistantResponse.replace(/<PROJECT_START>[\s\S]*?<PROJECT_END>/g, newProjectContent);
      }
    }

    assistantResponse = assistantResponse.replace(/<PROJECT_START>|<PROJECT_END>/g, '');
    return res.status(200).json({ response: assistantResponse });
  } catch (error) {
    console.error('DeepSeek/Supabase Error:', error);
    return res.status(500).json({ error: "Sunucu tarafında bir hata oluştu: " + error.message });
  }
}
