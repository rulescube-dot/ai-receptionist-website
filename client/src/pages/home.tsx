import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Calendar,
  Zap,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <span className="font-heading font-bold text-lg">AI Receptionist</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
                Testimonials
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6">
              AI Receptionist for the Next Generation of Customer Engagement
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
              Automate appointment bookings and live conversations across chat, WhatsApp, and voice — so you never miss a lead, even after hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-semibold">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 border-2 border-primary text-primary hover:bg-primary/10 font-semibold">
                Request Demo
              </Button>
            </div>

            {/* Visual Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-8 shadow-lg"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-white border border-border">
                  <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">Chat</p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-border">
                  <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">Voice</p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-border">
                  <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">Booking</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Turn Every Interaction Into a Booking
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI answers calls, chats, WhatsApp messages, and web enquiries — even when your team isn't available.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "24/7 Availability",
                description: "Never miss a lead — your receptionist never sleeps.",
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Multi-Channel Engagement",
                description: "Chat, WhatsApp, SMS, Voice — meet customers on their terms.",
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Smart Scheduling",
                description: "Syncs with calendars and manages reschedules automatically.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border hover:border-primary/50 hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <div className="text-primary mb-4">{item.icon}</div>
                    <h3 className="text-xl font-heading font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Turn Conversations Into Appointments — Effortlessly
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every enquiry becomes a chance to convert, drive revenue, and save your team hours each week.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Intelligent Call & Chat Handling",
                description: "Natural, human-like AI that answers calls and texts instantly.",
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Appointment Scheduler",
                description: "Books, cancels, reschedules, and confirms automatically.",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Multi-Channel Support",
                description: "Chat, WhatsApp, Voice — all covered 24/7.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "CRM & Calendar Sync",
                description: "Connects with your existing tools so schedules stay up-to-date.",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Professional Brand Experience",
                description: "Customizable response tones and branding to match your voice.",
              },
              {
                icon: <ArrowRight className="w-6 h-6" />,
                title: "Smart Routing",
                description: "Routes complex cases to humans when necessary.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: (idx % 2) * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border hover:border-primary/50 transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-bold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Loved by Businesses Like Yours
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Our appointment bookings increased, and our team actually has time to focus on clients — while the AI handles routine scheduling.",
                author: "Sarah Mitchell",
                role: "Dental Practice Owner",
              },
              {
                quote: "The multi-channel support means we capture every inquiry. No more missed opportunities on WhatsApp or chat.",
                author: "James Chen",
                role: "Service Business Manager",
              },
              {
                quote: "Implementation was seamless, and the integration with our CRM happened without a hitch. Highly recommend.",
                author: "Emma Rodriguez",
                role: "Clinic Administrator",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border h-full">
                  <CardContent className="p-8">
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-primary">★</span>
                      ))}
                    </div>
                    <p className="font-heading font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Ready to Automate Your Front Desk?
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Join thousands of businesses using AI Receptionist to capture more leads and save time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-8">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 border-border"
              />
              <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-semibold whitespace-nowrap">
                Start Free Trial
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              No credit card required. 14-day free trial.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-heading font-bold mb-4 text-sm">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4 text-sm">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4 text-sm">Contact</h4>
              <p className="text-muted-foreground text-sm mb-2">hello@aireceptionist.com</p>
              <p className="text-muted-foreground text-sm">(555) 123-4567</p>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <p className="font-heading font-semibold text-sm">AI Receptionist</p>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 AI Receptionist. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
