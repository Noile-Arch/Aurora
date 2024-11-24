import Navbar from "../components/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <Navbar />
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
