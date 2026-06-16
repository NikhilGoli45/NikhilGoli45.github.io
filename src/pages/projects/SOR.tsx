import ProjectPageWrapper from "@/components/ProjectPageWrapper";

const SOR = () => {
  const technologies = ["Python", "NumPy", "Pandas", "Matplotlib"];

  return (
    <ProjectPageWrapper>
      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-6">Smart Order Router Backtesting Framework</h1>
      <p className="text-lg text-muted-foreground mb-10">
        This project implements a backtesting framework for evaluating Smart Order Routing (SOR) algorithms in a simulated multi-venue market. Designed to mimic real-world trading environments, the framework enables detailed testing of routing strategies, such as TWAP, using both synthetic and stochastic price data. It emphasizes latency, slippage, and execution cost, providing a robust foundation for strategy evaluation and improvement.
      </p>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Simulation Design</h2>
        <p className="text-muted-foreground mb-4">
          The simulated market consists of three venues with prices based on a shared baseline trajectory (driven by Gaussian noise) with additional venue-specific noise to reflect realistic market discrepancies. Orders are generated randomly over time with varying sizes. A TWAP (Time-Weighted Average Price) SOR strategy is used for execution. Each order is split into ten parts to be executed at regular time intervals, and at each step, the venue with the lowest available price is selected.
        </p>
        <p className="text-muted-foreground">
          To simulate latency, a delay is introduced between venue selection and execution. Executed trades are priced slightly later than the observed optimal price. This delay mimics slippage due to network or system lag, providing a more realistic performance benchmark.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Evaluation Metrics</h2>
        <p className="text-muted-foreground mb-4">
          The backtester computes three primary metrics for evaluating SOR performance:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li><strong>Execution Cost:</strong> Measures how far execution prices deviate from a 5-period VWAP benchmark. Negative values indicate price improvement.</li>
          <li><strong>Slippage:</strong> Captures the price difference due to latency and timing mismatches between decision and execution.</li>
          <li><strong>Fill Rate:</strong> Not used in the current TWAP-only test but foundational for future extensions involving partial fills.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Results and Observations</h2>
        <p className="text-muted-foreground mb-4">
          The TWAP SOR was tested across 100 simulated runs. Each run used different order timings and price movements to introduce variance. The average execution cost was <strong>-5.57</strong> and the average slippage was <strong>-4.37</strong>. The negative execution cost indicates that the SOR routinely achieved better prices than the VWAP benchmark, but the slippage reveals performance degradation due to latency.
        </p>
        <p className="text-muted-foreground">
          A graph was also included in the final visualization, plotting market prices and trade placements, helping to interpret routing decisions visually. Despite successful average performance, the system lacks more advanced market elements like iceberg orders, venue-specific latency, or volume dynamics, which could further stress-test strategy robustness.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Future Improvements</h2>
        <p className="text-muted-foreground mb-4">
          Several enhancements could elevate the backtester's realism and utility:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Introduce diverse order types (e.g., iceberg, stop-loss) into the simulation.</li>
          <li>Model venue-specific characteristics such as differing latencies or liquidity profiles.</li>
          <li>Expand the execution strategy set to include VWAP, POV, and hybrid strategies.</li>
          <li>Use stochastic processes like Hawkes models to generate richer synthetic LOBs.</li>
          <li>Support partial fills and multi-leg orders to enable testing of more complex strategies.</li>
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
          href="https://github.com/NikhilGoli45/SOR-Backtester"
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

export default SOR;
