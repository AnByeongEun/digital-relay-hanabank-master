### Docker Image build 시 패키지 외부의 디렉토리에서 build 작업 수행을 권장


# base docker image 지정
FROM node:12.22.5

# 모듈을 설치할 디렉토리 생성
# RUN mkdir -p /usr/src/app

# 앱 디렉터리 생성
# docker container 내의 작업 디렉토리 지정
WORKDIR /usr/src/app

# ENV JAVA_HOME /usr/src/app

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

# RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# 앱 소스 추가
COPY . .

# 3001 포트로 바인딩
EXPOSE 3001

# ENTRYPOINT ["node"]
# CMD [ "./app" ]




# docker build . -t digital-relay