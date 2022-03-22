import * as argon from 'argon2'
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../core/prisma'
import { withSessionApiRoute } from '../../../core/session'

const salt = Buffer.from(process.env.NEXT_PASSWORD_SALT || '')

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	try {
		if (req.method !== 'POST') {
			throw new Error('Is not POST methoid')
		}
		
		const dto = JSON.parse(req.body)
		const password = await argon.hash(dto.password, { salt })

		await db.user.create({
			data: {
				username: dto.username,
				password,
			},
		})
		res.status(200).send({ isSuccess: true })
	} catch (error) {
		console.error(error)
		res.status(401).send({ isSuccess: false })
	}
}

export default withSessionApiRoute(handler)
