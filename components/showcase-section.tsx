import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

const showcaseItems = [
  {
    image: "/ai-generated-majestic-mountain-landscape-with-snow.jpg",
    title: "Ultra-Fast Mountain Generation",
    description: "Created in 0.8 seconds with Nano Banana's optimized neural engine",
  },
  {
    image: "/ai-generated-beautiful-garden-with-flowers-and-pat.jpg",
    title: "Instant Garden Creation",
    description: "Complex scene rendered in milliseconds using Nano Banana technology",
  },
  {
    image: "/ai-generated-tropical-beach-with-crystal-clear-wat.jpg",
    title: "Real-time Beach Synthesis",
    description: "Nano Banana delivers photorealistic results at lightning speed",
  },
  {
    image: "/ai-generated-aurora-borealis-over-snowy-landscape.jpg",
    title: "Rapid Aurora Generation",
    description: "Advanced effects processed instantly with Nano Banana AI",
  },
]

export function ShowcaseSection() {
  return (
    <section id="showcase" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-600">Showcase</h2>
          <h3 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Lightning-Fast AI Creations</h3>
          <p className="mx-auto max-w-2xl text-muted-foreground">See what Nano Banana generates in milliseconds</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {showcaseItems.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-2 transition-all hover:border-yellow-500/50 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="mb-2 flex items-center gap-2 text-yellow-500">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm font-medium">Nano Banana Speed</span>
                  </div>
                  <h4 className="mb-1 text-xl font-bold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Experience the power of Nano Banana yourself</p>
          <Button size="lg" className="bg-yellow-500 text-yellow-950 hover:bg-yellow-400" asChild>
            <a href="#generator">Try Nano Banana Generator</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
