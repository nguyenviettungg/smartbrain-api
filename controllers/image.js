const Clarifai = require("clarifai");

const app = new Clarifai.App({
  // apiKey: "08ad765b02914d639cf7123a6a58c6f3",
  apiKey: "5d2bc45c799a419988389dbd0cacbceb",
});

const handleApiCall = () => (req, res) => {
  app.models
    .predict("c0c0ac362b03416da06ab3fa36fb58e3", req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("unable to work with API"))
};

const handleImage = (postgres) => (req, res) => {
  const { id } = req.body;
  postgres("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      res.status(400).json("unable to get entries");
    });
};

module.exports = {
  handleImage,
  handleApiCall,
};
