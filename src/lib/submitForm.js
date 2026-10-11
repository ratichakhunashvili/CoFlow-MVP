/**
 * საკონტაქტო ფორმის გაგზავნა.
 *
 * ახლა: თუ VITE_FORM_ENDPOINT მითითებული არ არის, ფორმა მუშაობს DEMO რეჟიმში.
 * მონაცემები არსად იგზავნება, მხოლოდ წარმატების მდგომარეობა ჩანს.
 *
 * მომავალში: ჩაწერეთ endpoint .env ფაილში (იხ. .env.example), მაგალითად Formspree:
 *   VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
 * Resend-ისა და სხვა სერვისისთვის (რომელსაც API key სჭირდება) გამოიყენეთ
 * პატარა სერვერული ფუნქცია (Vercel/Netlify/Cloudflare), რადგან API key არასდროს
 * უნდა მოხვდეს frontend კოდში. endpoint მიუთითეთ ამ ფუნქციაზე.
 */
export async function submitForm(data) {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    if (import.meta.env.DEV) console.info('[demo] ფორმა არსად გაიგზავნა:', data)
    return { ok: true, demo: true }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Form endpoint responded with ${response.status}`)
  return { ok: true, demo: false }
}
