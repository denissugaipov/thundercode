import type { Prisma } from '@prisma/client'
import type { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'

import Logo from '../../components/Logo/Logo'
import prisma from '../../core/prisma'
import { withSessionRoute } from '../../core/session'
import { UserDataObject } from '../profile'
import s from './Go.module.scss'

const Card = ({ user }: UserDataObject) => {
	const router = useRouter()

	useEffect(() => {
		if (!user) router.push('/404')
	})

	if (!user) {
		return <span>Redirecting...</span>
	}

	return (
		<>
			<Head>
				<title>
					{'"'}
					{user.username}
					{'"'} card @thundercode
				</title>
			</Head>
			<Logo />
			<div className={s.Container}>
				<div className={s.Content}>
					<div>
						{user.photo ? (
							<Image src={user.photo} width={156} height={156} className="rounded-full object-cover" />
						) : (
							<CgProfile size={64} />
						)}
					</div>

					<h1 className={s.Name}>{user.firstname ? `${user.firstname} ${user.lastname}` : 'Somebody'}</h1>

					<span className="text-slate-400">{user.specify}</span>

					<div className={s.InfoBlock}>
						<h1 className="text-xl">Bio</h1>
						<span className="text-slate-500">
							{user.about ? user.about : `No information about ${user.username} bio`}
						</span>
					</div>

					<div className={s.InfoBlock}>
						<h1 className="text-xl">Contact number</h1>
						<span className="text-slate-500">
							{user.number ? `+${user.number}` : `No information about ${user.username} number`}
						</span>
					</div>

					<div className={s.InfoBlock}>
						<h1 className="text-xl">E-Mail</h1>
						<span className="text-slate-500">
							{user.email ? user.email : `No information about ${user.username} e-mail`}
						</span>
					</div>

					{user.verified && (
						<div className={s.InfoBlock}>
							<div className={s.VerifiedSection}>
								<h1 className="text-xl">Verified</h1>
								<AiFillCheckCircle className="text-green-600" />
							</div>
							<span className="text-slate-500">
								This user is verified by{' '}
								<a
									className="text-sky-600 cursor-pointer"
									onClick={() => {
										router.push('/go/admin')
									}}
								>
									@admin
								</a>
							</span>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export const userSelect: Prisma.UserSelect = {
	username: true,
	about: true,
	number: true,
	email: true,
	photo: true,
	verified: true,
	firstname: true,
	lastname: true,
	specify: true,
	qrEyeRadius: true,
	qrForegroundColor: true,
	qrStyleTheme: true,
}

export const getServerSideProps = withSessionRoute(async (context: GetServerSidePropsContext) => {
	const user = await prisma.user.findUnique({
		select: userSelect,
		where: {
			username: context.query.id?.toString(),
		},
	})
	return {
		props: { user },
	}
})

export default Card
