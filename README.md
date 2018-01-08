# Node Basics

Slides available [here](https://docs.google.com/presentation/d/1DjxNtdHH1k39Kml5If9Euo7ZKXAT52HDNgQpJTbcUGg/edit?usp=sharing)

## Requirements

- <http://nodejs.org>

- [git](http://git-scm.com/downloads)

- NPM global modules:

    npm install -g gulp bunyan json

## Clone the repo

    git clone https://github.com/Addibro/express-node-server.git
    cd express-node-server

### 01 Basic Server

    cd bin
    node www

<http://localhost:3001>

### 02 Express

    npm install
    node index.js

<http://localhost:3001>

### 03 Crud

    npm install
    node index.js


    curl -s -H "Content-Type: application/json" -X POST -d '{"name":"jessy","age":"3","type":"siamese"}' http://localhost:3002/cat | json

    curl -s -H "Content-Type: application/json" -X POST -d '{"name":"sam","age":"5","type":"alley"}' http://localhost:3002/cat | json

    curl -s -X GET http://localhost:3000/cat | json

    curl -s -H "Content-Type: application/json" -X PUT -d '{"name":"sam","age":"8","type":"alley"}' http://localhost:3002/cat/sam | json

    curl -s -X DELETE http://localhost:3000/cat/sam | json


### 04 MongoDB

<https://www.mongodb.org/downloads>


    brew up
    brew install mongodb

    npm install
    nodemon index.js

    # mongo commands
    show dbs
    use cats
    db.cats.find()
    db.cats.remove({})
    use cats
    db.dropDatabase()

### 05 Request

<https://github.com/request/request>

    brew i forever
    npm install
    forever start cat_server.js
    forever start dog_server.js
    forever list

    curl -s -H "Content-Type: application/json" -X POST -d '{"name":"jessy","age":"3","type":"boxer"}' http://localhost:3000/dog | json

    curl -s -H "Content-Type: application/json" -X POST -d '{"name":"sam","age":"5","type":"bulldog"}' http://localhost:3000/dog | json

    curl -s -X GET http://localhost:3000/dog | json

    curl -s -H "Content-Type: application/json" -X PUT -d '{"name":"sam","age":"8","type":"bulldog"}' http://localhost:3000/dog/ID | json

    curl -s -X DELETE http://localhost:3000/dog/ID | json

    nodemon pet_server.js

<http://localhost:3001/pets>

### 06 Async

<https://github.com/caolan/async>

    cd 06-async
    npm install
    forever start cat_server.js
    forever start dog_server.js
    forever list
    nodemon pet_server.js

<http://localhost:3002/pets>

### 07 Non Blocking

<https://github.com/caolan/async>

    npm install
    forever stopall
    forever start cat_server.js
    forever start dog_server.js
    forever list
    nodemon pet_server.js

<http://localhost:3002/pets>
<http://localhost:3002/ping>

### 08 Redis

<http://redis.io/download>

On Mac I recommend homebrew

    brew up
    brew install redis

    npm install
    forever stopall
    forever start cat_server.js
    forever start dog_server.js
    forever list
    nodemon pet_server.js

    curl -s -H "Content-Type: application/json" -X POST -d '{"name":"jessy","age":"3","type":"siamese"}' http://localhost:3000/cat | json

    curl -s -H "Content-Type: application/json" -X POST -d '{"name":"sam","age":"5","type":"alley"}' http://localhost:3000/cat | json

    curl -s -H "Content-Type: application/json" -X POST -d '{"name":"joe","age":"4","type":"garfield"}' http://localhost:3000/cat | json

    curl -s -H "Content-Type: application/json" -X POST -d '{"name":"mama","age":"9","type":"tabby"}' http://localhost:3000/cat | json

    curl -s -X GET http://localhost:3000/cat | json

<http://localhost:3002/catname/ID>

    # Useful redis commands
    redis-cli
    set key value
    get key
    keys *
    flushdb

### 09 Auth

    cd 09-auth
    npm install
    gulp | bunyan -l info --color

<http://localhost:3000/api/latest/basic/ping>
<http://localhost:3000/api/latest/basic/config>
<http://localhost:3000/api/latest/basic/echo/yourname>

    curl -s -H "Content-Type: application/json" -X POST -d '{"email":"sam@test.com","password":"123"}' http://localhost:3000/api/latest/auth/signup | json

<http://localhost:3000/api/latest/auth/ping>

    curl -s -X GET -H "x-access-token: TOKEN" http://localhost:3000/api/latest/auth/ping | json

    curl -s -H "Content-Type: application/json" -X POST -d '{"email":"sam@test.com","password":"123"}' http://localhost:3000/api/latest/auth/login | json

