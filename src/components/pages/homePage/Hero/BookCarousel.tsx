// src/components/ui/BookCarousel.tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookComponent from "@/components/ui/BookComponent";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  tags?: string[];
}

interface BookCarouselProps {
  books: Book[];
  title?: string;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  className?: string;
}

export default function BookCarousel({
  books,
  autoSlide = true,
  autoSlideInterval = 3000,
  className = "",
}: BookCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {

    const autoSlide = setInterval(() => {
      emblaApi.scrollNext();
    }, autoSlideInterval);
    if (!autoSlide || !emblaApi) return;
    return () => clearInterval(autoSlide);
  }, [autoSlide, autoSlideInterval, emblaApi]);

  return (
    <div className={`w-full ${className}`}>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {books.map((book) => (
              <div
                key={book.id}
                className="flex-[0_0_40%] md:flex-[0_0_25%] px-2"
              >
                <BookComponent
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  coverImageUrl={book.coverImageUrl}
                  tags={book.tags}
                  showAuthor={true}
                  showRating={true}
                  showPrice={true}
                  showDescription={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full z-10"
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full z-10"
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
