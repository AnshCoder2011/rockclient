import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "./Features";
import News from "./News";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import DownloadBanner from "../components/DownloadBanner";
import EmailForm from "./EmailForm";

export default function LandingPage() {
  return (
    <div className="bg-[#111] h-full">
      <Navbar />
      <Hero />
      <Features />
      <News />
      <Testimonials />
      <DownloadBanner />
      <EmailForm />
      <Footer />
    </div>
  );
}
