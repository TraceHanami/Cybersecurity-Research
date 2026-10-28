import { researchArticles } from './researchData';
import { labsData } from './labsData';
import { statsData } from './statsData';
import { mitreTactics } from './mitreData';
import { authorData } from './authorData';
import { kanbanData } from './kanbanData';
import { tornadoAdvisory } from './tornadoAdvisory';
import { portfolioProjects } from './portfolioProjects';

export const CURATION_ENABLED = true;

const excludedCtfArticleIds = new Set([
  'res-ctf-01',
  'res-ctf-02',
  'res-ctf-03',
  'res-ctf-04',
]);
const excludedSensitiveArticleIds = new Set(['res-vapt-01']);
const excludedLabIds = new Set(['lab-ctf-forensics-workbench']);
const excludedDomainIds = new Set(['digital-forensics', 'reverse-engineering']);
const excludedInterestAreas = new Set([
  'Digital Forensics, Steganography & Binary File Structure (LSB, JPEG MCUs, SOF0)',
  'Protocol Reverse Engineering & Sensor Telemetry Analysis',
]);

const allArticles = [tornadoAdvisory, ...researchArticles];
const ctfArticleSlugs = new Set(
  researchArticles.filter(article => excludedCtfArticleIds.has(article.id)).map(article => article.slug)
);
const sensitiveArticleSlugs = new Set(
  researchArticles.filter(article => excludedSensitiveArticleIds.has(article.id)).map(article => article.slug)
);
export const curatedArticleSlugs = new Set([
  ...sensitiveArticleSlugs,
  ...(CURATION_ENABLED ? ctfArticleSlugs : []),
]);

export function getCuratedArticles() {
  return allArticles.filter(article => {
    if (excludedSensitiveArticleIds.has(article.id)) return false;
    return !CURATION_ENABLED || !excludedCtfArticleIds.has(article.id);
  });
}

export function getCuratedArticleBySlug(slug) {
  return getCuratedArticles().find(article => article.slug === slug);
}

export function getCuratedLabs() {
  return CURATION_ENABLED ? labsData.filter(lab => !excludedLabIds.has(lab.id)) : labsData;
}

export function getCuratedStats() {
  return CURATION_ENABLED ? [] : statsData;
}

export function getCuratedResearchDomains(domains) {
  return CURATION_ENABLED ? domains.filter(domain => !excludedDomainIds.has(domain.id)) : domains;
}

export function getCuratedMitreTactics() {
  const hiddenSlugs = new Set([
    ...sensitiveArticleSlugs,
    ...(CURATION_ENABLED ? ctfArticleSlugs : []),
  ]);

  return mitreTactics
    .map(tactic => {
      const techniques = tactic.techniques.filter(technique => !hiddenSlugs.has(technique.researchSlug));
      const curatedTactic = {
        ...tactic,
        techniques,
      };

      if (techniques.length !== tactic.techniques.length) {
        delete curatedTactic.coveragePercent;
        delete curatedTactic.techniquesCount;
        delete curatedTactic.detectionCount;
        delete curatedTactic.detectionsCount;
      }

      return curatedTactic;
    })
    .filter(tactic => tactic.techniques.length > 0);
}

export function getCuratedAuthorData() {
  return {
    ...authorData,
    areasOfInterest: CURATION_ENABLED
      ? authorData.areasOfInterest.filter(area => !excludedInterestAreas.has(area))
      : authorData.areasOfInterest,
    publications: authorData.publications.filter(publication => !curatedArticleSlugs.has(publication.link.split('/').pop())),
    githubActivity: {
      ...authorData.githubActivity,
      recentProjects: CURATION_ENABLED
        ? authorData.githubActivity.recentProjects.filter(project => !/\bCTF\b/i.test(project.name))
        : authorData.githubActivity.recentProjects,
    },
  };
}

export function getCuratedKanbanData() {
  return Object.fromEntries(
    Object.entries(kanbanData).map(([stage, items]) => [
      stage,
      items.filter(item => {
        if (item.slug && sensitiveArticleSlugs.has(item.slug)) return false;
        if (!CURATION_ENABLED) return true;
        if (item.slug && ctfArticleSlugs.has(item.slug)) return false;
        return ![item.title, item.description, ...(item.tags || [])]
          .some(value => /\bCTF\b/i.test(value));
      }),
    ])
  );
}

export function getCuratedPortfolioProjects() {
  if (!CURATION_ENABLED) return portfolioProjects;

  return portfolioProjects.filter(project => !/\bCTF\b/i.test(`${project.name} ${project.description || ''}`));
}
