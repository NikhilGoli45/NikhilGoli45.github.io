import { useState } from "react";
import { checkPassword, storePassword } from "./api";

interface PasswordGateProps {
  onUnlock: () => void;
}

const PasswordGate = ({ onUnlock }: PasswordGateProps) => {
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [rejected, setRejected] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || checking) return;
    setChecking(true);
    setRejected(false);
    try {
      if (await checkPassword(password)) {
        storePassword(password);
        onUnlock();
      } else {
        setRejected(true);
      }
    } catch {
      setRejected(true);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6">
      <h1 className="font-display text-h2 uppercase text-[#2e2a22]">Darkroom</h1>
      <p className="font-hand mt-1 text-2xl text-[#6b6252]">keep the door closed, the film is sensitive</p>
      <form onSubmit={submit} className="mt-10 flex w-full max-w-xs flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          autoFocus
          className="border border-[#2e2a22]/40 bg-[#fffdf8] px-4 py-2.5 text-[#2e2a22] placeholder:text-[#6b6252]/60 focus:outline-none focus:ring-1 focus:ring-[#2e2a22]"
        />
        <button
          type="submit"
          disabled={checking || !password}
          className="border border-[#2e2a22] px-6 py-2.5 text-[#2e2a22] transition-colors hover:bg-[#2e2a22] hover:text-[#f7f3ea] disabled:opacity-50"
        >
          {checking ? "Checking…" : "Enter"}
        </button>
        {rejected && (
          <p className="font-hand text-xl text-[#a8503f]">that's not it — try again</p>
        )}
      </form>
    </div>
  );
};

export default PasswordGate;
