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

export default function AllPlants() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        fetchPlants();
    }, [pageNumber]);

    const fetchPlants = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `https://perenual.com/api/species-list?key=${
                    import.meta.env.VITE_PERENUAL_API_TOKEN
                }&page=${pageNumber}`
            );
            setPlants(data?.data || []);
        } catch (error) {
            setError("Failed to fetch plants. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen">
            <div className="p-6 mx-auto">
                <h1 className="text-3xl text-center font-bold text-neutral-950 mb-6">
                    All plants
                </h1>
                {loading ? (
                    <p className="text-center text-neutral-900">
                        Loading plants...
                    </p>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plants.map(
                            (plant) =>
                                plant.default_image && (
                                    <Card
                                        key={plant.id}
                                        className="bg-white border-neutral-300 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
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
                                            <CardTitle className="text-green-700 pt-5">
                                                {plant.common_name}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-neutral-900 font-medium">
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
                    <p className="text-center text-green-700">
                        No plants found matching your criteria.
                    </p>
                )}
                <div className="flex justify-center mt-6 gap-4">
                    <Button
                        className="w-24 bg-green-800"
                        disabled={pageNumber === 1}
                        onClick={() => setPageNumber((prev) => prev - 1)}
                    >
                        Previous
                    </Button>
                    {pageNumber > 2 && (
                        <Button
                            variant="outline"
                            className="w-10"
                            onClick={() => setPageNumber((prev) => prev - 2)}
                        >
                            {pageNumber - 2}
                        </Button>
                    )}
                    {pageNumber > 1 && (
                        <Button
                            variant="outline"
                            className="w-10"
                            onClick={() => setPageNumber((prev) => prev - 1)}
                        >
                            {pageNumber - 1}
                        </Button>
                    )}
                    <Button variant="outline" className="w-10 border-green-700">
                        {pageNumber}
                    </Button>
                    <Button
                        variant="outline"
                        className="w-10"
                        onClick={() => setPageNumber((prev) => prev + 1)}
                    >
                        {pageNumber + 1}
                    </Button>
                    <Button
                        variant="outline"
                        className="w-10"
                        onClick={() => setPageNumber((prev) => prev + 2)}
                    >
                        {pageNumber + 2}
                    </Button>
                    <Button
                        className="w-24 bg-green-800"
                        onClick={() => setPageNumber((prev) => prev + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
