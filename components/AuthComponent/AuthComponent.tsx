import Logo from '../Logo/Logo'
import s from './AuthComponent.module.scss'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

interface Inputs {
	username: string
	password: string
}

const AuthComponent = () => {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const [error, setError] = useState<boolean>(false)
	const onSubmit = handleSubmit(async (data) => {
		console.log(data)
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify(data),
		})
		const result = await response.json()
		if (result.isSuccess) {
			router.push('/profile')
			setError(false)
		} else {
			setError(true)
		}
	})
	return (
		<>
			<Logo />
			<div className={s.Container}>
				<form onSubmit={onSubmit} className={s.Content}>
					<h1 className={s.Heading}>Auth</h1>
					<div className="flex flex-col space-y-2">
						<div className="flex flex-col">
							<span className="font-light text-slate-700">Username or e-mail</span>
							<input {...register('username', { required: true })} className={s.Input} placeholder="Login" />
							{errors.username && <span className="text-red-700">This field is required</span>}
						</div>
						<div className="flex flex-col">
							<span className="font-light text-slate-700">Password</span>
							<input
								{...register('password', { required: true })}
								className={s.Input}
								type="password"
								placeholder="Password"
							/>
							{errors.password && <span className="text-red-700">This field is required</span>}
						</div>
						{error && <span className="text-red-700">Incorrect password or login</span>}
					</div>
					<div className={s.Actions}>
						<a href="/register" className={s.Link}>
							No account yet?
						</a>
						<button type="submit" className={s.AuthButton}>
							Login
						</button>
					</div>
				</form>
			</div>
		</>
	)
}
export default AuthComponent
