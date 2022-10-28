const jwt = require('jsonwebtoken');
const JWT_SECRET = 'john5646john5646john5646john5646???'
const repo = require('../database/datastore');
const bcrypt = require('bcryptjs');
const { query } = require('../database/datastore');

const userTableName = 'users';

class UserService
{
    constructor(){

    }

    // TOKEN SERVICE
    createSignUpToken(object)
    {
        const token = jwt.sign(object, JWT_SECRET);
        return token;
    }

    // CREATION SERVICE
    async createUser(object)
    {
        let isUserCreated = false;
        const {email, username, password} = object
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        try{
            let query = `insert into ${userTableName}(email, username, passphrase) values 
            ('${email}', '${username}', '${hashedPassword}')`

            await repo.none(query);
            isUserCreated = true;
        }catch(errr){
            console.log(errr);
        }
        return isUserCreated;
    }

    async getUserbyEmail(email)
    {
        let possibleUser = null
        try{
            const query = `select * from users where email = '${email}'`;
            possibleUser = await repo.one(query);
        }catch(err){
            console.log(err);
        }

        return possibleUser;
    }

    // LOGIN
    async loginUser(object)
    {
        const {email, password} = object;
        const possibleUser = await this.getUserbyEmail(email);
        if(possibleUser === undefined || possibleUser === null || Object.keys(possibleUser).length === 0)
        {
            return {responseCode:404, message: 'No user with this email!'}
        }

        const savedPasswordHashed = possibleUser.passphrase;

        const isPasswordCorrect = bcrypt.compareSync(password, savedPasswordHashed);

        if(!isPasswordCorrect){
            return {responseCode:400, message: 'Incorrect password!'}
        }

        let userProfile = {email: possibleUser.email, username: possibleUser.username}
        return {responseCode:200, message: 'Login successfully', userProfile: userProfile};
    }
}

module.exports = UserService;