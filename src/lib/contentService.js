import { defaultAdminData } from '../data/siteData'
import { isFirebaseConfigured, readCollection, saveDocument, removeDocument } from './firebase'

const getFallbackData = () => ({
  siteSettings: defaultAdminData.siteSettings,
  pages: defaultAdminData.pages,
  sections: defaultAdminData.sections,
  blogPosts: defaultAdminData.blogPosts,
  events: defaultAdminData.events,
})

export const fetchContent = async () => {
  if (!isFirebaseConfigured) {
    return getFallbackData()
  }

  try {
    const [siteSettings, pages, sections, blogPosts, events] = await Promise.all([
      readCollection('siteSettings'),
      readCollection('pages'),
      readCollection('sections'),
      readCollection('blogPosts'),
      readCollection('events'),
    ])

    return {
      siteSettings: siteSettings[0] || defaultAdminData.siteSettings,
      pages: pages.length ? pages : defaultAdminData.pages,
      sections: sections.length ? sections : defaultAdminData.sections,
      blogPosts: blogPosts.length ? blogPosts : defaultAdminData.blogPosts,
      events: events.length ? events : defaultAdminData.events,
    }
  } catch (error) {
    console.error('Error reading remote content, using fallback data:', error)
    return getFallbackData()
  }
}

export const saveContent = async (collectionName, payload, id) => {
  if (!isFirebaseConfigured) {
    return { success: true, mode: 'demo' }
  }

  return saveDocument(collectionName, payload, id)
}

export const deleteContent = async (collectionName, id) => {
  if (!isFirebaseConfigured) {
    return { success: true, mode: 'demo' }
  }

  return removeDocument(collectionName, id)
}
