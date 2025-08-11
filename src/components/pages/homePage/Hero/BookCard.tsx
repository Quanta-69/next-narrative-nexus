import { Coins, Star, BookOpenText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DynamicCardProps {
  title: string;
  author: string;
  coverImageUrl: string;
  rating?: number;
  pricePerChapter?: number;
  readUrl?: string;
  tags?: string[];
}

export default function DynamicCard({
  title,
  author,
  coverImageUrl,
  rating = 0,
  pricePerChapter = 0,
  readUrl = "#",
  tags = [],
}: DynamicCardProps) {
  return (
    <>
      <div className="card relative">
        <Image
          src={coverImageUrl}
          alt={`${title} cover`}
          width={300}
          height={400}
          className="w-full h-auto object-cover"
        />

        {/* Tags positioned absolutely at the top left of the card */}
        {tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="text-content">
          <div className="details">
            <h1 className="title">{title}</h1>
            <p className="author">by {author}</p>
          </div>
          <div className="extras">
            <p className="rating">
              <Star className="default text-[var(--color-accent)]" />{" "}
              {rating.toFixed(1)}
            </p>
            <p className="price">
              {pricePerChapter} <Coins className="default" /> / chapter
            </p>
          </div>
        </div>
        <div className="btn-wrap">
          <Link href={readUrl}>
            <button>
              <BookOpenText className="default" /> Read Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
