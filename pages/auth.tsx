import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'

import AuthComponent from '../components/AuthComponent/AuthComponent'
import { withSessionRoute } from '../core/session'

interface SessionUserData {
	id: string
	username: string
}

interface SessionUser {
	user: SessionUserData
}

export interface ISession {
	session: SessionUser
}

const AuthPage = ({ session }: ISession) => {
	const router = useRouter()
	useEffect(() => {
		if (session.user) router.push('/profile')
	})
	return <>{session.user ? 'Redirecting...' : <AuthComponent />}</>
}

export default AuthPage

export const getServerSideProps = withSessionRoute(async ({ req }: GetServerSidePropsContext) => {
	console.log(req)
	return {
		props: { session: req.session },
	}
})
