import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
  stock:number
}

export default function ProductCard({ id, name, price, image, category, rating, stock }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg border border-border/50 h-[550px] w-[300px]">
      <Link href={`/products/${id}`} className="relative block overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            Quick View
          </Button>
        </div>
        <div className="absolute top-2 right-2">
          <div className="bg-secondary text-blue-400 text-xs font-bold px-2 py-1 rounded-full">{stock}</div>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="text-sm text-primary font-medium mb-1">{category}</div>
        <Link href={`/products/${id}`} className="block">
          <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{name}</h3>
        </Link>
        <div className="flex items-center gap-1">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                size={14}
                className={cn(
                  "fill-current",
                  i < Math.floor(rating) ? "text-yellow-500" : "text-muted",
                  i === Math.floor(rating) && rating % 1 > 0 ? "text-yellow-500" : "",
                )}
              />
            ))}
          <span className="text-sm text-muted-foreground ml-1">{rating}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-medium text-lg">Rs. {price.toFixed(2)}</div>
        <Button size="sm" className="rounded-full w-9 h-9 p-0 bg-primary hover:bg-primary/90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
