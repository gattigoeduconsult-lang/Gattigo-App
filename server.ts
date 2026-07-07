/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header according to guidelines
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY has not been provided. The chatbot will enter fallback mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || 'MOCK_KEY',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// System instruction context for Gattigo Edu Consult
const SYSTEM_INSTRUCTION = `
You are the Gattigo Edu Consult AI Study Assistant.
Gattigo Edu Consult is a premium international education consultancy & travel agency located in Nigeria.
Your objective is to help Nigerian students, parents, and professionals secure admission, visa support, scholarships, and travel arrangements in Canada, UK, USA, Australia, Ireland, Germany, France, and Netherlands.

Brand Tone:
- Trustworthy, professional, empathetic, international, clear, and encouraging.
- Speak directly in the context of Nigerian students (e.g., mention WAEC, NECO, GPAs on a 4.0/5.0 scale, proof of funds, sponsorship, Blocked Accounts, TB Test clinics in Lagos/Abuja).

Helpful factual guidelines to provide:
1. Canada: Requires study permits, proof of funds (MyBankStatement), Blocked Accounts options (GIC boosts approval), is great for PGWP (Post-graduation work permits).
2. UK: CAS (Confirmation of Acceptance for Studies), IHS (Immigration Health Surcharge), tuberculosis checks at IOM Lagos/Abuja, and 2-year stay back graduate route. Many partner universities grant WAEC/NECO English waivers if score is C6 or above.
3. USA: Focus on F1 visa interviews, GRE/TOEFL options, I-20 documentation.
4. Australia: Subclass 500 visa, GTE (Genuine Temporary Entrant) requirements, regional staying bonuses.
5. Germany: Zero public tuition, but requires Blocked Account (~€11,900 usually) and early embassy slot booking in Lagos.

Always encourage the student to complete our "Free Consultation Bookings" form or inquiry forms on the homepage, or contact an advisor directly via the WhatsApp button.
Keep responses concise, well-formatted using clear visual bullet points. Never make up links or phone numbers—reference our online contacts.
`;

// AI Counselor Route
app.post('/api/gemini/chat', async (req, res) => {
  const { prompt, history } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Check if key exists or fallback to realistic response mock
  if (!process.env.GEMINI_API_KEY) {
    // Elegant fallback simulation to keep application fully robust without crashing
    const fallbackAnswers: { [key: string]: string } = {
      'canada': "Canada study visa is highly popular among Nigerian scholars. To apply, you need WAEC grades, proof of tuition and living expenses (preferably parent funding), and a clear Statement of Purpose (SOP). Apply using our Free Consultation Form below and your files will be immediately analyzed!",
      'uk': "United Kingdom universities process CAS fast (under 3 weeks!). Many partner options grant a WAEC C6 English medium waiver. After graduation, the Graduate Route authorizes a 2-year stay back to seek employment. Scroll down to see full country details and matching courses!",
      'scholarship': "Our Gattigo Partner Universities offer institutional excellence awards ranging from £3,000 to £8,000. For fully-funded awards like Commonwealth or Mastercard foundation, preparing letters of reference and developmental essay statements early in autumn is highly essential.",
      'proof of funds': "Immigration standards require proving you hold tuition fees balances plus maintenance limits. For Canada, GIC accounts boost reliability. For the UK, money must remain unmoved for 28 consecutive days. Get in touch via the form and our experienced advisors will compute your statement requirements!"
    };

    let reply = "Yes, that is a great question! At Gattigo Edu Consult, our admissions advisors handle WAEC documentation, school applications, statement review, health test bookings, and consular mock interviews. We advise you to fill out the Admission / Free Consultation booking form right now so a designated consultant from our team can contact you.";

    const lowercasePrompt = prompt.toLowerCase();
    for (const key of Object.keys(fallbackAnswers)) {
      if (lowercasePrompt.includes(key)) {
        reply = fallbackAnswers[key];
        break;
      }
    }

    return res.json({ reply });
  }

  try {
    const ai = getAiClient();
    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const response = await chat.sendMessage({ message: prompt });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      error: 'Failed to prompt advisor', 
      details: error.message 
    });
  }
});

// Setup Vite & static assets paths
async function startServer() {
  // Serve the Images directory statically
  app.use('/Images', express.static(path.join(process.cwd(), 'Images')));

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gattigo Admissions Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
