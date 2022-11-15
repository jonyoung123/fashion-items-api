const express = require("express");
const path = require("path");
const tokenValidator = require('./services/token-service');

// ROUTERS
const itemRouter = require('./routes/items.routes')
const userRouter = require('./routes/user.routes');


// CONSTANTS
const apiPaths = require('./constants/api-paths')

// APPLICATION CONFIGURATIONS
const app = express();
const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;

// IMPORTANT MIDDLEWARES
app.use(express.json())

// SECURITY MIDDLEWARE
app.use('/', (req, res, next) => {
    
    try{
        
        if( req.url.includes('signup')){
            console.log('yes')
            return next();
        }
        const token = (req.headers['authorization']).toString().replace('Bearer ', '').trim();
        const tokenValid = tokenValidator(token);
        if(!token){
            return res.status(401).json({message :'Unauthorized.'});
        }
        next();
    }catch(err){
        return res.status(401).json({message :'Forbidden'})
    }

})

// APPLICATION ROUTERS
app.use(apiPaths.allItems, itemRouter)
app.use(apiPaths.userPath, userRouter)

// APPLICATION STARTING
app.listen(port, ()=>{
    console.log(`server listening at port ${port}`);
});