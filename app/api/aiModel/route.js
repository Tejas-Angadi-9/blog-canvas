import aiModel from "@/services/geminiAi";

export const POST = async (req) => {
    const { data } = await req.json();
    if (!data) {
        return new Response(JSON.stringify({
            status: false,
            message: "Input data is missing"
        }))
    }
    try {
        const result = await aiModel(data);
        console.log("Result from AI Model: ", result);

        return new Response(JSON.stringify({
            status: true,
            result,
        }))
    }
    catch (err) {
        console.log("Failed to get the response from the ai model");
        return new Response(JSON.stringify({
            status: false,
            message: err.message
        }), { status: 500 })
    }
}