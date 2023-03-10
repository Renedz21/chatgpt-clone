import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
    const response = await openai.createCompletion({
        model,
        prompt,
        temperature: 0.9,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    }).then((response) => response.data.choices[0].text).catch((error) => `ChatGPT is currently unavailable. Please try again later. ${error.message}`);

    return response;
}

export default query;