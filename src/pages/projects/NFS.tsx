import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NFS = () => {
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

        <h1 className="text-4xl font-bold mb-4">Network File Server</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          A crash-consistent, multi-threaded file server built in C++ that supports concurrent remote client requests over TCP.
          The server implements a hierarchical file system with user ownership, permission enforcement, fine-grained locking,
          and strict correctness guarantees.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-700 dark:text-gray-400">
            This project implements a network file server that manages an in-memory file system backed by a simulated disk.
            Clients connect via TCP and interact using a defined set of commands: <code>FS_CREATE</code>, <code>FS_DELETE</code>,
            <code>FS_READBLOCK</code>, and <code>FS_WRITEBLOCK</code>. Each client request is handled in its own thread, and
            concurrent operations on shared file system structures are synchronized with per-inode reader-writer locks.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">File System Semantics</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            The file system supports nested directories and uniquely-identified files accessed via absolute paths (e.g.,
            <code>/home/user/file.txt</code>). All files and directories are owned by the user that created them, except for the
            root directory (<code>/</code>), which is owned by all users. Only the owner of a file or directory may read, modify, or delete it.
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            The underlying structure follows a traditional inode + directory-entry model:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mt-2 space-y-1">
            <li><code>fs_inode</code>: Tracks file type, owner, size, and data block indices</li>
            <li><code>fs_direntry</code>: Maps a name to an inode block within a directory</li>
            <li>Block 0 is reserved for the root inode</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Concurrency and Locking</h2>
          <p className="text-gray-700 dark:text-gray-400">
            The server uses a thread-per-request model. All file system operations are synchronized using a vector of
            <code>boost::shared_mutex</code> instances — one per inode block. Read-only operations acquire shared locks,
            while modifying operations acquire exclusive locks. Locks are handed off during path traversal to maximize concurrency
            while maintaining safety.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Crash Consistency</h2>
          <p className="text-gray-700 dark:text-gray-400">
            The server enforces strict write ordering to maintain file system consistency under crashes. For example, when creating
            a new file, the inode is written to disk before the parent directory entry that points to it. This ensures that
            directories never reference uninitialized or garbage blocks, even in the event of an unexpected shutdown.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Network Protocol</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-2">
            The file server communicates with clients via a custom protocol over TCP. Each request is a null-terminated C string,
            optionally followed by a data payload (e.g., for <code>FS_WRITEBLOCK</code>).
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-1">
            <li><code>FS_CREATE &lt;username&gt; &lt;path&gt; &lt;f|d&gt;</code></li>
            <li><code>FS_DELETE &lt;username&gt; &lt;path&gt;</code></li>
            <li><code>FS_READBLOCK &lt;username&gt; &lt;path&gt; &lt;block&gt;</code></li>
            <li><code>FS_WRITEBLOCK &lt;username&gt; &lt;path&gt; &lt;block&gt;\0&lt;data&gt;</code></li>
          </ul>
          <p className="text-gray-700 dark:text-gray-400 mt-2">
            The server validates all input carefully, rejecting malformed or unauthorized requests without responding.
            This protects against malicious clients and maintains system integrity.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Directory Management</h2>
          <p className="text-gray-700 dark:text-gray-400">
            Directories store arrays of <code>fs_direntry</code> structs. When a file is deleted, its entry is marked as unused.
            If an entire directory block becomes unused, it is removed from the inode's block array and returned to the free block pool.
            The server ensures that only empty directories can be deleted.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">C++</span>
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">POSIX Sockets</span>
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">Boost Threads</span>
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">RAII Synchronization</span>
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full">Custom File System</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NFS;
