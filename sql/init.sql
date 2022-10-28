-- portfolio.jeux definition

CREATE TABLE `jeux` (
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `play_url` text DEFAULT NULL,
  `download_url` text DEFAULT NULL,
  `icon_url` text DEFAULT NULL,
  `screenshot1_url` text DEFAULT NULL,
  `screenshot2_url` text DEFAULT NULL,
  `screenshot3_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- portfolio.projets definition

CREATE TABLE `projets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `git_url` varchar(100) DEFAULT NULL,
  `is_game` tinyint(1) DEFAULT NULL,
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;


-- portfolio.users definition

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password_digest` varchar(100) DEFAULT NULL,
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;

INSERT INTO portfolio.projets (name,image,git_url) VALUES
	 ('Kiyu''s Revenge','images/project1.png','https://github.com/djalexkidd/kiyus-revenge'),
	 ('Wesh Bouée','images/project2.png','https://github.com/djalexkidd/wesh-bouee'),
	 ('Kiyu Sports','images/project3.png','https://github.com/djalexkidd/kiyu-sports'),
	 ('Ping Blast','images/project4.png','https://github.com/djalexkidd/ping-blast'),
	 ('Bee a hero!','images/project7.png','https://github.com/djalexkidd/bee-a-hero'),
	 ('Drones Invaders','images/project8.png','https://github.com/djalexkidd/drones-invaders'),
	 ('Maze of Lepers','images/project20.png','https://github.com/djalexkidd/maze-of-lepers'),
	 ('PassMan','images/project5.svg','https://github.com/djalexkidd/passman'),
	 ('ROFLCOPTER','images/project6.png','https://github.com/djalexkidd/roflcopter'),
	 ('Surf Van','images/project9.png','https://github.com/djalexkidd/surf-van');
INSERT INTO portfolio.projets (name,image,git_url) VALUES
	 ('To do List','images/project10.png','https://github.com/djalexkidd/todo-list'),
	 ('Morpion','images/project11.png','https://github.com/djalexkidd/morpion-js'),
	 ('Blackjack','images/project12.png','https://github.com/djalexkidd/blackjack'),
	 ('Calculatrice','images/project13.png','https://github.com/djalexkidd/calc-js'),
	 ('Gaming News','images/project14.png','https://github.com/djalexkidd/gaming-news'),
	 ('Vacances','images/project15.png','https://github.com/djalexkidd/vacances'),
	 ('GitHub Stats','images/project16.png','https://github.com/djalexkidd/github-api-call'),
	 ('Random Joke','images/project17.png','https://github.com/djalexkidd/dadjoke-api-call'),
	 ('Pokédex','images/project18.jpeg','https://github.com/djalexkidd/pokedex'),
	 ('React IMDB','images/project19.png','https://github.com/djalexkidd/react-imdb');
