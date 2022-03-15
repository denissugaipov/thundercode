import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionApiRoute } from '../../core/session'

const salt = Buffer.from(process.env.NEXT_PASSWORD_SALT || '')

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	try {
		if (req.method !== 'GET') {
			throw new Error('Wrong method (GET needed)')
	}
		req.session.destroy()
		res.status(200).send({ isSuccess: true })
	} catch (error) {
		console.error(error)
		res.status(401).send({ isSuccess: false })
	}
}

export default withSessionApiRoute(handler)
