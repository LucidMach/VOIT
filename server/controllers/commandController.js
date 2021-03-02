// states
var commandState = null;

module.exports.postCommand = (req, res) => {
  const command = req.body.command;
  console.log(command);
  commandState = command;
  res.status(201).json({ status: "ACCEPTED" });
};

module.exports.getCommand = (req, res) => {
  res.status(201).send(commandState);
};
