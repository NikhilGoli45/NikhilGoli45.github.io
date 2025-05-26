import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NA = () => {
  const navigate = useNavigate();

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

        <h1 className="text-4xl font-bold mb-4">Networking Automation Platform</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            A full-stack platform that automates personalized email outreach using OpenAI, GCP, and custom scheduling to help users stay connected without the hassle of manual follow-ups.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Background</h2>
          <p className="text-gray-700 dark:text-gray-400">
            Last summer, I was determined to expand my professional network—but keeping track of who I'd emailed, who responded,
            and when to follow up quickly became overwhelming. The friction slowed me down and diluted my efforts. This year, I decided to
            solve that problem for good. I built a system that allows me to focus purely on finding interesting people and having real
            conversations, while everything else is handled by the platform.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">What It Does</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            The app streamlines professional networking by managing outreach emails and intelligently scheduling personalized follow-ups.
            Users send an initial email to a contact, and the system handles the rest, from analyzing message tone to generating context-aware
            follow-ups, detecting replies, and spacing emails across an optimal cadence. Responses are tracked automatically and follow-up emails are
            paused as needed to maintain professionalism and avoid noise.
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            A clean dashboard lets users track conversations, add or remove contacts, and view the outreach timeline. It's built to feel effortless,
            no inbox digging, no spreadsheets, just smart automation working in the background.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-1">
            <li>Initial outreach emails are crafted and sent manually through the UI.</li>
            <li>The backend parses and stores the tone, style, and content of each message.</li>
            <li>Follow-ups are generated using OpenAI's API to match the original email's tone, style, and content.</li>
            <li>A scheduler dispatches follow-ups on Mondays through Wednesdays, avoiding weekends and spamming.</li>
            <li>Gmail API on GCP with OAuth2 integration is used to send and track emails securely.</li>
            <li>Reply detection is built into the backend to suppress future follow-ups if the contact has responded.</li>
          </ul>
        </section>

        <section className="mb-5">
            <h2 className="text-2xl font-semibold mb-2">Dashboard Overview</h2>
            <p className="text-gray-700 dark:text-gray-400 mb-4">
                The platform includes a clean, user-friendly dashboard for managing contacts, viewing outreach history, and manually running the follow-up scheduler. Each contact entry displays email status, original outreach, and how many follow-ups have been sent—so you always have visibility into your networking efforts.
            </p>
            <div className="mt-6 flex justify-center">
                <div className="flex flex-col items-center w-full md:w-[36rem]">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                    <img
                    src="/networking/dashboard.png"
                    alt="Networking Automation dashboard screenshot"
                    className="absolute h-full w-full object-cover"
                    />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                    Screenshot of the contact management dashboard showing original emails, follow-up counts, and statuses.
                </p>
                </div>
            </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Technical Architecture</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-2">
            The system is composed of a modern React frontend (built with Next.js, Tailwind, and Radix UI), a Node.js/Express backend,
            and a PostgreSQL database hosted on Supabase. Authentication is handled with JWT, and email transmission relies on GCP OAuth2.
            A GitHub Actions pipeline triggers a secure scheduler daily to ensure emails go out reliably.
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            Each component is modular and can be extended to support other providers, contact sources, or timing logic. Security and privacy
            were core considerations throughout: sensitive credentials are managed securely, and reply analysis is done without reading
            email content beyond headers and threading info.
          </p>
        </section>

        <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
                {/* Language */}
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">TypeScript</span>

                {/* Frontend */}
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">Next.js</span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">React</span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">Tailwind CSS</span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">Radix UI</span>

                {/* Backend */}
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">Node.js</span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">Express.js</span>

                {/* Database */}
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">Supabase (PostgreSQL)</span>

                {/* APIs / Auth */}
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">OpenAI API</span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">GCP (OAuth2)</span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">JWT Auth</span>

                {/* DevOps / Infra */}
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">GitHub Actions</span>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NA;
