import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoredPassword, checkPassword, clearPassword } from "./api";
import { useManifest } from "../useManifest";
import PasswordGate from "./PasswordGate";
import PinPicker, { type DraftPin } from "./PinPicker";
import Uploader from "./Uploader";
import ManageCollection from "./ManageCollection";
import "../photography.css";

const DarkroomPage = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [verifying, setVerifying] = useState(!!getStoredPassword());
  const { data } = useManifest();
  const [pin, setPin] = useState<DraftPin | null>(null);
  // The manifest copy of the selected pin (has photos), for collection edits.
  const selectedPin = pin ? data?.pins.find((p) => p.id === pin.id) : undefined;

  // Re-validate a stored password on load so a rotated secret re-locks the door.
  useEffect(() => {
    const stored = getStoredPassword();
    if (!stored) return;
    checkPassword(stored)
      .then((ok) => {
        if (ok) setUnlocked(true);
        else clearPassword();
      })
      .catch(() => {})
      .finally(() => setVerifying(false));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.backgroundColor;
    root.style.backgroundColor = "#f7f3ea";
    return () => {
      root.style.backgroundColor = prev || "#0A0A0A";
    };
  }, []);

  if (verifying) {
    return (
      <div className="photo-theme flex min-h-[100dvh] items-center justify-center">
        <p className="font-hand text-2xl text-[#6b6252]">checking the door…</p>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="photo-theme min-h-[100dvh]">
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      </div>
    );
  }

  return (
    <div className="photo-theme paper-grain relative min-h-[100dvh]">
      <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-10 md:px-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-h2 uppercase text-[#2e2a22]">Darkroom</h1>
            <p className="font-hand mt-1 text-2xl text-[#6b6252]">
              where new pins get developed
            </p>
          </div>
          <Link to="/photography" className="caption link-underline mt-2 text-[#2e2a22]">
            ← To the map
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-10">
          <section>
            <h2 className="caption mb-4 text-[#2e2a22]">1 — Where were these taken?</h2>
            <PinPicker pins={data?.pins ?? []} value={pin} onChange={setPin} />
          </section>

          <section>
            <h2 className="caption mb-4 text-[#2e2a22]">2 — Hand over the film</h2>
            <Uploader pin={pin} />
          </section>

          {selectedPin && selectedPin.photos.length > 0 && (
            <section>
              <h2 className="caption mb-4 text-[#2e2a22]">3 — Tend the collection</h2>
              <ManageCollection pin={selectedPin} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default DarkroomPage;
