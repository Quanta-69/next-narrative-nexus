// src/app/api/admin/books/post.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Extract book data from request body
    const {
      title,
      description,
      cover_image_url,
      author_id,
      category_id,
      trope,
      status = "DRAFT", // Default to draft status
    } = body;

    // Validate required fields
    if (!title || !author_id) {
      return NextResponse.json(
        { error: "Title and author are required" },
        { status: 400 }
      );
    }

    // Create the book in the database
    const newBook = await prisma.books.create({
      data: {
        title,
        description,
        cover_image_url,
        author_id,
        category_id,
        trope,
        status,
        published_at: status === "PUBLISHED" ? new Date() : null,
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
