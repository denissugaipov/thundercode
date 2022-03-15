import type { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

export interface AuthData {
  id: string
  username: string
}

export const sessionOptions: IronSessionOptions = {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'iron_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export function withSessionApiRoute(handler: any) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionRoute(handler: any) {
  return withIronSessionSsr(handler, sessionOptions)
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: AuthData
  }
}
