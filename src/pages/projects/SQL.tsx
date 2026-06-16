import ProjectPageWrapper from "@/components/ProjectPageWrapper";

const SQL = () => {
  const technologies = ["C++", "STL", "Custom Data Structures", "Command-Line Interface", "Indexing (Hash, BST)"];

  return (
    <ProjectPageWrapper>
      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-6">SillyQL: Custom SQL Clone</h1>
      <p className="text-lg text-muted-foreground mb-10">
        <strong>SillyQL</strong> is a command-line based SQL clone built from scratch in C++. It supports a subset of SQL operations like CREATE, INSERT, DELETE, PRINT, and JOIN, with additional features like index generation using hash maps or BSTs.
      </p>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li><strong>CREATE:</strong> Define tables with custom column types (int, double, bool, string).</li>
          <li><strong>INSERT:</strong> Efficient row-wise data addition with support for reindexing.</li>
          <li><strong>DELETE:</strong> Conditional row deletion using logical filters and comparators.</li>
          <li><strong>PRINT:</strong> Output filtered or full views of tables based on user-specified columns and conditions.</li>
          <li><strong>JOIN:</strong> Perform basic inner joins between two tables on matching keys.</li>
          <li><strong>GENERATE:</strong> Construct hash or BST-based indexes to optimize PRINT and JOIN operations.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Technical Design</h2>
        <p className="text-muted-foreground">
          SillyQL uses a centralized parser loop to read user input and dispatch operations to corresponding table manipulation functions. Internally, data is stored as a vector of typed entries (with runtime polymorphism) and supports in-place filtering and logical evaluation. Indexing is dynamically generated and integrated into query performance paths.
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

export default SQL;
