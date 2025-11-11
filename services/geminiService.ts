
import { GoogleGenAI, Chat, Content } from "@google/genai";
import { Holding, ESGScore } from '../types';

export const createChatSession = (
    holdings: Holding[],
    esgScores: Map<string, ESGScore>
): Chat | null => {
    if (!process.env.API_KEY) {
        console.error("API_KEY environment variable not set");
        return null;
    }
    if (holdings.length === 0) {
        return null;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const portfolioContext = `
This is the user's portfolio context. Answer questions based on this JSON data.
Holdings: ${JSON.stringify(holdings.map(h => ({ ticker: h.ticker, shares: h.shares, marketValue: h.marketValue?.toFixed(2) })), null, 2)}
ESG Scores: ${JSON.stringify(Array.from(esgScores.values()), null, 2)}
Key information: 'totalESG' is the main risk score. Lower is better. 'esgPerformance' gives a qualitative rating.
`;

    const history: Content[] = [
        { role: "user", parts: [{ text: portfolioContext }] },
        { role: "model", parts: [{ text: "Okay, I have the portfolio data. I'm ready to help." }] },
    ];

    const chat = ai.chats.create({
        model: 'gemini-2.5-pro',
        history: history,
        config: {
            systemInstruction: `You are an expert ESG investment analyst acting as a friendly portfolio assistant.
- Your answers must be based *only* on the portfolio context provided.
- Do not mention the JSON data structure to the user. Speak naturally.
- Be concise. Use markdown for lists.
- Do not invent any information, such as live stock prices or news.
- If a question is outside the scope of the provided ESG data (e.g., "what will be the stock price tomorrow?"), politely decline to answer.`,
        }
    });

    return chat;
};
