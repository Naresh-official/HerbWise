export const parseResponse = (response) => {
	const plantData = [];
	const lines = response.split("\n");
	let currentPlant = {};

	lines.forEach((line) => {
		line = line.trim();

		if (line.match(/^\d+\./)) {
			if (Object.keys(currentPlant).length > 0) {
				plantData.push(currentPlant);
			}
			currentPlant = {};
			const parts = line.split("**Common Name**:");
			if (parts.length > 1) {
				currentPlant.index = parts[0].trim().replace(".", "");
				currentPlant.commonName = parts[1].trim();
			}
		} else if (line.startsWith("**Scientific Name**:")) {
			currentPlant.scientificName = line
				.replace("**Scientific Name**:", "")
				.trim()
				.replace(/\*/g, "");
		} else if (line.startsWith("**Confidence Level**:")) {
			currentPlant.confidenceLevel = line
				.replace("**Confidence Level**:", "")
				.trim()
				.replace("%", "");
		}
	});

	if (Object.keys(currentPlant).length > 0) {
		plantData.push(currentPlant);
	}
	return plantData;
};
