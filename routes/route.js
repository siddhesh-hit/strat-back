const conn = require("../config");
const router = require("express").Router();
const EmailService = require("../middleware/Emailservice");
const dateTime = require("node-datetime");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

router.post("/list_dt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const data = req.body.list_id;
  conn.query("SELECT * FROM lists", function (err, result) {});
});

router.post("/subscriptiondt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const user_id = req.body.userid;
  conn.query(
    "SELECT * FROM `subscription` WHERE `user_id` ='" + user_id + "'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/delcartdt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const cart_id = req.body.cart_id;
  conn.query(
    "DELETE FROM cart where cart_id ='" + cart_id + "'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/cartdt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const uid = req.body.userid;
  const list_id = req.body.list_id;
  conn.query(
    "INSERT INTO `cart` (`cart_user_id`, `cart_list_id`) VALUES  ('" +
      uid +
      "','" +
      list_id +
      "')",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/checkdt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const uid = req.body.userid;
  const list_id = req.body.list_id;
  conn.query(
    "select * from cart where cart_user_id ='" +
      uid +
      "' AND cart_list_id ='" +
      list_id +
      "'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/cartcnt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const uid = req.body.userid;
  conn.query(
    "SELECT COUNT(*) AS 'cart_cnt' FROM `cart` WHERE `cart_user_id` = '" +
      uid +
      "'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/checkdata", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const uid = req.body.userid;
  conn.query(
    "SELECT GROUP_CONCAT(`cart_list_id`) AS 'list_id' FROM `cart` WHERE `cart_user_id` ='" +
      uid +
      "'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/listdt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const list_id = req.body.list_id;
  conn.query(
    "select * from `lists` where `lists`.`id` IN (" + list_id + ")",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/filesdt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const list_id = req.body.list_id;
  conn.query(
    "select * from `files_related_morphs` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` where `files_related_morphs`.`related_id` = '" +
      list_id +
      "'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.get("/all_platforms", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query(
    "SELECT `url`,`text`,`description` FROM `platform` LEFT JOIN `channels` ON `platform`.`channel_id` = `channels`.`id` LEFT JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` WHERE `all` = '1' AND `related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'icon'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.get("/sm_platforms", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query(
    "SELECT `url`,`text`,`description` FROM `platform` LEFT JOIN `channels` ON `platform`.`channel_id` = `channels`.`id` LEFT JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` WHERE `social_media` = '1' AND `related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'icon'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.get("/cp_platforms", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query(
    "SELECT `url`,`text`,`description` FROM `platform` LEFT JOIN `channels` ON `platform`.`channel_id` = `channels`.`id` LEFT JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` WHERE `copywriting` = '1' AND `related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'icon'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.get("/seo_platforms", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query(
    "SELECT `url`,`text`,`description` FROM `platform` LEFT JOIN `channels` ON `platform`.`channel_id` = `channels`.`id` LEFT JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` WHERE `seo` = '1' AND `related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'icon'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.get("/ecom_platforms", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query(
    "SELECT `url`,`text`,`description` FROM `platform` LEFT JOIN `channels` ON `platform`.`channel_id` = `channels`.`id` LEFT JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` WHERE `ecommerce` = '1' AND `related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'icon'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.get("/oth_platforms", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query(
    "SELECT `url`,`text`,`description` FROM `platform` LEFT JOIN `channels` ON `platform`.`channel_id` = `channels`.`id` LEFT JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` WHERE `others` = '1' AND `related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'icon'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.get("/pf_dt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query(
    "SELECT `channels`.`id`,`text`,`url`,`description` FROM `channels` LEFT JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` LEFT JOIN `platform` ON `channels`.`id` = `platform`.`channel_id` WHERE `files_related_morphs`.`related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'icon' AND `channels`.`id` NOT IN (5,21,26)",
    function (err, result) {
      res.json(result);
    }
  );
});

router.post("/purchaseplat", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const cid = req.body.value;
  const session_id = req.body.rString;
  conn.query(
    "INSERT INTO `platform_purchase` (`platform_purchase_channel_id`, `platform_purchase_session_id`) VALUES  ('" +
      cid +
      "','" +
      session_id +
      "')",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/ps_cnt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const unid = req.body.str;
  conn.query(
    "SELECT COUNT(*) AS 'selected_count' FROM `platform_purchase` WHERE `platform_purchase_session_id` LIKE '" +
      unid +
      "'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/checkpt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const str = req.body.str;
  const chanid = req.body.chanid;
  conn.query(
    "SELECT * FROM `platform_purchase` WHERE `platform_purchase_channel_id` ='" +
      chanid +
      "' AND `platform_purchase_session_id` ='" +
      str +
      "'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/delpt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const id = req.body.value;
  conn.query(
    "DELETE FROM `platform_purchase` where `platform_purchase_id` ='" +
      id +
      "'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/mdt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const mid = req.body.mid;
  conn.query(
    "SELECT * FROM `mediums_channel_links` WHERE `medium_id` ='" + mid + "'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/cdt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const cid = req.body.cid;
  conn.query(
    "SELECT `files`.`url` FROM `channels` LEFT JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` LEFT JOIN `platform` ON `channels`.`id` = `platform`.`channel_id` WHERE `files_related_morphs`.`related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'banner' AND `channels`.`id` ='" +
      cid +
      "'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/subscription", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const user_id = req.body.user_id;
  const plan_name = req.body.plan_name;
  const platforms = req.body.platforms;
  const transaction_id = req.body.transaction_id;
  const amount = req.body.amount;
  conn.query(
    "INSERT INTO `subscription` (`user_id`, `plan_name`, `platforms`, `transaction_id`, `amount`) VALUES  ('" +
      user_id +
      "','" +
      plan_name +
      "','" +
      platforms +
      "','" +
      transaction_id +
      "','" +
      amount +
      "')",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/forgot", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query(insert);
  const email = req.body.email;
  try {
    const user = await conn.query(
      "select * from up_users where email ='" + email + "'",
      (err, result) => {
        console.log(result);
        if (email) {
          const link = `http://localhost:3000/#/ResetPassword?id=${60}`;
          EmailService(email, link);
          return res.send("password reset link sent to your email account");
          alert(res);
        } else {
          return res.status(400).send("user with given email doesn't exist");
        }
      }
    );
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

router.post("/reset", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const { id, password } = req.body;
  try {
    const user = await conn.query(
      "UPDATE up_users SET password= '" +
        password +
        "' where id = '" +
        id +
        "'",
      (err, result) => {
        console.log(result);
        if (result) res.status(200).send("Password is Set Successfully");
        if (!result) res.status(401).send("Something is wrong");
      }
    );
  } catch (error) {
    res.status(500).send("Something is wrong");
  }
});

router.post("/register", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const username = req.body.username;
  const email = req.body.email;
  const password = md5(req.body.password);
  console.log(username, email, password, "checking the register");
  var dt = dateTime.create();
  var formatted = dt.format("Y-m-d H:M:S");
  conn.query(
    "select * from `up_users` where `up_users`.`email` = '" + email + "'",
    (err, result) => {
      if (result != "") {
        res.json(result);
      } else {
        conn.query(
          "INSERT INTO up_users (`username`, `provider`, `email`, `password`, `confirmed`, `blocked`,`created_at`) VALUES ('" +
            username +
            "','local','" +
            email +
            "','" +
            password +
            "','1','0','" +
            formatted +
            "')",
          (err, result1) => {
            res.json(result1);
          }
        );
      }
    }
  );
});

router.post("/add_user_role_link", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const user_id = req.body.uid;
  conn.query(
    "INSERT INTO `up_users_role_links` (`user_id`, `role_id`) VALUES  ('" +
      user_id +
      "','1')",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  const identifier = req.body.identifier;
  const password = md5(req.body.password);
  conn.query(
    "SELECT * FROM `up_users` WHERE `email` ='" +
      identifier +
      "' AND `password` ='" +
      password +
      "'",
    (err, results) => {
      if (results != "") {
        var data = JSON.stringify(results);
        var secret = "TOPSECRETTTTT";
        var now = Math.floor(Date.now() / 1000),
          iat = now - 10,
          expiresIn = 3600,
          expr = now + expiresIn,
          notBefore = now - 10,
          jwtId = Math.random().toString(36).substring(7);
        var payload = {
          iat: iat,
          jwtid: jwtId,
          audience: "TEST",
          data: data,
        };

        jwt.sign(
          payload,
          secret,
          { algorithm: "HS256", expiresIn: expiresIn },
          function (err, token) {
            if (err) {
              res.json({
                results: {
                  status: false,
                  msg: "Error occurred while generating token",
                },
              });
            } else {
              if (token != false) {
                res.header();
                res.json({
                  results: { status: true, jwt: token, user: results[0] },
                });
                res.end();
              } else {
                res.json({
                  results: { status: false, msg: "Could not create token" },
                });
                res.end();
              }
            }
          }
        );
      } else if (results == "") {
        res.json({
          results: { status: false, msg: "Not found User!" },
        });
        res.end();
      }
    }
  );
});

router.post("/getplatformdt", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const unid = req.body.str;
  conn.query(
    "SELECT GROUP_CONCAT(`platform_purchase_channel_id`) AS 'channel_id' FROM `platform_purchase` WHERE `platform_purchase_session_id` LIKE '" +
      unid +
      "'",
    (err, result) => {
      res.json(result);
    }
  );
});

router.post("/channels", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const platform_id = req.body.platform_id;
  if (platform_id != 0) {
    conn.query(
      "SELECT `channels`.`id`, `channels`.`text`, `files`.`ext`, `files`.`url` FROM `channels` LEFT JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` WHERE `files_related_morphs`.`related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'icon' AND `channels`.`id` IN (" +
        platform_id +
        ") ORDER BY `channels`.`id` ASC",
      (err, result) => {
        res.json(result);
      }
    );
  } else {
    conn.query(
      "SELECT `channels`.`id`, `channels`.`text`, `files`.`ext`, `files`.`url` FROM `channels` LEFT JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` WHERE `files_related_morphs`.`related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'icon' ORDER BY `channels`.`id` ASC",
      (err, result) => {
        res.json(result);
      }
    );
  }
});

router.get("/lists", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const channel = req.body.channel;
  const medium = req.body.medium;
  const pageNo = req.body.pageNo;
  console.log(
    "SELECT * FROM `lists` LEFT JOIN `lists_channel_links` ON `lists`.`id` = `lists_channel_links`.`list_id` LEFT JOIN `lists_medium_links` ON `lists`.`id` = `lists_medium_links`.`list_id` LEFT JOIN `channels` ON `lists_channel_links`.`channel_id` = `channels`.`id` LEFT JOIN `mediums` ON `lists_medium_links`.`medium_id` = `mediums`.`id` WHERE `channels`.`text` = '" +
      channel +
      "' AND `mediums`.`medium` = '" +
      medium +
      "' AND `lists`.`published_at` IS NOT NULL LIMIT " +
      pageNo +
      "0, 10"
  );
  conn.query(
    "SELECT * FROM `lists` LEFT JOIN `lists_channel_links` ON `lists`.`id` = `lists_channel_links`.`list_id` LEFT JOIN `lists_medium_links` ON `lists`.`id` = `lists_medium_links`.`list_id` LEFT JOIN `channels` ON `lists_channel_links`.`channel_id` = `channels`.`id` LEFT JOIN `mediums` ON `lists_medium_links`.`medium_id` = `mediums`.`id` WHERE `channels`.`text` = '" +
      channel +
      "' AND `mediums`.`medium` = '" +
      medium +
      "' AND `lists`.`published_at` IS NOT NULL LIMIT " +
      pageNo +
      "0, 10",
    (err, result) => {
      res.json(result);
    }
  );
});

// router.get("/allChannels", (req, res) => {
// res.header("Access-Control-Allow-Origin",[ "http://localhost:3000", "https://strategytool.io/"]);

//   conn.query("SELECT * FROM `channels`", (err, results) => {
//     res.json(results);
//   });
// });

// router.get("/filterChannel", (req, res) => {
// res.header("Access-Control-Allow-Origin",[ "http://localhost:3000", "https://strategytool.io/"]);

//   conn.query(
//     "SELECT `channels`.`id`, `channels`.`text`, `files`.`ext`, `files`.`url` FROM `channels` LEFT JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` WHERE `files_related_morphs`.`related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'icon' ORDER BY `channels`.`id` ASC;",
//     (err, result) => {
//       res.json(result);
//     }
//   );
// });

router.get("/allChannels", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  // conn.query("SELECT * FROM `channels`", (err, allChannels) => {
  //   if (err) {
  //     return res.status(500).json({ error: "An error occurred" });
  //   }

  //   conn.query(
  //     "SELECT * FROM `channels` LEFT JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` WHERE `files_related_morphs`.`related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'icon' ORDER BY `channels`.`id` ASC;",
  //     (err, filterChannels) => {
  //       if (err) {
  //         return res.status(500).json({ error: "An error occurred" });
  //       }

  //       // Merge the results based on matching IDs
  //       const mergedChannels = allChannels.map((allChannel) => {
  //         const matchingFilterChannel = filterChannels.find(
  //           (filterChannel) => filterChannel.id === allChannel.id
  //         );
  //         return {
  //           ...allChannel,
  //           ...matchingFilterChannel,
  //         };
  //       });

  //       res.json(mergedChannels);
  //     }
  //   );
  // });

  conn.query(
    `
    SELECT
      channels.id,
      channels.text,
      (SELECT files.url FROM files_related_morphs INNER JOIN files ON files_related_morphs.file_id = files.id WHERE files_related_morphs.related_id = channels.id AND files_related_morphs.related_type = 'api::channel.channel' AND files_related_morphs.field = 'icon' LIMIT 1) AS icon_url,
      (SELECT files.url FROM files_related_morphs INNER JOIN files ON files_related_morphs.file_id = files.id WHERE files_related_morphs.related_id = channels.id AND files_related_morphs.related_type = 'api::channel.channel' AND files_related_morphs.field = 'banner' LIMIT 1) AS banner_url,
      channels.created_at,
      channels.updated_at,
      channels.published_at,
      channels.updated_by_id,
      channels.created_by_id
    FROM channels
    ORDER BY channels.id ASC;
    `,
    (err, result) => {
      res.json(result);
    }
  );
});

router.get("/allChannelMedium", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query(
    "SELECT * FROM `mediums_channel_links` ORDER BY `mediums_channel_links`.`medium_id` ASC",
    (err, result) => {
      res.json(result);
    }
  );
});

router.get("/allFiles", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query("SELECT * FROM `files`", (err, results) => {
    res.json(results);
  });
});

// get single user with id
router.get("/users/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const id = req.params.id === null ? 0 : req.params.id;
  conn.query(
    "SELECT * FROM `up_users` WHERE `id` = '" + id + "'",
    (err, result) => {
      res.json(result);
    }
  );
});

// get all medium channel links
router.get("/mediums_channel_links", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query(
    "SELECT * FROM `mediums_channel_links` ORDER BY `mediums_channel_links`.`medium_id` ASC",
    (err, result) => {
      res.json(result);
    }
  );
});

// get all medium
router.get("/mediums", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query("SELECT * FROM `mediums`", (err, result) => {
    res.json(result);
  });
});

// add channel medium link
router.post("/addMediumChannelLinks", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const medium_id = req.body.medium_id;
  const channel_id = req.body.channel_id;
  conn.query(
    "INSERT INTO `mediums_channel_links`(`medium_id`, `channel_id`) VALUES ('" +
      medium_id +
      "','" +
      channel_id +
      "')",
    (err, result) => {
      res.json(result);
    }
  );
});

// update channel text and files image via channel id
router.post("/updateChannel", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const channel_id = req.body.channel_id;
  const text = req.body.text;
  const ext = req.body.ext;
  const url = req.body.url;
  conn.query(
    "UPDATE `channels` JOIN `files_related_morphs` ON `channels`.`id` = `files_related_morphs`.`related_id` JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` SET `channels`.`text` = '" +
      text +
      "', `files`.`ext` = '" +
      ext +
      "', `files`.`url` = '" +
      url +
      "' WHERE `files_related_morphs`.`related_type` = 'api::channel.channel' AND `files_related_morphs`.`field` = 'icon' AND `channels`.`id` = '" +
      channel_id +
      "'",
    (err, result) => {
      res.json(result);
    }
  );
});

// router.get("/allLists", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");

//   conn.query(
//     "SELECT * FROM `lists` LEFT JOIN `lists_medium_links` ON `lists`.`id` = `lists_medium_links`.`list_id` LEFT JOIN `lists_channel_links` ON `lists`.`id` = `lists_channel_links`.`list_id` LEFT JOIN `channels` ON `lists_channel_links`.`channel_id` = `channels`.`id` ORDER BY `lists`.`id` ASC",
//     (err, result) => {
//       res.json(result);
//     }
//   );
// });

// get all lists and then using list.id get all medium and get all channel name but the main id should be list
router.get("/allLists", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query(
    "SELECT * FROM `lists` LEFT JOIN `lists_medium_links` ON `lists`.`id` = `lists_medium_links`.`list_id` LEFT JOIN `lists_channel_links` ON `lists`.`id` = `lists_channel_links`.`list_id` LEFT JOIN `channels` ON `lists_channel_links`.`channel_id` = `channels`.`id` LEFT JOIN `files_related_morphs` ON `lists`.`id` = `files_related_morphs`.`related_id` LEFT JOIN `files` ON `files_related_morphs`.`file_id` = `files`.`id` AND (`files_related_morphs`.`field` = 'contentMedia' OR `files_related_morphs`.`field` = 'contentText') WHERE `files_related_morphs`.`related_type` = 'api::list.list' ORDER BY `lists`.`id` ASC;",
    (err, result) => {
      res.json(result);
    }
  );
});

router.get("/adminRole", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  conn.query("SELECT * FROM `admin_users`", (err, result) => {
    const email = result[0].email;
    const password = md5(result[0].password);

    res.json({ email, password });
  });
});

module.exports = router;
