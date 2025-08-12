import { Metadata } from "next";
import { HeroSection, HookSection } from "@/components/pages/homePage/index";
import BooksDisplay from "@/components/pages/homePage/Hero/BookDisplay";

export const metadata: Metadata = {
  title: `Narrative Nexus`,
  description: `Your go to library for Romance Novels`,
};

export default function Home() {
  return (
    <>
      <BooksDisplay/>
      <HeroSection />
      <HookSection/>
    </>
  );
}
