import Loader from '../components/Loader';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <ContactForm />
    </>
  );
}
