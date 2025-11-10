// src/components/ShareButton.jsx
import React, { useState } from "react";
import ShareContentModal from "./ShareContentModal";

export default function ShareButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Share your content"
        className="fixed right-6 bottom-6 px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-lg hover:bg-upcoming transition-colors duration-300 z-50"
      >
        Share Your Content
      </button>

      {open && <ShareContentModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
