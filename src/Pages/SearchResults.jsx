import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { plantData } from "@/lib/data";

export default function SearchResults() {
	const [plants, setPlants] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredPlants, setFilteredPlants] = useState([]);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const query = params.get("q");
		if (query) {
			setSearchQuery(query);
		}
	}, [location.search]);

	useEffect(() => {
		setPlants(plantData);
	}, []);

	useEffect(() => {
		if (searchQuery.trim()) {
			const filtered = plantData.filter(
				(plant) =>
					plant.common_name
						?.toLowerCase()
						.includes(searchQuery.trim().toLowerCase()) ||
					plant.scientific_name?.some((name) =>
						name
							.toLowerCase()
							.includes(searchQuery.trim().toLowerCase())
					)
			);

			setFilteredPlants(filtered);
		} else {
			setFilteredPlants(plants);
		}
	}, [searchQuery, plants]);

	if (searchQuery.length < 3) {
		return (
			<div className="min-h-screen p-6">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col md:flex-row gap-6">
						{/* Main Content */}
						<main className="flex-1">
							{/* Search Input */}
							<div className="flex flex-col sm:flex-row gap-4 mb-6">
								<div className="flex-1">
									<Input
										type="search"
										autoFocus
										placeholder="Search plants..."
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										className="w-full border-green-700 dark:border-green-800 dark:bg-neutral-950 text-black dark:text-white"
									/>
								</div>
							</div>

							<div className="text-center text-green-700 p-8">
								Please enter at least 3 characters.
							</div>
						</main>
					</div>
				</div>
			</div>
		);
	}

	if (filteredPlants.length === 0) {
		return (
			<div className="min-h-screen p-6">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col md:flex-row gap-6">
						{/* Main Content */}
						<main className="flex-1">
							{/* Search Input */}
							<div className="flex flex-col sm:flex-row gap-4 mb-6">
								<div className="flex-1">
									<Input
										type="search"
										autoFocus
										placeholder="Search plants..."
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
										className="w-full border-green-700 dark:border-green-800 dark:bg-neutral-950 text-black dark:text-white"
									/>
								</div>
							</div>

							<div className="text-center text-green-700 p-8">
								No results found.
							</div>
						</main>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-6">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col md:flex-row gap-6">
					{/* Main Content */}
					<main className="flex-1">
						{/* Search Input */}
						<div className="flex flex-col sm:flex-row gap-4 mb-6">
							<div className="flex-1">
								<Input
									type="search"
									autoFocus
									placeholder="Search plants..."
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									className="w-full border-green-700 dark:border-green-800 dark:bg-neutral-950 text-black dark:text-white"
								/>
							</div>
						</div>

						{/* Plant Cards */}
						{filteredPlants.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredPlants.map((plant) => (
									<Card
										key={plant.id}
										onClick={() =>
											navigate(`/plant/${plant.id}`)
										}
										className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 shadow-md hover:shadow-xl dark:shadow-neutral-900 hover:scale-[1.02] transition-all duration-300"
									>
										<CardHeader>
											<img
												src={plant.default_image}
												alt={
													plant.common_name ||
													plant.scientific_name[0]
												}
												className="w-full h-60 object-cover rounded-t-lg"
											/>
											<CardTitle className="text-green-700 dark:text-green-500 pt-5">
												{plant.common_name}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-neutral-900 dark:text-white font-medium">
												<span>
													Scientific Name:{" "}
													{plant.scientific_name[0]}
												</span>
											</CardDescription>
										</CardContent>
									</Card>
								))}
							</div>
						) : (
							<p className="text-center text-green-700">
								No plants found matching your criteria.
							</p>
						)}
					</main>
				</div>
			</div>
		</div>
	);
}
