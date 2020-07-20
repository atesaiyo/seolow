const bodyRequired = (req, res, next) => {
  if (req.body) return next();
  console.log(req.body);

  return res.status(400).json({ message: "No sending product found!!!" });
};

const loginRequired = (req, res, next) => {
  if (req.user) return next();
  return res.status(401).json({ message: "Unauthorized user!!!" });
};

const adminRequired = (req, res, next) => {
  if (req.user) if (req.user.admin) return next();
  res.status(403).json({ message: "You are not an admin!!!" });
};

const userRequired = (req, res, next) => {
  if (req.user && req.body)
    if (req.user.admin || req.user.username === req.body.username)
      return next();
  res.status(400).json({ message: "Access denied!!!" });
};

module.exports = { bodyRequired, loginRequired, adminRequired, userRequired };
