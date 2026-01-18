import OpenAI from "openai"

export const runtime = "nodejs"

type GenerateRequestBody = {
  mode: "image-to-image" | "text-to-image"
  prompt: string
  images?: string[]
  model?: string
}

function getImageUrls(body: GenerateRequestBody): string[] {
  const urls = (body.images || [])
    .filter((img): img is string => typeof img === "string")
    .filter((url) => url.startsWith("data:image/") || url.startsWith("http"))
  return urls.slice(0, 9)
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return Response.json({ error: "Missing OPENROUTER_API_KEY." }, { status: 500 })
  }

  let body: GenerateRequestBody
  try {
    body = (await req.json()) as GenerateRequestBody
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : ""
  if (!prompt) return Response.json({ error: "Prompt is required." }, { status: 400 })

  const inputImages = body.mode === "image-to-image" ? getImageUrls(body) : []
  if (body.mode === "image-to-image" && inputImages.length === 0) {
    return Response.json({ error: "At least one image is required for image-to-image." }, { status: 400 })
  }

  const siteUrl = process.env.OPENROUTER_SITE_URL || "http://localhost:3000"
  const appName = process.env.OPENROUTER_APP_NAME || "image-editor-clone"

  const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey,
    defaultHeaders: {
      "HTTP-Referer": siteUrl,
      "X-Title": appName,
    },
  })

  const content: Array<
    | { type: "text"; text: string }
    | { type: "image_url"; image_url: { url: string } }
  > = [{ type: "text", text: prompt }]

  if (body.mode === "image-to-image") {
    for (const url of inputImages) {
      content.push({ type: "image_url", image_url: { url } })
    }
  }

  // OpenRouter supports image generation via `modalities: ["image","text"]` for this model.
  // The upstream OpenAI SDK types don't currently include "image" in `modalities`.
  const selectedModel =
    body.model === "google/gemini-2.5-flash-image" ? body.model : "google/gemini-2.5-flash-image"

  const completion = await client.chat.completions.create({
    model: selectedModel,
    modalities: ["image", "text"],
    messages: [
      {
        role: "user",
        content,
      },
    ],
  } as any)

  const message = completion.choices?.[0]?.message as unknown as
    | { images?: Array<{ image_url?: { url?: string } }> }
    | undefined

  const images = (message?.images || [])
    .map((img) => img.image_url?.url)
    .filter((url): url is string => typeof url === "string" && url.length > 0)

  if (images.length === 0) {
    return Response.json(
      { error: "No images returned from model.", rawMessage: completion.choices?.[0]?.message ?? null },
      { status: 502 },
    )
  }

  return Response.json({ images })
}
