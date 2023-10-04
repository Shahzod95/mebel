const express = require('express');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const keys = require('../config/keys');

const {secret} = keys.jwt

const User = require("../models/user.Model")

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username) {
        return res
          .status(400)
          .json({ error: 'You must enter an username.' });
      }
  
      if (!password) {
        return res.status(400).json({ error: 'You must enter a password.' });
      }
  
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .send({ error: 'No user found for this username.' });
      }
  
    //   const isMatch = await bcrypt.compare(password, user.password);
  
    //   if (!isMatch) {
    //     return res.status(400).json({
    //       success: false,
    //       error: 'Password Incorrect'
    //     });
    //   }
  
      const payload = {
        id: user.id
      };
  
      const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
  
      if (!token) {
        throw new Error();
      }
  
      res.status(200).json({
        success: true,
        token: `Bearer ${token}`,
        user: {
          id: user.id,
          username: user.username,
        }
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  };


  module.exports = {
    login,
  }