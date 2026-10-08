export const metadata = { title: "AI Tools | TrendForge", description: "Practical browser-first AI utilities from TrendForge.", alternates: { canonical: "/tools/ai/" } };

export default function AIToolsPage() {
  return <main className="site">
    <header className="header"><nav className="nav" aria-label="AI tools navigation"><a className="logo" href="/" aria-label="TrendForge home">Trend<span>Forge</span></a><div className="links"><a href="/tools/">All tools</a><a className="nav-subscribe" href="/subscribe/">Subscribe</a></div></nav></header>
    <section className="hero"><div className="eyebrow">TrendForge Tools · AI</div><h1>AI tools that stay <span>practical.</span></h1><p>Small, transparent utilities for improving AI workflows without forcing a paid model into the core experience.</p></section>
    <section className="grid" aria-labelledby="ai-tools-heading"><h2 id="ai-tools-heading" className="sr-only">AI tools</h2><article className="card featured"><div className="tag">Live · Browser-side</div><h2>Prompt Optimizer</h2><p>Check a prompt for clarity, structure and missing requirements, then create a cleaner version without sending the prompt to an AI API.</p><a className="read-button" href="/tools/ai/prompt-optimizer/">Open tool <span>→</span></a></article></section>
    <footer className="footer"><span>© 2026 TrendForge</span><span><a href="/tools/">All tools</a> · <a href="/">News</a> · <a href="/privacy/">Privacy</a></span></footer>
  </main>;
}
