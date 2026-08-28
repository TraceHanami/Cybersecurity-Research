import { researchArticles } from '../data/researchData';
import { labsData } from '../data/labsData';
import { mitreTactics } from '../data/mitreData';

export function searchAll(query) {
  if (!query || !query.trim()) return { articles: [], labs: [], mitre: [] };

  const q = query.toLowerCase().trim();

  const articles = researchArticles.filter(art => {
    const matchTitle = art.title.toLowerCase().includes(q);
    const matchSub = art.subtitle.toLowerCase().includes(q);
    const matchSummary = art.executiveSummary.toLowerCase().includes(q);
    const matchTags = art.tags.some(t => t.toLowerCase().includes(q));
    const matchMitre = art.mitreTags.some(m => m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q));
    const matchSigma = art.sigmaRule && art.sigmaRule.toLowerCase().includes(q);
    const matchCategory = art.category.toLowerCase().includes(q) || art.subCategory.toLowerCase().includes(q);

    return matchTitle || matchSub || matchSummary || matchTags || matchMitre || matchSigma || matchCategory;
  });

  const labs = labsData.filter(lab => {
    const matchTitle = lab.title.toLowerCase().includes(q);
    const matchSummary = lab.summary.toLowerCase().includes(q);
    const matchTech = lab.technologies.some(t => t.toLowerCase().includes(q));
    const matchCat = lab.category.toLowerCase().includes(q);

    return matchTitle || matchSummary || matchTech || matchCat;
  });

  const mitre = [];
  mitreTactics.forEach(tactic => {
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
    mitre: mitre.slice(0, 8)
  };
}
