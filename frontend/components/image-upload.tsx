'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, X } from "lucide-react"
import Image from 'next/image'

export default function ImageUpload() {
    const [frontImage, setFrontImage] = useState<File | null>(null)
    const [backImage, setBackImage] = useState<File | null>(null)
    const [response, setResponse] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const frontImageInputRef = useRef<HTMLInputElement>(null)
    const backImageInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
        const file = event.target.files?.[0]
        if (file) {
            if (side === 'front') {
                setFrontImage(file)
            } else {
                setBackImage(file)
            }
        }
    }

    const handleRemoveImage = (side: 'front' | 'back') => {
        if (side === 'front') {
            setFrontImage(null)
            if (frontImageInputRef.current) {
                frontImageInputRef.current.value = ''
            }
        } else {
            setBackImage(null)
            if (backImageInputRef.current) {
                backImageInputRef.current.value = ''
            }
        }
    }

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
            const response = await fetch('http://localhost:5000/api/v1/parse-aadhar', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to parse Aadhar card')
            }

            const data = await response.json()
            setResponse(JSON.stringify(data, null, 2))
        } catch (err) {
            setError('An error occurred while parsing the Aadhar card. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Aadhar Card Parser</CardTitle>
                <CardDescription>
                    Upload clear images of your Aadhar card to extract information. Ensure both sides are readable and not blurred.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="frontImage">Front Side Image</Label>
                        <div className="relative">
                            <Input
                                id="frontImage"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'front')}
                                disabled={isLoading}
                                className={frontImage ? 'file:hidden' : ''}
                                ref={frontImageInputRef}
                            />
                            {frontImage ? (
                                <div className="mt-2 relative aspect-video">
                                    <Image
                                        src={URL.createObjectURL(frontImage)}
                                        alt="Front of Aadhar card"
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                    <Button
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={() => handleRemoveImage('front')}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="mt-2 relative aspect-video blur-[1px]">
                                    <Image
                                        src="/aadhaar_front_example.png"
                                        alt="Default front side placeholder"
                                        fill
                                        className="object-contain rounded-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="backImage">Back Side Image</Label>
                        <div className="relative">
                            <Input
                                id="backImage"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'back')}
                                disabled={isLoading}
                                className={backImage ? 'file:hidden' : ''}
                                ref={backImageInputRef}
                            />
                            {backImage ? (
                                <div className="mt-2 relative aspect-video">
                                    <Image
                                        src={URL.createObjectURL(backImage)}
                                        alt="Back of Aadhar card"
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                    <Button
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={() => handleRemoveImage('back')}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="mt-2 relative aspect-video blur-[1px]">
                                    <Image
                                        src="/aadhaar_back_example.png"
                                        alt="Default back side placeholder"
                                        fill
                                        className="object-contain rounded-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handleParse}
                    disabled={isLoading || !frontImage || !backImage}
                    className="w-full"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Parsing...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" />
                            Parse Aadhar Card
                        </>
                    )}
                </Button>

                {error && (
                    <div className="p-4 text-sm text-red-800 bg-red-100 rounded-md" role="alert">
                        {error}
                    </div>
                )}

                {response && (
                    <div className="space-y-4">
                        <Label className="text-lg font-semibold">Parsed Result:</Label>
                        {Object.entries(JSON.parse(response).data).map(([key, value]) => (
                            <div key={key} className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    value={value || 'N/A'}
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
                )}
            </CardContent>
        </Card>
    )
}