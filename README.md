1. Перейти в каталог backend, выполнить build'ы и docker compose (образы содаются в docker compose)
    cd backend 

    nx run users:build
    nx run notify:build
    nx run uploader:build
    nx run bff:build
    nx run training:build

    nx run users:buildImage
    nx run notify:buildImage
    nx run uploader:buildImage
    nx run bff:buildImage
    nx run training:buildImage

    docker compose -f ./docker.compose.stage.yml up -d

2. Перейти в каталог cd frontend, выполнить build и docker compose (образ содаются в docker compose)
    cd frontend
    npm run build 
    docker compose -f ./docker.compose.stage.yml up -d

3. Перейти по ссылке http://localhost:3002/