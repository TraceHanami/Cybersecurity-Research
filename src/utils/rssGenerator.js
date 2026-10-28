import { getCuratedArticles } from '../data/curation';

export function generateRssXml() {
  const baseUrl = 'https://tracehanami.sec';

  const items = getCuratedArticles().map(art => {
    const description = art.executiveSummary
      || art.sections?.find(section => section.id === 'summary')?.paragraphs?.join('\n\n')
      || '';
    const optionalFields = [
      art.date ? `<pubDate>${art.date}</pubDate>` : null,
      art.author?.name ? `<author>research@tracehanami.sec (${art.author.name})</author>` : null,
    ].filter(Boolean).join('\n      ');
    const categories = (art.tags || []).length
      ? art.tags
      : [art.category, art.subCategory].filter(Boolean);
    const categoryElements = categories
      .map(category => `<category><![CDATA[${category}]]></category>`)
      .join('\n      ');

    return `    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>${baseUrl}/research/${art.slug}</link>
      <guid isPermaLink="true">${baseUrl}/research/${art.slug}</guid>
      ${optionalFields}
      ${categoryElements}
      <description><![CDATA[${description}]]></description>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TraceHanami Research — Cybersecurity Research Journal</title>
    <link>${baseUrl}</link>
    <description>Cybersecurity research journal, threat hunting methodologies, detection engineering experiments, red team techniques, and DFIR investigations.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}
