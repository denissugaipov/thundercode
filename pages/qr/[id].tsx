import React, { useEffect } from 'react'
import { GetServerSidePropsContext } from 'next'
import prisma from '../../core/prisma'
import { withSessionRoute } from '../../core/session'
import { useRouter } from 'next/router'
import { QRCode } from 'react-qrcode-logo'
import Logo from '../../components/Logo/Logo'
import s from './Qr.module.scss'

interface IQRUser {
	username: string
}
interface IQRUserObject {
	user: IQRUser
}

const Card = (props: IQRUserObject) => {
	const router = useRouter()
	useEffect(() => {
		if (!props.user) router.push('/404')
	})
	console.log(props)
	return (
		<>
			<Logo />
			<div className={s.Container}>
				{props.user ? (
					<>
						<h1>@tcode/{props.user.username}</h1>
						<div>
							<QRCode
								value={`${process.env.NEXT_HOST}/go/${props.user.username}`}
								fgColor="#344146"
								qrStyle="dots"
								logoImage="/img/thunder.png"
								logoOpacity={0.5}
								logoHeight={96}
								logoWidth={96}
								eyeRadius={50}
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
				) : (
					'Redirecting...'
				)}
			</div>
		</>
	)
}

export const getServerSideProps = withSessionRoute(async function getUsername(context: GetServerSidePropsContext) {
	const { id } = context.query
	const user = await prisma.user.findUnique({
		where: {
			username: String(id),
		},
	})
	return {
		props: { user },
	}
})

export default Card
