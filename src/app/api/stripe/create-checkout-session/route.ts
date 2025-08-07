// app/api/stripe/create-checkout-session/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server"; // Import Clerk's server-side auth

// Initialize Stripe with your secret key
// Ensure STRIPE_SECRET_KEY is set in your .env file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20", // Use the latest API version
});

// Define your coin packages on the backend to prevent tampering from the frontend
const backendCoinPackages = [
  { id: "package_100_coins", name: "100 Coins", price: 1000, coins: 100 }, // price in cents ($10.00)
  { id: "package_500_coins", name: "500 Coins", price: 4500, coins: 500 }, // price in cents ($45.00)
  { id: "package_1000_coins", name: "1000 Coins", price: 8000, coins: 1000 }, // price in cents ($80.00)
];

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate the user with Clerk
    const { userId } = auth();

    if (!userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // 2. Parse the request body to get the selected package ID
    const { packageId } = await req.json();

    // 3. Find the corresponding package details from the backend-defined list
    const selectedPackage = backendCoinPackages.find(
      (pkg) => pkg.id === packageId
    );

    if (!selectedPackage) {
      return new NextResponse(JSON.stringify({ error: "Invalid package ID" }), {
        status: 400,
      });
    }

    // 4. Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Allow card payments
      line_items: [
        {
          price_data: {
            currency: "usd", // Or your desired currency
            product_data: {
              name: selectedPackage.name,
              description:
                selectedPackage.description ||
                `Purchase ${selectedPackage.coins} coins for Narrative Nexus.`,
            },
            unit_amount: selectedPackage.price, // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // URLs to redirect to after successful payment or cancellation
      success_url: `${req.nextUrl.origin}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/purchase-cancel`,
      // Pass custom metadata to the session to retrieve it in the webhook
      metadata: {
        userId: userId,
        coinsAmount: selectedPackage.coins,
      },
      // Optional: Pre-fill customer email if available from Clerk
      customer_email: auth.user?.emailAddresses?.[0]?.emailAddress,
    });

    // 5. Return the Stripe Checkout Session URL to the frontend
    return new NextResponse(JSON.stringify({ url: session.url }), {
      status: 200,
    });
  } catch (error) {
    console.error("Stripe Checkout Session creation failed:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create checkout session" }),
      { status: 500 }
    );
  }
}
