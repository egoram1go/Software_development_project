import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Event {
  id: number;
  title: string;
  date: number;
  time: string;
  location?: string;
  category: "work" | "personal" | "health" | "urgent";
}

interface EventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: Event | null;
  defaultDate?: number;
  onSave: (event: Omit<Event, "id"> & { id?: number }) => void;
  onDelete?: (id: number) => void;
}

const EventModal = ({ open, onOpenChange, event, defaultDate, onSave, onDelete }: EventModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    date: defaultDate || 1,
    time: "",
    location: "",
    category: "work" as Event["category"],
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location || "",
        category: event.category,
      });
    } else {
      setFormData({
        title: "",
        date: defaultDate || 1,
        time: "",
        location: "",
        category: "work",
      });
    }
  }, [event, defaultDate, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(event ? { ...formData, id: event.id } : formData);
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {event ? "Edit Event" : "Create New Event"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter event title"
              className="bg-background border-input"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground">Date (Day)</Label>
              <Input
                id="date"
                type="number"
                min="1"
                max="31"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: parseInt(e.target.value) || 1 })}
                className="bg-background border-input"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-foreground">Time</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g., 9:00 AM"
                className="bg-background border-input"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-foreground">Location (Optional)</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter location"
              className="bg-background border-input"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value: Event["category"]) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="bg-background border-input">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            {event && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="flex-1"
              >
                Delete
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className={event ? "" : "flex-1"}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 btn-primary">
              {event ? "Save Changes" : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
