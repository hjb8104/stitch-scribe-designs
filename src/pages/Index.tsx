import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap, Heart, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import heroCrochet from "@/assets/hero-crochet.jpg";

const Index = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Our advanced AI creates unique, detailed crochet patterns tailored to your specifications in seconds."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get complete patterns with materials list, instructions, and tips instantly. No more waiting or searching."
    },
    {
      icon: Heart,
      title: "Beginner Friendly",
      description: "Clear, step-by-step instructions with difficulty levels make our patterns perfect for any skill level."
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description: "Download your patterns as PDF, print-friendly versions, or save to your personal pattern library."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Create Beautiful
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Crochet Patterns</span>
                <br />with AI Magic
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Transform your crochet ideas into detailed, professional patterns instantly. Our AI understands your vision and creates step-by-step instructions tailored to your skill level.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/generate">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-soft">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Creating
                </Button>
              </Link>
              <Link to="/patterns">
                <Button variant="outline" size="lg">
                  Browse Patterns
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Instant generation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Free to try</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-secondary rounded-2xl p-8 shadow-soft">
              <img 
                src={heroCrochet} 
                alt="Beautiful crochet patterns and yarn" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-card p-4 rounded-xl shadow-card border">
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium">1000+ patterns generated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 bg-card/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Yarney's World?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of crochet pattern creation with our intelligent AI system designed specifically for crafters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card hover:shadow-soft transition-shadow text-center group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Creating your perfect crochet pattern is as easy as 1-2-3. Let our AI do the heavy lifting while you focus on the fun part - crafting!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Describe Your Project",
              description: "Tell us what you want to create - a cozy scarf, cute amigurumi, or intricate doily. Include your skill level and preferences."
            },
            {
              step: "02", 
              title: "AI Generates Pattern",
              description: "Our intelligent AI analyzes your request and creates a detailed, professional pattern with materials list and instructions."
            },
            {
              step: "03",
              title: "Start Crocheting",
              description: "Download your pattern in multiple formats and start creating! Each pattern includes helpful tips and troubleshooting guides."
            }
          ].map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-xl">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="bg-gradient-primary rounded-2xl p-12 text-center text-primary-foreground shadow-soft">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your Next Masterpiece?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of crafters who've discovered the magic of AI-powered crochet patterns. Start creating beautiful projects today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generate">
              <Button size="lg" variant="secondary" className="shadow-card">
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Your First Pattern
              </Button>
            </Link>
            <Link to="/patterns">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Explore Featured Patterns
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/80">
        <div className="container py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Yarney's World</span>
              </div>
              <p className="text-muted-foreground">
                Empowering crafters with AI-generated crochet patterns that inspire creativity and bring ideas to life.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Pattern Generator</li>
                <li>Featured Patterns</li>
                <li>Pattern Library</li>
                <li>Skill Levels</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Tutorials</li>
                <li>Community</li>
                <li>Contact Us</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Yarney's World. All rights reserved. Made with ❤️ for crafters everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
