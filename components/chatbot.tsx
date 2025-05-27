"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  X,
  Send,
  RotateCcw,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

// Product recommendation interface
interface ProductRecommendation {
  id: string;
  name: string;
  description: string;
  url: string;
  research_url: string;
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
  {
    id: "7",
    question: "What product is best for eye health and vision support?",
    answer:
      "Vitalis Vision is our specialized formula for supporting eye health and optimal vision. It contains key antioxidants and nutrients like golden berry (uchuva), carrot extract, and natural carotenoids that help protect against oxidative stress and support overall eye function.",
    keywords: [
      "eye",
      "vision",
      "sight",
      "seeing",
      "eyesight",
      "vision problems",
      "macular",
      "retina",
      "antioxidants",
      "carotenoids",
    ],
  },
  {
    id: "8",
    question: "Which supplement helps with brain function and memory?",
    answer:
      "Vitalis Neuro is specifically formulated to support cognitive function, memory, and focus. Its blend of cacao flavanols, rosemary, and other brain-supporting nutrients promotes healthy circulation to the brain and provides neuroprotective compounds.",
    keywords: [
      "brain",
      "memory",
      "cognitive",
      "focus",
      "concentration",
      "thinking",
      "forgetfulness",
      "mental clarity",
      "brain fog",
    ],
  },
  {
    id: "9",
    question: "What's your best supplement for immune support?",
    answer:
      "Vitalis Fortify is our comprehensive formula for strengthening immune defenses and metabolic health. It contains a nutrient-dense blend including moringa, golden berry, and cinnamon that provides essential vitamins and minerals while supporting balanced blood sugar levels.",
    keywords: [
      "immune",
      "immunity",
      "defense",
      "resistance",
      "metabolic",
      "blood sugar",
      "energy",
      "vitality",
      "metabolism",
    ],
  },
];

