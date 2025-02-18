import DevErr from "../utils/DevErrHandler";

const genErr = async (err, req, res, next) => {
  if (err instanceof DevErr) {
    return res.status(err.statusCode).json({
      devErr: err.devErr,
      status: err.status,
      ok: false,
      body: null,
      errors: [{ msg: err.message }],
    });
  }

  if (err.statusCode === undefined) {
    return res.status(500).json({
      status: "Error interno de servidor",
      ok: false,
      body: null,
      errors: [{ msg: err.errors[0].message }],
    });
  }

  res.status(err.statusCode).json({
    status: "Error interno de servidor",
    ok: false,
    body: null,
    errors: [{ msg: err.message }],
  });
};

export default genErr;
