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
  `account` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '계정명',
  `passwd` varchar(512) COLLATE utf8_bin NOT NULL COMMENT '비밀번호',
  `name` varchar(40) COLLATE utf8_bin NOT NULL COMMENT '이름',
  `email` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '이메일',
  `phone` varchar(15) COLLATE utf8_bin DEFAULT NULL COMMENT '전화번호',
  `is_blocked` tinyint(1) NOT NULL DEFAULT 0 COMMENT '접속 차단여부',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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
  `name` varchar(40) COLLATE utf8_bin NOT NULL COMMENT 'API명',
  `path` varchar(1000) COLLATE utf8_bin NOT NULL COMMENT 'API 경로',
  `query` varchar(2000) COLLATE utf8_bin DEFAULT NULL COMMENT '파라미터',
  `method` varchar(10) COLLATE utf8_bin DEFAULT NULL COMMENT '호출 방식',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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
  `admin_auth_page_id` int(11) NOT NULL COMMENT '페이지 식별자',
  `admin_auth_api_id` int(11) NOT NULL COMMENT 'API 권한 식별자',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_auth_page_id` (`admin_auth_page_id`),
  KEY `admin_auth_api_id` (`admin_auth_api_id`),
  CONSTRAINT `tb_admin_auth_api_map_ibfk_1` FOREIGN KEY (`admin_auth_page_id`) REFERENCES `tb_admin_auth_page` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `tb_admin_auth_api_map_ibfk_2` FOREIGN KEY (`admin_auth_api_id`) REFERENCES `tb_admin_auth_api` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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
  `admin_auth_page_id` int(11) NOT NULL COMMENT '권한 페이지 식별자',
  `name` varchar(40) COLLATE utf8_bin NOT NULL COMMENT '요소명',
  `component_id` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '요소 식별자',
  `auth_api_id` int(11) DEFAULT NULL COMMENT 'API 식별자 (컴포넌트에 API가 연결되어 있는 경우)',
  `auth_page_id` int(11) DEFAULT NULL COMMENT '페이지 식별자 (컴포넌트에 페이지가 연결되어 있는 경우)',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_auth_page_id` (`admin_auth_page_id`),
  CONSTRAINT `tb_admin_auth_component_ibfk_1` FOREIGN KEY (`admin_auth_page_id`) REFERENCES `tb_admin_auth_page` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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
  `group_name` varchar(40) COLLATE utf8_bin NOT NULL COMMENT '권한 그룹명',
  `description` varchar(1000) COLLATE utf8_bin NOT NULL COMMENT '권한 그룹 설명',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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
  `admin_account_id` int(11) NOT NULL COMMENT '관리자 계정 식별자',
  `admin_auth_group_id` int(11) NOT NULL COMMENT '관리자 권한 그룹 식별자',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_account_id` (`admin_account_id`),
  KEY `admin_auth_group_id` (`admin_auth_group_id`),
  CONSTRAINT `tb_admin_auth_group_map_ibfk_1` FOREIGN KEY (`admin_account_id`) REFERENCES `tb_admin_account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tb_admin_auth_group_map_ibfk_2` FOREIGN KEY (`admin_auth_group_id`) REFERENCES `tb_admin_auth_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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
  `page_name` varchar(40) COLLATE utf8_bin NOT NULL COMMENT '페이지명',
  `path` varchar(1000) COLLATE utf8_bin NOT NULL COMMENT '페이지 경로',
  `query` varchar(1000) COLLATE utf8_bin DEFAULT NULL COMMENT '파라미터',
  `type` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '페이지 유형 [FULL, POPUP]',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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
  `admin_auth_group_id` int(11) NOT NULL COMMENT '관리자 권한 그룹 식별자',
  `admin_auth_page_id` int(11) NOT NULL COMMENT '페이지 식별자',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_auth_group_id` (`admin_auth_group_id`),
  KEY `admin_auth_page_id` (`admin_auth_page_id`),
  CONSTRAINT `tb_admin_auth_page_map_ibfk_1` FOREIGN KEY (`admin_auth_group_id`) REFERENCES `tb_admin_auth_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tb_admin_auth_page_map_ibfk_2` FOREIGN KEY (`admin_auth_page_id`) REFERENCES `tb_admin_auth_page` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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
  `admin_account_id` int(11) NOT NULL COMMENT '관리자 계정 식별자',
  `is_success` tinyint(1) NOT NULL DEFAULT 0 COMMENT '로그인 성공 여부',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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
  `admin_account_id` int(11) NOT NULL COMMENT '관리자 계정 식별자',
  `refresh_token` varchar(300) COLLATE utf8_bin NOT NULL COMMENT 'Refresh Token (Admin)',
  `expire_at` datetime NOT NULL COMMENT '만료 일시',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_account_id` (`admin_account_id`),
  CONSTRAINT `tb_admin_session_ibfk_1` FOREIGN KEY (`admin_account_id`) REFERENCES `tb_admin_account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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
  `admin_session_id` int(11) NOT NULL COMMENT '관리자 세션 식별자',
  `access_token` varchar(300) COLLATE utf8_bin NOT NULL COMMENT 'Access Token (Admin)',
  `request_count` int(11) NOT NULL DEFAULT 0 COMMENT '요청 횟수',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_session_id` (`admin_session_id`),
  CONSTRAINT `tb_admin_token_ibfk_1` FOREIGN KEY (`admin_session_id`) REFERENCES `tb_admin_session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin_token`
