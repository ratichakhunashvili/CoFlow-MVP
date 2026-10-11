import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import Products from './components/Products.jsx'
import Process from './components/Process.jsx'
import Testing from './components/Testing.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Partnership from './components/Partnership.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        მთავარ ნაწილზე გადასვლა
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Leaderboard />
        <Problem />
        <Products />
        <Process />
        <Testing />
        <Partnership />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
