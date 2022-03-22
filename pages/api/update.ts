import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../core/prisma'
import { withSessionApiRoute } from '../../core/session'

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	try {
		if (req.method !== 'POST') {
			throw new Error('Wrong method (POST needed)')
		}
		const data = JSON.parse(req.body)
		await db.user.update({
			where: { username: req.session.user?.username },
			data: {
				specify: data.specify,
				number: data.number,
				email: data.email,
				about: data.about,
				photo: data.image,
				firstname: data.firstname,
				lastname: data.lastname,
				qrEyeRadius: data.qrEyeRadius,
				qrForegroundColor: data.qrForegroundColor,
			},
		})
		res.status(200).send({ isSuccess: true })
	} catch (error) {
		console.error(error)
		res.status(401).send({ isSuccess: false })
	}
}

export default withSessionApiRoute(handler)