--

LOCK TABLES `tb_admin_token` WRITE;
/*!40000 ALTER TABLE `tb_admin_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_contact`
--

DROP TABLE IF EXISTS `tb_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `channel_key` varchar(512) COLLATE utf8_bin NOT NULL COMMENT '채널 키',
  `key` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '컨택 키',
  `ani` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '전화번호',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_contact`
--

LOCK TABLES `tb_contact` WRITE;
/*!40000 ALTER TABLE `tb_contact` DISABLE KEYS */;
INSERT INTO `tb_contact` VALUES (1,'00001054011634278989','pOnoK38BtbfCh-nrt3Cm','01067688817',NULL,NULL,'2022-02-24 13:26:24','2022-02-24 13:26:24',NULL),(2,'00001054011634278989','AOnvK38BtbfCh-nrpXEI','01067688817',NULL,NULL,'2022-02-24 13:33:21','2022-02-24 13:33:21',NULL),(3,'00001054011634278989','CenwK38BtbfCh-nrQXEv','01067688817',NULL,NULL,'2022-02-24 13:34:01','2022-02-24 13:34:01',NULL),(4,'00001054011634278989','HOnxK38BtbfCh-nrp3Ez','01067688817',NULL,NULL,'2022-02-24 13:35:31','2022-02-24 13:35:31',NULL),(5,'00001054011634278989','LenyK38BtbfCh-nr1HGB','01067688817',NULL,NULL,'2022-02-24 13:36:48','2022-02-24 13:36:48',NULL),(6,'00001054011634278989','PenzK38BtbfCh-nr_nG1','01067688817',NULL,NULL,'2022-02-24 13:38:05','2022-02-24 13:38:05',NULL),(7,'00001054011634278989','Ren0K38BtbfCh-nrk3Ga','01067688817',NULL,NULL,'2022-02-24 13:38:43','2022-02-24 13:38:43',NULL),(8,'00001054011634278989','zen-K38BtbfCh-nr2HFp','01067688817',NULL,NULL,'2022-02-24 13:49:56','2022-02-24 13:49:56',NULL),(9,'00001054011634278989','cukxL38BtbfCh-nrBqci','01067688817',NULL,NULL,'2022-02-25 04:43:36','2022-02-25 04:43:36',NULL);
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
  `contact_id` int(11) NOT NULL COMMENT '컨택 식별자',
  `name` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '속성명',
  `value` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '속성값',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `tb_contact_attribute_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `tb_contact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_contact_attribute`
--

LOCK TABLES `tb_contact_attribute` WRITE;
/*!40000 ALTER TABLE `tb_contact_attribute` DISABLE KEYS */;
INSERT INTO `tb_contact_attribute` VALUES (1,1,'sysno','6002',NULL,NULL,'2022-02-24 13:26:24','2022-02-24 13:26:24',NULL),(2,1,'dnis','40000',NULL,NULL,'2022-02-24 13:26:24','2022-02-24 13:26:24',NULL),(3,1,'chno','123',NULL,NULL,'2022-02-24 13:26:24','2022-02-24 13:26:24',NULL),(4,1,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-24 13:26:24','2022-02-24 13:26:24',NULL),(5,1,'status','disconn',NULL,NULL,'2022-02-24 13:26:24','2022-02-25 04:44:00',NULL),(6,1,'os','And',NULL,NULL,'2022-02-24 13:26:24','2022-02-24 13:26:24',NULL),(7,2,'sysno','6002',NULL,NULL,'2022-02-24 13:33:21','2022-02-24 13:33:21',NULL),(8,2,'dnis','40000',NULL,NULL,'2022-02-24 13:33:21','2022-02-24 13:33:21',NULL),(9,2,'chno','123',NULL,NULL,'2022-02-24 13:33:21','2022-02-24 13:33:21',NULL),(10,2,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-24 13:33:21','2022-02-24 13:33:21',NULL),(11,2,'status','conn',NULL,NULL,'2022-02-24 13:33:21','2022-02-24 13:33:21',NULL),(12,2,'os','And',NULL,NULL,'2022-02-24 13:33:21','2022-02-24 13:33:21',NULL),(13,3,'sysno','6002',NULL,NULL,'2022-02-24 13:34:01','2022-02-24 13:34:01',NULL),(14,3,'dnis','40000',NULL,NULL,'2022-02-24 13:34:01','2022-02-24 13:34:01',NULL),(15,3,'chno','123',NULL,NULL,'2022-02-24 13:34:01','2022-02-24 13:34:01',NULL),(16,3,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-24 13:34:01','2022-02-24 13:34:01',NULL),(17,3,'os','And',NULL,NULL,'2022-02-24 13:34:01','2022-02-24 13:34:01',NULL),(18,3,'status','conn',NULL,NULL,'2022-02-24 13:34:01','2022-02-24 13:34:01',NULL),(19,4,'sysno','6002',NULL,NULL,'2022-02-24 13:35:31','2022-02-24 13:35:31',NULL),(20,4,'dnis','40000',NULL,NULL,'2022-02-24 13:35:31','2022-02-24 13:35:31',NULL),(21,4,'chno','123',NULL,NULL,'2022-02-24 13:35:31','2022-02-24 13:35:31',NULL),(22,4,'os','And',NULL,NULL,'2022-02-24 13:35:31','2022-02-24 13:35:31',NULL),(23,4,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-24 13:35:31','2022-02-24 13:35:31',NULL),(24,4,'status','conn',NULL,NULL,'2022-02-24 13:35:31','2022-02-24 13:35:31',NULL),(25,5,'sysno','6002',NULL,NULL,'2022-02-24 13:36:48','2022-02-24 13:36:48',NULL),(26,5,'dnis','40000',NULL,NULL,'2022-02-24 13:36:48','2022-02-24 13:36:48',NULL),(27,5,'chno','123',NULL,NULL,'2022-02-24 13:36:48','2022-02-24 13:36:48',NULL),(28,5,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-24 13:36:48','2022-02-24 13:36:48',NULL),(29,5,'os','And',NULL,NULL,'2022-02-24 13:36:48','2022-02-24 13:36:48',NULL),(30,5,'status','conn',NULL,NULL,'2022-02-24 13:36:48','2022-02-24 13:36:48',NULL),(31,6,'sysno','6002',NULL,NULL,'2022-02-24 13:38:05','2022-02-24 13:38:05',NULL),(32,6,'dnis','40000',NULL,NULL,'2022-02-24 13:38:05','2022-02-24 13:38:05',NULL),(33,6,'chno','123',NULL,NULL,'2022-02-24 13:38:05','2022-02-24 13:38:05',NULL),(34,6,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-24 13:38:05','2022-02-24 13:38:05',NULL),(35,6,'os','And',NULL,NULL,'2022-02-24 13:38:05','2022-02-24 13:38:05',NULL),(36,6,'status','conn',NULL,NULL,'2022-02-24 13:38:05','2022-02-24 13:38:05',NULL),(37,7,'sysno','6002',NULL,NULL,'2022-02-24 13:38:43','2022-02-24 13:38:43',NULL),(38,7,'dnis','40000',NULL,NULL,'2022-02-24 13:38:43','2022-02-24 13:38:43',NULL),(39,7,'chno','123',NULL,NULL,'2022-02-24 13:38:43','2022-02-24 13:38:43',NULL),(40,7,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-24 13:38:43','2022-02-24 13:38:43',NULL),(41,7,'os','And',NULL,NULL,'2022-02-24 13:38:43','2022-02-24 13:38:43',NULL),(42,7,'status','conn',NULL,NULL,'2022-02-24 13:38:43','2022-02-24 13:38:43',NULL),(43,8,'sysno','6002',NULL,NULL,'2022-02-24 13:49:56','2022-02-24 13:49:56',NULL),(44,8,'dnis','40000',NULL,NULL,'2022-02-24 13:49:56','2022-02-24 13:49:56',NULL),(45,8,'os','And',NULL,NULL,'2022-02-24 13:49:56','2022-02-24 13:49:56',NULL),(46,8,'chno','123',NULL,NULL,'2022-02-24 13:49:56','2022-02-24 13:49:56',NULL),(47,8,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-24 13:49:56','2022-02-24 13:49:56',NULL),(48,8,'status','conn',NULL,NULL,'2022-02-24 13:49:56','2022-02-24 13:49:56',NULL),(49,9,'sysno','6002',NULL,NULL,'2022-02-25 04:43:36','2022-02-25 04:43:36',NULL),(50,9,'dnis','40000',NULL,NULL,'2022-02-25 04:43:36','2022-02-25 04:43:36',NULL),(51,9,'chno','123',NULL,NULL,'2022-02-25 04:43:36','2022-02-25 04:43:36',NULL),(52,9,'token','kkuKb4NkBzsEKLuaAAAA',NULL,NULL,'2022-02-25 04:43:36','2022-02-25 04:43:36',NULL),(53,9,'status','conn',NULL,NULL,'2022-02-25 04:43:36','2022-02-25 04:43:36',NULL),(54,9,'os','And',NULL,NULL,'2022-02-25 04:43:36','2022-02-25 04:43:36',NULL);
/*!40000 ALTER TABLE `tb_contact_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_gateway_request`
--

DROP TABLE IF EXISTS `tb_gateway_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_gateway_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) COLLATE utf8_bin NOT NULL COMMENT 'API명',
  `method` varchar(10) COLLATE utf8_bin NOT NULL DEFAULT 'POST' COMMENT '호출 방식',
  `path` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '요청 경로',
  `description` varchar(1000) COLLATE utf8_bin NOT NULL COMMENT 'API 설명',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_gateway_request`
--

LOCK TABLES `tb_gateway_request` WRITE;
/*!40000 ALTER TABLE `tb_gateway_request` DISABLE KEYS */;
INSERT INTO `tb_gateway_request` VALUES (1,'컨택 키 발행 요청','POST','/contact/key','설명',NULL,NULL,'2022-02-22 23:01:59','2022-02-22 23:01:59',NULL);
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
  `gateway_request_id` int(11) NOT NULL COMMENT 'API 식별자',
  `name` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '파라미터명',
  `type` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '파라미터 유형 [HEADER, QUERY, FORMDATA, PATH]',
  `value_type` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '데이터 유형 [String, Number, Boolean]',
  `is_requied` tinyint(1) NOT NULL DEFAULT 0 COMMENT '필수 여부',
  `is_nullable` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Null 가능 여부',
  `min_length` int(11) NOT NULL DEFAULT 0 COMMENT '최소 길이',
  `max_length` int(11) NOT NULL DEFAULT 0 COMMENT '최대 길이',
  `string_regex` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '정규표현식',
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
INSERT INTO `tb_gateway_request_param` VALUES (1,1,'callId','BODY','STRING',1,0,0,0,'',NULL,NULL,'2022-02-22 23:02:01','2022-02-22 23:02:01',NULL),(2,1,'ani','BODY','STRING',1,0,0,0,'',NULL,NULL,'2022-02-22 23:02:03','2022-02-22 23:02:03',NULL);
/*!40000 ALTER TABLE `tb_gateway_request_param` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_necessary_document`
--

