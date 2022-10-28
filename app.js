require("dotenv").config();
const express = require("express");
const path = require("path");
const gravatar = require('gravatar');
const bcrypt = require ("bcrypt");

const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());

const avatarUrl = gravatar.url('alexpyr@outlook.fr', {s: '200'}, true);

const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_NAME
    }
});

function getProjects() {
    const result = knex.select().table('projets')

    return result.then(function(rows){
        return rows;
    })
};

// Page d'accueil
app.get("/", (req, res) => {
    res.render("index.ejs", {
        title: "Accueil",
        currentPage3: false,
        currentPage2: false,
        currentPage1: true,
        avatar: avatarUrl
    });
  }
);

// Page des projets
app.get("/projets", async (req, res) => {
    res.render("projets.ejs", {
        title: "Projets",
        currentPage3: false,
        currentPage2: true,
        currentPage1: false,
        list: await getProjects()
    });
  }
);

// Page de contact
app.get("/contact", (req, res) => {
    res.render("contact.ejs", {
        title: "Contact",
        currentPage3: true,
        currentPage2: false,
        currentPage1: false
    });
  }
);

// Page de connexion
app.get("/login", (req, res) => {
    res.render("login.ejs", {
        title: "Connexion",
        currentPage3: false,
        currentPage2: false,
        currentPage1: false,
        message: ""
    });
  }
);

app.post("/newproject", (req, res, next) => {
    knex("projets").insert({
       name: req.body.name,
       image: req.body.image,
       git_url: req.body.git_url
    })
    .then(users => {
       res.json(users[0])
    })
    .catch(error => next(error))
});

app.post("/login", (req, res, next) => {
    knex("users")
    .where({username: req.body.username})
    .first()
    .then(user => {
        console.log(user)
       if(!user){
        res.render("login.ejs", {
            title: "Connexion",
            currentPage3: false,
            currentPage2: false,
            currentPage1: false,
            message: "Le nom d'utilisateur ou le mot de passe est incorrect."
        });
       }else{
          return bcrypt
          .compare(req.body.password, user.password_digest)
          .then(isAuthenticated => {
             if(!isAuthenticated){
                res.render("login.ejs", {
                    title: "Connexion",
                    currentPage3: false,
                    currentPage2: false,
                    currentPage1: false,
                    message: "Le nom d'utilisateur ou le mot de passe est incorrect."
                });
             }else{
                return jwt.sign({user}, SECRET, {expiresIn: "1h"}, (error, token) => {
                   res.status(200).json({token})
                })
             }
          })
       }
    })
});

app.get("/verify", (req, res, next) => {
    const token = req.headers.authorization
    jwt.verify(token, SECRET, (error, decodedToken) => {
       if(error){
          res.status(401).json({
             message: "Unauthorized Access!"
          })
       }else{
          res.status(200).json({
             id: decodedToken.id,
             username: decodedToken.username
          })
       }
    })
});

// app.post("/register", (request, response, next) => {
//     bcrypt.hash(request.body.password, 10)
//     .then(hashedPassword => {
//        return knex("users").insert({
//           username: request.body.username,
//           password_digest: hashedPassword
//        })
//        .returning(["id", "username"])
//        .then(users => {
//           response.json(users[0])
//        })
//        .catch(error => next(error))
//     })
// });

app.listen(3000, () => console.log("Server is running!"));