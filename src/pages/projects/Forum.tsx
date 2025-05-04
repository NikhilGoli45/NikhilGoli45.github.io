import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Forum = () => {
  const navigate = useNavigate();
  const technologies = ["C++", "Custom Map Implementation", "CSV Parsing", "Naive Bayes"];

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

        <h1 className="text-4xl font-bold mb-4">Forum Post Categorizer</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          This project implements a Naive Bayes text classifier to predict forum post topics based on their content. The system reads and learns from a labeled training set of forum posts and then uses that data to categorize new, unseen posts. It was built in C++ with all key data structures—including a map and bitwise operations—implemented from scratch.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Classifier Logic</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            The classifier processes each training post by parsing the label and its associated content. It calculates the log-prior probability for each category and builds a vocabulary from all words seen in the training data. For each word-label pair, it computes the log-likelihood using frequency counts.
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            During testing, it predicts the label of each post by computing the sum of the log-prior and all associated log-likelihoods for words in the post. The label with the highest total score is chosen as the predicted category. Accuracy metrics are reported after all predictions.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Custom Data Structures</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            To deepen understanding of fundamental data structures, this project avoids using STL containers like <code>std::map</code> and instead implements a custom map structure built on top of a binary search tree. This map supports insertion, search, and frequency count tracking with efficient complexity.
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            Bit manipulation and manual memory management were employed to optimize structure performance. Debugging tools and verbose output options are included to help analyze classifier decisions during evaluation.
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

export default Forum;
