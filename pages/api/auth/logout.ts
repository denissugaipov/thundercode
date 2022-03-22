import type { NextApiRequest, NextApiResponse } from 'next'

import { withSessionApiRoute } from '../../../core/session'

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	try {
		if (req.method !== 'GET') {
			throw new Error('Is not POST methoid')
		}
		req.session.destroy()
		res.status(200).send({ isSuccess: true })
	} catch (error) {
		console.error(error)
		res.status(401).send({ isSuccess: false })
	}
}

export default withSessionApiRoute(handler)
