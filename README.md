## Overview
- Node Version : 16.14.0 (2022.02.16 기준)
- Oracle, MariaDB




## 솔루션, 사이트별 DB, Route 설정

### 디지털 윈도우(가칭), Task-Routing(가칭), 멀티모달 등 기준일 경우 (하나은행)
**Database**

- 인입 정보 관련 : Contact, ContactAttribute
- Admin 관련     : 확인 필요 (api 테이블 포함 13개)
- Batch 관련     : ScheduleLock, ScheduleStatus
- 필요서류 관련  : ncsyDcmt, ncsyDcmtPrior, ncsyDcmtpriorDate

`models/mysql/index.js`에서 다음 조건 사용하여 models 할당
```
return name !== basename && isMultiModal(name);
```

**Route**

- /contact : 인입 정보 저장
- /vars    : Callgate VDL 요청 
- /stat    : 사용 이력 저장
- /mci     : MCA 요청 
- /hana    : 필요서류, 영업점 등
- ~~/auth : 토큰 사용하지 않음 (server간 통신만 사용)~~
- ~~/view : Thru 사용하지 않음 (Menu, Code 등 사용하지 않음)~~

`app.js`에서 auth, view Route 주석 처리
```
// Relay 2.0 Thru only (멀티모달일 경우 사용하지 않음)
// app.use('/auth', require('./routes/auth'));
// app.use('/view', require('./routes/view'));
```


### 디지털 어솝쇼, Digital-Relay 기준일 경우 (우체국)

**Database**

- 인입 정보 관련 : Contact, ContactAttribute
- Thru 관련      : Menu, MenuGroup, UserGroup, ServiceDenialUser 등
- Admin 관련     : 확인 필요 (api 테이블 포함 13개)
- ~~Batch 관련     : ScheduleLock, ScheduleStatus~~
- ~~필요서류 관련  : ncsyDcmt, ncsyDcmtPrior, ncsyDcmtpriorDate~~


**Route**

- /contact : 인입 정보 저장
- /auth    : 토큰 사용하지 않음 (server간 통신만 사용)
- /view    : Thru 사용하지 않음 (Menu, Code 등 사용하지 않음)
- /vars    : Callgate VDL 요청 
- /stat    : 사용 이력 저장
- /mci     : MCA 요청 
- ~~/hana    : 필요서류, 영업점 등~~





## Structure
### Relay
```
│   app.js           # App entry point  
└───api              # 외부 http 연동   
└─────data           # 테스트용 데이터 등  
└───common           # 모든 코드에서 공통으로 사용하는 클래스, 함수, 상수 등  
└───config           # 환경 변수 및 설정  
└───messages         # in/out message type 정의
└───models           # Database 모델 및 DAO   
└─────common         # pool, executer 등 공통 모듈 정의  
└─────mapper         # mybatis-mapper 정의  
└───modules          # 공통으로 사용하는 모듈  
└───(jobs)           # Scheduler (필요시 추가)  
└───repository       # service와 model 사이의 로직 분리    
└───routes           # Express Routes  
└─────common         # routes에서 공통으로 사용되는 모듈
└─────errors         # 에러 핸들러, 에러 타입, 에러 코드 등 정의  
└─────middlewares    # express middlewares 정의 (validation, auth 등)  
└───scripts          # 기능, 성능 등 테스트용 simulating script 정의  
└───services         # 기능 제공에 필요한 비즈니스 로직   
└───var              # variable (eg. logs)
```


## Config
external env file 사용하려면 ENV_PATH 옵션 필요 (파일명 제외, ENV_PATH 옵션 없으면 project root에 위치한 .env 사용)  
```
ENV_PATH=/env/file/path/
```

