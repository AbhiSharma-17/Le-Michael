import { useState, useRef, useEffect } from "react";
import { Send, Loader2, ShieldAlert, Crosshair } from "lucide-react";
import Markdown from "react-markdown";
import ChatInput from "../components/ChatInput";

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function ViolenceResponseAgent({ onBack }: { onBack: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages, agent: "violence" }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      let content = data.text;
      
      try {
        if (content.startsWith("{") || content.includes('```json')) {
          const rawJson = content.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(rawJson);
          content = `**Crime Type:** ${parsed.crime_type || 'Unknown'}\n**Threat Level:** ${parsed.threat_level || 'Unknown'}\n\n**Immediate Actions:**\n${(parsed.immediate_actions || []).map((s: string) => `- ${s}`).join('\\n')}\n\n**Recommended Services:**\n${(parsed.recommended_services || []).map((s: string) => `- ${s}`).join('\\n')}\n\n**Questions:**\n${(parsed.questions || []).map((s: string) => `- ${s}`).join('\\n')}\n\n${parsed.activate_agents && parsed.activate_agents.length > 0 ? `**Agents to Activate:**\n${parsed.activate_agents.map((s: string) => `- ${s}`).join('\\n')}` : ''}`;
        }
      } catch (e) {
        // Fallback to raw content if JSON parsing fails
      }

      setMessages(prev => [...prev, { role: "model", content }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: "model", content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-dvh bg-gray-50 font-sans">
      {/* Header */}
      <header className="flex items-center gap-3 bg-purple-600 text-white p-4 shadow-md shrink-0">
        <button onClick={onBack} className="mr-2 hover:bg-purple-700 p-2 rounded-full transition-colors">
          &larr; Back
        </button>
        <Crosshair size={24} />
        <div>
          <h1 className="text-lg font-bold tracking-wide leading-tight">Crime Intelligence AI</h1>
          <p className="text-xs text-purple-200 font-medium">Ready to assist safely</p>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 mb-2">
              <Crosshair size={32} />
            </div>
            <p className="text-center max-w-sm font-medium">
              I am the Crime Intelligence AI. Describe the situation, and I will help you assess the threat and stay safe.
            </p>
            <div className="grid grid-cols-1 gap-2 mt-4 w-full max-w-md">
              <button 
                onClick={() => setInput("Someone is following me down the street and I am alone.")}
                className="bg-white border border-gray-200 p-3 rounded-lg text-sm text-left hover:bg-gray-50 transition-colors"
              >
                "Someone is following me down the street and I am alone."
              </button>
              <button 
                onClick={() => setInput("There's a fight breaking out in the restaurant I'm in.")}
                className="bg-white border border-gray-200 p-3 rounded-lg text-sm text-left hover:bg-gray-50 transition-colors"
              >
                "There's a fight breaking out in the restaurant I'm in."
              </button>
            </div>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[90%] sm:max-w-[75%] rounded-2xl px-5 py-4 ${
              msg.role === "user" 
                ? "bg-purple-600 text-white rounded-br-none" 
                : "bg-white border border-gray-200 shadow-sm rounded-bl-none text-gray-800"
            }`}>
              {msg.role === "model" ? (
                <div className="markdown-body text-sm leading-relaxed">
                  <Markdown>{msg.content}</Markdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-bl-none px-5 py-4 flex items-center gap-3 text-gray-500">
              <Loader2 size={18} className="animate-spin text-purple-500" />
              <span className="text-sm font-medium">Analyzing situation...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      <ChatInput 
        input={input}
        setInput={setInput}
        loading={loading}
        onSubmit={handleSubmit}
        themeColor="purple"
        placeholder="Describe the situation..."
      />
    </div>
  );
}
