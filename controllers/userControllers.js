const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = require('../config/keys');

const {secret, tokenLife} = keys.jwt

const User = require("../models/user.Model")

const register = async (req, res) => {
  try {
    const { username,  password } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ error: 'You must enter an username.' });
    }


    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'That username is already in use.' });
    }

    const user = new User({
      username,
      password
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    const registeredUser = await user.save();

    const payload = {
      id: registeredUser.id
    };


    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

    res.status(200).json({
      success: true,
      subscribed,
      token: `Bearer ${token}`,
      user: {
        id: registeredUser.id,
        username
      }
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
};

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
  
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          error: 'Password Incorrect'
        });
      }
  
      const payload = {
        id: user.id
      };
  
      const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
      console.log(token)
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
    register
  }