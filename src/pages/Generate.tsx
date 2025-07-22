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

const Generate = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPattern, setGeneratedPattern] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedPattern(`
**Cozy Winter Scarf Pattern**

**Materials:**
- 200g worsted weight yarn in main color
- 50g worsted weight yarn in accent color
- 5.5mm crochet hook
- Yarn needle

**Finished Size:** 8" x 60"

**Instructions:**

**Foundation Chain:** Ch 25

**Row 1:** Sc in 2nd ch from hook and in each ch across. Turn. (24 sc)

**Row 2:** Ch 1, sc in each sc across. Turn.

**Rows 3-10:** Repeat Row 2.

**Row 11:** Change to accent color, ch 1, sc in each sc across. Turn.

**Rows 12-15:** Continue with accent color, ch 1, sc in each sc across. Turn.

**Row 16:** Change back to main color, ch 1, sc in each sc across. Turn.

**Repeat pattern:** Continue alternating between 10 rows main color and 4 rows accent color until piece measures 60" or desired length.

**Finishing:** 
1. Weave in all ends
2. Block lightly if desired
3. Add fringe if desired (cut 5" strands, fold in half, pull through edge stitches)

**Notes:** 
- Maintain consistent tension throughout
- Count stitches regularly to ensure even edges
- Feel free to adjust colors to your preference
      `);
      setIsGenerating(false);
      toast({
        title: "Pattern Generated!",
        description: "Your custom crochet pattern is ready.",
      });
    }, 3000);
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
                <Select>
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
                <Select>
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
                <Select>
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
                <Input id="size" placeholder="e.g., Adult Medium, 12 inches" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project in detail. Include style, colors, special features, or any specific requirements..."
                  className="min-h-[100px]"
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