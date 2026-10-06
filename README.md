# God Is Love Flight — website

Aerial photography and drone flight classes in Jackson, MS.
React + Vite + Tailwind, hosted on Netlify. Forms and shop orders go to Netlify Forms.

## Run locally

```bash
npm install
npm run fetch-media   # one-time: downloads photos/videos into public/media
npm run dev
```

Form and checkout submissions only work on the deployed Netlify site, not on localhost.

## Deploy to Netlify

1. Push this folder to a new GitHub repository.
2. In Netlify: **Add new site → Import an existing project → GitHub**, pick the repo.
   Build settings are read from `netlify.toml`, so just click **Deploy**.
3. In the site's **Forms** tab, click **Enable form detection**, then redeploy
   (Deploys → Trigger deploy). This turns on the `inquiry` and `order` forms.
4. Under **Forms → Form notifications**, add an email notification so new
   inquiries and orders go to the owner's inbox.
5. Change the temporary address under **Site configuration → Change site name**
   (e.g. `godisloveflight.netlify.app`).

## Media

All photos and videos live in `public/media`. The build runs `fetch-media`,
which downloads any missing files from Base44. Once you've run it locally,
upload the `public/media` folder so the site no longer depends on Base44.

## Where things live

Everything is in this one folder.

| What | File |
| --- | --- |
| Homepage sections | `Hero.jsx`, `About.jsx`, `Services.jsx`, `FlightReel.jsx`, `Academy.jsx`, `ClassForm.jsx`, `Footer.jsx` |
| Products and prices | `products.js` |
| Colors and fonts | `index.css`, `tailwind.config.js` |
| Page title, SEO, social preview | `index.html` |
| Form submission helper | `netlifyForm.js` |
