"use client";

import { useState, useEffect } from "react";
import { Droplet, Sun, Sprout, Leaf, Beaker } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PlantDetails({ plantId }) {
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlantDetails(plantId);
    }, [plantId]);

    const fetchPlantDetails = async (id) => {
        setLoading(true);
        try {
            // Simulating API call with setTimeout
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const data = {
                id: 1,
                name: "Echinacea",
                scientificName: "Echinacea purpurea",
                image: "/placeholder.svg",
                description:
                    "Echinacea is a popular herb known for its immune-boosting properties. It's native to North America and has been used in traditional medicine for centuries.",
                medicinalUses: [
                    "Boosts immune system",
                    "Reduces cold and flu symptoms",
                    "May help with pain relief",
                    "Potential anti-inflammatory effects",
                ],
                growingRequirements: {
                    water: "Moderate",
                    sunlight: "Full sun to partial shade",
                    soil: "Well-draining, slightly acidic soil",
                },
                careInstructions: [
                    "Plant in spring or fall",
                    "Space plants 1-3 feet apart",
                    "Water deeply once a week",
                    "Deadhead flowers to promote blooming",
                    "Divide plants every 3-4 years",
                ],
                diyRemedies: [
                    {
                        name: "Echinacea Tea",
                        instructions:
                            "Steep 1-2 teaspoons of dried echinacea root or leaves in hot water for 10-15 minutes. Strain and drink up to 3 times daily.",
                    },
                    {
                        name: "Echinacea Tincture",
                        instructions:
                            "Mix 1-2 ml of echinacea tincture with water or juice. Take 3 times daily at the onset of cold or flu symptoms.",
                    },
                ],
            };
            setPlant(data);
        } catch (error) {
            setError("Failed to fetch plant details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center text-green-700 p-8">
                Loading plant details...
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600 p-8">{error}</div>;
    }

    if (!plant) {
        return (
            <div className="text-center text-green-700 p-8">
                No plant details found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-white border-green-300 mb-8">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle className="text-3xl font-bold text-green-800">
                                    {plant.name}
                                </CardTitle>
                                <CardDescription className="text-xl text-green-600 mt-2">
                                    {plant.scientificName}
                                </CardDescription>
                            </div>
                            <img
                                src={plant.image}
                                alt={plant.name}
                                className="w-full md:w-48 h-48 object-cover rounded-lg mt-4 md:mt-0"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-700 mb-4">
                            {plant.description}
                        </p>
                    </CardContent>
                </Card>

                <Tabs defaultValue="medicinal-uses" className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="medicinal-uses">
                            Medicinal Uses
                        </TabsTrigger>
                        <TabsTrigger value="growing">Growing</TabsTrigger>
                        <TabsTrigger value="care">Care</TabsTrigger>
                        <TabsTrigger value="diy-remedies">
                            DIY Remedies
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="medicinal-uses">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-green-800">
                                    Medicinal Uses
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 text-green-700">
                                    {plant.medicinalUses.map((use, index) => (
                                        <li key={index}>{use}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="growing">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-green-800">
                                    Growing Requirements
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-center">
                                        <Droplet className="h-6 w-6 text-blue-500 mr-2" />
                                        <span className="text-green-700">
                                            Water:{" "}
                                            {plant.growingRequirements.water}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Sun className="h-6 w-6 text-yellow-500 mr-2" />
                                        <span className="text-green-700">
                                            Sunlight:{" "}
                                            {plant.growingRequirements.sunlight}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Sprout className="h-6 w-6 text-green-500 mr-2" />
                                        <span className="text-green-700">
                                            Soil:{" "}
                                            {plant.growingRequirements.soil}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="care">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-green-800">
                                    Care Instructions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 text-green-700">
                                    {plant.careInstructions.map(
                                        (instruction, index) => (
                                            <li key={index}>{instruction}</li>
                                        )
                                    )}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="diy-remedies">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-green-800">
                                    DIY Remedies
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {plant.diyRemedies.map((remedy, index) => (
                                    <div key={index} className="mb-4 last:mb-0">
                                        <h4 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
                                            <Beaker className="h-5 w-5 mr-2" />
                                            {remedy.name}
                                        </h4>
                                        <p className="text-green-600 pl-7">
                                            {remedy.instructions}
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="text-center text-green-600 text-sm">
                    <p>
                        Always consult with a healthcare professional before
                        using any herbal remedies.
                    </p>
                </div>
            </div>
        </div>
    );
}
