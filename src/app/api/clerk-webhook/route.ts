// app/api/clerk-webhook/route.ts
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assuming you'll create this Prisma client instance

export async function POST(req: Request) {
  // 1. Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // 2. Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // 3. Get the Clerk webhook secret from your environment variables
  //    Make sure to add WEBHOOK_SECRET to your .env.local or .env file
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("You must provide a WEBHOOK_SECRET environment variable.");
  }

  // 4. Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // 5. Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // 6. Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Clerk Webhook Event: ${eventType} for user ID: ${id}`);

  // 7. Handle the event
  if (eventType === "user.created") {
    const { id, username, email_addresses, first_name, last_name } = evt.data;

    const email = email_addresses?.[0]?.email_address; // Get primary email

    try {
      await prisma.profile.create({
        data: {
          id: id, // Clerk's user ID
          username:
            username ||
            `${first_name || "user"}${last_name || ""}_${id.substring(0, 5)}`, // Fallback username
          email: email,
          coin_balance: 0, // Default coin balance
          role: "user", // Default role
          // You can add other default values for avatar_url, etc. here
        },
      });
      console.log(`Profile created for user: ${id}`);
    } catch (error) {
      console.error(`Error creating profile for user ${id}:`, error);
      return new Response("Error creating profile", { status: 500 });
    }
  } else if (eventType === "user.updated") {
    // Handle user updates (e.g., username change, email change)
    const { id, username, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses?.[0]?.email_address;

    try {
      await prisma.profile.update({
        where: { id: id },
        data: {
          username:
            username ||
            `${first_name || "user"}${last_name || ""}_${id.substring(0, 5)}`,
          email: email,
          // Update other fields as needed
          updated_at: new Date(), // Manually update updated_at if not handled by DB trigger
        },
      });
      console.log(`Profile updated for user: ${id}`);
    } catch (error) {
      console.error(`Error updating profile for user ${id}:`, error);
      return new Response("Error updating profile", { status: 500 });
    }
  } else if (eventType === "user.deleted") {
    // Handle user deletion (e.g., delete profile from your DB)
    const { id } = evt.data;
    try {
      await prisma.profile.delete({
        where: { id: id },
      });
      console.log(`Profile deleted for user: ${id}`);
    } catch (error) {
      console.error(`Error deleting profile for user ${id}:`, error);
      return new Response("Error deleting profile", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
