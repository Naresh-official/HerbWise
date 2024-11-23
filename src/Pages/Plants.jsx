import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

export default function AllPlants() {
	const [plants, setPlants] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [noTokensLeft, setNoTokensLeft] = useState(false);
	const navigate = useNavigate();

	const tokens = [
		import.meta.env.VITE_PERENUAL_API_TOKEN_1,
		import.meta.env.VITE_PERENUAL_API_TOKEN_2,
		import.meta.env.VITE_PERENUAL_API_TOKEN_3,
		import.meta.env.VITE_PERENUAL_API_TOKEN_4,
		import.meta.env.VITE_PERENUAL_API_TOKEN_5,
		import.meta.env.VITE_PERENUAL_API_TOKEN_6,
		import.meta.env.VITE_PERENUAL_API_TOKEN_7,
		import.meta.env.VITE_PERENUAL_API_TOKEN_8,
		import.meta.env.VITE_PERENUAL_API_TOKEN_9,
		import.meta.env.VITE_PERENUAL_API_TOKEN_10,
	];
	const [tokenIndex, setTokenIndex] = useState(
		sessionStorage.getItem("tokenIndex") || 0
	);

	useEffect(() => {
		if (!noTokensLeft) {
			fetchPlants();
		}
	}, [pageNumber]);
	const fetchPlants = async (currentTokenIndex = tokenIndex) => {
		setLoading(true);
		try {
			const { data } = await axios.get(
				`${import.meta.env.VITE_API_BASE_URL}/api/species-list?key=${
					tokens[parseInt(currentTokenIndex)]
				}&page=${pageNumber}`
			);
			sessionStorage.setItem("tokenIndex", currentTokenIndex);
			setPlants(data?.data || []);
		} catch (error) {
			if (
				error?.response?.data?.["X-Response"] ===
					"Surpassed API Rate Limit" &&
				currentTokenIndex < tokens.length - 1
			) {
				const nextIndex = (parseInt(currentTokenIndex) + 1) % tokens.length;
				setTokenIndex(nextIndex);
				await fetchPlants(nextIndex);
			} else if (currentTokenIndex >= tokens.length - 1) {
				setNoTokensLeft(true);
				setError(
					"All tokens have been exhausted. Please try again later."
				);
			} else {
				setError(
					error?.response?.data?.["X-Response"] ||
						"Failed to fetch plant details. Please try again later."
				);
			}
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="min-h-screen">
			<div className="p-6 mx-auto">
				<h1 className="text-3xl text-center font-bold text-neutral-950 dark:text-white mb-6">
					All plants
				</h1>
				{loading ? (
					<p className="text-center text-neutral-900 dark:text-neutral-50">
						Loading plants...
					</p>
				) : error ? (
					<p className="text-center text-red-600 dark:text-red-500">
						{error}
					</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{plants.map(
							(plant) =>
								plant.default_image && (
									<Card
										key={plant.id}
										onClick={() => {
											navigate(`/plant/${plant.id}`);
										}}
										className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
									>
										<CardHeader>
											<img
												src={
													plant.default_image
														?.medium_url ||
													plant.default_image
														?.original_url
												}
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
												<br />
												{plant.other_name[0] && (
													<span>
														Other Name:
														{plant.other_name[0]}
													</span>
												)}
												<br />
											</CardDescription>
										</CardContent>
									</Card>
								)
						)}
					</div>
				)}

				{plants.length === 0 && !loading && !error && (
					<p className="text-center text-green-700 dark:text-white">
						No plants found matching your criteria.
					</p>
				)}

				{/* Pagination */}
				<div className="flex justify-center mt-6 gap-4">
					<Button
						className="w-24 bg-green-800 dark:hover:bg-green-700 dark:bg-green-600 dark:text-white"
						disabled={pageNumber === 1}
						onClick={() => setPageNumber((prev) => prev - 1)}
					>
						Previous
					</Button>
					{pageNumber > 2 && (
						<Button
							variant="outline"
							className="w-10 dark:text-white"
							onClick={() => setPageNumber((prev) => prev - 2)}
						>
							{pageNumber - 2}
						</Button>
					)}
					{pageNumber > 1 && (
						<Button
							variant="outline"
							className="w-10 dark:text-white"
							onClick={() => setPageNumber((prev) => prev - 1)}
						>
							{pageNumber - 1}
						</Button>
					)}
					<Button
						variant="outline"
						className="w-10 dark:text-white border-green-700 dark:border-green-600"
					>
						{pageNumber}
					</Button>
					<Button
						variant="outline"
						className="w-10 dark:text-white"
						onClick={() => setPageNumber((prev) => prev + 1)}
					>
						{pageNumber + 1}
					</Button>
					<Button
						variant="outline"
						className="w-10 dark:text-white"
						onClick={() => setPageNumber((prev) => prev + 2)}
					>
						{pageNumber + 2}
					</Button>
					<Button
						className="w-24 bg-green-800 dark:hover:bg-green-700 dark:bg-green-600 dark:text-white"
						onClick={() => setPageNumber((prev) => prev + 1)}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
