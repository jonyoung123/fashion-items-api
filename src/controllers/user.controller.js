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
        if(username === undefined){
            return res.status(400).json({message: 'Username is required!'})
        }
        if(password === undefined){
            return res.status(400).json({message: 'Password is required!'})
        }

        // Generate token
        const token = userservice.createSignUpToken(req.body);

        // save user details to database
        try {
            const findUser = await userservice.getUserbyEmail(email);
            if (findUser !== null)
                return res.status(400).json({
                    responseCode : 400,
                    message : "User already exist, login"
                });
            const isCreated = await userservice.createUser(req.body);
            if(isCreated){
                return res.status(200).json({responseCode:200, message: 'User created successfully', token : token});
            }else{
                return res.status(500).json({responseCode: 500, message: 'Internal server error'});
        }
        } catch (error) {
            return res.status(500).json({
                message : "unable to create account"
            })
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
        try {
            const response = await userservice.loginUser(req.body);
            return res.status(response.responseCode).json(response);
        } catch (error) {
            return res.status(500).json({
                responseCode : 500,
                message : "Internal Server error, Unable to login"
            })
        }
    }
}

module.exports = UserController;