# Node.js

## Node.js란?

자바스크립트는 원래 브라우저 내에서 동작할 수 있었지만, nodejs로 인해 브라우저 밖으로 나올 수 있게 되었습니다. 그래서, 서버를 만들 수도 있고, 웹 스크랩을 하는 등 프로그래밍 언어로 사용할 수 있게 해준 것입니다. 그것이 nodejs입니다.

## 무엇을 할 수 있을까?

Spring, Laravel, Django 등 웹 프레임워크는 많은데, nodejs를 사용하는 이유는 무엇일까요?

모든 프레임워크에 장당점이 있기 때문에, 이럴 다음과 같은 경우에 nodejs를 사용합니다.

#### 가장 먼저는 언어가 자바스크립트입니다. 자바스크립트로 프론트엔드, 백엔드를 모두 할 수 있으며, 요소들을 customizing할 수 있게 됩니다.

#### 비동기이기 때문에 실시간 처리에 유용합니다. 많은 데이터를 전송하고 저장하고, 알림이나 채팅처럼 실시간 요청에 대한 반응이 필요한 서비스에 유용합니다.

#### 단, 메모리나 램에 접근해서 해야하는 작업에는 적합하지 않습니다. 하지만, 규모가 있는 서비스는 아주 다양한 언어로 개발되어 있습니다. nodejs를 공부한다고 다른 건 못한다고 생각할 필요는 없다고 생각합니다.

## Get started

_cf) mac을 기준으로 적었습니다. 양해 바랍니다._

#### 1. Homebrew 설치

#### 2. nodejs 설치 (by brew)

node.js를 설치하면, 자동적으로 npm(앱스토어 같이 패키지를 담아두고 관리하는 것)이 설치됩니다. 그 때부터 다음의 명령어를 사용합니다.

## Server started

#### 1. express (웹 프레임워크) 설치

```javascript
npm init              // npm으로 프로젝트 시작 (package.json이 생성됩니다.)
npm install express   // express 설치
```

**_npm 명령어는 반드시!! package.json이 있는 곳에서 명령어를 실행해야 합니다._**
**_아니면 의도하지 않은 곳에 packge.json이 또 생깁니다._**

## Github & gitignore

node_modules는 무거운 파일입니다. 그래서 저장소에서 .gitignore에 추가해야합니다.

구글에 gitignore nodejs를 치면, gitignore해야하는 표준이 있으니 이것으로 채워넣으면 됩니다.

**_package-lock.json 도 꼭 확인하고 추가해주세요. 보안과 관련된 것입니다._**

그래서 협업을 하게 되면, 소스코드와 package.json파일만 넘겨주면 됩니다. 그러면 넘겨받은 측에서

```javascript
npm install
```

하면 필요한 패키지 다운로드 끝~

## 서버 확인

자바스크립트 파일 하나를 만들어서 다음의 코드가 실행되는지 확인합니다. 이 때는 파일명을 신경쓰지 맙시다.

```javascript
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
```

## 코드 들어가기 전 환경

#### 0. 파일 만들기

가장 기본적인 예시를 위한 형식으로, 꼭 따를 필요 없이 기본 틀을 이해했다면, 커스터마이징해서 사용하면 됩니다.
**app.js** , **init.js** , **router.js** 를 만듭니다.

#### 1. babel

최신 js를 오리지날 js로 알아서 바꿔주는 도구입니다.

```shell
npm install @babel/node
npm install @babel/preset-env
npm install @babel/core
```

그리고, .babelrc를 만들고, 다음을 입력합니다.

```json
{
  "presets": ["@babel/preset-env"]
}
```

#### 2. nodemon

코드를 수정하고, 서버를 껐다가 다시 키고 하는 일을 대신해줍니다. nodemon을 설치할 때는 -D (개발자에게 필요한 dependency로 넣기)를 붙입시다.

```shell
npm install nodemon -D
```

그리고, package.json에서 다음과 같은 부분을 추가합니다. delay를 주는 이유는 코드가 수정되고, babel이 변환을 완료할 시간을 주기 위함입니다.

```json
"scripts" : {
    "start" : "nodemon --exec babel-node init.js --delay 2"
}
```

#### 3. morgan

middleware로, 무슨 일이 어디서 일어났는지 기록해주는 logging 도구입니다.

```shell
npm install morgan
```

#### 4. helmet

nodejs의 보안을 위해 필요한 middelware입니다.

```shell
npm install helmet
```

#### 5. body-parser

사용자가 form을 채워서 전송하면, 서버가 받게 됩니다. 이 때의 request object에 접근할 수 있도록 합니다.

```shell
npm install body-parser
```

#### 6. cookie-parser

session을 다루기 위해서 cookie에 유저 정보를 저장하는데, 서버가 사용자로부터 받은 데이터를 이해할 수 있게 합니다. json으로 보내는 경우(json), html form으로 보내는 경우(urlencoded)에 대해 설정합니다.

```shell
npm install cookie-parser
```

#### 7. all in code

여기까지 했다면, **app.js** 에 다음과 같이 추가해줍니다. (주석으로 해놓은 부분도 결국에는 다 사용하게 됩니다.)

```javascript
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import { userRouter } from "./router";

app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// // get methods something (not listen method here)
// app.use("/user", userRouter); // 사용자가 '/'에 접근하면, userRouter가 이를 처리할 것이라는 의미

export default app; // 다른 파일에서 import하면, app object를 준다는 의미
```

**init.js** 에 다음과 같이 추가해줍니다.

```javascript
import app from "./app";

const PORT = 4000;

app.listen(PORT, () => console.log(`✅Listening on: http://localhost:${PORT}`));
```

**router.js** 에 다음과 같이 추가해줍니다.

```javascript
import express from "express";

export const userRouter = express.Router(); // userRouter 객체도 다른 곳에서 사용합니다.

userRouter.get("/", (req, res) => res.send("Test"));
```

#### 8. settings finished

## 명령어 이해

**_모든 명령어는 위에서 아래로 실행됩니다. 이것은 당연하게 보이지만, 생각보다 중요합니다._**

#### 1. get

get방식은 사용자가 form에 쓴 값이 url에 담겨 있는 것이 특징입니다.

```javascript
app.get("/", call); // 사용자가 /에 접근하면, call함수 실행
```

_cf) call함수에 res.send("") 가 없으면 무한 로딩_

#### 2. use

use는 middleware를 글로벌로 사용하는 메서드입니다. 이는 해당 웹사이트에서 모두 다 적용됩니다. (특정 하나에만 사용하고 싶다면, get의 중간 인자를 추가하여 사용합니다.)

middleware은 사용자와 마지막 응답 사이에 존재하는 것입니다. express에서의 모든 함수는 middleware가 될 수 있습니다. middleware은 (req, res, next)를 가집니다. 원하는 만큼의 middleware를 가질 수 있습니다. 만약 middleware에서 next함수를 호출하지 않는다면, 연결을 끊을 수도 있습니다.

## 번외

여기에 정리하기 위해서, 아나콘다 가상환경을 유용하게 사용하였습니다. 아나콘다가 설치되어 있다면, 참고하면 좋을 것 같습니다.

```shell
conda create -n environment_name_you_want python=3.6
conda env list
conda activate environment_name
```

```shell
deactivate
conda env remove -n environment_name
```
