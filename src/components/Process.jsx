import { site } from '../content/site.js'

export default function Process() {
  const { process } = site
  return (
    <section id="process" aria-labelledby="process-title" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 id="process-title" className="text-3xl font-bold leading-tight md:text-5xl">
          {process.title}
        </h2>

        {/* მობილურზე სია ზევიდან ქვემოთ, desktop-ზე ხუთი სვეტი */}
        <ol className="mt-12 md:mt-16 md:grid md:grid-cols-5 md:gap-6">
          {process.steps.map((step, i) => (
            <li
              key={step}
              className="flex items-baseline gap-5 border-t border-roast py-4 last:border-b last:border-b-roast/30 md:block md:py-5 md:last:border-b-0"
            >
              <span className="font-serif text-3xl font-extrabold text-terra md:block md:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-serif text-xl font-bold md:mt-8 md:block">{step}</span>
            </li>
          ))}
        </ol>

        <video
          className="mt-14 aspect-video w-full rounded-lg bg-roast md:mt-20"
          controls
          playsInline
          preload="metadata"
          poster={process.video.poster}
          aria-label={process.video.label}
        >
          <source src={process.video.src} type="video/mp4" />
          {process.video.fallback}
        </video>
      </div>
    </section>
  )
}
