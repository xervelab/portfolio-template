import React, { useState, useEffect, useRef } from "react";
import { 
  Inbox, 
  Sparkles, 
  Cpu, 
  Shield, 
  Send, 
  Check, 
  Plus, 
  Star, 
  MessageSquare, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Layers, 
  CheckCircle,
  X,
  Menu,
  FileText,
  Workflow
} from "lucide-react";
import { SERVICES, SKILLS, PORTFOLIO_PROJECTS, TESTIMONIALS, TIME_SLOTS } from "./data";
import { ServicePackage, Skill, Project, Testimonial, Message, Booking } from "./types";
import profileImage from "./assets/images/celeste_vance_1781580296306.jpg";

export default function App() {
  // Navigation / Scroll high-level highlights
  const [activeTab, setActiveTab] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServicePackage>(SERVICES[1]); // Default to "Creative Support"
  
  // Custom Reviews Dynamic State
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRole, setNewReviewRole] = useState("");
  const [newReviewCompany, setNewReviewCompany] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewSuccess, setNewReviewSuccess] = useState(false);

  // Filter skills
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("All");

  // Booking System State
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingService, setBookingService] = useState<string>(SERVICES[1].id);
  const [bookingDate, setBookingDate] = useState<string>("2026-06-18"); // default upcoming date
  const [bookingTimeSlot, setBookingTimeSlot] = useState<string>("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState<Booking | null>(null);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Chat System State
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I am Celeste's Live AI Assistant coordinator. I can help answer questions about her services, custom Notion packages, automation pipelines, rates, or assist you in reserving a video strategy slot!",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Preset query chips for friction-free chat interaction
  const chatPromptChips = [
    { label: "What is your hourly rate?", query: "What are your standard hourly rates and packages?" },
    { label: "Do you build custom Notion hubs?", query: "Can you describe Celeste's experience with building brand custom Notion Operating workspaces?" },
    { label: "How fast do you respond to clients?", query: "What is your turn-around response time and morning briefings availability?" },
    { label: "What custom automations can you set up?", query: "Can you detail how you integrate Honeybook, Zapier, and Slack for design firms?" }
  ];

  // Auto scroll chat to bottom when message arrives
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isAiTyping]);

  // Handle preset prompt click for the chat
  const handlePromptChipClick = (query: string) => {
    sendChatMessage(query);
  };

  // Chat Send Communication with Server Endpoint
  const sendChatMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const newUserMessage: Message = {
      id: userMsgId,
      text: textToSend,
      sender: "user",
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setUserInput("");
    setIsAiTyping(true);

    try {
      // Format existing conversation into model history structure
      const history = chatMessages
        .filter(m => m.id !== "welcome") // skip welcome instructions if desired, but can pass all
        .map(m => ({
          sender: m.sender,
          text: m.text
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          userMessage: textToSend
        })
      });

      if (!response.ok) {
         throw new Error("Server responded with error status");
      }

      const data = await response.json();
      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        text: data.reply || "I am processing that. It sounds like a fantastic fit for Celeste's systems consulting!",
        sender: "ai",
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiReply]);
    } catch (err) {
      console.error("Chat error:", err);
      // Fallback response inside client UI to keep system bulletproof
      const fallbackReply: Message = {
        id: `ai-err-${Date.now()}`,
        text: `I'd love to partner with you on that! Celeste Vance specializes in custom workspace solutions, email design templates, and administrative calm starting at $35-$50/hr. 

Let's organize a direct 25-minute strategy call using the Booking System on this page!`,
        sender: "ai",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Booking System Submission Code
  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError("");

    if (!bookingName.trim()) {
      setBookingError("Please declare your name.");
      return;
    }
    if (!bookingEmail.trim()) {
      setBookingError("Please declare an email address to receive invitations.");
      return;
    }
    if (!bookingTimeSlot) {
      setBookingError("Please highlight or choose an available time slot below.");
      return;
    }

    setIsSubmittingBooking(true);
    const serviceDetails = SERVICES.find(s => s.id === bookingService) || SERVICES[1];

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingName,
          email: bookingEmail,
          service: serviceDetails.name,
          date: bookingDate,
          timeSlot: bookingTimeSlot,
          notes: bookingNotes
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not complete booking registration.");
      }

      const confBooking: Booking = {
        id: `booking-${Date.now()}`,
        ref: data.ref || `CV-${Math.floor(Math.random() * 89999) + 10000}`,
        name: bookingName,
        email: bookingEmail,
        serviceId: serviceDetails.id,
        serviceName: serviceDetails.name,
        date: bookingDate,
        timeSlot: bookingTimeSlot,
        notes: bookingNotes,
        status: "confirmed",
        createdAt: new Date().toLocaleDateString()
      };

      setBookingSuccess(confBooking);
      // Reset inputs
      setBookingName("");
      setBookingEmail("");
      setBookingNotes("");
      setBookingTimeSlot("");
    } catch (err: any) {
      setBookingError(err.message || "Something went wrong during slots synchronization.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Custom User Review Appending
  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) {
      alert("Please provide both your name and some feedback about Celeste!");
      return;
    }

    const newTestimonial: Testimonial = {
      id: `t-custom-${Date.now()}`,
      name: newReviewName,
      role: newReviewRole || "Creative Founder",
      company: newReviewCompany || "Independent",
      feedback: newReviewText,
      rating: newReviewRating,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
    };

    setReviews(prev => [newTestimonial, ...prev]);
    setNewReviewSuccess(true);
    setTimeout(() => {
      setNewReviewSuccess(false);
      setShowReviewModal(false);
      // Reset
      setNewReviewName("");
      setNewReviewRole("");
      setNewReviewCompany("");
      setNewReviewText("");
      setNewReviewRating(5);
    }, 1800);
  };

  // Helper function to quickly select service and scroll to booking section
  const handleSelectServiceForBooking = (service: ServicePackage) => {
    setSelectedService(service);
    setBookingService(service.id);
    document.getElementById("booking-anchor")?.scrollIntoView({ behavior: "smooth" });
  };

  // Dynamically yield appropriate icon component
  const renderServiceIcon = (name: string, color: string) => {
    const defaultClass = `w-6 h-6 stroke-[1.5] text-[#1a1a1a]`;
    switch (name) {
      case "Inbox": return <Inbox className={defaultClass} />;
      case "Sparkles": return <Sparkles className={defaultClass} />;
      case "Cpu": return <Cpu className={defaultClass} />;
      case "Shield": return <Shield className={defaultClass} />;
      default: return <Sparkles className={defaultClass} />;
    }
  };

  // Unique categories of skills
  const skillCategories = ["All", "Design & Content", "Systems & Tech", "Admin & Ops", "Strategy & Growth"];
  const filteredSkills = selectedSkillCategory === "All" 
    ? SKILLS 
    : SKILLS.filter(s => s.category === selectedSkillCategory);

  return (
    <div id="app-root-container" className="min-h-screen bg-[#f5f2ed] text-[#1a1a1a] flex flex-col font-sans selection:bg-[#CF8A62] selection:text-white">
      
      {/* HEADER SECTION - Beautiful minimalist, thin borders */}
      <header className="border-b border-[#1a1a1a]/10 sticky top-0 bg-[#f5f2ed]/90 backdrop-blur-md z-40 px-6 py-4 md:px-12">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#1a1a1a]">
              Celeste Vance / Portfolio
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/60 font-mono mt-0.5">
              Creative Operations & System Architect
            </span>
          </div>

          {/* Nav links featuring "line-through" hover motif */}
          <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-widest font-bold">
            <a href="#about" className="hover:line-through transition-all duration-300">About</a>
            <a href="#services" className="hover:line-through transition-all duration-300">Services</a>
            <a href="#skills" className="hover:line-through transition-all duration-300">Skills</a>
            <a href="#projects" className="hover:line-through transition-all duration-300">Case Studies</a>
            <a href="#booking-anchor" className="hover:line-through text-[#CF8A62] transition-all duration-300">Reserve a Sync</a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#1a1a1a]/5 rounded-full text-[10px] font-mono uppercase tracking-wider text-[#1a1a1a]/70">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Accepting Retainers
            </div>
            <div className="w-9 h-9 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-[11px] uppercase font-bold font-display tracking-wider">
              CV
            </div>
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-[#1a1a1a]/5 text-[#1a1a1a] transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer menu - styled identically to "Artistic Flair" brand */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[69px] bg-[#FAF9F6] border-b border-[#1a1a1a]/15 shadow-xl z-50 animate-fade-in divide-y divide-[#1a1a1a]/10">
          <div className="flex flex-col p-6 space-y-4">
            <div className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#CF8A62] mb-1">Navigation</div>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif italic text-2xl text-[#1a1a1a] hover:text-[#CF8A62] flex items-center justify-between"
            >
              <span>About Celeste</span>
              <span className="text-xs font-mono opacity-40">01</span>
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif italic text-2xl text-[#1a1a1a] hover:text-[#CF8A62] flex items-center justify-between"
            >
              <span>Services & Scopes</span>
              <span className="text-xs font-mono opacity-40">02</span>
            </a>
            <a 
              href="#skills" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif italic text-2xl text-[#1a1a1a] hover:text-[#CF8A62] flex items-center justify-between"
            >
              <span>Expert Stack</span>
              <span className="text-xs font-mono opacity-40">03</span>
            </a>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif italic text-2xl text-[#1a1a1a] hover:text-[#CF8A62] flex items-center justify-between"
            >
              <span>Case Audits</span>
              <span className="text-xs font-mono opacity-40">04</span>
            </a>
            <div className="border-t border-[#1a1a1a]/15 pt-4">
              <a 
                href="#booking-anchor" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif italic text-2xl text-[#CF8A62] hover:line-through flex items-center justify-between font-bold"
              >
                <span>Reserve a Sync</span>
                <span className="text-xs font-mono text-[#CF8A62] bg-[#CF8A62]/10 px-2 py-0.5 rounded-full font-bold">Book Spot</span>
              </a>
            </div>
          </div>
          
          <div className="p-6 bg-[#EAE3D2]/30 flex flex-col gap-3">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[#1a1a1a]/60">
              <span>Status</span>
              <span className="flex items-center gap-1 font-bold text-[#6D826B]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Accepting Clients
              </span>
            </div>
            <div className="text-[10px] text-[#1a1a1a]/50 leading-relaxed font-mono">
              Servicing creative directors, designers, and scaling coaches globally.
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION - Immersive 'Artistic' Display */}
      <section id="about" className="px-6 py-12 md:py-20 md:px-12 border-b border-[#1a1a1a]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main big typography intro header */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#CF8A62] mb-3">
                / High-Performance Assistance
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-[0.9] font-serif italic font-light tracking-tight text-[#1a1a1a] mb-8">
                Digital<br />
                <span className="not-italic text-brand-clay-500 font-display font-medium">Concierge</span> & Ops
              </h1>
              <p className="max-w-xl text-md md:text-lg leading-relaxed text-[#1a1a1a]/85 font-sans mb-10">
                Hi, I'm Celeste. Bringing high-fidelity structure, aesthetic calm, and seamless automation to scaling creative directors, coaches, and luxury boutique agencies. I architect relational workspaces, triage inbox chaos, and keep your publishing consistent.
              </p>
            </div>

            {/* Quick Metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-[#1a1a1a]/10 pt-8 mt-4">
              <div>
                <div className="text-2xl font-display font-bold text-[#1a1a1a]">6+ Years</div>
                <div className="text-[10px] uppercase tracking-wider text-[#1a1a1a]/60">Dedicated Support</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-[#1a1a1a]">120+ Systems</div>
                <div className="text-[10px] uppercase tracking-wider text-[#1a1a1a]/60">Launched & Automated</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-2xl font-display font-bold text-[#1a1a1a]">350k+ Hours</div>
                <div className="text-[10px] uppercase tracking-wider text-[#1a1a1a]/60">Reclaimed for Clients</div>
              </div>
            </div>
          </div>

          {/* Right Column: Beautiful profile display & quick actions */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-[32px] p-4 shadow-sm border border-[#1a1a1a]/5 overflow-hidden group">
              <div className="relative aspect-square rounded-[24px] overflow-hidden bg-[#EAE3D2] mb-6">
                <img 
                  src={profileImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"} 
                  alt="Celeste Vance portrait" 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute top-4 left-4 bg-[#f5f2ed] border border-[#1a1a1a]/10 rounded-full px-3 py-1 text-[9px] uppercase tracking-widest font-mono text-[#1a1a1a] shadow-sm">
                  Based in Europe & Remote
                </div>
              </div>
              
              <div className="px-2 pb-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-serif text-lg font-bold italic">Celeste Vance</h3>
                  <span className="text-[10px] uppercase tracking-widest font-mono bg-[#889C86]/10 text-[#6D826B] px-2.5 py-0.5 rounded-full font-bold">
                    Principal VA
                  </span>
                </div>
                <p className="text-xs text-[#1a1a1a]/75 leading-relaxed">
                  "I construct workflows that allow creative leaders to trade operational anxiety for structured space to innovate."
                </p>
              </div>
            </div>

            {/* Quick contact / direct navigation action */}
            <a 
              href="#booking-anchor" 
              className="bg-[#1a1a1a] hover:bg-[#CF8A62] text-[#f5f2ed] p-5 rounded-[24px] flex items-center justify-between group transition-all duration-300 shadow-sm"
            >
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-widest text-[#f5f2ed]/60 font-mono block mb-1">Interactive Portal</span>
                <span className="text-sm font-bold uppercase tracking-wider font-display block">Secure a Booking slot</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#f5f2ed]/10 group-hover:bg-[#f5f2ed]/20 flex items-center justify-center transition-all">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </a>
          </div>

        </div>
      </section>

      {/* SERVICES DISPLAY & INTERACTION SECTION */}
      <section id="services" className="px-6 py-16 md:px-12 border-b border-[#1a1a1a]/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#889C86] mb-3">
                / High-Touch Support Spheres
              </div>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a1a]">
                Tailored Services & Retainer Scopes
              </h2>
            </div>
            <p className="text-xs max-w-sm text-[#1a1a1a]/60 leading-relaxed mt-4 md:mt-0">
              Pick a streamlined model built to inject instantaneous order. Select a package below to inspect the details and lock in a matching template inside our booking module.
            </p>
          </div>

          {/* Interactive packages bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((pkg) => {
              const isSelected = selectedService.id === pkg.id;
              return (
                <div 
                  key={pkg.id} 
                  id={`service-${pkg.id}`}
                  onClick={() => setSelectedService(pkg)}
                  className={`cursor-pointer group flex flex-col justify-between rounded-[28px] p-6 transition-all duration-300 border ${
                    isSelected 
                    ? "bg-white border-[#1a1a1a] shadow-md scale-[1.02]" 
                    : "bg-white/65 hover:bg-white border-[#1a1a1a]/15 hover:border-[#1a1a1a]/40"
                  }`}
                >
                  <div>
                    {/* Header badge & icon */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-[#FAF9F6] border border-[#1a1a1a]/10 rounded-2xl">
                        {renderServiceIcon(pkg.iconName, pkg.colorAccent)}
                      </div>
                      {pkg.badgeText && (
                        <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold bg-[#CF8A62]/10 text-[#BC774E]`}>
                          {pkg.badgeText}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#1a1a1a] group-hover:text-[#CF8A62] transition-colors mb-2">
                      {pkg.name}
                    </h3>
                    
                    <p className="text-xs text-[#1a1a1a]/70 leading-relaxed min-h-[72px] mb-6">
                      {pkg.description}
                    </p>

                    <div className="border-t border-[#1a1a1a]/10 pt-4 mb-6">
                      <div className="text-[9px] uppercase tracking-wider text-[#1a1a1a]/40 font-mono mb-2">What you receive:</div>
                      <ul className="space-y-2">
                        {pkg.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="text-[11px] text-[#1a1a1a]/85 flex items-start gap-1.5 leading-snug">
                            <span className="text-[#889C86] font-bold mt-0.5">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end border-t border-[#1a1a1a]/5 pt-4">
                      <div>
                        <div className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/40 font-mono">Value Tier</div>
                        <div className="text-sm font-semibold tracking-tight text-[#1a1a1a]">
                          {pkg.priceInfo}
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectServiceForBooking(pkg);
                        }}
                        className="p-2 rounded-full bg-[#1a1a1a] text-white hover:bg-[#CF8A62] transition-colors"
                        title="Book This Scope"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expanded Selected Service Showcase */}
          <div className="mt-8 bg-white/70 border border-[#1a1a1a]/10 rounded-[36px] p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-[#CF8A62] block mb-2">Detailed Selection Explorer</span>
                <span className="text-xs uppercase tracking-widest font-mono text-[#1a1a1a]/40 block mb-1">Standard Deliverables for:</span>
                <h3 className="text-3xl font-serif italic text-[#1a1a1a] mb-4">
                  {selectedService.name}
                </h3>
                <p className="text-sm text-[#1a1a1a]/75 leading-relaxed mb-6">
                  {selectedService.description}
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="px-4 py-2 bg-[#f5f2ed] border border-[#1a1a1a]/5 rounded-xl">
                    <span className="text-[9px] uppercase tracking-wider text-[#1a1a1a]/40 font-mono block">Pricing</span>
                    <span className="text-sm font-bold font-display">{selectedService.priceInfo}</span>
                  </div>
                  <button 
                    onClick={() => handleSelectServiceForBooking(selectedService)}
                    className="bg-[#1a1a1a] hover:bg-[#CF8A62] text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold transition-all shadow-sm"
                  >
                    Select & Book This Scope
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#1a1a1a]/5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] mb-4 border-b border-[#1a1a1a]/10 pb-2">
                  Full Service SLA Checklist
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedService.features.map((item, index) => (
                    <div key={index} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF9F6] transition-colors">
                      <div className="w-5 h-5 bg-[#889C86]/10 text-[#889C86] rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                        ✓
                      </div>
                      <div className="text-xs text-[#1a1a1a]/80 leading-normal">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SKILLS MATRIX SECTION - Fully Filterable */}
      <section id="skills" className="px-6 py-16 md:px-12 bg-white/40 border-b border-[#1a1a1a]/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#CF8A62] mb-3">
              / Tech Stack & Competencies
            </div>
            <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a1a] mb-4">
              Aesthetic Clarity Meets Deep Tech
            </h2>
            <p className="text-xs text-[#1a1a1a]/60 leading-relaxed">
              I balance rigorous organizational layout logic with modern software systems (Zapier, Notion API, ConvertKit) to establish self-reliant operational infrastructure.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {skillCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedSkillCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${
                  selectedSkillCategory === cat
                    ? "bg-[#1a1a1a] text-white font-bold"
                    : "bg-white/60 hover:bg-white text-[#1a1a1a]/70 border border-[#1a1a1a]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dynamic skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, qi) => (
              <div 
                key={qi} 
                className="bg-white rounded-3xl p-6 border border-[#1a1a1a]/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-bold font-mono tracking-wider bg-[#1a1a1a]/5 text-[#1a1a1a]/70 px-2 py-0.5 rounded-full">
                      {skill.category}
                    </span>
                    <span className="text-xs font-semibold font-mono text-[#CF8A62]">
                      {skill.level}% Confidence
                    </span>
                  </div>

                  <h4 className="font-display font-medium text-base text-[#1a1a1a] mb-2">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-[#1a1a1a]/70 leading-relaxed mb-6">
                    {skill.description}
                  </p>
                </div>

                <div>
                  {/* Confidence continuous indicator bar */}
                  <div className="w-full h-[3px] bg-[#f5f2ed] rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-[#889C86] rounded-full transition-all duration-1000" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>

                  {/* Specific software tools badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tools.map((tool, ti) => (
                      <span 
                        key={ti} 
                        className="bg-[#f5f2ed] border border-[#1a1a1a]/10 rounded px-2 py-1 text-[9px] uppercase tracking-wider font-bold text-[#1a1a1a]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* INTERACTIVE CASE STUDIES SECTION */}
      <section id="projects" className="px-6 py-16 md:px-12 border-b border-[#1a1a1a]/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#CF8A62] mb-3">
                / Direct Outcomes Showcase
              </div>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a1a]">
                High-Impact Case Audits
              </h2>
            </div>
            <p className="text-xs max-w-sm text-[#1a1a1a]/60 leading-relaxed mt-4 md:mt-0">
              True efficiency isn't vague. Here is exactly how we restructured calendars, setup custom integrations, and liberated design studios.
            </p>
          </div>

          {/* CASE STUDIES CARPLAY / GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PORTFOLIO_PROJECTS.map((project) => (
              <div key={project.id} className="bg-white rounded-[32px] overflow-hidden border border-[#1a1a1a]/10 shadow-sm flex flex-col justify-between group">
                <div>
                  {/* Photo with metric overlap */}
                  <div className="relative aspect-video overflow-hidden bg-gray-200">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" 
                    />
                    {project.statsHighlight && (
                      <div className="absolute bottom-4 right-4 bg-[#1a1a1a] text-white px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold shadow-lg">
                        {project.statsHighlight}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="text-[9px] uppercase tracking-widest font-mono text-[#CF8A62] mb-1">
                      {project.category}
                    </div>
                    <div className="text-[11px] font-bold text-[#1a1a1a]/50 mb-3">
                      Client: {project.client}
                    </div>
                    
                    <h3 className="font-display font-bold text-lg text-[#1a1a1a] mb-4">
                      {project.title}
                    </h3>

                    {/* Standard Problem -> Solution tabs */}
                    <div className="space-y-4">
                      <div className="p-3 bg-[#FAF9F6] rounded-2xl border border-[#1a1a1a]/5">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-red-700 block mb-1">The Friction</span>
                        <p className="text-[11px] leading-relaxed text-[#1a1a1a]/75">
                          {project.challenge}
                        </p>
                      </div>
                      <div className="p-3 bg-[#889C86]/10 rounded-2xl border border-[#889C86]/10">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-[#6D826B] block mb-1">The Restructure</span>
                        <p className="text-[11px] leading-relaxed text-[#1a1a1a]/75">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#1a1a1a]/5 mt-4">
                  <div className="pt-4 flex flex-wrap gap-1.5 items-center mb-4">
                    <span className="text-[9px] text-[#1a1a1a]/40 font-mono">Tools:</span>
                    {project.toolsUsed.map((tu, idx) => (
                      <span key={idx} className="bg-brand-beige-100 text-[#1a1a1a]/80 text-[9px] px-2 py-0.5 rounded font-mono">
                        #{tu}
                      </span>
                    ))}
                  </div>
                  <div className="bg-[#1a1a1a] text-[#FAF9F6] p-3 rounded-xl text-center text-xs font-mono">
                    Outcome: <span className="font-sans font-bold text-brand-clay-500">{project.outcome}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CORE WORKSPACE: BOOKING ENGINE & LIVE CHAT SIDE-BY-SIDE */}
      <section id="booking-anchor" className="px-6 py-16 md:px-12 bg-gradient-to-b from-[#f5f2ed] to-[#F4F1EA] border-b border-[#1a1a1a]/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#889C86] mb-3">
              / Connect Interactive Operations
            </div>
            <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a1a] mb-4">
              The Client Command Center
            </h2>
            <p className="text-xs text-[#1a1a1a]/60">
              Ready to secure structural clarity? Reserve a dedicated zoom sync or request immediate clarity from our built-in AI operational coordinator right now.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT WORKSPACE: INTERACTIVE BOOKING ENGINE (7 COLS) */}
            <div className="lg:col-span-7 bg-white rounded-[40px] p-6 sm:p-10 shadow-sm border border-[#1a1a1a]/10 flex flex-col justify-between">
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-serif text-3xl italic">Reserve a Sync</h3>
                    <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/50">Complementary 25-min strategy session</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold block">JUNE 2026</span>
                    <span className="text-[9px] font-mono text-[#889C86] uppercase tracking-wider block">Real-time Available</span>
                  </div>
                </div>

                {bookingError && (
                  <div className="bg-red-50 text-red-800 p-4 rounded-xl text-xs mb-6 font-mono">
                    ⚠️ {bookingError}
                  </div>
                )}

                {bookingSuccess ? (
                  /* GORGEOUS CONFIRMATION DISPLAY */
                  <div className="bg-[#889C86]/10 border-2 border-dashed border-[#889C86] rounded-3xl p-6 text-center shadow-inner my-6 animate-fade-in">
                    <div className="w-12 h-12 bg-[#889C86] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-[#6D826B] font-bold block mb-1">
                      Session Registered!
                    </span>
                    <h4 className="font-display font-bold text-xl text-[#1a1a1a] mb-2">
                      Reference Number: {bookingSuccess.ref}
                    </h4>
                    <p className="text-xs text-[#1a1a1a]/80 leading-relaxed max-w-md mx-auto mb-6">
                      Hi <span className="font-bold">{bookingSuccess.name}</span>, your video strategy session concerning <span className="font-bold">{bookingSuccess.serviceName}</span> is locked in on <span className="font-bold underline">{bookingSuccess.date}</span> at <span className="font-bold underline">{bookingSuccess.timeSlot} (GMT-7)</span>.
                    </p>
                    <div className="bg-white/90 p-4 rounded-2xl text-left border border-[#1a1a1a]/5 inline-block w-full max-w-sm mb-4">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase text-[#1a1a1a]/70 font-mono">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> Auto-Scheduler Task Queue
                      </div>
                      <ol className="text-[11px] text-[#1a1a1a]/75 space-y-1.5 list-decimal list-inside">
                        <li>Calendar invitation drafted to <span className="underline">{bookingSuccess.email}</span></li>
                        <li>Notion workspace board initialized with notes</li>
                        <li>Slack trigger sent to Celestes dashboard ops</li>
                      </ol>
                    </div>
                    <div>
                      <button 
                        onClick={() => setBookingSuccess(null)}
                        className="bg-[#1a1a1a] hover:bg-[#CF8A62] text-white text-[10px] uppercase font-bold tracking-widest px-6 py-2.5 rounded-full transition-colors"
                      >
                        Schedule Another Strategy Call
                      </button>
                    </div>
                  </div>
                ) : (
                  /* BOOKING CONSOLE FORM */
                  <form onSubmit={handleCreateBooking} className="space-y-6">
                    
                    {/* Choose service catalog linking */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#1a1a1a]/60 font-mono block mb-2">
                        1. Associate with Service Focus or General Sync
                      </label>
                      <select 
                        value={bookingService} 
                        onChange={(e) => setBookingService(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#1a1a1a]/15 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#CF8A62] outline-none"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.priceInfo})
                          </option>
                        ))}
                        <option value="general">Complimentary Discovery Introduction (General Q&A)</option>
                      </select>
                    </div>

                    {/* Choose custom dates selection */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#1a1a1a]/60 font-mono block mb-2">
                        2. Pick Strategy Consultation Date
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          { date: "2026-06-18", label: "Thu", num: "18" },
                          { date: "2026-06-19", label: "Fri", num: "19" },
                          { date: "2026-06-22", label: "Mon", num: "22" },
                          { date: "2026-06-23", label: "Tue", num: "23" },
                          { date: "2026-06-24", label: "Wed", num: "24" }
                        ].map((d) => (
                          <button
                            type="button"
                            key={d.date}
                            onClick={() => {
                              setBookingDate(d.date);
                              // deselect current timeslot on date change to reinforce safe validation flow
                              setBookingTimeSlot("");
                            }}
                            className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                              bookingDate === d.date
                              ? "bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-sm transform -translate-y-0.5"
                              : "bg-[#fdfcfb] hover:bg-[#1a1a1a]/5 border-[#1a1a1a]/10"
                            }`}
                          >
                            <span className="text-[9px] font-mono uppercase opacity-70 block">{d.label}</span>
                            <span className="text-sm font-display font-bold block mt-1">{d.num}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Real-time Available Timeslots rendering */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#1a1a1a]/60 font-mono block mb-2">
                        3. Pick an Available Strategy Time Slot (GMT-7 Workspace)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = bookingTimeSlot === slot;
                          return (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => setBookingTimeSlot(slot)}
                              className={`p-2.5 rounded-xl text-center text-xs font-mono transition-all border ${
                                isSelected
                                ? "bg-[#889C86] text-white border-[#889C86] font-bold"
                                : "bg-[#fdfcfb] hover:bg-emerald-50 hover:border-[#889C86]/60 border-[#1a1a1a]/10"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Client personal metadata info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#1a1a1a]/60 font-mono block mb-1">
                          Founder Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder="Arthur Nolan" 
                          className="w-full bg-[#FAF9F6] border border-[#1a1a1a]/15 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-[#CF8A62] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#1a1a1a]/60 font-mono block mb-1">
                          Work Email *
                        </label>
                        <input 
                          type="email" 
                          required
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          placeholder="arthur@nolanadvising.com" 
                          className="w-full bg-[#FAF9F6] border border-[#1a1a1a]/15 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-[#CF8A62] outline-none"
                        />
                      </div>
                    </div>

                    {/* Brief notes scope */}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#1a1a1a]/60 font-mono block mb-1">
                        Operational Friction or Projects description
                      </label>
                      <textarea
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        placeholder="e.g. Seeking high-touch Notion setup and a custom Zapier trigger to automate Typeform survey notifications to Asana board."
                        rows={2}
                        className="w-full bg-[#FAF9F6] border border-[#1a1a1a]/15 rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#CF8A62] outline-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingBooking}
                      className="w-full bg-[#1a1a1a] hover:bg-[#CF8A62] disabled:bg-gray-400 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-full transition-all duration-300 shadow-sm"
                    >
                      {isSubmittingBooking ? "Syncing Calendar..." : "Confirm Strategy Sync"}
                    </button>
                    
                  </form>
                )}
              </div>
              
              <div className="mt-8 border-t border-[#1a1a1a]/10 pt-4 flex justify-between items-center text-[10px] text-[#1a1a1a]/40 font-mono">
                <span>📍 Server Sync: Online</span>
                <span>📅 Complimentary Strategy Q&A</span>
              </div>
            </div>

            {/* RIGHT WORKSPACE: LIVE AI CHAT SUPPORT (5 COLS) */}
            <div className="lg:col-span-5 bg-[#5A5A40] rounded-[40px] p-6 text-white flex flex-col justify-between shadow-sm min-h-[500px]">
              
              {/* Leader header bar */}
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 bg-white/10 rounded-full border border-white/20 flex items-center justify-center font-display font-semibold text-white">
                        CV
                      </div>
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-[3px] border-[#5A5A40]"></div>
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-normal">Celeste is active</div>
                      <div className="text-[9px] text-white/50 tracking-wider font-mono uppercase">AI Assistant Coordinator</div>
                    </div>
                  </div>
                  <div className="bg-[#FAF9F6]/10 text-[#FAF9F6] border border-white/10 rounded-xl px-2.5 py-1 text-[9px] tracking-wider font-mono uppercase">
                    Replies Instantly
                  </div>
                </div>

                {/* Chat Stream message scroll container */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2 scrollbar">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div 
                        className={`rounded-2xl p-3.5 text-xs max-w-[85%] leading-relaxed shadow-sm ${
                          msg.sender === "user" 
                          ? "bg-white text-[#1a1a1a] rounded-tr-none font-medium" 
                          : "bg-white/10 text-white rounded-tl-none border border-white/10"
                        }`}
                      >
                        {/* Preserve format of markdown bullet points optionally */}
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      </div>
                      <span className="text-[8px] text-white/40 tracking-wider uppercase font-mono mt-1 px-1">
                        {msg.sender === "user" ? "Potential Client" : "AI Coordinator"}
                      </span>
                    </div>
                  ))}

                  {/* Typing animation block */}
                  {isAiTyping && (
                    <div className="flex flex-col items-start">
                      <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tl-none p-3 max-w-[85%] text-xs flex items-center gap-1.5 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                      <span className="text-[8px] text-white/40 tracking-wider uppercase font-mono mt-1">
                        Coordinator is composing reply...
                      </span>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Prompt Suggestions chips */}
                <div className="mb-6">
                  <span className="text-[8px] uppercase tracking-widest text-[#FAF9F6]/50 font-mono block mb-2">Suggestion Chips:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {chatPromptChips.map((chip, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handlePromptChipClick(chip.query)}
                        className="bg-white/5 hover:bg-white/25 active:bg-white/30 text-white border border-white/10 rounded-lg px-2.5 py-1 text-[10px] tracking-wide text-left transition-colors"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Send console keyboard */}
              <div>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendChatMessage(userInput);
                  }}
                  className="flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-2 border border-white/20"
                >
                  <input 
                    type="text" 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type operations query..." 
                    className="bg-transparent border-none outline-none text-xs text-white placeholder-white/40 w-full"
                  />
                  <button 
                    type="submit" 
                    disabled={!userInput.trim() || isAiTyping}
                    className="p-1 px-2 text-white/70 hover:text-white disabled:opacity-40 transition-colors"
                  >
                    →
                  </button>
                </form>
                <div className="text-[9px] text-[#FAF9F6]/40 font-mono mt-2 text-center">
                  Secure server route /api/chat is active with Gemini 3.5
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CLIENT REVIEWS FEEDBACK BOARD */}
      <section className="px-6 py-16 md:px-12 bg-white border-b border-[#1a1a1a]/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#CF8A62] mb-3">
                / Founder Experiences
              </div>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a1a]">
                Aesthetic Restructures & Freedoms
              </h2>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button 
                onClick={() => setShowReviewModal(true)}
                className="bg-[#1a1a1a] hover:bg-[#CF8A62] text-[#f5f2ed] tracking-widest text-[10px] uppercase font-bold py-3.5 px-6 rounded-full transition-all flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" /> Submit Service Recommendation
              </button>
            </div>
          </div>

          {/* Testimonial Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((test) => (
              <div key={test.id} className="p-6 bg-[#f5f2ed]/60 rounded-3xl border border-[#1a1a1a]/10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-[#CF8A62] mb-4">
                    {Array.from({ length: test.rating }).map((_, r) => (
                      <Star key={r} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#1a1a1a]/85 leading-relaxed italic mb-6">
                    "{test.feedback}"
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-[#1a1a1a]/5 pt-4">
                  <div className="w-9 h-9 bg-brand-beige-200 rounded-full overflow-hidden text-center flex items-center justify-center font-bold text-xs">
                    {test.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1a1a1a]">{test.name}</div>
                    <div className="text-[9px] uppercase tracking-wider font-mono text-[#1a1a1a]/50">
                      {test.role}, {test.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER - Minimalist, line-through hover social states */}
      <footer className="px-6 py-12 md:py-16 md:px-12 bg-[#FAF9F6] border-t border-[#1a1a1a]/5 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-center md:text-left">
            <div className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
              Celeste Vance / Digital Operations
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#1a1a1a]/40">
              Based in Paris & Serving Clients Globally
            </div>
          </div>

          {/* Social icons layout */}
          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-black/10 hover:border-black hover:bg-black hover:text-white flex items-center justify-center text-xs transition-all font-bold">
              Li
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-black/10 hover:border-black hover:bg-black hover:text-white flex items-center justify-center text-xs transition-all font-bold">
              In
            </a>
            <a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-black/10 hover:border-black hover:bg-black hover:text-white flex items-center justify-center text-xs transition-all font-bold">
              Sb
            </a>
          </div>

          <div className="text-center md:text-right text-[10px] font-mono opacity-40">
            © 2026 Celeste Vance. Meticulously Structured.
          </div>

        </div>
      </footer>

      {/* DYNAMIC MODAL: SUBMIT SERVICE TESTIMONIALS */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-[#1a1a1a]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#f5f2ed] rounded-[36px] border border-[#1a1a1a]/15 max-w-lg w-full p-6 sm:p-8 shadow-xl relative animate-scale-up">
            
            <button 
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10 flex items-center justify-center text-[#1a1a1a] transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {newReviewSuccess ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                  ✓
                </div>
                <h3 className="font-serif text-2xl italic mb-2">Recommendation Submitted</h3>
                <p className="text-xs text-[#1a1a1a]/70 max-w-sm mx-auto">
                  Thank you! Your feedback has been dynamically merged into Celeste's active client stories loop below.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReviewSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif text-2xl italic">Recommend Celeste Vance</h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/50">Verify your operations experience</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-mono text-[#1a1a1a]/60 block mb-1">
                      Your Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="Eleanor Vance" 
                      className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-3 py-2 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-mono text-[#1a1a1a]/60 block mb-1">
                      Professional Role
                    </label>
                    <input 
                      type="text" 
                      value={newReviewRole}
                      onChange={(e) => setNewReviewRole(e.target.value)}
                      placeholder="Founding Designer / Director" 
                      className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-3 py-2 text-xs outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-mono text-[#1a1a1a]/60 block mb-1">
                    Company Name
                  </label>
                  <input 
                    type="text" 
                    value={newReviewCompany}
                    onChange={(e) => setNewReviewCompany(e.target.value)}
                    placeholder="Studio Arc & Soil" 
                    className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-mono text-[#1a1a1a]/60 block mb-1">
                    Rating (1-5 Star Evaluation)
                  </label>
                  <select 
                    value={newReviewRating} 
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl px-3 py-2 text-xs outline-none"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ Outstanding 5 Stars</option>
                    <option value="4">⭐⭐⭐⭐ Great 4 Stars</option>
                    <option value="3">⭐⭐⭐ Standard 3 Stars</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider font-mono text-[#1a1a1a]/60 block mb-1">
                    Operations Recommendation Feedback
                  </label>
                  <textarea 
                    required
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="E.g. Celeste completely revolutionized our email broadcasting calendars and Notion client directories!" 
                    rows={3}
                    className="w-full bg-white border border-[#1a1a1a]/10 rounded-xl p-3 text-xs outline-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#1a1a1a] hover:bg-[#CF8A62] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-full transition-all"
                >
                  Publish to active Board →
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
