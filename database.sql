-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: my_shop3category
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Gaming room'),(2,'Bedroom'),(3,'Bathroom'),(4,'Living room'),(5,'Kitchen'),(6,'Laundry room');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `unit_price` float NOT NULL,
  `quantity` int NOT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
alter table `item` Add key `product_id_idx`(`product_id`);
ALTER TABLE `item` ADD CONSTRAINT `product_id` FOREIGN KEY(`product_id`) REFERENCES `product`(`product_id`);
alter table `item` Add key `order_id_idx`(`order_id`);
ALTER TABLE `item` ADD CONSTRAINT `order_id` FOREIGN KEY(`order_id`) REFERENCES `order_user`(`order_id`);

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;

/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_user`
--

DROP TABLE IF EXISTS `order_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_user` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `buy_date` datetime NOT NULL,
  `status` varchar(100) NOT NULL,
  `price_total` float NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_user`
--

LOCK TABLES `order_user` WRITE;
/*!40000 ALTER TABLE `order_user` DISABLE KEYS */;

/*!40000 ALTER TABLE `order_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `sale_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  KEY `FKtgpfnkn7etmfumakc3iq75e95` (`sale_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `FKtgpfnkn7etmfumakc3iq75e95` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`sale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (44,'Warrious Chair WGC206 Series ','gaming1.png',1916,'Gaming 1',150,1,'s20pc'),
(47,'Gaming Board G1','gaming2.png',67,'Gaming 2',55,1,'s10pc'),
(48,'Sofa set BSF166','living1.png',1001,'Living 1',52,4,'default'),
(49,'TV shelf KTV8917','living2.png',984,'Living 2',50,4,'s20pc'),
(50,'Decorative table BC017','living3.png',1100,'Living 3',99,4,'s10pc'),
(51,'Kitchen Card A02','kit1.png',847,'Kitchen 1',20,5,'s10pc'),
(52,'Acrylic-A010 Kitchen Cabinet','kit2.png',810,'Kitchen 2',45,5,'s20pc'),
(53,'Kitchen Card A03','kit3.png',874,'Kitchen 3',67,5,'default'),
(54,'Acrylic-A14 Kitchen Cabinet','kit4.png',947,'Kitchen 4',13,5,'s30pc'),
(55,'Sofa GSF 127','living4.png',893,'Living 4',67,4,'default'),
(56,'Sofa set BSF1001','living5.png',1038,'Living 5',76,4,'s10pc'),
(57,'Sofa set BSF614','living6.png',983,'Living 6',98,4,'s20pc'),
(58,'High End PC I9-11900K RTX-3090','gaming3.png',10905,'Gaming 3',35,1,'default'),
(59,'Acrylic-A15 Kitchen Cabinet','kit5.png',970,'Kitchen 5',65,5,'s30pc'),
(60,'Acrylic-A017 Kitchen Cabinet','kit6.png',985,'Kitchen 6',23,5,'s20pc'),
(61,'Sofa set BSF121','living7.png',859,'Living 7',31,4,'s10pc'),
(62,'Acrylic-A018 Kitchen Cabinet','kit7.png',979,'Kitchen 7',84,5,'default'),
(63,'Acrylic-A019 Kitchen Cabinet','kit8.png',979,'Kitchen 8',67,5,'s30pc'),
(64,'Acrylic-A020 Kitchen Cabinet','kit9.png',989,'Kitchen 9',62,5,'s20pc'),
(65,'Acrylic-A022 Kitchen Cabinet','kit10.png',969,'Kitchen 10',52,5,'s10pc'),
(66,'Sofa set BSF029','living8.png',869,'Living 8',35,4,'s40pc'),
(67,'Sofa set BSF028','living9.png',859,'Living 9',15,4,'s30pc'),
(68,'Sofa set BSF027','living10.png',865,'Living 10',53,4,'s20pc'),
(69,'TV shelf KTV010','living11.png',869,'Living 11',79,4,'s40pc'),
(70,'Shoe Cabinet TGGCN','living12.png',860,'Living 12',65,4,'s30pc'),
(71,'PS5 Standard Edition - KOREA','gaming4.png',653,'Gaming 4',143,1,'s20pc'),
(72,'Game Disc Holder','gaming5.png',278,'Gaming 5',147,1,'s10pc'),
(73,'Display Cabinet TTB02','gaming6.png',360,'Gaming 6',143,1,'s20pc'),
(74,'Bauhutte gaming bed set','gaming7.png',665,'Gaming 7',96,1,'default'),
(75,'Full PC Gaming Yasuo','gaming8.png',10060,'Gaming 8',43,1,'s10pc'),
(77,'Classic laundry room','la1.png',959,'Laundry 1',34,6,'s10pc'),
(78,'Laundry room for fashionistas','la2.png',956,'Laundry 2',83,6,'s20pc'),
(79,'Traditional laundry room','la3.png',945,'Laundry 3',73,6,'default'),
(80,'Bright white laundry room','la4.png',949,'Laundry 4',48,6,'s20pc'),
(81,'Luxurious laundry room, lavish','la5.png',978,'Laundry 5',34,6,'s10pc'),
(82,'Stylish laundry room','la6.png',950,'Laundry 6',82,6,'s10pc'),
(83,'Themed laundry room','la7.png',950,'Laundry 7',63,6,'s20pc'),
(84,'Spacious laundry room','la8.png',955,'Laundry 8',28,6,'s30pc'),
(85,'Laundry room with curtains','la9.png',949,'Laundry 9',21,6,'s10pc'),
(86,'Pink laundry room','la10.png',959,'Laundry 10',445,6,'s20pc'),
(87,'Modern bright laundry room','la11.png',960,'Laundry 11',62,6,'s20pc'),
(88,'Bathtub - AT0950','ba1.png',278,'Bath 1',265,3,'s10pc'),
(89,'Bibs Bathtub - AT0440L/CHEAP','ba2.png',360,'Bath 2',152,3,'s20pc'),
(90,'Two-piece Toilet with Soft Lid - CD1340','ba3.png',245,'Bath 3',293,3,'s20pc'),
(91,'Hand Dryer - A610','ba4.png',150,'Bath 4',546,3,'s30pc'),
(92,'Hot and Cold Shower - S173C','ba5.png',250,'Bath 5',834,3,'s10pc'),
(93,'Mens urinal (Wall-mounted) - U0232','ba6.png',159,'Bath 6',453,3,'s20pc'),
(94,'Bedroom furniture 1914','bed1.png',1916,'Bed 1',56,2,'s10pc'),
(95,'High-class bedroom furniture 1924','bed2.png',1904,'Bed 2',38,2,'s20pc'),
(96,'High-class bed and wardrobe set 1816','bed3.png',1856,'Bed 3',82,2,'s10pc'),
(97,'Imported high-class bed and cabinet set 2196','bed4.png',1703,'Bed 4',13,2,'s30pc'),
(98,'Cream white bed set 1826','bed5.png',1744,'Bed 5',73,2,'s10pc'),
(99,'Full set of high-class beds and cabinets 1895','bed6.png',1912,'Bed 6',37,2,'s30pc'),
(100,'Bed and cabinet design 1828','bed7.png',1690,'Bed 7',58,2,'s30pc'),
(101,'Cheap luxury bed and wardrobe 1996','bed8.png',1729,'Bed 8',35,2,'s10pc'),
(107,'Taiwan 1815 bed and cabinet set','bed9.png',1855,'Bed 9',20,2,'s30pc');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_MEMBER'),(3,'ROLE_USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale` (
  `sale_id` varchar(255) NOT NULL,
  `sale_percent` int NOT NULL,
  PRIMARY KEY (`sale_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale`
--

LOCK TABLES `sale` WRITE;
/*!40000 ALTER TABLE `sale` DISABLE KEYS */;
INSERT INTO `sale` VALUES ('default',0),('s10pc',10),('s20pc',20),('s30pc',30),('s40pc',40),('s50',50);
/*!40000 ALTER TABLE `sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` bit(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `verify` bit(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKn82ha3ccdebhokx3a8fgdqeyy` (`role_id`),
  KEY `idx_user_password` (`password`(20)),
  CONSTRAINT `FKn82ha3ccdebhokx3a8fgdqeyy` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (31,'Thanh pho Ho Chi Minh','Mr. Admin',_binary '',NULL,'$2a$10$KUTALTEnUXSZheyYXKyZw.mPIFgnwHxhyieKIrwRbrskBKPV.8u/u','0903880467',1,'admin.png','quant882@gmail.com',_binary ''),(32,'Chien Thang - Ho Chi Minh','Tran Nguyen Anh Quan',_binary '',NULL,'$2a$10$sKYN4nrCNEm/LmYGZGSx3..XduqrTuqmasmooyxstfkygmh79c6Re','0962748475',2,'user1.png','babakame63@gmail.com',_binary '\0'),(33,'Quan3 - HoChiMinh','Nguyen Minh Tien',_binary '\0',NULL,'$2a$10$HMb8nsjSnhSr5FzD/vb3I.rG.f.hLP5qIb6oyJ7njWEVNBsSNHax.','0953726353',3,'user2.png','tien@gmail.com',_binary '\0'),(34,'Quan2 - HoChiMinh','Dang Dang Khoa',_binary '\0',NULL,'$2a$10$RXZ7UGUWyfOjKwFRfoq8ceCZEXDE4/9ItsBzCRtEVIehPg9xXSXki','0962537263',2,'user3.png','khoa@gmail.com',_binary '\0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-12  0:34:13
