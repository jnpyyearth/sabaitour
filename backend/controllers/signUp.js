const config = require("../config");
const express = require("express");
const sql = require("mssql");
const bcrypt = require('bcrypt');


module.exports.signUp =async (req, res)=>{
    const {username,email,password,firstname,lastname,phone, confirmPassword}= req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try{
        const pool = await sql.connect(config);
        //check have user?
        const checkUser =await pool.request()
        .input('email',sql.VarChar,email)
        .query('select * from Users where email=@email ');
        
        if(checkUser.recordset.length >0){
            return res.status(400).json({message:'Username or Email already exits'})
        }
        const storedHashedPassword = await bcrypt.hash(password,10);
        //insert data
        await pool.request()
        .input('username',sql.VarChar,username)
        .input('email',sql.VarChar,email)
        .input('password',sql.VarChar, storedHashedPassword)
        .input('firstname',sql.VarChar,firstname)
        .input('lastname', sql.VarChar,lastname)
        .input('phone',sql.VarChar,phone)
        .query('insert into Users (username, email, password,firstname,lastname,phone)VALUES (@username, @email, @password, @firstname, @lastname, @phone)')
        res.status(201).json({message:'User registered successfully'});
    } catch(error){
        console.error(error);
        res.status(500).json({message:'Server error'})
    }
}