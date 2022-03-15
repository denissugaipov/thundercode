import { withSessionRoute } from '../core/session'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import AuthComponent from '../components/AuthComponent/AuthComponent'

const AuthPage = ({ session }: any) => {
	const router = useRouter()
	useEffect(() => {
		if (session.user) router.push('/profile')
	})
	return <>{session.username ? 'Redirecting...' : <AuthComponent />}</>
}

export default AuthPage

export const getServerSideProps = withSessionRoute(async function getUserData({ req }: any) {
	console.log(req)
	return {
		props: { session: req.session },
	}
})
