import { Button } from "@/components/ui/button"
import { ParseButtonProps } from "@/lib/types"
import { Loader2, Upload } from "lucide-react"


// Create the ParseButton component
export function ParseButton({ onClick, isLoading, disabled }: ParseButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full"
    >
      {isLoading ? (
        <>
          {/* Show a loading spinner and text when isLoading is true */}
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Parsing...
        </>
      ) : (
        <>
          {/* Show an upload icon and text when isLoading is false */}
          <Upload className="mr-2 h-4 w-4" />
          Parse Aadhar Card
        </>
      )}
    </Button>
  )
}