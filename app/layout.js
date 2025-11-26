import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/lib/redux/store/ReduxProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexLearn - Online Learning Platform",
  description: "NexLearn offers comprehensive online courses and practice exams to help you master new skills and prepare for certifications. Learn anytime, anywhere.",
  keywords: ["online learning", "e-learning", "courses", "practice exams", "education", "skills", "certification"],
  author: "NexLearn Team",
  openGraph: {
    title: "NexLearn - Master New Skills with Online Courses & Exams",
    description: "Access a wide range of online courses and practice exams designed to enhance your knowledge and boost your career.",
    url: "https://www.nexlearn.com", 
    siteName: "NexLearn",
    images: [
      {
        url: "https://www.nexlearn.com/images/brand.png", 
        width: 800,
        height: 600,
        alt: "NexLearn Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexLearn - Master New Skills with Online Courses & Exams",
    description: "Access a wide range of online courses and practice exams designed to enhance your knowledge and boost your career.",
    creator: "@NexLearn", 
    images: ["https://www.nexlearn.com/images/brand.png"], 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Toaster />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
