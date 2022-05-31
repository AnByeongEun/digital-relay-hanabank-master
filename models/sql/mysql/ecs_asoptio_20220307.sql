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
-- Table structure for table `AC_MM_BIZ_INFO`
--

DROP TABLE IF EXISTS `AC_MM_BIZ_INFO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AC_MM_BIZ_INFO` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AC_MM_BIZ_INFO`
--

LOCK TABLES `AC_MM_BIZ_INFO` WRITE;
/*!40000 ALTER TABLE `AC_MM_BIZ_INFO` DISABLE KEYS */;
/*!40000 ALTER TABLE `AC_MM_BIZ_INFO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AC_MM_PRI_BIZ_INFO`
--

DROP TABLE IF EXISTS `AC_MM_PRI_BIZ_INFO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AC_MM_PRI_BIZ_INFO` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `confType` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '우선순위 노출 타입',
  `priGroupCd` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '필요서류 그룹 코드',
  `priStepCd` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '코드',
  `priStepNm` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '이름',
  `priStepOd` int(11) NOT NULL COMMENT '순서',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AC_MM_PRI_BIZ_INFO`
--

LOCK TABLES `AC_MM_PRI_BIZ_INFO` WRITE;
/*!40000 ALTER TABLE `AC_MM_PRI_BIZ_INFO` DISABLE KEYS */;
/*!40000 ALTER TABLE `AC_MM_PRI_BIZ_INFO` ENABLE KEYS */;
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
  `contact_id` int(11) NOT NULL COMMENT '컨택 식별자',
  `refresh_token` varchar(300) COLLATE utf8_bin NOT NULL COMMENT 'Refresh Token',
  `expire_at` datetime NOT NULL COMMENT '만료 시간',
  `created_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `updated_by` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `removed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `tb_contact_session_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `tb_contact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_contact_session`
--

LOCK TABLES `tb_contact_session` WRITE;
/*!40000 ALTER TABLE `tb_contact_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_contact_session` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14373 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_schedule_status`
--

LOCK TABLES `tb_schedule_status` WRITE;
/*!40000 ALTER TABLE `tb_schedule_status` DISABLE KEYS */;
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

-- Dump completed on 2022-03-07  9:31:53
