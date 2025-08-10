import Link from "next/link";
import BookCarousel from "./BookCarousel";

export function HeroSection() {
    const featuredBooks = [
      {
        id: "1",
        title: "Sweet Nothings",
        author: "Honey Bee",
        coverImageUrl:
          "https://hd.wallpaperswide.com/thumbs/blonde_girl_fashion_model_sunglasses-t1.jpg",
        tags: ["Sweet Romance"],
      },
      {
        id: "2",
        title: "Eternal Hearts",
        author: "Isabella Rose",
        coverImageUrl:
          "https://hd.wallpaperswide.com/thumbs/blonde_girl_fashion_model_sunglasses-t1.jpg",
        tags: ["Paranormal"],
      },

      // Add more books as needed
    ];
  
  return (
    <section className="custom-section-padding bg-gradient-to-r from-red-50 to-orange-50 full">
      <div className="custom-container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="custom-section-title">
            Discover Your Next <br />{" "}
            <span className="text-[var(--color-primary)]">
              Romance Adventure
            </span>
          </h1>
          <p className="custom-section-description mb-8">
            {" "}
            Immerse yourself in a world of passion, desire, and heartfelt
            connections. From sweet contemporary romances to steamy historical
            tales, we have the perfect story for every mood.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/categories/all"
              className="custom-btn custom-btn-primary"
            >
              Explore Books
            </Link>
            <Link
              href="/author-application"
              className="custom-btn custom-btn-outline"
            >
              Become an Author
            </Link>
          </div>
        </div>
      </div>
      <BookCarousel
        books={featuredBooks}
        title="Featured This Week"
        className="mt-8"
      />
    </section>
  );
}
