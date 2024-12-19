import { useState, useEffect } from "react";
import { Droplet, Sun } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { plantData } from "@/lib/data";

export default function PlantDetails() {
	const [plant, setPlant] = useState(null);
	const plantId = useParams().id;

	useEffect(() => {
		if (plantId) {
			const foundPlant = plantData.find(
				(p) => p.id === parseInt(plantId)
			);
			setPlant(foundPlant);
		}
	}, [plantId]);

	if (!plant) {
		return (
			<div className="text-center text-green-700 p-8">
				No plant details found.
			</div>
		);
	}

	return (
		<div className="min-h-screen p-6">
			<div className="max-w-4xl mx-auto">
				<Card className="border-neutral-300 border-2 dark:bg-neutral-900 mb-8">
					<CardHeader>
						<div className="flex flex-col md:flex-row md:items-center md:justify-between">
							<div>
								<CardTitle className="text-3xl font-bold text-green-800 dark:text-green-600 capitalize">
									{plant.common_name}
								</CardTitle>
								<CardDescription className="text-xl text-green-700 mt-2 capitalize">
									{plant.scientific_name[0]}
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col md:flex-row gap-8">
							<p className="text-neutral-800 dark:text-neutral-300 mb-4 md:w-1/2 w-full">
								{plant.description}
							</p>
							<img
								src={plant.default_image}
								alt={plant.common_name}
								className="w-full md:w-1/2 max-h-96 object-cover rounded-lg mt-4 md:mt-0"
							/>
						</div>
					</CardContent>
				</Card>

				<Tabs defaultValue="medicinal-uses" className="mb-8">
					<TabsList className="grid w-full md:grid-cols-4 grid-cols-2">
						<TabsTrigger
							value="medicinal-uses"
							className="data-[state=active]:dark:text-neutral-50 data-[state=active]:bg-green-600 data-[state=active]:text-neutral-50 data-[state=active]:dark:bg-green-600"
						>
							Medicinal Uses
						</TabsTrigger>
						<TabsTrigger
							value="growing"
							className="data-[state=active]:dark:text-neutral-50 data-[state=active]:bg-green-600 data-[state=active]:text-neutral-50 data-[state=active]:dark:bg-green-600"
						>
							Growing
						</TabsTrigger>
					</TabsList>
					<TabsContent value="medicinal-uses">
						<Card className="border-2">
							<CardHeader>
								<CardTitle className="text-neutral-800 dark:text-neutral-300">
									Medicinal Uses
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div>
									{plant.medicinal_uses.map((use, index) => (
										<div
											key={index}
											className="mb-4 bg-green-100 dark:bg-neutral-900 p-4 rounded-xl hover:shadow-lg shadow-green-200"
										>
											<h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-300">
												{Object.keys(use)}
											</h3>
											<p className="text-sm text-neutral-700 dark:text-neutral-300">
												{Object.values(use)}
											</p>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="growing">
						<Card className="border-2">
							<CardHeader>
								<CardTitle className="text-neutral-800 dark:text-neutral-300">
									Growing Requirements
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
									<div className="flex flex-col space-y-5 bg-green-100 dark:bg-neutral-900 p-4 rounded-xl">
										<div className="flex items-center">
											<Droplet className="h-6 w-6 text-blue-500 mr-2" />
											<span className="text-neutral-900 text-lg font-semibold dark:text-neutral-300">
												Water:{" "}
											</span>
										</div>
										<p className="text-sm text-neutral-700 dark:text-neutral-300">
											{plant.growing_requirements.water}
										</p>
									</div>
									<div className="flex flex-col space-y-5 bg-green-100 dark:bg-neutral-900 p-4 rounded-xl">
										<div className="flex items-center">
											<Sun className="h-6 w-6 text-yellow-500 mr-2" />
											<span className="text-neutral-900 text-lg font-semibold dark:text-neutral-300">
												Sunlight:{" "}
											</span>
										</div>
										<p className="text-sm text-neutral-700 dark:text-neutral-300">
											{
												plant.growing_requirements
													.sunlight
											}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				<div className="text-center text-neutral-800 dark:text-neutral-300 text-sm">
					<p>
						Always consult with a healthcare professional before
						using any herbal remedies.
					</p>
				</div>
			</div>
		</div>
	);
}
