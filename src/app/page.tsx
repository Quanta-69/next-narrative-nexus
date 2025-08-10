import { Metadata } from "next";
import { HeroSection } from "@/components/pages/homePage/index";
const romanceEmojis = [ "💕",
  "💖",
  "💗",
  "💓",
  "💝",
  "💘",
  "💞",
  "💌",
  "💟",
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🤍",
  "🖤",
  "🤎",
  "💏",
  "💑",
  "👩‍❤️‍👨",
  "👩‍❤️‍👩",
  "👨‍❤️‍👨",
  "💋",
  "🥰",
  "😍",
  "🤗",
  "😘",
  "😚",
  "😙",
];

export const metadata: Metadata = {
  title: `Narrative Nexus`,
  description: `Your go to library for Romance Novels`,
};

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
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
      <HeroSection />
    </>
  );
}
