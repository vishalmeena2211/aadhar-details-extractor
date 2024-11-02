import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { ResultsDisplayProps } from "@/lib/types"
import { CopyIcon } from "lucide-react";
import { useState } from "react"

// Define the ResultsDisplay component
export function ResultsDisplay({ response, isLoading }: ResultsDisplayProps) {
    const [copied, setCopied] = useState(false);

    // Function to handle copy to clipboard
    const handleCopy = () => {
        if (response) {
            const parsedData = JSON.parse(response).data;
            const formattedData = Object.entries(parsedData)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n");
            navigator.clipboard.writeText(formattedData).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
            });
        }
    };

    // If the data is still loading, display a loading skeleton
    if (isLoading) {
        return (
            <div className="space-y-4">
                <Label className="text-lg font-semibold">Loading...</Label>
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="relative z-0 w-full mb-5 group">
                        <Skeleton className="block py-2.5 px-0 w-full h-8 bg-gray-300 dark:bg-gray-600" />
                    </div>
                ))}
            </div>
        )
    }

    // If there is no response, return null (render nothing)
    if (!response) {
        return null
    }

    // Parse the response and display the parsed result
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Parsed Result:</Label>
                <button onClick={handleCopy} className="flex items-center space-x-2 text-blue-600">
                    <CopyIcon />
                    <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
            </div>
            {Object.entries(JSON.parse(response).data).map(([key, value]) => (
                <div key={key} className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        value={value as string || 'N/A'}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        readOnly
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                </div>
            ))}
        </div>
    )
}