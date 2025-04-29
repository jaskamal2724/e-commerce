import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  avatar: string
  rating: number
  text: string
}

export default function TestimonialCard({ name, avatar, rating, text }: TestimonialCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-md border border-primary/10 hover:border-primary/30 bg-gradient-to-br from-white to-primary/5 dark:from-background dark:to-primary/10">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent blur-sm opacity-50"></div>
            <Image
              src={avatar || "/placeholder.svg"}
              alt={name}
              width={50}
              height={50}
              className="rounded-full object-cover relative"
            />
          </div>
          <div>
            <h4 className="font-medium">{name}</h4>
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} size={14} className={i < rating ? "text-yellow-500 fill-current" : "text-muted"} />
                ))}
            </div>
          </div>
        </div>
        <p className="text-muted-foreground italic">{text}</p>
      </CardContent>
    </Card>
  )
}
