import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
type LayoutProps = {
  children: ReactNode;
  title: string;
};

export default function Layout({ children, title }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      {!isHome && (
        <Link to="/" className="absolute text-gray-100 hover:underline inline-block">
          ← Back to Home
        </Link>
      )}

      <h1 className="text-gray-100 text-3xl font-bold capitalize">{title}</h1>
      <main>{children}</main>
      <footer className="mt-auto text-gray-900 opacity-60">All right reserved @ 2025</footer>
    </div>
  );
}
