import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { healthCheck } from '../utils/healthCheck';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIConsultant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isServerHealthy, setIsServerHealthy] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle click outside to close on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    // Initial health check
    healthCheck.checkHealth()
      .then(health => {
        setIsServerHealthy(health.status === 'healthy');
        setServerError(health.lastError);
      })
      .catch(error => {
        setIsServerHealthy(false);
        setServerError('Server health check failed');
      });

    // Start polling for health updates
    healthCheck.startPolling(health => {
      setIsServerHealthy(health.status === 'healthy');
      setServerError(health.lastError);
    });

    return () => {
      healthCheck.stopPolling();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isServerHealthy) return;

    const userMessage = input.trim();
    const newMessage: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Wait for healthy server before proceeding
      const isHealthy = await healthCheck.waitForHealthyServer();
      if (!isHealthy) {
        throw new Error('Server is not healthy');
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get response');
      }

      const data = await response.json();
      if (!data.message) {
        throw new Error('Invalid response format');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again or refresh the page.' 
        }
      ]);
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
        aria-label="Open AI Education Consultant"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div 
      ref={chatWindowRef}
      className="fixed bottom-4 right-4 w-[95vw] md:w-[400px] h-[80vh] md:h-[600px] bg-white rounded-lg shadow-xl flex flex-col z-50"
    >
      {/* Header */}
      <div className="p-4 bg-indigo-600 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI Education Consultant
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200 p-1"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Server Error */}
      {!isServerHealthy && serverError && (
        <div className="p-2 bg-red-100 text-red-700 text-sm rounded-t-lg">
          Server Error: {serverError}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            <p className="mb-2">👋 Hi! I'm your AI education consultant.</p>
            <p className="text-sm">Ask me about:</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Choosing the right bootcamp</li>
              <li>• Career transition advice</li>
              <li>• Course recommendations</li>
              <li>• Learning paths</li>
            </ul>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg flex items-center gap-2">
              <div className="animate-pulse">Thinking</div>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about tech education..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
