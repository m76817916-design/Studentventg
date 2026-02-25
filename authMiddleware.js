exports.protect = (req, res, next) => {
  const user = { role: "admin" }; // Temporary admin (replace with real auth)

  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  req.user = user;
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};