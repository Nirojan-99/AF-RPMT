const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const UserModel = require("../Model/UserModel");
const GroupModel = require("../Model/GroupModel");
const { mailSender } = require("../Utils/mailSender");

//user login
exports.Login = (req, res) => {
  //incomming data
  const { email, password } = req.body;

  UserModel.findOne({ email }, { role: 1, email: 1, password: 1 })
    .then((data) => {
      //compare password
      if (data._id) {
        const result = bcrypt.compareSync(password, data.password);

        if (result) {
          //generate token
          const token = jwt.sign(
            { userID: data._id, email: data.email },
            "rpmtvalidation",
            { expiresIn: "2h" }
          );

          return res
            .status(200)
            .json({ auth: true, token, role: data.role, _id: data._id });
        }
      } else {
        return res.status(404).json({ auth: false });
      }
    })
    .catch((er) => {
      return res.status(404).json({ auth: false });
    });
};

//get single user data
exports.GetUser = (req, res) => {
  //incomming data
  const { _id } = req.params;

  UserModel.findById({ _id }, { password: 0 })
    .then((data) => {
      return res.status(200).json(data._doc);
    })
    .catch((er) => {
      return res.status(404).json({ fetched: false });
    });
};

//update user
exports.UpdateUser = (req, res) => {
  //incomming data
  const { _id } = req.params;
  const {
    name,
    mobile_number,
    password,
    role,
    NIC,
    gender,
    bio,
    address,
    DOB,
  } = req.body;

  if (password) {
    const password = bcrypt.hashSync(password, 12);
  }

  UserModel.findByIdAndUpdate(
    { _id },
    { name, mobile_number, password, role, NIC, gender, bio, address, DOB }
  )
    .then((data) => {
      return res.status(200).json({ updated: true });
    })
    .catch((er) => {
      return res.status(404).json({ updated: false });
    });
};

//delete user
exports.DeleteUser = (req, res) => {
  const { _id } = req.params;

  UserModel.deleteOne({ _id: _id })
    .then((data) => {
      return res.status(200).json({ deleted: true });
    })
    .catch((er) => {
      return res.status(404).json({ deleted: false });
    });
};

//check email exist
exports.CheckEmail = (req, res) => {
  const { email } = req.params;

  const OTP = Math.floor(1000 + Math.random() * 9000);

  UserModel.findOneAndUpdate({ email }, { $set: { OTP } })
    .then((data) => {
      if (data.email) {
        const to = data.email;
        const subject = "Reset Your Password";
        const text = `Please enter OTP : <b>${OTP}</b> to complete your password reset request.<br/>Thank you`;
        //send otp to mail
        const val = mailSender(to, subject, text);

        return res.status(200).json({ exist: true, _id: data._id });
      } else {
        return res.status(404).json({ exist: false });
      }
    })
    .catch((er) => {
      console.log(er);
      return res.status(404).json({ exist: false });
    });
};

//check OTP
exports.CheckOTP = (req, res) => {
  const { _id } = req.params;
  const { OTP } = req.body;

  UserModel.findById({ _id }, { OTP: 1 })
    .then((data) => {
      if (data.OTP == OTP) {
        UserModel.findByIdAndUpdate({ _id }, { OTP: 0 });

        return res.status(200).json({ match: true });
      }
    })
    .catch((er) => {
      return res.status(404).json({ match: false });
    });
};

//change password
exports.ChangePassword = (req, res) => {
  const { _id } = req.params;
  const { password, newPassword } = req.body;

  UserModel.findById({ _id }, { password: 1 })
    .then((data) => {
      if (data.password) {
        const result = bcrypt.compareSync(password, data.password);
        if (result) {
          const hash = bcrypt.hashSync(newPassword, 12);

          UserModel.findByIdAndUpdate({ _id }, { password: hash })
            .then((data) => {
              return res.status(200).json({ updated: true });
            })
            .catch((er) => {
              return res.status(404).json({ updated: false });
            });
        } else {
          return res.status(404).json({ updated: false });
        }
      } else {
        return res.status(404).json({ updated: false });
      }
    })
    .catch((er) => {
      return res.status(404).json({ updated: false });
    });
};

//reset password
exports.ResetPassword = (req, res) => {
  const { _id } = req.params;
  const { newPassword } = req.body;

  const hash = bcrypt.hashSync(newPassword, 12);

  UserModel.findByIdAndUpdate({ _id }, { password: hash })
    .then((data) => {
      return res.status(200).json({ updated: true });
    })
    .catch((er) => {
      return res.status(404).json({ updated: false });
    });
};

//update dp
exports.UpdateDp = (req, res) => {
  //coming data
  const { _id } = req.params;
  const date = Date.now();

  if (req.files) {
    let fileToUpload = req.files.dp;
    const fileName = _id + date + fileToUpload.name;

    UserModel.findById({ _id }, { dp: 1 }).then((data) => {
      if (data.dp) {
        const path = data.dp.split("http://localhost:5000/")[1];
        fs.unlink(path, (er) => {
          if (er) {
            console.log(er);
          }
        });
      }
      //add new
      fileToUpload.mv("Uploads/" + fileName, (error) => {
        if (error) {
          console.log(error);
          return res.status(404).json({ updated: false });
        } else {
          const link = "http://localhost:5000/Uploads/" + fileName;
          UserModel.findByIdAndUpdate({ _id }, { dp: link })
            .then((data) => {
              return res.status(200).json({ updated: true });
            })
            .catch((er) => {
              return res.status(404).json({ updated: false });
            });
        }
      });
    });
  } else {
    return res.status(404).json({ updated: false });
  }
};

//remove dp
exports.RemoveDp = (req, res) => {
  const { _id } = req.params;
  UserModel.findByIdAndUpdate({ _id }, { dp: "" }).then((data) => {
    if (data.dp) {
      const path = data.dp.split("http://localhost:5000/")[1];
      fs.unlink(path, (er) => {
        if (er) {
          console.log(er);
        }
      });
      return res.status(200).json({ deleted: true });
    } else {
      return res.status(404).json({ deleted: false });
    }
  });
};

//remove dp
exports.RemoveDp = (req, res) => {
  const { _id } = req.params;
  UserModel.findByIdAndUpdate({ _id }, { dp: "" }).then((data) => {
    if (data.dp) {
      const path = data.dp.split("http://localhost:5000/")[1];
      fs.unlink(path, (er) => {
        if (er) {
          console.log(er);
        }
      });
      return res.status(200).json({ deleted: true });
    } else {
      return res.status(404).json({ deleted: false });
    }
  });
};
