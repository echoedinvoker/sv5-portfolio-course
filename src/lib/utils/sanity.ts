import { createClient, type ClientConfig } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const config: ClientConfig = {
  projectId: 'sccxiprj',  // you can find this in file `sanity.cli.ts` in the sanity studio repo
  dataset: 'production', // in free tier, you are only allowed to use `production` dataset
  useCdn: true, // to distribute data via the Sanity CDN
  apiVersion: '2024-11-26', // use current date (YYYY-MM-DD) to target the latest API version
}

const sanityClient = createClient(config)
export default sanityClient

export function processProjectEntries(rawProject: SanityProject): ProcessedProject {
  const builder = imageUrlBuilder(sanityClient)

  const ProcessedProject: ProcessedProject = {
    name: rawProject.name,
    company: rawProject.company,
    slug: rawProject.slug,
    projectImageUrl: builder.image(rawProject.image).url(),
    dateAccomplished: rawProject.dateAccomplished,
    stack: rawProject.stack || [],
    content: rawProject.content.map(processProjectContent),
  }

  return ProcessedProject
}

function processProjectContent(content: RawTextContent | RawImageContent) {
  if (content._type === 'block') {
    const processedTextContent: ProcessedTextContent = {
      type: 'text',
      style: content.style,
      textToRender: content.children.map((child) => child.text).join('\n'),
    }
    return processedTextContent
  } else {
    const builder = imageUrlBuilder(sanityClient)
    const processedImageContent: ProcessedImageContent = {
      type: 'image',
      url: builder.image(content).url(),
    }
    return processedImageContent
  }
}
