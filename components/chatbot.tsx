"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send, RotateCcw, HelpCircle } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "What makes Vitalis supplements different?",
    answer:
      "Vitalis stands out through our commitment to evidence-based formulations, sustainable sourcing from Colombia and Costa Rica, and transparent manufacturing processes. We focus on bioavailability, optimal dosing, and synergistic ingredient combinations that deliver noticeable results.",
    keywords: [
      "different",
      "unique",
      "special",
      "stands out",
      "commitment",
      "evidence-based",
      "formulations",
    ],
  },
  {
    id: "2",
    question: "How are your ingredients sourced?",
    answer:
      "We ethically source our premium ingredients directly from family farms in Colombia and Costa Rica. This farm-to-label approach ensures fair compensation for farmers, sustainable agricultural practices, and the highest quality botanicals with optimal nutrient profiles.",
    keywords: [
      "sourced",
      "ingredients",
      "farms",
      "colombia",
      "costa rica",
      "ethical",
      "sustainable",
      "quality",
    ],
  },
  {
    id: "3",
    question: "Are Vitalis supplements tested for quality and safety?",
    answer:
      "Absolutely. All Vitalis products undergo rigorous testing at multiple stages of production. We use cGMP certified facilities, conduct third-party testing for purity and potency, and verify all raw materials before formulation to ensure you receive only the highest quality supplements.",
    keywords: [
      "tested",
      "quality",
      "safety",
      "testing",
      "cgmp",
      "certified",
      "third-party",
      "purity",
      "potency",
    ],
  },
  {
    id: "4",
    question: "How long will it take to see results?",
    answer:
      "Results vary depending on individual health status and the specific supplement. Generally, some benefits may be noticed within days or weeks, while others develop over consistent use of 2-3 months. For optimal results, we recommend following the suggested dosing protocol and maintaining healthy lifestyle habits.",
    keywords: [
      "results",
      "time",
      "long",
      "benefits",
      "weeks",
      "months",
      "dosing",
      "protocol",
    ],
  },
  {
    id: "5",
    question: "Do your supplements contain allergens?",
    answer:
      "We formulate our supplements to be free from major allergens including gluten, dairy, soy, eggs, and nuts. However, we always recommend reviewing the complete ingredient list if you have specific allergies or sensitivities. All ingredients and potential allergens are clearly listed on our product labels.",
    keywords: [
      "allergens",
      "allergies",
      "gluten",
      "dairy",
      "soy",
      "eggs",
      "nuts",
      "sensitivities",
      "ingredients",
    ],
  },
  {
    id: "6",
    question: "Can I take multiple Vitalis products together?",
    answer:
      "Our product lines are designed to work both independently and synergistically. Many customers experience enhanced benefits from combining products like Vitalis Neuro+ and Vision+. If you have specific health concerns or are taking medications, we recommend consulting with your healthcare provider.",
    keywords: [
      "multiple",
      "together",
      "combine",
      "synergistically",
      "neuro",
      "vision",
      "healthcare",
      "medications",
    ],
  },
];

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: "text" | "faq" | "suggestion";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        text: "Hi! I'm your Vitalis assistant. I'm here to help answer questions about our supplements. How can I help you today?",
        isBot: true,
        timestamp: new Date(),
        type: "text",
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const findBestAnswer = (question: string): FAQ | null => {
    const lowerQuestion = question.toLowerCase();

    // First, try exact question match
    const exactMatch = faqs.find(
      (faq) => faq.question.toLowerCase() === lowerQuestion
    );
    if (exactMatch) return exactMatch;

    // Then try keyword matching
    let bestMatch: FAQ | null = null;
    let highestScore = 0;

    for (const faq of faqs) {
      let score = 0;

      // Check keywords
      for (const keyword of faq.keywords) {
        if (lowerQuestion.includes(keyword.toLowerCase())) {
          score += 2;
        }
      }

      // Check question words
      const questionWords = lowerQuestion
        .split(" ")
        .filter((word) => word.length > 2);
      const faqWords = faq.question.toLowerCase().split(" ");

      for (const word of questionWords) {
        if (
          faqWords.some(
            (faqWord) => faqWord.includes(word) || word.includes(faqWord)
          )
        ) {
          score += 1;
        }
      }

      if (score > highestScore && score >= 2) {
        highestScore = score;
        bestMatch = faq;
      }
    }

    return bestMatch;
  };

  const simulateTyping = (callback: () => void, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const addMessage = (
    text: string,
    isBot: boolean,
    type: "text" | "faq" | "suggestion" = "text"
  ) => {
    const message: Message = {
      id: Date.now().toString() + Math.random(),
      text,
      isBot,
      timestamp: new Date(),
      type,
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    addMessage(inputValue, false);

    const userQuestion = inputValue;
    setInputValue("");

    // Find answer
    simulateTyping(() => {
      const matchedFAQ = findBestAnswer(userQuestion);

      if (matchedFAQ) {
        addMessage(matchedFAQ.answer, true, "faq");
        // Add follow-up suggestions
      } else {
        const fallbackResponse =
          "I'd be happy to help you with that! For questions not covered in our FAQs, please contact our customer support team at support@vitalis.com or call 1-800-VITALIS. You can also try asking about our ingredients, testing, results, allergens, or product combinations.";
        addMessage(fallbackResponse, true);
      }
    });
  };

  const handleFAQClick = (faq: FAQ) => {
    addMessage(faq.question, false, "faq");

    simulateTyping(() => {
      addMessage(faq.answer, true, "faq");
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        text: "Hi! I'm your Vitalis assistant. I'm here to help answer questions about our supplements. How can I help you today?",
        isBot: true,
        timestamp: new Date(),
        type: "text",
      },
    ]);
  };

  const openChat = () => {
    setIsOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={openChat}
          className="fixed bottom-4 right-4 sm:!top-auto sm:bottom-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-700 hover:bg-emerald-800 shadow-lg z-50 transition-all duration-200 hover:scale-110"
          size="icon"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex items-end justify-center sm:justify-end p-4 sm:p-0">
          <Card className="w-full max-w-sm sm:w-96 h-[90vh] sm:h-[600px] shadow-2xl flex flex-col bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-emerald-700 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <CardTitle className="text-lg font-semibold">
                  Vitalis Assistant
                </CardTitle>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetChat}
                  className="h-8 w-8 text-white hover:bg-emerald-800"
                  aria-label="Reset chat"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-white hover:bg-emerald-800"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                        message.isBot
                          ? "bg-white text-gray-800 shadow-sm border border-gray-100"
                          : "bg-emerald-700 text-white shadow-sm"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQ Quick Buttons */}
                {messages.length > 0 &&
                  messages[messages.length - 1]?.isBot &&
                  !isTyping && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <HelpCircle className="h-3 w-3" />
                        <span>Common Questions:</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {faqs.slice(0, 2).map((faq) => (
                          <Button
                            key={faq.id}
                            variant="outline"
                            size="sm"
                            className="w-full text-left justify-start h-auto p-3 text-xs bg-white hover:bg-emerald-50 border-emerald-200 text-gray-700 hover:text-emerald-800 transition-colors"
                            onClick={() => handleFAQClick(faq)}
                          >
                            <span className="truncate">{faq.question}</span>
                          </Button>
                        ))}
                        {faqs.length > 2 && (
                          <details className="group">
                            <summary className="cursor-pointer text-xs text-emerald-700 hover:text-emerald-800 font-medium p-2 rounded bg-emerald-50 hover:bg-emerald-100 transition-colors">
                              Show {faqs.length - 2} more questions...
                            </summary>
                            <div className="mt-2 space-y-2">
                              {faqs.slice(2).map((faq) => (
                                <Button
                                  key={faq.id}
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-left justify-start h-auto p-3 text-xs bg-white hover:bg-emerald-50 border-emerald-200 text-gray-700 hover:text-emerald-800 transition-colors"
                                  onClick={() => handleFAQClick(faq)}
                                >
                                  <span className="truncate">
                                    {faq.question}
                                  </span>
                                </Button>
                              ))}
                            </div>
                          </details>
                        )}
                      </div>
                    </div>
                  )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t bg-white p-4">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your question here..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="bg-emerald-700 hover:bg-emerald-800 rounded-full h-12 w-12 shadow-sm transition-all hover:scale-105"
                    disabled={isTyping || !inputValue.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Ask about ingredients, testing, results, allergens, or product
                  combinations
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
