import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Phone,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  Bot,
  Menu,
  X,
  Stethoscope,
  Home as HomeIcon,
  Calendar
} from "lucide-react";

import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Image Imports
import heroImg from "@assets/generated_images/virtualAssistance.png";
import chatImg from "@assets/generated_images/modern_chat_interface_mockup_with_blue_theme.png";
import callImg from "@assets/generated_images/professional_phone_call_interface_mockup.png";
import calendarImg from "@assets/generated_images/calendar_scheduling_interface_mockup.png";
import whatsappImg from "@assets/generated_images/whatsapp_conversation_mockup_on_phone.png";

const DEMO_MAILTO =
  "mailto:contact@rulescube.com?subject=AI%20Receptionist%20Demo%20Request&body=Hi%20there%2C%0A%0AI%27d%20like%20to%20request%20a%20demo.%0A%0ACompany%3A%0AIndustry%3A%0AVolume%20(approx)%3A%0APreferred%20contact%20time%3A%0A%0AThanks!";

const CONTACT_MAILTO =
  "mailto:contact@rulescube.com?subject=AI%20Receptionist%20-%20Contact%20Us&body=Hi%20there%2C%0A%0AI%20have%20a%20question%20about%20AI%20Receptionist.%0A%0ACompany%3A%0AIndustry%3A%0AQuestion%3A%0A%0AThanks!";

function WaveBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[100px]" />
      <div className="absolute top-10 -left-40 h-[600px] w-[600px] rounded-full bg-indigo-400/20 blur-[100px]" />
      <div className="absolute bottom-0 left-1/3 h-[600px] w-[600px] rounded-full bg-purple-400/20 blur-[100px]" />
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      image: callImg,
      title: "24/7 Professional Call Handling",
      desc: "Never send a client to voicemail again. Our AI answers inbound calls instantly, handles FAQs, and routes complex requests based on your specific business rules.",
      bullets: ["Zero hold times during peak hours", "Polite, consistent tone every time", "Seamless handoff for complex issues"],
    },
    {
      image: calendarImg,
      title: "Automated Calendar Scheduling",
      desc: "Stop the email ping-pong. The AI Receptionist checks your real-time availability and books appointments directly into your calendar while you work.",
      bullets: ["Integrates with Google & Outlook", "Prevents double-bookings", "Sends automatic confirmations"],
    },
    {
      image: whatsappImg,
      title: "WhatsApp & Multi-Channel Support",
      desc: "Meet your customers where they are. Whether they prefer WhatsApp, SMS, or web chat, your AI agent provides a unified experience across all platforms.",
      bullets: ["Instant replies on WhatsApp", "Unified context across channels", "Higher engagement rates"],
    },
    {
      image: chatImg,
      title: "Intelligent Chat Conversations",
      desc: "More than just a chatbot. Engage leads in natural, human-like conversations to qualify them and collect the details you need before you ever speak to them.",
      bullets: ["Captures lead contact info", "Qualifies intent automatically", "Reduces drop-off from slow replies"],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white font-sans">
      <Seo
        title="AI Receptionist | Automate Calls, Chats & Booking"
        description="AI Receptionist answers calls, chats with customers, and books appointments automatically 24/7."
        canonicalPath="/"
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <div className="flex items-center gap-2.5 cursor-pointer group">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md group-hover:bg-blue-700 transition-colors">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">AI Receptionist</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {["Features", "Industries", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {item}
                </a>
              ))}
              <a href={DEMO_MAILTO}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 shadow-lg shadow-blue-600/20">
                  Request Demo
                </Button>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 p-4 flex flex-col gap-4 shadow-xl">
            {["Features", "Industries", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium text-slate-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
             <a href={DEMO_MAILTO} onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-blue-600 text-white">Request Demo</Button>
              </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        <WaveBackdrop />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold text-blue-700 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Now available for Healthcare & Real Estate
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                The AI Receptionist That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Never Sleeps</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
                Capture every lead, 24/7. Our AI answers calls, engages in chat, and books appointments instantly so your team can focus on what matters.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={DEMO_MAILTO}>
                  <Button size="lg" className="h-14 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl shadow-blue-600/20 transition-all hover:scale-105">
                    Request a Demo <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                
              </div>


            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:ml-auto"
            >
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-100 to-white p-2 shadow-2xl ring-1 ring-slate-200/50">
                <div className="rounded-xl overflow-hidden bg-white aspect-[4/3] relative">
                  <img
                    src={heroImg}
                    alt="AI Receptionist Dashboard"
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                  />
                  {/* Floating Badge */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm border border-slate-100 p-3 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">New Booking</p>
                      <p className="text-sm font-bold text-slate-900">Tomorrow, 10:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust / Stats */}
      <section className="border-y border-slate-100 bg-slate-50/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
             {[
               { label: "Availability", value: "24/7" },
               { label: "Response Time", value: "< 2 sec" },
               { label: "Missed Calls", value: "0%" },

             ].map((stat, i) => (
               <div key={i}>
                 <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                 <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mt-1">{stat.label}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Your Front Desk is Overwhelmed.</h2>
            <p className="mt-4 text-lg text-slate-600">
              In a service business, speed is everything. Relying on voicemail or slow email replies means losing money to competitors who answer first.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: "Missed Calls = Lost Revenue",
                desc: "67% of customers hang up if they get voicemail. You can't afford to miss after-hours or peak-time calls.",
              },
              {
                icon: Clock,
                title: "Endless Scheduling Tag",
                desc: "The back-and-forth emails to find a time slot kills momentum. You need bookings, not conversation.",
              },
              {
                icon: Users,
                title: "Staff Burnout",
                desc: "Your skilled staff shouldn't be tied up answering basic FAQs like 'where are you located?' or 'hours of operation'.",
              }
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-lg bg-slate-50">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                    <item.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Zig Zag Layout (UPDATED) */}
      <section id="features" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How We Solve It</h2>
            <p className="mt-4 text-lg text-slate-600">
              A complete communication suite that handles the busy work so you can handle the business.
            </p>
          </div>

          <div className="space-y-24">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Text Side */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {feature.desc}
                  </p>
                  <ul className="space-y-4">
                    {feature.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <span className="text-slate-700 font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Side - Fixed sizing and rotation */}
                <div className="flex-1 w-full flex justify-center">
                  <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-xl max-w-lg w-full">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-auto rounded-xl shadow-sm object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Tailored for Appointment-Based Businesses</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Healthcare Card */}
            <Card className="overflow-hidden border-0 shadow-lg group hover:shadow-xl transition-shadow">
              <div className="h-2 bg-blue-500 w-full" />
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Healthcare</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Perfect for clinics, dentists, and private practices. Handle patient intake, reschedule appointments, and answer pre-visit questions securely.
                </p>
                <Link href="/healthcare">
                  <Button variant="outline" className="group-hover:bg-blue-50 group-hover:text-blue-600 border-slate-200">
                    Explore Healthcare Solution
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Real Estate Card */}
            <Card className="overflow-hidden border-0 shadow-lg group hover:shadow-xl transition-shadow">
              <div className="h-2 bg-indigo-500 w-full" />
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <HomeIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Real Estate</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Never miss a buyer while you're at a showing. Qualify leads instantly, schedule viewings, and keep your pipeline moving 24/7.
                </p>
                <Link href="/real-estate">
                  <Button variant="outline" className="group-hover:bg-indigo-50 group-hover:text-indigo-600 border-slate-200">
                    Explore Real Estate Solution
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      
      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid gap-6">
            {[
              { q: "Do I need to change my phone number?", a: "No. You can simply forward calls to your AI assistant's number when you're busy, or port your number if you prefer." },
              { q: "How does it know my schedule?", a: "We integrate directly with Google Calendar, Outlook, and others. The AI reads your free/busy slots in real-time." },
              { q: "Can it handle complex medical questions?", a: "The AI is trained on your specific FAQs. For medical advice or complex issues, it is programmed to triage and escalate to a human staff member." },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Automate Your Booking?</h2>
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                Join the businesses saving 20+ hours a week and increasing booking rates by 40% with AI Receptionist.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                 <div className="relative w-full max-w-md">
                   <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="h-14 pl-6 rounded-full bg-white text-slate-900 border-0 focus-visible:ring-2 focus-visible:ring-blue-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                   />
                   <div className="absolute right-1 top-1">
                      <a href={DEMO_MAILTO}>
                        <Button className="h-12 rounded-full px-6 bg-blue-600 text-white hover:bg-blue-700 font-semibold">
                          Get Demo
                        </Button>
                      </a>
                   </div>
                 </div>
              </div>
              <p className="mt-6 text-sm text-blue-200">No credit card required for demo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg text-slate-900">AI Receptionist</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">
                The smart communication layer for modern businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#features" className="hover:text-blue-600">Features</a></li>
                <li><a href="#pricing" className="hover:text-blue-600">Pricing</a></li>
                <li><a href={DEMO_MAILTO} className="hover:text-blue-600">Request Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Industries</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/healthcare"><a className="hover:text-blue-600">Healthcare</a></Link></li>
                <li><Link href="/real-estate"><a className="hover:text-blue-600">Real Estate</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href={CONTACT_MAILTO} className="hover:text-blue-600">contact@rulescube.com</a></li>
                
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} RulesCube. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-900">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}