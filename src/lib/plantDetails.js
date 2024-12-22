import { GoogleGenerativeAI } from "@google/generative-ai";
import { plantPrompt } from "./plantPrompt.js";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINIAI_API_KEY);
const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
	systemPrompt: plantPrompt,
});

export async function getPlantDetails(commonName) {
	const prompt = `
    Based on the common name "${commonName}", generate detailed information following the specified format in the system prompt provided. 
    Ensure that the response strictly follows the format, including all necessary fields like "id", "common_name", "scientific_name", "description","default_image", "medicinal_uses", and "growing_requirements". Medicinal uses should include 5 titles and descriptions. the growing requirements should include two fields: "water" and "sunlight". 
    The response should be in JSON format with the correct word counts and structure as outlined in the system prompt.
  `;
	const result = await model.generateContent(prompt);
	return result.response.text();
}