### .env
환경별로 구분이 필요한 설정  
```
# Process Name
PROCESS_NAME                    # 프로세스명 (relay)
HOST_NAME                       # 서버명 (멀티서버에서 노드 구분을 위함 - relay1, relay2)

# Remote Server List
REMOTE_SERVER_HOSTS             # 요청이 허용된 원격 서버 호스트 IP 목록 (하나은행의 경우 Callbot GW, SOE 등의 IP 입력)  
REMOTE_REQUEST_KEY              # 원격 서버에 제공하는 api key (임의의 api key 지정하여 전달)  

# HTTP
HTTP_PORT                       # HTTP Server Port
HTTP_TIMEOUT                    # HTTP Server Timeout (ms)

# Authentication
AUTH_PASS                       # 개발시 인증 통과용도로 사용 (production에서는 사용하지 않음)

# JWT
JWT_SECRET_KEY                  # Thru에 발급하는 JWT 토큰 Secret
JWT_AT_EXPIRE_TIME              # AccessToken 유효 시간
JWT_RT_EXPIRE_TIME              # RefreshToken 유효 시간

# Database
DATABASE_TYPE                   # 데이터베이스 타입 (mysql, oracle)

ORACLE_LIB_PATH                 # Oracle Instant Client 경로
ORACLE_USER                     # Oracle User Name
ORACLE_PASSWORD                 # Oracle User Password
ORACLE_HOST                     # Oracle Host IP
ORACLE_PORT                     # Oracle Port
ORACLE_DATABASE                 # Oracle Database Name

MYSQL_USER                      # MariaDB User Name
MYSQL_PASSWORD                  # MariaDB User Password
MYSQL_HOST                      # MariaDB Host IP
MYSQL_PORT                      # MariaDB Port
MYSQL_DATABASE                  # MariaDB Database Name
MYSQL_MAX_POOL                  # MariaDB Max Pool

#Callgate
CALLGATE_HOST                   # Callgate Host IP
CALLGATE_PORT                   # Callgate Port
CALLGATE_INTRO_LINK             # Callgate가 팝업하는 페이지 링크
CALLGATE_VDL_SVC_CODE           # VDL 서비스 코드
CALLGATE_IP_SVC_CODE            # InfoPush 서비스 코드
CALLGATE_EDL_SVC_CODE           # EDL 서비스 코드
CALLGATE_DMS_SVC_CODE           # DMS 서비스 코드
CALLGATE_CUSTOMER_SERVICE_ID    # 고객 서비스 아이디
CALLGATE_AUTH_KEY               # Callgate Auth Key
CALLGATE_ENCRYPT_KEY            # Encryption Key (String)
CALLGATE_ENCRYPT_HEX            # Encryption Key (HEX)
CALLGATE_CONTENT_CODE           # 서비스 컨텐츠 코드
CALLGATE_PROLOGUE_CONTENT_CODE  # InfoPush Prologue 컨텐츠 코드
CALLGATE_EPILOGUE_CONTENT_CODE  # InfoPush Epilogue 컨텐츠 코드

# Journey
JOURNEY_PROTOCOL                # Journey protocol
JOURNEY_HOST                    # Journey Host IP
JOURNEY_PORT                    # Journey Port

# Log
LOG_PATH                        # 로그 설치될 위치
LOG_CONSOLE_LEVEL               # 콘솔에 적용할 로그 레벨
LOG_DATE_PATTERN                # 로그 파일명에 포함될 날짜 표기
LOG_ZIP_ARCHIVE                 # 로그 Rolling 여부

LOG_DEBUG_NAME                  # Debug Log 이름
LOG_DEBUG_LEVEL                 # Debug Log 레벨
LOG_DEBUG_MAX_SIZE              # Debug Log Max Size(MB)
LOG_DEBUG_MAX_FILES             # Debug Log 최대 파일 보관 수

LOG_API_NAME                    # API Log 이름
LOG_API_LEVEL                   # API Log 레벨
LOG_API_MAX_SIZE                # API Log Max Size(MB)
LOG_API_MAX_FILES               # API Log 최대 파일 보관 수

LOG_INTERFACE_NAME              # Interface Log 이름
LOG_INTERFACE_LEVEL             # Interface Log 레벨
LOG_INTERFACE_MAX_SIZE          # Interface Log Max Size(MB)
LOG_INTERFACE_MAX_FILES         # Interface Log 최대 파일 보관 수
```
### config/config.json
고정된 값으로 서비스 내에서 상수로 쓰이는 설정
```
batchTime                       # Batch Job 주기 (s)
elderlyCriteria                 # 고령자 기준 연령
errorCount                      # 사용자 에러 제한 횟수
sessionTime                     # 토큰 세션 시간
```



