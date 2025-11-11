
import React, { useState, useEffect, useRef } from 'react';
import { Holding, ESGScore } from '../types';
import { createChatSession } from '../services/geminiService';
import { Chat } from '@google/genai';
import Spinner from './Spinner';
import { SendIcon, SparklesIcon } from './icons';

interface ChatPanelProps {
  holdings: Holding[];
  esgData: Map<string, ESGScore>;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ holdings, esgData }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (holdings.length > 0) {
            const newChat = createChatSession(holdings, esgData);
            setChat(newChat);
            setMessages([
                { sender: 'ai', text: "Hello! I'm your ESG assistant. Ask me anything about your portfolio's sustainability." }
            ]);
        } else {
            setChat(null);
            setMessages([]);
        }
    }, [holdings, esgData]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        
        const aiPlaceholder: Message = { sender: 'ai', text: '' };
        setMessages(prev => [...prev, aiPlaceholder]);

        try {
            const stream = await chat.sendMessageStream({ message: input });
            
            let aiResponse = '';
            for await (const chunk of stream) {
                aiResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = aiResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            const errorMessage: Message = { sender: 'ai', text: "Sorry, I encountered an error. Please try again." };
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = errorMessage;
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const renderMarkdown = (text: string) => {
        const html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/^- (.*)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
            .replace(/\n/g, '<br />')
            .replace(/<\/li><br \/>/g, '</li>')
            .replace(/<ul><br \/>/g, '<ul>')
            .replace(/<br \/><ul>/g, '<ul>')
            .replace(/<\/ul><br \/>/g, '</ul>');
        return { __html: html };
    };

    if (!process.env.API_KEY) {
        return (
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md no-print">
                <div className="flex items-center mb-4">
                    <SparklesIcon />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white ml-2">AI Chat</h3>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-200 p-4" role="alert">
                    <p className="font-bold">Configuration Error</p>
                    <p>API_KEY is not configured. Please set up your environment variables to use the AI Chat feature.</p>
                </div>
            </div>
        )
    }
    
    if (holdings.length === 0) {
        return null; // Don't show the panel if portfolio is empty
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md no-print flex flex-col h-[32rem]">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 px-2 flex items-center gap-2"><SparklesIcon/> AI Chat</h3>
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-xs xl:max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                           {msg.text ? (
                             <div className="prose prose-sm max-w-none text-inherit prose-p:my-1 prose-ul:my-1" dangerouslySetInnerHTML={renderMarkdown(msg.text)} />
                           ) : (
                             <Spinner className="w-5 h-5" />
                           )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your portfolio..."
                    className="flex-grow block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
                    disabled={isLoading || !chat}
                />
                <button type="submit" disabled={isLoading || !chat || !input.trim()} className="p-2 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors">
                    <SendIcon />
                </button>
            </form>
        </div>
    );
};

export default ChatPanel;
