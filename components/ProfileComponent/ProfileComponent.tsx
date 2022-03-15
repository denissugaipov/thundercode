import Logo from '../Logo/Logo'
import s from './ProfileComponent.module.scss'
import { useForm } from 'react-hook-form'
import { Widget, FileInfo } from '@uploadcare/react-widget'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { BiExit } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface Inputs {
	number: string
	email: string
	about: string
	specify: string
	image: string
	firstname?: string
	lastname?: string
}

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

interface UserDataObject {
	user: UserData
}

const ProfilePage = ({ user }: UserDataObject) => {
	const router = useRouter()
	useEffect(() => {
		if (!user) router.push('/auth')
	})
	return <>{user ? <ProfileComponent user={user} /> : null}</>
}

const ProfileComponent = ({ user }: UserDataObject) => {
	const router = useRouter()
	const [submitBtn, setSubmitBtn] = useState({
		text: 'Save',
		disabled: false,
		bgColor: 'bg-fuchsia-600',
	})
	const [phoneInput, setPhoneInput] = useState<string>(user.number || '')
	const { register, handleSubmit, setValue } = useForm<Inputs>()
	const onSubmit = handleSubmit(async (data) => {
		const response = await fetch('/api/update', {
			method: 'POST',
			body: JSON.stringify(data),
		})
		const result = await response.json()
		if (result.isSuccess) {
			setSubmitBtn({
				text: 'Complete!',
				disabled: true,
				bgColor: 'bg-green-500 hover:bg-green-600',
			})
			setTimeout(() => {
				setSubmitBtn({
					text: 'Save',
					disabled: false,
					bgColor: 'bg-fuchsia-600',
				})
			}, 2000)
		} else {
			alert('Something goes wrong, try again!')
		}
	})
	async function handleLogout () {
		const response = await fetch('/api/logout')
		router.push('/auth')
		const result = await response.json()
	}
	const handleImage = (fileInfo: FileInfo) => {
		setValue('image', fileInfo.cdnUrl || '')
	}
	return (
		<>
			{user && (
				<>
					<Logo />
					<div className={s.Container}>
						<div className="flex flex-col mt-16">
							<ProfileLabel
								verified={user.verified}
								logout={handleLogout}
								name={user.username as string}
								photo={user.photo as string}
							/>
							<form onSubmit={onSubmit} className={s.Form}>
								<div className={s.Item}>
									<span className="font-light text-slate-700">First name</span>
									<input
										{...register('firstname', { required: true })}
										placeholder="ex. John"
										className={s.Input}
										defaultValue={user.firstname}
									/>
								</div>
								<div className={s.Item}>
									<span className="font-light text-slate-700">Last name</span>
									<input
										{...register('lastname', { required: true })}
										placeholder="ex. Smith"
										className={s.Input}
										defaultValue={user.lastname}
									/>
								</div>
								<div className={s.Item}>
									<span className="font-light text-slate-700">Contact number</span>
									<PhoneInput
										country={'ru'}
										value={phoneInput}
										onChange={(phone) => {
											setPhoneInput(phone)
											setValue('number', phone)
										}}
									/>
								</div>
								<div className={s.Item}>
									<span className="font-light text-slate-700">E-mail</span>
									<input
										{...register('email')}
										defaultValue={user.email}
										className={s.Input}
										placeholder="hook@thundercode.io"
									/>
								</div>
								<div className={s.Item}>
									<span className="font-light text-slate-700">Tell about yourself</span>
									<textarea
										defaultValue={user.about}
										{...register('about')}
										className={s.Input}
										placeholder="Describe your skills and tell about you"
									/>
								</div>
								<div className={s.Item}>
									<span className={s.ItemTitle}>Your specify</span>
									<input
										defaultValue={user.specify}
										{...register('specify')}
										className={s.Input}
										placeholder="ex. Designer"
									/>
								</div>
								<div className={s.ImageItem}>
									<span className={s.ItemTitle}>Profile image</span>
									<Widget publicKey="6aaac42ecf379fac2a76" onChange={handleImage} />
								</div>
								<div className="flex flex-row justify-between py-6">
									<a onClick={() => router.push(`/qr/${user.username}`)} className={s.GoQrButton}>
										Go to QR
									</a>
									<button
										type="submit"
										disabled={submitBtn.disabled}
										className={`${submitBtn.bgColor} ${s.SubmitBtnStyle}`}
									>
										{submitBtn.text}
									</button>
								</div>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	)
}

interface IProfileLabel {
	name: string
	photo: string
	logout: () => void
	verified: boolean
}

const ProfileLabel = ({ name, photo, logout, verified }: IProfileLabel) => {
	return (
		<div className="flex flex-row items-center space-x-6">
			{photo ? <Image src={photo} width={64} height={64} className="rounded-full" /> : <CgProfile size={32} />}
			<div className="flex flex-row space-x-2 items-center">
				<span className="text-2xl">{name}</span>
				{verified && <AiFillCheckCircle className="text-green-700" />}
			</div>
			<BiExit
				size={25}
				onClick={logout}
				className="text-red-700 transition-colors cursor-pointer hover:bg-red-700 hover:text-white"
			/>
		</div>
	)
}
export default ProfileComponent
