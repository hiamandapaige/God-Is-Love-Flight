import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background grid-lines">
      <div className="max-w-md w-full text-center glass-panel rounded-3xl p-10">
        <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-sky mb-3">// Off Course</p>
        <h1 className="font-mono-tech font-bold text-6xl text-foreground">404</h1>
        <p className="mt-4 text-muted-foreground">This page doesn't exist. Head back to base and try again.</p>
        <Link to="/" className="mt-8 h-12 inline-flex items-center rounded-full bg-gold px-8 font-mono-tech text-sm uppercase tracking-widest text-gold-foreground gold-glow transition">
          Return Home
        </Link>
      </div>
    </div>
  );
}
