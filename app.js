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

var status = "";

function getProjects() {
    const result = knex.select().table('projets')

    return result.then(function(rows){
        return rows;
    })
};

function getGame(demand) {
    const result = knex.select().table('projets').where({ id: demand }).join('jeux', 'projets.name', '=', 'jeux.name');

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

app.get("/projets/:id", async (req, res) => {
    const result = await getGame(req.params.id)
    try {
    res.render("jeu.ejs", {
        title: result[0].name,
        currentPage3: false,
        currentPage2: true,
        currentPage1: false,
        game: result
    });
    } catch {
        res.status(404);
        res.send("Jeu introuvable");
    }
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
app.get('/admin', ensureAuthenticated, async function(req, res) {
    res.render("admin.ejs", {
        title: "Administration",
        currentPage3: false,
        currentPage2: false,
        currentPage1: false,
        message: status,
        list: await getProjects()
    });

    status = ""
});

// Déconnexion
app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
});

app.get('*', (req, res) => {
    res.status(404);
    res.send("Page introuvable");
})

// Création d'un nouveau projet
app.post("/newproject", ensureAuthenticated, (req, res, next) => {
    if (req.body.isgame == "game") {
        knex("jeux").insert({
            name: req.body.name,
            description: req.body.description,
            play_url: req.body.gamelink,
            download_url: req.body.gamedownload,
            icon_url: req.body.gameimage,
            screenshot1_url: req.body.gamescreen1,
            screenshot2_url: req.body.gamescreen2,
            screenshot3_url: req.body.gamescreen3
         }).then();
    }

    knex("projets").insert({
       name: req.body.name,
       image: req.body.image,
       git_url: req.body.git_url,
       is_game: (req.body.isgame === "game" ? "1" : "2")
    })
    .then(() => {
        status = req.body.name + " a été ajouté avec succès.";
        res.redirect("/admin");
    })
    .catch(error => next(error))
});

// Suppression d'un projet
app.post("/delproject", ensureAuthenticated, (req, res, next) => {
    status = "Le projet a été supprimé avec succès.";
    knex("projets")
  .where({ id: req.body.projectid })
  .del()
  .then(res.redirect("/admin"));
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

app.listen(3000, () => console.log(`
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝

Server is running!`));