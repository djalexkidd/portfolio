-- MariaDB dump 10.19  Distrib 10.9.5-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: portfolio
-- ------------------------------------------------------
-- Server version	10.9.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jeux`
--

DROP TABLE IF EXISTS `jeux`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jeux` (
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `play_url` text DEFAULT NULL,
  `download_url` text DEFAULT NULL,
  `icon_url` text DEFAULT NULL,
  `screenshot1_url` text DEFAULT NULL,
  `screenshot2_url` text DEFAULT NULL,
  `screenshot3_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeux`
--

LOCK TABLES `jeux` WRITE;
/*!40000 ALTER TABLE `jeux` DISABLE KEYS */;
INSERT INTO `jeux` VALUES
('Kiyu\'s Revenge','Après avoir été maltraité pendant des années, Kiyu à décidé de prendre sa revanche contre Paulok et tout le YouTube Game. Un jeu de plateforme 2D \"Die and Retry\" pour toute la famille!','',NULL,'/images/gameicons/kiyu.png','/images/screenshots/kiyu1.png','/images/screenshots/kiyu2.png','/images/screenshots/kiyu3.png'),
('Wesh Bouée','Une course contre la montre, faites le niveau le plus vite possible sans vous prendre les murs.','',NULL,'/images/gameicons/wesh.png','/images/screenshots/wesh1.png','/images/screenshots/wesh2.png','/images/screenshots/wesh3.png'),
('Kiyu Sports','Rejoignez Kiyu et ses amis dans des épreuves olympiques totalement originales pour le faire maigrir parce que il a un gros Q.','',NULL,'/images/gameicons/kiyusports.png','/images/screenshots/kiyusports1.png','/images/screenshots/kiyusports2.png','/images/screenshots/kiyusports3.png'),
('Ping Blast','Shoot \'em Up inspiré par Pang. Explosez les scores et trouvez une place dans le classement mondial !','',NULL,'/images/gameicons/pingblast.png','/images/screenshots/ping1.png','/images/screenshots/ping2.png','/images/screenshots/ping3.png'),
('Bee a hero!','Un jeu fait pendant un hackathon en une semaine du coup il n\'y a qu\'un seul niveau.','',NULL,'/images/gameicons/bee.png','/images/screenshots/bee1.png','/images/screenshots/bee2.png','/images/screenshots/bee3.png'),
('Drones Invaders','Portage Godot d\'un jeu fait à la base sur Scratch que j\'ai pas fait.','',NULL,'/images/gameicons/drones.png','/images/screenshots/drones1.png','/images/screenshots/drones2.png','/images/screenshots/drones3.png'),
('Maze of Lepers','Trouvez la sortie de ce labyrinthe éffrayant sans toucher les murs !','',NULL,'/images/gameicons/mazeoflepers.png','/images/screenshots/maze1.png','/images/screenshots/maze2.png','/images/screenshots/maze3.png'),
('Galakanoid','Jeu de casse-brique à la con.','','','/images/gameicons/galakanoid.png','/images/screenshots/galakanoid1.png','/images/screenshots/galakanoid2.png','/images/screenshots/galakanoid3.png');
/*!40000 ALTER TABLE `jeux` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projets`
--

DROP TABLE IF EXISTS `projets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `git_url` varchar(100) DEFAULT NULL,
  `is_game` tinyint(1) DEFAULT NULL,
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projets`
--

LOCK TABLES `projets` WRITE;
/*!40000 ALTER TABLE `projets` DISABLE KEYS */;
INSERT INTO `projets` VALUES
(1,'Kiyu\'s Revenge','images/project1.png','https://github.com/djalexkidd/kiyus-revenge',1),
(2,'Wesh Bouée','images/project2.png','https://github.com/djalexkidd/wesh-bouee',1),
(3,'Kiyu Sports','images/project3.png','https://github.com/djalexkidd/kiyu-sports',1),
(4,'Ping Blast','images/project4.png','https://github.com/djalexkidd/ping-blast',1),
(5,'Bee a hero!','images/project7.png','https://github.com/djalexkidd/bee-a-hero',1),
(6,'Drones Invaders','images/project8.png','https://github.com/djalexkidd/drones-invaders',1),
(7,'Maze of Lepers','images/project20.png','https://github.com/djalexkidd/maze-of-lepers',1),
(8,'PassMan','images/project5.svg','https://github.com/djalexkidd/passman',NULL),
(9,'ROFLCOPTER','images/project6.png','https://github.com/djalexkidd/roflcopter',NULL),
(10,'Surf Van','images/project9.png','https://github.com/djalexkidd/surf-van',NULL),
(11,'To do List','images/project10.png','https://github.com/djalexkidd/todo-list',NULL),
(12,'Morpion','images/project11.png','https://github.com/djalexkidd/morpion-js',NULL),
(13,'Blackjack','images/project12.png','https://github.com/djalexkidd/blackjack',NULL),
(14,'Calculatrice','images/project13.png','https://github.com/djalexkidd/calc-js',NULL),
(15,'Gaming News','images/project14.png','https://github.com/djalexkidd/gaming-news',NULL),
(16,'Vacances','images/project15.png','https://github.com/djalexkidd/vacances',NULL),
(17,'GitHub Stats','images/project16.png','https://github.com/djalexkidd/github-api-call',NULL),
(18,'Random Joke','images/project17.png','https://github.com/djalexkidd/dadjoke-api-call',NULL),
(19,'Pokédex','images/project18.jpeg','https://github.com/djalexkidd/pokedex',NULL),
(20,'React IMDB','images/project19.png','https://github.com/djalexkidd/react-imdb',NULL),
(21,'Galakanoid','/images/project21.png','https://github.com/djalexkidd/galakanoid',1);
/*!40000 ALTER TABLE `projets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password_digest` varchar(100) DEFAULT NULL,
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'test','$2b$10$XY5OhvnuS4Rn2fQNQg9kAuls/orTGRfURSliNzyXcUrjLNSWP8lnG');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'portfolio'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-04 14:18:06
