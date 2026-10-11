import { site } from '../content/site.js'
import { BallScene, Media, PotScene } from './Illustrations.jsx'

const scenes = { pot: PotScene, ball: BallScene }

export default function Products() {
  const { products, images } = site
  return (
    <section id="products" aria-labelledby="products-title" className="grain bg-beige py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 id="products-title" className="text-3xl font-bold leading-tight md:text-5xl">
          {products.title}
        </h2>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-10">
          {products.items.map((item) => {
            const Scene = scenes[item.key]
            return (
              <article key={item.key}>
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-cream">
                  <Media image={images[item.key]} alt={item.imageAlt}>
                    <Scene label={item.imageAlt} />
                  </Media>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-bold md:text-3xl">{item.title}</h3>
                <p className="mt-3 max-w-lg text-lg text-roast-soft">{item.text}</p>
              </article>
            )
          })}
        </div>

        <p className="mt-14 max-w-2xl text-base text-roast-soft md:text-lg">
          {products.note}
        </p>
      </div>
    </section>
  )
}