# Messages

## 메세지 분류

- callgate
    - common
- error
- journey
- mci
    - common
- server
    - api
    - common
    - response

## Usage

`./messages/index.js`를 import

```
const messages = require('../messages');
```

`messages` 객체는 디렉토리 구조와 유사한 형태로 정의되어 있으며 다음과 같이 사용 (객체 구조 아래 참고)

```jsx
// Journey
new messages.journey.JourneyResponseContactKey(response);

// Server
new messages.server.api.CreateLinkAndContactKey(req.body);
```

메시지 객체는 다음과 같은 형태로 정의됨

```
{
  callgate: {
    DMS1000Q: [class DMS1000Q extends CommonDMS],
    DMS1000S: [class DMS1000S extends CommonDMS],
    ...
    VDL2000Q: [class VDL2000Q extends CommonVDL],
    VDL2000S: [class VDL2000S extends CommonVDL]
  },
  error: {
    AuthenticationFailureError: [class AuthenticationFailureError extends CustomError],
    ConnectionRefusedError: [class ConnectionRefusedError extends CustomError],
    CustomError: [class CustomError extends Error],
    ...
    UnknownMessageError: [class UnknownMessageError extends CustomError],
    UnknownRemoteHostError: [class UnknownRemoteHostError extends CustomError]
  },
  journey: {
    ChannelStatus: [class ChannelStatus],
    ...
    JourneyResponseContactKey: [class JourneyResponseContactKey],
    LinkKeyData: [class LinkKeyData]
  },
  mci: {
    BranchDataQ: [class BranchDataQ extends CommonHanabank],
    BranchDataS: [class BranchDataS extends CommonHanabank],
    SendKakaoTalkQ: [class SendKakaoTalkQ],
  },
  server: {
    api: {
      CreateAccessToken: [class CreateAccessToken],
      CreateContactKey: [class CreateContactKey],
			...
      StatContactView: [class StatContactView]
    },
    common: {
      BooleanResponse: [class BooleanResponse],
      ErrorResponse: [class ErrorResponse],
      ListResponse: [class ListResponse],
      TokenResponse: [class TokenResponse]
    },
    response: {
      CommonCodeResponse: [class CommonCodeResponse],
      ContactAttributeResponse: [class ContactAttributeResponse],
      ContactResponse: [class ContactResponse],
      ...
      NecessaryDocumentResponse: [class NecessaryDocumentResponse],
      UserGroupResponse: [class UserGroupResponse]
    }
  }
}
```

## Description

### Server

<ins>HTTP Server에서 사용될 메시지 정의 (주로 Route - Service Layer) [./messages/server/ ]</ins>

(Model, Service 등) Layer 간 의존성을 제거하고 객체를 각 Layer에 필요한 형태로 변경하기 위해 사용 (DTO)

- server.api : HTTP Request 객체 매핑 (optional)
- server.common : 공통으로 사용하는 응답 모델 (list, boolean, error 등)
- server.response : Database Table의 각 모델 객체와 매핑

```jsx
const response = (await MenuRepository.getMenuGroupList({ groupName }))
  .map(menuGroup => new messages.server.response.MenuGroupResponse(menuGroup));
return new messages.server.common.ListResponse(response);
```

### Error

<ins>서비스 내에서 발생하는 사용자 정의 에러 [./messgaes/error/ ]</ins>

`./messages/error/CustomError.js` 를 상속하여 메시지 정의

```jsx
// ./messages/error/InvalidBodyParameterError.js

const CustomError = require('./CustomError');

module.exports = class InvalidBodyParameterError extends CustomError {
  constructor(message) {
    super();

    this.message = message;
  }
};
```

Example

```jsx
throw new messages.error.NotFoundDataError('Contact');
```

