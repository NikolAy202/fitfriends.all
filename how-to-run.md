1. Перейти в каталог project, выполнить build'ы и docker compose (образы содаются в docker compose)
    cd backend 

    nx run users:build
    nx run notify:build
    nx run uploader:build
    nx run bff:build
    nx run traning:build

    nx run users:buildImage
    nx run notify:buildImage
    nx run uploader:buildImage
    nx run bff:buildImage
    nx run traning:buildImage

    docker compose -f ./docker.compose.stage.yml up -d

2. Перейти по ссылке http://localhost:3002/