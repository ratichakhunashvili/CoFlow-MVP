import { site } from '../content/site.js'
import { partners } from '../content/partners.js'

// "5,000" ფორმატი (ka-GE ათასებს ჰარით გამოყოფს)
const formatNumber = new Intl.NumberFormat('en-US').format

export default function Leaderboard() {
  const { leaderboard } = site
  const ranked = [...partners].sort((a, b) => b.trees - a.trees)
  const max = Math.max(...ranked.map((p) => p.trees), 1)
  const anyDemo = ranked.some((p) => p.demo)
  const allDemo = ranked.every((p) => p.demo)

  return (
    <section id="leaderboard" aria-labelledby="leaderboard-title" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="leaderboard-title" className="text-3xl font-bold leading-tight md:text-5xl">
              {leaderboard.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-roast-soft">{leaderboard.text}</p>
          </div>

          {anyDemo && (
            <div className="rounded-md border border-roast/30 bg-beige px-5 py-4 lg:col-span-5">
              <p className="font-semibold leading-snug">{leaderboard.demo.label}</p>
              <p className="mt-2 text-sm text-roast-soft">{leaderboard.demo.text}</p>
            </div>
          )}
        </div>

        <p id="leaderboard-metric" className="mt-12 text-sm font-medium text-roast-soft md:mt-16 md:text-right">
          {anyDemo ? leaderboard.metric.possible : leaderboard.metric.planted}
        </p>

        <ol aria-describedby="leaderboard-metric" className="mt-4 border-b border-roast/25">
          {ranked.map((partner, i) => {
            const first = i === 0
            return (
              <li
                key={partner.name}
                className={`grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-4 py-5 md:grid-cols-[4rem_minmax(0,1.2fr)_minmax(0,1fr)_9rem] md:items-center md:gap-x-8 md:py-6 lg:gap-x-12 ${
                  first ? 'border-t-2 border-leaf' : 'border-t border-roast/25'
                }`}
              >
                <span
                  className={`font-serif text-2xl font-extrabold tabular-nums md:text-3xl ${
                    first ? 'text-leaf' : 'text-roast-soft'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* მობილურზე სახელი, რაოდენობა და ზოლი ერთ ბლოკშია; desktop-ზე ცალკე სვეტებად იშლება */}
                <div className="flex min-w-0 flex-col md:contents">
                  <span className="font-serif text-xl font-bold leading-snug md:text-2xl">
                    {partner.name}
                    {partner.demo && !allDemo && (
                      <>
                        {' '}
                        <span className="ml-1.5 inline-block rounded-md border border-roast/30 px-2 py-0.5 align-middle font-sans text-xs font-semibold text-roast-soft">
                          {leaderboard.demo.badge}
                        </span>
                      </>
                    )}
                  </span>

                  <span className="mt-1 whitespace-nowrap text-base md:order-last md:mt-0 md:text-right md:text-xl">
                    <span className="font-semibold tabular-nums">{formatNumber(partner.trees)}</span>{' '}
                    <span className="text-roast-soft">{leaderboard.unit}</span>
                  </span>

                  {/* მხოლოდ ვიზუალური შედარება ლიდერთან, არა ოფიციალური ანგარიში */}
                  <span aria-hidden="true" className="mt-3 block h-1.5 rounded-full bg-roast/10 md:mt-0 md:h-2.5">
                    <span
                      className={`block h-full rounded-full ${first ? 'bg-leaf' : 'bg-roast/40'}`}
                      style={{ width: `${Math.round((partner.trees / max) * 100)}%` }}
                    />
                  </span>
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8 md:mt-16">
          <a href={leaderboard.cta.href} className="btn btn-primary w-full shrink-0 sm:w-auto">
            {leaderboard.cta.label}
          </a>
          <p className="max-w-md font-serif text-lg font-semibold leading-snug text-roast-soft">
            {leaderboard.closing}
          </p>
        </div>
      </div>
    </section>
  )
}
