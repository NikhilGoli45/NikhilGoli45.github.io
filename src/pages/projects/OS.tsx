import ProjectPageWrapper from "@/components/ProjectPageWrapper";

const OS = () => {
  return (
    <ProjectPageWrapper>
      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-6">Operating System Kernel</h1>
      <p className="text-lg text-muted-foreground mb-10">
        A two-part operating system kernel written in C++, comprising a user-level thread library and a virtual memory pager.
        This project explores core OS abstractions including context switching, concurrency control, address space management,
        and efficient paging using simulated hardware.
      </p>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Thread Library</h2>
        <p className="text-muted-foreground mb-4">
          The thread library supports cooperative and preemptive threading with fine-grained synchronization primitives. Each thread has its own stack and execution context, built from raw <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">ucontext_t</code> structures. Core features include:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>FIFO ready queue and per-mutex wait queues</li>
          <li>Condition variables without spurious wakeups</li>
          <li>Safe context switching with <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">swapcontext</code>, <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">makecontext</code>, and RAII-based guards</li>
          <li>Support for multiple CPUs with inter-processor interrupts and a shared run queue</li>
          <li>Deterministic, testable scheduling order for correctness verification</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Virtual Memory Pager</h2>
        <p className="text-muted-foreground mb-4">
          The pager is responsible for managing each process's virtual address space and handling memory faults. It uses a single-level page table per process and supports both swap-backed and file-backed memory. Highlights include:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Clock replacement algorithm with second-chance eviction</li>
          <li>Copy-on-write page sharing during <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">fork</code></li>
          <li>File-backed page aliasing and zero-page pinning</li>
          <li>Crash consistency via carefully ordered disk writes</li>
          <li>Custom dirty/referenced bit tracking using induced faults</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Design Philosophy</h2>
        <p className="text-muted-foreground">
          The kernel was built around the principle of deferring and avoiding work. All operations—whether locking, paging, or
          synchronization—aim to reduce overhead while preserving correctness. State is carefully tracked to avoid redundant I/O,
          minimize context switching, and ensure safety across concurrent interactions.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {["C++", "ucontext", "RAII", "Custom Scheduler", "Page Table Management", "Clock Algorithm"].map((tech) => (
            <span key={tech} className="caption border border-border px-2 py-0.5">{tech}</span>
          ))}
        </div>
      </section>
    </ProjectPageWrapper>
  );
};

export default OS;
