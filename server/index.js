import express, { response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

let apiKey = "YOUR_API_KEY_HERE";

const genai = new GoogleGenerativeAI(apiKey);
const model = genai.getGenerativeModel( {model: "gemini-1.5-flash" });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/gen", async (req, res)=>{
    let complexity = req.body.complexity;
    let commitment = req.body.commitment;
    let usedPrompts = req.body.used;

    let aiPrompt = `Generate a topic for a coding project.\
    The project should be of ${complexity} level and should take around ${commitment}.\
    Do NOT repeat any of the following: ${usedPrompts}.\
    This should be something that is not too specific, but not too broad, somet~hing that can be interpreted in many different ways.\
    Example 1: Fitness-related project:\
    'Fitness' alone is not an acceptable response. This is too broad.\
    'Daily exercise tracking app' is also not an acceptable response. This is too specific.\
    'Exercise motivation' is just right. This should be the target.\
    Example 2: Health-related project:\
    'Health' alone is not an acceptable response. This is too broad.\
    'Recipe generating website' is also not an acceptable response. This is too specific.\
    'Eating healthy' is just right. This should be the target.\
    Example 3: Education-related project:\
    'Education' alone is not an acceptable response. This is too broad.\
    'Note-Taking App' is also not an acceptable response. This is too specific.\
    'Helpful Tool for Students' is just right. This should be the target.\
    Along with these, generate three (3) more specific examples of coding project ideas that can be done with the topic.\
    For 'Exercise motivation', one of these may be 'Daily exercise tracking app'.\
    For 'Eating healthy', one of these may be 'Recipe generating website'.\
    For 'Helpful Tool for Students', one of these may be 'Note-Taking App.\
    The format for the response should be as follows:\
    Topic!SPLIT_TOPIC!Example 1!SPLIT_EX!Example 2!SPLIT_EX!Example 3\
    E.g.: Eating healthy!SPLIT_TOPIC!Recipe-generating website!SPLIT_EX!Interactive game with healthy vs unhealthy food choices!SPLIT_EX!User-influenced healthy food suggestor`;

    let newPrompt = await generate(aiPrompt);

    res.send({msg:newPrompt});
})

app.post("/refresh", async (req, res)=>{
    let complexity = req.body.complexity;
    let commitment = req.body.commitment;
    let topic = req.body.topic;
    let prevIdeas = req.body.ideas;

    let aiPrompt = `Generate three different ideas for coding projects pertaining to the topic ${topic}.\
    These should be ${complexity} level and should take around ${commitment}.\
    The three ideas generated should be different than the following: ${prevIdeas}\
    The format for the ideas should be as follows:\
    idea1!SPLIT_EX!idea2!SPLIT_EX!idea3\
    Example:\
    Basic budgeting app!SPLIT_EX!Expense tracker!SPLIT_EX!Savings goal calculator`

    let newIdeas = await generate(aiPrompt);

    res.send({msg:newIdeas});
})

app.post("/help", async (req, res)=>{
    let project = req.body.project;
    let commitment = req.body.commitment;
    let complexity = req.body.complexity;

    let aiPrompt = `Generate a quick walkthrough on how to make the following coding project: ${project}.\
    The walkthrough should take around ${commitment} to complete and should be of ${complexity} level.\
    Firstly, name the tools that can be used, including languages, libraries, and frameworks.\
    Then, generate a small tutorial containing the steps to create the project.\
    Each step should include the tool(s) used to achieve it.\
    Each step should be a brief overview-- nothing too indepth, NO code samples.\
    Keep the walkthrough short and concise.\
    All steps, including tools, should have !NEWLINE! between them.\
    E.G: Tools:!NEWLINE!Languages:!NEWLINE!Frameworks!NEWLINE!Walkthrough!NEWLINE!Step One!NEWLINE!Step Two!NEWLINE!Step Three`

    let projectHelp = await generate(aiPrompt);

    res.send({projectHelp: projectHelp});
})

async function generate(aiPrompt){
    let response = await model.generateContent(aiPrompt);
    
    return response.response.text();
}

app.listen(3000, ()=>{
    console.log("unga bunga is listening");
});