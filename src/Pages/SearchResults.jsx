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
import axios from "axios";

export default function SearchResults() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("name");
    const [noTokensLeft, setNoTokensLeft] = useState(false);
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("q");
        if (query) {
            setSearchQuery(query);
        }
    }, [location.search]);

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
            window.scrollTo(0, 0);
        }
    }, [searchQuery]);

    const fetchPlants = async (currentTokenIndex = tokenIndex) => {
        if (searchQuery?.trim()?.length === 0) return;
        setLoading(true);
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/species-list?key=${
                    tokens[currentTokenIndex]
                }&q=${searchQuery}`
            );
            sessionStorage.setItem("tokenIndex", currentTokenIndex);
            setPlants(data?.data || []);
        } catch (error) {
            if (
                error?.response?.data?.["X-Response"] ===
                    "Surpassed API Rate Limit" &&
                currentTokenIndex < tokens.length - 1
            ) {
                const nextIndex = (currentTokenIndex + 1) % tokens.length;
                setTokenIndex(nextIndex);
                await fetchPlants(nextIndex);
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

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Search and Sort Controls */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1">
                                <Input
                                    type="search"
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
                        {loading ? (
                            <p className="text-center text-green-700">
                                Loading plants...
                            </p>
                        ) : error ? (
                            <p className="text-center text-red-600">{error}</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {plants.map((plant) => (
                                    <Card
                                        key={plant.id}
                                        onClick={() =>
                                            navigate(`/plant/${plant.id}`)
                                        }
                                        className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 shadow-md hover:shadow-xl dark:shadow-neutral-900 hover:scale-105 transition-all duration-300"
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
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
