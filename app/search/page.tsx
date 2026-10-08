import { siteName } from '@/lib/seo';
import SearchBox from '@/app/components/SearchBox';

export const metadata = {
  title: `Search — ${siteName}`,
  description: 'Search TrendForge stories about AI, technology, digital life and practical how-to guides.',
  alternates: { canonical: 'https://webtooler.github.io/search/' },
};

export default function SearchPage() {
  return <main className="site">
    <header className="header"><nav className="nav" aria-label="Primary navigation"><a className="logo" href="/" aria-label="TrendForge home">Trend<span>Forge</span></a><div className="links"><a href="/#latest">Latest</a><a href="/#topics">Topics</a><a href="/search/" aria-current="page">Search</a><a href="/subscribe/">Subscribe</a></div></nav></header>
    <section className="search-page"><div className="eyebrow">Find your signal</div><h1>Search <span>TrendForge.</span></h1><p className="search-lead">Find useful stories by topic, keyword or category.</p><SearchBox /></section>
    <footer className="footer"><span>© 2026 TrendForge</span><span><a href="/about/">About</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></span></footer>
  </main>;
}
