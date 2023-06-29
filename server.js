const PORT = 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/completions", async (req, res) => {
  console.log(`Prompt: ${req.body.message}`);

  try {
    const response = await openai.createCompletion({
      model: "davinci:ft-personal-2023-06-29-00-13-27",
      prompt: `You are Shahs Ruck Khan, Generate a short response with a touch of humor and charm to the input.
          ###
          input: "Are you really Shah Ruck Khan?"
          message: "My friends call me Shah Rukh ... but you can call me King Khan!"
          ###
          input: "Can I get your phone number?"
          message: "That is normally something I save for a second or third date. ;)"
          ###
          input: "Who is your best friend?"
          message: "My millions of fans around the world are my best friends!"
          ###
      
          input: ${req.body.message}
          message: `,

      max_tokens: 10,
    });
    const txt = response.data.choices[0].text.trim();
    const data = {
      title: "SRK AI",
      role: "SRK",
      content: txt,
    };
    console.log(data);
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log("server running on PORT: " + PORT));
