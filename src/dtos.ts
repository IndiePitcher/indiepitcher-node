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

export interface CreateContact {
  email: string
  userId?: string
  avatarUrl?: string
  name?: string
  languageCode?: string
  hardBouncedAt?: string
  subscribedToLists?: string[]
  customProperties?: Record<string, string | number | boolean>
  updateIfExists?: boolean
  ignoreListSubscriptionsWhenUpdating?: boolean
}

export interface UpdateContact {
  email: string
  userId?: string
  avatarUrl?: string
  name?: string
  languageCode?: string
  hardBouncedAt?: string
  addedListSubscripitons?: string[]
  removedListSubscripitons?: string[]
  customProperties?: Record<string, string | number | boolean | null>
}

export interface CreateMultipleContacts {
  contacts: CreateContact[]
}

export interface SendEmail {
  to: string
  subject: string
  body: string
  bodyFormat: 'html' | 'markdown'
  trackEmailOpens?: boolean
  trackEmailClicks?: boolean
}

export interface SendEmailToContact {
  contactEmail?: string
  contactEmails?: string[]
  subject: string
  body: string
  bodyFormat: 'html' | 'markdown'
  list: string
  delaySeconds?: number
  delayUntilDate?: string
  trackEmailOpens?: boolean
  trackEmailClicks?: boolean
}

export interface SendEmailToMailingList {
  subject: string
  body: string
  bodyFormat: 'html' | 'markdown'
  list: string
  delaySeconds?: number
  delayUntilDate?: string
  trackEmailOpens?: boolean
  trackEmailClicks?: boolean
}