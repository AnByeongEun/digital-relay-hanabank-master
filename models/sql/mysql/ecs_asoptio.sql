-- MariaDB dump 10.19  Distrib 10.6.4-MariaDB, for osx10.16 (x86_64)
--
-- Host: localhost    Database: ecs_asoptio
-- ------------------------------------------------------
-- Server version	10.6.4-MariaDB

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
  `code_group` varchar(50) NOT NULL,
  `code_group_name` varchar(100) NOT NULL,
  `code` varchar(50) NOT NULL,
  `value` varchar(200) NOT NULL,
  `code_order` int(11) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_common_code`
--

LOCK TABLES `tb_common_code` WRITE;
/*!40000 ALTER TABLE `tb_common_code` DISABLE KEYS */;
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
  `key` varchar(512) NOT NULL,
  `ani` varchar(20) NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_contact`
--

LOCK TABLES `tb_contact` WRITE;
/*!40000 ALTER TABLE `tb_contact` DISABLE KEYS */;
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
  `name` varchar(50) NOT NULL,
  `value` varchar(200) NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `tb_contact_attribute_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `tb_contact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_contact_attribute`
--

LOCK TABLES `tb_contact_attribute` WRITE;
/*!40000 ALTER TABLE `tb_contact_attribute` DISABLE KEYS */;
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
  `refresh_token` varchar(200) NOT NULL,
  `expire_at` datetime NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `tb_contact_session_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `tb_contact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_contact_session`
--

LOCK TABLES `tb_contact_session` WRITE;
/*!40000 ALTER TABLE `tb_contact_session` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_gateway_request`
--

LOCK TABLES `tb_gateway_request` WRITE;
/*!40000 ALTER TABLE `tb_gateway_request` DISABLE KEYS */;
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
  `type` varchar(10) NOT NULL,
  `is_requied` tinyint(1) NOT NULL DEFAULT 0,
  `is_nullable` tinyint(1) NOT NULL DEFAULT 0,
  `min_length` int(11) NOT NULL DEFAULT 0,
  `max_length` int(11) NOT NULL DEFAULT 0,
  `value_validation` varchar(100) NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gateway_request_id` (`gateway_request_id`),
  CONSTRAINT `tb_gateway_request_param_ibfk_1` FOREIGN KEY (`gateway_request_id`) REFERENCES `tb_gateway_request` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_gateway_request_param`
--

LOCK TABLES `tb_gateway_request_param` WRITE;
/*!40000 ALTER TABLE `tb_gateway_request_param` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_menu`
--

LOCK TABLES `tb_menu` WRITE;
/*!40000 ALTER TABLE `tb_menu` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_menu_group`
--

LOCK TABLES `tb_menu_group` WRITE;
/*!40000 ALTER TABLE `tb_menu_group` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_menu_group_map`
--

LOCK TABLES `tb_menu_group_map` WRITE;
/*!40000 ALTER TABLE `tb_menu_group_map` DISABLE KEYS */;
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
  `ani` varchar(20) NOT NULL,
  `request_from` varchar(100) NOT NULL,
  `created_by` varchar(40) DEFAULT NULL,
  `updated_by` varchar(40) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_service_denial_user`
--

LOCK TABLES `tb_service_denial_user` WRITE;
/*!40000 ALTER TABLE `tb_service_denial_user` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_group`
--

LOCK TABLES `tb_user_group` WRITE;
/*!40000 ALTER TABLE `tb_user_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_user_group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-13 14:53:57
