import { useState, useEffect } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function SearchResults() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("name");
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("q");
        if (query) {
            setSearchQuery(query);
        }
    }, [location.search]);

    useEffect(() => {
        fetchPlants();
        window.scrollTo(0, 0);
    }, [searchQuery]);

    const fetchPlants = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `https://perenual.com/api/species-list?key=${
                    import.meta.env.VITE_PERENUAL_API_TOKEN
                }&q=${searchQuery}`
            );
            setPlants(data?.data || []);
        } catch (error) {
            setError(
                error?.response?.data?.["X-Response"] ||
                    "Failed to fetch plants. Please try again later."
            );
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
                                    className="w-full border-green-700"
                                />
                            </div>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">Name</SelectItem>
                                    <SelectItem value="benefit">
                                        Benefit
                                    </SelectItem>
                                    <SelectItem value="popularity">
                                        Popularity
                                    </SelectItem>
                                </SelectContent>
                            </Select>
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
                                        className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
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

                        {/* {filteredPlants.length === 0 && !loading && !error && (
                            <p className="text-center text-green-700">
                                No plants found matching your criteria.
                            </p>
                        )} */}
                    </main>
                </div>
            </div>
        </div>
    );
}
