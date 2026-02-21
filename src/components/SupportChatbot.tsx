import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Code,
  Cloud,
  Users,
  Settings,
  Smartphone,
  Globe,
  ShoppingCart,
  Boxes,
  Target,
  Network,
  Headphones,
  Building,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  suggestions?: string[];
}

const SupportChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Comprehensive FAQ database based on site content
  const faqs: FAQ[] = [
    // Company Information
    {
      question: "What is MangosOrange?",
      answer: "MangosOrange is an integrated IT service provider company founded in 2017, backed by over 100 years of combined industry experience. We specialize in cutting-edge IT solutions and comprehensive business services, serving 500+ clients across 12+ states and 15+ cities in India.",
      category: "company",
      keywords: ["about", "company", "mangosorange", "who are you", "what do you do"],
      suggestions: ["Our Services", "Contact Information", "Company Experience"]
    },
    {
      question: "Where is MangosOrange located?",
      answer: "Our corporate office is located at G-282, First floor, Sector 63, Noida, Uttar Pradesh - 201301, India. We serve clients across India with presence in 12+ states and 15+ cities.",
      category: "contact",
      keywords: ["location", "address", "office", "where", "noida"],
      suggestions: ["Contact Information", "How to reach us"]
    },
    {
      question: "How can I contact MangosOrange?",
      answer: "You can reach us through:\n📧 Email: info@mangosorange.com\n📞 Phone: +91-120-416 4821\n📍 Office: G-282, First floor, Sector 63, Noida, Uttar Pradesh - 201301\n\nYou can also fill out our contact form on the website for detailed inquiries.",
      category: "contact",
      keywords: ["contact", "phone", "email", "reach", "call", "message"],
      suggestions: ["Business Hours", "Support", "Get Quote"]
    },

    // Services - Web Development
    {
      question: "What web development services do you offer?",
      answer: "We offer comprehensive web development services including:\n• Responsive website design\n• E-commerce solutions\n• CMS development\n• SEO-optimized websites\n• Progressive web apps\n• Custom web applications\n• Performance optimization\n\nOur websites are built with modern frameworks and optimized for Core Web Vitals.",
      category: "services",
      keywords: ["web development", "website", "responsive", "ecommerce", "cms"],
      suggestions: ["E-commerce Services", "Mobile Development", "Get Quote"]
    },

    // Services - Mobile App Development
    {
      question: "Do you develop mobile apps?",
      answer: "Yes! We develop mobile applications for:\n• Native iOS & Android apps\n• Cross-platform solutions (React Native, Flutter)\n• Desktop applications\n• UI/UX design\n• App store optimization\n• Offline-first capabilities\n• Push notifications\n• App maintenance & updates",
      category: "services",
      keywords: ["mobile", "app development", "ios", "android", "react native", "flutter"],
      suggestions: ["Web Development", "Custom Software", "Development Process"]
    },

    // Services - Custom Software
    {
      question: "What custom software solutions do you provide?",
      answer: "We provide end-to-end custom software development including:\n• Enterprise applications\n• CRM/ERP solutions\n• Process automation\n• API development & integration\n• AI-powered business intelligence\n• Microservices architecture\n• Database design\n• Legacy system modernization",
      category: "services",
      keywords: ["custom software", "enterprise", "crm", "erp", "automation", "api"],
      suggestions: ["Cloud Services", "System Integration", "Get Consultation"]
    },

    // Services - Cloud Infrastructure
    {
      question: "What cloud services do you offer?",
      answer: "We offer comprehensive cloud solutions:\n• AWS, Azure, Google Cloud Platform\n• Cloud strategy & consulting\n• Data migration services\n• Multi-cloud solutions\n• Cloud security\n• Backup & disaster recovery\n• Managed cloud services\n• Cost optimization\n• 24/7 monitoring",
      category: "services",
      keywords: ["cloud", "aws", "azure", "gcp", "migration", "infrastructure"],
      suggestions: ["Data Migration", "Cloud Security", "Managed Services"]
    },

    // Services - Staffing
    {
      question: "What staffing services do you provide?",
      answer: "We offer comprehensive staffing solutions:\n• Offshore staffing\n• On-premise staffing\n• Contract solutions\n• RPO (Recruitment Process Outsourcing)\n• Payroll outsourcing\n• Management consulting\n• 48-hour average time-to-hire\n• 95% client retention rate",
      category: "services",
      keywords: ["staffing", "recruitment", "offshore", "onsite", "contract", "rpo", "payroll"],
      suggestions: ["IT Services", "Consulting", "Contact HR"]
    },

    // Services - E-commerce
    {
      question: "Do you build e-commerce websites?",
      answer: "Yes! We create powerful e-commerce solutions:\n• Custom online stores\n• Payment gateway integration\n• Inventory management systems\n• Mobile commerce solutions\n• Shopping cart optimization\n• Multi-vendor platforms\n• Analytics & reporting\n• SEO for e-commerce",
      category: "services",
      keywords: ["ecommerce", "online store", "shopping", "payment", "inventory"],
      suggestions: ["Web Development", "Mobile Apps", "Payment Integration"]
    },

    // Services - Support & Consulting
    {
      question: "Do you provide IT support and consulting?",
      answer: "Yes! We offer comprehensive IT support:\n• 24/7 technical support\n• IT consulting & strategy\n• System integration\n• Network management\n• Security services\n• System monitoring\n• User training\n• Troubleshooting",
      category: "services",
      keywords: ["support", "consulting", "it support", "help", "technical", "monitoring"],
      suggestions: ["Cloud Services", "Security", "Contact Support"]
    },

    // Pricing & Process
    {
      question: "How much do your services cost?",
      answer: "Our pricing depends on project complexity, scope, and requirements. We offer competitive rates and transparent pricing. Contact us for a free consultation and detailed quote. We provide:\n• Free initial consultation\n• Detailed project estimates\n• Flexible pricing models\n• No hidden costs\n• Payment plans available",
      category: "pricing",
      keywords: ["cost", "price", "pricing", "quote", "estimate", "budget"],
      suggestions: ["Get Quote", "Free Consultation", "Contact Sales"]
    },
    {
      question: "What is your development process?",
      answer: "Our proven development process includes:\n1. Discovery & Requirements Analysis\n2. Design & Architecture Planning\n3. Development & Implementation\n4. Testing & Quality Assurance\n5. Deployment & Go-live\n6. Ongoing Support & Maintenance\n\nWe follow agile methodologies and keep you involved throughout the process.",
      category: "process",
      keywords: ["process", "methodology", "development", "agile", "how do you work"],
      suggestions: ["Project Timeline", "Quality Assurance", "Support"]
    },

    // Technical Questions
    {
      question: "What technologies do you use?",
      answer: "We work with modern technologies including:\n• Frontend: React, Angular, Vue.js, HTML5, CSS3\n• Backend: Node.js, Python, Java, .NET, PHP\n• Mobile: React Native, Flutter, Swift, Kotlin\n• Cloud: AWS, Azure, Google Cloud\n• Databases: MySQL, PostgreSQL, MongoDB\n• DevOps: Docker, Kubernetes, CI/CD",
      category: "technical",
      keywords: ["technologies", "tech stack", "programming", "frameworks", "tools"],
      suggestions: ["Development Process", "Custom Software", "Cloud Services"]
    },

    // Support & Maintenance
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Absolutely! We provide comprehensive post-launch support:\n• 24/7 technical support\n• Regular updates & maintenance\n• Security patches\n• Performance monitoring\n• Bug fixes & enhancements\n• Backup & recovery services\n• SLA-based support packages",
      category: "support",
      keywords: ["support", "maintenance", "after", "ongoing", "updates", "bugs"],
      suggestions: ["Support Packages", "SLA", "Contact Support"]
    },

    // Industries
    {
      question: "Which industries do you serve?",
      answer: "We serve diverse industries including:\n• Healthcare (HMIS solutions)\n• Finance & Banking\n• E-commerce & Retail\n• Education\n• Manufacturing\n• Real Estate\n• Startups to Enterprises\n• Government & Public sector",
      category: "industries",
      keywords: ["industries", "sectors", "healthcare", "finance", "retail", "education"],
      suggestions: ["Healthcare Solutions", "Enterprise Services", "Case Studies"]
    },

    // Timeline & Project Management
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity:\n• Simple websites: 2-4 weeks\n• Complex web applications: 2-6 months\n• Mobile apps: 3-6 months\n• Enterprise software: 6-12 months\n• Cloud migration: 1-3 months\n\nWe provide detailed timelines during project planning and keep you updated throughout.",
      category: "timeline",
      keywords: ["timeline", "duration", "how long", "time", "project", "delivery"],
      suggestions: ["Development Process", "Get Quote", "Project Planning"]
    }
  ];

  // Welcome message and initial suggestions
  const welcomeMessage: Message = {
    id: 'welcome',
    text: "👋 Hello! I'm the MangosOrange support assistant. I can help you with information about our IT services, staffing solutions, pricing, and more. How can I assist you today?",
    sender: 'bot',
    timestamp: new Date(),
    suggestions: [
      "Our Services",
      "Contact Information",
      "Get Quote",
      "Pricing Information",
      "Support"
    ]
  };

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Find best matching FAQ
  const findBestMatch = (userInput: string): FAQ | null => {
    const input = userInput.toLowerCase();
    
    // Exact question match
    let exactMatch = faqs.find(faq => 
      faq.question.toLowerCase() === input
    );
    if (exactMatch) return exactMatch;

    // Keyword match with scoring
    const matches = faqs.map(faq => {
      const score = faq.keywords.reduce((acc, keyword) => {
        if (input.includes(keyword.toLowerCase())) {
          return acc + keyword.length;
        }
        return acc;
      }, 0);
      return { faq, score };
    }).filter(match => match.score > 0)
      .sort((a, b) => b.score - a.score);

    return matches.length > 0 ? matches[0].faq : null;
  };

  // Generate fallback response
  const generateFallbackResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return {
        id: Date.now().toString(),
        text: "Hello! 👋 I'm here to help you with information about MangosOrange's services. What would you like to know?",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ["Our Services", "Contact Information", "Get Quote"]
      };
    }

    if (input.includes('thank') || input.includes('thanks')) {
      return {
        id: Date.now().toString(),
        text: "You're welcome! 😊 Is there anything else I can help you with regarding our services?",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ["Contact Information", "More Services", "Get Quote"]
      };
    }

    return {
      id: Date.now().toString(),
      text: "I can help you with questions about our IT services, staffing solutions, pricing, and more. Could you ask me something related to MangosOrange's services? For specific technical support or detailed inquiries, please contact us directly.",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "Our Services", 
        "Contact Information", 
        "Pricing Information",
        "Support Options"
      ]
    };
  };

  // Handle user message
  const handleSendMessage = async (messageText: string = inputValue) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const bestMatch = findBestMatch(messageText);
      
      let botResponse: Message;
      if (bestMatch) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: bestMatch.answer,
          sender: 'bot',
          timestamp: new Date(),
          suggestions: bestMatch.suggestions
        };
      } else {
        botResponse = generateFallbackResponse(messageText);
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-all duration-300 bg-gradient-to-r from-primary to-primary-glow"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[600px] shadow-2xl border-0 bg-background/95 backdrop-blur-sm">
          {/* Header */}
          <CardHeader className="pb-3 border-b bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">MangosOrange Support</CardTitle>
                  <p className="text-sm opacity-90">Online • Instant Help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="p-0 h-[450px] flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {message.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                        </div>
                        <div className={`rounded-2xl p-3 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground ml-2'
                            : 'bg-muted text-foreground mr-2'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                        </div>
                      </div>
                      
                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs h-7 rounded-full"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                        <Bot className="w-3 h-3" />
                      </div>
                      <div className="bg-muted rounded-2xl p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about our services..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SupportChatbot;