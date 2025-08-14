import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PatternRequest {
  projectType: string;
  skillLevel: string;
  yarnWeight: string;
  size: string;
  description: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectType, skillLevel, yarnWeight, size, description }: PatternRequest = await req.json();
    
    console.log('Generating pattern for:', { projectType, skillLevel, yarnWeight, size, description });

    const huggingfaceApiKey = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
    if (!huggingfaceApiKey) {
      throw new Error('Hugging Face API key not configured');
    }

    const prompt = `You are an expert crochet pattern designer. Create a detailed, accurate crochet pattern with the following specifications:

Project Type: ${projectType}
Skill Level: ${skillLevel}
Yarn Weight: ${yarnWeight}
Size: ${size}
Description: ${description}

Please provide a complete crochet pattern that includes:
1. A clear pattern title
2. Complete materials list (yarn amounts, hook size, notions)
3. Finished size/dimensions
4. Gauge information if applicable
5. Step-by-step instructions with proper crochet terminology
6. Stitch counts where relevant
7. Finishing instructions
8. Any special notes or tips

Format the pattern professionally with clear sections and proper crochet abbreviations. Make sure the pattern is technically accurate and achievable for the specified skill level.`;

    // Try multiple models in order of preference
    const models = [
      'microsoft/DialoGPT-medium',
      'facebook/blenderbot-400M-distill',
      'EleutherAI/gpt-neo-125M'
    ];

    let generatedText = '';
    let modelUsed = '';

    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`);
        
        const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${huggingfaceApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 1500,
              temperature: 0.7,
              do_sample: true,
              return_full_text: false
            }
          }),
        });

        console.log(`Response status for ${model}:`, response.status);

        if (response.ok) {
          const result = await response.json();
          console.log(`Raw API response from ${model}:`, result);

          if (Array.isArray(result) && result.length > 0) {
            generatedText = result[0].generated_text || result[0].text || '';
          } else if (result.generated_text) {
            generatedText = result.generated_text;
          }

          if (generatedText.trim()) {
            modelUsed = model;
            break;
          }
        } else {
          const errorText = await response.text();
          console.log(`Model ${model} failed:`, response.status, errorText);
        }
      } catch (modelError) {
        console.log(`Model ${model} error:`, modelError.message);
        continue;
      }
    }

    // If no AI model worked, provide a professional fallback pattern
    if (!generatedText.trim()) {
      console.log('All AI models failed, using fallback pattern');
      generatedText = `${projectType.toUpperCase()} PATTERN

SKILL LEVEL: ${skillLevel}

MATERIALS:
- ${yarnWeight} weight yarn (amount varies by size)
- Appropriate hook size for chosen yarn weight
- Scissors
- Yarn/tapestry needle for sewing
- Stitch markers (optional)

FINISHED SIZE: ${size || 'Adjust to desired size'}

GAUGE:
Work a 4" x 4" gauge swatch to determine your personal tension and adjust hook size as needed.

ABBREVIATIONS:
- ch = chain
- sc = single crochet
- hdc = half double crochet
- dc = double crochet
- sl st = slip stitch
- st(s) = stitch(es)
- rep = repeat
- beg = beginning
- rnd = round

SPECIAL NOTES:
This is a ${skillLevel} level pattern. ${description}

INSTRUCTIONS:

Foundation:
Ch 25 (or desired width + 5 for turning chains)

Row 1: Sc in 2nd ch from hook and in each ch across. Turn. (24 sc)

Row 2: Ch 1, sc in each st across. Turn.

Repeat Row 2 until piece measures desired length.

Border (optional):
Work 1 round of sc evenly around entire piece, working 3 sc in each corner.

FINISHING:
- Weave in all loose ends
- Block to measurements if needed
- Steam lightly if yarn care allows

CUSTOMIZATION TIPS:
- Adjust foundation chain length for different widths
- Change yarn weight and hook size for different textures
- Add decorative stitches or color changes as desired

Created with love for your crafting journey!`;
    }

    console.log(`Pattern generated successfully${modelUsed ? ` using ${modelUsed}` : ' using fallback'}`);

    return new Response(
      JSON.stringify({ 
        pattern: generatedText,
        modelUsed: modelUsed || 'fallback'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error generating pattern:', error);
    
    // Always provide a fallback pattern
    const fallbackPattern = `BASIC CROCHET PATTERN

This pattern was generated as a fallback due to a technical issue.

MATERIALS:
- Worsted weight yarn
- Size H/8 (5.0mm) crochet hook
- Scissors
- Yarn needle

BASIC INSTRUCTIONS:
Foundation: Chain 20
Row 1: Single crochet in 2nd chain from hook and each chain across. Turn.
Row 2: Chain 1, single crochet in each stitch across. Turn.
Repeat Row 2 until desired length.

FINISHING:
Weave in ends and enjoy your handmade creation!

Note: For more detailed patterns, please try again or contact support.`;

    return new Response(
      JSON.stringify({ 
        pattern: fallbackPattern,
        error: 'Used fallback pattern due to API issues'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});