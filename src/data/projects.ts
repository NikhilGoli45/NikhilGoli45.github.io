
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
    id: "NFS",
    title: "Network File Server",
    description: "A network file server capable of servicing concurrent Create, Delete, Read, and Write requests from multiple remote users.",
    image: "placeholder",
    technologies: ["C++", "Boost"],
    demoLink: "",
    repoLink: "",
    challenge: "Creating a seamless shopping experience while ensuring secure transactions and efficient product management.",
    solution: "Implemented a React frontend with Node.js backend, using MongoDB for data storage and Stripe for payment processing.",
    features: [
      "User authentication and profile management",
      "Product catalog with search and filtering",
      "Shopping cart with persistent storage",
      "Secure checkout with Stripe integration",
      "Order history and tracking"
    ]
  },
  {
    id: "WagerWars",
    title: "Wager Wars",
    description: "A market making and risk management game built for the Umich Trading Competition and played by over 100 participants.",
    image: "placeholder",
    technologies: ["Python", "Django", "TypeScript", "React", "Redis", "PostgreSQL", "AWS"],
    demoLink: "",
    repoLink: "https://github.com/tradersatmichigan/wager-wars",
    challenge: "Creating a seamless shopping experience while ensuring secure transactions and efficient product management.",
    solution: "Implemented a React frontend with Node.js backend, using MongoDB for data storage and Stripe for payment processing.",
    features: [
      "User authentication and profile management",
      "Product catalog with search and filtering",
      "Shopping cart with persistent storage",
      "Secure checkout with Stripe integration",
      "Order history and tracking"
    ]
  },
  {
    id: "OS",
    title: "Operating System Kernel",
    description: "A custom OS kernel inspired by Linux, implementing a lightweight thread scheduler and virtual memory pager for context switching and page fault handling with multi-core CPU support.",
    image: "placeholder",
    technologies: ["C++"],
    demoLink: "",
    repoLink: "",
    challenge: "Designing an intuitive interface that supports complex task relationships and team collaboration workflows.",
    solution: "Built a React application with Redux for state management and Firebase for real-time data synchronization across team members.",
    features: [
      "Task creation and organization with drag-and-drop functionality",
      "Deadline management with calendar integration",
      "Team collaboration with real-time updates",
      "Progress tracking with visual dashboards",
      "Notification system for task updates"
    ]
  },
  {
    id: "DogClassifier",
    title: "Dog Breed Classifier",
    description: "A collection of ML models trained to classify dogs based on their breeds. Models employ CNNs, Vision Transformers, and Transfer Learning.",
    image: "placeholder",
    technologies: ["Python", "NumPy", "Pandas", "PyTorch", "Conda"],
    demoLink: "",
    repoLink: "https://github.com/NikhilGoli45/Dog-Breed-Classifier",
    challenge: "Processing and visualizing complex weather data in a user-friendly format while maintaining performance.",
    solution: "Developed a JavaScript application that leverages OpenWeatherAPI for data and Chart.js for visualization, with responsive design for all devices.",
    features: [
      "Real-time weather updates with auto-refresh",
      "Location-based forecasts with geolocation",
      "Historical weather data visualization",
      "5-day forecast with hourly breakdowns",
      "Weather alerts and notifications"
    ]
  },
  {
    id: "SOR",
    title: "SOR Backtester",
    description: "A backtester to test different Smart Order Routing (SOR) strategies, complete with synthetic order book generation and multiple venue simulation.",
    image: "placeholder",
    technologies: ["Python", "NumPy", "Pandas", "MatPlotLib"],
    demoLink: "",
    repoLink: "https://github.com/NikhilGoli45/SOR-Backtester",
    challenge: "Processing and visualizing complex weather data in a user-friendly format while maintaining performance.",
    solution: "Developed a JavaScript application that leverages OpenWeatherAPI for data and Chart.js for visualization, with responsive design for all devices.",
    features: [
      "Real-time weather updates with auto-refresh",
      "Location-based forecasts with geolocation",
      "Historical weather data visualization",
      "5-day forecast with hourly breakdowns",
      "Weather alerts and notifications"
    ]
  },
  {
    id: "Zinger's",
    title: "Zinger's (ETF Trading Game)",
    description: "A fully-functional closed trading platform developed for the UMich Trading Competition.",
    image: "placeholder",
    technologies: ["C++", "uWebSockets", "TypeScript", "React", "PostgreSQL", "AWS"],
    demoLink: "",
    repoLink: "",
    challenge: "Creating a visually appealing yet professional portfolio that effectively showcases my work and skills.",
    solution: "Designed and implemented a responsive React application with TypeScript and Tailwind CSS, focusing on clean code and smooth animations.",
    features: [
      "Responsive design for all device sizes",
      "Light and dark theme support",
      "Project showcase with detailed case studies",
      "Interactive skills visualization",
      "Contact form with email integration"
    ]
  },
  {
    id: "IMC",
    title: "IMC Prosperity",
    description: "Placed 215th out over 9000 global participants (Top 2%) in both algorithmic and manual trading simulations.",
    image: "placeholder",
    technologies: ["Python", "NumPy"],
    demoLink: "",
    repoLink: "https://github.com/NikhilGoli45/LootLake",
    challenge: "Creating a visually appealing yet professional portfolio that effectively showcases my work and skills.",
    solution: "Designed and implemented a responsive React application with TypeScript and Tailwind CSS, focusing on clean code and smooth animations.",
    features: [
      "Responsive design for all device sizes",
      "Light and dark theme support",
      "Project showcase with detailed case studies",
      "Interactive skills visualization",
      "Contact form with email integration"
    ]
  },
  {
    id: "SQL",
    title: "SQL Clone",
    description: "A lightweight in-memory SQL clone that supports basic table creation, insertion, deletion, printing, indexing, and joins using custom commands in a command-line shell.",
    image: "placeholder",
    technologies: ["C++"],
    demoLink: "",
    repoLink: "",
    challenge: "Creating a visually appealing yet professional portfolio that effectively showcases my work and skills.",
    solution: "Designed and implemented a responsive React application with TypeScript and Tailwind CSS, focusing on clean code and smooth animations.",
    features: [
      "Responsive design for all device sizes",
      "Light and dark theme support",
      "Project showcase with detailed case studies",
      "Interactive skills visualization",
      "Contact form with email integration"
    ]
  },
  {
    id: "Forum",
    title: "Forum Post Categorizer",
    description: "A Naive Bayes text classifier that leverages NLP to label Piazza posts with a topic based on the words present in the text.",
    image: "placeholder",
    technologies: ["C++", "NLP"],
    demoLink: "",
    repoLink: "",
    challenge: "Creating a visually appealing yet professional portfolio that effectively showcases my work and skills.",
    solution: "Designed and implemented a responsive React application with TypeScript and Tailwind CSS, focusing on clean code and smooth animations.",
    features: [
      "Responsive design for all device sizes",
      "Light and dark theme support",
      "Project showcase with detailed case studies",
      "Interactive skills visualization",
      "Contact form with email integration"
    ]
  }
];
