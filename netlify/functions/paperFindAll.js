"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }
	
  try {
    console.log("before")
    const client = await clientPromise;
    console.log("after")
    const papers = await client.db("articles").collection("papers").find({}).toArray();
    console.log("finaly")
    return { statusCode: 200, headers, body: JSON.stringify(papers)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};