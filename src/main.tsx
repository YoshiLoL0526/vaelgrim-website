import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { About } from './components/About.tsx';
import { Art, CallToAction, Footer } from './components/Closing.tsx';
import { Endgame } from './components/Endgame.tsx';
import { Hero } from './components/Hero.tsx';
import { Heroes } from './components/Heroes.tsx';
import { Loot } from './components/Loot.tsx';
import { Nav } from './components/Nav.tsx';
import { World } from './components/World.tsx';
import { LangProvider } from './i18n.tsx';
import './index.css';

function App() {
  return (
    <LangProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-gold focus:px-3 focus:py-2 focus:text-void"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Heroes />
        <World />
        <Loot />
        <Endgame />
        <Art />
        <CallToAction />
      </main>
      <Footer />
    </LangProvider>
  );
}

const root = document.getElementById('root');
if (!root) throw new Error('#root not found');
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
