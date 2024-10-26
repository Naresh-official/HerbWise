import { Search, Leaf, BookOpen, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    return (
        <main className="mx-auto px-4 py-8">
            <section className="text-center mb-12 w-full mx-auto bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-4xl font-bold text-green-800 mb-4">
                    Discover the Power of Medicinal Plants
                </h2>
                <p className="text-lg text-green-700 max-w-xl mx-auto mb-8">
                    Welcome to HerbWise, your comprehensive guide to the world
                    of medicinal plants. We're dedicated to educating and
                    empowering you with knowledge about nature's remedies and
                    their impact on personal health and environmental
                    sustainability.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <Card className="bg-green-100 border-green-300">
                        <CardHeader>
                            <Leaf className="h-8 w-8 text-green-600 mb-2" />
                            <CardTitle className="text-green-700">
                                Natural Remedies
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-green-700">
                                Explore a vast array of plants with medicinal
                                properties and learn how they can support your
                                health naturally.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-100 border-green-300">
                        <CardHeader>
                            <BookOpen className="h-8 w-8 text-green-600 mb-2" />
                            <CardTitle className="text-green-700">
                                Educational Resources
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-green-700">
                                Access comprehensive guides on plant
                                identification, cultivation, and traditional
                                uses in herbal medicine.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-100 border-green-300">
                        <CardHeader>
                            <Sprout className="h-8 w-8 text-green-600 mb-2" />
                            <CardTitle className="text-green-700">
                                Sustainable Practices
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-green-700">
                                Learn about sustainable harvesting and
                                cultivation methods to protect these valuable
                                natural resources.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="mb-12">
                <div className="max-w-md mx-auto flex">
                    <form
                        onSubmit={handleSearch}
                        className="max-w-md mx-auto flex"
                    >
                        <Input
                            type="search"
                            id="search"
                            placeholder="Search plants by name or scientific name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow bg-white border-2 border-green-700/50"
                        />
                        <Button
                            type="submit"
                            disabled={!searchQuery.trim()}
                            className="ml-2 text-lg bg-green-600 hover:bg-green-700 text-white flex items-center gap-3"
                        >
                            <Search className="h-6 w-6" />
                            Search
                        </Button>
                    </form>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-semibold text-green-800 mb-6">
                    Featured Medicinal Plants
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredPlants.map((plant, index) => (
                        <Card key={index} className="bg-white border-green-300">
                            <CardHeader>
                                <CardTitle className="text-green-700">
                                    {plant.name}
                                </CardTitle>
                                <CardDescription className="text-green-600">
                                    {plant.scientificName}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-green-700">
                                    {plant.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </main>
    );
}

const featuredPlants = [
    {
        name: "Echinacea",
        scientificName: "Echinacea purpurea",
        description:
            "Known for its immune-boosting properties, Echinacea is commonly used to prevent and treat the common cold and flu.",
    },
    {
        name: "Lavender",
        scientificName: "Lavandula angustifolia",
        description:
            "Lavender is prized for its calming effects and is often used to reduce stress, anxiety, and improve sleep quality.",
    },
    {
        name: "Turmeric",
        scientificName: "Curcuma longa",
        description:
            "A powerful anti-inflammatory and antioxidant, turmeric is used to support joint health and boost overall well-being.",
    },
];
