export const parseResponse = (response) => {
	const plantData = [];

	// Updated regex pattern to handle line breaks
	const plantRegex =
		/(\d+)\.\s*\*\*Common Name\*\*:\s*([\w\s]+)\s*\n\s*\*\*Scientific Name\*\*:\s*\*([\w\s\.\*]+)\*\s*\n\s*\*\*Confidence Level\*\*:\s*(\d+)%/g;

	let match;
	while ((match = plantRegex.exec(response)) !== null) {
		plantData.push({
			index: match[1],
			commonName: match[2].trim(),
			scientificName: match[3].trim().replace(/\*/g, ""), // Remove asterisks
			confidenceLevel: match[4],
		});
	}

	return plantData;
};
