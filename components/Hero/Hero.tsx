import Image from 'next/image'
import { useRouter } from 'next/router'
import { generateSlug } from 'random-word-slugs'
import React from 'react'
import { useEffect, useState } from 'react'
import { QRCode } from 'react-qrcode-logo'

import s from './Hero.module.scss'
const Hero = () => {
	const router = useRouter()
	const [qrValue, setQrValue] = useState<string>('thundercode')
	useEffect(() => {
		const interval = setInterval(() => {
			setQrValue(generateSlug(1))
		}, 1000)
		return () => clearInterval(interval)
	}, [])
	return (
		<div className={s.Container}>
			<div className={s.Logo}>
				<h1 className="sm:text-5xl text-3xl">thundercode</h1>
				<Image src="/img/logo.png" height={50} width={50} />
			</div>
			<h1 className={s.Description}>Create visit card with QR in 3 minutes</h1>
			<div className={s.ButtonGroup}>
				<button
					onClick={() => {
						router.push('/profile')
					}}
					className={`${s.Button} ${s.Fuchsia}`}
				>
					Get now
				</button>
				<a href="https://github.com/dolsowsky/thundercode" className={`${s.Button} ${s.Yellow}`}>
					Github
				</a>
			</div>
			<QRCode
				value={qrValue}
				fgColor="#344146"
				qrStyle="dots"
				logoImage="/img/thunder.png"
				logoOpacity={0.5}
				logoHeight={96}
				logoWidth={96}
				eyeRadius={50}
			/>
		</div>
	)
}

export default Hero
