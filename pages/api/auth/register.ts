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
		// console.log(req.body.username, 111)
		const dto = JSON.parse(req.body)

		// api/cocktails/favorite
		//     const isCocktailFavorited = db.user.findFirst({
		//         where: {id: req.session.user.id, favoriteCocktails: {
		//             some: {
		//                 id: req.body.cocktailId
		//             }
		//         }}
		//     })
		//     if(isCocktailFavorited) {
		//         await db.user.update({
		//             where: { id: req.session.user.id },
		//             data: {
		//               favoriteCocktails: {
		//                 disconnect: {
		//                   id: req.body.cocktailId,
		//                 },
		//               },
		//             },
		//           })
		//     } else {
		//     await db.user.update({
		//       where: { id: req.session.user.id },
		//       data: {
		//         favoriteCocktails: {
		//           connect: {
		//             id: req.body.cocktailId,
		//           },
		//         },
		//       },
		//     })
		// }

		// /cocktails/submit
		// const createdCocktail = await db.cocktail.create({
		//     data: {
		//         'authorId': req.session.user.id,
		//         ''
		//     }
		// })

		// /users/[id]

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
