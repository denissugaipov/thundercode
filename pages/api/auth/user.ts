import type { NextApiRequest, NextApiResponse } from 'next'

import { withSessionApiRoute } from '../../../core/session'

export default withSessionApiRoute(async function userRoute(req: NextApiRequest, res: NextApiResponse) {
	if (req.session.user) {
		res.send({
			user: req.session.user,
		})
	} else {
		res.send({
			user: { username: false },
		})
	}
})
