import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function TextareaWithButton() {
  return (
    <div className="grid w-1/2 gap-2">
      <Textarea placeholder="Type your comment here." />
      <Button>Add Comment</Button>
    </div>
  )
}

export default TextareaWithButton