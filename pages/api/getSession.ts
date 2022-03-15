import { withSessionApiRoute } from "../../core/session";

export default withSessionApiRoute(
  function userRoute(req: any, res: any) {
    res.send({ user: req.session.user })
  }
);