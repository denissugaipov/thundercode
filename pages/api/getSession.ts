import { NextApiRequest, NextApiResponse } from "next";

import { withSessionApiRoute } from "../../core/session";

export default withSessionApiRoute(
  function userRoute(req: NextApiRequest, res: NextApiResponse) {
    res.send({ user: req.session.user })
  }
);