import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ETF = () => {
  const navigate = useNavigate();
  const technologies = [
    "C++",
    "uWebSockets",
    "TypeScript",
    "React",
    "PostgreSQL",
    "AWS"
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

        <h1 className="text-4xl font-bold mb-4">Zingers: Trading Competition Game</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Zingers is a real-time trading competition platform designed to simulate the dynamics of market microstructure, price discovery, and arbitrage. Players connect to a live backend via WebSockets and place orders in a multi-security environment where the goal is to generate profit through intelligent trading—particularly by identifying and exploiting arbitrage between a set of securities and a composite ETF.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Game Design and Objective</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            The platform simulates a synthetic financial market consisting of four individual securities and a composite ETF. The ETF's value deliberately exceeds the net value of its underlying assets, creating arbitrage opportunities. Traders are tasked with buying low and selling high, exploiting market inefficiencies. Each player is ranked based on the profit and loss (PnL) accumulated over the trading session.
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            Players interact through a web frontend, place orders via limit or market types, and receive immediate execution feedback. The game's time-bound structure and real-time data feed make for a highly competitive and educational trading experience.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex flex-col items-center w-full md:w-[28rem]">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/zingers/zingers.png"
                    alt="Zingers trading interface screenshot"
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                  Screenshot of the Zingers trading interface showing the order books, player portfolio, and leaderboard.
                </p>
              </div>
              <div className="flex flex-col items-center w-full md:w-[28rem]">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/zingers/_DSC1655.JPG"
                    alt="Zingers being played live at a trading competition"
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                  Zingers being played live during a trading competition event, projected in real-time to participants.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Matching Engine Architecture</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            The core of Zingers lies in its multithreaded matching engine. Each security maintains its own order book and is managed by a dedicated thread. This thread continuously matches incoming limit and market orders based on price-time priority. Orders are matched atomically to ensure execution consistency, and all matched trades are recorded with precise timestamps.
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            To avoid concurrency issues, each order book is protected by fine-grained mutexes. The engine supports high-frequency message processing and can simulate burst trading scenarios without locking up. Executions are processed and sent back to clients asynchronously to maintain responsiveness.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">WebSocket Networking</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            Real-time interaction is achieved using WebSocket connections between each client and the backend server. The backend continuously listens for incoming order messages, parses them safely, and routes them to the correct order book.
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            Once an order is processed—either matched or added to the book—the server broadcasts state updates to all connected clients. These updates include trade confirmations, order book snapshots, and PnL changes. The architecture ensures low latency and high throughput, essential for maintaining the fast-paced nature of the competition.
          </p>
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
      </main>

      <Footer />
    </div>
  );
};

export default ETF;
