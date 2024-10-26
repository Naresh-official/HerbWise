import { useState } from "react";
import { Upload, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function IdentificationPage() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleImageUpload = () => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            setError("Please upload an image first.");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Simulating API call to Plant.id
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Simulated response
            const simulatedResponse = {
                plantName: "Echinacea purpurea",
                commonName: "Purple Coneflower",
                confidence: 0.95,
                briefInfo:
                    "Echinacea is a popular medicinal herb known for its immune-boosting properties.",
                id: 1, // This would be used to link to the Plant Details page
            };

            setResult(simulatedResponse);
        } catch (error) {
            setError("Failed to identify the plant. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
                    Plant Identification
                </h1>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-green-700">
                            Upload a Plant Photo
                        </CardTitle>
                        <CardDescription>
                            Take or upload a clear photo of the plant you want
                            to identify
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Label
                                    htmlFor="image-upload"
                                    className="block text-sm font-medium text-green-700 mb-2"
                                >
                                    Choose an image
                                </Label>
                                <div className="flex items-center space-x-4">
                                    <Input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            document
                                                .getElementById("image-upload")
                                                ?.click()
                                        }
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <Upload className="mr-2 h-4 w-4" />{" "}
                                        Upload
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            document
                                                .getElementById("image-upload")
                                                ?.click()
                                        }
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <Camera className="mr-2 h-4 w-4" /> Take
                                        Photo
                                    </Button>
                                </div>
                            </div>
                            {preview && (
                                <div className="mb-4">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="max-w-full h-auto rounded-lg"
                                    />
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                disabled={!image || loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Identifying...
                                    </>
                                ) : (
                                    "Identify Plant"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {error && (
                    <Card className="mb-8 border-red-300">
                        <CardContent className="pt-6">
                            <p className="text-red-600">{error}</p>
                        </CardContent>
                    </Card>
                )}

                {result && (
                    <Card className="mb-8 border-green-300">
                        <CardHeader>
                            <CardTitle className="text-green-700">
                                Identification Result
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-xl font-semibold text-green-800 mb-2">
                                {result.plantName}
                            </h2>
                            <p className="text-green-600 mb-2">
                                Common Name: {result.commonName}
                            </p>
                            <p className="text-green-700 mb-4">
                                {result.briefInfo}
                            </p>
                            <p className="text-sm text-green-600 mb-4">
                                Confidence:{" "}
                                {(result.confidence * 100).toFixed(2)}%
                            </p>
                            <Link to={`/plant-details/${result.id}`} passHref>
                                <Button className="bg-green-600 hover:bg-green-700 text-white">
                                    View Detailed Information
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