### External Interface

<ins>Relay가 Client 역할을 하는 외부 연동 시스템의 메시지 매핑 [./messages/journey/ , ./messages/callgate/ , ./messages/mci/ ]</ins>

Relay와 외부 시스템의 용어, 컨벤션, 객체 형식 등을 일관성있게 유지 (HTTP, JSON to JSON)

```jsx
// ./messages/journey/ChannelStatus.js

module.exports = class ChannelStatus {
  constructor(response) {
    this.channelType = response.data.USE_CH;
    this.systemState = response.data.SYSTEM_STATE;
    this.title = response.data.TITLE;
    this.content = response.data.CONTENT;
    this.main = response.data.MAIN;
    this.elderlyCriteria = require(global._configPath).elderlyCriteria;
    this.createdAt = response.data.CREATE_AT;
    this.updatedAt = response.data.UPDATE_AT;
    this.updatedBy = response.data.UPDATE_USER;
  }
};
```

요청의 Payload Format 변환(ex. json to text) 필요시 사용 (HTTP, JSON to TEXT)

```jsx
// 카카오톡 발송 요청, 영업점 조회 MCA 메시지 타입 정의 후 작성
```

전문 통신의 요청/응답 메시지 정의 (TCP, JSON to TEXT, TEXT to JSON)

```jsx
// Request
const CommonVDL = require('./common/CommonVDL');

module.exports = class VDL0000Q extends CommonVDL {
  constructor({ ani }) {
    super();
    this.messageType = this.constructor.name;
    this.userMdn = ani || '';
  }

  makeRequestBody(messageType) {
    const rawBody = messageType.padding(10)
      + this.authKey.padding(40)
      + this.serviceCode.padding(16)
      + this.userMdn.padding(16);
    return this.encryptBody(this.key, rawBody);
  }
};

// Response
const CommonVDL = require('./common/CommonVDL');

module.exports = class VDL0000S extends CommonVDL {
  constructor(data) {
    super();
    this.data = data.toString();
  }

  makeResponseBody(body) {
    const response = this.decodeCommonResponse(body);

    return response;
  }
};
```

### External Interface Message Details

**Callgate**

<ins>Class Inheritance Structure</ins>

```
CommonCallgate ─┬─ CommonDMS ─┬─ DMS1000Q
                │             ├─ DMS1000S
                │             ├─ DMS1001Q
                │             └─ DMS1001S 
                ├─ CommonEDL ─┬─ EDL0000Q
                │             ├─ EDL0000S
                │             ├─ EDL1000Q
                │             ├─ EDL1000S
                │             ├─ EDL2000Q
                │             ├─ EDL2000S
                │             ├─ EDL3000Q
                │             └─ EDL3000S   
                ├─ CommonIP  ─┬─ IP1000Q
                │             └─ IP1000S
                └─ CommonVDL ─┬─ VDL0000Q
                              ├─ VDL0000S
                              ├─ VDL1000Q
                              ├─ VDL1000S
                              ├─ VDL2000Q
                              └─ VDL2000S
```

<ins>공통 헤더 CommonCallgate</ins>

- 객체를 통한 전문 생성, 전문을 객체로 변환, 메시지 암호화(필요시) 등
- 공통 헤더에 필요한 항목들 중 필요에 따라 Configuration으로 관리
    
    ```
    # Callgate
    CALLGATE_HOST=15.164.71.110
    CALLGATE_PORT=5000
    CALLGATE_INTRO_LINK="http://www.ecstel.co.kr"
    CALLGATE_VDL_SVC_CODE=023415830001
    CALLGATE_IP_SVC_CODE=023415830002
    CALLGATE_EDL_SVC_CODE=023415830003
    CALLGATE_DMS_SVC_CODE=023415830004
    CALLGATE_CUSTOMER_SERVICE_ID=ECSTEL002
    CALLGATE_AUTH_KEY=69826BA13A989A80789C51EE212976A3059EF941
    CALLGATE_ENCRYPT_KEY=callquest^&!ECSTEL002^$}></-]STG
    CALLGATE_ENCRYPT_HEX=63616C6C71756573745E262145435354454C3030325E247D3E3C2F2D5D535447
    # AES256 / ECB / PKCS7Padding, ISO7816_4Padding
    CALLGATE_ENCRYPTION_PADDING=PKCS7Padding
    CALLGATE_CONTENT_CODE=1000
    CALLGATE_PROLOGUE_CONTENT_CODE=0000
    CALLGATE_EPILOGUE_CONTENT_CODE=1000
    ```
    
