import { ChatMessage as ChatMessageType } from '../types/chat';
import { User, Sparkles, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatMessageProps {
  message: ChatMessageType;
  isLoading?: boolean;
}

export default function ChatMessage({ message, isLoading }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className={`w-10 h-10 ${isUser ? 'bg-gradient-to-br from-slate-600 to-slate-700' : 'bg-gradient-to-br from-amber-500 to-orange-500'}`}>
        <AvatarFallback className="text-white">
          {isUser ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex-1 space-y-2 ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`rounded-2xl px-4 py-3 max-w-[85%] ${
          isUser 
            ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white' 
            : 'bg-card border border-border text-foreground'
        }`}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">{message.content}</span>
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {message.content.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={i} className="font-bold mb-2 mt-3 first:mt-0">{line.slice(2, -2)}</p>;
                }
                return line ? <p key={i} className="mb-2 last:mb-0">{line}</p> : <br key={i} />;
              })}
            </div>
          )}
        </div>
        <span className="text-xs text-muted-foreground px-2">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
