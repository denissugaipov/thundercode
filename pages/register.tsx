import RegisterComponent from '../components/RegisterComponent/RegisterComponent'
import { withSessionRoute } from '../core/session'
import prisma from '../core/prisma'
import { GetServerSidePropsContext, NextApiRequest } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const RegisterPage = ({ session }: any) => {
	const router = useRouter()
	useEffect(() => {
		if (session.user) router.push('/profile')
	})
	return <>{!session ? 'Redirecting...' : <RegisterComponent />}</>
}

export default RegisterPage

export const getServerSideProps = withSessionRoute(async function getUserData({ req }: any) {
	console.log(req)
	return {
		props: { session: req.session },
	}
})
