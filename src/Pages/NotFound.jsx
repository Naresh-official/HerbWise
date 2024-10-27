import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <Leaf className="h-24 w-24 text-green-600 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-green-800 dark:text-green-500 mb-4">
                    404 - Page Not Found
                </h1>
                <p className="text-green-700 dark:text-green-200 mb-8">
                    Oops! It seems like the herb you're looking for isn't in our
                    garden. Let's get you back to familiar ground.
                </p>
                <Link to="/">
                    <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-white text-white">
                        Return to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
