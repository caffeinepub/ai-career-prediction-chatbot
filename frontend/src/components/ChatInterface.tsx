import { useState, useRef, useEffect } from 'react';
import { useGetCallerUserProfile } from '../hooks/useGetCallerUserProfile';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useGetCareerPrediction } from '../hooks/useGetCareerPrediction';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles } from 'lucide-react';

export default function ChatInterface() {
  const { data: userProfile } = useGetCallerUserProfile();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { mutate: getCareerPrediction, isPending } = useGetCareerPrediction();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessageType = {
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    getCareerPrediction(content, {
      onSuccess: (prediction) => {
        const aiResponse = `**Your Strengths:**\n${prediction.strengths}\n\n**Areas for Growth:**\n${prediction.weaknesses}\n\n**Recommended Career Paths:**\n${prediction.careerPaths}\n\n**Personalized Advice:**\n${prediction.advice}`;
        
        const aiMessage: ChatMessageType = {
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      },
      onError: (error) => {
        const errorMessage: ChatMessageType = {
          role: 'assistant',
          content: 'I apologize, but I encountered an error processing your request. Please try again.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        console.error('Career prediction error:', error);
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-6 max-w-2xl">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Hello, {userProfile?.name}! 👋
              </h2>
              <p className="text-muted-foreground text-lg">
                I'm your AI career advisor. Share your career aspirations, questions, or concerns, and I'll provide personalized insights to help guide your journey.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <SuggestionCard 
                text="What career paths suit my skills?"
                onClick={() => handleSendMessage("What career paths suit my skills?")}
              />
              <SuggestionCard 
                text="How can I improve my leadership?"
                onClick={() => handleSendMessage("How can I improve my leadership skills?")}
              />
              <SuggestionCard 
                text="Should I pursue a tech career?"
                onClick={() => handleSendMessage("Should I pursue a career in technology?")}
              />
              <SuggestionCard 
                text="Help me plan my next steps"
                onClick={() => handleSendMessage("Help me plan my next career steps")}
              />
            </div>
          </div>
        </div>
      ) : (
        <ScrollArea className="flex-1 px-4 py-6" ref={scrollRef}>
          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isPending && (
              <ChatMessage 
                message={{
                  role: 'assistant',
                  content: 'Analyzing your career profile...',
                  timestamp: new Date()
                }}
                isLoading
              />
            )}
          </div>
        </ScrollArea>
      )}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto p-4">
          <ChatInput onSend={handleSendMessage} disabled={isPending} />
        </div>
      </div>
    </div>
  );
}

function SuggestionCard({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-4 text-left bg-card border border-border rounded-lg hover:bg-accent hover:border-amber-500/50 transition-all text-sm text-foreground"
    >
      {text}
    </button>
  );
}
