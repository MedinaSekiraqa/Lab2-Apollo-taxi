
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function RaportiDitor() {
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="outline">Create Driver&apos;s Report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Raporti Shoferit</DialogTitle>
          <DialogDescription>Fill out the form to create a new driver&apos;s report.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID</Label>
              <Input id="id" placeholder="Optional" type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pranoi">Pranoi</Label>
              <Input id="pranoi" required type="number" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dorzoi">Dorzoi</Label>
              <Input id="dorzoi" required type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paushall">Paushall</Label>
              <Input id="paushall" required type="number" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minus">Minus</Label>
              <Input id="minus" placeholder="Optional" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pershkrimi">Pershkrimi</Label>
              <Textarea id="pershkrimi" placeholder="Optional" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shpenzimetId">shpenzimetId</Label>
              <Input id="shpenzimetId" required type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="veturaId">veturaId</Label>
              <Input id="veturaId" required type="text" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userId">userId</Label>
              <Input id="userId" required type="text" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input id="startTime" required type="text" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input id="endTime" required type="text" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="data">Data</Label>
            <Input id="data" required type="date" />
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button variant="outline">Cancel</Button>
          </div>
          <Button type="submit">Create Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