- Request Message Method
    - constructor() : 상속받는 모든 메시지에 공통으로 포함될 항목(메시지 헤더 등) 정의, 항목 길이(length) 설정을 위해 padding prototype 정의
    - *encryptBody*(key, body) : 요청 메시지 내용 암호화
    - *decryptBody*(key, encrypted) : 메시지 내용 복호화
    - *makeMessageHeader*(requestBody) : 메시지 Header 정의
    - *make*() : 메시지 타입 객체를 통한 전문 생성
- Response Message Method
    - *getResponseType*() : 요청 메시지 타입을 응답 메시지 타입으로 변환(변환 규칙, 메시지 맵 등 사용)
    - *makeResponse*() : 전문 형태의 응답 메시지 내용을 객체로 변환

<ins>서비스 별 공통 헤더 CommonDMS, CommonEDL, CommonIP, CommonVDL</ins>

- 콜게이트 메시지 헤더에 포함될 ServiceCode와 메시지 내용에 포함될 ContentCode를 서비스별로 구분하여 정의
    
    ```jsx
    // VDL
    module.exports = class CommonVDL extends CommonCallgate {
      constructor() {
        super();
        // VDL specific
        this.contentCode = process.env.CALLGATE_CONTENT_CODE;
        this.serviceCode = `${process.env.CALLGATE_VDL_SVC_CODE}`;
      }
    };
    
    // EDL
    module.exports = class CommonEDL extends CommonCallgate {
      constructor() {
        super();
        // EDL specific
        this.serviceCode = `${process.env.CALLGATE_EDL_SVC_CODE}`;
      }
    };
    ```
    

<ins>요청 메시지 타입 DMSXXXXQ, EDLXXXXQ, IPXXXXQ, VDLXXXXQ</ins>

- 콜게이트에서 배포한 메시지 유형 값으로 타입명 지정 (요청 Postfix : Q)
- 객체 형태의 Parameter를 입력받아 전문으로 변환
    - constructor() : 전문 생성에 사용할 수 있도록 Parameter를 메시지 타입 멤버 변수에 할당
    - *makeRequestBody*(messageType) : 메시지 내용에 포함될 전문 생성 및 암호화, 공통 헤더의 *make*()에서 호출
        
        ```jsx
        makeRequestBody(messageType) {
          const rawBody = messageType.padding(10)
            + this.authKey.padding(40)
            + this.serviceCode.padding(16)
            + this.userMdn.padding(16);
          return this.encryptBody(this.key, rawBody);
        }
        ```
        

응답 메시지 타입 DMSXXXXS, EDLXXXXS, IPXXXXS, VDLXXXXS

- 콜게이트에서 배포한 메시지 유형 값으로 타입명 지정 (응답 Postfix : S)
- 전문을 객체 형대로 변환
    - constructor() : 객체 변환에 사용할 수 있도록 전문을 메시지 타입 멤버 변수에 할당
    - *makeResponseBody*(body) : 전문을 인터페이스 규격에 따라 파싱하여 객체로 변환, 공통 헤더의 *makeResponse*() 에서 호출, 필요한 내용만 추출해도 무관
        
        ```jsx
        makeResponseBody(body) {
          const response = this.decodeCommonResponse(body);
          response.contents.telecomType = body.substring(86, 87).trim();
          response.contents.platformType = body.substring(87, 97).trim();
          response.contents.serviceSupportYn = body.substring(97, 98).trim();
          response.contents.launcherInstallYn = body.substring(98, 99).trim();
          response.contents.serviceInvokeType = body.substring(99, 101).trim();
          response.contents.phoneType = body.substring(101, 102).trim();
        
          return response;
        }
        ```
        

