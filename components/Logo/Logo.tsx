import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import s from './Logo.module.scss'
const Logo = () => {
	const router = useRouter()
	return (
		<div
			className={s.LogoGroup}
			onClick={() => {
				router.push('/')
			}}
		>
			<span className={s.LogoLabel}>thundercode</span>
			<Image width={32} height={32} src="/img/logo.png" />
		</div>
	)
}
export default Logo
