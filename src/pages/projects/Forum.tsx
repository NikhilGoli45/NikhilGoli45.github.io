import ProjectPageWrapper from "@/components/ProjectPageWrapper";

const Forum = () => {
  const technologies = ["C++", "Custom Map Implementation", "CSV Parsing", "Naive Bayes"];

  return (
    <ProjectPageWrapper>
      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-6">Forum Post Categorizer</h1>
      <p className="text-lg text-muted-foreground mb-10">
        This project implements a Naive Bayes text classifier to predict forum post topics based on their content. The system reads and learns from a labeled training set of forum posts and then uses that data to categorize new, unseen posts. It was built in C++ with all key data structures—including a map and bitwise operations—implemented from scratch.
      </p>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Classifier Logic</h2>
        <p className="text-muted-foreground mb-4">
          The classifier processes each training post by parsing the label and its associated content. It calculates the log-prior probability for each category and builds a vocabulary from all words seen in the training data. For each word-label pair, it computes the log-likelihood using frequency counts.
        </p>
        <p className="text-muted-foreground">
          During testing, it predicts the label of each post by computing the sum of the log-prior and all associated log-likelihoods for words in the post. The label with the highest total score is chosen as the predicted category. Accuracy metrics are reported after all predictions.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Custom Data Structures</h2>
        <p className="text-muted-foreground mb-4">
          To deepen understanding of fundamental data structures, this project avoids using STL containers like <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">std::map</code> and instead implements a custom map structure built on top of a binary search tree. This map supports insertion, search, and frequency count tracking with efficient complexity.
        </p>
        <p className="text-muted-foreground">
          Bit manipulation and manual memory management were employed to optimize structure performance. Debugging tools and verbose output options are included to help analyze classifier decisions during evaluation.
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

export default Forum;
