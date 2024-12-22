import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "./systemPrompt.js";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINIAI_API_KEY);
const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
	systemInstruction: systemPrompt,
});

export async function searchImage(imageBuffer, mimeType = "image/jpeg") {
	function bufferToGenerativePart(buffer, mimeType) {
		return {
			inlineData: {
				data: buffer,
				mimeType,
			},
		};
	}

	const prompt = `Analyze the provided image, which is sent in Base64 format and has the MIME type "${mimeType}". Identify the two most likely plants depicted in the image and return their common names, scientific names, and confidence levels.`;
	const imagePart = bufferToGenerativePart(imageBuffer, mimeType);
	try {
		const result = await model.generateContent([prompt, imagePart]);
		return result.response.text();
	} catch (error) {
		console.error("Error generating content:", error);
		throw error;
	}
}
