import { site } from '../content/site.js'

export default function Problem() {
  const { problem } = site
  return (
    <section id="project" aria-labelledby="problem-title" className="border-t border-roast/15 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 id="problem-title" className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          {problem.title}
        </h2>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-0">
          {problem.items.map((item, i) => (
            <div
              key={item.title}
              className={`border-t-2 border-roast pt-6 md:pt-8 ${i === 0 ? 'md:pr-12' : 'md:border-l md:border-l-roast/20 md:pl-12'}`}
            >
              <h3 className="font-serif text-2xl font-bold md:text-3xl">{item.title}</h3>
              <p className="mt-4 max-w-md text-lg text-roast-soft">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-3xl font-serif text-xl font-semibold leading-snug md:mt-20 md:text-3xl md:leading-snug">
          {problem.bridge}
        </p>
      </div>
    </section>
  )
}
