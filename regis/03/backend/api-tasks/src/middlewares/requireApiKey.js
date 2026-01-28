// Middleware simples para checar API Key
module.exports = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (apiKey && apiKey === '123456') {
    next();
  } else {
    res.status(401).json({ error: 'API Key inválida ou ausente' });
  }
};
