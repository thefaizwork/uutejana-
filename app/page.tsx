import NavBar from "@/components/NavBar";
import Hero from "../components/Hero";
import About from "@/components/About";
import Manage from "@/components/Manage";
import Event from "@/components/Event";
import Footer from "@/components/Footer";
import Project from "@/components/Project";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
export default function Home() {
  return (
    <main>
      <NavBar/>
      <Hero />
      <About/>
      <Manage/>
      <Event/>
      <Project/>
      <Gallery/>
      <Contact/>
       
      <Footer/>
     

    </main>
  );
}
