// app/layout.tsx
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata = { title: "DevCollab" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-surface text-gray-800">
        <AuthProvider>
          <main className="flex-grow px-4 py-6 sm:px-6 md:px-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
