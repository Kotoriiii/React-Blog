import {dbQuery} from "../db/dbQuery.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req,res) => {

    const {email,username} = req.body

    try{
        let result = await dbQuery("SELECT * FROM users where email = ? OR username = ?", [email,username])
        if(result.length)
        {
            res.status(409).json("User already exists!")
        }
        else
        {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password,salt)
            await dbQuery("INSERT INTO users (`username`,`email`,`password`) VALUES (?,?,?)",[username,email,hash])
            res.status(200).json("User has been created");
        }

    }
    catch(err){
        res.json(err);
    }


}

export const login = async (req,res) => {

    const {username} = req.body

    try{
        let data = await dbQuery("SELECT * FROM users where username = ?", [username])
        if(data.length === 0)
        {
            return res.status(404).json("User not found");
        }
        else
        {
            const {password,...other} = data[0]

            const isPasswordCorrect = bcrypt.compareSync(req.body.password, password)

            if(!isPasswordCorrect){
                return res.status(400).json("Wrong username or password");
            } 

            const token = jwt.sign({id:data[0].id}, "jwtkey");

            res.status(200).json({...other,"token":token})

        }

    }
    catch(err){
        res.json(err);
    }

    
}

export const logout = (req,res) => {
    res.status(200).json("User has been logged out");
}