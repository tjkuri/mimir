import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const { pathname } = useLocation();
  const isNba = pathname === '/' || pathname === '/basketball';
  const isNfl = pathname === '/nfl';

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse at 50% 0%, #1f1040 0%, #1c2541 50%, #0a1020 100%)' }}>
      <header className="sticky top-0 z-10 border-b border-ghostWhite/10 bg-spaceCadet/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 h-14">
          <span className="text-naplesYellow font-cinzel font-bold text-xl tracking-widest">MIMIR</span>
          <nav className="flex items-center gap-8">
            <Link
              to="/"
              className={`font-cinzel text-sm tracking-wide transition-colors ${isNba ? 'text-naplesYellow' : 'text-ghostWhite/50 hover:text-ghostWhite'}`}
            >
              NBA
            </Link>
            <Link
              to="/nfl"
              className={`font-cinzel text-sm tracking-wide transition-colors ${isNfl ? 'text-naplesYellow' : 'text-ghostWhite/50 hover:text-ghostWhite'}`}
            >
              NFL
            </Link>
            <span className="font-cinzel text-sm tracking-wide text-ghostWhite/20 cursor-not-allowed select-none">
              Baseball
            </span>
          </nav>
        </div>
      </header>
      <main className="px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