// Define product recommendations
const productRecommendations: ProductRecommendation[] = [
  {
    id: "vision",
    name: "Vitalis Vision",
    description:
      "Supports optimal vision, provides robust antioxidant defense, aids digestive regularity, and contributes to strong bones.",
    url: "/buy/individual/vision",
    research_url: "/research#vision",
    keywords: [
      "vision",
      "eye",
      "eyes",
      "sight",
      "see",
      "seeing",
      "antioxidant",
      "digestion",
      "digestive",
      "bones",
      "bone",
      "strength",
      "immune",
      "immunity",
      "golden berry",
      "uchuva",
      "carrot",
      "orange",
      "chia",
      "sesame",
      "annatto",
      "achiote",
    ],
  },
  {
    id: "neuro",
    name: "Vitalis Neuro",
    description:
      "Supports heart & circulation health, boosts brain health & cognitive function, and combats age-related inflammation.",
    url: "/buy/individual/neuro",
    research_url: "/research#neuro",
    keywords: [
      "brain",
      "memory",
      "focus",
      "concentration",
      "cognitive",
      "thinking",
      "heart",
      "cardiovascular",
      "circulation",
      "blood flow",
      "inflammation",
      "orange",
      "cacao",
      "ginger",
      "chia",
      "sesame",
      "rosemary",
    ],
  },
  {
    id: "fortify",
    name: "Vitalis Fortify",
    description:
      "Promotes balanced blood sugar levels, provides essential vitamins & minerals, and strengthens natural immune defenses.",
    url: "/buy/individual/fortify",
    research_url: "/research#fortify",
    keywords: [
      "metabolism",
      "blood sugar",
      "glucose",
      "diabetes",
      "immune",
      "immunity",
      "defense",
      "defenses",
      "vitamins",
      "minerals",
      "antioxidant",
      "inflammation",
      "golden berry",
      "uchuva",
      "cinnamon",
      "loquat",
      "chia",
      "moringa",
    ],
  },
];

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: "text" | "faq" | "suggestion" | "recommendation";
  productId?: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialization with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: "welcome-message",
        text: "Hi! I'm your Vitalis assistant. How can I help with your supplement needs today?",
        isBot: true,
        timestamp: new Date(),
        type: "text",
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Modify the useEffect to be more specific about click handling
  useEffect(() => {
    // We'll handle closing only with the explicit close button
    // No automatic closing on outside clicks to ensure stability
    return () => {};
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

  // Find product recommendation based on user query
  const findProductRecommendation = (
    query: string
  ): ProductRecommendation | null => {
    const lowerQuery = query.toLowerCase();

    // Try keyword matching
    let bestMatch: ProductRecommendation | null = null;
    let highestScore = 0;

    for (const product of productRecommendations) {
      let score = 0;

      // Check keywords
      for (const keyword of product.keywords) {
        if (lowerQuery.includes(keyword.toLowerCase())) {
          score += 2;
        }
      }

      if (score > highestScore && score >= 2) {
        highestScore = score;
        bestMatch = product;
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
    type: "text" | "faq" | "suggestion" | "recommendation" = "text",
    productId?: string
  ) => {
    const message: Message = {
      id: Date.now().toString() + Math.random(),
      text,
      isBot,
      timestamp: new Date(),
      type,
      productId,
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
      const productRecommendation = findProductRecommendation(userQuestion);

      if (matchedFAQ) {
        addMessage(matchedFAQ.answer, true, "faq");

        // If we also have a product recommendation, add it after the FAQ
        if (productRecommendation) {
          setTimeout(() => {
            simulateTyping(() => {
              addMessage(
                `Based on your question, I'd recommend checking out ${productRecommendation.name}. ${productRecommendation.description}`,
                true,
                "recommendation",
                productRecommendation.id
              );
            }, 800);
          }, 1000);
        }
      } else if (productRecommendation) {
        // If we only have a product recommendation
        addMessage(
          `Based on what you're looking for, I'd recommend our ${productRecommendation.name}. ${productRecommendation.description}`,
          true,
          "recommendation",
          productRecommendation.id
        );
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

      // Check if there's a product recommendation related to this FAQ
      const productRecommendation = findProductRecommendation(faq.question);
      if (productRecommendation) {
        setTimeout(() => {
          simulateTyping(() => {
            addMessage(
              `Based on your question, I'd recommend checking out ${productRecommendation.name}. ${productRecommendation.description}`,
              true,
              "recommendation",
              productRecommendation.id
            );
          }, 800);
        }, 1000);
      }
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
        id: "welcome-message",
        text: "Hi! I'm your Vitalis assistant. How can I help with your supplement needs today?",
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

  // Handle closing the chat explicitly
  const handleCloseChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  // Open product page in a new tab without closing chat
  const navigateToProduct = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(url, "_blank");
  };

  // Helper function to handle product selection
  const handleProductSelection = (healthConcern: string) => {
    let recommendedProduct: ProductRecommendation | null = null;

    // Match health concern to appropriate product
    if (
      healthConcern.toLowerCase().includes("eye") ||
      healthConcern.toLowerCase().includes("vision") ||
      healthConcern.toLowerCase().includes("sight")
    ) {
      recommendedProduct =
        productRecommendations.find((p) => p.id === "vision") || null;
    } else if (
      healthConcern.toLowerCase().includes("brain") ||
      healthConcern.toLowerCase().includes("memory") ||
      healthConcern.toLowerCase().includes("focus") ||
      healthConcern.toLowerCase().includes("cognitive")
    ) {
      recommendedProduct =
        productRecommendations.find((p) => p.id === "neuro") || null;
    } else if (
      healthConcern.toLowerCase().includes("immune") ||
      healthConcern.toLowerCase().includes("metabolism") ||
      healthConcern.toLowerCase().includes("blood sugar") ||
      healthConcern.toLowerCase().includes("energy")
    ) {
      recommendedProduct =
        productRecommendations.find((p) => p.id === "fortify") || null;
    }

    if (recommendedProduct) {
      // Add recommendation message
      addMessage(
        `Based on your interest in ${healthConcern}, I recommend ${recommendedProduct.name}. ${recommendedProduct.description}`,
        true,
        "recommendation",
        recommendedProduct.id
      );
    } else {
      // Generic response if no specific match
      addMessage(
        "We have several products that might help with that. Our Vision+ supports eye health, Neuro+ supports brain function, and Fortify+ supports immune health and metabolism. Which area are you most interested in?",
        true
      );
    }
  };

  return (
    <>
      {isMounted &&
        createPortal(
          <>
            {/* Chat Button */}
            {!isOpen && (
              <div
                className="chat-button-container"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    openChat();
                  }}
                  className="chat-button-fix h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-700 hover:bg-emerald-800 shadow-lg transition-all duration-200 hover:scale-110"
                  size="icon"
                  aria-label="Open chat assistant"
                >
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>
            )}

            {/* Chat Window Container */}
            {isOpen && (
              <div
                id="chatbot-container"
                className="fixed bottom-0 right-0 p-4 z-[99999]"
                onClick={(e) => {
                  // This prevents click from reaching document
                  e.stopPropagation();
                }}
              >
                {/* Chat Window */}
                <div
                  className="w-full max-w-sm sm:w-96 bg-white rounded-lg shadow-2xl overflow-hidden"
                  style={{
                    height: "600px",
                    maxHeight: "600px",
                  }}
                >
                  {/* Header */}
                  <div
                    className="flex flex-row items-center justify-between p-4 bg-emerald-700 text-white rounded-t-lg"
                    style={{ height: "60px", minHeight: "60px" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="text-lg font-semibold">
                        Vitalis Assistant
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          resetChat();
                        }}
                        className="h-8 w-8 text-white hover:bg-emerald-800"
                        aria-label="Reset chat"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCloseChat}
                        className="h-8 w-8 text-white hover:bg-emerald-800"
                        aria-label="Close chat"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content area */}
                  <div
                    className="flex flex-col overflow-hidden"
                    style={{ height: "calc(100% - 60px)" }}
                  >
                    {/* Messages */}
                    <div
                      className="overflow-y-auto p-4 space-y-4 bg-gray-50"
                      style={{ height: "calc(100% - 85px)" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.isBot ? "justify-start" : "justify-end"
                          }`}
                        >
                          {message.type === "suggestion" ? (
                            // Health concern selection buttons
                            <div className="w-full grid grid-cols-1 gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-left justify-start h-auto p-3 text-xs bg-white hover:bg-emerald-50 border-emerald-200 text-gray-700 hover:text-emerald-800 transition-colors whitespace-normal"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addMessage(
                                    "I'm interested in eye health and vision",
                                    false
                                  );

                                  // Show typing indicator
                                  setIsTyping(true);

                                  // Process selection after a delay
                                  setTimeout(() => {
                                    setIsTyping(false);
                                    handleProductSelection("eye health");
                                  }, 800);
                                }}
                              >
                                <span>Eye health and vision</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-left justify-start h-auto p-3 text-xs bg-white hover:bg-emerald-50 border-emerald-200 text-gray-700 hover:text-emerald-800 transition-colors whitespace-normal"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addMessage(
                                    "I'm interested in brain function and memory",
                                    false
                                  );

                                  // Show typing indicator
                                  setIsTyping(true);

                                  // Process selection after a delay
                                  setTimeout(() => {
                                    setIsTyping(false);
                                    handleProductSelection("brain function");
                                  }, 800);
                                }}
                              >
                                <span>Brain function and memory</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-left justify-start h-auto p-3 text-xs bg-white hover:bg-emerald-50 border-emerald-200 text-gray-700 hover:text-emerald-800 transition-colors whitespace-normal"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addMessage(
                                    "I'm interested in immune support and metabolism",
                                    false
                                  );

                                  // Show typing indicator
                                  setIsTyping(true);

                                  // Process selection after a delay
                                  setTimeout(() => {
                                    setIsTyping(false);
                                    handleProductSelection("immune support");
                                  }, 800);
                                }}
                              >
                                <span>Immune support and metabolism</span>
                              </Button>
                            </div>
                          ) : (
                            <div
                              className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed break-words ${
                                message.isBot
                                  ? "bg-white text-gray-800 shadow-sm border border-gray-100"
                                  : "bg-emerald-700 text-white shadow-sm"
                              } ${
                                message.type === "recommendation"
                                  ? "space-y-3"
                                  : ""
                              }`}
                            >
                              {message.text}

                              {/* If this is a product recommendation, add links to product and research */}
                              {message.type === "recommendation" &&
                                message.productId && (
                                  <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                      <span className="text-xs font-medium text-emerald-700">
                                        RECOMMENDED PRODUCT
                                      </span>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                      <Link
                                        href={
                                          productRecommendations.find(
                                            (p) => p.id === message.productId
                                          )?.url || "/buy/individual"
                                        }
                                        className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 hover:underline font-medium text-xs transition-colors break-words"
                                        onClick={(e) => {
                                          navigateToProduct(
                                            e,
                                            productRecommendations.find(
                                              (p) => p.id === message.productId
                                            )?.url || "/buy/individual"
                                          );
                                        }}
                                      >
                                        <span className="break-words">
                                          Shop{" "}
                                          {
                                            productRecommendations.find(
                                              (p) => p.id === message.productId
                                            )?.name
                                          }
                                        </span>
                                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                      </Link>
                                      <Link
                                        href="/research"
                                        className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 hover:underline font-medium text-xs transition-colors break-words"
                                        onClick={(e) => {
                                          navigateToProduct(
                                            e,
                                            `/research#${message.productId}`
                                          );
                                        }}
                                      >
                                        <span className="break-words">
                                          View{" "}
                                          {
                                            productRecommendations.find(
                                              (p) => p.id === message.productId
                                            )?.name
                                          }{" "}
                                          research
                                        </span>
                                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                      </Link>
                                    </div>
                                  </div>
                                )}
                            </div>
                          )}
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

                      {/* FAQ Quick Buttons - Only show at start of conversation */}
                      {messages.length > 0 &&
                        messages[messages.length - 1]?.isBot &&
                        !isTyping &&
                        (messages.length <= 2 ||
                          messages[messages.length - 1].id ===
                            "welcome-message") && (
                          <div className="space-y-3 pt-2">
                            {/* Product Help Button */}
                            <Button
                              variant="default"
                              size="sm"
                              className="w-full p-3 text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-medium transition-colors whitespace-normal text-left h-auto"
                              onClick={(e) => {
                                e.stopPropagation();
                                addMessage("Help me choose a product", false);

                                // First show typing indicator
                                setIsTyping(true);

                                // Then show the initial message
                                setTimeout(() => {
                                  setIsTyping(false);
                                  addMessage(
                                    "What health concerns are you looking to address? Eye health, brain function, or immune support?",
                                    true
                                  );

                                  // Then show typing again before adding buttons
                                  setTimeout(() => {
                                    setIsTyping(true);

                                    // Finally add the buttons
                                    setTimeout(() => {
                                      setIsTyping(false);
                                      setMessages((prevMessages) => [
                                        ...prevMessages,
                                        {
                                          id:
                                            Date.now().toString() +
                                            Math.random(),
                                          text: "",
                                          isBot: true,
                                          timestamp: new Date(),
                                          type: "suggestion",
                                        },
                                      ]);
                                    }, 600);
                                  }, 300);
                                }, 800);
                              }}
                            >
                              Help me choose a product
                            </Button>

                            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                              <HelpCircle className="h-3 w-3" />
                              <span>Common Questions:</span>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              {/* First show product-specific questions */}
                              {faqs.slice(6, 9).map((faq) => (
                                <Button
                                  key={faq.id}
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-left justify-start h-auto p-3 text-xs bg-white hover:bg-emerald-50 border-emerald-200 text-gray-700 hover:text-emerald-800 transition-colors whitespace-normal"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFAQClick(faq);
                                  }}
                                >
                                  <span className="line-clamp-2">
                                    {faq.question}
                                  </span>
                                </Button>
                              ))}
                              {/* Then show general FAQs */}
                              {faqs.length > 9 && (
                                <details
                                  className="group"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <summary
                                    className="cursor-pointer text-xs text-emerald-700 hover:text-emerald-800 font-medium p-2 rounded bg-emerald-50 hover:bg-emerald-100 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    Show more general questions...
                                  </summary>
                                  <div
                                    className="mt-2 space-y-2"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {faqs.slice(0, 6).map((faq) => (
                                      <Button
                                        key={faq.id}
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-left justify-start h-auto p-3 text-xs bg-white hover:bg-emerald-50 border-emerald-200 text-gray-700 hover:text-emerald-800 transition-colors whitespace-normal"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleFAQClick(faq);
                                        }}
                                      >
                                        <span className="line-clamp-2">
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

                    {/* Input - Fixed height */}
                    <div
                      className="border-t bg-white p-4"
                      style={{ height: "85px", minHeight: "85px" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="flex gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          ref={inputRef}
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask about our products or health needs..."
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          disabled={isTyping}
                        />
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendMessage();
                          }}
                          size="icon"
                          className="bg-emerald-700 hover:bg-emerald-800 rounded-full h-12 w-12 shadow-sm transition-all hover:scale-105"
                          disabled={isTyping || !inputValue.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Ask about ingredients, our products, or specific health
                        needs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>,
          document.body
        )}
    </>
  );
}
