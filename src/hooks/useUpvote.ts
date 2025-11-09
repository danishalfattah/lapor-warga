'use client';

import { useState, useEffect } from 'react';
import { getReportById } from '@/data/mockReports';

export function useUpvote(reportId: string) {
  const report = getReportById(reportId);
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(report?.upvotes || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (report) {
      setUpvoteCount(report.upvotes);
    }
  }, [report]);

  const toggleUpvote = async () => {
    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    setUpvoted(!upvoted);
    setUpvoteCount(upvoted ? upvoteCount - 1 : upvoteCount + 1);
    setLoading(false);
  };

  return {
    upvoted,
    upvoteCount,
    loading,
    toggleUpvote,
  };
}
