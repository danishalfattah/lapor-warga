'use client';

import { Map, List, Plus, Trophy, User } from 'lucide-react';

interface MobileBottomNavProps {
  activeView: 'map' | 'feed';
  onViewChange: (view: 'map' | 'feed') => void;
  onCreateReport: () => void;
  onNavigateToLanding: () => void;
  onNavigateToLeaderboard: () => void;
  onNavigateToProfile: () => void;
  onNavigateToAuth: () => void;
  isLoggedIn: boolean;
}

export function MobileBottomNav({
  activeView,
  onViewChange,
  onCreateReport,
  onNavigateToLanding,
  onNavigateToLeaderboard,
  onNavigateToProfile,
  onNavigateToAuth,
  isLoggedIn,
}: MobileBottomNavProps) {
  return (
    <nav className="border-t border-border bg-card px-4 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        {/* Map */}
        <button
          onClick={() => onViewChange('map')}
          className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
            activeView === 'map' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Map className="h-6 w-6" />
          <span className="inter-semibold text-xs">Peta</span>
        </button>

        {/* Feed */}
        <button
          onClick={() => onViewChange('feed')}
          className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
            activeView === 'feed' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <List className="h-6 w-6" />
          <span className="inter-semibold text-xs">Feed</span>
        </button>

        {/* Create (Center, Highlighted) */}
        <button
          onClick={onCreateReport}
          className="-mt-6 flex flex-col items-center gap-1"
        >
          <div className="rounded-full bg-primary p-4 shadow-lg">
            <Plus className="h-6 w-6 text-primary-content" />
          </div>
          <span className="inter-semibold text-xs text-primary">Lapor</span>
        </button>

        {/* Leaderboard */}
        <button
          onClick={onNavigateToLeaderboard}
          className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <Trophy className="h-6 w-6" />
          <span className="inter-semibold text-xs">Top</span>
        </button>

        {/* Profile/Login */}
        <button
          onClick={isLoggedIn ? onNavigateToProfile : onNavigateToAuth}
          className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <User className="h-6 w-6" />
          <span className="inter-semibold text-xs">
            {isLoggedIn ? 'Profil' : 'Login'}
          </span>
        </button>
      </div>
    </nav>
  );
}