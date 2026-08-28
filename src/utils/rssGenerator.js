import { researchArticles } from '../data/researchData';

export function generateRssXml() {
  const baseUrl = 'https://tracehanami.sec';
  const pubDate = new Date().toUTCString();

  const items = researchArticles.map(art => {
    return `    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>${baseUrl}/research/${art.slug}</link>
      <guid isPermaLink="true">${baseUrl}/research/${art.slug}</guid>
      <pubDate>${new Date(art.date).toUTCString()}</pubDate>
      <author>research@tracehanami.sec (${art.author.name})</author>
      <category><![CDATA[${art.category} - ${art.subCategory}]]></category>
      <description><![CDATA[${art.executiveSummary}]]></description>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TraceHanami Research — Cybersecurity Research Journal</title>
    <link>${baseUrl}</link>
    <description>Cybersecurity research journal, threat hunting methodologies, detection engineering experiments, red team techniques, and DFIR investigations.</description>
    <language>en-us</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}
