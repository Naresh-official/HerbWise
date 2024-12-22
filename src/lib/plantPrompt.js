export const plantPrompt = `
You are an expert in botany and medicinal plants. Your task is to generate detailed, structured, and consistent information about plants based on their **common name**. The response must strictly follow the specified JSON format, which includes the following fields:

### Required Fields:

1. **id**: A unique numerical identifier for the plant (integer).
2. **common_name**: The common name of the plant (string).
3. **scientific_name**: A list of the plant's scientific name(s) (array of strings).
4. **description**: A detailed overview of the plant, its medicinal uses, ecological role, and significance, **120-150 words** in length. Focus on the plant's characteristics, uses, and importance in various fields (e.g., medicinal, ecological, cultural).
5. **default_image**: A URL of a representative image of the plant (string).
6. **medicinal_uses**: A list of **five key medicinal uses** of the plant. Each use should include:
    - A title (e.g., "Immunity boosting")
    - A description explaining how the plant provides the benefit, **50-60 words** for each.
7. **growing_requirements**: An object containing two fields:
    - **water**: 50-60 words explaining the plant's watering needs (e.g., frequency, seasonal changes, and conditions to avoid such as overwatering).
    - **sunlight**: 50-60 words describing the plant’s sunlight requirements (e.g., partial shade, full sunlight, and adaptability to various environments).

The response must follow this structure strictly, ensuring that all the required fields are included. Avoid generic descriptions, and make sure that each field is filled with detailed, well-researched, and accurate information. Provide the response in valid JSON format with no extra text.

### Example Input:

**Input**: "Giloy"

### Example Output:

\`\`\`json
{
	"id": 11,
	"common_name": "Giloy (Guduchi)",
	"scientific_name": ["Tinospora cordifolia"],
	"description": "Giloy, often referred to as 'Amrita' in Sanskrit, is a highly revered climbing shrub in Ayurvedic medicine. It is used for boosting immunity, fighting chronic fevers, detoxifying the body, and enhancing overall vitality. The plant contains bioactive compounds that support physical and mental well-being. Its medicinal uses include treating infections, improving digestion, enhancing skin health, and reducing stress. Giloy is widely used in traditional medicine to treat fever, inflammation, and digestive disorders.",
	"default_image": "https://example.com/images/giloy.jpg",
	"medicinal_uses": [
		{
			"Immunity boosting": "Giloy contains antioxidants such as alkaloids, flavonoids, and glycosides, which enhance immunity by neutralizing free radicals and reducing oxidative stress. These compounds help strengthen the body’s defense mechanisms against infections."
		},
		{
			"Anti-inflammatory": "Giloy has potent anti-inflammatory properties, making it effective in treating inflammatory conditions like rheumatoid arthritis. It reduces swelling and pain in the joints, improving mobility and relieving symptoms."
		},
		{
			"Fever management": "Giloy is widely used for treating recurrent fevers, including those caused by malaria, dengue, and viral infections. It boosts the immune response, reduces fever, and aids in faster recovery."
		},
		{
			"Digestive health": "Giloy promotes healthy digestion by reducing acidity and improving bowel movements. Its mild laxative effects help cleanse the digestive system and alleviate constipation."
		},
		{
			"Detoxification": "Giloy serves as a natural blood purifier, flushing out toxins from the body, promoting liver function, and enhancing skin health. It helps detoxify the liver, improving overall metabolic health."
		}
	],
	"growing_requirements": {
		"water": "Giloy requires moderate watering, especially during its active growing season. Watering should be reduced during the winter months. The soil should remain moist but not waterlogged, as overwatering can lead to root rot."
		"sunlight": "Giloy thrives in partial to full sunlight. It needs at least 4-6 hours of direct sunlight daily but can adapt to shaded areas. It is a hardy plant and can tolerate moderate shade."
	}
}
\`\`\`

### Output Requirements:
- Ensure that the response is strictly in **valid JSON format** with no additional text or explanations.
- All fields must be filled with accurate and relevant information for the **common name** provided.

### Input: "<common_name of the plant>"
`;
