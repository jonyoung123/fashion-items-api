const userServiceImport = require('../services/user-service');
const userservice = new userServiceImport();

class UserController
{
    constructor(){

    }

    async registerUser(req, res)
    {
        const {email, username, password} = req.body;

        if(email === undefined){
            return res.status(400).json({message: 'Email is required!'})
        }
        // other validations

        // Generate token
        const token = userservice.createSignUpToken(req.body);

        // save user details to database
        const isCreated = await userservice.createUser(req.body);
        if(isCreated){
            return res.status(200).json({responseCode:200, message: 'User created successfully', token : token});
        }else{
            return res.status(500).json({responseCode: 500, message: 'Internal server error'});
        }
    }

    async loginUser(req, res)
    {
        const {email, password} = req.body;
        if(email === undefined)
            return res.status(400).json({message:'Email is required to login'})
        if(password === undefined)
            return res.status(400).json({message:'Password is required to login'})
        // Call the service
        const response = await userservice.loginUser(req.body);
        res.status(response.responseCode).json(response);
    }
}

module.exports = UserController;