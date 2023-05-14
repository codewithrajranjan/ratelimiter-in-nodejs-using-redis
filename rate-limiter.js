const Redis = require("ioredis")
const moment = require("moment")
const redisClient = new Redis({url: "redis://localhost:6379"})

const RATELIMIT_DURATION_IN_SECONDS = 60
const NUMBER_OF_REQUEST_ALLOWED = 5

module.exports = {
    rateLimiter : async(req, res, next) => {
        const userId = req.headers["user_id"]
        const currentTime = moment().unix()

        const result = await redisClient.hgetall(userId)
        if(Object.keys(result).length === 0){
            await redisClient.hset(userId, {
                "createdAt": currentTime,
                "count": 1})
            return next()
        }
        if(result){
            let diff = (currentTime - result["createdAt"])

            if(diff > RATELIMIT_DURATION_IN_SECONDS){
                await redisClient.hset(userId, {
                    "createdAt":currentTime,
                    "count": 1
                })
                return next()
            }
        }
        if(result["count"]>=NUMBER_OF_REQUEST_ALLOWED){
            return res.status(429).json({
                "success": false,
                "message": "user-ratelimited"
            })
        }else{
            await redisClient.hset(userId,{
                "count" : parseInt(result["count"]) + 1
            })
            return next()
        }
    }
}