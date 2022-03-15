import * as argon from 'argon2'
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../core/prisma'
import { withSessionApiRoute } from '../../../core/session'

const salt = Buffer.from(process.env.NEXT_PASSWORD_SALT || '')

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	try {
		if (req.method !== 'GET') {
			throw new Error('Is not POST methoid')
		}

		// const user = await db.user.findUnique({
		//   where: { username: dto.username },
		//   select: { id: true, password: true, username: true },
		//   rejectOnNotFound: true,
		// })
		// const isValidPassword = await argon.verify(user.password, dto.password, {
		//   salt,
		// })
		// if (!isValidPassword) {
		//   throw new Error('Password not match')
		// }

		req.session.destroy()

		res.status(200).send({ isSuccess: true })
	} catch (error) {
		console.error(error)
		res.status(401).send({ isSuccess: false })
	}
}

export default withSessionApiRoute(handler)
