import ProjectPageWrapper from "@/components/ProjectPageWrapper";

const WagerWars = () => {
  const technologies = ["Python", "Django", "TypeScript", "React", "Redis", "PostgreSQL", "AWS"];

  const screenshots = [
    { src: "/wager-wars/how-to-play.png", alt: "How to Play Screen" },
    { src: "/wager-wars/example-question.png", alt: "Scenario Example Screen" },
    { src: "/wager-wars/running-simulation.png", alt: "Running Simulation Screen" },
    { src: "/wager-wars/landing-page.png", alt: "Player Landing Page" },
    { src: "/wager-wars/betting-form.png", alt: "Player Betting Screen" },
    { src: "/wager-wars/comp.png", alt: "Wager Wars being played at the UMich Trading Competition" },
  ];

  return (
    <ProjectPageWrapper>
      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-6">Wager Wars</h1>
      <p className="text-lg text-muted-foreground mb-4">
        <strong>Wager Wars</strong> is a probabilistic betting game built for the UMich Trading Competition and played by over 100 participants. Rather than
        simulating a financial market, Wager Wars challenges players to make calculated bets on the outcome of randomized scenarios such as:
      </p>
      <blockquote className="border-l border-border pl-4 py-2 text-muted-foreground italic mb-10">
        "The sum of rolling 4 dice is greater than 20."
      </blockquote>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">How It Works</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Players are placed into teams and presented with randomized probabilistic scenarios.</li>
          <li>Each player bets virtual money on whether the event will succeed or fail.</li>
          <li>Players can see all bets placed by others before a final round of betting.</li>
          <li>Successful bets are rewarded based on rarity-based multipliers.</li>
          <li>The team with the largest average stack at the end wins.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Technical Highlights</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li><strong>Full-stack architecture:</strong> Django (Python) backend and React + TypeScript frontend.</li>
          <li><strong>Real-time state sharing:</strong> Players received immediate feedback and could view team decisions in real time.</li>
          <li><strong>Hosted on AWS:</strong> Redis for caching and PostgreSQL for persistent game state.</li>
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
          href="https://github.com/tradersatmichigan/wager-wars"
          target="_blank"
          rel="noopener noreferrer"
          className="caption uppercase tracking-widest border border-border px-4 py-2 hover:bg-secondary transition-colors inline-flex items-center gap-2"
        >
          GitHub →
        </a>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {screenshots.map(({ src, alt }) => (
            <div key={src} className="flex flex-col items-center">
              <div className="relative aspect-video w-full border border-border overflow-hidden">
                <img src={src} alt={alt} className="absolute h-full w-full object-cover" />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">{alt}</p>
            </div>
          ))}
        </div>
      </section>
    </ProjectPageWrapper>
  );
};

export default WagerWars;
