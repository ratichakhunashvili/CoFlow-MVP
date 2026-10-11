import { site } from '../content/site.js'

export default function Partnership() {
  const { partnership } = site
  return (
    <section id="partnership" aria-labelledby="partnership-title" className="on-dark bg-roast py-20 text-milk md:py-28">
      <div className="mx-auto grid w-full max-w-[1200px] items-end gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <h2
          id="partnership-title"
          className="font-serif text-4xl font-extrabold leading-[1.15] md:text-6xl lg:col-span-7"
        >
          {partnership.title}
        </h2>
        <div className="lg:col-span-5">
          <p className="text-lg text-milk/80">{partnership.text}</p>
          <a href={partnership.cta.href} className="btn btn-light mt-8 w-full sm:w-auto">
            {partnership.cta.label}
          </a>
        </div>
      </div>
    </section>
  )
}
