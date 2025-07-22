import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Download, Clock, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import patternsShowcase from "@/assets/patterns-showcase.jpg";

const Patterns = () => {
  const featuredPatterns = [
    {
      id: 1,
      title: "Rainbow Granny Square Blanket",
      description: "A colorful and cozy blanket perfect for beginners. Features traditional granny squares in a rainbow pattern.",
      difficulty: "Beginner",
      time: "2-3 weeks",
      rating: 4.8,
      downloads: 1234,
      image: patternsShowcase,
      tags: ["Blanket", "Granny Square", "Colorful"]
    },
    {
      id: 2,
      title: "Amigurumi Teddy Bear",
      description: "An adorable teddy bear pattern with moveable arms and legs. Perfect for gifts or nursery decoration.",
      difficulty: "Intermediate",
      time: "1 week",
      rating: 4.9,
      downloads: 856,
      image: patternsShowcase,
      tags: ["Amigurumi", "Toy", "Gift"]
    },
    {
      id: 3,
      title: "Lace Doily Centerpiece",
      description: "An elegant lace doily with intricate patterns. Beautiful centerpiece for any table setting.",
      difficulty: "Advanced",
      time: "3-4 days",
      rating: 4.7,
      downloads: 623,
      image: patternsShowcase,
      tags: ["Doily", "Lace", "Home Decor"]
    },
    {
      id: 4,
      title: "Chunky Infinity Scarf",
      description: "A quick and warm infinity scarf using chunky yarn. Perfect for cold weather and makes a great gift.",
      difficulty: "Beginner",
      time: "2-3 days",
      rating: 4.6,
      downloads: 1456,
      image: patternsShowcase,
      tags: ["Scarf", "Quick", "Chunky"]
    },
    {
      id: 5,
      title: "Mandala Wall Hanging",
      description: "A stunning mandala design perfect for bohemian home decor. Features intricate geometric patterns.",
      difficulty: "Intermediate",
      time: "1 week",
      rating: 4.8,
      downloads: 789,
      image: patternsShowcase,
      tags: ["Mandala", "Wall Art", "Bohemian"]
    },
    {
      id: 6,
      title: "Baby Booties Set",
      description: "Soft and adorable baby booties in multiple sizes. Perfect for baby showers and newborn gifts.",
      difficulty: "Beginner",
      time: "1 day",
      rating: 4.9,
      downloads: 2134,
      image: patternsShowcase,
      tags: ["Baby", "Booties", "Gift"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-secondary text-secondary-foreground";
      case "Intermediate": return "bg-accent text-accent-foreground";
      case "Advanced": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Patterns</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our collection of beautiful, AI-generated crochet patterns. From beginner-friendly projects to advanced masterpieces.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPatterns.map((pattern) => (
            <Card key={pattern.id} className="shadow-card hover:shadow-soft transition-shadow group">
              <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                <img 
                  src={pattern.image} 
                  alt={pattern.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="line-clamp-2">{pattern.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(pattern.difficulty)}>
                        {pattern.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        {pattern.rating}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="line-clamp-3">
                  {pattern.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {pattern.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {pattern.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {pattern.downloads.toLocaleString()}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    <Download className="mr-2 h-4 w-4" />
                    Download Pattern
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Patterns
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Patterns;