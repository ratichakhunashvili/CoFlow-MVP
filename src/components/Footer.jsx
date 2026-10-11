import { site } from '../content/site.js'
import Logo from './Logo.jsx'

export default function Footer() {
  const { footer } = site
  return (
    <footer className="on-dark bg-roast text-milk">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 border-t border-milk/20 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <Logo className="h-10 w-auto text-milk" />
          <p className="mt-4 text-milk/80">{footer.place}</p>
        </div>
        <div className="md:text-right">
          <p className="max-w-sm text-sm text-milk/80">{footer.status}</p>
          <a href="#top" className="mt-3 inline-block text-sm font-medium underline underline-offset-4 hover:text-ember">
            {footer.toTop}
          </a>
        </div>
      </div>
      <p className="mx-auto w-full max-w-[1200px] px-5 pb-8 text-sm text-milk/70 md:px-8">{footer.credit}</p>
    </footer>
  )
}
