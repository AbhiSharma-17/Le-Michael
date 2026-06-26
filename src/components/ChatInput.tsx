import { useState, useEffect, useRef } from "react";
import { Send, Mic, MicOff } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  themeColor: string; // Tailwind color class prefix like 'red', 'blue', 'purple', 'teal', 'zinc'
}

// Ensure speech recognition works across different browsers
const SpeechRecognition = 
  (window as any).SpeechRecognition || 
  (window as any).webkitSpeechRecognition;

export default function ChatInput({ 
  input, 
  setInput, 
  loading, 
  onSubmit, 
  placeholder = "Describe the situation...",
  themeColor
}: ChatInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
        setMicError(null);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if (event.error === 'not-allowed') {
          setMicError('Microphone blocked. Please open in a new tab or check browser permissions.');
        } else {
          setMicError(`Mic error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [setInput]);

  const toggleListen = () => {
    setMicError(null);
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setInput(""); // Clear input when starting to listen? Maybe just append or let user decide, let's clear for fresh start.
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error("Microphone access denied or error starting", err);
        setMicError("Microphone access denied");
      }
    }
  };

  const getThemeClasses = () => {
    switch (themeColor) {
      case 'red':
        return 'focus:border-red-500 focus:ring-red-100 bg-red-600 hover:bg-red-700';
      case 'rose':
        return 'focus:border-rose-500 focus:ring-rose-100 bg-rose-600 hover:bg-rose-700';
      case 'blue':
        return 'focus:border-blue-500 focus:ring-blue-100 bg-blue-600 hover:bg-blue-700';
      case 'purple':
        return 'focus:border-purple-500 focus:ring-purple-100 bg-purple-600 hover:bg-purple-700';
      case 'emerald':
        return 'focus:border-emerald-500 focus:ring-emerald-100 bg-emerald-600 hover:bg-emerald-700';
      case 'teal':
        return 'focus:border-teal-500 focus:ring-teal-100 bg-teal-600 hover:bg-teal-700';
      case 'amber':
        return 'focus:border-amber-500 focus:ring-amber-100 bg-amber-600 hover:bg-amber-700';
      case 'pink':
        return 'focus:border-pink-500 focus:ring-pink-100 bg-pink-600 hover:bg-pink-700';
      case 'sky':
        return 'focus:border-sky-500 focus:ring-sky-100 bg-sky-600 hover:bg-sky-700';
      case 'zinc':
      default:
        return 'focus:border-zinc-500 focus:ring-zinc-200 bg-zinc-800 hover:bg-zinc-900';
    }
  };

  const [focusClass, buttonClass] = getThemeClasses().split(' bg-');

  return (
    <footer className="p-4 bg-white border-t border-gray-200 shrink-0">
      {micError && (
        <div className="max-w-4xl mx-auto mb-2 text-red-600 text-xs px-2 py-1 bg-red-50 border border-red-100 rounded-md">
          {micError}
        </div>
      )}
      <form onSubmit={onSubmit} className="max-w-4xl mx-auto relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? "Listening..." : placeholder}
          disabled={loading}
          className={`w-full bg-gray-100 border border-transparent focus:bg-white ${focusClass} rounded-full py-3.5 pl-5 pr-[100px] transition-all outline-none text-sm`}
        />
        
        <div className="absolute right-2 flex items-center gap-2">
          {SpeechRecognition && (
            <button
              type="button"
              onClick={toggleListen}
              disabled={loading}
              className={`p-2.5 rounded-full ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-gray-500 hover:bg-gray-200'} transition-colors flex items-center justify-center`}
              title="Dictate"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          )}

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={`p-2.5 rounded-full bg-${buttonClass} text-white disabled:opacity-50 disabled:bg-gray-400 transition-colors flex items-center justify-center`}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </footer>
  );
}
