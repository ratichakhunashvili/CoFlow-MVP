import { site } from '../content/site.js'

export default function Testing() {
  const { testing } = site
  return (
    <section id="testing" aria-labelledby="testing-title" className="grain bg-beige py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="testing-title" className="text-3xl font-bold leading-tight md:text-5xl">
            {testing.title}
          </h2>
          <p className="mt-8 max-w-sm font-serif text-lg font-semibold leading-snug text-roast-soft md:text-xl">
            {testing.trust}
          </p>
        </div>

        <ul className="border-b border-roast/25 lg:col-span-7">
          {testing.items.map((item) => (
            <li
              key={item}
              className="border-t border-roast/25 py-6 font-serif text-xl font-semibold leading-snug md:text-2xl"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
