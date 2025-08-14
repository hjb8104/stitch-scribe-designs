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

    // Try multiple text generation models in order of preference
    const models = [
      'microsoft/DialoGPT-large',
      'gpt2-medium',
      'distilgpt2'
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

    // If no AI model worked, provide skill-level specific fallback patterns
    if (!generatedText.trim()) {
      console.log('All AI models failed, using skill-level specific fallback pattern');
      
      const getSkillLevelPattern = () => {
        const baseInfo = `${projectType.toUpperCase()} PATTERN

SKILL LEVEL: ${skillLevel.toUpperCase()}
PROJECT DESCRIPTION: ${description}

MATERIALS:
- ${yarnWeight} weight yarn`;

        if (skillLevel === 'beginner') {
          return `${baseInfo} (approximately 300-500 yards)
- Size H/8 (5.0mm) crochet hook
- Scissors
- Yarn/tapestry needle for sewing

FINISHED SIZE: ${size || 'Approximately 12" x 12"'}

GAUGE: 14 sc and 16 rows = 4" in single crochet

ABBREVIATIONS:
- ch = chain
- sc = single crochet
- sl st = slip stitch
- st(s) = stitch(es)
- rep = repeat

BEGINNER-FRIENDLY NOTES:
This pattern uses only single crochet stitches, making it perfect for beginners. Take your time and count your stitches at the end of each row.

INSTRUCTIONS:

Foundation: Ch 43
Row 1: Sc in 2nd ch from hook and in each ch across. Turn. (42 sc)
Row 2: Ch 1, sc in each st across. Turn.
Rows 3-48: Repeat Row 2.

BORDER:
Rnd 1: Ch 1, work sc evenly around entire piece, working 3 sc in each corner. Join with sl st.
Rnd 2: Ch 1, sc in each st around, working 3 sc in corner sts. Join with sl st.

FINISHING:
- Weave in all loose ends securely
- Block to measurements

BEGINNER TIPS:
- Keep your tension consistent
- Count your stitches frequently
- Mark your corners with stitch markers`;

        } else if (skillLevel === 'intermediate') {
          return `${baseInfo} (approximately 400-700 yards)
- Size G/6 (4.0mm) crochet hook
- Scissors
- Yarn/tapestry needle for sewing
- Stitch markers

FINISHED SIZE: ${size || 'Approximately 14" x 14"'}

GAUGE: 16 dc and 8 rows = 4" in double crochet

ABBREVIATIONS:
- ch = chain
- sc = single crochet
- hdc = half double crochet
- dc = double crochet
- tr = treble crochet
- sl st = slip stitch
- st(s) = stitch(es)
- rep = repeat
- sk = skip

INTERMEDIATE TECHNIQUES:
This pattern incorporates texture stitches and shaping techniques suitable for intermediate crocheters.

INSTRUCTIONS:

Foundation: Ch 58
Row 1: Dc in 4th ch from hook and in each ch across. Turn. (56 dc)
Row 2: Ch 3 (counts as dc), *dc in next st, hdc in next st; rep from * across, dc in last st. Turn.
Row 3: Ch 3, *hdc in next st, dc in next st; rep from * across, dc in last st. Turn.
Row 4: Ch 3, dc in each st across. Turn.
Rows 5-6: Repeat Rows 2-3.
Rows 7-32: Repeat Rows 2-6.

DECORATIVE BORDER:
Rnd 1: Ch 1, sc evenly around, working 3 sc in each corner. Join.
Rnd 2: Ch 3, *sk next st, 5 dc in next st, sk next st, sl st in next st; rep from * around. Join.

FINISHING:
- Weave in ends
- Steam block to open up stitch pattern`;

        } else { // advanced
          return `${baseInfo} (approximately 600-1000 yards)
- Size F/5 (3.75mm) crochet hook
- Size E/4 (3.5mm) crochet hook (for edging)
- Scissors
- Yarn/tapestry needle for sewing
- Stitch markers
- Row counter (recommended)

FINISHED SIZE: ${size || 'Approximately 16" x 16"'}

GAUGE: 18 dc and 9 rows = 4" in double crochet with larger hook

ABBREVIATIONS:
- ch = chain
- sc = single crochet
- hdc = half double crochet
- dc = double crochet
- tr = treble crochet
- dtr = double treble crochet
- sl st = slip stitch
- st(s) = stitch(es)
- rep = repeat
- sk = skip
- cl = cluster
- pc = popcorn
- fdc = foundation double crochet

ADVANCED TECHNIQUES USED:
- Complex stitch combinations
- Lacework patterns
- Foundation stitches
- Intricate shaping

SPECIAL STITCHES:
Popcorn (pc): 5 dc in indicated st, drop loop from hook, insert hook in first dc of group, pick up dropped loop and pull through.
Cluster (cl): *Yo, insert hook in indicated st, yo and pull up a loop, yo and pull through 2 loops; rep from * 2 more times in same st, yo and pull through all 4 loops on hook.

INSTRUCTIONS:

Foundation: Work 72 fdc with larger hook
Row 1 (RS): Ch 3 (counts as dc), dc in each fdc across. Turn. (72 dc)
Row 2: Ch 3, *dc in next 3 sts, pc in next st; rep from * across to last 4 sts, dc in last 4 sts. Turn.
Row 3: Ch 3, dc in each st across. Turn.
Row 4: Ch 3, dc in next st, *pc in next st, dc in next 3 sts; rep from * across to last 2 sts, pc in next st, dc in last st. Turn.
Row 5: Ch 3, dc in each st across. Turn.
Rows 6-45: Rep Rows 2-5.

INTRICATE LACE BORDER:
Change to smaller hook.
Rnd 1: Ch 1, sc evenly around, working 3 sc in each corner. Join.
Rnd 2: Ch 1, sc in first st, *ch 5, sk 2 sts, sc in next st; rep from * around. Join.
Rnd 3: Sl st to center of first ch-5 sp, ch 1, *(sc, hdc, 3 dc, hdc, sc) in ch-5 sp; rep from * around. Join.
Rnd 4: Ch 1, *sc between shells, ch 7; rep from * around. Join.
Rnd 5: Sl st to center of first ch-7 sp, ch 1, *(sc, hdc, 5 dc, hdc, sc) in ch-7 sp; rep from * around. Join.

FINISHING:
- Weave in all ends meticulously
- Wet block aggressively to open lace pattern
- Steam press if yarn permits

ADVANCED NOTES:
- Maintain consistent tension throughout lacework sections
- Use lifelines every 10 rows for complex sections
- Consider yarn substitutions carefully to maintain drape`;
        }
      };

      generatedText = getSkillLevelPattern();
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