DROP TABLE IF EXISTS `tb_necessary_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_necessary_document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hai_svc_grp_cd` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '하이 서비스 그룹 코드',
  `ncsy_dcmt_dv_cd` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '필요서류 구분 코드',
  `biz_seq_no` int(11) NOT NULL COMMENT '업무 순번',
  `step1_cd` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '1단계 코드',
  `step1_nm` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '1단계 명칭',
  `step2_cd` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '2단계 코드',
  `step2_nm` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '2단계 명칭',
  `step3_cd` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '3단계 코드',
  `step3_nm` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '3단계 명칭',
  `step4_cd` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '4단계 코드',
  `step4_nm` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '4단계 명칭',
  `step5_cd` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '5단계 코드',
  `step5_nm` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '5단계 명칭',
  `step6_cd` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '6단계 코드',
  `step6_nm` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '6단계 명칭',
  `ncsy_dcmts` text COLLATE utf8_bin DEFAULT NULL COMMENT '필요서류 목록',
  `gud_sntc_ctts` text COLLATE utf8_bin DEFAULT NULL COMMENT '안내 문구 내용',
  `add_dcmt_ctt` text COLLATE utf8_bin DEFAULT NULL COMMENT '추가 서류 내용',
  `ncsy_dcmt_gud_ctt` text COLLATE utf8_bin DEFAULT NULL COMMENT '필요 서류 안내 내용',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_necessary_document`
--

LOCK TABLES `tb_necessary_document` WRITE;
/*!40000 ALTER TABLE `tb_necessary_document` DISABLE KEYS */;
INSERT INTO `tb_necessary_document` VALUES (1,'KCA','001',328,'010','수신 제변경','033','통장 비밀번호변경','001','개인','001','만14세미만 미성년자','006','법정대리인','000','업무 요건 없음','[\"미성년자 기준의 기본증명서 (특정 또는 상세)\",\"<p>미성년자 기준의 가족관계증명서 (일반 또는 상세)</p>\",\"<p><a href=\\\"http://km.hanafn.com...\\\">...</a>\",\"미성년자의 통장\",\"통장도장\"]','[{\"gudSntcCtt\":\"개별상황에 따라 추가서류를 요청드릴 수 있습니다.\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"모든 서류는 원본제출이 원칙입니다<p>- 관공서 발행서류 최근 3개월이내 발급...</p>\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"<font color=\\\"#ff000\\\">가족관계증명서는 아래의 서류(택1)로 대체...</font>\",\"smsTgtYn\":\"N\"},{\"gudSntcCtt\":\"미성년자의 예금을 신규한 부 또는 모가&nbsp;내점시 \\\"<u>신규 시점의 부모...</u>\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"<a href=\\\"http://km.hanafn.com...\\\">...</a>\",\"smsTgtYn\":\"N\"}]',NULL,NULL,'2022-03-03 18:29:25','2022-03-03 18:29:25',NULL),(2,'KCA','001',329,'010','수신 제변경','033','통장 비밀번호변경','001','개인','002','만14세이상 ~ 만19세 미만 미성년자','006','법정대리인','000','업무 요건 없음','[\"미성년자 기준의 기본증명서 (특정 또는 상세)\",\"<p>미성년자 기준의 가족관계증명서 (일반 또는 상세)</p>\",\"<p><a href=\\\"http://km.hanafn.com...\\\">...</a>\",\"미성년자의 통장\",\"통장도장\"]','[{\"gudSntcCtt\":\"개별상황에 따라 추가서류를 요청드릴 수 있습니다.\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"모든 서류는 원본제출이 원칙입니다<p>- 관공서 발행서류 최근 3개월이내 발급...</p>\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"<font color=\\\"#ff000\\\">가족관계증명서는 아래의 서류(택1)로 대체...</font>\",\"smsTgtYn\":\"N\"},{\"gudSntcCtt\":\"미성년자의 예금을 신규한 부 또는 모가&nbsp;내점시 \\\"<u>신규 시점의 부모...</u>\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"<a href=\\\"http://km.hanafn.com...\\\">...</a>\",\"smsTgtYn\":\"N\"}]',NULL,NULL,'2022-03-03 18:29:25','2022-03-03 18:29:25',NULL),(3,'KCA','001',330,'010','수신 제변경','033','통장 비밀번호변경','001','개인','003','성년','001','방문자 본인','000','업무 요건 없음','[\"<a href=\\\"http://km...\\\"></a>\"]','[{\"gudSntcCtt\":\"개별상황에 따라 추가서류를 요청드릴 수 있습니다.\",\"smsTgtYn\":\"Y\"}]',NULL,NULL,'2022-03-03 18:29:25','2022-03-03 18:29:25',NULL),(4,'KCA','001',331,'010','수신 제변경','033','통장 비밀번호변경','002','개인사업자','000','고객자격 해당 없음','001','방문자 본인','000','업무 요건 없음','[\"<a href=\\\"http://km...\\\"></a>\"]','[{\"gudSntcCtt\":\"개별상황에 따라 추가서류를 요청드릴 수 있습니다.\",\"smsTgtYn\":\"Y\"}]',NULL,NULL,'2022-03-03 18:29:25','2022-03-03 18:29:25',NULL),(5,'KCA','001',332,'010','수신 제변경','033','통장 비밀번호변경','003','법인','000','고객자격 해당 없음','004','대표자','000','업무 요건 없음','[\"사업자등록증 (또는 사업자등록증명원)\",\"<p><a href=\\\"http://km...\\\"></a></p>\",\"<p><a href=\\\"http://km...\\\"></a></p>\",\"<p><a href=\\\"http://km...\\\"></a>정관,회직,규약,인가증 등</p>\",\"법인의 통장\",\"통장도장 (서명사용시 서명)\"]','[{\"gudSntcCtt\":\"개별상황에 따라 추가서류를 요청드릴 수 있습니다.\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"모든 서류는 원본제출이 원칙이며, 관공서 서류는 최근 3개월이내 발급된 서류에 한합니다...\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"설입목적사실 검증서류, 실제소유자 확인서류는 1년 이내 제출한 적이 있는 경우에는 생략 가능하며&nbsp;제출서류가 중복될 경우 1부만 제출해 주시기 바랍니다.\",\"smsTgtYn\":\"Y\"}]',NULL,NULL,'2022-03-03 18:29:25','2022-03-03 18:29:25',NULL),(6,'KCA','001',333,'010','수신 제변경','033','통장 비밀번호변경','003','법인','000','고객자격 해당 없음','003','대리인','000','업무 요건 없음','[\"<p>법인 인감증명서..</p>\",\"<p><a href=\\\"http://km...\\\"></a></p>\",\"<p><a href=\\\"http://km...\\\"></a></p>\",\"<p><a href=\\\"http://km...\\\"></a>정관,회직,규약,인가증 등</p>\",\"법인의 통장\",\"통장도장 (서명사용시 서명)\"]','[{\"gudSntcCtt\":\"개별상황에 따라 추가서류를 요청드릴 수 있습니다.\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"모든 서류는 원본제출이 원칙이며, 관공서 서류는 최근 3개월이내 발급된 서류에 한합니다...\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"설입목적사실 검증서류, 실제소유자 확인서류는 1년 이내 제출한 적이 있는 경우에는 생략 가능하며&nbsp;제출서류가 중복될 경우 1부만 제출해 주시기 바랍니다.\",\"smsTgtYn\":\"Y\"}]',NULL,NULL,'2022-03-03 18:29:25','2022-03-03 18:29:25',NULL),(7,'KCA','001',328,'010','수신 제변경','033','통장 비밀번호변경','001','개인','001','만14세미만 미성년자','006','법정대리인','000','업무 요건 없음','[\"미성년자 기준의 기본증명서 (특정 또는 상세)\",\"<p>미성년자 기준의 가족관계증명서 (일반 또는 상세)</p>\",\"<p><a href=\\\"http://km.hanafn.com...\\\">...</a>\",\"미성년자의 통장\",\"통장도장\"]','[{\"gudSntcCtt\":\"개별상황에 따라 추가서류를 요청드릴 수 있습니다.\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"모든 서류는 원본제출이 원칙입니다<p>- 관공서 발행서류 최근 3개월이내 발급...</p>\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"<font color=\\\"#ff000\\\">가족관계증명서는 아래의 서류(택1)로 대체...</font>\",\"smsTgtYn\":\"N\"},{\"gudSntcCtt\":\"미성년자의 예금을 신규한 부 또는 모가&nbsp;내점시 \\\"<u>신규 시점의 부모...</u>\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"<a href=\\\"http://km.hanafn.com...\\\">...</a>\",\"smsTgtYn\":\"N\"}]',NULL,NULL,'2022-03-03 19:36:45','2022-03-03 19:36:45',NULL),(8,'KCA','001',329,'010','수신 제변경','033','통장 비밀번호변경','001','개인','002','만14세이상 ~ 만19세 미만 미성년자','006','법정대리인','000','업무 요건 없음','[\"미성년자 기준의 기본증명서 (특정 또는 상세)\",\"<p>미성년자 기준의 가족관계증명서 (일반 또는 상세)</p>\",\"<p><a href=\\\"http://km.hanafn.com...\\\">...</a>\",\"미성년자의 통장\",\"통장도장\"]','[{\"gudSntcCtt\":\"개별상황에 따라 추가서류를 요청드릴 수 있습니다.\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"모든 서류는 원본제출이 원칙입니다<p>- 관공서 발행서류 최근 3개월이내 발급...</p>\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"<font color=\\\"#ff000\\\">가족관계증명서는 아래의 서류(택1)로 대체...</font>\",\"smsTgtYn\":\"N\"},{\"gudSntcCtt\":\"미성년자의 예금을 신규한 부 또는 모가&nbsp;내점시 \\\"<u>신규 시점의 부모...</u>\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"<a href=\\\"http://km.hanafn.com...\\\">...</a>\",\"smsTgtYn\":\"N\"}]',NULL,NULL,'2022-03-03 19:36:45','2022-03-03 19:36:45',NULL),(9,'KCA','001',330,'010','수신 제변경','033','통장 비밀번호변경','001','개인','003','성년','001','방문자 본인','000','업무 요건 없음','[\"<a href=\\\"http://km...\\\"></a>\"]','[{\"gudSntcCtt\":\"개별상황에 따라 추가서류를 요청드릴 수 있습니다.\",\"smsTgtYn\":\"Y\"}]',NULL,NULL,'2022-03-03 19:36:45','2022-03-03 19:36:45',NULL),(10,'KCA','001',331,'010','수신 제변경','033','통장 비밀번호변경','002','개인사업자','000','고객자격 해당 없음','001','방문자 본인','000','업무 요건 없음','[\"<a href=\\\"http://km...\\\"></a>\"]','[{\"gudSntcCtt\":\"개별상황에 따라 추가서류를 요청드릴 수 있습니다.\",\"smsTgtYn\":\"Y\"}]',NULL,NULL,'2022-03-03 19:36:45','2022-03-03 19:36:45',NULL),(11,'KCA','001',332,'010','수신 제변경','033','통장 비밀번호변경','003','법인','000','고객자격 해당 없음','004','대표자','000','업무 요건 없음','[\"사업자등록증 (또는 사업자등록증명원)\",\"<p><a href=\\\"http://km...\\\"></a></p>\",\"<p><a href=\\\"http://km...\\\"></a></p>\",\"<p><a href=\\\"http://km...\\\"></a>정관,회직,규약,인가증 등</p>\",\"법인의 통장\",\"통장도장 (서명사용시 서명)\"]','[{\"gudSntcCtt\":\"개별상황에 따라 추가서류를 요청드릴 수 있습니다.\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"모든 서류는 원본제출이 원칙이며, 관공서 서류는 최근 3개월이내 발급된 서류에 한합니다...\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"설입목적사실 검증서류, 실제소유자 확인서류는 1년 이내 제출한 적이 있는 경우에는 생략 가능하며&nbsp;제출서류가 중복될 경우 1부만 제출해 주시기 바랍니다.\",\"smsTgtYn\":\"Y\"}]',NULL,NULL,'2022-03-03 19:36:45','2022-03-03 19:36:45',NULL),(12,'KCA','001',333,'010','수신 제변경','033','통장 비밀번호변경','003','법인','000','고객자격 해당 없음','003','대리인','000','업무 요건 없음','[\"<p>법인 인감증명서..</p>\",\"<p><a href=\\\"http://km...\\\"></a></p>\",\"<p><a href=\\\"http://km...\\\"></a></p>\",\"<p><a href=\\\"http://km...\\\"></a>정관,회직,규약,인가증 등</p>\",\"법인의 통장\",\"통장도장 (서명사용시 서명)\"]','[{\"gudSntcCtt\":\"개별상황에 따라 추가서류를 요청드릴 수 있습니다.\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"모든 서류는 원본제출이 원칙이며, 관공서 서류는 최근 3개월이내 발급된 서류에 한합니다...\",\"smsTgtYn\":\"Y\"},{\"gudSntcCtt\":\"설입목적사실 검증서류, 실제소유자 확인서류는 1년 이내 제출한 적이 있는 경우에는 생략 가능하며&nbsp;제출서류가 중복될 경우 1부만 제출해 주시기 바랍니다.\",\"smsTgtYn\":\"Y\"}]',NULL,NULL,'2022-03-03 19:36:45','2022-03-03 19:36:45',NULL);
/*!40000 ALTER TABLE `tb_necessary_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_necessary_document_priority`
--

DROP TABLE IF EXISTS `tb_necessary_document_priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_necessary_document_priority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conf_type` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '우선순위 노출 타입',
  `pri_group_cd` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '필요서류 그룹 코드',
  `pri_step_cd` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '코드',
  `pri_step_nm` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '이름',
  `pri_step_od` int(11) NOT NULL COMMENT '순서',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_necessary_document_priority`
