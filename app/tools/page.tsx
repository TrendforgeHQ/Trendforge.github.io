const toolCategories = [
  { name: "AI Tools", href: "/tools/ai/", description: "Browser-first utilities for working with prompts and AI workflows.", status: "Live" },
  { name: "Developer Tools", href: "/tools/developer/", description: "Practical utilities for APIs, JSON, debugging and developer workflows.", status: "Live" },
  { name: "SaaS & Business", href: "", description: "Simple calculators and decision tools for SaaS and digital businesses.", status: "Coming next" },
];

export const metadata = {
  title: "Tools | TrendForge",
  description: "Practical browser-first tools from TrendForge for AI, developers, SaaS and digital work.",
  alternates: { canonical: "/tools/" },
};

export default function ToolsPage() {
  return <main className="site">
    <header className="header"><nav className="nav" aria-label="Tools navigation"><a className="logo" href="/" aria-label="TrendForge home">Trend<span>Forge</span></a><div className="links"><a href="/">News</a><a href="/tools/" aria-current="page">Tools</a><a className="nav-subscribe" href="/subscribe/">Subscribe</a></div></nav></header>
    <section className="hero"><div className="eyebrow">TrendForge Tools</div><h1>Useful tools.<br/><span>No busywork.</span></h1><p>Browser-first utilities built around real AI, developer and digital-business problems. Core tools run locally where possible, without a required account or paid API.</p></section>
    <section className="grid" aria-labelledby="tools-heading"><h2 id="tools-heading" className="sr-only">Tool categories</h2>{toolCategories.map((category) => <article className="card" key={category.name}><div className="tag">{category.status}</div><h3>{category.name}</h3><p>{category.description}</p>{category.href ? <a className="read-button" href={category.href}>Explore <span>→</span></a> : <span className="tag">In development</span>}</article>)}</section>
    <footer className="footer"><span>© 2026 TrendForge</span><span><a href="/">News</a> · <a href="/about/">About</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></span></footer>
  </main>;
}