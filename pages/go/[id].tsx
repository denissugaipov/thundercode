import React, { useEffect } from 'react'
import { NextApiRequest, GetServerSideProps, GetServerSidePropsContext } from 'next'
import prisma from '../../core/prisma'
import { withSessionRoute } from '../../core/session'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Logo from '../../components/Logo/Logo'
import { CgProfile } from 'react-icons/cg'
import { AiFillCheckCircle } from 'react-icons/ai'
import s from './Go.module.scss'
import { UserDataObject } from '../profile'

const Card = ({ user }: UserDataObject) => {
	const router = useRouter()
	useEffect(() => {
		if (!user) router.push('/404')
	})
	console.log(user)

	return (
		<>
			<Logo />
			{user ? (
				<>
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
									{user.number ? user.number : `No information about ${user.username} number`}
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
			) : (
				'Redirecting...'
			)}
		</>
	)
}

export const getServerSideProps = withSessionRoute(async function getUserData(context: GetServerSidePropsContext) {
	const { id } = context.query
	const user = await prisma.user.findUnique({
		where: {
			username: String(id),
		},
		select: {
			username: true,
			about: true,
			number: true,
			email: true,
			photo: true,
			verified: true,
			firstname: true,
			lastname: true,
			specify: true,
		},
	})
	return {
		props: { user },
	}
})

export default Card
