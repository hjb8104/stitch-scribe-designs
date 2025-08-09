import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Download, Heart, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Generate = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPattern, setGeneratedPattern] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    projectType: "",
    skillLevel: "",
    yarnWeight: "",
    size: "",
    description: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    // Validate required fields
    if (!formData.projectType || !formData.skillLevel || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in project type, skill level, and description.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-crochet-pattern', {
        body: formData
      });

      if (error) {
        throw error;
      }

      setGeneratedPattern(data.pattern);
      toast({
        title: "Pattern Generated!",
        description: "Your custom crochet pattern is ready.",
      });
    } catch (error) {
      console.error('Error generating pattern:', error);
      
      // Wait 10 seconds before showing error message
      setTimeout(() => {
        toast({
          title: "Generation Failed",
          description: "There was an error generating your pattern. Please try again.",
          variant: "destructive"
        });
        setIsGenerating(false);
      }, 10000);
      
      // Don't set isGenerating to false immediately - let the timeout handle it
      return;
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Generate Your Perfect
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Pattern</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Describe what you want to create and our AI will generate a detailed crochet pattern just for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Generation Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Pattern Generator
              </CardTitle>
              <CardDescription>
                Fill in the details below to create your custom crochet pattern.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="project-type">Project Type</Label>
                <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scarf">Scarf</SelectItem>
                    <SelectItem value="hat">Hat</SelectItem>
                    <SelectItem value="blanket">Blanket</SelectItem>
                    <SelectItem value="amigurumi">Amigurumi</SelectItem>
                    <SelectItem value="doily">Doily</SelectItem>
                    <SelectItem value="sweater">Sweater</SelectItem>
                    <SelectItem value="bag">Bag</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skill-level">Skill Level</Label>
                <Select value={formData.skillLevel} onValueChange={(value) => handleInputChange('skillLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="yarn-weight">Yarn Weight</Label>
                <Select value={formData.yarnWeight} onValueChange={(value) => handleInputChange('yarnWeight', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select yarn weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lace">Lace (0)</SelectItem>
                    <SelectItem value="sport">Sport (2)</SelectItem>
                    <SelectItem value="dk">DK (3)</SelectItem>
                    <SelectItem value="worsted">Worsted (4)</SelectItem>
                    <SelectItem value="chunky">Chunky (5)</SelectItem>
                    <SelectItem value="super-chunky">Super Chunky (6)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Input 
                  id="size" 
                  placeholder="e.g., Adult Medium, 12 inches" 
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project in detail. Include style, colors, special features, or any specific requirements..."
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-primary hover:opacity-90"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Pattern...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Pattern
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Pattern */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Generated Pattern</CardTitle>
              <CardDescription>
                {generatedPattern ? "Your custom pattern is ready!" : "Your pattern will appear here once generated."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedPattern ? (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                      {generatedPattern}
                    </pre>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Fill out the form and click "Generate Pattern" to create your custom crochet pattern.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Generate;