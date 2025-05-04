import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SOR = () => {
  const navigate = useNavigate();
  const technologies = [
    "Python",
    "NumPy",
    "Pandas",
    "Matplotlib",
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

        <h1 className="text-4xl font-bold mb-4">Smart Order Router Backtesting Framework</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          This project implements a backtesting framework for evaluating Smart Order Routing (SOR) algorithms in a simulated multi-venue market. Designed to mimic real-world trading environments, the framework enables detailed testing of routing strategies, such as TWAP, using both synthetic and stochastic price data. It emphasizes latency, slippage, and execution cost, providing a robust foundation for strategy evaluation and improvement.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Simulation Design</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            The simulated market consists of three venues with prices based on a shared baseline trajectory (driven by Gaussian noise) with additional venue-specific noise to reflect realistic market discrepancies. Orders are generated randomly over time with varying sizes. A TWAP (Time-Weighted Average Price) SOR strategy is used for execution. Each order is split into ten parts to be executed at regular time intervals, and at each step, the venue with the lowest available price is selected.
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            To simulate latency, a delay is introduced between venue selection and execution. Executed trades are priced slightly later than the observed optimal price. This delay mimics slippage due to network or system lag, providing a more realistic performance benchmark.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Evaluation Metrics</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            The backtester computes three primary metrics for evaluating SOR performance:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
            <li><strong>Execution Cost:</strong> Measures how far execution prices deviate from a 5-period VWAP benchmark. Negative values indicate price improvement.</li>
            <li><strong>Slippage:</strong> Captures the price difference due to latency and timing mismatches between decision and execution.</li>
            <li><strong>Fill Rate:</strong> Not used in the current TWAP-only test but foundational for future extensions involving partial fills.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Results and Observations</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            The TWAP SOR was tested across 100 simulated runs. Each run used different order timings and price movements to introduce variance. The average execution cost was <strong>-5.57</strong> and the average slippage was <strong>-4.37</strong>. The negative execution cost indicates that the SOR routinely achieved better prices than the VWAP benchmark, but the slippage reveals performance degradation due to latency.
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            A graph was also included in the final visualization, plotting market prices and trade placements, helping to interpret routing decisions visually. Despite successful average performance, the system lacks more advanced market elements like iceberg orders, venue-specific latency, or volume dynamics, which could further stress-test strategy robustness.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Future Improvements</h2>
          <p className="text-gray-700 dark:text-gray-400">
            Several enhancements could elevate the backtester's realism and utility:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
            <li>Introduce diverse order types (e.g., iceberg, stop-loss) into the simulation.</li>
            <li>Model venue-specific characteristics such as differing latencies or liquidity profiles.</li>
            <li>Expand the execution strategy set to include VWAP, POV, and hybrid strategies.</li>
            <li>Use stochastic processes like Hawkes models to generate richer synthetic LOBs.</li>
            <li>Support partial fills and multi-leg orders to enable testing of more complex strategies.</li>
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
            href="https://github.com/NikhilGoli45/SOR-Backtester"
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

export default SOR;
