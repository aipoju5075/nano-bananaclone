import { BananaIcon } from "@/components/banana-icon"

export function Footer() {
  return (
    <footer className="border-t bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <BananaIcon className="h-8 w-8 text-yellow-500" />
            <span className="text-xl font-bold">Nano Banana</span>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            The most advanced AI image editor. Transform any photo with natural language prompts.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Contact
            </a>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Nano Banana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
