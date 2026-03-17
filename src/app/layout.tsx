import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ProgramProvider } from '@/context/ProgramContext';
import ProgramSelector from '@/components/ProgramSelector';
import DataFreshness from '@/components/DataFreshness';

export const metadata: Metadata = {
  title: 'NAIOMT EPA Companion',
  description: 'A comprehensive tool for the NAIOMT EPA framework across all programs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ProgramProvider>
          <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar Navigation */}
            <aside className="fixed left-0 top-0 h-screen w-[260px] bg-[#1F3864] text-white shadow-lg overflow-y-auto flex flex-col">
              {/* Branding */}
              <div className="p-6 border-b border-blue-900">
                <h1 className="text-xl font-bold text-white">NAIOMT</h1>
                <p className="text-xs text-blue-200 mt-1">EPA Companion</p>
              </div>

              {/* Program Selector */}
              <div className="border-b border-blue-900">
                <ProgramSelector />
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-1 flex-1">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-900 transition-colors text-sm"
                >
                  <span className="text-lg">🏠</span>
                  <span>Home</span>
                </Link>

                <Link
                  href="/epas"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-900 transition-colors text-sm"
                >
                  <span className="text-lg">📋</span>
                  <span>EPA Explorer</span>
                </Link>

                <Link
                  href="/competencies"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-900 transition-colors text-sm"
                >
                  <span className="text-lg">⭐</span>
                  <span>Competencies</span>
                </Link>

                <Link
                  href="/domains"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-900 transition-colors text-sm"
                >
                  <span className="text-lg">📚</span>
                  <span>Domains</span>
                </Link>

                <Link
                  href="/advisor"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-900 transition-colors text-sm"
                >
                  <span className="text-lg">💬</span>
                  <span>AI Advisor</span>
                </Link>

                <Link
                  href="/coverage"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-900 transition-colors text-sm"
                >
                  <span className="text-lg">📊</span>
                  <span>Course Coverage</span>
                </Link>

                <Link
                  href="/filters"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-900 transition-colors text-sm"
                >
                  <span className="text-lg">🔍</span>
                  <span>Guided Filters</span>
                </Link>
              </nav>

              {/* Data Freshness */}
              <div className="border-t border-blue-900">
                <DataFreshness />
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="ml-[260px] w-[calc(100%-260px)] min-h-screen">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </ProgramProvider>
      </body>
    </html>
  );
}
