import sanityClient from '@sanity/client'

export const Client = sanityClient({
  projectId: '3hov5vl0',
  dataset: 'production',
  apiVersion: '2022-09-25',
  useCdn: true,
})
