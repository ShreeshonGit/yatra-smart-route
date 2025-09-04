import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Mic, MicOff, Bot, User } from "lucide-react";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI travel assistant. I can help you with booking tickets, tracking buses, finding routes, and answering travel queries. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'Hindi', 'Punjabi', 'Urdu'];

  const quickQuestions = [
    "Book a ticket from Ludhiana to Amritsar",
    "Show me bus timings for today",
    "Track my current booking",
    "Find nearest bus stop",
    "Check seat availability",
    "Cancel my booking"
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: generateAIResponse(newMessage),
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setNewMessage('');
  };

  const generateAIResponse = (question: string) => {
    const responses = {
      'book': 'I can help you book a ticket! Please tell me your origin and destination cities, travel date, and number of passengers.',
      'timing': 'Here are today\'s bus timings:\n• Ludhiana → Amritsar: 6:00 AM, 8:30 AM, 11:00 AM, 2:00 PM, 5:00 PM\n• Jalandhar → Bathinda: 7:00 AM, 10:00 AM, 1:00 PM, 4:00 PM',
      'track': 'To track your booking, please provide your booking ID or registered mobile number.',
      'bus stop': 'The nearest bus stop to your location is City Bus Terminal, approximately 2.3 km away. Would you like directions?',
      'seat': 'Let me check seat availability. Which route and date are you interested in?',
      'cancel': 'I can help you cancel your booking. Please provide your booking ID and I\'ll process the cancellation.'
    };

    const lowerQuestion = question.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response;
      }
    }

    return `I understand you're asking about "${question}". I'm here to help with bus bookings, schedules, tracking, and travel information. Could you please provide more specific details about what you need?`;
  };

  const handleQuickQuestion = (question: string) => {
    setNewMessage(question);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input simulation
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setNewMessage("Book a ticket from Ludhiana to Amritsar for tomorrow");
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            AI Chat Assistant
          </CardTitle>
          <CardDescription>
            Get instant help with bookings, schedules, and travel queries
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Language Selection */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Select Language:</p>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Questions */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Quick Questions:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto p-2"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Chat Assistant</span>
            <Badge variant="secondary">
              {selectedLanguage}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="h-64 overflow-y-auto mb-4 space-y-3 p-3 border rounded-lg bg-muted/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-primary' : 'bg-secondary'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`flex-1 max-w-xs ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-8' 
                      : 'bg-white mr-8'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder={`Type your message in ${selectedLanguage}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleVoiceInput}
              className={isListening ? 'bg-destructive text-destructive-foreground' : ''}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {isListening && (
            <div className="mt-2 p-2 bg-destructive/10 rounded-lg text-center">
              <p className="text-sm text-destructive">🎤 Listening... Speak now</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voice Assistant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-secondary" />
            Voice Assistant
          </CardTitle>
          <CardDescription>
            Talk to our AI assistant in your preferred language
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <Button
              size="lg"
              variant={isListening ? "destructive" : "secondary"}
              onClick={toggleVoiceInput}
              className="w-full"
            >
              {isListening ? (
                <>
                  <MicOff className="w-5 h-5 mr-2" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 mr-2" />
                  Start Voice Chat
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground">
              Say commands like "Book ticket", "Check timing", or "Track my bus" in {selectedLanguage}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;