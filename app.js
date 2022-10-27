const express = require("express");
const path = require("path");
const gravatar = require('gravatar');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

// Page d'accueil
app.get("/", (req, res) => {
    res.render("index.ejs", {
        currentPage3: false,
        currentPage2: false,
        currentPage1: true
    });
  }
);

// Page des projets
app.get("/projets", (req, res) => {
    res.render("projets.ejs", {
        currentPage3: false,
        currentPage2: true,
        currentPage1: false
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