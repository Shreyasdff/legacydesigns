import { useEffect, useState } from 'react'
import { SmoothProvider } from './lib/smooth'
import Preloader from './components/preloader'
import Cursor from './components/cursor'
import Nav, { ScrollProgress } from './components/nav'
import Hero from './components/hero'
import Work from './components/work'
import CaseIntro from './components/case/caseintro'
import ScrollPreview from './components/case/scrollpreview'
import InteractivePreview from './components/case/interactivepreview'
import Result from './components/case/result'
import { Challenge, DesignDirection, Development, Experience } from './components/case/story'
import About from './components/about'
import Services from './components/services'
import Process from './components/process'
import Contact from './components/contact'
import Footer from './components/footer'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    document.documentElement.style.overflow = ready ? '' : 'hidden'
    if (ready) window.scrollTo(0, 0)
  }, [ready])

  return (
    <SmoothProvider>
      <a
        href="#work"
        className="label fixed top-3 left-3 z-[120] -translate-y-24 rounded-full bg-ink px-4 py-3 text-paper transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <Nav ready={ready} />

      <main>
        <Hero ready={ready} />
        <Work />
        <CaseIntro />
        <ScrollPreview />
        <InteractivePreview />
        <Challenge />
        <DesignDirection />
        <Experience />
        <Development />
        <Result />
        <About />
        <Services />
        <Process />
        <Contact />
      </main>

      <Footer />
    </SmoothProvider>
  )
}
