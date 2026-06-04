import Hero from "../components/sections/Hero"
import About from "../components/sections/About";
import Navbar from "@/components/navigation/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}