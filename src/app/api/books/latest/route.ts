// src/app/api/books/latest/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("API endpoint hit: /api/books/latest");

    const latestBooks = await prisma.books.findMany({
      where: {
        status: "PUBLISHED",
      },
      include: {
        authors: {
          include: {
            profiles: {
              select: {
                username: true,
                email: true,
              },
            },
          },
        },
        categories: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        published_at: "desc",
      },
      take: 12,
    });

    console.log("Raw result from Prisma:", latestBooks);
    console.log("Type of result:", typeof latestBooks);
    console.log("Is array:", Array.isArray(latestBooks));

    if (!Array.isArray(latestBooks) || latestBooks.length === 0) {
      console.log("No books found");
      return NextResponse.json({ message: "No books found" }, { status: 404 });
    }

    console.log(`Found ${latestBooks.length} books`);
    console.log(
      "Returning books:",
      latestBooks.map((book) => ({ id: book.id, title: book.title }))
    );

    return NextResponse.json(latestBooks);
  } catch (error) {
    console.error("Error fetching latest books:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest books" },
      { status: 500 }
    );
  }
}
