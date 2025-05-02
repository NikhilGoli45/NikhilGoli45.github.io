import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OS = () => {
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

        <h1 className="text-4xl font-bold mb-4">Operating System Kernel</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          A two-part operating system kernel written in C++, comprising a user-level thread library and a virtual memory pager. 
          This project explores core OS abstractions including context switching, concurrency control, address space management, 
          and efficient paging using simulated hardware.
        </p>

        {/* Thread Library */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Thread Library</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-2">
            The thread library supports cooperative and preemptive threading with fine-grained synchronization primitives. Each thread has its own stack and execution context, built from raw `ucontext_t` structures. Core features include:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-1">
            <li>FIFO ready queue and per-mutex wait queues</li>
            <li>Condition variables without spurious wakeups</li>
            <li>Safe context switching with `swapcontext`, `makecontext`, and `RAII`-based guards</li>
            <li>Support for multiple CPUs with inter-processor interrupts and a shared run queue</li>
            <li>Deterministic, testable scheduling order for correctness verification</li>
          </ul>
        </section>

        {/* Pager */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Virtual Memory Pager</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-2">
            The pager is responsible for managing each process’s virtual address space and handling memory faults. It uses a single-level page table per process and supports both swap-backed and file-backed memory. Highlights include:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-1">
            <li>Clock replacement algorithm with second-chance eviction</li>
            <li>Copy-on-write page sharing during `fork`</li>
            <li>File-backed page aliasing and zero-page pinning</li>
            <li>Crash consistency via carefully ordered disk writes</li>
            <li>Custom dirty/referenced bit tracking using induced faults</li>
          </ul>
        </section>

        {/* Design */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Design Philosophy</h2>
          <p className="text-gray-700 dark:text-gray-400">
            The kernel was built around the principle of deferring and avoiding work. All operations—whether locking, paging, or 
            synchronization—aim to reduce overhead while preserving correctness. State is carefully tracked to avoid redundant I/O, 
            minimize context switching, and ensure safety across concurrent interactions.
          </p>
        </section>

        {/* Tech Stack */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">C++</span>
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">ucontext</span>
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">RAII</span>
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">Custom Scheduler</span>
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">Page Table Management</span>
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">Clock Algorithm</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OS;
