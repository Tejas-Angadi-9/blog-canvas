const { GoogleGenerativeAI } = require("@google/generative-ai");

const aiModel = async (data) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = data;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

export default aiModel;