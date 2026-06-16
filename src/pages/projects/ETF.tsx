import ProjectPageWrapper from "@/components/ProjectPageWrapper";

const ETF = () => {
  const technologies = ["C++", "uWebSockets", "TypeScript", "React", "PostgreSQL", "AWS"];

  return (
    <ProjectPageWrapper>
      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-6">Zingers: Trading Competition Game</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Zingers is a real-time trading competition platform designed to simulate the dynamics of market microstructure, price discovery, and arbitrage. Players connect to a live backend via WebSockets and place orders in a multi-security environment where the goal is to generate profit through intelligent trading—particularly by identifying and exploiting arbitrage between a set of securities and a composite ETF.
      </p>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Game Design and Objective</h2>
        <p className="text-muted-foreground mb-4">
          The platform simulates a synthetic financial market consisting of four individual securities and a composite ETF. The ETF's value deliberately exceeds the net value of its underlying assets, creating arbitrage opportunities. Traders are tasked with buying low and selling high, exploiting market inefficiencies. Each player is ranked based on the profit and loss (PnL) accumulated over the trading session.
        </p>
        <p className="text-muted-foreground mb-8">
          Players interact through a web frontend, place orders via limit or market types, and receive immediate execution feedback. The game's time-bound structure and real-time data feed make for a highly competitive and educational trading experience.
        </p>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex flex-col items-center w-full md:w-1/2">
            <div className="relative aspect-video w-full border border-border overflow-hidden">
              <img
                src="/zingers/zingers.png"
                alt="Zingers trading interface screenshot"
                className="absolute h-full w-full object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Screenshot of the Zingers trading interface showing the order books, player portfolio, and leaderboard.
            </p>
          </div>
          <div className="flex flex-col items-center w-full md:w-1/2">
            <div className="relative aspect-video w-full border border-border overflow-hidden">
              <img
                src="/zingers/comp.png"
                alt="Zingers being played live at a trading competition"
                className="absolute h-full w-full object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Zingers being played live during a trading competition event, projected in real-time to participants.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Matching Engine Architecture</h2>
        <p className="text-muted-foreground mb-4">
          The core of Zingers lies in its multithreaded matching engine. Each security maintains its own order book and is managed by a dedicated thread. This thread continuously matches incoming limit and market orders based on price-time priority. Orders are matched atomically to ensure execution consistency, and all matched trades are recorded with precise timestamps.
        </p>
        <p className="text-muted-foreground">
          To avoid concurrency issues, each order book is protected by fine-grained mutexes. The engine supports high-frequency message processing and can simulate burst trading scenarios without locking up. Executions are processed and sent back to clients asynchronously to maintain responsiveness.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">WebSocket Networking</h2>
        <p className="text-muted-foreground mb-4">
          Real-time interaction is achieved using WebSocket connections between each client and the backend server. The backend continuously listens for incoming order messages, parses them safely, and routes them to the correct order book.
        </p>
        <p className="text-muted-foreground">
          Once an order is processed—either matched or added to the book—the server broadcasts state updates to all connected clients. These updates include trade confirmations, order book snapshots, and PnL changes. The architecture ensures low latency and high throughput, essential for maintaining the fast-paced nature of the competition.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="caption border border-border px-2 py-0.5">{tech}</span>
          ))}
        </div>
      </section>
    </ProjectPageWrapper>
  );
};

export default ETF;
