import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../core/prisma'
import { withSessionApiRoute } from '../../core/session'

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	try {
		if (req.method !== 'POST') {
			throw new Error('Wrong method (POST needed)')
		}
		const dto = JSON.parse(req.body)
		const user = await db.user.update({
			where: { username: req.session.user?.username },
			data: {
				specify: dto.specify,
				number: dto.number,
				email: dto.email,
				about: dto.about,
				photo: dto.image,
				firstname: dto.firstname,
				lastname: dto.lastname
			},
		})
		res.status(200).send({ isSuccess: true })
	} catch (error) {
		console.error(error)
		res.status(401).send({ isSuccess: false })
	}
}

export default withSessionApiRoute(handler)