**Hanabank**

작성 필요

**PostOffice**

Class Inheritance Structure

```
CommonPostoffice ─┬─ ATKCM01901Q
                  ├─ ATKCM01901S
                  ├─ ...
```

공통 헤더 CommonPostoffice

- 객체를 통한 전문 생성, 전문을 객체로 변환, 메시지 암호화(필요시) 등
- 공통 헤더에 필요한 항목들 중 필요에 따라 Configuration으로 관리
    
    ```
    // 내용 추가
    ```
    
- Request Message Method
    - constructor() : 상속받는 모든 메시지에 공통으로 포함될 항목(메시지 헤더 등) 정의, 항목 길이(length) 설정을 위해 padding prototype 정의
    - *makeMessageHeader*(requestBody) : 메시지 Header 정의 (구현 필요)
    - *make*() : 메시지 타입 객체를 통한 전문 생성 (구현 필요)
- Response Message Method
    - *getResponseType*() : 요청 메시지 타입을 응답 메시지 타입으로 변환(변환 규칙, 메시지 맵 등 사용) (구현 필요)
    - *makeResponse*() : 전문 형태의 응답 메시지 내용을 객체로 변환 (구현 필요)

요청 메시지 타입 XXXXXXQ

- 인터페이스 설계서의 [거래ID+Q] 로 타입명 지정 (거래ID ATKIN02502 일 경우 ATKIN02502Q로 정의)
- 전문 식별자 확인 필요 (입출력전문ID? 전문ID? 거래ID?)
- 헤더 정의 필요
- 객체 형태의 Parameter를 입력받아 전문으로 변환
    - constructor() : 전문 생성에 사용할 수 있도록 Parameter를 메시지 타입 멤버 변수에 할당
    - *makeRequestBody*(messageType) : 메시지 내용에 포함될 전문 생성 및 암호화, 공통 헤더의 *make*()에서 호출
        
        ```jsx
        makeRequestBody() {
          const body = this.MBL_TELNO1_S4.padding(10)
            + this.MBL_TELNO_DVSN_EVAL1.padding(24)
            + this.MBL_TELNO_DVSN_EVAL2.padding(24);
          return body;
        }
        ```
        

응답 메시지 타입 XXXXXXS

- 인터페이스 설계서의 [거래ID+S] 로 타입명 지정 (거래ID ATKIN02502 일 경우 ATKIN02502S로 정의)
- 전문을 객체 형대로 변환
    - constructor() : 객체 변환에 사용할 수 있도록 전문을 메시지 타입 멤버 변수에 할당
    - *makeResponseBody*(body) : 전문을 인터페이스 규격에 따라 파싱하여 객체로 변환, 공통 헤더의 *makeResponse*() 에서 호출, 필요한 내용만 추출해도 무관
        
        ```jsx
        makeResponseBody(body) {
          const response = this.decodeCommonResponse(body);
          // body 기준 offset
          const offset = 0; // message header, body header 등을 제외한 실제 데이터 초기 offset
          response.contents.INQ_ROWCNT = body.substr(offset + 0, 5).trim(); // TODO: trim() 수행 여부
          response.contents.INQ_DATAGRID = body.substr(offset + 5, 10).trim(); // grid는 뭐임
          // ...
        
          return response;
        }
        ```
        

**Journey**

작성 필요










## Run
```
npm install
npm run start
```



## Digital Relay & Thru Packages

- relay : IVR, Thru 용 Gateway (Node.js)
- relay-admin : Realy admin 용 Relay 소스 (Node.js)
- relay-admin-view : Realy admin 화면 (Vue.js)
- thru-view : Thru 화면 (Angular)
- thru-bypass : Thru용 (Node.js)
  - Thru에서 다이렉트로 relay API 요청하지 않고 thru_bypass(node)로 요청하면 thru_bypass가 relay 로 요청
- mtranskey_complete_angular : 보안 키패드 기능 제공 (Java)
