'use client';

import { useState } from 'react';

interface ReportActionsProps {
  reportId: string;
}

export default function ReportActions({ reportId }: ReportActionsProps) {
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);

  const handleUpvote = () => {
    // TODO: Call upvote API
    setUpvoted(!upvoted);
    setUpvoteCount(upvoted ? upvoteCount - 1 : upvoteCount + 1);
  };

  return (
    <div className="mt-6 flex gap-4">
      <button
        onClick={handleUpvote}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 transition ${
          upvoted
            ? 'bg-primary-yellow text-dark-brown'
            : 'bg-white text-dark-brown/70 hover:bg-cream'
        }`}
      >
        <span>↑</span>
        <span>{upvoteCount} Upvotes</span>
      </button>

      <button className="rounded-lg bg-white px-4 py-2 text-dark-brown/70 transition hover:bg-cream">
        Bagikan
      </button>
    </div>
  );
}
