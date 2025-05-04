import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DogClassifier = () => {
  const navigate = useNavigate();
  const technologies = [
    "Python",
    "PyTorch",
    "CNN",
    "Transfer Learning",
    "Vision Transformers",
    "Matplotlib",
    "NumPy",
    "Pandas"
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

        <h1 className="text-4xl font-bold mb-4">Dog Breed Classifier</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          A deep learning system trained to distinguish Golden Retrievers from Collies using a dataset of over 12,000 images across 10 breeds.
          This project explores image classification with Convolutional Neural Networks (CNNs), Transfer Learning, and Vision Transformers (ViT).
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
            <li>Standardized RGB image channels using training-set means (R: 123.8, G: 118.3, B: 94.4) and standard deviations.</li>
            <li>Trained CNN with ~40K parameters; best model (8 filters) achieved AUROC of 0.9753 on validation, 0.7488 on test set.</li>
            <li>Applied transfer learning from an 8-class breed classifier; freezing all convolutional layers improved test AUROC to 0.8044.</li>
            <li>Explored Vision Transformers with 7.4K parameters; although validation AUROC reached 0.9646, test AUROC was only 0.556.</li>
            <li>Final model was a hybrid CNN + ViT with 433K parameters, pre-trained on source task and fine-tuned on final task.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Technical Highlights</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-2">
            <li>Custom CNN: 3 convolutional layers, ReLU activations, max pooling, fully connected classification.</li>
            <li>Transfer learning improved performance: best AUROC on test set rose to 0.8044 (from 0.7488) by freezing layers.</li>
            <li>ViT with 2 transformer blocks and patch embeddings underperformed due to lower capacity (only 7.4K params).</li>
            <li>Hybrid model: CNN frontend + Transformer backend yielded best performance with test AUROC of 0.7528.</li>
            <li>Early stopping criteria adapted to prevent overfitting; model halted if test AUROC declined for 10 epochs.</li>
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
            href="https://github.com/NikhilGoli45/Dog-Breed-Classifier"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition-colors"
          >
            View on GitHub
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DogClassifier;
