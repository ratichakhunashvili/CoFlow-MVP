import { useEffect, useRef, useState } from 'react'
import { site } from '../content/site.js'
import Logo from './Logo.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)

  // Esc ხურავს მენიუს; ფოკუსი ბრუნდება ღილაკზე
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // ეკრანის გაფართოებისას მობილური მენიუ ისევ დაიხუროს
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-roast/15 bg-cream">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a href="#top" className="block shrink-0 rounded-sm" aria-label="CoFlow, გვერდის დასაწყისი">
          <Logo className="h-8 w-auto text-roast md:h-10" />
        </a>

        <nav aria-label="ძირითადი ნავიგაცია" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="border-b-2 border-transparent py-1 text-[0.95rem] font-medium transition-colors hover:border-terra hover:text-terra"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={site.headerCta.href} className="btn btn-primary hidden md:inline-flex">
          {site.headerCta.label}
        </a>

        <button
          ref={buttonRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-roast/15 bg-cream md:hidden">
          <nav aria-label="მობილური ნავიგაცია" className="mx-auto max-w-[1200px] px-5 pb-6 pt-2">
            <ul>
              {site.nav.map((item) => (
                <li key={item.href} className="border-b border-roast/15">
                  <a href={item.href} onClick={close} className="block py-3.5 text-lg font-medium">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href={site.headerCta.href} onClick={close} className="btn btn-primary mt-5 w-full">
              {site.headerCta.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
