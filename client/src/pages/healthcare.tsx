import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Phone,
  Calendar,
  ClipboardList,
  Clock,
  Users,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Repeat2,
  Bot,
  Menu,
  X
} from "lucide-react";

import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DEMO_MAILTO =
  "mailto:contact@rulescube.com?subject=Healthcare%20AI%20Receptionist%20Demo";

const CONTACT_MAILTO =
  "mailto:contact@rulescube.com?subject=Healthcare%20AI%20Receptionist%20Question";

function GradientBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-300/20 blur-[100px]" />
      <div className="absolute top-0 right-0 h-[480px] w-[480px] rounded-full bg-indigo-300/20 blur-[100px]" />
    </div>
  );
}

export default function Healthcare() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Seo
        title="AI Receptionist for Healthcare | Reduce Front-Desk Load & Missed Calls"
        description="An AI receptionist designed for healthcare practices to handle inbound calls, patient intake, and appointment scheduling."
        canonicalPath="/healthcare"
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

            <div className="hidden md:flex items-center gap-8">
              <Link href="/">
                <a className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</a>
              </Link>
              <Link href="/real-estate">
                <a className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Real Estate</a>
              </Link>
              <a href={DEMO_MAILTO}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 shadow-lg shadow-blue-600/20">
                  Request Demo
                </Button>
              </a>
            </div>

             <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
         {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 p-4 flex flex-col gap-4 shadow-xl">
             <Link href="/">
                <a className="text-sm font-medium text-slate-600 py-2">Home</a>
              </Link>
              <Link href="/real-estate">
                <a className="text-sm font-medium text-slate-600 py-2">Real Estate</a>
              </Link>
             <a href={DEMO_MAILTO}>
                <Button className="w-full bg-blue-600 text-white">Request Demo</Button>
              </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40">
        <GradientBackdrop />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 mb-8 uppercase tracking-wide">
              <Stethoscope className="w-4 h-4" />
              Healthcare Edition
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Reduce Front-Desk Overload Without Reducing <span className="text-blue-600">Patient Access</span>
            </h1>

            <p className="mt-6 text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Healthcare front desks are overwhelmed by constant calls and appointment
              changes. AI Receptionist helps practices maintain fast, professional access without burning out staff.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href={DEMO_MAILTO}>
                <Button size="lg" className="h-14 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl shadow-blue-600/20">
                  Request Healthcare Demo <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REAL PROBLEM */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              The Hidden Cost of Front-Desk Bottlenecks
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Missed calls don’t just frustrate patients — they delay care, increase
              no-shows, and force staff into constant reactive work.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Phones ringing during patient interactions",
                "After-hours calls going to voicemail",
                "High volume of routine appointment questions",
                "Staff context-switching between care and admin",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Repeat2 className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: Phone,
                title: "Inbound Calls",
                desc: "Answer common questions and collect patient intent.",
              },
              {
                icon: ClipboardList,
                title: "Patient Intake",
                desc: "Capture appointment type, urgency, and availability upfront.",
              },
              {
                icon: Calendar,
                title: "Scheduling",
                desc: "Book, reschedule, and confirm appointments automatically.",
              },
              {
                icon: Clock,
                title: "24/7 Continuity",
                desc: "Patients still get answers and next steps outside office hours.",
              },
            ].map((x, i) => {
              const Icon = x.icon;
              return (
                <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center mb-4">
                     <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-900">{x.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{x.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY IT WORKS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Designed Around Patient Flow
          </h2>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            AI Receptionist is not a generic chatbot. It’s designed to mirror
            how healthcare front desks actually operate: intake, prioritization,
            scheduling, and escalation.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Professional Tone",
                desc: "Consistent, calm, front-desk-appropriate responses for every patient.",
              },
              {
                icon: Users,
                title: "Staff Relief",
                desc: "Drastically reduce interruptions so staff can focus on in-person care.",
              },
              {
                icon: Calendar,
                title: "Operational Efficiency",
                desc: "Higher scheduling throughput with significantly less manual effort.",
              },
            ].map((x, i) => {
              const Icon = x.icon;
              return (
                <Card key={i} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{x.title}</h3>
                    <p className="mt-3 text-slate-600 leading-relaxed">{x.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-16">
            <a href={DEMO_MAILTO}>
              <Button size="lg" className="h-14 px-8 text-base bg-slate-900 hover:bg-slate-800 text-white rounded-full">
                See How It Works for Your Practice
              </Button>
            </a>
          </div>
        </div>
      </section>
      
       {/* Footer */}
       <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg text-slate-900">AI Receptionist</span>
              </div>
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
          <div className="border-t border-slate-200 pt-8 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} RulesCube. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}