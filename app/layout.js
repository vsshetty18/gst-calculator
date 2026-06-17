import "./globals.css";

export const metadata = {
  title: "GST Calculator | V S VIGHNESH",
  description:
    "Free GST Calculator built for Digital Heroes trial task. Calculate GST amount, original amount, and total amount instantly.",
  keywords: "GST calculator, tax calculator, India GST, goods and services tax",
  authors: [{ name: "V S VIGHNESH" }],
  openGraph: {
    title: "GST Calculator | V S VIGHNESH",
    description:
      "Free GST Calculator built for Digital Heroes trial task. Calculate GST instantly.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
