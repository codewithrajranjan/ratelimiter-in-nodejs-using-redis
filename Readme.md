## Ratelimiter in NodeJS using Redis

This rate limiter in nodejs using redis. you can use this to ratelimiter in your application to rate limit the apis.

### Install dependencies

```bash
npm install
```

### Run Server

```bash
node index.js
```


### Rest API for for calling the GET API

```bash
curl --location 'http://localhost:7005/ping' \
--header 'user_id: 111112' 
```




## References
- Install Redis using docker and docker compose | Redis Insight docker installation

https://www.youtube.com/watch?v=qucL1F2YEKE


- Install Redis using docker compose
  http://selftuts.in/install-redis-using-docker-compose/