import ProjectPageWrapper from "@/components/ProjectPageWrapper";

const NFS = () => {
  return (
    <ProjectPageWrapper>
      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-6">Network File Server</h1>
      <p className="text-lg text-muted-foreground mb-10">
        A crash-consistent, multi-threaded file server built in C++ that supports concurrent remote client requests over TCP.
        The server implements a hierarchical file system with user ownership, permission enforcement, fine-grained locking,
        and strict correctness guarantees.
      </p>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Overview</h2>
        <p className="text-muted-foreground">
          This project implements a network file server that manages an in-memory file system backed by a simulated disk.
          Clients connect via TCP and interact using a defined set of commands: <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">FS_CREATE</code>, <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">FS_DELETE</code>,{" "}
          <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">FS_READBLOCK</code>, and <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">FS_WRITEBLOCK</code>. Each client request is handled in its own thread, and
          concurrent operations on shared file system structures are synchronized with per-inode reader-writer locks.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">File System Semantics</h2>
        <p className="text-muted-foreground mb-4">
          The file system supports nested directories and uniquely-identified files accessed via absolute paths (e.g.,{" "}
          <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">/home/user/file.txt</code>). All files and directories are owned by the user that created them, except for the
          root directory (<code className="font-mono text-sm bg-secondary px-1.5 py-0.5">/</code>), which is owned by all users. Only the owner of a file or directory may read, modify, or delete it.
        </p>
        <p className="text-muted-foreground">
          The underlying structure follows a traditional inode + directory-entry model:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
          <li><code className="font-mono text-sm bg-secondary px-1.5 py-0.5">fs_inode</code>: Tracks file type, owner, size, and data block indices</li>
          <li><code className="font-mono text-sm bg-secondary px-1.5 py-0.5">fs_direntry</code>: Maps a name to an inode block within a directory</li>
          <li>Block 0 is reserved for the root inode</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Concurrency and Locking</h2>
        <p className="text-muted-foreground">
          The server uses a thread-per-request model. All file system operations are synchronized using a vector
          of <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">boost::shared_mutex</code> instances — one per inode block. Read-only operations acquire shared locks,
          while modifying operations acquire exclusive locks. Locks are handed off during path traversal to maximize concurrency
          while maintaining safety.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Crash Consistency</h2>
        <p className="text-muted-foreground">
          The server enforces strict write ordering to maintain file system consistency under crashes. For example, when creating
          a new file, the inode is written to disk before the parent directory entry that points to it. This ensures that
          directories never reference uninitialized or garbage blocks, even in the event of an unexpected shutdown.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Network Protocol</h2>
        <p className="text-muted-foreground mb-4">
          The file server communicates with clients via a custom protocol over TCP. Each request is a null-terminated C string,
          optionally followed by a data payload (e.g., for <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">FS_WRITEBLOCK</code>).
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li><code className="font-mono text-sm bg-secondary px-1.5 py-0.5">FS_CREATE &lt;username&gt; &lt;path&gt; &lt;f|d&gt;</code></li>
          <li><code className="font-mono text-sm bg-secondary px-1.5 py-0.5">FS_DELETE &lt;username&gt; &lt;path&gt;</code></li>
          <li><code className="font-mono text-sm bg-secondary px-1.5 py-0.5">FS_READBLOCK &lt;username&gt; &lt;path&gt; &lt;block&gt;</code></li>
          <li><code className="font-mono text-sm bg-secondary px-1.5 py-0.5">FS_WRITEBLOCK &lt;username&gt; &lt;path&gt; &lt;block&gt;\0&lt;data&gt;</code></li>
        </ul>
        <p className="text-muted-foreground mt-4">
          The server validates all input carefully, rejecting malformed or unauthorized requests without responding.
          This protects against malicious clients and maintains system integrity.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Directory Management</h2>
        <p className="text-muted-foreground">
          Directories store arrays of <code className="font-mono text-sm bg-secondary px-1.5 py-0.5">fs_direntry</code> structs. When a file is deleted, its entry is marked as unused.
          If an entire directory block becomes unused, it is removed from the inode's block array and returned to the free block pool.
          The server ensures that only empty directories can be deleted.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl border-t border-border pt-8 mb-4">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {["C++", "POSIX Sockets", "Boost Threads", "RAII Synchronization", "Custom File System"].map((tech) => (
            <span key={tech} className="caption border border-border px-2 py-0.5">{tech}</span>
          ))}
        </div>
      </section>
    </ProjectPageWrapper>
  );
};

export default NFS;
