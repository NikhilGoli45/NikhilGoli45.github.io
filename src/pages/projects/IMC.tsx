import ProjectPageWrapper from "@/components/ProjectPageWrapper";

const IMC = () => {
  const technologies = ["Python", "NumPy", "Pandas", "Matplotlib", "jsonpickle", "Black-Scholes Model", "Linear Regression"];

  return (
    <ProjectPageWrapper>
      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-6">IMC Prosperity Trading Competition (LootLake)</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Our team placed <strong>215th out of over 9,000 global participants</strong>, ranking in the top 2.5% worldwide.
        This project was developed for the IMC Prosperity 2 trading competition, where teams competed to maximize profits in a multi-asset simulated market. Our final trading bot used unique, hand-tuned strategies per product and implemented predictive, statistical, and arbitrage-based techniques to consistently extract value.
      </p>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Strategy Overview</h2>
        <p className="text-muted-foreground mb-6">
          Each product had its own quirks and required tailored strategies. The core file, <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">Trader.py</code>, managed product-specific logic and adapted to market conditions per tick. We avoided general templates and instead handcrafted behavior based on observed market patterns.
        </p>
        <div className="border border-border p-6">
          <ul className="list-disc list-inside text-muted-foreground space-y-4">
            <li><strong>AMETHYSTS:</strong> Static fair-value product. We traded aggressively around a known anchor price (10,000) with layered limit orders and inventory-aware execution.</li>
            <li><strong>STARFRUIT:</strong> Linear regression-based predictive trading using recent price data and timestamps to forecast short-term price direction.</li>
            <li><strong>ORCHIDS:</strong> Event-driven export product. The bot detected profitable conversion opportunities after accounting for tariffs and market spread, executing bulk sell orders and conversions accordingly.</li>
            <li><strong>GIFT_BASKET:</strong> Basket arbitrage. We monitored the price deviation between the basket and its components (CHOCOLATE, STRAWBERRIES, ROSES) to exploit inefficient bundling and unbundling opportunities.</li>
            <li><strong>COCONUT & COUPON:</strong> Options pricing. We modeled the fair value of a European call option using a simplified Black-Scholes formula, combining intrinsic value with delta-adjusted premium. Trades were executed when mispricings were detected between the coconut and its associated coupon.</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Technical Highlights</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li><strong>Per-asset strategy modules:</strong> Each product used its own trading logic embedded within a unified decision loop.</li>
          <li><strong>Statistical prediction:</strong> For STARFRUIT and ROSES, we implemented lightweight regression models to predict price direction based on moving windows of prices and time.</li>
          <li><strong>Dynamic fair value estimation:</strong> Multiple products dynamically computed mid-prices or basket component valuations for adaptive quoting.</li>
          <li><strong>Risk management:</strong> All strategies were position-aware and scaled trading size based on inventory and volatility triggers.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="caption border border-border px-2 py-0.5">{tech}</span>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Source Code</h2>
        <a
          href="https://github.com/NikhilGoli45/LootLake"
          target="_blank"
          rel="noopener noreferrer"
          className="caption uppercase tracking-widest border border-border px-4 py-2 hover:bg-secondary transition-colors inline-flex items-center gap-2"
        >
          GitHub →
        </a>
      </section>
    </ProjectPageWrapper>
  );
};

export default IMC;
