import { createClient } from 'next-sanity'


export const client = createClient({
  projectId:"pknoq409",
  dataset:"production",
  apiVersion:"v2025-01-13",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
