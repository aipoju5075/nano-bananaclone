"use client"

import type React from "react"

import { useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, ImageIcon, Sparkles, X, Copy } from "lucide-react"

export function EditorSection() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<string[]>([])
  const [prompt, setPrompt] = useState("")
  const [model, setModel] = useState("google/gemini-2.5-flash-image")
  const [mode, setMode] = useState("image-to-image")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [generateError, setGenerateError] = useState<string | null>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])

  const handleFiles = (files: File[]) => {
    setUploadError(null)
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        if (file.size > 10 * 1024 * 1024) {
          setUploadError("Some files were skipped (max 10MB per image).")
          return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result
          if (!result) return
          setImages((prev) => (prev.length < 9 ? [...prev, result as string] : prev))
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
    e.target.value = ""
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerateError(null)
    setGeneratedImages([])

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          prompt,
          images,
          model,
        }),
      })

      const data = (await res.json()) as { images?: string[]; error?: string }
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
      if (!data.images?.length) throw new Error("No images returned from API.")

      setGeneratedImages(data.images)
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : "Generation failed.")
    } finally {
      setIsGenerating(false)
    }
  }

  const isGenerateDisabled =
    isGenerating || !prompt.trim() || (mode === "image-to-image" && images.length === 0)

  return (
    <section id="generator" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-600">Get Started</h2>
          <h3 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Try The AI Editor</h3>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Experience the power of Nano Banana&apos;s natural language image editing. Transform any photo with simple
            text commands
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Panel */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Prompt Engine
              </CardTitle>
              <CardDescription>Transform your image with AI-powered editing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mode Tabs */}
              <Tabs value={mode} onValueChange={setMode}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image-to-image">Image to Image</TabsTrigger>
                  <TabsTrigger value="text-to-image">Text to Image</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Model Selection */}
              <div className="space-y-2">
                <Label>AI Model Selection</Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google/gemini-2.5-flash-image">Gemini 2.5 Flash Image (Nano Banana)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Requests are sent via OpenRouter to the selected model
                </p>
              </div>

              {/* Image Upload */}
              {mode === "image-to-image" && (
                <div className="space-y-2">
                  <Label>Reference Image</Label>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{images.length}/9</span>
                    <span className="text-xs">Select from Library</span>
                  </div>
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click()
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Add reference images"
                    className="relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-6 transition-colors hover:border-yellow-500/50 hover:bg-muted"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileInput}
                      className="absolute inset-0 opacity-0 pointer-events-none"
                    />
                    {images.length === 0 ? (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm font-medium">Add Image</span>
                        <span className="text-xs text-muted-foreground">Max 10MB</span>
                      </>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {images.map((img, index) => (
                          <div key={index} className="group relative">
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`Upload ${index + 1}`}
                              className="h-20 w-20 rounded-md object-cover"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeImage(index)
                              }}
                              className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        {images.length < 9 && (
                          <div
                            className="flex h-20 w-20 items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25"
                            aria-label="Add another image"
                          >
                            <Upload className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {uploadError && <p className="text-xs text-destructive">{uploadError}</p>}
                </div>
              )}

              {/* Prompt Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Main Prompt</Label>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <Copy className="h-3 w-3" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your desired edit... e.g., 'Place the character in a snowy mountain setting'"
                  className="min-h-[100px] resize-none"
                />
              </div>

              <div className="rounded-lg bg-muted p-3 text-center text-sm">
                Want more powerful image generation features?{" "}
                <a href="#" className="font-medium text-yellow-600 hover:underline">
                  Visit Full Generator →
                </a>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerateDisabled}
                className="w-full bg-yellow-500 text-yellow-950 hover:bg-yellow-400"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-yellow-950 border-t-transparent" />
                    Generating...
                  </>
                ) : (
                  "Generate Now"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-yellow-500" />
                Output Gallery
              </CardTitle>
              <CardDescription>Your ultra-fast AI creations appear here instantly</CardDescription>
            </CardHeader>
            <CardContent>
              {generateError && (
                <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  {generateError}
                </div>
              )}
              {generatedImages.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 p-8 text-center">
                  <div className="mb-4 rounded-full bg-yellow-100 p-4">
                    <Sparkles className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h4 className="mb-2 font-semibold">Ready for instant generation</h4>
                  <p className="text-sm text-muted-foreground">Enter your prompt and unleash the power</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {generatedImages.map((img, index) => (
                    <img
                      key={index}
                      src={img || "/placeholder.svg"}
                      alt={`Generated ${index + 1}`}
                      className="w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-lg bg-muted p-3 text-center text-sm">
                Want more powerful image generation features?{" "}
                <a href="#" className="font-medium text-yellow-600 hover:underline">
                  Visit Full Generator →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
