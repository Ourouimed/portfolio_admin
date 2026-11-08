import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Tag, 
  FolderKanban,
  ArrowUpRight,
  CheckSquare,
  Square,
  Receipt,
  Plus,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// Enhanced Mock Data incorporating Tasks & Invoices
const mockProjectData = {
  _id: "proj_987654321",
  client: {
    name: "Sarah Jenkins",
    company: "Acme Corporation",
    email: "sarah.j@acme.com",
    phone: "+1 (555) 234-5678"
  },
  project_name: "E-Commerce Mobile App Redesign",
  description: "Complete UI/UX overhaul of the primary iOS and Android shopping apps, focusing on streamlining checkout, integrating Apple Pay/Google Pay, and implementing a new personalized recommendation feed.",
  status: "In progress",
  priority: "High",
  budget: {
    amount: 45000,
    currency: "USD"
  },
  tags: ["UI/UX", "Mobile App", "React Native", "E-Commerce"],
  team: [
    { name: "Alex Rivera", role: "Lead Frontend", email: "alex@agency.com" },
    { name: "Elena Rostova", role: "UI/UX Designer", email: "elena@agency.com" },
    { name: "Marcus Chen", role: "Backend Architect", email: "marcus@agency.com" }
  ],
  tasks: [
    { _id: "t1", title: "Complete high-fidelity Figma mockups", assigned_to: "Elena Rostova", completed: true, due_date: "2024-02-15T00:00:00.000Z" },
    { _id: "t2", title: "Set up Payment Gateway APIs", assigned_to: "Marcus Chen", completed: true, due_date: "2024-03-01T00:00:00.000Z" },
    { _id: "t3", title: "Develop React Native Checkout Screen", assigned_to: "Alex Rivera", completed: false, due_date: "2024-03-20T00:00:00.000Z" },
    { _id: "t4", title: "User Acceptance Testing (UAT)", assigned_to: "Elena Rostova", completed: false, due_date: "2024-04-10T00:00:00.000Z" }
  ],
  invoices: [
    { _id: "i1", invoice_number: "INV-2024-001", amount: 15000, status: "Paid", due_date: "2024-02-05T00:00:00.000Z", paid_at: "2024-02-04T00:00:00.000Z" },
    { _id: "i2", invoice_number: "INV-2024-002", amount: 15000, status: "Pending", due_date: "2024-03-30T00:00:00.000Z" },
    { _id: "i3", invoice_number: "INV-2024-003", amount: 15000, status: "Draft", due_date: "2024-05-15T00:00:00.000Z" }
  ],
  start_date: "2024-02-01T00:00:00.000Z",
  deadline: "2024-05-15T00:00:00.000Z",
  docs: [
    { url: "https://figma.com/file/sample-specs", title: "Figma UI/UX Design System" },
    { url: "https://docs.google.com/document/sample-prd", title: "Project Requirement Document (PRD)" }
  ],
  createdAt: "2024-01-25T10:30:00.000Z",
  updatedAt: "2024-02-10T14:15:00.000Z"
};

const statusStyles = {
  Planning: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  'In progress': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  Review: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  Done: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  Delivered: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' }
};

const invoiceStatusStyles = {
  Paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Overdue: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Draft: 'bg-slate-800 text-slate-400 border-slate-700'
};

export default function ProjectDetailsPage() {
  const [project, setProject] = useState(mockProjectData);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  };

  // Task Completion Toggle Handler
  const toggleTask = (taskId) => {
    setProject(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t._id === taskId ? { ...t, completed: !t.completed } : t)
    }));
  };

  // Calculated Statistics
  const completedTasksCount = project.tasks.filter(t => t.completed).length;
  const taskProgress = project.tasks.length > 0 ? Math.round((completedTasksCount / project.tasks.length) * 100) : 0;
  
  const totalBilled = project.invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = project.invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600/10 text-blue-400 rounded-xl border border-blue-500/20">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{project.client.company}</span>
              <h1 className="text-2xl font-bold text-white tracking-tight">{project.project_name}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border bg-slate-800 text-slate-300 border-slate-700`}>
              ⚡ {project.priority} Priority
            </span>
            <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border ${statusStyles[project.status]?.bg} ${statusStyles[project.status]?.text} ${statusStyles[project.status]?.border}`}>
              • {project.status}
            </span>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Description, Tasks, Docs) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Description & Tags */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Description</h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {project.description || "No project description provided."}
              </p>
              
              {project.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/70 border border-slate-700/60 rounded-lg text-xs font-medium text-slate-300">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Tasks Section */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-blue-400" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Tasks</h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">{completedTasksCount}/{project.tasks.length} Completed ({taskProgress}%)</span>
              </div>

              {/* Task Progress Bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${taskProgress}%` }} />
              </div>

              {/* Task List */}
              <div className="space-y-2 pt-2">
                {project.tasks.map((task) => (
                  <div 
                    key={task._id} 
                    onClick={() => toggleTask(task._id)}
                    className="flex items-center justify-between p-3.5 bg-slate-800/30 hover:bg-slate-800/60 border border-slate-800 rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {task.completed ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-500 group-hover:text-slate-400 shrink-0" />
                      )}
                      <span className={`text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
                      {task.assigned_to && (
                        <span className="hidden sm:inline-block bg-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                          {task.assigned_to}
                        </span>
                      )}
                      {task.due_date && (
                        <span className="font-mono">{formatDate(task.due_date)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoices Section */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Invoices & Financials</h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">Paid: {formatCurrency(totalPaid)} / {formatCurrency(totalBilled)}</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {project.invoices.map((inv) => (
                  <div key={inv._id} className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-800 rounded-xl">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-sm font-semibold text-white">{inv.invoice_number}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${invoiceStatusStyles[inv.status]}`}>
                          {inv.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {inv.status === 'Paid' ? `Paid on ${formatDate(inv.paid_at)}` : `Due: ${formatDate(inv.due_date)}`}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold font-mono text-slate-200">
                        {formatCurrency(inv.amount, project.budget.currency)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Client, Team, Timeline, Meta) */}
          <div className="space-y-6">
            
            {/* Financial Overview Card */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Budget Overview</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Total Budget</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">{formatCurrency(project.budget.amount, project.budget.currency)}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Total Invoiced</span>
                  <span className="text-sm font-mono text-slate-200">{formatCurrency(totalBilled, project.budget.currency)}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Collected Revenue</span>
                  <span className="text-sm font-mono text-slate-200">{formatCurrency(totalPaid, project.budget.currency)}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Timeline</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Start: <strong className="text-slate-200">{formatDate(project.start_date)}</strong></span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Deadline: <strong className="text-slate-200">{formatDate(project.deadline)}</strong></span>
                </div>
              </div>
            </div>

            {/* Client Info Card */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Client Details</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-200 font-medium">{project.client.company}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{project.client.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${project.client.email}`} className="text-blue-400 hover:underline truncate">
                    {project.client.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{project.client.phone}</span>
                </div>
              </div>
            </div>

            {/* Assigned Team */}
            {project.team?.length > 0 && (
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Team ({project.team.length})</h2>
                <div className="space-y-2">
                  {project.team.map((member, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-800/30">
                      <span className="font-medium text-slate-200">{member.name}</span>
                      <span className="text-slate-400">{member.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {project.docs?.length > 0 && (
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Documents ({project.docs.length})</h2>
                <div className="space-y-2">
                  {project.docs.map((doc, idx) => (
                    <a key={idx} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-xs p-2 bg-slate-800/30 hover:bg-slate-800/60 rounded-lg text-blue-400 hover:underline">
                      <span className="truncate">{doc.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}