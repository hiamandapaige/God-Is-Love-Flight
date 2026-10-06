// Sends a form submission to Netlify Forms.
// Each form name must also exist as a hidden static form in index.html
// so Netlify can detect its fields at deploy time.
export async function submitNetlifyForm(formName, fields) {
  const body = new URLSearchParams({ 'form-name': formName, ...fields }).toString();
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) {
    throw new Error('Your submission could not be sent. Please try again or call (601) 573-7624.');
  }
}
