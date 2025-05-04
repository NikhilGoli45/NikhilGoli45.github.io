import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SQL = () => {
  const navigate = useNavigate();
  const technologies = [
    "C++",
    "STL",
    "Custom Data Structures",
    "Command-Line Interface",
    "Indexing (Hash, BST)"
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

        <h1 className="text-4xl font-bold mb-4">SillyQL: Custom SQL Clone</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          <strong>SillyQL</strong> is a command-line based SQL clone built from scratch in C++. It supports a subset of SQL operations like CREATE, INSERT, DELETE, PRINT, and JOIN, with additional features like index generation using hash maps or BSTs.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
            <li><strong>CREATE:</strong> Define tables with custom column types (int, double, bool, string).</li>
            <li><strong>INSERT:</strong> Efficient row-wise data addition with support for reindexing.</li>
            <li><strong>DELETE:</strong> Conditional row deletion using logical filters and comparators.</li>
            <li><strong>PRINT:</strong> Output filtered or full views of tables based on user-specified columns and conditions.</li>
            <li><strong>JOIN:</strong> Perform basic inner joins between two tables on matching keys.</li>
            <li><strong>GENERATE:</strong> Construct hash or BST-based indexes to optimize PRINT and JOIN operations.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Technical Design</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            SillyQL uses a centralized parser loop to read user input and dispatch operations to corresponding table manipulation functions. Internally, data is stored as a vector of typed entries (with runtime polymorphism) and supports in-place filtering and logical evaluation. Indexing is dynamically generated and integrated into query performance paths.
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

export default SQL;
