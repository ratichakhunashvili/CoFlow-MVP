import { site } from '../content/site.js'
import { HeroScene, Media } from './Illustrations.jsx'

export default function Hero() {
  const { hero, images } = site

  return (
    <section id="top" aria-labelledby="hero-title" className="grain">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="text-[0.95rem] font-medium text-roast-soft">{hero.eyebrow}</p>

          <h1
            id="hero-title"
            className="mt-4 font-serif text-[clamp(1.95rem,8.2vw,3.4rem)] font-extrabold leading-[1.15] text-roast lg:text-[3.4rem]"
          >
            {hero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl font-serif text-xl font-semibold leading-snug md:text-2xl">{hero.lead}</p>
          <p className="mt-4 max-w-xl text-base text-roast-soft md:text-lg">{hero.body}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={hero.primary.href} className="btn btn-primary">{hero.primary.label}</a>
            <a href={hero.secondary.href} className="btn btn-outline">{hero.secondary.label}</a>
          </div>

          <p className="mt-8 text-sm font-medium text-roast-soft">{hero.status}</p>
        </div>

        <div className="lg:col-span-5">
          <div className="aspect-[560/520] overflow-hidden rounded-lg bg-beige">
            <Media image={images.hero} alt={hero.imageAlt} priority>
              <HeroScene label={hero.imageAlt} />
            </Media>
          </div>
        </div>
      </div>
    </section>
  )
}
