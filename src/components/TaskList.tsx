import { useState } from "react";
import { Search, Filter, Plus, CheckCircle2, Circle, Flag, Calendar, MoreVertical, GripVertical } from "lucide-react";
import TaskModal, { Task } from "./TaskModal";

const initialTasks: Task[] = [
  { id: 1, title: "Complete quarterly report", description: "Prepare Q4 financial analysis", category: "work", priority: "high", dueDate: "Dec 18", progress: 75, completed: false },
  { id: 2, title: "Morning workout routine", description: "30 min cardio + stretching", category: "health", priority: "medium", dueDate: "Daily", progress: 100, completed: true },
  { id: 3, title: "Team standup meeting", description: "Weekly sync with development team", category: "work", priority: "high", dueDate: "Dec 17", progress: 0, completed: false },
  { id: 4, title: "Buy groceries", description: "Weekly shopping list", category: "personal", priority: "low", dueDate: "Dec 19", progress: 50, completed: false },
  { id: 5, title: "Review pull requests", description: "Code review for feature branch", category: "work", priority: "high", dueDate: "Dec 17", progress: 30, completed: false },
  { id: 6, title: "Doctor appointment", description: "Annual checkup at clinic", category: "urgent", priority: "high", dueDate: "Dec 20", progress: 0, completed: false },
];

const categoryColors = {
  work: "bg-category-work",
  personal: "bg-category-personal",
  health: "bg-category-health",
  urgent: "bg-category-urgent",
};

const priorityColors = {
  high: "text-destructive",
  medium: "text-warning",
  low: "text-muted-foreground",
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const toggleTask = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed, progress: task.completed ? 0 : 100 } : task
    ));
  };

  const handleTaskClick = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, "id"> & { id?: number }) => {
    if (taskData.id) {
      setTasks(tasks.map(t => t.id === taskData.id ? { ...t, ...taskData } as Task : t));
    } else {
      const newTask: Task = {
        ...taskData,
        id: Math.max(...tasks.map(t => t.id)) + 1,
      } as Task;
      setTasks([...tasks, newTask]);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || task.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">{completedCount} of {tasks.length} tasks completed</p>
        </div>
        <button 
          onClick={handleAddTask}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg btn-primary font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring min-w-[140px]"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="health">Health</option>
            <option value="urgent">Urgent</option>
          </select>
          <button className="px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-smooth">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task, index) => (
          <div
            key={task.id}
            onClick={() => handleTaskClick(task)}
            className={`bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-smooth animate-slide-in cursor-pointer ${task.completed ? "opacity-60" : ""}`}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <div className="flex items-start gap-4">
              {/* Drag handle */}
              <div className="pt-1 cursor-grab text-muted-foreground/50 hover:text-muted-foreground transition-smooth">
                <GripVertical className="w-5 h-5" />
              </div>

              {/* Checkbox */}
              <button
                onClick={(e) => toggleTask(task.id, e)}
                className="pt-1 text-muted-foreground hover:text-primary transition-smooth"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`font-semibold text-foreground ${task.completed ? "line-through" : ""}`}>
                        {task.title}
                      </h3>
                      <span className={`w-2 h-2 rounded-full ${categoryColors[task.category]}`} />
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>

                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Meta info */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{task.dueDate}</span>
                  </div>
                  <div className={`flex items-center gap-1.5 text-sm ${priorityColors[task.priority]}`}>
                    <Flag className="w-4 h-4" />
                    <span className="capitalize">{task.priority}</span>
                  </div>
                </div>

                {/* Progress bar */}
                {!task.completed && task.progress > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tasks found matching your criteria.</p>
        </div>
      )}

      <TaskModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default TaskList;
