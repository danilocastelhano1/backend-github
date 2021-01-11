const express = require("express");
const superagent = require("superagent");
var router = express.Router();

router.post("/gettoken/", (req, res) => {
  if (req.body.code) {
    superagent
      .post("https://github.com/login/oauth/access_token")
      .send({
        client_id: "Iv1.81c2b39a91238234",
        code: req.body.code,
        client_secret: "e8d5f7d56c727e2cf4517764e4ab6525669c5494",
      })
      .set("Accept", "application/json")
      .then((result) => {
        if (result.body.access_token) {
          //get profile
          superagent
            .get("https://api.github.com/user")
            .set("user-agent", "node.js")
            .set("Authorization", "token " + result.body.access_token)
            .then((profile) => {
              res.status(200).json(profile.body);
            })
            .catch((err) => {
              res.status(200).json({ Error: err });
            });
        } else {
          res.status(200).json({ Error: result.body });
        }
      });
  } else {
    res.status(400).json({ Error: "Code is Invalid" });
  }
});

module.exports = router;
