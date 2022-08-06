// const redis = require('redis');
// const { handleSuccess } = require('../utils/handleResponse');
// const REDIS_PORT = process.env.PORT || 6379
// const client = redis.createClient(REDIS_PORT)
// client.connect();

// async function redisMiddleware() {
//     return  (req, res, next) => {
//         if(req.originalUrl === '/v1/user/get-all'){
//             let result = await client.get('listUser')
//             if(result){
//                 return handleSuccess(res, result, "Get list user successfully!");
//             } else {
//                 next()
//             }
//         }
//       }
// }

// module.exports = redisMiddleware