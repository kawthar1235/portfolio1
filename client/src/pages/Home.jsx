import Loader from '../components/Loader';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <>
      <Loader />
      <About />
      <Projects />
      <Skills />
      <ContactForm />
    </>
  );
}