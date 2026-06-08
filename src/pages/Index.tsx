import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Blogs from "@/components/Blogs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";
import MobileNav from "@/components/MobileNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingNav />
      <MobileNav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Blogs />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
