// src/components/BooksDisplay.tsx
"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface Book {
  id: string;
  title: string;
  description?: string;
  cover_image_url: string;
  published_at: string;
  trope?: string;
  status: string;
  author_id: string;
  category_id?: string;
  authors: {
    id: string;
    profiles: {
      username: string;
      email: string;
    };
  };
  categories: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

interface ErrorResponse {
  error: string;
}

export default function BooksDisplay() {
  const { data, error, isLoading } = useSWR<Book[] | ErrorResponse>(
    "/api/books/latest",
    fetcher,
    {
      onError: (error) => {
        console.error("SWR Error:", error);
      },
    }
  );

  // Add debugging logs
  console.log("SWR data:", data);
  console.log("SWR error:", error);
  console.log("SWR isLoading:", isLoading);

  if (isLoading) return <div>Loading books...</div>;

  if (error) {
    console.error("Full error object:", error);
    return (
      <div>
        <h3>Error loading books</h3>
        <p>Error details: {error.message}</p>
      </div>
    );
  }

  // Check if data exists
  if (!data) {
    console.log("No data returned from API");
    return <div>No data available</div>;
  }

  // Check if data is an error response
  if ("error" in data) {
    const errorResponse = data as ErrorResponse;
    console.log("API returned error:", errorResponse.error);
    return (
      <div>
        <h3>API Error</h3>
        <p>{errorResponse.error}</p>
      </div>
    );
  }

  // Check if data is an array
  if (!Array.isArray(data)) {
    console.log("Data is not an array:", typeof data, data);
    return <div>Invalid data format</div>;
  }

  if (data.length === 0) {
    console.log("Empty array returned");
    return <div>No books found</div>;
  }

  // Now we know data is an array of books
  const books = data as Book[];

  return (
    <div>
      <h2>Latest Books ({books.length})</h2>
      <div>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{book.title}</h3>
            <p>
              <strong>Author:</strong> {book.authors?.profiles.username}
            </p>
            <p>
              <strong>Category:</strong> {book.categories?.name}
            </p>
            <p>
              <strong>Slug:</strong> {book.categories?.slug}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {book.description || "No description available"}
            </p>
            <p>
              <strong>Published:</strong>{" "}
              {new Date(book.published_at).toLocaleDateString()}
            </p>
            {book.cover_image_url && (
              <div>
                <strong>Cover:</strong>
                <img
                  src={book.cover_image_url}
                  alt={book.title}
                  style={{ maxWidth: "100px", maxHeight: "150px" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
