# CoFlow: ყავის ნარჩენიდან მცენარემდე

ერთგვერდიანი startup-prototype ლენდინგი. Stack: React + Vite + Tailwind CSS v4 (გაშვების დროს დამატებითი ბიბლიოთეკების გარეშე).

## გაშვება

```bash
npm install
npm run dev       # ლოკალური ვერსია
npm run build     # production build -> dist/
npm run preview   # build-ის გადახედვა
```

## Vercel-ზე განთავსება

GitHub რეპოზიტორია Vercel-ში დააიმპორტეთ. პროექტი იყენებს `vercel.json`-ში
მითითებულ `npm run build` ბრძანებას და `dist/` გამოსატან საქაღალდედ.
საკონტაქტო ფორმის რეალური გაგზავნისთვის Vercel-ის Project Settings → Environment
Variables-ში დაამატეთ `VITE_FORM_ENDPOINT`. მის გარეშე ფორმა დემო რეჟიმში იმუშავებს
და შეტყობინებები არსად გაიგზავნება.

## რა სად შეიცვლება

| რა | სად |
|---|---|
| ყველა ტექსტი, მენიუ, ბმულები | `src/content/site.js` |
| Leaderboard-ის პარტნიორები და ნერგების რაოდენობა (`demo: true` = დემო მონაცემი) | `src/content/partners.js` |
| ფერები, შრიფტები, ღილაკების სტილი | `src/index.css` (`@theme` ბლოკი) |
| ლოგო (CoFlow, SVG, ფერი იცვლება CSS-ით) | `src/components/Logo.jsx`; ცალკე ფაილი: `public/coflow-logo.svg` |
| პროცესის ვიდეო (720p mp4, ~4 MB) და poster | `src/assets/video/`; ტექსტი: `site.js` → `process.video` |
| ილუსტრაციები (placeholder) | `src/components/Illustrations.jsx` |
| ფორმის ლოგიკა | `src/components/ContactForm.jsx`, `src/lib/submitForm.js` |

## რეალური ფოტოების დამატება

1. ფაილი ჩადეთ `public/images/` საქაღალდეში (მაგ. `hero.jpg`).
2. `src/content/site.js`-ში, `images` ობიექტში მიუთითეთ:
   ```js
   images: {
     hero: { src: '/images/hero.jpg', width: 1200, height: 1115 },
     pot:  { src: '/images/pot.jpg',  width: 1200, height: 900 },
     ball: { src: '/images/ball.jpg', width: 1200, height: 900 },
   }
   ```
3. ფოტო ავტომატურად ჩაანაცვლებს SVG ილუსტრაციას (alt ტექსტი იგივე ველებიდან აიღება).
   Hero-ს ჩარჩო 560:520 პროპორციისაა, პროდუქტების 4:3.

## საკონტაქტო ფორმა (მნიშვნელოვანია)

ამჟამად ფორმა **frontend-only დემოა**: წარმატების შეტყობინებას აჩვენებს, მაგრამ **მონაცემები არსად იგზავნება**.
რეალური გაგზავნისთვის:

1. გააკეთეთ `.env` (იხ. `.env.example`) და მიუთითეთ `VITE_FORM_ENDPOINT`, მაგ. Formspree-ს მისამართი.
2. Resend-ისთვის ან სხვა სერვისისთვის, რომელსაც API key სჭირდება, გამოიყენეთ პატარა სერვერული ფუნქცია
   (Vercel / Netlify / Cloudflare) და endpoint მიუთითეთ მასზე. API key არ უნდა მოხვდეს frontend კოდში.

## წვდომადობა და სიჩქარე

- semantic HTML, "skip to content" ბმული, კლავიატურით სრული ნავიგაცია, ხილული focus მდგომარეობები
- `prefers-reduced-motion`: ერთადერთი ანიმაცია (ნერგის ზრდა hero-ში) და smooth scroll ითიშება
- შრიფტები self-hosted (Noto Serif / Sans Georgian, SIL OFL; ლიცენზია: `src/assets/fonts/OFL-LICENSE.txt`), მხოლოდ ქართული და ლათინური subset
- JS ≈ 77 KB gzip, CSS ≈ 6 KB gzip; გარე მოთხოვნები არ არის
