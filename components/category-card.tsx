import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  image: string;
  itemCount: number;
}

export default function CategoryCard({
  name,
  image,
  itemCount,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      }`}
    >
      <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg border-0 h-[350px] w-[300px]">
        <div className="aspect-square overflow-hidden relative rounded-xl">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={300}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent group-hover:from-secondary/80 transition-colors flex items-end">
            <CardContent className="p-6 text-white">
              <h3 className="font-medium text-xl mb-1">{name}</h3>
              <p className="text-sm text-white/90">{itemCount} items</p>
            </CardContent>
          </div>
        </div>
      </Card>
    </Link>
  );
}
