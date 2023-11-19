const mongoose = require("mongoose");
const History = require("../models/history");
const axios = require('axios');
require('dotenv').config();

const sendPromptToLLM = async (prompt) => {
    const options = {
        method: 'GET',
        timeout: 10000,
        // url: 'https://jsonplaceholder.typicode.com/postss',
        url: process.env.LLM_API,
        params: {
            prompt: prompt
        },
        headers: {
            'X-RapidAPI-Key': process.env.LLM_API_KEY,
            'X-RapidAPI-Host': process.env.LLM_HOST
        }
    };

    let result = {
        data: '',
        statusCode: 0
    }
    try {
        const response = await axios.request(options);
        result.data = response.data
        result.statusCode = response.status
        return new Promise(resolve => {
            resolve(result)
        })
    } catch (error) {
        console.log(error)
        result.data = error.response.data.message
        result.statusCode = error.response.status
        return new Promise(reject => {
            reject(result)
        })
    }
}

const getRecipe = async (req, res) => {
    const params = req.body.params
    const searchQuery = params.searchQuery;
    const featureFlag = params.type;

    let prompt = "Given a list of labels containing various items, some of which may be edible, please analyze the shelf life and suitability for consumption of the ingredients (avoiding mouldy, rotten, expired food), and then recommend a set of edible ingredients. Once you've identified the edible items, suggest detailed recipes that can be prepared using these ingredients. Ensure that the selected recipes are not only safe to eat but also delicious and practical. Please ignore non-food items. Additionally, take into account the shelf life of the food items listed, ignore rotten food and only consider those that are suitable to eat. Ignore if they are not safe for consumption. Once you have chosen the edible ingredients, suggest creative and tasty recipes that can be prepared with them. Your recipes should consider the combination of these ingredients and provide step-by-step instructions on how to make a delicious dish."
        + searchQuery
    console.log(searchQuery, featureFlag)

    const response = await sendPromptToLLM(prompt);
    console.log(response)
    res.status(response.statusCode).json({
         response
    })
};

module.exports = { getRecipe };