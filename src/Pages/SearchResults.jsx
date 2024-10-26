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
import { Checkbox } from "@/components/ui/checkbox";

export default function SearchResults() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        sunlight: [],
        waterNeeds: [],
        benefits: [],
        plantType: [],
    });
    const [sortBy, setSortBy] = useState("name");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchPlants();
    }, []);

    const fetchPlants = async () => {
        setLoading(true);
        try {
            // Simulating API call with setTimeout
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const data = [
                {
                    id: 1,
                    name: "Echinacea",
                    image: "/placeholder.svg",
                    description: "Immune-boosting properties",
                    sunlight: "full",
                    waterNeeds: "moderate",
                    benefits: ["immune"],
                    plantType: "herb",
                },
                {
                    id: 2,
                    name: "Lavender",
                    image: "/placeholder.svg",
                    description: "Calming effects",
                    sunlight: "full",
                    waterNeeds: "low",
                    benefits: ["relaxation"],
                    plantType: "shrub",
                },
                {
                    id: 3,
                    name: "Turmeric",
                    image: "/placeholder.svg",
                    description: "Anti-inflammatory properties",
                    sunlight: "partial",
                    waterNeeds: "moderate",
                    benefits: ["anti-inflammatory"],
                    plantType: "root",
                },
                {
                    id: 4,
                    name: "Chamomile",
                    image: "/placeholder.svg",
                    description: "Promotes relaxation",
                    sunlight: "full",
                    waterNeeds: "moderate",
                    benefits: ["relaxation"],
                    plantType: "herb",
                },
                {
                    id: 5,
                    name: "Aloe Vera",
                    image: "/placeholder.svg",
                    description: "Skin healing properties",
                    sunlight: "full",
                    waterNeeds: "low",
                    benefits: ["skin-health"],
                    plantType: "succulent",
                },
            ];
            setPlants(data);
        } catch (error) {
            setError("Failed to fetch plants. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (category, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [category]: prevFilters[category].includes(value)
                ? prevFilters[category].filter((item) => item !== value)
                : [...prevFilters[category], value],
        }));
    };

    const filteredPlants = plants
        .filter(
            (plant) =>
                (filters.sunlight.length === 0 ||
                    filters.sunlight.includes(plant.sunlight)) &&
                (filters.waterNeeds.length === 0 ||
                    filters.waterNeeds.includes(plant.waterNeeds)) &&
                (filters.benefits.length === 0 ||
                    plant.benefits.some((benefit) =>
                        filters.benefits.includes(benefit)
                    )) &&
                (filters.plantType.length === 0 ||
                    filters.plantType.includes(plant.plantType)) &&
                (searchTerm === "" ||
                    plant.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            // Add more sorting options here if needed
            return 0;
        });

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-neutral-950 mb-4">
                            Filters
                        </h2>
                        {Object.entries(filters).map(([category, values]) => (
                            <div key={category} className="mb-4">
                                <h3 className="text-lg font-medium text-neutral-900 mb-2 capitalize">
                                    {category.replace(/([A-Z])/g, " $1").trim()}
                                </h3>
                                {[
                                    "sunlight",
                                    "waterNeeds",
                                    "benefits",
                                    "plantType",
                                ].map((option) => (
                                    <div
                                        key={option}
                                        className="flex items-center mb-2"
                                    >
                                        <Checkbox
                                            id={`${category}-${option}`}
                                            checked={values.includes(option)}
                                            onCheckedChange={() =>
                                                handleFilterChange(
                                                    category,
                                                    option
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor={`${category}-${option}`}
                                            className="ml-2 text-sm text-neutral-800 capitalize"
                                        >
                                            {option
                                                .replace(/([A-Z])/g, " $1")
                                                .trim()}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Search and Sort Controls */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1">
                                <Input
                                    type="search"
                                    placeholder="Search plants..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
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
                                {filteredPlants.map((plant) => (
                                    <Card
                                        key={plant.id}
                                        className="bg-white border-neutral-200 shadow-md"
                                    >
                                        <CardHeader>
                                            <img
                                                src={plant.image}
                                                alt={plant.name}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />
                                            <CardTitle className="text-green-700">
                                                {plant.name}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-neutral-800">
                                                {plant.description}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {filteredPlants.length === 0 && !loading && !error && (
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
