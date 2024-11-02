'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ImageUploadSection } from './image-upload-section'
import { ParseButton } from './parse-button'
import { ResultsDisplay } from './result-display'
import { BASE_URL } from '@/lib/config'

export default function ImageUpload() {
    // State to store the front image file
    const [frontImage, setFrontImage] = useState<File | null>(null)
    // State to store the back image file
    const [backImage, setBackImage] = useState<File | null>(null)
    // State to store the response from the server
    const [response, setResponse] = useState<string | null>(null)
    // State to manage loading state
    const [isLoading, setIsLoading] = useState(false)
    // State to store any error messages
    const [error, setError] = useState<string | null>(null)
    // Ref to scroll to the results section
    const resultsRef = useRef<HTMLDivElement>(null)

    // Function to handle image upload
    const handleImageUpload = (file: File | null, side: 'front' | 'back') => {
        if (side === 'front') {
            setFrontImage(file)
        } else {
            setBackImage(file)
        }
        setResponse(null)
    }

    // Function to handle parsing of the Aadhar card
    const handleParse = async () => {
        if (!frontImage || !backImage) {
            setError('Please upload both front and back images of the Aadhar card.')
            return
        }

        setIsLoading(true)
        setError(null)
        setResponse(null)

        const formData = new FormData()
        formData.append('frontImage', frontImage)
        formData.append('backImage', backImage)

        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to parse Aadhar card')
            }

            const data = await response.json()
            setResponse(JSON.stringify(data, null, 2))
            resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
        } catch {
            setError('An error occurred while parsing the Aadhar card. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-5xl mx-auto">
            <CardHeader>
                <CardTitle className='text-3xl font-bold text-center'>Aadhar Card Parser</CardTitle>
                <CardDescription className="text-lg font-semibold text-center text-blue-600">
                    Upload clear images of your Aadhar card to extract information. Ensure both sides are readable and not blurred.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <ImageUploadSection
                        side="front"
                        image={frontImage}
                        onImageUpload={handleImageUpload}
                        isLoading={isLoading}
                    />
                    <ImageUploadSection
                        side="back"
                        image={backImage}
                        onImageUpload={handleImageUpload}
                        isLoading={isLoading}
                    />
                </div>

                <ParseButton
                    onClick={handleParse}
                    isLoading={isLoading}
                    disabled={isLoading || !frontImage || !backImage}
                />

                {error && (
                    <div className="p-4 text-sm text-red-800 bg-red-100 rounded-md" role="alert">
                        {error}
                    </div>
                )}

                <div ref={resultsRef}>
                    <ResultsDisplay isLoading={isLoading} response={response} />
                </div>
            </CardContent>
        </Card>
    )
}