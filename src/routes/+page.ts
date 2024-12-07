import type { PageLoad } from './$types';
import sanityClient, { processProjectEntries } from '$lib/utils/sanity'

export const load: PageLoad = async () => {

  const [
    workExperience,
    rawProjects,
    skills
  ]: [
    DevExperience[],
    SanityProject[],
    Skill[]
  ] = await Promise.all([
    sanityClient.fetch(
      '*[_type == "devExperience"] | order(starDate desc)'
    ),
    sanityClient.fetch(
      '*[_type == "project"] | order(dateAccomplished desc)'
    ),
    sanityClient.fetch(
      '*[_type == "skills"][0].skillsList'
    )
  ]);

  const projects = rawProjects.map(processProjectEntries);

  return {
    workExperience,
    projects,
    skills
  }
};
