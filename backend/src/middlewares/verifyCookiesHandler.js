export const verifyToken = (req, res, next) => {
  const tokens = req.cookies;
  if (!tokens || tokens === undefined) {
    res.status(401).json({
      ok: false,
      body: "token es requerido",
    });
  } else {
    // console.log(tokens.jwt);
    req.body.access_token = tokens.jwt;
    next();
  }
  //   const access_token = tokens.split(" ")[1];
  //   req.body.access_token = access_token;
  //   next();
  // if (!tokens || tokens === undefined) {
  //   throw new DevErr(79401, "Bearer token is required", 401);
  // } else {
  //   const bearerToken = tokens.split(" ")[1];
  //   req.body.bearerToken = bearerToken;
  //   next();
  // }
};
