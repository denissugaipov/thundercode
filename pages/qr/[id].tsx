import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { QRCode } from 'react-qrcode-logo'

import Logo from '../../components/Logo/Logo'
import prisma from '../../core/prisma'
import { withSessionRoute } from '../../core/session'
import s from './Qr.module.scss'

interface IQRUser {
	username: string
	qrForegroundColor: string
	qrEyeRadius: number
}
interface IQRUserObject {
	user: IQRUser
}

const Card = (props: IQRUserObject) => {
	const router = useRouter()
	useEffect(() => {
		if (!props.user) router.push('/404')
	})
	if (!props.user) {
		return <span>Redirecting...</span>
	}
	return (
		<>
			<Head>
				<title>
					{'"'}
					{props.user.username}
					{'"'} QR-code @thundercode
				</title>
			</Head>
			<Logo />
			<div className={s.Container}>
				<>
					<h1>@tcode/{props.user.username}</h1>
					<div>
						<QRCode
							value={`${process.env.NEXT_HOST}/go/${props.user.username}`}
							fgColor={props.user.qrForegroundColor}
							qrStyle="dots"
							logoImage="/img/thunder.png"
							logoOpacity={0.5}
							logoHeight={96}
							logoWidth={96}
							eyeRadius={props.user.qrEyeRadius}
						/>
					</div>
					<a
						onClick={() => {
							router.push(`/go/${props.user.username}`)
						}}
						className={s.OpenBtn}
					>
						Open as link
					</a>
				</>
			</div>
		</>
	)
}

export const getServerSideProps = withSessionRoute(async function getUsername(context: GetServerSidePropsContext) {
	const user = await prisma.user.findUnique({
		where: {
			username: context.query.id?.toString(),
		},
		select: {
			username: true,
			qrEyeRadius: true,
			qrForegroundColor: true,
		},
	})
	return {
		props: { user },
	}
})

export default Card
