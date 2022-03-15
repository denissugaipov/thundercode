import { withSessionRoute } from '../core/session'
import prisma from '../core/prisma'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ProfileComponent from '../components/ProfileComponent/ProfileComponent'
export interface UserData {
	id?: string
	username?: string
	specify?: string
	about?: string
	email?: string
	number?: string
	photo?: string
	verified: boolean
	firstname?: string
	lastname?: string
}

export interface UserDataObject {
	user: UserData
}

const ProfilePage = ({ user }: UserDataObject) => {
	const router = useRouter()
	useEffect(() => {
		if (!user) router.push('/auth')
	})
	return <>{user ? <ProfileComponent user={user} /> : null}</>
}

export const getServerSideProps = withSessionRoute(async function getUser({ req }: any) {
	const session = req.session
	console.log(req)
	if (session && session.user) {
		const userdata = await prisma.user.findUnique({
			select: {
				id: true,
				username: true,
				specify: true,
				about: true,
				email: true,
				number: true,
				photo: true,
				verified: true,
				firstname: true,
				lastname: true,
			},
			where: { username: session.user.username },
		})
		return {
			props: {
				user: userdata,
			},
		}
	}
	return {
		props: { userdata: null },
	}
})

export default ProfilePage
