import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IMC = () => {
  const navigate = useNavigate();
  const technologies = [
    "Python",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "jsonpickle",
    "Black-Scholes Model",
    "Linear Regression"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-24">
        <Button
          onClick={() => navigate("/#projects")}
          variant="ghost"
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Button>

        <h1 className="text-4xl font-bold mb-4">IMC Prosperity Trading Competition (LootLake)</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Our team placed <strong>215th out of over 9,000 global participants</strong>, ranking in the top 2.5% worldwide.
          This project was developed for the IMC Prosperity 2 trading competition, where teams competed to maximize profits in a multi-asset simulated market. Our final trading bot used unique, hand-tuned strategies per product and implemented predictive, statistical, and arbitrage-based techniques to consistently extract value.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Strategy Overview</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            Each product had its own quirks and required tailored strategies. The core file, <code>Trader.py</code>, managed product-specific logic and adapted to market conditions per tick. We avoided general templates and instead handcrafted behavior based on observed market patterns.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-4">
              <li><strong>AMETHYSTS:</strong> Static fair-value product. We traded aggressively around a known anchor price (10,000) with layered limit orders and inventory-aware execution.</li>
              <li><strong>STARFRUIT:</strong> Linear regression-based predictive trading using recent price data and timestamps to forecast short-term price direction.</li>
              <li><strong>ORCHIDS:</strong> Event-driven export product. The bot detected profitable conversion opportunities after accounting for tariffs and market spread, executing bulk sell orders and conversions accordingly.</li>
              <li><strong>GIFT_BASKET:</strong> Basket arbitrage. We monitored the price deviation between the basket and its components (CHOCOLATE, STRAWBERRIES, ROSES) to exploit inefficient bundling and unbundling opportunities.</li>
              <li><strong>COCONUT & COUPON:</strong> Options pricing. We modeled the fair value of a European call option using a simplified Black-Scholes formula, combining intrinsic value with delta-adjusted premium. Trades were executed when mispricings were detected between the coconut and its associated coupon.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Technical Highlights</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
            <li><strong>Per-asset strategy modules:</strong> Each product used its own trading logic embedded within a unified decision loop.</li>
            <li><strong>Statistical prediction:</strong> For STARFRUIT and ROSES, we implemented lightweight regression models to predict price direction based on moving windows of prices and time.</li>
            <li><strong>Dynamic fair value estimation:</strong> Multiple products dynamically computed mid-prices or basket component valuations for adaptive quoting.</li>
            <li><strong>Risk management:</strong> All strategies were position-aware and scaled trading size based on inventory and volatility triggers.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Source Code</h2>
          <a
            href="https://github.com/NikhilGoli45/LootLake"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition-colors"
          >
            View on GitHub
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IMC;
