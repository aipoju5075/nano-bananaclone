import { Button } from "@/components/ui/button"
import { BananaIcon } from "@/components/banana-icon"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50 to-background">
      {/* Banana decorations */}
      <div className="absolute top-20 left-10 rotate-[-30deg] opacity-60">
        <BananaIcon className="h-24 w-24 text-yellow-400" />
      </div>
      <div className="absolute top-40 right-20 rotate-[20deg] opacity-60">
        <BananaIcon className="h-32 w-32 text-yellow-400" />
      </div>
      <div className="absolute bottom-40 left-1/4 rotate-[45deg] opacity-40">
        <BananaIcon className="h-20 w-20 text-yellow-400" />
      </div>

      {/* Announcement banner */}
      <div className="flex justify-center pt-6">
        <a
          href="#generator"
          className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 transition-colors hover:bg-yellow-200"
        >
          <span className="text-lg">🍌</span>
          <span>Nano Banana Pro is now live</span>
          <span className="ml-1">→</span>
        </a>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800">
          <span>🍌</span>
          <span>The AI model that outperforms Flux Kontext</span>
          <a href="#generator" className="ml-2 font-semibold hover:underline">
            Try Now →
          </a>
        </div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-7xl">Nano Banana</h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Transform any image with simple text prompts. Nano Banana&apos;s advanced model delivers consistent character
          editing and scene preservation that surpasses Flux Kontext. Experience the future of AI image editing.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="gap-2 bg-yellow-500 text-yellow-950 hover:bg-yellow-400" asChild>
            <a href="#generator">
              Start Editing
              <BananaIcon className="h-5 w-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#showcase">View Examples</a>
          </Button>
        </div>

        {/* Feature tags */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {["One-shot editing", "Multi-image support", "Natural language"].map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