--

LOCK TABLES `tb_necessary_document_priority` WRITE;
/*!40000 ALTER TABLE `tb_necessary_document_priority` DISABLE KEYS */;
INSERT INTO `tb_necessary_document_priority` VALUES (1,'AU','group1','code1','name1',1,'2022-03-03 20:10:27','2022-03-03 20:10:27',NULL),(2,'AU','group2','code2','name2',2,'2022-03-03 20:10:27','2022-03-03 20:10:27',NULL),(3,'AU','group3','code3','name3',3,'2022-03-03 20:10:27','2022-03-03 20:10:27',NULL),(4,'AU','group4','code4','name4',4,'2022-03-03 20:10:27','2022-03-03 20:10:27',NULL),(5,'AU','group1','code1','name1',1,'2022-03-03 20:16:05','2022-03-03 20:16:05',NULL),(6,'AU','group2','code2','name2',2,'2022-03-03 20:16:05','2022-03-03 20:16:05',NULL),(7,'AU','group3','code3','name3',3,'2022-03-03 20:16:05','2022-03-03 20:16:05',NULL),(8,'AU','group4','code4','name4',4,'2022-03-03 20:16:05','2022-03-03 20:16:05',NULL),(9,'AU','group1','code1','name1',1,'2022-03-03 20:16:12','2022-03-03 20:16:12',NULL),(10,'AU','group2','code2','name2',2,'2022-03-03 20:16:12','2022-03-03 20:16:12',NULL),(11,'AU','group3','code3','name3',3,'2022-03-03 20:16:12','2022-03-03 20:16:12',NULL),(12,'AU','group4','code4','name4',4,'2022-03-03 20:16:12','2022-03-03 20:16:12',NULL);
/*!40000 ALTER TABLE `tb_necessary_document_priority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_necessary_document_priority_date`
--

DROP TABLE IF EXISTS `tb_necessary_document_priority_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_necessary_document_priority_date` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conf_type` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '우선순위 노출 타입',
  `ch_type` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '채널 유형',
  `start_date` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '시작 일자',
  `end_date` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '종료 일자',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_necessary_document_priority_date`
--

LOCK TABLES `tb_necessary_document_priority_date` WRITE;
/*!40000 ALTER TABLE `tb_necessary_document_priority_date` DISABLE KEYS */;
INSERT INTO `tb_necessary_document_priority_date` VALUES (1,'AU','MWEB','20210101','20240531','2022-03-03 20:04:49','2022-03-03 20:04:49',NULL),(2,'AU','MWEB','20210101','20240531','2022-03-03 20:07:30','2022-03-03 20:07:30',NULL),(3,'AU','MWEB','20210101','20240531','2022-03-03 20:08:43','2022-03-03 20:08:43',NULL),(4,'AU','MWEB','20210101','20240531','2022-03-03 20:08:49','2022-03-03 20:08:49',NULL),(5,'AU','MWEB','20210101','20240531','2022-03-03 20:09:26','2022-03-03 20:09:26',NULL),(6,'AU','MWEB','20210101','20240531','2022-03-03 20:10:27','2022-03-03 20:10:27',NULL),(7,'AU','MWEB','20210101','20240531','2022-03-03 20:16:05','2022-03-03 20:16:05',NULL),(8,'AU','MWEB','20210101','20240531','2022-03-03 20:16:12','2022-03-03 20:16:12',NULL);
/*!40000 ALTER TABLE `tb_necessary_document_priority_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_schedule_lock`
--

DROP TABLE IF EXISTS `tb_schedule_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_schedule_lock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule_name` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '스케쥴명 (작업 종류)',
  `node_name` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '노드명 (작업 수행 서버명)',
  `date_criteria` date NOT NULL COMMENT '시도 기준 일자',
  `lock_until` datetime NOT NULL COMMENT 'Lock 유효 시간',
  `locked_at` varchar(20) COLLATE utf8_bin NOT NULL COMMENT 'Lock 설정 시간 (HHmmssSSS)',
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4347 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_schedule_lock`
--

LOCK TABLES `tb_schedule_lock` WRITE;
/*!40000 ALTER TABLE `tb_schedule_lock` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_schedule_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_schedule_status`
--

DROP TABLE IF EXISTS `tb_schedule_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_schedule_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule_name` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '스케쥴명(작업 종류)',
  `node_name` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '노드명 (작업 수행 서버명)',
  `date_criteria` date NOT NULL COMMENT '시도 기준 일자',
  `status` varchar(20) COLLATE utf8_bin NOT NULL COMMENT 'Lock 유효 시간',
  `retry_count` int(11) NOT NULL DEFAULT 0 COMMENT '재시도 횟수',
  `total_count` int(11) NOT NULL DEFAULT 0 COMMENT '총 데이터 수',
  `processed_count` int(11) NOT NULL DEFAULT 0 COMMENT '처리 데이터 수',
  `offset` int(11) NOT NULL DEFAULT 0 COMMENT '단위 작업 성공 횟수',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_schedule_status`
--

LOCK TABLES `tb_schedule_status` WRITE;
/*!40000 ALTER TABLE `tb_schedule_status` DISABLE KEYS */;
INSERT INTO `tb_schedule_status` VALUES (19,'RequiredDocument','RELAY2','2022-03-02','Processing',0,100,0,0,'2022-03-02 23:50:00','2022-03-02 23:50:00',NULL),(20,'RequiredDocument','RELAY1','2022-03-03','Processing',0,100,0,0,'2022-03-03 00:00:00','2022-03-03 00:00:00',NULL);
/*!40000 ALTER TABLE `tb_schedule_status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-03 22:27:03
