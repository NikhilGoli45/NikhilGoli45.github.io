
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  repoLink: string;
  challenge?: string;
  solution?: string;
  features?: string[];
}

export const projects: Project[] = [
  {
    id: "NA",
    title: "Networking Automated",
    description: "A full-stack platform that automates personalized email outreach using OpenAI, Gmail API, and custom scheduling to help users stay connected without the hassle of manual follow-ups.",
    image: "placeholder",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "OpenAI API", "GCP"],
    demoLink: "",
    repoLink: "https://github.com/NikhilGoli45/networking-automated",
  },
  {
    id: "NFS",
    title: "Network File Server",
    description: "A network file server capable of servicing concurrent Create, Delete, Read, and Write requests from multiple remote users.",
    image: "placeholder",
    technologies: ["C++", "Boost"],
    demoLink: "",
    repoLink: "",
  },
  {
    id: "WagerWars",
    title: "Wager Wars",
    description: "A market making and risk management game built for the Umich Trading Competition and played by over 100 participants.",
    image: "placeholder",
    technologies: ["Python", "Django", "TypeScript", "React", "Redis", "PostgreSQL", "AWS"],
    demoLink: "",
    repoLink: "https://github.com/tradersatmichigan/wager-wars",
  },
  {
    id: "OS",
    title: "Operating System Kernel",
    description: "A custom OS kernel inspired by Linux, implementing a lightweight thread scheduler and virtual memory pager for context switching and page fault handling with multi-core CPU support.",
    image: "placeholder",
    technologies: ["C++"],
    demoLink: "",
    repoLink: "",
  },
  {
    id: "DogClassifier",
    title: "Dog Breed Classifier",
    description: "A collection of ML models trained to classify dogs based on their breeds. Models employ CNNs, Vision Transformers, and Transfer Learning.",
    image: "placeholder",
    technologies: ["Python", "NumPy", "Pandas", "PyTorch", "Conda"],
    demoLink: "",
    repoLink: "https://github.com/NikhilGoli45/Dog-Breed-Classifier",
  },
  {
    id: "SOR",
    title: "SOR Backtester",
    description: "A backtester to test different Smart Order Routing (SOR) strategies, complete with synthetic order book generation and multiple venue simulation.",
    image: "placeholder",
    technologies: ["Python", "NumPy", "Pandas", "MatPlotLib"],
    demoLink: "",
    repoLink: "https://github.com/NikhilGoli45/SOR-Backtester",
  },
  {
    id: "ETF",
    title: "Zinger's (ETF Trading Game)",
    description: "A fully-functional closed trading platform developed for the UMich Trading Competition.",
    image: "placeholder",
    technologies: ["C++", "uWebSockets", "TypeScript", "React", "PostgreSQL", "AWS"],
    demoLink: "",
    repoLink: "",
  },
  {
    id: "IMC",
    title: "IMC Prosperity",
    description: "Placed 215th out over 9000 global participants (Top 2.5%) in both algorithmic and manual trading simulations.",
    image: "placeholder",
    technologies: ["Python", "NumPy"],
    demoLink: "",
    repoLink: "https://github.com/NikhilGoli45/LootLake",
  },
  {
    id: "SQL",
    title: "SQL Clone",
    description: "A lightweight in-memory SQL clone that supports basic table creation, insertion, deletion, printing, indexing, and joins using custom commands in a command-line shell.",
    image: "placeholder",
    technologies: ["C++"],
    demoLink: "",
    repoLink: "",
  },
  {
    id: "Forum",
    title: "Forum Post Categorizer",
    description: "A Naive Bayes text classifier that leverages NLP to label Piazza posts with a topic based on the words present in the text.",
    image: "placeholder",
    technologies: ["C++", "NLP"],
    demoLink: "",
    repoLink: "",
  }
];
