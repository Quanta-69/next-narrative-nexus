// components/CoinPurchaseButton.tsx
"use client"; // This component will run on the client-side

import { useState } from "react";
import { useRouter } from "next/navigation"; // For redirection

// Define your coin packages
const coinPackages = [
  {
    id: "package_100_coins",
    name: "100 Coins",
    price: 1000,
    coins: 100,
    description: "Get 100 coins for your reading pleasure!",
  }, // Price in cents ($10.00)
  {
    id: "package_500_coins",
    name: "500 Coins",
    price: 4500,
    coins: 500,
    description: "Save big with 500 coins!",
  }, // Price in cents ($45.00)
  {
    id: "package_1000_coins",
    name: "1000 Coins",
    price: 8000,
    coins: 1000,
    description: "Best value! 1000 coins for avid readers.",
  }, // Price in cents ($80.00)
];

export default function CoinPurchaseSection() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePurchase = async (packageId: string, coins: number) => {
    setLoading(true);
    try {
      // Make a request to your backend API route
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packageId, coins }), // Send package details
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { url } = await response.json(); // Get the Stripe Checkout URL

      if (url) {
        // Redirect the user to Stripe Checkout
        router.push(url);
      } else {
        throw new Error("Stripe checkout URL not received.");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      alert(`Purchase failed: ${(error as Error).message}`); // Use a custom modal in production!
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-lg space-y-6 text-white">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-400">
        Buy Coins
      </h2>
      <p className="text-center text-gray-300 mb-8">
        Unlock chapters and support your favorite authors by purchasing coins!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coinPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-gray-800 p-6 rounded-lg shadow-md border border-purple-700 hover:border-purple-500 transition-all duration-300 flex flex-col items-center text-center"
          >
            <h3 className="text-2xl font-semibold mb-2 text-purple-300">
              {pkg.name}
            </h3>
            <p className="text-4xl font-extrabold text-green-400 mb-4">
              ${(pkg.price / 100).toFixed(2)}
            </p>
            <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
            <button
              onClick={() => handlePurchase(pkg.id, pkg.coins)}
              disabled={loading}
              className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : `Buy Now`}
            </button>
          </div>
        ))}
      </div>

      {/* Placeholder for custom modal instead of alert */}
      {/* <CustomAlertDialog message={alertMessage} onClose={() => setAlertMessage('')} /> */}
    </div>
  );
}
