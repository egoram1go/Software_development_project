import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react";
import EventModal, { Event } from "./EventModal";

const categoryColors = {
  work: "bg-category-work",
  personal: "bg-category-personal",
  health: "bg-category-health",
  urgent: "bg-category-urgent",
};

const categoryBgColors = {
  work: "bg-category-work/10 border-category-work/30",
  personal: "bg-category-personal/10 border-category-personal/30",
  health: "bg-category-health/10 border-category-health/30",
  urgent: "bg-category-urgent/10 border-category-urgent/30",
};

const initialEvents: Event[] = [
  { id: 1, title: "Team standup", date: 17, time: "9:00 AM", location: "Room 3A", category: "work" },
  { id: 2, title: "Lunch with client", date: 17, time: "12:30 PM", location: "Downtown Cafe", category: "work" },
  { id: 3, title: "Gym session", date: 18, time: "6:00 PM", location: "FitZone", category: "health" },
  { id: 4, title: "Project deadline", date: 20, time: "5:00 PM", category: "urgent" },
  { id: 5, title: "Movie night", date: 21, time: "7:00 PM", category: "personal" },
  { id: 6, title: "Doctor appointment", date: 22, time: "10:00 AM", location: "City Clinic", category: "health" },
];

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 17));
  const [selectedDate, setSelectedDate] = useState(17);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const selectedEvents = events.filter(e => e.date === selectedDate);

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setModalOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<Event, "id"> & { id?: number }) => {
    if (eventData.id) {
      setEvents(events.map(e => e.id === eventData.id ? { ...e, ...eventData } as Event : e));
    } else {
      const newEvent: Event = {
        ...eventData,
        id: Math.max(...events.map(e => e.id), 0) + 1,
      } as Event;
      setEvents([...events, newEvent]);
    }
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const handleDayDoubleClick = (day: number) => {
    setSelectedDate(day);
    setEditingEvent(null);
    setModalOpen(true);
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar Grid */}
        <div className="flex-1 bg-card rounded-xl p-6 shadow-card">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigateMonth(-1)}
                className="p-2 rounded-lg hover:bg-accent transition-smooth"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button 
                onClick={() => navigateMonth(1)}
                className="p-2 rounded-lg hover:bg-accent transition-smooth"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="py-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before the first day of month */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square p-2" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const hasEvents = events.some(e => e.date === day);
              const isSelected = day === selectedDate;
              const isToday = day === 17 && currentDate.getMonth() === 11;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  onDoubleClick={() => handleDayDoubleClick(day)}
                  className={`aspect-square p-2 rounded-lg transition-smooth relative flex flex-col items-center justify-center gap-1
                    ${isSelected ? "bg-primary text-primary-foreground" : "hover:bg-accent"}
                    ${isToday && !isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : ""}
                  `}
                >
                  <span className={`text-sm font-medium ${isSelected ? "" : "text-foreground"}`}>{day}</span>
                  {hasEvents && !isSelected && (
                    <div className="flex gap-0.5">
                      {events.filter(e => e.date === day).slice(0, 3).map((event, idx) => (
                        <span key={idx} className={`w-1.5 h-1.5 rounded-full ${categoryColors[event.category]}`} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Double-click on a day to create a new event
          </p>
        </div>

        {/* Event Sidebar */}
        <div className="lg:w-80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              {monthNames[currentDate.getMonth()]} {selectedDate}
            </h3>
            <button 
              onClick={handleAddEvent}
              className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {selectedEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedEvents.map((event, index) => (
                <div
                  key={event.id}
                  onClick={() => handleEditEvent(event)}
                  className={`p-4 rounded-xl border ${categoryBgColors[event.category]} transition-smooth hover:shadow-card animate-scale-in cursor-pointer`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-1 h-full min-h-[40px] rounded-full ${categoryColors[event.category]}`} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{event.title}</h4>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-xl p-8 shadow-card text-center">
              <p className="text-muted-foreground">No events scheduled for this day.</p>
              <button 
                onClick={handleAddEvent}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg btn-primary text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            </div>
          )}

          {/* Legend */}
          <div className="bg-card rounded-xl p-4 shadow-card">
            <h4 className="text-sm font-medium text-foreground mb-3">Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(categoryColors).map(([category, color]) => (
                <div key={category} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-sm text-muted-foreground capitalize">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <EventModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        event={editingEvent}
        defaultDate={selectedDate}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default CalendarView;
