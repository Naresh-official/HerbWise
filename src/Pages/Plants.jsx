import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { plantData } from "@/lib/data";

export default function AllPlants() {
	const [plants, setPlants] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const itemsPerPage = 12;
	const totalPages = Math.ceil(plantData.length / itemsPerPage);
	const navigate = useNavigate();

	// Update plants based on the current page number
	useEffect(() => {
		const startIndex = (pageNumber - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setPlants(plantData.slice(startIndex, endIndex));
	}, [pageNumber]);

	return (
		<div className="min-h-screen">
			<div className="p-6 mx-auto">
				<h1 className="text-3xl text-center font-bold text-neutral-950 dark:text-white mb-6">
					All Plants
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{plants.map(
						(plant) =>
							plant.default_image && (
								<Card
									key={plant.id}
									onClick={() =>
										navigate(`/plant/${plant.id}`)
									}
									className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
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
							)
					)}
				</div>

				{plants.length === 0 && (
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
					{pageNumber < totalPages && (
						<Button
							variant="outline"
							className="w-10 dark:text-white"
							onClick={() => setPageNumber((prev) => prev + 1)}
						>
							{pageNumber + 1}
						</Button>
					)}
					{pageNumber < totalPages - 1 && (
						<Button
							variant="outline"
							className="w-10 dark:text-white"
							onClick={() => setPageNumber((prev) => prev + 2)}
						>
							{pageNumber + 2}
						</Button>
					)}
					<Button
						className="w-24 bg-green-800 dark:hover:bg-green-700 dark:bg-green-600 dark:text-white"
						disabled={pageNumber === totalPages}
						onClick={() => setPageNumber((prev) => prev + 1)}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
