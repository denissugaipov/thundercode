import type { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import { GetServerSidePropsContext,GetServerSidePropsResult, NextApiHandler,   } from 'next'

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

export function withSessionApiRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionRoute<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: AuthData
  }
}
