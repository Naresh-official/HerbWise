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
import axios from "axios";

export default function PlantDetails() {
    const [plant, setPlant] = useState(null);
    const [careGuide, setCareGuide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noTokensLeft, setNoTokensLeft] = useState(false);
    const plantId = useParams().id;

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
            // Check if tokens are exhausted
            fetchPlantDetails(plantId);
            fetchCareGuide(plantId);
        }
    }, [plantId, noTokensLeft]);

    const fetchPlantDetails = async (id, currentTokenIndex = tokenIndex) => {
        if (noTokensLeft) return;
        setLoading(true);
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/species/details/${id}?key=${tokens[currentTokenIndex]}`
            );
            sessionStorage.setItem("tokenIndex", currentTokenIndex);
            setPlant(data || []);
        } catch (error) {
            if (
                error?.response?.data?.["X-Response"] ===
                    "Surpassed API Rate Limit" &&
                currentTokenIndex < tokens.length - 1
            ) {
                const nextIndex = currentTokenIndex + 1;
                setTokenIndex(nextIndex); // Update state with next token
                await fetchPlantDetails(id, nextIndex);
            } else if (currentTokenIndex >= tokens.length - 1) {
                setNoTokensLeft(true); // All tokens exhausted
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

    const fetchCareGuide = async (id, currentTokenIndex = tokenIndex) => {
        if (noTokensLeft) return;

        setLoading(true);
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/species-care-guide-list?species_id=${id}&key=${
                    tokens[currentTokenIndex]
                }`
            );
            sessionStorage.setItem("tokenIndex", currentTokenIndex);
            setCareGuide(data?.data?.[0]?.section || []);
        } catch (error) {
            if (
                error?.response?.data?.["X-Response"] ===
                    "Surpassed API Rate Limit" &&
                currentTokenIndex < tokens.length - 1
            ) {
                const nextIndex = currentTokenIndex + 1;
                setTokenIndex(nextIndex);
                await fetchCareGuide(id, nextIndex);
            } else if (currentTokenIndex >= tokens.length - 1) {
                setNoTokensLeft(true);
                setError(
                    "All tokens have been exhausted. Please try again later."
                );
            } else {
                setError(
                    error?.response?.data?.["X-Response"] ||
                        "Failed to fetch care guide. Please try again later."
                );
            }
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
        <div className="min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <Card className="border-neutral-300 dark:bg-neutral-900 mb-8">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <CardTitle className="text-3xl font-bold text-green-800 dark:text-green-600">
                                    {plant?.common_name}
                                </CardTitle>
                                <CardDescription className="text-xl text-green-700 mt-2">
                                    {plant?.scientific_name?.[0]}
                                </CardDescription>
                            </div>
                            <img
                                src={plant?.default_image?.original_url}
                                alt={plant?.common_name}
                                className="w-full md:w-48 h-56 object-cover rounded-lg mt-4 md:mt-0"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-neutral-800 dark:text-neutral-300 mb-4">
                            {plant.description}
                        </p>
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
                        <TabsTrigger
                            value="care"
                            className="data-[state=active]:dark:text-neutral-50 data-[state=active]:bg-green-600 data-[state=active]:text-neutral-50 data-[state=active]:dark:bg-green-600"
                        >
                            Care
                        </TabsTrigger>
                        <TabsTrigger
                            value="diy-remedies"
                            className="data-[state=active]:dark:text-neutral-50 data-[state=active]:bg-green-600 data-[state=active]:text-neutral-50 data-[state=active]:dark:bg-green-600"
                        >
                            DIY Remedies
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="medicinal-uses">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-neutral-800 dark:text-neutral-300">
                                    Medicinal Uses
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 text-neutral-700">
                                    {plant?.medicinalUses?.map((use, index) => (
                                        <li key={index}>{use}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="growing">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-neutral-800 dark:text-neutral-300">
                                    Growing Requirements
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col space-y-5">
                                        <div className="flex items-center">
                                            <Droplet className="h-6 w-6 text-blue-500 mr-2" />
                                            <span className="text-neutral-900 dark:text-neutral-300">
                                                Water: {plant?.watering}
                                            </span>
                                        </div>
                                        <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                            {
                                                careGuide?.filter(
                                                    (guide) =>
                                                        guide.type ===
                                                        "watering"
                                                )?.[0]?.description
                                            }
                                        </p>
                                    </div>
                                    <div className="flex flex-col space-y-5">
                                        <div className="flex items-center">
                                            <Sun className="h-6 w-6 text-yellow-500 mr-2" />
                                            <span className="text-neutral-900 dark:text-neutral-300">
                                                Sunlight: {plant?.sunlight?.[0]}
                                            </span>
                                        </div>
                                        <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                            {
                                                careGuide?.filter(
                                                    (guide) =>
                                                        guide.type ===
                                                        "sunlight"
                                                )?.[0]?.description
                                            }
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="care">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-neutral-800 dark:text-neutral-300">
                                    Care Instructions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <p>Type : {plant?.type}</p>
                                    <p>Cycle : {plant?.cycle}</p>
                                    <p>
                                        Maintenance :{" "}
                                        {plant?.maintenance === null
                                            ? "N/A"
                                            : plant?.maintenance}
                                    </p>
                                    <p>Care Level : {plant?.care_level}</p>
                                    <p>Growth Rate : {plant?.growth_rate}</p>
                                    <p>
                                        Indoor :{" "}
                                        {plant?.indoor === false ? "No" : "Yes"}
                                    </p>
                                    <p>
                                        Fruits :{" "}
                                        {plant?.fruits === false ? "No" : "Yes"}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="diy-remedies">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-neutral-800 dark:text-neutral-300">
                                    DIY Remedies
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <p>
                                        Pruning Month:{" "}
                                        {plant?.pruning_month?.map(
                                            (month, index) => (
                                                <span key={index}>
                                                    {month}
                                                    {", "}
                                                </span>
                                            )
                                        )}
                                    </p>
                                </div>
                                <div className="mt-4 text-neutral-700 dark:text-neutral-300 text-sm">
                                    <p>
                                        {
                                            careGuide?.filter(
                                                (guide) =>
                                                    guide.type === "pruning"
                                            )?.[0]?.description
                                        }
                                    </p>
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
