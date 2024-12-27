const expres = require('express');
const mongoose = require('mongoose');
const app = expres();
require("dotenv").config()
app.use(expres.json());
app.use(expres.urlencoded({ extended: true }))
// Make sure to include these imports:
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });




app.get('/gemini/ask', (req, res) => {
    try {
        const { query } = req.body;

        console.log("hi server is runing")
        const call_ai = async (prompt) => {
            const result = await model.generateContent(prompt);
            const answers = result.response.text();
            res.send(answers)

        }
        call_ai(query)
    } catch (error) {
        return res.status(404).json({ message: error })
    }

    // res.send("your ansers is ",answers)   
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})