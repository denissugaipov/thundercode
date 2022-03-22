import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import React from 'react'

import RegisterComponent from '../components/RegisterComponent/RegisterComponent'
import { withSessionRoute } from '../core/session'
import { ISession } from './auth'

const RegisterPage = ({ session }: ISession) => {
	const router = useRouter()
	useEffect(() => {
		if (session.user) router.push('/profile')
	})
	return <>{!session ? 'Redirecting...' : <RegisterComponent />}</>
}

export default RegisterPage

export const getServerSideProps = withSessionRoute(async ({ req }: GetServerSidePropsContext) => {
	console.log(req)
	return {
		props: { session: req.session },
	}
})
