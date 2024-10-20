export interface MailingListPortalSession {
  url: string
  expiresAt: string
  returnURL: string
}

export interface MailingList {
  name: string
  title: string
  numSubscribers: number
}

export interface Contact {
  email: string
  userId?: string
  avatarUrl?: string
  name?: string
  languageCode?: string
  hardBouncedAt?: string
  subscribedToLists: string[]
  customProperties: Record<string, string | number | boolean>
}