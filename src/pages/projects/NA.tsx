import ProjectPageWrapper from "@/components/ProjectPageWrapper";

const NA = () => {
  return (
    <ProjectPageWrapper>
      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-6">Networking Automation Platform</h1>
      <p className="text-lg text-muted-foreground mb-10">
        A full-stack platform that automates personalized email outreach using OpenAI, GCP, and custom scheduling to help users stay connected without the hassle of manual follow-ups.
      </p>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Background</h2>
        <p className="text-muted-foreground">
          Last summer, I was determined to expand my professional network, but keeping track of who I'd emailed, who responded,
          and when to follow up quickly became overwhelming. The friction slowed me down and diluted my efforts. This year, I decided to
          solve that problem for good. I built a system that allows me to focus purely on finding interesting people and having real
          conversations, while everything else is handled by the platform.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">What It Does</h2>
        <p className="text-muted-foreground mb-4">
          The app streamlines professional networking by managing outreach emails and intelligently scheduling personalized follow-ups.
          Users send an initial email to a contact, and the system handles the rest, from analyzing message tone to generating context-aware
          follow-ups, detecting replies, and spacing emails across an optimal cadence. Responses are tracked automatically and follow-up emails are
          paused as needed to maintain professionalism and avoid noise.
        </p>
        <p className="text-muted-foreground">
          A clean dashboard lets users track conversations, add or remove contacts, and view the outreach timeline. It's built to feel effortless,
          no inbox digging, no spreadsheets, just smart automation working in the background.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">How It Works</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Initial outreach emails are crafted and sent manually through the UI.</li>
          <li>The backend parses and stores the tone, style, and content of each message.</li>
          <li>Follow-ups are generated using OpenAI's API to match the original email's tone, style, and content.</li>
          <li>A scheduler dispatches follow-ups on Mondays through Wednesdays, avoiding weekends and spamming.</li>
          <li>Gmail API on GCP with OAuth2 integration is used to send and track emails securely.</li>
          <li>Reply detection is built into the backend to suppress future follow-ups if the contact has responded.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Dashboard Overview</h2>
        <p className="text-muted-foreground mb-6">
          The platform includes a clean, user-friendly dashboard for managing contacts, viewing outreach history, and manually running the follow-up scheduler. Each contact entry displays email status, original outreach, and how many follow-ups have been sent providing visibility into your networking efforts.
        </p>
        <div className="flex justify-center">
          <div className="flex flex-col items-center w-full md:w-[36rem]">
            <div className="relative aspect-video w-full border border-border overflow-hidden">
              <img
                src="/networking/dashboard.png"
                alt="Networking Automation dashboard screenshot"
                className="absolute h-full w-full object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Screenshot of the contact management dashboard showing original emails, follow-up counts, and statuses.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Technical Architecture</h2>
        <p className="text-muted-foreground mb-4">
          The system is composed of a modern React frontend (built with Next.js, Tailwind, and Radix UI), a Node.js/Express backend,
          and a PostgreSQL database hosted on Supabase. Authentication is handled with JWT, and email transmission relies on GCP OAuth2.
          A GitHub Actions pipeline triggers a secure scheduler daily to ensure emails go out reliably.
        </p>
        <p className="text-muted-foreground">
          Each component is modular and can be extended to support other providers, contact sources, or timing logic. Security and privacy
          were core considerations throughout: sensitive credentials are managed securely, and reply analysis is done without reading
          email content beyond headers and threading info.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "JavaScript (Backend)", "TypeScript (Frontend)",
            "Next.js", "React", "Tailwind CSS", "Radix UI",
            "Node.js", "Express.js",
            "Supabase (PostgreSQL)",
            "OpenAI API", "GCP (OAuth2)", "JWT Auth",
            "GitHub Actions",
          ].map((tech) => (
            <span key={tech} className="caption border border-border px-2 py-0.5">{tech}</span>
          ))}
        </div>
      </section>
    </ProjectPageWrapper>
  );
};

export default NA;
