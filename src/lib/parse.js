export const parseResponse = (response) => {
	const plantData = [];
	const completeEntryRegex =
		/(\d+)\.\s*\*\*Common Name\*\*:\s*([\w\s]+)\s*\n\s*\*\*Scientific Name\*\*:\s*([\w\s\.\-]+)\s*\n\s*\*\*Confidence Level\*\*:\s*(\d+)%/g;
	const incompleteEntryRegex =
		/(\d+)\.\s*\*\*Common Name\*\*:\s*([\w\s]+)\s*\n\s*\*\*Scientific Name\*\*:\s*Unable to determine a second likely match\./g;

	let match;
	while ((match = completeEntryRegex.exec(response)) !== null) {
		plantData.push({
			index: match[1],
			commonName: match[2].trim(),
			scientificName: match[3].trim(),
			confidenceLevel: match[4],
		});
	}

	while ((match = incompleteEntryRegex.exec(response)) !== null) {
		plantData.push({
			index: match[1],
			commonName: match[2].trim(),
			scientificName: "Unable to determine",
			confidenceLevel: null,
		});
	}

	return plantData;
};
