// src/app/api/books/post.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      cover_image_url,
      author_id,
      category_id,
      trope,
    } = body;

    // Validate required fields
    if (!title || !author_id) {
      return NextResponse.json(
        { error: "Title and author are required" },
        { status: 400 }
      );
    }

    // Create the book with PUBLISHED status
    const newBook = await prisma.books.create({
      data: {
        title,
        description,
        cover_image_url,
        author_id,
        category_id,
        trope,
        status: "PUBLISHED", // Always set to published as requested
        published_at: new Date(), // Set published date to now
      },
      include: {
        authors: true,
        categories: true,
      },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}
