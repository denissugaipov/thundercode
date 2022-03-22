import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'

import ProfileComponent from '../components/ProfileComponent/ProfileComponent'
import prisma from '../core/prisma'
import { withSessionRoute } from '../core/session'
import { userSelect } from './go/[id]'
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
	user: UserData | null
}

const ProfilePage = ({ user }: UserDataObject) => {
	const router = useRouter()
	useEffect(() => {
		if (!user) router.push('/auth')
	})
	return <>{user ? <ProfileComponent user={user} /> : null}</>
}

export const getServerSideProps = withSessionRoute(async ({ req }: GetServerSidePropsContext) => {
	const session = req.session
	if (session && session.user) {
		const userdata = await prisma.user.findUnique({
			select: userSelect,
			where: { username: session.user.username },
		})
		return {
			props: {
				user: userdata,
			},
		}
	}
	return {
		props: { user: null },
	}
})

export default ProfilePage
