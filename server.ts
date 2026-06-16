import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy initialization of GoogleGenAI to ensure the application starts up
// gracefully even if GEMINI_API_KEY is not yet defined in the environment.
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

const CELESTE_VA_CONTEXT = `
You are the Live AI Coordinator for Celeste Vance, a premium Creative Virtual Assistant and Brand Operations Specialist.
Your goals:
1. Warmly greet potential clients visiting Celeste's portfolio.
2. Answer questions about her professional background, skills, rates, packages, and technical workflows.
3. Embody her signature brand vibe: warm, creative, reassuringly structured, and highly detailed.
4. Encourage visitors to use the Booking panel available on this page to schedule a discovery call or secure a service slot!

Celeste's Information:
- Name: Celeste Vance (Creative Virtual Assistant & Brand Operations Specialist)
- Tagline: "Bringing high-fidelity structure, aesthetic calm, and seamless automation to scaling creatives, coaches, and boutique agencies."
- Experience: 6+ years in digital brand support, automations, and executive administration.
- Pricing & Services:
  - "Administrative Calm" ($35/hr): Calendar overhaul, email inbox triage, flight/hotel logistics, custom document layouts, copyediting, digital organization.
  - "Creative Brand Support" ($45/hr): Canva asset curating (IG/LinkedIn), premium email newsletters (ConvertKit, Substack), slide deck polishing, basic logo/vector revisions, visual curation.
  - "Tech & Tool Integration" ($50/hr): Custom Notion operating grids, automated Zapier/Make.com workflows, client onboarding (Honeybook/Dubsado), hosting settings, Shopify/Squarespace maintainance.
  - "Daily Executive Retainer" ($60/hr, or retainer agreements starting at $1,200/mo): Premium high-touch calendar/email gatekeeping, morning briefing prep, real-time Slack/client comms representation.
- Tool Proficiency:
  - Project/Productivity: Notion, ClickUp, Asana, Slack, Trello, Google Workspace
  - Creatives: Canva Pro, Figma (basic layouts), ConvertKit, Substack, Mailchimp
  - Automation & Web: Zapier, Make.com, Squarespace, Shopify, Webflow, Teachable
- Standard Booking Option: A complimentary 25-minute Video Discovery Call.

Rules of Interaction:
- Always be kind, empathetic, highly structured, and confident in Celeste's quality.
- Use clean formatting, standard headings, and bullet points to organize services or tools in responses.
- Keep responses friendly but focused on scheduling a discovery call or booking her services.
- If asked about availability, state that she has slots available for new projects starting this month!
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Live Chat Powered by Gemini API
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, userMessage } = req.body;

      if (!userMessage) {
        return res.status(400).json({ error: "Missing userMessage" });
      }

      // Check if API key is configured
      if (!process.env.GEMINI_API_KEY) {
        // Safe fallback mock response to prevent blank states in development
        const fallbackReplies = [
          "Hi! I'd love to chat with you about Celeste's services and skills. (Note: Gemini API Key is not set up in environment, but Celeste is ready to help!)",
          "Celeste specializes in high-fidelity Notion workspaces, administrative systems, and brand curations. Let me know what you need!",
          "That sounds like a perfect project! You can book a slot with Celeste using the booking system on this page.",
        ];
        // simple random pick or index based reply
        const messageIndex = Math.min((messages || []).length, fallbackReplies.length - 1);
        return res.json({
          reply: fallbackReplies[messageIndex] + "\n\nWould you like to book a direct Discovery Call to lock in a spot?",
          isFallback: true,
        });
      }

      const client = getGeminiClient();

      // Format history into structure expected by chats or contents
      // Let's usegenerateContent with conversation history to keep it simple and robust
      const conversationHistory = messages || [];
      const contents = [
        {
          role: "user",
          parts: [{ text: CELESTE_VA_CONTEXT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood! I am Celeste Vance's Live AI Assistant coordinator, ready to answer client questions warmly, structured, and professionally." }],
        },
        ...conversationHistory.map((m: any) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        })),
        {
          role: "user",
          parts: [{ text: userMessage }],
        }
      ];

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          temperature: 0.75,
        },
      });

      const replyText = response.text || "Hello! Let me review your request.";
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Error in server-side Gemini chat API:", error);
      return res.status(500).json({
        error: "Failed to communicate with AI Coordinator",
        details: error.message || error,
      });
    }
  });

  // API Route: Mock booking processing / confirmation
  app.post("/api/bookings", (req, res) => {
    const { name, email, service, date, timeSlot, notes } = req.body;
    if (!name || !email || !service || !date || !timeSlot) {
      return res.status(400).json({ error: "Missing required booking details" });
    }
    // Generate a unique reference number
    const bookingRef = `CV-${Math.floor(100000 + Math.random() * 900000)}`;
    return res.json({
      success: true,
      ref: bookingRef,
      message: `Booking request successfully created for ${name}! Celeste will follow up at ${email} shortly to confirm.`,
    });
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
