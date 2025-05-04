import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WagerWars = () => {
  const navigate = useNavigate();
  const technologies = [
    "Python",
    "Django",
    "TypeScript",
    "React",
    "Redis",
    "PostgreSQL",
    "AWS",
  ];

  const screenshots = [
    { src: "/wager-wars/how-to-play.png", alt: "How to Play Screen" },
    { src: "/wager-wars/example-question.png", alt: "Scenario Example Screen" },
    { src: "/wager-wars/running-simulation.png", alt: "Running Simulation Screen" },
    { src: "/wager-wars/landing-page.png", alt: "Player Landing Page" },
    { src: "/wager-wars/betting-form.png", alt: "Player Betting Screen" },
    { src: "/wager-wars/comp.png", alt: "Wager Wars being played at the UMich Trading Competition" }
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

        <h1 className="text-4xl font-bold mb-4">Wager Wars</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          <strong>Wager Wars</strong> is a probabilistic betting game built for the
          UMich Trading Competition and played by over 100 participants. Rather than
          simulating a financial market, Wager Wars challenges players to make
          calculated bets on the outcome of randomized scenarios such as:
        </p>
        <blockquote className="mt-4 p-4 border-l-4 border-blue-500 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100">
          “The sum of rolling 4 dice is greater than 20.”
        </blockquote>

        <section className="mt-12 mb-10">
          <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
            <li>Players are presented with randomized probabilistic scenarios.</li>
            <li>Each player bets tokens on whether the event will succeed or fail.</li>
            <li>Players can see all bets placed by others before a final round of betting.</li>
            <li>Successful bets are rewarded based on rarity-based multipliers.</li>
            <li>The team with the largest average stack at the end wins.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Technical Highlights</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
            <li>
              <strong>Full-stack architecture:</strong> Django (Python) backend and React + TypeScript frontend.
            </li>
            <li>
              <strong>Real-time state sharing:</strong> Players received immediate feedback and could view team decisions in real time.
            </li>
            <li>
              <strong>Hosted on AWS:</strong> Redis for caching and PostgreSQL for persistent game state.
            </li>
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
            href="https://github.com/tradersatmichigan/wager-wars"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition-colors"
          >
            View on GitHub
          </a>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {screenshots.map(({ src, alt }) => (
              <div key={src} className="flex flex-col items-center">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={src}
                    alt={alt}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                  {alt}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WagerWars;
