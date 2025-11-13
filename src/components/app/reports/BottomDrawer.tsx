"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp } from "lucide-react";

interface BottomDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

type DrawerState = "collapsed" | "half" | "full";

export function BottomDrawer({ isOpen, onOpenChange, children }: BottomDrawerProps) {
  const [drawerState, setDrawerState] = useState<DrawerState>("collapsed");
  const drawerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // Heights for different states (in vh or px)
  const heights = {
    collapsed: "15vh", // Peek view showing header
    half: "50vh",      // Half screen
    full: "85vh",      // Almost full screen
  };

  useEffect(() => {
    if (isOpen && drawerState === "collapsed") {
      setDrawerState("half");
    } else if (!isOpen) {
      setDrawerState("collapsed");
    }
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const deltaY = currentY.current - startY.current;

    // Swipe down
    if (deltaY > 50) {
      if (drawerState === "full") {
        setDrawerState("half");
        onOpenChange(true);
      } else if (drawerState === "half") {
        setDrawerState("collapsed");
        onOpenChange(false);
      }
    }
    // Swipe up
    else if (deltaY < -50) {
      if (drawerState === "collapsed") {
        setDrawerState("half");
        onOpenChange(true);
      } else if (drawerState === "half") {
        setDrawerState("full");
        onOpenChange(true);
      }
    }

    startY.current = 0;
    currentY.current = 0;
  };

  const handleDragHandleClick = () => {
    if (drawerState === "collapsed") {
      setDrawerState("half");
      onOpenChange(true);
    } else if (drawerState === "half") {
      setDrawerState("full");
    } else {
      setDrawerState("collapsed");
      onOpenChange(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {drawerState !== "collapsed" && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => {
            setDrawerState("collapsed");
            onOpenChange(false);
          }}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 transition-all duration-300 ease-out"
        style={{
          height: heights[drawerState],
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        <div
          className="flex items-center justify-center py-3 cursor-pointer"
          onClick={handleDragHandleClick}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          <ChevronUp
            className={`absolute right-4 h-5 w-5 text-gray-400 transition-transform duration-200 ${
              drawerState === "full" ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Content */}
        <div className="h-[calc(100%-3rem)] overflow-y-auto overscroll-contain scrollbar-hide">
          {children}
        </div>
      </div>
    </>
  );
}
