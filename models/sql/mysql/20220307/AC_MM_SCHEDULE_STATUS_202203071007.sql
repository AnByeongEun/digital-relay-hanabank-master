-- 테이블 설정
CREATE TABLE `AC_MM_SCHEDULE_STATUS` (
  `SCHEDULE_STATUS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SCHEDULE_NM` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '스케쥴명(작업 종류)',
  `NODE_NM` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '노드명 (작업 수행 서버명)',
  `DATE_CRITERIA` date NOT NULL COMMENT '시도 기준 일자',
  `STATUS` varchar(20) COLLATE utf8_bin NOT NULL COMMENT 'Lock 유효 시간',
  `RETRY_COUNT` int(11) NOT NULL DEFAULT 0 COMMENT '재시도 횟수',
  `TOTAL_COUNT` int(11) NOT NULL DEFAULT 0 COMMENT '총 데이터 수',
  `PROCESSED_COUNT` int(11) NOT NULL DEFAULT 0 COMMENT '처리 데이터 수',
  `OFFSET` int(11) NOT NULL DEFAULT 0 COMMENT '단위 작업 성공 횟수',
  `INSERT_DT` datetime NOT NULL,
  `UPDATE_DT` datetime NOT NULL,
  `REMOVE_DT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- PK 설정
ALTER TABLE AAPADM.AC_MM_SCHEDULE_STATUS ADD PRIMARY KEY (SCHEDULE_STATUS_ID);

-- 코멘트 설정
ALTER TABLE AAPADM.AC_MM_SCHEDULE_STATUS COMMENT = '통합키 발급 이력';
ALTER TABLE AAPADM.AC_MM_SCHEDULE_STATUS MODIFY `SCHEDULE_NM` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '스케쥴명(작업 종류)';
ALTER TABLE AAPADM.AC_MM_SCHEDULE_STATUS MODIFY `NODE_NM` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '노드명 (작업 수행 서버명)';
ALTER TABLE AAPADM.AC_MM_SCHEDULE_STATUS MODIFY `DATE_CRITERIA` date NOT NULL COMMENT '시도 기준 일자';
ALTER TABLE AAPADM.AC_MM_SCHEDULE_STATUS MODIFY `STATUS` varchar(20) COLLATE utf8_bin NOT NULL COMMENT 'Lock 유효 시간';
ALTER TABLE AAPADM.AC_MM_SCHEDULE_STATUS MODIFY `RETRY_COUNT` int(11) NOT NULL DEFAULT 0 COMMENT '재시도 횟수';
ALTER TABLE AAPADM.AC_MM_SCHEDULE_STATUS MODIFY `TOTAL_COUNT` int(11) NOT NULL DEFAULT 0 COMMENT '총 데이터 수';
ALTER TABLE AAPADM.AC_MM_SCHEDULE_STATUS MODIFY `PROCESSED_COUNT` int(11) NOT NULL DEFAULT 0 COMMENT '처리 데이터 수';
ALTER TABLE AAPADM.AC_MM_SCHEDULE_STATUS MODIFY `OFFSET` int(11) NOT NULL DEFAULT 0 COMMENT '단위 작업 성공 횟수';

-- 권한 설정
GRANT DELETE, INSERT, SELECT, UPDATE ON AAPADM.AC_MM_SCHEDULE_STATUS TO AAPCON;

-- 설정 적용
FLUSH PRIVILEGES;