'use client';

import { useState, useRef, useEffect } from 'react';
import { useProgram } from '@/context/ProgramContext';

type AIMode = 'qa' | 'clinical' | 'entrustment' | 'research';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const modes: { key: AIMode; label: string; icon: string; description: string; placeholder: string }[] = [
  {
    key: 'qa',
    label: 'Q&A',
    icon: '❓',
    description: 'Ask about EPAs, competencies, domains, and the curriculum framework',
    placeholder: 'e.g., "What does competency C8 require at the residency level?"',
  },
  {
    key: 'clinical',
    label: 'Clinical Reasoning',
    icon: '🧠',
    description: 'Get program-appropriate clinical guidance grounded in the curriculum',
    placeholder: 'e.g., "A patient presents with cervical radiculopathy and high fear-avoidance..."',
  },
  {
    key: 'entrustment',
    label: 'Entrustment Support',
    icon: '📊',
    description: 'Calibrate entrustment decisions using real behavioral descriptors',
    placeholder: 'e.g., "A resident can perform exams independently at low complexity but needs guidance at moderate..."',
  },
  {
    key: 'research',
    label: 'Research',
    icon: '🔍',
    description: 'Search across curriculum documents and framework references',
    placeholder: 'e.g., "What does the Master Curriculum say about complexity classification?"',
  },
];

export default function AdvisorPage() {
  const { selectedProgram, selectedSlug } = useProgram();
  const [activeMode, setActiveMode] = useState<AIMode>('qa');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMode = modes.find((m) => m.key === activeMode)!;

  // Reset messages when mode or program changes
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: getWelcomeMessage(activeMode, selectedProgram?.name || 'Fellowship'),
      },
    ]);
  }, [activeMode, selectedProgram?.name]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          mode: activeMode,
          program: selectedSlug,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again or check that the API key is configured.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 h-[calc(100vh-40px)] flex flex-col">
      {/* Header */}
      <section className="space-y-2 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#1F3864]">AI Advisor</h1>
          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
            {selectedProgram?.name}
          </span>
        </div>
      </section>

      {/* Mode Tabs */}
      <section className="flex gap-2 pb-4 border-b border-gray-200 overflow-x-auto">
        {modes.map((mode) => (
          <button
            key={mode.key}
            onClick={() => setActiveMode(mode.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeMode === mode.key
                ? 'bg-[#1F3864] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span>{mode.icon}</span>
            <span>{mode.label}</span>
          </button>
        ))}
      </section>

      {/* Mode Description */}
      <div className="py-2 text-xs text-gray-500">{currentMode.description}</div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl rounded-lg p-4 ${
                msg.role === 'user'
                  ? 'bg-[#2E75B6] text-white'
                  : 'bg-white text-gray-800 shadow'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 shadow rounded-lg p-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 pt-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                handleSubmit(e);
              }
            }}
            placeholder={currentMode.placeholder}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E75B6] resize-none text-sm"
            rows={3}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-[#2E75B6] text-white rounded-lg hover:bg-[#1F3864] disabled:bg-gray-400 transition-colors font-medium self-end text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

function getWelcomeMessage(mode: AIMode, programName: string): string {
  switch (mode) {
    case 'qa':
      return `Welcome to the ${programName} EPA Q&A. Ask me anything about EPAs, competencies, domains, entrustment levels, or the curriculum framework. I'll ground my answers in the actual ${programName} data.`;
    case 'clinical':
      return `Welcome to the ${programName} Clinical Reasoning Advisor. Describe a clinical scenario and I'll help you identify relevant EPAs, competencies, complexity level, and program-appropriate clinical guidance grounded in the ${programName} curriculum.`;
    case 'entrustment':
      return `Welcome to the ${programName} Entrustment Decision Support. Describe a learner's performance and I'll help calibrate the entrustment level using the ${programName} behavioral descriptors and complexity framework.`;
    case 'research':
      return `Welcome to the ${programName} Research tool. Ask me to search across the curriculum documents, competency definitions, EPA specifications, and framework references.`;
  }
}
