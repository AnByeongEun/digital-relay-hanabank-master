-- MySQL dump 10.19  Distrib 10.3.28-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: ecs_asoptio
-- ------------------------------------------------------
-- Server version	10.3.28-MariaDB

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
-- Table structure for table `tb_admin_account`
--

DROP TABLE IF EXISTS `tb_admin_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_admin_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL,
  `passwd` varchar(512) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `is_blocked` tinyint(1) NOT NULL DEFAULT 0,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_account`
--

LOCK TABLES `tb_admin_account` WRITE;
/*!40000 ALTER TABLE `tb_admin_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_admin_auth_api`
--

DROP TABLE IF EXISTS `tb_admin_auth_api`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_admin_auth_api` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `path` varchar(1000) NOT NULL,
  `query` varchar(2000) DEFAULT NULL,
  `method` varchar(10) DEFAULT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_auth_api`
--

LOCK TABLES `tb_admin_auth_api` WRITE;
/*!40000 ALTER TABLE `tb_admin_auth_api` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_auth_api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_admin_auth_api_map`
--

DROP TABLE IF EXISTS `tb_admin_auth_api_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_admin_auth_api_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_auth_page_id` int(11) NOT NULL,
  `admin_auth_api_id` int(11) NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_auth_page_id` (`admin_auth_page_id`),
  KEY `admin_auth_api_id` (`admin_auth_api_id`),
  CONSTRAINT `tb_admin_auth_api_map_ibfk_1` FOREIGN KEY (`admin_auth_page_id`) REFERENCES `tb_admin_auth_page` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tb_admin_auth_api_map_ibfk_2` FOREIGN KEY (`admin_auth_api_id`) REFERENCES `tb_admin_auth_api` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_auth_api_map`
--

LOCK TABLES `tb_admin_auth_api_map` WRITE;
/*!40000 ALTER TABLE `tb_admin_auth_api_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_auth_api_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_admin_auth_component`
--

DROP TABLE IF EXISTS `tb_admin_auth_component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_admin_auth_component` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_auth_page_id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `component_id` varchar(200) NOT NULL,
  `auth_api_id` int(11) DEFAULT NULL,
  `auth_page_id` int(11) DEFAULT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_auth_page_id` (`admin_auth_page_id`),
  CONSTRAINT `tb_admin_auth_component_ibfk_1` FOREIGN KEY (`admin_auth_page_id`) REFERENCES `tb_admin_auth_page` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_auth_component`
--

LOCK TABLES `tb_admin_auth_component` WRITE;
/*!40000 ALTER TABLE `tb_admin_auth_component` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_auth_component` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_admin_auth_group`
--

DROP TABLE IF EXISTS `tb_admin_auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_admin_auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(40) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_auth_group`
--

LOCK TABLES `tb_admin_auth_group` WRITE;
/*!40000 ALTER TABLE `tb_admin_auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_admin_auth_group_map`
--

DROP TABLE IF EXISTS `tb_admin_auth_group_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_admin_auth_group_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_account_id` int(11) NOT NULL,
  `admin_auth_group_id` int(11) NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_account_id` (`admin_account_id`),
  KEY `admin_auth_group_id` (`admin_auth_group_id`),
  CONSTRAINT `tb_admin_auth_group_map_ibfk_1` FOREIGN KEY (`admin_account_id`) REFERENCES `tb_admin_account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tb_admin_auth_group_map_ibfk_2` FOREIGN KEY (`admin_auth_group_id`) REFERENCES `tb_admin_auth_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_auth_group_map`
--

LOCK TABLES `tb_admin_auth_group_map` WRITE;
/*!40000 ALTER TABLE `tb_admin_auth_group_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_auth_group_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_admin_auth_page`
--

DROP TABLE IF EXISTS `tb_admin_auth_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_admin_auth_page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_name` varchar(40) NOT NULL,
  `path` varchar(1000) NOT NULL,
  `query` varchar(1000) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_auth_page`
--

LOCK TABLES `tb_admin_auth_page` WRITE;
/*!40000 ALTER TABLE `tb_admin_auth_page` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_auth_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_admin_auth_page_map`
--

DROP TABLE IF EXISTS `tb_admin_auth_page_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_admin_auth_page_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_auth_group_id` int(11) NOT NULL,
  `admin_auth_page_id` int(11) NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_auth_group_id` (`admin_auth_group_id`),
  KEY `admin_auth_page_id` (`admin_auth_page_id`),
  CONSTRAINT `tb_admin_auth_page_map_ibfk_1` FOREIGN KEY (`admin_auth_group_id`) REFERENCES `tb_admin_auth_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tb_admin_auth_page_map_ibfk_2` FOREIGN KEY (`admin_auth_page_id`) REFERENCES `tb_admin_auth_page` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_auth_page_map`
--

LOCK TABLES `tb_admin_auth_page_map` WRITE;
/*!40000 ALTER TABLE `tb_admin_auth_page_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_auth_page_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_admin_login_history`
--

DROP TABLE IF EXISTS `tb_admin_login_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_admin_login_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_account_id` int(11) NOT NULL,
  `is_success` tinyint(1) NOT NULL DEFAULT 0,
  `created_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_login_history`
--

LOCK TABLES `tb_admin_login_history` WRITE;
/*!40000 ALTER TABLE `tb_admin_login_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_login_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_admin_session`
--

DROP TABLE IF EXISTS `tb_admin_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_admin_session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_account_id` int(11) NOT NULL,
  `refresh_token` varchar(200) NOT NULL,
  `expire_at` datetime NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_account_id` (`admin_account_id`),
  CONSTRAINT `tb_admin_session_ibfk_1` FOREIGN KEY (`admin_account_id`) REFERENCES `tb_admin_account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_session`
--

LOCK TABLES `tb_admin_session` WRITE;
/*!40000 ALTER TABLE `tb_admin_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_admin_token`
--

DROP TABLE IF EXISTS `tb_admin_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_admin_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_session_id` int(11) NOT NULL,
  `access_token` varchar(200) NOT NULL,
  `request_count` int(11) NOT NULL DEFAULT 0,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_session_id` (`admin_session_id`),
  CONSTRAINT `tb_admin_token_ibfk_1` FOREIGN KEY (`admin_session_id`) REFERENCES `tb_admin_session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_token`
--

LOCK TABLES `tb_admin_token` WRITE;
/*!40000 ALTER TABLE `tb_admin_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_common_code`
--

DROP TABLE IF EXISTS `tb_common_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_common_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_group` varchar(50) COLLATE utf8_bin NOT NULL,
  `code_group_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `code` varchar(50) COLLATE utf8_bin NOT NULL,
  `value` varchar(200) COLLATE utf8_bin NOT NULL,
  `code_order` int(11) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_common_code`
--

LOCK TABLES `tb_common_code` WRITE;
/*!40000 ALTER TABLE `tb_common_code` DISABLE KEYS */;
INSERT INTO `tb_common_code` VALUES (1,'test_group1','testgroup1','GROUP1','groupvalue1',0,NULL,'1',NULL,'2022-01-20 08:35:43','2022-01-20 08:35:43',NULL),(2,'test_group1','testgroup2','GROUP2','groupvalue2',0,NULL,'1',NULL,'2022-01-20 08:36:07','2022-01-20 08:36:07',NULL),(3,'test_group2','testgroup3','GROUP3','groupvalue3',0,NULL,'1',NULL,'2022-01-20 08:36:09','2022-01-20 08:36:09',NULL);
/*!40000 ALTER TABLE `tb_common_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_contact`
--

DROP TABLE IF EXISTS `tb_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `channel_key` varchar(512) COLLATE utf8_bin NOT NULL,
  `key` varchar(30) COLLATE utf8_bin NOT NULL,
  `ani` varchar(20) COLLATE utf8_bin NOT NULL,
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_contact`
--

LOCK TABLES `tb_contact` WRITE;
/*!40000 ALTER TABLE `tb_contact` DISABLE KEYS */;
INSERT INTO `tb_contact` VALUES (1,'00001054011634278988','-_RkbH4BMyTEolRfSLRE','01067688817',NULL,NULL,'2022-01-18 08:53:38','2022-01-18 08:53:38',NULL),(2,'00001054011634278988','aRBecX4BMyTEolRfrmxQ','01067688817',NULL,NULL,'2022-01-19 08:05:37','2022-01-19 08:05:37',NULL),(3,'00001054011634278988','dxGCcX4BMyTEolRfmTbj','01067688817',NULL,NULL,'2022-01-19 08:45:16','2022-01-19 08:45:16',NULL),(4,'00001054011634278988','VxGDcX4BMyTEolRftD26','01067688817',NULL,NULL,'2022-01-19 08:46:19','2022-01-19 08:46:19',NULL),(5,'00001054011634278988','E0f8en4BMyTEolRftQVf','01067688817',NULL,NULL,'2022-01-21 04:54:46','2022-01-21 04:54:46',NULL),(6,'00001054011634278989','8Eqae34BMyTEolRfTohE','01067688817',NULL,NULL,'2022-01-21 07:46:56','2022-01-21 07:46:56',NULL),(7,'00001054011634278989','E953lX4BMyTEolRfnFwd','01067688817',NULL,NULL,'2022-01-26 08:19:10','2022-01-26 08:19:10',NULL),(8,'00001054011634278989','vN6DlX4BMyTEolRfIZ3d','01067688817',NULL,NULL,'2022-01-26 08:31:46','2022-01-26 08:31:46',NULL),(9,'00001054011634278989','Kd6LlX4BMyTEolRfHcxX','01067688817',NULL,NULL,'2022-01-26 08:40:29','2022-01-26 08:40:29',NULL),(10,'00001054011634278989','offOmX4BMyTEolRfnkKy','01067688817',NULL,NULL,'2022-01-27 04:32:42','2022-01-27 04:32:42',NULL),(11,'000010540116342789891','OPfbmX4BMyTEolRfwI79','01067688817',NULL,NULL,'2022-01-27 04:47:00','2022-01-27 04:47:00',NULL),(12,'000010540116342789891','OvfgmX4BMyTEolRf56vw','01067688817',NULL,NULL,'2022-01-27 04:52:38','2022-01-27 04:52:38',NULL),(13,'000010540116342789891','2fjwmX4BMyTEolRfkAXK','01067688817',NULL,NULL,'2022-01-27 05:09:46','2022-01-27 05:09:46',NULL),(14,'000010540116342789891','gPjxmX4BMyTEolRfBAhZ','01067688817',NULL,NULL,'2022-01-27 05:10:16','2022-01-27 05:10:16',NULL),(15,'000010540116342789891','Y_jxmX4BMyTEolRfJAn5','01067688817',NULL,NULL,'2022-01-27 05:10:24','2022-01-27 05:10:24',NULL),(16,'000010540116342789891','zvjxmX4BMyTEolRf7A1T','01067688817',NULL,NULL,'2022-01-27 05:11:15','2022-01-27 05:11:15',NULL),(17,'000010540116342789891','sfjymX4BMyTEolRfEA6S','01067688817',NULL,NULL,'2022-01-27 05:11:25','2022-01-27 05:11:25',NULL),(18,'000010540116342789891','H_j1mX4BMyTEolRfZyLP','01067688817',NULL,NULL,'2022-01-27 05:15:03','2022-01-27 05:15:03',NULL),(19,'000010540116342789891','5Pj1mX4BMyTEolRfryPg','01067688817',NULL,NULL,'2022-01-27 05:15:22','2022-01-27 05:15:22',NULL),(20,'000010540116342789891','qfj2mX4BMyTEolRfHSU9','01067688817',NULL,NULL,'2022-01-27 05:15:50','2022-01-27 05:15:50',NULL),(21,'000010540116342789891','3vj-mX4BMyTEolRf4lgC','01067688817',NULL,NULL,'2022-01-27 05:25:25','2022-01-27 05:25:25',NULL),(22,'00001054011634278989','9fgHmn4BMyTEolRf1Yyn','01067688817',NULL,NULL,'2022-01-27 05:35:11','2022-01-27 05:35:11',NULL),(23,'0000105401163427898f','JPgImn4BMyTEolRf8ZMs','01067688817',NULL,NULL,'2022-01-27 05:36:24','2022-01-27 05:36:24',NULL),(24,'0000105401163427898f','GfgMmn4BMyTEolRf9Kr8','01067688817',NULL,NULL,'2022-01-27 05:40:47','2022-01-27 05:40:47',NULL),(25,'0000105401163427898f','SPgOmn4BMyTEolRfE7B1','01067688817',NULL,NULL,'2022-01-27 05:42:00','2022-01-27 05:42:00',NULL),(26,'0000105401163427898f','Vfkdmn4BMyTEolRflQok','01067688817',NULL,NULL,'2022-01-27 05:58:57','2022-01-27 05:58:57',NULL),(27,'0000105401163427898f','_Pkemn4BMyTEolRfGAze','01067688817',NULL,NULL,'2022-01-27 05:59:30','2022-01-27 05:59:30',NULL),(28,'00001054011634278989','3vpTmn4BMyTEolRfkkKf','01067688817',NULL,NULL,'2022-01-27 06:57:55','2022-01-27 06:57:55',NULL),(29,'00001054011634278999','yhUAn34BMyTEolRfKo2t','01067688817',NULL,NULL,'2022-01-28 04:45:50','2022-01-28 04:45:50',NULL),(30,'153780304','LFuw1n4BMyTEolRfvt2u','01054500546',NULL,NULL,'2022-02-08 00:16:54','2022-02-08 00:16:54',NULL),(31,'00001054011634278989','ZFzD1n4BMyTEolRf7VAD','01067688817',NULL,NULL,'2022-02-08 00:37:51','2022-02-08 00:37:51',NULL),(32,'153805302','ZGGg134BMyTEolRfxXUr','01054500546',NULL,NULL,'2022-02-08 04:39:04','2022-02-08 04:39:04',NULL),(33,'153805303','O2Gi134BMyTEolRfyIGV','01054500546',NULL,NULL,'2022-02-08 04:41:16','2022-02-08 04:41:16',NULL),(34,'153805304','JGGu134BMyTEolRfv8nB','01054500546',NULL,NULL,'2022-02-08 04:54:20','2022-02-08 04:54:20',NULL),(35,'153805305','AWG0134BMyTEolRfIOm7','01054500546',NULL,NULL,'2022-02-08 05:00:13','2022-02-08 05:00:13',NULL),(36,'153805306','9mG3134BMyTEolRfuf3l','01054500546',NULL,NULL,'2022-02-08 05:04:09','2022-02-08 05:04:09',NULL),(37,'153805307','LGK6134BMyTEolRfwRCB','01054500546',NULL,NULL,'2022-02-08 05:07:27','2022-02-08 05:07:27',NULL),(38,'153805308','u2K7134BMyTEolRfhBQT','01054500546',NULL,NULL,'2022-02-08 05:08:17','2022-02-08 05:08:17',NULL),(39,'153805309','UWLN134BMyTEolRfI376','01025351104',NULL,NULL,'2022-02-08 05:27:32','2022-02-08 05:27:32',NULL),(40,'153805310','UmLN134BMyTEolRfNX7b','01067688817',NULL,NULL,'2022-02-08 05:27:37','2022-02-08 05:27:37',NULL),(41,'153805311','3mQu2H4BMyTEolRf0cTg','01054500546',NULL,NULL,'2022-02-08 07:14:14','2022-02-08 07:14:14',NULL);
/*!40000 ALTER TABLE `tb_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_contact_attribute`
--

DROP TABLE IF EXISTS `tb_contact_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_contact_attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `value` varchar(200) COLLATE utf8_bin NOT NULL,
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `tb_contact_attribute_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `tb_contact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_contact_attribute`
--

LOCK TABLES `tb_contact_attribute` WRITE;
/*!40000 ALTER TABLE `tb_contact_attribute` DISABLE KEYS */;
INSERT INTO `tb_contact_attribute` VALUES (1,1,'sysNo','6002',NULL,NULL,'2022-01-18 08:53:38','2022-01-18 08:53:38',NULL),(2,1,'dnis','40000',NULL,NULL,'2022-01-18 08:53:38','2022-01-18 08:53:38',NULL),(3,1,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-18 08:53:38','2022-01-18 08:53:38',NULL),(4,1,'os','And',NULL,NULL,'2022-01-18 08:53:38','2022-01-18 08:53:38',NULL),(5,1,'chNo','123',NULL,NULL,'2022-01-18 08:53:38','2022-01-18 08:53:38',NULL),(6,1,'status','conn',NULL,NULL,'2022-01-18 08:53:38','2022-01-18 08:53:38',NULL),(7,2,'sysNo','6002',NULL,NULL,'2022-01-19 08:05:37','2022-01-19 08:05:37',NULL),(8,2,'dnis','40000',NULL,NULL,'2022-01-19 08:05:37','2022-01-19 08:05:37',NULL),(9,2,'chNo','123',NULL,NULL,'2022-01-19 08:05:37','2022-01-19 08:05:37',NULL),(10,2,'status','conn',NULL,NULL,'2022-01-19 08:05:37','2022-01-19 08:05:37',NULL),(11,2,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-19 08:05:37','2022-01-19 08:05:37',NULL),(12,2,'os','And',NULL,NULL,'2022-01-19 08:05:37','2022-01-19 08:05:37',NULL),(13,3,'sysNo','6002',NULL,NULL,'2022-01-19 08:45:16','2022-01-19 08:45:16',NULL),(14,3,'dnis','40000',NULL,NULL,'2022-01-19 08:45:16','2022-01-19 08:45:16',NULL),(15,3,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-19 08:45:16','2022-01-19 08:45:16',NULL),(16,3,'chNo','123',NULL,NULL,'2022-01-19 08:45:16','2022-01-19 08:45:16',NULL),(17,3,'status','conn',NULL,NULL,'2022-01-19 08:45:16','2022-01-19 08:45:16',NULL),(18,3,'os','And',NULL,NULL,'2022-01-19 08:45:16','2022-01-19 08:45:16',NULL),(19,4,'sysNo','6002',NULL,NULL,'2022-01-19 08:46:19','2022-01-19 08:46:19',NULL),(20,4,'dnis','40000',NULL,NULL,'2022-01-19 08:46:19','2022-01-19 08:46:19',NULL),(21,4,'chNo','123',NULL,NULL,'2022-01-19 08:46:19','2022-01-19 08:46:19',NULL),(22,4,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-19 08:46:19','2022-01-19 08:46:19',NULL),(23,4,'status','conn',NULL,NULL,'2022-01-19 08:46:19','2022-01-19 08:46:19',NULL),(24,4,'os','And',NULL,NULL,'2022-01-19 08:46:19','2022-01-19 08:46:19',NULL),(25,5,'sysNo','6002',NULL,NULL,'2022-01-21 04:54:46','2022-01-21 04:54:46',NULL),(26,5,'dnis','40000',NULL,NULL,'2022-01-21 04:54:46','2022-01-21 04:54:46',NULL),(27,5,'chNo','123',NULL,NULL,'2022-01-21 04:54:46','2022-01-21 04:54:46',NULL),(28,5,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-21 04:54:46','2022-01-21 04:54:46',NULL),(29,5,'os','And',NULL,NULL,'2022-01-21 04:54:46','2022-01-21 04:54:46',NULL),(30,5,'status','conn',NULL,NULL,'2022-01-21 04:54:46','2022-01-21 04:54:46',NULL),(31,6,'sysNo','6002',NULL,NULL,'2022-01-21 07:46:56','2022-01-21 07:46:56',NULL),(32,6,'dnis','40000',NULL,NULL,'2022-01-21 07:46:56','2022-01-21 07:46:56',NULL),(33,6,'chNo','123',NULL,NULL,'2022-01-21 07:46:56','2022-01-21 07:46:56',NULL),(34,6,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-21 07:46:56','2022-01-21 07:46:56',NULL),(35,6,'os','And',NULL,NULL,'2022-01-21 07:46:56','2022-01-21 07:46:56',NULL),(36,6,'status','conn',NULL,NULL,'2022-01-21 07:46:56','2022-01-21 07:46:56',NULL),(37,7,'sysNo','6002',NULL,NULL,'2022-01-26 08:19:11','2022-01-26 08:19:11',NULL),(38,7,'dnis','40000',NULL,NULL,'2022-01-26 08:19:11','2022-01-26 08:19:11',NULL),(39,7,'chNo','123',NULL,NULL,'2022-01-26 08:19:11','2022-01-26 08:19:11',NULL),(40,7,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-26 08:19:11','2022-01-26 08:19:11',NULL),(41,7,'os','And',NULL,NULL,'2022-01-26 08:19:11','2022-01-26 08:19:11',NULL),(42,7,'status','conn',NULL,NULL,'2022-01-26 08:19:11','2022-01-26 08:19:11',NULL),(43,8,'sysNo','6002',NULL,NULL,'2022-01-26 08:31:46','2022-01-26 08:31:46',NULL),(44,8,'dnis','40000',NULL,NULL,'2022-01-26 08:31:46','2022-01-26 08:31:46',NULL),(45,8,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-26 08:31:46','2022-01-26 08:31:46',NULL),(46,8,'os','And',NULL,NULL,'2022-01-26 08:31:46','2022-01-26 08:31:46',NULL),(47,8,'chNo','123',NULL,NULL,'2022-01-26 08:31:46','2022-01-26 08:31:46',NULL),(48,8,'status','conn',NULL,NULL,'2022-01-26 08:31:46','2022-01-26 08:31:46',NULL),(49,9,'sysNo','6002',NULL,NULL,'2022-01-26 08:40:29','2022-01-26 08:40:29',NULL),(50,9,'dnis','40000',NULL,NULL,'2022-01-26 08:40:29','2022-01-26 08:40:29',NULL),(51,9,'os','And',NULL,NULL,'2022-01-26 08:40:29','2022-01-26 08:40:29',NULL),(52,9,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-26 08:40:29','2022-01-26 08:40:29',NULL),(53,9,'chNo','123',NULL,NULL,'2022-01-26 08:40:29','2022-01-26 08:40:29',NULL),(54,9,'status','conn',NULL,NULL,'2022-01-26 08:40:29','2022-01-26 08:40:29',NULL),(55,10,'sysNo','6002',NULL,NULL,'2022-01-27 04:32:42','2022-01-27 04:32:42',NULL),(56,10,'dnis','40000',NULL,NULL,'2022-01-27 04:32:42','2022-01-27 04:32:42',NULL),(57,10,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 04:32:42','2022-01-27 04:32:42',NULL),(58,10,'chNo','123',NULL,NULL,'2022-01-27 04:32:42','2022-01-27 04:32:42',NULL),(59,10,'os','And',NULL,NULL,'2022-01-27 04:32:42','2022-01-27 04:32:42',NULL),(60,10,'status','conn',NULL,NULL,'2022-01-27 04:32:42','2022-01-27 04:32:42',NULL),(61,11,'sysNo','6002',NULL,NULL,'2022-01-27 04:47:00','2022-01-27 04:47:00',NULL),(62,11,'dnis','40000',NULL,NULL,'2022-01-27 04:47:00','2022-01-27 04:47:00',NULL),(63,11,'status','conn',NULL,NULL,'2022-01-27 04:47:00','2022-01-27 04:47:00',NULL),(64,11,'chNo','123',NULL,NULL,'2022-01-27 04:47:00','2022-01-27 04:47:00',NULL),(65,11,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 04:47:00','2022-01-27 04:47:00',NULL),(66,11,'os','And',NULL,NULL,'2022-01-27 04:47:00','2022-01-27 04:47:00',NULL),(67,12,'sysNo','6002',NULL,NULL,'2022-01-27 04:52:38','2022-01-27 04:52:38',NULL),(68,12,'dnis','40000',NULL,NULL,'2022-01-27 04:52:38','2022-01-27 04:52:38',NULL),(69,12,'os','And',NULL,NULL,'2022-01-27 04:52:38','2022-01-27 04:52:38',NULL),(70,12,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 04:52:38','2022-01-27 04:52:38',NULL),(71,12,'chNo','123',NULL,NULL,'2022-01-27 04:52:38','2022-01-27 04:52:38',NULL),(72,12,'status','conn',NULL,NULL,'2022-01-27 04:52:38','2022-01-27 04:52:38',NULL),(73,13,'sysNo','6002',NULL,NULL,'2022-01-27 05:09:46','2022-01-27 05:09:46',NULL),(74,13,'dnis','40000',NULL,NULL,'2022-01-27 05:09:46','2022-01-27 05:09:46',NULL),(75,13,'os','And',NULL,NULL,'2022-01-27 05:09:46','2022-01-27 05:09:46',NULL),(76,13,'chNo','123',NULL,NULL,'2022-01-27 05:09:46','2022-01-27 05:09:46',NULL),(77,13,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:09:46','2022-01-27 05:09:46',NULL),(78,13,'status','conn',NULL,NULL,'2022-01-27 05:09:46','2022-01-27 05:09:46',NULL),(79,14,'sysNo','6002',NULL,NULL,'2022-01-27 05:10:16','2022-01-27 05:10:16',NULL),(80,14,'dnis','40000',NULL,NULL,'2022-01-27 05:10:16','2022-01-27 05:10:16',NULL),(81,14,'os','And',NULL,NULL,'2022-01-27 05:10:16','2022-01-27 05:10:16',NULL),(82,14,'chNo','123',NULL,NULL,'2022-01-27 05:10:16','2022-01-27 05:10:16',NULL),(83,14,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:10:16','2022-01-27 05:10:16',NULL),(84,14,'status','conn',NULL,NULL,'2022-01-27 05:10:16','2022-01-27 05:10:16',NULL),(85,15,'sysNo','6002',NULL,NULL,'2022-01-27 05:10:24','2022-01-27 05:10:24',NULL),(86,15,'chNo','123',NULL,NULL,'2022-01-27 05:10:24','2022-01-27 05:10:24',NULL),(87,15,'dnis','40000',NULL,NULL,'2022-01-27 05:10:24','2022-01-27 05:10:24',NULL),(88,15,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:10:24','2022-01-27 05:10:24',NULL),(89,15,'os','And',NULL,NULL,'2022-01-27 05:10:24','2022-01-27 05:10:24',NULL),(90,15,'status','conn',NULL,NULL,'2022-01-27 05:10:24','2022-01-27 05:10:24',NULL),(91,16,'sysNo','6002',NULL,NULL,'2022-01-27 05:11:15','2022-01-27 05:11:15',NULL),(92,16,'dnis','40000',NULL,NULL,'2022-01-27 05:11:15','2022-01-27 05:11:15',NULL),(93,16,'chNo','123',NULL,NULL,'2022-01-27 05:11:15','2022-01-27 05:11:15',NULL),(94,16,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:11:15','2022-01-27 05:11:15',NULL),(95,16,'os','And',NULL,NULL,'2022-01-27 05:11:15','2022-01-27 05:11:15',NULL),(96,16,'status','conn',NULL,NULL,'2022-01-27 05:11:15','2022-01-27 05:11:15',NULL),(97,17,'sysNo','6002',NULL,NULL,'2022-01-27 05:11:25','2022-01-27 05:11:25',NULL),(98,17,'dnis','40000',NULL,NULL,'2022-01-27 05:11:25','2022-01-27 05:11:25',NULL),(99,17,'chNo','123',NULL,NULL,'2022-01-27 05:11:25','2022-01-27 05:11:25',NULL),(100,17,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:11:25','2022-01-27 05:11:25',NULL),(101,17,'os','And',NULL,NULL,'2022-01-27 05:11:25','2022-01-27 05:11:25',NULL),(102,17,'status','conn',NULL,NULL,'2022-01-27 05:11:25','2022-01-27 05:11:25',NULL),(103,18,'sysNo','6002',NULL,NULL,'2022-01-27 05:15:04','2022-01-27 05:15:04',NULL),(104,18,'dnis','40000',NULL,NULL,'2022-01-27 05:15:04','2022-01-27 05:15:04',NULL),(105,18,'chNo','123',NULL,NULL,'2022-01-27 05:15:04','2022-01-27 05:15:04',NULL),(106,18,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:15:04','2022-01-27 05:15:04',NULL),(107,18,'os','And',NULL,NULL,'2022-01-27 05:15:04','2022-01-27 05:15:04',NULL),(108,18,'status','conn',NULL,NULL,'2022-01-27 05:15:04','2022-01-27 05:15:04',NULL),(109,19,'sysNo','6002',NULL,NULL,'2022-01-27 05:15:22','2022-01-27 05:15:22',NULL),(110,19,'dnis','40000',NULL,NULL,'2022-01-27 05:15:22','2022-01-27 05:15:22',NULL),(111,19,'status','conn',NULL,NULL,'2022-01-27 05:15:22','2022-01-27 05:15:22',NULL),(112,19,'chNo','123',NULL,NULL,'2022-01-27 05:15:22','2022-01-27 05:15:22',NULL),(113,19,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:15:22','2022-01-27 05:15:22',NULL),(114,19,'os','And',NULL,NULL,'2022-01-27 05:15:22','2022-01-27 05:15:22',NULL),(115,20,'sysNo','6002',NULL,NULL,'2022-01-27 05:15:50','2022-01-27 05:15:50',NULL),(116,20,'dnis','40000',NULL,NULL,'2022-01-27 05:15:50','2022-01-27 05:15:50',NULL),(117,20,'chNo','123',NULL,NULL,'2022-01-27 05:15:50','2022-01-27 05:15:50',NULL),(118,20,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:15:50','2022-01-27 05:15:50',NULL),(119,20,'os','And',NULL,NULL,'2022-01-27 05:15:50','2022-01-27 05:15:50',NULL),(120,20,'status','conn',NULL,NULL,'2022-01-27 05:15:50','2022-01-27 05:15:50',NULL),(121,21,'sysNo','6002',NULL,NULL,'2022-01-27 05:25:25','2022-01-27 05:25:25',NULL),(122,21,'dnis','40000',NULL,NULL,'2022-01-27 05:25:25','2022-01-27 05:25:25',NULL),(123,21,'chNo','123',NULL,NULL,'2022-01-27 05:25:25','2022-01-27 05:25:25',NULL),(124,21,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:25:25','2022-01-27 05:25:25',NULL),(125,21,'os','And',NULL,NULL,'2022-01-27 05:25:25','2022-01-27 05:25:25',NULL),(126,21,'status','conn',NULL,NULL,'2022-01-27 05:25:25','2022-01-27 05:25:25',NULL),(127,22,'sysNo','6002',NULL,NULL,'2022-01-27 05:35:11','2022-01-27 05:35:11',NULL),(128,22,'dnis','40000',NULL,NULL,'2022-01-27 05:35:11','2022-01-27 05:35:11',NULL),(129,22,'chNo','123',NULL,NULL,'2022-01-27 05:35:11','2022-01-27 05:35:11',NULL),(130,22,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:35:11','2022-01-27 05:35:11',NULL),(131,22,'os','And',NULL,NULL,'2022-01-27 05:35:11','2022-01-27 05:35:11',NULL),(132,22,'status','conn',NULL,NULL,'2022-01-27 05:35:11','2022-01-27 05:35:11',NULL),(133,23,'sysNo','6002',NULL,NULL,'2022-01-27 05:36:24','2022-01-27 05:36:24',NULL),(134,23,'dnis','40000',NULL,NULL,'2022-01-27 05:36:24','2022-01-27 05:36:24',NULL),(135,23,'chNo','123',NULL,NULL,'2022-01-27 05:36:24','2022-01-27 05:36:24',NULL),(136,23,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:36:24','2022-01-27 05:36:24',NULL),(137,23,'os','And',NULL,NULL,'2022-01-27 05:36:24','2022-01-27 05:36:24',NULL),(138,23,'status','conn',NULL,NULL,'2022-01-27 05:36:24','2022-01-27 05:36:24',NULL),(139,24,'sysNo','6002',NULL,NULL,'2022-01-27 05:40:47','2022-01-27 05:40:47',NULL),(140,24,'dnis','40000',NULL,NULL,'2022-01-27 05:40:47','2022-01-27 05:40:47',NULL),(141,24,'chNo','123',NULL,NULL,'2022-01-27 05:40:47','2022-01-27 05:40:47',NULL),(142,24,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:40:47','2022-01-27 05:40:47',NULL),(143,24,'os','And',NULL,NULL,'2022-01-27 05:40:47','2022-01-27 05:40:47',NULL),(144,24,'status','conn',NULL,NULL,'2022-01-27 05:40:47','2022-01-27 05:40:47',NULL),(145,25,'sysNo','6002',NULL,NULL,'2022-01-27 05:42:00','2022-01-27 05:42:00',NULL),(146,25,'dnis','40000',NULL,NULL,'2022-01-27 05:42:00','2022-01-27 05:42:00',NULL),(147,25,'chNo','123',NULL,NULL,'2022-01-27 05:42:00','2022-01-27 05:42:00',NULL),(148,25,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:42:00','2022-01-27 05:42:00',NULL),(149,25,'os','And',NULL,NULL,'2022-01-27 05:42:00','2022-01-27 05:42:00',NULL),(150,25,'status','conn',NULL,NULL,'2022-01-27 05:42:00','2022-01-27 05:42:00',NULL),(151,26,'sysNo','6002',NULL,NULL,'2022-01-27 05:58:57','2022-01-27 05:58:57',NULL),(152,26,'dnis','40000',NULL,NULL,'2022-01-27 05:58:57','2022-01-27 05:58:57',NULL),(153,26,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:58:57','2022-01-27 05:58:57',NULL),(154,26,'status','conn',NULL,NULL,'2022-01-27 05:58:57','2022-01-27 05:58:57',NULL),(155,26,'chNo','123',NULL,NULL,'2022-01-27 05:58:57','2022-01-27 05:58:57',NULL),(156,26,'os','And',NULL,NULL,'2022-01-27 05:58:57','2022-01-27 05:58:57',NULL),(157,27,'sysNo','6002',NULL,NULL,'2022-01-27 05:59:30','2022-01-27 05:59:30',NULL),(158,27,'dnis','40000',NULL,NULL,'2022-01-27 05:59:30','2022-01-27 05:59:30',NULL),(159,27,'chNo','123',NULL,NULL,'2022-01-27 05:59:30','2022-01-27 05:59:30',NULL),(160,27,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 05:59:30','2022-01-27 05:59:30',NULL),(161,27,'os','And',NULL,NULL,'2022-01-27 05:59:30','2022-01-27 05:59:30',NULL),(162,27,'status','conn',NULL,NULL,'2022-01-27 05:59:30','2022-01-27 05:59:30',NULL),(163,28,'sysNo','6002',NULL,NULL,'2022-01-27 06:57:55','2022-01-27 06:57:55',NULL),(164,28,'dnis','40000',NULL,NULL,'2022-01-27 06:57:55','2022-01-27 06:57:55',NULL),(165,28,'status','conn',NULL,NULL,'2022-01-27 06:57:55','2022-01-27 06:57:55',NULL),(166,28,'chNo','123',NULL,NULL,'2022-01-27 06:57:55','2022-01-27 06:57:55',NULL),(167,28,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-27 06:57:55','2022-01-27 06:57:55',NULL),(168,28,'os','And',NULL,NULL,'2022-01-27 06:57:55','2022-01-27 06:57:55',NULL),(169,29,'sysno','6002',NULL,NULL,'2022-01-28 04:45:50','2022-01-28 04:45:50',NULL),(170,29,'dnis','40000',NULL,NULL,'2022-01-28 04:45:50','2022-01-28 04:45:50',NULL),(171,29,'chno','123',NULL,NULL,'2022-01-28 04:45:50','2022-01-28 04:45:50',NULL),(172,29,'os','And',NULL,NULL,'2022-01-28 04:45:50','2022-01-28 04:45:50',NULL),(173,29,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-01-28 04:45:50','2022-01-28 04:45:50',NULL),(174,29,'status','disconn',NULL,NULL,'2022-01-28 04:45:50','2022-02-03 14:51:27',NULL),(175,30,'sysno','6001',NULL,NULL,'2022-02-08 00:16:54','2022-02-08 00:16:54',NULL),(176,30,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-08 00:16:54','2022-02-08 00:16:54',NULL),(177,30,'dnis','40000',NULL,NULL,'2022-02-08 00:16:54','2022-02-08 00:16:54',NULL),(178,30,'chno','001',NULL,NULL,'2022-02-08 00:16:54','2022-02-08 00:16:54',NULL),(179,30,'os','And',NULL,NULL,'2022-02-08 00:16:54','2022-02-08 00:16:54',NULL),(180,30,'status','conn',NULL,NULL,'2022-02-08 00:16:54','2022-02-08 00:16:54',NULL),(181,31,'sysno','6002',NULL,NULL,'2022-02-08 00:37:51','2022-02-08 00:37:51',NULL),(182,31,'dnis','40000',NULL,NULL,'2022-02-08 00:37:51','2022-02-08 00:37:51',NULL),(183,31,'chno','123',NULL,NULL,'2022-02-08 00:37:51','2022-02-08 00:37:51',NULL),(184,31,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-08 00:37:51','2022-02-08 00:37:51',NULL),(185,31,'os','And',NULL,NULL,'2022-02-08 00:37:51','2022-02-08 00:37:51',NULL),(186,31,'status','conn',NULL,NULL,'2022-02-08 00:37:51','2022-02-08 00:37:51',NULL),(187,32,'sysno','6001',NULL,NULL,'2022-02-08 04:39:04','2022-02-08 04:39:04',NULL),(188,32,'os','And',NULL,NULL,'2022-02-08 04:39:04','2022-02-08 04:39:04',NULL),(189,32,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-08 04:39:04','2022-02-08 04:39:04',NULL),(190,32,'chno','001',NULL,NULL,'2022-02-08 04:39:04','2022-02-08 04:39:04',NULL),(191,32,'dnis','40000',NULL,NULL,'2022-02-08 04:39:04','2022-02-08 04:39:04',NULL),(192,32,'status','conn',NULL,NULL,'2022-02-08 04:39:04','2022-02-08 04:39:04',NULL),(193,33,'sysno','6001',NULL,NULL,'2022-02-08 04:41:16','2022-02-08 04:41:16',NULL),(194,33,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-08 04:41:16','2022-02-08 04:41:16',NULL),(195,33,'os','And',NULL,NULL,'2022-02-08 04:41:16','2022-02-08 04:41:16',NULL),(196,33,'chno','001',NULL,NULL,'2022-02-08 04:41:16','2022-02-08 04:41:16',NULL),(197,33,'dnis','40000',NULL,NULL,'2022-02-08 04:41:16','2022-02-08 04:41:16',NULL),(198,33,'status','conn',NULL,NULL,'2022-02-08 04:41:16','2022-02-08 04:41:16',NULL),(199,34,'sysno','6001',NULL,NULL,'2022-02-08 04:54:20','2022-02-08 04:54:20',NULL),(200,34,'os','And',NULL,NULL,'2022-02-08 04:54:20','2022-02-08 04:54:20',NULL),(201,34,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-08 04:54:20','2022-02-08 04:54:20',NULL),(202,34,'dnis','40000',NULL,NULL,'2022-02-08 04:54:20','2022-02-08 04:54:20',NULL),(203,34,'chno','001',NULL,NULL,'2022-02-08 04:54:20','2022-02-08 04:54:20',NULL),(204,34,'status','conn',NULL,NULL,'2022-02-08 04:54:20','2022-02-08 04:54:20',NULL),(205,35,'sysno','6001',NULL,NULL,'2022-02-08 05:00:13','2022-02-08 05:00:13',NULL),(206,35,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-08 05:00:13','2022-02-08 05:00:13',NULL),(207,35,'os','And',NULL,NULL,'2022-02-08 05:00:13','2022-02-08 05:00:13',NULL),(208,35,'chno','001',NULL,NULL,'2022-02-08 05:00:13','2022-02-08 05:00:13',NULL),(209,35,'dnis','40000',NULL,NULL,'2022-02-08 05:00:13','2022-02-08 05:00:13',NULL),(210,35,'status','conn',NULL,NULL,'2022-02-08 05:00:13','2022-02-08 05:00:13',NULL),(211,36,'sysno','6001',NULL,NULL,'2022-02-08 05:04:09','2022-02-08 05:04:09',NULL),(212,36,'dnis','40000',NULL,NULL,'2022-02-08 05:04:09','2022-02-08 05:04:09',NULL),(213,36,'os','And',NULL,NULL,'2022-02-08 05:04:09','2022-02-08 05:04:09',NULL),(214,36,'chno','001',NULL,NULL,'2022-02-08 05:04:09','2022-02-08 05:04:09',NULL),(215,36,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-08 05:04:09','2022-02-08 05:04:09',NULL),(216,36,'status','conn',NULL,NULL,'2022-02-08 05:04:09','2022-02-08 05:04:09',NULL),(217,37,'sysno','6001',NULL,NULL,'2022-02-08 05:07:27','2022-02-08 05:07:27',NULL),(218,37,'dnis','40000',NULL,NULL,'2022-02-08 05:07:27','2022-02-08 05:07:27',NULL),(219,37,'os','And',NULL,NULL,'2022-02-08 05:07:27','2022-02-08 05:07:27',NULL),(220,37,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-08 05:07:27','2022-02-08 05:07:27',NULL),(221,37,'chno','001',NULL,NULL,'2022-02-08 05:07:27','2022-02-08 05:07:27',NULL),(222,37,'status','conn',NULL,NULL,'2022-02-08 05:07:27','2022-02-08 05:07:27',NULL),(223,38,'sysno','6001',NULL,NULL,'2022-02-08 05:08:17','2022-02-08 05:08:17',NULL),(224,38,'dnis','40000',NULL,NULL,'2022-02-08 05:08:17','2022-02-08 05:08:17',NULL),(225,38,'os','And',NULL,NULL,'2022-02-08 05:08:17','2022-02-08 05:08:17',NULL),(226,38,'chno','001',NULL,NULL,'2022-02-08 05:08:17','2022-02-08 05:08:17',NULL),(227,38,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-08 05:08:17','2022-02-08 05:08:17',NULL),(228,38,'status','conn',NULL,NULL,'2022-02-08 05:08:17','2022-02-08 05:08:17',NULL),(229,39,'sysno','6001',NULL,NULL,'2022-02-08 05:27:32','2022-02-08 05:27:32',NULL),(230,39,'dnis','40000',NULL,NULL,'2022-02-08 05:27:32','2022-02-08 05:27:32',NULL),(231,39,'chno','001',NULL,NULL,'2022-02-08 05:27:32','2022-02-08 05:27:32',NULL),(232,39,'os','And',NULL,NULL,'2022-02-08 05:27:32','2022-02-08 05:27:32',NULL),(233,39,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-08 05:27:32','2022-02-08 05:27:32',NULL),(234,39,'status','conn',NULL,NULL,'2022-02-08 05:27:32','2022-02-08 05:27:32',NULL),(235,40,'sysno','6001',NULL,NULL,'2022-02-08 05:27:37','2022-02-08 05:27:37',NULL),(236,40,'os','And',NULL,NULL,'2022-02-08 05:27:37','2022-02-08 05:27:37',NULL),(237,40,'chno','001',NULL,NULL,'2022-02-08 05:27:37','2022-02-08 05:27:37',NULL),(238,40,'dnis','40000',NULL,NULL,'2022-02-08 05:27:37','2022-02-08 05:27:37',NULL),(239,40,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-08 05:27:37','2022-02-08 05:27:37',NULL),(240,40,'status','conn',NULL,NULL,'2022-02-08 05:27:37','2022-02-08 05:27:37',NULL),(241,41,'sysno','6001',NULL,NULL,'2022-02-08 07:14:14','2022-02-08 07:14:14',NULL),(242,41,'os','And',NULL,NULL,'2022-02-08 07:14:14','2022-02-08 07:14:14',NULL),(243,41,'chno','001',NULL,NULL,'2022-02-08 07:14:14','2022-02-08 07:14:14',NULL),(244,41,'dnis','40000',NULL,NULL,'2022-02-08 07:14:14','2022-02-08 07:14:14',NULL),(245,41,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-08 07:14:14','2022-02-08 07:14:14',NULL),(246,41,'status','conn',NULL,NULL,'2022-02-08 07:14:14','2022-02-08 07:14:14',NULL);
/*!40000 ALTER TABLE `tb_contact_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_contact_session`
--

DROP TABLE IF EXISTS `tb_contact_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_contact_session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `refresh_token` varchar(300) COLLATE utf8_bin NOT NULL,
  `expire_at` datetime NOT NULL,
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `tb_contact_session_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `tb_contact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_contact_session`
--

LOCK TABLES `tb_contact_session` WRITE;
/*!40000 ALTER TABLE `tb_contact_session` DISABLE KEYS */;
INSERT INTO `tb_contact_session` VALUES (2,1,'refresh','2022-01-18 09:24:10',NULL,NULL,'2022-01-18 08:54:10','2022-01-18 08:54:10','2022-01-21 07:17:20'),(3,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OCIsImtleSI6IkUwZjhlbjRCTXlURW9sUmZ0UVZmIn0sImlhdCI6MTY0Mjc0MTM0NSwiZXhwIjoxNjQyNzQ0OTQ1LCJzdWIiOiJBVCJ9.M-NXHrJPW7THuIrS3Ta0hegytBf78oIvgy2jR8_JOi0','2022-01-21 06:02:25',NULL,NULL,'2022-01-21 05:03:59','2022-01-21 05:03:59','2022-01-21 07:17:20'),(4,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OCIsImtleSI6IkUwZjhlbjRCTXlURW9sUmZ0UVZmIn0sImlhdCI6MTY0Mjc0MTU3NiwiZXhwIjoxNjQyNzQ1MTc2LCJzdWIiOiJBVCJ9.30bKq8hfnKMSOJaNfn99TrGU18kCHampBJzOU5xYP_Y','2022-01-21 06:06:16',NULL,NULL,'2022-01-21 05:06:18','2022-01-21 05:06:18','2022-01-21 07:17:20'),(5,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OCIsImtleSI6IkUwZjhlbjRCTXlURW9sUmZ0UVZmIn0sImlhdCI6MTY0Mjc0MTcyMiwiZXhwIjoxNjQyNzQ1MzIyLCJzdWIiOiJBVCJ9.WGAnRl1aO_WvsHYt8Z5j6LrV9MMi_hjtljPuV7CJovY','2022-01-21 06:08:42',NULL,NULL,'2022-01-21 05:08:43','2022-01-21 05:08:43','2022-01-21 07:17:20'),(6,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OCIsImtleSI6IkUwZjhlbjRCTXlURW9sUmZ0UVZmIn0sImlhdCI6MTY0Mjc0OTE0NiwiZXhwIjoxNjQyNzQ5NzQ2LCJzdWIiOiJBVCJ9.-64oW7AVUcjiWPYR2r623LlkyoCgBwCeF1p7YsnsW0E','2022-01-21 07:22:26',NULL,NULL,'2022-01-21 07:12:26','2022-01-21 07:12:26','2022-01-21 07:19:09'),(7,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OCIsImtleSI6IkUwZjhlbjRCTXlURW9sUmZ0UVZmIn0sImlhdCI6MTY0Mjc0OTMyMCwiZXhwIjoxNjQyNzQ5OTIwLCJzdWIiOiJBVCJ9.J_SoKssPhqUd6twv0cyRkVqO5HDdt2NwSdeu6DucwjA','2022-01-21 07:25:20',NULL,NULL,'2022-01-21 07:15:20','2022-01-21 07:15:20','2022-01-21 07:19:09'),(8,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OCIsImtleSI6IkUwZjhlbjRCTXlURW9sUmZ0UVZmIn0sImlhdCI6MTY0Mjc0OTQ0MCwiZXhwIjoxNjQyNzUwMDQwLCJzdWIiOiJBVCJ9.OCgfsvh-yRDdFe78Jcim9b6teR49aUfJEaF7xYtC4qY','2022-01-21 07:27:20',NULL,NULL,'2022-01-21 07:17:20','2022-01-21 07:17:20','2022-01-21 07:19:09'),(9,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OCIsImtleSI6IkUwZjhlbjRCTXlURW9sUmZ0UVZmIn0sImlhdCI6MTY0Mjc0OTU0OSwiZXhwIjoxNjQyNzUwMTQ5LCJzdWIiOiJBVCJ9.POwsiBbv4fd4_QzHnuVcu8XyY_Kg82F6lcUAUArydck','2022-01-21 07:29:09',NULL,NULL,'2022-01-21 07:19:09','2022-01-21 07:19:09','2022-01-21 07:20:26'),(10,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OCIsImtleSI6IkUwZjhlbjRCTXlURW9sUmZ0UVZmIn0sImlhdCI6MTY0Mjc0OTYyNiwiZXhwIjoxNjQyNzUwMjI2LCJzdWIiOiJBVCJ9.G0nuN_ZtM0c6HLqtL6A9mFdP0yuCG2FvttJVI2V-eW0','2022-01-21 07:30:26',NULL,NULL,'2022-01-21 07:20:26','2022-01-21 07:20:26','2022-01-21 07:21:28'),(11,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OCIsImtleSI6Ii1fUmtiSDRCTXlURW9sUmZTTFJFIn0sImlhdCI6MTY0Mjc0OTY5NywiZXhwIjoxNjQyNzUwMjk3LCJzdWIiOiJBVCJ9.CKeTn3C0sSpIbAn2ldOHXntDeJEBIVpFa_foWhCiOsI','2022-01-21 07:31:37',NULL,NULL,'2022-01-21 07:21:28','2022-01-21 07:21:50','2022-01-21 07:31:49'),(12,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OCIsImtleSI6IkUwZjhlbjRCTXlURW9sUmZ0UVZmIn0sImlhdCI6MTY0Mjc1MDMwOSwiZXhwIjoxNjQyNzUwOTA5LCJzdWIiOiJBVCJ9.ejHsoaloTJIRALfCUwqWq3BjBr5Fz2v5PJaiyJeAWEQ','2022-01-21 07:41:49',NULL,NULL,'2022-01-21 07:31:49','2022-01-21 07:31:49','2022-01-21 07:34:32'),(13,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OCIsImtleSI6Ii1fUmtiSDRCTXlURW9sUmZTTFJFIn0sImlhdCI6MTY0Mjc1MDg2NiwiZXhwIjoxNjQyNzUxNDY2LCJzdWIiOiJBVCJ9.Lbl0emuIK4lYEMUR7Gw4YJbtPvX4ZS664ySKRpyHWIg','2022-01-21 07:51:06',NULL,NULL,'2022-01-21 07:34:32','2022-01-21 07:41:06',NULL),(14,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OSIsImtleSI6IjhFcWFlMzRCTXlURW9sUmZUb2hFIn0sImlhdCI6MTY0Mjc1MTYzOSwiZXhwIjoxNjQyNzUyMjM5LCJzdWIiOiJBVCJ9.Hi6tyo1PuNXjTSYLVUPTYPavrNoeQZdM8ZLLtqnnPqQ','2022-01-21 08:03:59',NULL,NULL,'2022-01-21 07:47:18','2022-01-21 07:53:59','2022-01-21 08:00:05'),(15,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OSIsImtleSI6IjhFcWFlMzRCTXlURW9sUmZUb2hFIn0sImlhdCI6MTY0Mjc1MjAwNSwiZXhwIjoxNjQyNzUyNjA1LCJzdWIiOiJBVCJ9.xOKS7jKqsH6ZhaOw8L9brWs5k2uYWtvBCgkufH85D1g','2022-01-21 08:10:05',NULL,NULL,'2022-01-21 08:00:05','2022-01-21 08:00:05','2022-01-21 08:09:40'),(16,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OSIsImtleSI6IjhFcWFlMzRCTXlURW9sUmZUb2hFIn0sImlhdCI6MTY0Mjc1MjU4MCwiZXhwIjoxNjQyNzUzMTgwLCJzdWIiOiJBVCJ9.-6rYETOumXkXYCJZZBSpsVKAqvQ7nPX4Bahf4m16dlA','2022-01-21 08:19:40',NULL,NULL,'2022-01-21 08:09:40','2022-01-21 08:09:40','2022-01-21 08:11:09'),(17,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OSIsImtleSI6IjhFcWFlMzRCTXlURW9sUmZUb2hFIn0sImlhdCI6MTY0Mjc1MjY2OSwiZXhwIjoxNjQyNzUzMjY5LCJzdWIiOiJBVCJ9.2FPusvHpKCP6eZsHmadvIifHao0KAT5qh8tqiyKFMG8','2022-01-21 08:21:09',NULL,NULL,'2022-01-21 08:11:09','2022-01-21 08:11:09','2022-01-21 08:36:19'),(18,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OSIsImtleSI6IjhFcWFlMzRCTXlURW9sUmZUb2hFIn0sImlhdCI6MTY0MzA3Mzg0MiwiZXhwIjoxNjQzMDc3NDQyLCJzdWIiOiJBVCJ9.LZLAn-7m0-jqX7nsgai4wPs1BzwBlSUkMyraFIeQXsY','2022-01-25 02:24:02',NULL,NULL,'2022-01-25 01:24:02','2022-01-25 01:24:02','2022-01-25 01:24:41'),(19,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OSIsImtleSI6IjhFcWFlMzRCTXlURW9sUmZUb2hFIn0sImlhdCI6MTY0MzA3Mzg4MSwiZXhwIjoxNjQzMDc3NDgxLCJzdWIiOiJBVCJ9.I3e4BM_dT0c7w4Vz_gH4zv0vONhdxboX9WrZh0W6Jb4','2022-01-25 02:24:41',NULL,NULL,'2022-01-25 01:24:41','2022-01-25 01:24:41','2022-01-25 01:36:29'),(20,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OSIsImtleSI6IjhFcWFlMzRCTXlURW9sUmZUb2hFIn0sImlhdCI6MTY0MzA3NDU4OSwiZXhwIjoxNjQzMDc4MTg5LCJzdWIiOiJBVCJ9.WJAhKwPLdEph0jM-M7GteM0Sqn7vVFiORHqtCCSmtq0','2022-01-25 02:36:29',NULL,NULL,'2022-01-25 01:36:29','2022-01-25 01:36:29','2022-01-25 06:32:36'),(21,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OSIsImtleSI6IjhFcWFlMzRCTXlURW9sUmZUb2hFIn0sImlhdCI6MTY0MzA5MjM1NiwiZXhwIjoxNjQzMDk1OTU2LCJzdWIiOiJBVCJ9.hM6ngASPIDZgFnjRTtckKFpewarW7Rc51k2PJ_HiJl4','2022-01-25 07:32:36',NULL,NULL,'2022-01-25 06:32:36','2022-01-25 06:32:36','2022-01-26 05:43:46'),(22,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OSIsImtleSI6IjhFcWFlMzRCTXlURW9sUmZUb2hFIn0sImlhdCI6MTY0MzE3NTgyOSwiZXhwIjoxNjQzMTc5NDI5LCJzdWIiOiJBVCJ9.uoFfNeXenZ8vAcDOwiRFEkEavQmPgEWIgHZ8sy66Jq4','2022-01-26 06:43:49',NULL,NULL,'2022-01-26 05:43:46','2022-01-26 05:43:49','2022-01-28 05:38:26'),(23,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImFuaSI6IjAxMDY3Njg4ODE3IiwiY2hLZXkiOiIwMDAwMTA1NDAxMTYzNDI3ODk4OSIsImtleSI6IjhFcWFlMzRCTXlURW9sUmZUb2hFIn0sImlhdCI6MTY0MzM0ODMxNCwiZXhwIjoxNjQzMzUxOTE0LCJzdWIiOiJBVCJ9.uFNbgnokDcHYXxTPDwoWokuxDFrg5xYioKkRHXjMZo4','2022-01-28 06:38:34',NULL,NULL,'2022-01-28 05:38:26','2022-01-28 05:38:34',NULL);
/*!40000 ALTER TABLE `tb_contact_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_gateway_request`
--

DROP TABLE IF EXISTS `tb_gateway_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_gateway_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `method` varchar(10) NOT NULL DEFAULT 'POST',
  `path` varchar(200) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_gateway_request`
--

LOCK TABLES `tb_gateway_request` WRITE;
/*!40000 ALTER TABLE `tb_gateway_request` DISABLE KEYS */;
INSERT INTO `tb_gateway_request` VALUES (1,'컨택 키 발행 요청','POST','/contact/key','설명',NULL,NULL,'2022-01-26 15:13:11','2022-01-26 15:13:11',NULL);
/*!40000 ALTER TABLE `tb_gateway_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_gateway_request_param`
--

DROP TABLE IF EXISTS `tb_gateway_request_param`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_gateway_request_param` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gateway_request_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `type` varchar(10) COLLATE utf8_bin NOT NULL,
  `value_type` varchar(10) COLLATE utf8_bin NOT NULL,
  `is_requied` tinyint(1) NOT NULL DEFAULT 0,
  `is_nullable` tinyint(1) NOT NULL DEFAULT 0,
  `min_length` int(11) NOT NULL DEFAULT 0,
  `max_length` int(11) NOT NULL DEFAULT 0,
  `string_regex` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gateway_request_id` (`gateway_request_id`),
  CONSTRAINT `tb_gateway_request_param_ibfk_1` FOREIGN KEY (`gateway_request_id`) REFERENCES `tb_gateway_request` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_gateway_request_param`
--

LOCK TABLES `tb_gateway_request_param` WRITE;
/*!40000 ALTER TABLE `tb_gateway_request_param` DISABLE KEYS */;
INSERT INTO `tb_gateway_request_param` VALUES (1,1,'callId','BODY','String',1,0,0,20,'[0-9]',NULL,NULL,'2022-01-26 17:11:51','2022-01-26 17:11:51',NULL),(2,1,'ani','BODY','String',1,0,0,0,'',NULL,NULL,'2022-01-26 17:11:52','2022-01-26 17:11:52',NULL);
/*!40000 ALTER TABLE `tb_gateway_request_param` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_menu`
--

DROP TABLE IF EXISTS `tb_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `display_name` varchar(50) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `type` varchar(10) NOT NULL,
  `authentication_type` int(11) NOT NULL,
  `position` varchar(10) NOT NULL,
  `reference` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `step` int(11) NOT NULL,
  `image_link` varchar(500) NOT NULL,
  `link_name` varchar(100) DEFAULT NULL,
  `link_url` varchar(500) DEFAULT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_menu`
--

LOCK TABLES `tb_menu` WRITE;
/*!40000 ALTER TABLE `tb_menu` DISABLE KEYS */;
INSERT INTO `tb_menu` VALUES (1,'LINK_10100','지점 찾기','지점 찾기','지점 찾기 설명','MENU',0,'L',0,1,0,'https://','image name',NULL,NULL,NULL,'2022-01-17 09:11:59','2022-01-17 09:11:59',NULL),(2,'MENU_10000','Main','Main','메인 메뉴 설명','MENU',0,'M',0,1,0,'https://main','image main name','/main',NULL,NULL,'2022-01-17 09:16:20','2022-01-17 09:16:20',NULL),(3,'testmenu1','테스트메뉴1','테스트메뉴1','descriont','MENU',0,'L',0,1,0,'',NULL,NULL,NULL,NULL,'2022-01-20 03:01:58','2022-01-20 03:01:58',NULL),(4,'testmenu2','테스트메뉴2','테스트메뉴2','descriont2','LINK',0,'M',0,1,0,'',NULL,NULL,NULL,NULL,'2022-01-20 03:02:18','2022-01-20 03:02:18',NULL),(5,'testmenu3','테스트메뉴3','테스트메뉴3','descriont3','STATIC',0,'M',0,1,0,'',NULL,NULL,NULL,NULL,'2022-01-20 03:02:37','2022-01-20 03:02:37',NULL),(6,'testmenu4','테스트메뉴4','테스트메뉴4','descriont4','STATIC',0,'B',0,1,0,'',NULL,NULL,NULL,NULL,'2022-01-20 03:02:58','2022-01-20 03:02:58',NULL);
/*!40000 ALTER TABLE `tb_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_menu_group`
--

DROP TABLE IF EXISTS `tb_menu_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_menu_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_menu_group`
--

LOCK TABLES `tb_menu_group` WRITE;
/*!40000 ALTER TABLE `tb_menu_group` DISABLE KEYS */;
INSERT INTO `tb_menu_group` VALUES (1,'testgroup1','testgroup1description',NULL,NULL,'2022-01-20 04:19:07','2022-01-20 04:19:07',NULL),(2,'testgroup2','testgroup2description',NULL,NULL,'2022-01-20 04:19:16','2022-01-20 04:19:16',NULL);
/*!40000 ALTER TABLE `tb_menu_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_menu_group_map`
--

DROP TABLE IF EXISTS `tb_menu_group_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_menu_group_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) NOT NULL,
  `menu_group_id` int(11) NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_id` (`menu_id`),
  KEY `menu_group_id` (`menu_group_id`),
  CONSTRAINT `tb_menu_group_map_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `tb_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tb_menu_group_map_ibfk_2` FOREIGN KEY (`menu_group_id`) REFERENCES `tb_menu_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_menu_group_map`
--

LOCK TABLES `tb_menu_group_map` WRITE;
/*!40000 ALTER TABLE `tb_menu_group_map` DISABLE KEYS */;
INSERT INTO `tb_menu_group_map` VALUES (1,1,1,NULL,'2022-01-20 04:20:19',NULL),(2,2,1,NULL,'2022-01-20 04:20:20',NULL),(3,3,1,NULL,'2022-01-20 04:20:21',NULL),(4,4,2,NULL,'2022-01-20 04:20:23',NULL),(5,5,2,NULL,'2022-01-20 04:20:25',NULL),(6,6,2,NULL,'2022-01-20 04:20:26',NULL);
/*!40000 ALTER TABLE `tb_menu_group_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_service_denial_user`
--

DROP TABLE IF EXISTS `tb_service_denial_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_service_denial_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ani` varchar(20) COLLATE utf8_bin NOT NULL,
  `request_from` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_service_denial_user`
--

LOCK TABLES `tb_service_denial_user` WRITE;
/*!40000 ALTER TABLE `tb_service_denial_user` DISABLE KEYS */;
INSERT INTO `tb_service_denial_user` VALUES (1,'01012341234',NULL,NULL,NULL,'2022-01-18 07:58:18','2022-01-18 07:58:18',NULL);
/*!40000 ALTER TABLE `tb_service_denial_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_group`
--

DROP TABLE IF EXISTS `tb_user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_group_id` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `user_group_type` varchar(10) NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_group_id` (`menu_group_id`),
  CONSTRAINT `tb_user_group_ibfk_1` FOREIGN KEY (`menu_group_id`) REFERENCES `tb_menu_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_group`
--

LOCK TABLES `tb_user_group` WRITE;
/*!40000 ALTER TABLE `tb_user_group` DISABLE KEYS */;
INSERT INTO `tb_user_group` VALUES (1,1,'일반','일반 사용자 그룹','USER',NULL,NULL,'2022-01-20 07:53:18','2022-01-20 07:53:18',NULL),(2,2,'고령자','고령자','ELDERLY',NULL,NULL,'2022-01-20 07:54:03','2022-01-20 07:54:03',NULL);
/*!40000 ALTER TABLE `tb_user_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_view_action`
--

DROP TABLE IF EXISTS `tb_view_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_view_action` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link_key` varchar(100) COLLATE utf8_bin NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `action_type` varchar(50) COLLATE utf8_bin NOT NULL,
  `code` varchar(10) COLLATE utf8_bin NOT NULL,
  `is_processed` tinyint(1) NOT NULL DEFAULT 0,
  `is_ended` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_view_action`
--

LOCK TABLES `tb_view_action` WRITE;
/*!40000 ALTER TABLE `tb_view_action` DISABLE KEYS */;
INSERT INTO `tb_view_action` VALUES (1,'CxW3A0HkQ','event1','Routing','A',1,0,'2022-02-04 08:34:42','2022-02-04 08:36:45','2022-02-04 08:37:16'),(2,'CxW3A0HkQ','event2','Routing','A',1,0,'2022-02-05 02:37:09','2022-02-05 02:37:20','2022-02-05 02:37:33'),(3,'CxW3A0HkQ','event2','Routing','A',1,0,'2022-02-05 13:19:37','2022-02-05 13:19:41',NULL),(4,'CxW3A0HkQ','event2','Routing','A',1,0,'2022-02-05 13:19:39','2022-02-05 13:19:41',NULL),(5,'LhOiTJsTt','ljyevent','Routing','A',1,0,'2022-02-08 00:48:29','2022-02-08 00:48:44','2022-02-08 00:51:21'),(6,'LhOiTJsTt','ljyevent','Routing','A',1,0,'2022-02-08 04:28:17','2022-02-08 04:28:46',NULL),(7,'LhOiTJsTt','ljyevent','Routing','A',1,0,'2022-02-08 04:29:05','2022-02-08 04:29:06',NULL),(8,'LhOiTJsTt','ljyevent','Routing','A',0,0,'2022-02-08 04:41:54','2022-02-08 04:41:54',NULL),(9,'gmQQZvdQJ','ljyevent','Routing','A',1,0,'2022-02-08 04:54:41','2022-02-08 04:56:13',NULL),(10,'P0gH0OClP','ljyevent','Routing','A',1,0,'2022-02-08 05:00:34','2022-02-08 05:00:37',NULL),(11,'AjEzbdNmG','ljyevent','Routing','A',1,0,'2022-02-08 05:04:27','2022-02-08 05:04:30',NULL),(12,'RP_A2xobm','ljyevent','Routing','A',1,0,'2022-02-08 05:07:48','2022-02-08 05:07:51',NULL),(13,'rTHCjLAjy','ljyevent','Routing','A',0,0,'2022-02-08 05:08:38','2022-02-08 05:08:38',NULL),(14,'tucc4flAv','ljyevent','Routing','A',0,0,'2022-02-08 05:27:58','2022-02-08 05:27:58',NULL),(15,'W_Fjav_Sn','ljyevent','Routing','A',0,0,'2022-02-08 05:28:00','2022-02-08 05:28:00',NULL),(16,'D-JlSV63z','ljyevent','Routing','A',0,0,'2022-02-08 07:14:31','2022-02-08 07:14:31',NULL),(17,'asdf','ljyevent','Routing','A',0,0,'2022-02-08 07:49:55','2022-02-08 07:49:55',NULL);
/*!40000 ALTER TABLE `tb_view_action` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-10 11:18:58
