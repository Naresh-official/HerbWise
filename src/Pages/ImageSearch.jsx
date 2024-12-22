import { useState } from "react";
import { Upload, Camera, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { fileTypeFromBuffer } from "file-type";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Buffer } from "buffer";
import { searchImage } from "@/lib/searchImage.js";
import { parseResponse } from "@/lib/parse.js";

export default function ImageSearchPage() {
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);

	const handleImageUpload = (e) => {
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
			const arrayBuffer = await image.arrayBuffer();
			const fileType = await fileTypeFromBuffer(
				new Uint8Array(arrayBuffer)
			);
			if (!fileType) {
				throw new Error(
					"Could not determine MIME type of the uploaded image."
				);
			}

			const mimeType = fileType.mime;
			const imageBuffer = Buffer.from(
				new Uint8Array(arrayBuffer)
			).toString("base64");
			const response = await searchImage(imageBuffer, mimeType);
			if (response.startsWith("Unable to")) {
				setError(response);
				return;
			}
			const parsedResponse = parseResponse(response);
			setResult(parsedResponse);
		} catch (error) {
			console.log(error);
			setError("Failed to identify the plant. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-[66vh]">
			<div className="max-w-2xl px-6 mx-auto">
				<h1 className="text-3xl font-bold text-green-800 dark:text-white mb-6 text-center">
					Plant Image Search
				</h1>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-green-700 dark:text-green-600">
							Upload a Plant Photo
						</CardTitle>
						<CardDescription className="text-neutral-900 dark:text-neutral-400">
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
										className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white dark:text-neutral-200"
									>
										<Upload className="mr-2 h-4 w-4" />{" "}
										Upload
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
								className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white dark:text-neutral-200"
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
					<Alert
						variant="destructive"
						className="mb-8 text-red-600 dark:text-red-500 border-red-600 dark:border-red-500"
					>
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				{result && (
					<Card className="mb-8 border-green-300">
						<CardHeader>
							<CardTitle className="text-green-700">
								Identification Result
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-neutral-900 dark:text-neutral-100 space-y-6">
								{result.map((r) => (
									<div key={r.index}>
										<p>
											<span className="font-semibold">
												Common Name:{" "}
											</span>
											{r.commonName}
										</p>
										<p>
											<span className="font-semibold">
												Scientific Name:{" "}
											</span>
											{r.scientificName}
										</p>
										<p>
											<span className="font-semibold">
												Confidence:{" "}
											</span>
											{r.confidenceLevel}
											{" %"}
										</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}

function Label({ htmlFor, children, className }) {
	return (
		<label htmlFor={htmlFor} className={className}>
			{children}
		</label>
	);
}
