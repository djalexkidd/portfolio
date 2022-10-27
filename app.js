require("dotenv").config();
const express = require("express");
const path = require("path");
const gravatar = require('gravatar');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

const avatarUrl = gravatar.url('alexpyr@outlook.fr', {s: '200'}, true);

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
        currentPage3: true,
        currentPage2: false,
        currentPage1: false
    });
  }
);

app.listen(3000, () => console.log("Server is running!"));