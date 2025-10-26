import "@/app/globals.css";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body cz-shortcut-listen="true" className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
