// src/components/ui/BookComponent.tsx
import Image from "next/image";
import Link from "next/link";
import {BookOpenText} from "lucide-react"

interface BookComponentProps {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  rating?: number;
  price?: number;
  tags?: string[];
  description?: string;
  showDescription?: boolean;
  showAuthor?: boolean;
  showRating?: boolean;
  showPrice?: boolean;
  showTags?: boolean;
  className?: string;
}

export default function BookComponent({
  id,
  title,
  author,
  coverImageUrl,
  rating = 0,
  price,
  tags = [],
  description,
  showDescription = false,
  showAuthor = true,
  showRating = true,
  showPrice = true,
  showTags = true,
  className = "",
}: BookComponentProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${className}`}
    >
      <div className="aspect-[3/4] relative h-[max-content]">
        <Image
          src={coverImageUrl}
          alt={`${title} by ${author}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          {showTags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          {showAuthor && (
            <p className="text-pink-200 text-sm mb-2">by {author}</p>
          )}
          {showRating && rating > 0 && (
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-pink-200 ml-1">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
          {showDescription && description && (
            <p className="text-sm text-gray-200 mb-2 line-clamp-2">
              {description}
            </p>
          )}
          <div className="flex justify-between items-center mt-2">
            {showPrice && price !== undefined && (
              <span className="font-bold text-lg">${price.toFixed(2)}</span>
            )}
            <Link href={`/books/${id}`}className=" w-full bg-[var(--color-primary)] rounded-lg font-bold text-center py-2 text-sm inline-flex items-center justify-center">{" "}<BookOpenText className="w-5 h-5 mr-2" />Read Now</Link>
          </div>
        </div>
      </div>
      </div>
  );
}
