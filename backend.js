const express = require("express"),
  app = express(),
  passport = require("passport"),
  port = process.env.PORT || 80,
  cors = require("cors"),
  cookie = require("cookie");

const db = require("./database.js");
let users = db.users;

const router = require("express").Router(),
  jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

require("./passport.js");

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
        if (req.body.remember == true) {
          time_exp = "7d";
        } else time_exp = "1d";
        const token = jwt.sign(user, db.SECRET, {
          expiresIn: time_exp,
        });
        var decoded = jwt.decode(token);
        let time = new Date(decoded.exp * 1000);
        console.log(new Date(decoded.exp * 1000));
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
          })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  return res.json({ message: "Logout successful" });
});

/* GET user profile. */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);

router.post("/register", async (req, res) => {
  try {
    const SALT_ROUND = 10;
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length? users.users[users.users.length - 1].id + 1: 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email });
    res.status(200).json({ message: "Register success" });
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

router.get("/alluser", (req, res) => res.json(db.users.users));

router.get("/", (req, res, next) => {
  res.send("Respond without authentication");
});

  let flowers = {
      list: [
        { "id": 1, "name": "Sunflower","type": "#963471","price": 25, "src":"/./pic/1.jpg"},
        { "id": 2, "name": "Carnation","type": "#789145","price": 35, "src":"/./pic/2.jpg"},
        { "id": 3, "name": "Daisy","type": "#843271","price": 40, "src":"/./pic/3.jpg"},
        { "id": 4, "name": "Rose","type": "#432186","price": 20, "src":"/./pic/4.jpg"}]
    }
  
  router
    .route("/flowers")
    .get((req, res) => {
      res.send(flowers);
    })
    .post((req, res) => {
      console.log(req.body);
      let newflower = {};
      newflower.id = flowers.list.length ? flowers.list[flowers.list.length - 1].id + 1 : 1;
      newflower.name = req.body.name;
      newflower.type= req.body.type;
      newflower.price= req.body.price;
      newflower.src= req.body.src;
      flowers = { list: [...flowers.list, newflower] };
      res.json(flowers);
    });
  
  router
    .route("/flowers/:flowerid")
    .get((req, res) => {
      let id = flowers.list.findIndex((item) => +item.id == +req.params.flowerid)
      res.json(flowers.list[id]);
    })
    .put((req, res) => {
      let id = flowers.list.findIndex((item) => item.id == +req.params.flowerid);
      flowers.list[id].name = req.body.name;
      flowers.list[id].type = req.body.type;
      flowers.list[id].price = req.body.price;
      flowers.list[id].src = req.body.src;
      res.json(flowers);
    })
    .delete((req, res) => {
      flowers.list = flowers.list.filter((item) => +item.id !== +req.params.flowerid);
      res.json(flowers);
    });
  
  
  router.route("/purchase/:flowerId")
  .post((req,res) => {
    let id = flowers.list.findIndex((item) => +item.id == +req.params.flowerId)
    if (id == -1) {
      res.json({message: "Flower not found"})
    }
    else {
      flowers.list = flowers.list.filter((item) => +item.id !== +req.params.flowerId);
      res.json(flowers.list);
    }
  })

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));