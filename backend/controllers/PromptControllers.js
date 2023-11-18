const mongoose = require("mongoose");
const History = require("../models/history");
const axios = require('axios');
require('dotenv').config();

const getRecipe = async (req, res) => {

  const params = req.body.params

  const searchQuery = params.searchQuery;
  const featureFlag = params.type;
  let prompt = "" + searchQuery
  
  console.log(searchQuery, featureFlag)

  // const options = {
  //   method: 'GET',
  //   timeout: 10000,
  //   url: process.env.LLM_API,
  //   params: {
  //     prompt: prompt
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': process.env.LLM_API_KEY,
  //     'X-RapidAPI-Host': process.env.LLM_HOST
  //   }
  // };

  // try {
  //     const response = await axios.request(options);
  //     console.log(response.data);
  //     res.status(200).json({
  //       message: "Data Updated",
  //       data: response.data
  //     })
  // } catch (error) {
  //     console.error(error);
  //     res.status(error.code).json({
  //       message: "Error",
  //       data: error
  //     })
  // }
};

module.exports = { getRecipe };