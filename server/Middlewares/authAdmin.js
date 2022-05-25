exports.authAdmin = (req, res, next) => {
    if (req.role !== "Admin") {
      res.status(400).json({ auth: "fail" });
      return;
    }
    next();
  };
  
  exports.authStaff= (req, res, next) => {
    if (req.role !== "Staff") {
      res.status(400).json({ auth: "fail" });
      return;
    }
    next();
  };
  
  