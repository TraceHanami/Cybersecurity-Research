import { getCuratedArticles, getCuratedLabs, getCuratedMitreTactics } from '../data/curation';

export function searchAll(query) {
  if (!query || !query.trim()) return { articles: [], labs: [], mitre: [] };

  const q = query.toLowerCase().trim();

  const articles = getCuratedArticles().filter(art => {
    const sections = (art.sections || []).flatMap(section => [
      section.title,
      ...(section.paragraphs || []),
      ...(section.items || []),
      section.content,
    ]).filter(Boolean);
    const searchable = [
      art.title,
      art.subtitle,
      art.executiveSummary,
      art.category,
      art.subCategory,
      art.advisoryId,
      art.packageName,
      art.affected,
      art.patched,
      art.severity,
      art.cve,
      art.credit,
      art.headerNote,
      ...(art.tags || []),
      ...(art.weaknesses || []),
      ...sections,
      ...(art.mitreTags || []).flatMap(mapping => [mapping.id, mapping.name]),
      art.sigmaRule,
    ].filter(Boolean).join(' ').toLowerCase();

    return searchable.includes(q);
  });

  const labs = getCuratedLabs().filter(lab => {
    const matchTitle = lab.title.toLowerCase().includes(q);
    const matchSummary = lab.summary.toLowerCase().includes(q);
    const matchTech = lab.technologies.some(t => t.toLowerCase().includes(q));
    const matchCat = lab.category.toLowerCase().includes(q);

    return matchTitle || matchSummary || matchTech || matchCat;
  });

  const mitre = [];
  getCuratedMitreTactics().forEach(tactic => {
    const matchTactic = tactic.name.toLowerCase().includes(q) || tactic.id.toLowerCase().includes(q);
    tactic.techniques.forEach(tech => {
      const matchTech = tech.id.toLowerCase().includes(q) || tech.name.toLowerCase().includes(q) || tech.subtechniques.some(st => st.toLowerCase().includes(q));
      if (matchTactic || matchTech) {
        mitre.push({
          tacticId: tactic.id,
          tacticName: tactic.name,
          tacticSlug: tactic.slug,
          techniqueId: tech.id,
          techniqueName: tech.name,
          researchSlug: tech.researchSlug
        });
      }
    });
  });

  return {
    articles,
    labs,
    mitre
  };
}
