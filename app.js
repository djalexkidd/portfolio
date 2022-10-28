require("dotenv").config();
const express = require("express");
const path = require("path");
const gravatar = require('gravatar');
const bcrypt = require ("bcrypt");
const cookieParser = require('cookie-parser')

const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

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

// Middleware pour vérifier si l'utilisateur est connecté
function ensureAuthenticated(req, res, next) {
    const token = req.cookies.token
    jwt.verify(token, SECRET, (error, decodedToken) => {
       if(error){
            res.status(403);
            res.send('Forbidden');
       }else{
            next();
       }
    })
};

// Middleware pour vérifier le CAPTCHA
async function verifyCaptcha(req, res, next) {
    const APICALL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${req.body['g-recaptcha-response']}`
    const reponse = await fetch(APICALL)
    const body = await reponse.json()

    if (body.success !== undefined && !body.success) {
        res.render("login.ejs", {
            title: "Connexion",
            currentPage3: false,
            currentPage2: false,
            currentPage1: false,
            message: "Le CAPTCHA n'a pas été validé.",
            captchaSite: process.env.CAPTCHA_SITE_KEY
        });
    } else {
        next();
    }
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
        message: "",
        captchaSite: process.env.CAPTCHA_SITE_KEY
    });
  }
);

// Page d'administration
app.get('/admin', ensureAuthenticated, function(req, res) {
    res.render("admin.ejs", {
        title: "Administration",
        currentPage3: false,
        currentPage2: false,
        currentPage1: false,
        message: ""
    });
});

// Déconnexion
app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
});

// Création d'un nouveau projet
app.post("/newproject", ensureAuthenticated, (req, res, next) => {
    knex("projets").insert({
       name: req.body.name,
       image: req.body.image,
       git_url: req.body.git_url
    })
    .then(() => {
        res.render("admin.ejs", {
            title: "Administration",
            currentPage3: false,
            currentPage2: false,
            currentPage1: false,
            message: req.body.name + " a été ajouté avec succès."
        });
    })
    .catch(error => next(error))
});

// Route pour la connexion
app.post("/login", verifyCaptcha, (req, res, next) => {
    knex("users")
    .where({username: req.body.username})
    .first()
    .then(user => {
       if(!user){
        console.log("Failed login from " + req.body.username + " at " + req.ip);
        res.render("login.ejs", {
            title: "Connexion",
            currentPage3: false,
            currentPage2: false,
            currentPage1: false,
            message: "Le nom d'utilisateur ou le mot de passe est incorrect.",
            captchaSite: process.env.CAPTCHA_SITE_KEY
        });
       }else{
          return bcrypt
          .compare(req.body.password, user.password_digest)
          .then(isAuthenticated => {
             if(!isAuthenticated){
                console.log("Failed login from " + req.body.username + " at " + req.ip);
                res.render("login.ejs", {
                    title: "Connexion",
                    currentPage3: false,
                    currentPage2: false,
                    currentPage1: false,
                    message: "Le nom d'utilisateur ou le mot de passe est incorrect.",
                    captchaSite: process.env.CAPTCHA_SITE_KEY
                });
             }else{
                return jwt.sign({user}, SECRET, {expiresIn: "1h"}, (error, token) => {
                   console.log("Successful login from " + req.body.username + " at " + req.ip);
                   res.cookie("token", token);
                   res.redirect("/admin");
                })
             }
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