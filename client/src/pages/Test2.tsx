import React, { useState, useMemo } from 'react';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  Clock, 
  CheckSquare, 
  Receipt, 
  User, 
  Building2, 
  ArrowUpRight, 
  TrendingUp, 
  Layers, 
  Tag 
} from 'lucide-react';

// Mock list of projects using the expanded schema structure
const mockProjectsList = [
  {
    _id: "proj_101",
    client: { name: "Sarah Jenkins", company: "Acme Corporation", email: "sarah@acme.com", phone: "+1 555-0101" },
    project_name: "E-Commerce Mobile App Redesign",
    description: "Complete UI/UX overhaul of iOS and Android shopping apps with Apple Pay integration.",
    status: "In progress",
    priority: "High",
    budget: { amount: 45000, currency: "USD" },
    tags: ["Mobile App", "UI/UX", "E-Commerce"],
    start_date: "2024-02-01T00:00:00.000Z",
    deadline: "2024-05-15T00:00:00.000Z",
    tasks: [{ completed: true }, { completed: true }, { completed: false }, { completed: false }],
    invoices: [{ amount: 15000, status: "Paid" }, { amount: 15000, status: "Pending" }]
  },
  {
    _id: "proj_102",
    client: { name: "David Miller", company: "Nexus Health", email: "david@nexushealth.io", phone: "+1 555-0102" },
    project_name: "Telehealth Patient Portal",
    description: "HIPAA-compliant Web dashboard for patient records, scheduling, and video consultations.",
    status: "Planning",
    priority: "Urgent",
    budget: { amount: 62000, currency: "USD" },
    tags: ["Healthcare", "React", "HIPAA"],
    start_date: "2024-03-01T00:00:00.000Z",
    deadline: "2024-07-30T00:00:00.000Z",
    tasks: [{ completed: false }, { completed: false }],
    invoices: [{ amount: 20000, status: "Paid" }]
  },
  {
    _id: "proj_103",
    client: { name: "Elena Rostova", company: "FinTech Global", email: "elena@fintech.com", phone: "+1 555-0103" },
    project_name: "Crypto Trading Analytics Engine",
    description: "Real-time websocket pipeline and data visualization dashboard for crypto market insights.",
    status: "Review",
    priority: "Medium",
    budget: { amount: 38000, currency: "USD" },
    tags: ["FinTech", "Websockets", "Dashboard"],
    start_date: "2024-01-10T00:00:00.000Z",
    deadline: "2024-03-25T00:00:00.000Z",
    tasks: [{ completed: true }, { completed: true }, { completed: true }, { completed: false }],
    invoices: [{ amount: 19000, status: "Paid" }, { amount: 19000, status: "Paid" }]
  },
  {
    _id: "proj_104",
    client: { name: "Marcus Vance", company: "Urban Living", email: "marcus@urbanliving.com", phone: "+1 555-0104" },
    project_name: "Real Estate Listing Platform",
    description: "Property discovery web app with interactive map integration and agent messaging.",
    status: "Done",
    priority: "Low",
    budget: { amount: 25000, currency: "USD" },
    tags: ["Real Estate", "Next.js", "Maps"],
    start_date: "2023-11-01T00:00:00.000Z",
    deadline: "2024-01-30T00:00:00.000Z",
    tasks: [{ completed: true }, { completed: true }, { completed: true }],
    invoices: [{ amount: 25000, status: "Paid" }]
  },
  {
    _id: "proj_105",
    client: { name: "Chloe Bennett", company: "SaaSify", email: "chloe@saasify.co", phone: "+1 555-0105" },
    project_name: "AI Copywriting Suite Integration",
    description: "Adding generative AI features and subscription billing to an existing SaaS editor.",
    status: "Delivered",
    priority: "Medium",
    budget: { amount: 30000, currency: "USD" },
    tags: ["AI", "SaaS", "Stripe"],
    start_date: "2023-12-01T00:00:00.000Z",
    deadline: "2024-02-15T00:00:00.000Z",
    tasks: [{ completed: true }, { completed: true }],
    invoices: [{ amount: 30000, status: "Paid" }]
  }
];

const statusStyles = {
  Planning: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  'In progress': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  Review: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  Done: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  Delivered: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' }
};

const priorityBadge = {
  Low: 'text-slate-400 bg-slate-800/60 border-slate-700',
  Medium: 'text-blue-400 bg-blue-950/40 border-blue-800/40',
  High: 'text-orange-400 bg-orange-950/40 border-orange-800/40',
  Urgent: 'text-rose-400 bg-rose-950/40 border-rose-800/40'
};

export default function ProjectsListPage() {
  const [projects] = useState(mockProjectsList);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filtered project list calculation
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === 'All' || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  // Aggregate Metrics
  const totalBudget = useMemo(() => projects.reduce((sum, p) => sum + p.budget.amount, 0), [projects]);
  const activeProjectsCount = useMemo(() => projects.filter(p => p.status === 'In progress' || p.status === 'Review').length, [projects]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title & Main CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Projects Directory</h1>
            <p className="text-slate-400 text-sm mt-1">Manage, monitor, and track client deliverables across all stages.</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm shadow-lg shadow-blue-600/20 transition-all">
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </button>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Projects</span>
              <FolderKanban className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white">{projects.length}</p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Workspace</span>
              <Layers className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white">{activeProjectsCount}</p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Value</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-emerald-400">{formatCurrency(totalBudget)}</p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
              <CheckSquare className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white">
              {projects.filter(p => p.status === 'Done' || p.status === 'Delivered').length}
            </p>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search project, client, or tags..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Status Tabs / Pill Filter */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {['All', 'Planning', 'In progress', 'Review', 'Done', 'Delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  statusFilter === status 
                    ? 'bg-blue-600 text-white font-semibold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => {
              const completedTasks = project.tasks.filter(t => t.completed).length;
              const taskProgress = project.tasks.length > 0 ? Math.round((completedTasks / project.tasks.length) * 100) : 0;

              return (
                <div 
                  key={project._id} 
                  className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Top Row: Client & Status Badges */}
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        <span className="truncate max-w-[140px]">{project.client.company}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${priorityBadge[project.priority]}`}>
                          {project.priority}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyles[project.status]?.bg} ${statusStyles[project.status]?.text} ${statusStyles[project.status]?.border}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Project Title & Description */}
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                        <span className="truncate">{project.project_name}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400 shrink-0" />
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tag Badges */}
                    {project.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-800/50 border border-slate-800 rounded-md text-[11px] text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Stats Section */}
                  <div className="space-y-4 pt-4 border-t border-slate-800/80">
                    
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-400 font-mono">
                        <span>Tasks</span>
                        <span>{completedTasks}/{project.tasks.length} ({taskProgress}%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${taskProgress}%` }} />
                      </div>
                    </div>

                    {/* Footer Details */}
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Due {formatDate(project.deadline)}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-200">
                        {formatCurrency(project.budget.amount)}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center bg-slate-900/30 rounded-2xl border border-slate-800">
              <FolderKanban className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-300">No projects found</h3>
              <p className="text-xs text-slate-500 mt-1">Try refining your search terms or status filter.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}