'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Camera, Upload, SwitchCamera, LucideCameraOff } from "lucide-react"
import Image from 'next/image'
import { Camera as WebCamera, CameraType } from 'react-camera-pro'
import { ImageUploadSectionProps } from '@/lib/types'


export function ImageUploadSection({ side, image, onImageUpload, isLoading }: ImageUploadSectionProps) {
    const [showCamera, setShowCamera] = useState(false)
    const [numberOfCameras, setNumberOfCameras] = useState(0);
    const imageInputRef = useRef<HTMLInputElement>(null)
    const cameraRef = useRef<CameraType>(null)

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            onImageUpload(file, side)
        }
    }

    const handleRemoveImage = () => {
        onImageUpload(null, side)
        if (imageInputRef.current) {
            imageInputRef.current.value = ''
        }
    }

    const handleCameraCapture = useCallback(() => {
        if (cameraRef.current) {
            const photoDataUrl = cameraRef.current.takePhoto()
            if (typeof photoDataUrl === 'string') {
                fetch(photoDataUrl)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], `${side}_image.jpg`, { type: 'image/jpeg' })
                        onImageUpload(file, side)
                        setShowCamera(false)
                    })
            }
        }
    }, [cameraRef, onImageUpload, side])

    return (
        <div className="space-y-2 text-center ">
            <Label className='font-bold text-xl underline' htmlFor={`${side}Image`}>Upload {side === 'front' ? 'Front' : 'Back'} Side Aadhar Image here</Label>
            <div className="relative">
                {!showCamera && !image && (
                    <>
                        <div className="flex flex-col items-center justify-center sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                            <Button
                                onClick={() => imageInputRef.current?.click()}
                                disabled={isLoading}
                                className="w-full sm:w-auto"
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload from device
                            </Button>
                            <Button
                                onClick={() => setShowCamera(true)}
                                disabled={isLoading}
                                className="w-full sm:w-auto"
                            >
                                <Camera className="mr-2 h-4 w-4" />
                                Capture from camera
                            </Button>
                        </div>
                        <Input
                            id={`${side}Image`}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isLoading}
                            className="hidden"
                            ref={imageInputRef}
                        />
                    </>
                )}

                {showCamera && (
                    <div className="relative aspect-video">
                        <WebCamera ref={cameraRef} numberOfCamerasCallback={setNumberOfCameras} errorMessages={{ noCameraAccessible: 'No camera device accessible', permissionDenied: 'Permission denied', switchCamera: 'It is not possible to switch camera to different one because there is only one video device accessible', canvas: 'Canvas is not supported' }} />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-around sm:space-x-2">
                            <Button onClick={handleCameraCapture} className="w-fit md:w-full">
                                <Camera className="md:mr-2 h-4 w-4" />
                                <span className='hidden md:flex'>Capture</span>
                            </Button>
                            <Button onClick={() => setShowCamera(false)} className="w-fit md:w-full">
                                <LucideCameraOff className="md:mr-2 h-4 w-4" />
                                <span className='hidden md:flex'>Cancel</span>
                            </Button>
                            <Button disabled={numberOfCameras <= 1} onClick={() => { cameraRef?.current?.switchCamera() }} className="w-fit md:w-full">
                                <SwitchCamera className="md:mr-2 h-4 w-4" />
                                <span className='hidden md:flex'>Switch Camera</span>
                            </Button>
                        </div>
                    </div>
                )}

                {image && !showCamera && (
                    <div className="mt-10 relative aspect-video">
                        <Image
                            src={URL.createObjectURL(image)}
                            alt={`${side} of Aadhar card`}
                            fill
                            className="object-cover rounded-md"
                        />
                        <Button
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={handleRemoveImage}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                {!image && !showCamera && (
                    <div className="mt-10 relative aspect-video blur-[1px]">
                        <Image
                            src={`/aadhaar_${side}_example.png`}
                            alt={`Default ${side} side placeholder`}
                            fill
                            className="object-contain rounded-md"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}