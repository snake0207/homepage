[![CI](https://github.com/snake0207/homepage/actions/workflows/ci.yml/badge.svg)](https://github.com/snake0207/homepage/actions/workflows/ci.yml)

## Key Features

- NextJS 프레임웍 사용
- 반응형
- github Action (auto CI/CD)
- github의 Custom Domain과 가비아 연결

<!-- installation -->

## Installation

- **Node Installation:** [Install node js](https://nodejs.org/en/download/) [Recommended LTS version]

- IDE 설치 [[VS Code](https://code.visualstudio.com/) recommended] 후 사용할 것을 권장

- Configuration setup

```
    1. git init .
    2. git remote add homepage https://github.com/snake0207/homepage.git
    3. git checkout -b [new_branch명]
    4. git pull homepage 2024_home
    5. npm install
```

## Build & Deploy

### 수동 배포

github gh-pages branch로 설정(package.json)

```
    1. npm run build
    2. npm run deploy
```

### 자동 배포

github branch의 Action(.github/worksflows/ci.yml)으로 자동화

```
    1. git add .
    2. git commit -m "deploy ~"
    3. git push -u homepage [원격브랜치명]
```

<!-- licence -->

## License

Copyright (c) 2016 - Present, Designed & Developed by [Themefisher](https://themefisher.com)

**Code License:** Released under the [MIT](https://github.com/themefisher/bigspring-light-nextjs/blob/main/LICENSE) license.

**Image license:** The images are only for demonstration purposes. They have their license, we don't have permission to share those images.
