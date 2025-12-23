import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mic, 
  MessageSquare, 
  Calendar, 
  Shield, 
  Clock, 
  Database, 
  Users,
  Play,
  Pause,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import heroBg from '@assets/generated_images/abstract_ai_voice_processing_visualization_with_dark_background_and_orange_accents.png';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("plumbing");

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-heading font-bold text-primary">AI Receptionist</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Products</Link>
            <Link href="#" className="hover:text-primary transition-colors">Who We Serve</Link>
            <Link href="#" className="hover:text-primary transition-colors">Solutions</Link>
            <Link href="#" className="hover:text-primary transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:flex hover:text-primary hover:bg-transparent">Log in</Button>
            <Button variant="outline" className="hidden sm:flex border-primary/20 text-primary hover:bg-primary/10">
              (555) 123-4567
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Gradient/Image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={heroBg} 
            alt="AI Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70"
          >
            The Most Powerful <br className="hidden md:block" /> Receptionist Service
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Grow your business faster with AI + human call handling built for every scenario. Never miss a lead again.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              AI Receptionist
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-primary/30 hover:bg-primary/10 hover:text-primary">
              Human Receptionists
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
             <Link href="#" className="inline-flex items-center text-primary hover:text-primary/80 font-medium group">
              Talk to us <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-orange-400 to-primary/50"></div>
              
              <CardContent className="p-0">
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                  {/* Left: Player Visual */}
                  <div className="w-full md:w-1/2 space-y-6">
                    <div className="relative aspect-video bg-black/40 rounded-xl overflow-hidden border border-border/50 flex items-center justify-center group cursor-pointer" onClick={togglePlay}>
                      {isPlaying ? (
                        <div className="flex items-center gap-1 h-12">
                          {[1,2,3,4,5].map((i) => (
                            <motion.div 
                              key={i}
                              animate={{ height: ["20%", "100%", "20%"] }}
                              transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                              className="w-2 bg-primary rounded-full"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                          <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                        </div>
                      )}
                      
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-muted-foreground font-mono">
                        <span>AI RECEPTIONIST</span>
                        <span>{isPlaying ? "00:14" : "00:00"} / 02:38</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-8">
                       <div className="text-center">
                         <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary">
                           <Mic className="w-5 h-5" />
                         </div>
                         <span className="text-xs font-medium text-muted-foreground">AI Voice</span>
                       </div>
                       <div className="h-px w-12 bg-border"></div>
                       <div className="text-center">
                         <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2 text-foreground">
                           <Phone className="w-5 h-5" />
                         </div>
                         <span className="text-xs font-medium text-muted-foreground">Caller</span>
                       </div>
                    </div>
                  </div>

                  {/* Right: Controls & Info */}
                  <div className="w-full md:w-1/2">
                    <Tabs defaultValue="plumbing" onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-background/50 mb-8">
                        <TabsTrigger value="plumbing">Plumbing</TabsTrigger>
                        <TabsTrigger value="law">Legal</TabsTrigger>
                        <TabsTrigger value="it">IT</TabsTrigger>
                        <TabsTrigger value="clean">Cleaning</TabsTrigger>
                      </TabsList>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <h3 className="text-lg font-heading font-semibold">Live Call Analysis</h3>
                        </div>
                        
                        <div className="space-y-3">
                           {activeTab === "plumbing" && (
                             <>
                               <DemoFeature icon={<MessageSquare className="w-4 h-4" />} text="Custom Greeting & Intro" time="0:01" />
                               <DemoFeature icon={<Users className="w-4 h-4" />} text="AI Empathy Module" time="0:17" />
                               <DemoFeature icon={<CheckCircle2 className="w-4 h-4" />} text="Service Qualification" time="0:29" />
                               <DemoFeature icon={<Calendar className="w-4 h-4" />} text="AI Scheduling" time="1:20" />
                             </>
                           )}
                           {activeTab === "law" && (
                             <>
                               <DemoFeature icon={<Shield className="w-4 h-4" />} text="Confidentiality Check" time="0:05" />
                               <DemoFeature icon={<MessageSquare className="w-4 h-4" />} text="Case Intake Flow" time="0:22" />
                               <DemoFeature icon={<Users className="w-4 h-4" />} text="Client Screening" time="0:45" />
                               <DemoFeature icon={<Calendar className="w-4 h-4" />} text="Consultation Booking" time="1:10" />
                             </>
                           )}
                           {(activeTab === "it" || activeTab === "clean") && (
                             <>
                               <DemoFeature icon={<MessageSquare className="w-4 h-4" />} text="Service Area Check" time="0:08" />
                               <DemoFeature icon={<Database className="w-4 h-4" />} text="CRM Integration Look-up" time="0:15" />
                               <DemoFeature icon={<Clock className="w-4 h-4" />} text="Emergency Triage" time="0:32" />
                               <DemoFeature icon={<CheckCircle2 className="w-4 h-4" />} text="Ticket Creation" time="0:55" />
                             </>
                           )}
                        </div>
                      </div>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Features that define reliability</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our AI doesn't just answer phones. It handles your entire intake process with human-level understanding and machine-level precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Mic className="w-6 h-6 text-primary" />}
              title="Natural Voice"
              description="Indistinguishable from a human agent, with perfect tone and empathy."
            />
            <FeatureCard 
              icon={<Clock className="w-6 h-6 text-primary" />}
              title="24/7 Availability"
              description="Never miss a call. We answer nights, weekends, and holidays instantly."
            />
            <FeatureCard 
              icon={<Database className="w-6 h-6 text-primary" />}
              title="CRM Integration"
              description="Automatically syncs call logs, recordings, and lead data to your software."
            />
            <FeatureCard 
              icon={<Calendar className="w-6 h-6 text-primary" />}
              title="Instant Booking"
              description="Books appointments directly onto your calendar in real-time."
            />
             <FeatureCard 
              icon={<Shield className="w-6 h-6 text-primary" />}
              title="Spam Blocking"
              description="Screens out robocalls and spam so you only deal with real clients."
            />
            <FeatureCard 
              icon={<MessageSquare className="w-6 h-6 text-primary" />}
              title="Custom Scripts"
              description="Tailor the conversation flow to match your business's specific needs."
            />
             <FeatureCard 
              icon={<Users className="w-6 h-6 text-primary" />}
              title="Live Escalation"
              description="Smartly transfers complex issues to your human team when necessary."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="w-6 h-6 text-primary" />}
              title="Lead Qualification"
              description="Asks the right questions to ensure callers are a good fit for you."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to transform your front desk?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of businesses using AI Receptionist to capture more leads and save time.
          </p>
          <Button size="lg" className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-white shadow-xl">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-heading font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">AI Receptionist</Link></li>
                <li><Link href="#" className="hover:text-primary">Live Agents</Link></li>
                <li><Link href="#" className="hover:text-primary">Integrations</Link></li>
                <li><Link href="#" className="hover:text-primary">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary">Press</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-heading font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary">Case Studies</Link></li>
                <li><Link href="#" className="hover:text-primary">Community</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-heading font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>sales@aireceptionist.com</li>
                <li>(555) 123-4567</li>
                <li className="pt-2 flex gap-4">
                  {/* Social icons placeholders */}
                  <div className="w-8 h-8 rounded bg-border/50"></div>
                  <div className="w-8 h-8 rounded bg-border/50"></div>
                  <div className="w-8 h-8 rounded bg-border/50"></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2024 AI Receptionist Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DemoFeature({ icon, text, time }: { icon: React.ReactNode, text: string, time: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-border/40 hover:border-primary/50 transition-colors">
      <div className="text-primary">{icon}</div>
      <div className="flex-1 text-sm font-medium">{text}</div>
      <div className="text-xs text-muted-foreground font-mono bg-background px-2 py-1 rounded">{time}</div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors group">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-heading font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
