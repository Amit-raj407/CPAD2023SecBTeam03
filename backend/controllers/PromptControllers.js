const mongoose = require("mongoose");
const History = require("../models/history");
const axios = require('axios');
const vision = require('@google-cloud/vision');
require('dotenv').config();


const ApiResponse = require('../models/Response');
const status = require('../enums/Status');


const sendPromptToLLM = async (prompt, id) => {
    const options = {
        method: 'GET',
        timeout: 60000,
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
        result.data = response?.data
        result.statusCode = response?.status

        console.log('LLM Response Generated');

        await updateHistoryDB({ id: id, status: status.RESPONSE_GENERATED, llmResponse: result.data });
        console.log('History DB updated')

        return new Promise(resolve => {
            resolve(result)
        })
    } catch (error) {
        result.data = error?.response?.data?.message
        result.statusCode = error?.response?.status
        return new Promise(reject => {
            reject(result)
        })
    }
}

const imageProcessing = async (imageUrl, id) => {
    let searchQuery = ""
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: './APIKey.json'
    });

    const [result] = await client.objectLocalization(imageUrl);
    const objects = result.localizedObjectAnnotations;
    objects.forEach(object => {
        searchQuery = searchQuery + object.name + ", "
        console.log(`Name: ${object.name}`);
        console.log(`Confidence: ${object.score}`);
        const vertices = object.boundingPoly.normalizedVertices;
        vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
    });

    // const searchQuery = 'Onion, Potato'
    console.log(searchQuery)
    await updateHistoryDB({ id: id, status: status.IMAGE_PROCESSED, request: searchQuery });
    console.log("Image Processed");
    return searchQuery;
}

const updateHistoryDB = async (patchEntity) => {
    await History.findByIdAndUpdate(patchEntity.id, patchEntity, { new: true }).then(response => {
        console.log(response);
        return new Promise(resolve => {
            resolve(response)
        })
    }).catch(error => {
        console.log(error);
        return new Promise(reject => {
            reject(error)
        })
    });
}

const getRecipe = async (req, res) => {
    const params = req.body.params
    let searchQuery = params.searchQuery;
    let featureFlag = params.type;

    // featureFlag can be "String" or "Image"

    console.log(searchQuery, featureFlag);

    try {
        const savedRecord = await History.create({
            request: searchQuery
        });

        res.status(axios.HttpStatusCode.Created).json({
            res: new ApiResponse(savedRecord, axios.HttpStatusCode.Created)
        })

        // searchQuery can have image url directly
        if(featureFlag === 'Image') {
            searchQuery = await imageProcessing(searchQuery, savedRecord._id);
        }

        let prompt = "Given a list of labels containing various items, some of which may be edible, please analyze the shelf life and suitability for consumption of the ingredients (avoiding mouldy, rotten, expired food), and then recommend a set of edible ingredients. Once you've identified the edible items, suggest detailed recipes that can be prepared using these ingredients. Ensure that the selected recipes are not only safe to eat but also delicious and practical. Please ignore non-food items. Additionally, take into account the shelf life of the food items listed, ignore rotten food and only consider those that are suitable to eat. Ignore if they are not safe for consumption. Once you have chosen the edible ingredients, suggest creative and tasty recipes that can be prepared with them. Your recipes should consider the combination of these ingredients and provide step-by-step instructions on how to make a delicious dish."
            + searchQuery

        console.log('prompt sent to LLM');
        const response = await sendPromptToLLM(prompt, savedRecord._id);
        console.log(response);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getRecipeById = async (req, res) => {
    await History.findById(req.params.id).then((data) => {
        res.status(200).json({
            message: "Data found",
            data: data
        })
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    });
};

const getAllRecipes = async (req, res) => {
    try {
        const latestData = await History.find({})
          .sort({ createdDate: -1 }) 
          .limit(10); 
    
        res.status(200).json({
            message: "Data found",
            data: latestData
        })
      } catch (error) {
        res.status(500).json({
            message: err.message
        })
      }
};


module.exports = { getRecipe, getRecipeById, getAllRecipes };