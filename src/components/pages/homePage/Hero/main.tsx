import Link from "next/link";
import { Button } from "@/components/ui/button";
import Carousel from "./BookCarousel";
import { BookIcon, Pen } from "lucide-react";
const romanceEmojis = [
  "💕",
  "💖",
  "💗",
  "💓",
  "💝",
  "💘",
  "💞",
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🤍",
  "🖤",
  "🤎",
  "💋",
  "🥰",
  "😍",
  "🤗",
  "😘",
  "😚",
  "😙",
];


export function HeroSection() {
  const featuredBooks = [
    {
      id: "1",
      title: "Eternal Hearts",
      author: "Isabella Rose",
      coverImageUrl: "/images/motivational_book.jpg",
      tags: ["Paranormal"],
      price:"40"
    },
    {
      id: "2",
      title: "Sweet Nothings",
      author: "Honey Bee",
      coverImageUrl: "/images/book.jpg",
      tags: ["Sweet Romance"],
    },
    {
      id: "3",
      title: "Eternal Hearts",
      author: "Isabella Rose",
      coverImageUrl: "/images/motivational_book.jpg",
      tags: ["Paranormal"],
    },
    {
      id: "4",
      title: "Sweet Nothings",
      author: "Honey Bee",
      coverImageUrl: "/images/book.jpg",
      tags: ["Sweet Romance"],
    },
    {
      id: "5",
      title: "Good Life",
      author: "Quantoxt Briggs",
      coverImageUrl: "/images/motivational_book.jpg",
      tags:[""]
    }

    // Add more books as needed
  ];
  
  return (
    <section className="full">
      <div className=" inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-500  opacity-100 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 25}px`,
            }}
          >
            {romanceEmojis[Math.floor(Math.random() * romanceEmojis.length)]}
          </div>
        ))}
      </div>
      <div className="wrapper">
        <div className="sect-details">
          <h1 className="sect-title">
            Discover Your Next <br /> <span>Romance Adventure</span>
          </h1>
          <p className="sect-subtitle">
            {" "}
            Curated romance that flirts, teases, and delivers the swoon. From
            slow-burn aches to off-the-charts spice, we publish stories that
            leave you breathless and reaching for one more chapter.
          </p>
        </div>
        <div className="btn-wrap">
          <Button size={"lg"}>
            <Link href="/categories/all">Explore Books</Link>
            <BookIcon className="text-white w-6 h-6" />
          </Button>

          <Button size={"lg"} variant={"secondary"}>
            <Link href="/author-application">Become an Author</Link>
            <Pen className="w-6 h-6"></Pen>
          </Button>
        </div>
        <Carousel
          books={featuredBooks}
          title="Featured Books"
          autoSlide={true}
          autoSlideInterval={4000}
        />
      </div>
    </section>
  );
}
