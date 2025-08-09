import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PatternRequest {
  projectType: string;
  skillLevel: string;
  yarnWeight: string;
  size: string;
  description: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { projectType, skillLevel, yarnWeight, size, description }: PatternRequest = await req.json()

    const huggingfaceApiKey = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')
    if (!huggingfaceApiKey) {
      throw new Error('Hugging Face API key not configured')
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

Format the pattern professionally with clear sections and proper crochet abbreviations. Make sure the pattern is technically accurate and achievable for the specified skill level.`

    const hf = new HfInference(huggingfaceApiKey)

    const response = await hf.textGeneration({
      model: 'microsoft/DialoGPT-medium',
      inputs: prompt,
      parameters: {
        max_new_tokens: 2000,
        temperature: 0.7,
        return_full_text: false,
      },
    })

    const pattern = response.generated_text

    return new Response(
      JSON.stringify({ pattern }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error generating pattern:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})