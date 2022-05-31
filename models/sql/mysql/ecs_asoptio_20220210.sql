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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-10 11:15:43
