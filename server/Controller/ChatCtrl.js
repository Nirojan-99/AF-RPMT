const ChatModel = require("../Model/ChatModel");

exports.GetLastDate = (req, res) => {
  const { group_id } = req.params;

  ChatModel.findOne({ group_id: group_id }, {}, { sort: { createdAt: -1 } })
    .then((data) => {
      return res.status(200).json(data.createdAt);
    })
    .catch((er) => {
      return res.status(404).json({ fetched: false });
    });
};

exports.SendMessage = (req, res) => {
  const { group_id, user_id } = req.params;
  const { message } = req.body;

  const newMsg = new ChatModel({ group_id, sender: user_id, message });

  newMsg
    .save()
    .then((data) => {
      return res.status(200).json({ send: true });
    })
    .catch((er) => {
      console.log(er);
      return res.status(404).json({ send: false });
    });
};

exports.GetGroupMessage = (req, res) => {
  const { group_id, user_id } = req.params;

  ChatModel.find({ group_id: group_id })
    .populate({
      path: "group_id",
      select: "name",
    })
    .populate({ path: "sender", select: "name" })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((er) => {
      return res.status(404).json({ fetched: false });
    });
};
