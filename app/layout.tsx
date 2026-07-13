import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://jarisokka-photography.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jari Sokka | Photographer in Lahti, Finland",
    template: "%s | Jari Sokka Photography",
  },
  description:
    "Jari Sokka is a landscape and wildlife photographer based in Lahti, Finland. Explore a portfolio of Finnish nature, birds, mammals, macro and travel photography.",
  keywords: [
    "Jari Sokka",
    "Jari Sokka Photography",
    "Jari Sokka photographer",
    "photographer Finland",
    "Lahti photographer",
    "Finnish nature photography",
    "landscape photography",
    "wildlife photography",
    "bird photography",
    "macro photography",
  ],
  authors: [{ name: "Jari Sokka", url: siteUrl }],
  creator: "Jari Sokka",
  publisher: "Jari Sokka",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Jari Sokka Photography",
    title: "Jari Sokka | Photographer in Lahti, Finland",
    description:
      "Landscape and wildlife photography portfolio by Jari Sokka, based in Lahti, Finland.",
    locale: "en_US",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Jari Sokka Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jari Sokka | Photographer in Lahti, Finland",
    description:
      "Landscape and wildlife photography portfolio by Jari Sokka, based in Lahti, Finland.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Replace the placeholder below with the verification code from
  // Google Search Console (Settings > Ownership verification > HTML tag).
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jari Sokka",
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  jobTitle: "Photographer",
  description:
    "Landscape and wildlife photographer based in Lahti, Finland, specializing in Finnish nature, birds, mammals, macro and travel photography.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahti",
    addressCountry: "Finland",
  },
  email: "mailto:ig.jarisokka@gmail.com",
  sameAs: [
    "https://instagram.com/jarisokka",
    "https://500px.com/jarisokka",
    "https://facebook.com/jarisokka",
    "https://www.youtube.com/channel/UCrfBdIqXUqPBF2tdBc3cURA",
    "https://github.com/jarisokka",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Jari Sokka Photography",
  url: siteUrl,
  author: {
    "@type": "Person",
    name: "Jari Sokka",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel='icon' href='/js-logo.png' />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
