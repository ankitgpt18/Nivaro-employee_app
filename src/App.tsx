import React, { useState } from 'react';
import Header from './components/Header';
import UserSidebar from './components/UserSidebar';
import IssueCard from './components/IssueCard';
import StatusSummary from './components/StatusSummary';
import CategoryGrid from './components/CategoryGrid';
import BottomNav from './components/BottomNav';
import ReportModal from './components/ReportModal';
import StatusView from './components/StatusView';
import DashboardView from './components/DashboardView';
import { mockIssues } from './data/mockData';
import { Issue } from './types';

function App() {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [activeTab, setActiveTab] = useState('home');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isResolutionModalOpen, setIsResolutionModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsReportModalOpen(true);
  };

  const handleIssueSubmit = (newIssue: Omit<Issue, 'id' | 'reportedAt'>) => {
    const issue: Issue = {
      ...newIssue,
      id: Date.now().toString(),
      reportedAt: new Date()
    };
    setIssues(prev => [issue, ...prev]);
  };

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'status':
        return <StatusView issues={issues} />;
      case 'dashboard':
        return <DashboardView issues={issues} />;
      default:
        return (
          <div className="px-6 py-4 pb-24">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Latest report in your area
              </h2>
              {issues.length > 0 && (
                <IssueCard 
                  issue={issues[0]} 
                  onClick={handleIssueClick}
                />
              )}
            </div>

            <StatusSummary issues={issues} />
            
            {/* Work Update Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Update Your Work</h2>
              <button
                onClick={() => setIsResolutionModalOpen(true)}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors shadow-md"
              >
                <span className="text-xl">📤</span>
                <span>Upload Resolution</span>
              </button>
            </div>
            
            {issues.length > 1 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Reports</h2>
                <div className="space-y-4">
                  {issues.slice(1, 3).map((issue) => (
                    <IssueCard 
                      key={issue.id} 
                      issue={issue} 
                      onClick={handleIssueClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        notificationCount={2} 
        onMenuClick={() => setIsSidebarOpen(true)} 
      />
      
      <main className="flex-1 overflow-y-auto pt-16 pb-20">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <UserSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        selectedCategory={selectedCategory}
        onSubmit={handleIssueSubmit}
      />

      {/* Resolution Upload Modal */}
      {isResolutionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Upload Resolution</h2>
              <button
                onClick={() => setIsResolutionModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Complaint ID *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select complaint to resolve</option>
                  {issues.filter(issue => issue.status !== 'resolved').map((issue) => (
                    <option key={issue.id} value={issue.id}>
                      {issue.title} - {issue.location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution Photo *
                </label>
                <button
                  type="button"
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors flex flex-col items-center space-y-2"
                >
                  <span className="text-4xl">📷</span>
                  <span className="text-gray-500">Take photo of completed work</span>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution Comments *
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe the work completed and any additional notes"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Location
                </label>
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📍</span>
                  <span>Auto-fetch Current Location</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors"
              >
                <span>✅</span>
                <span>Submit Resolution</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedIssue.image} 
                alt={selectedIssue.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setSelectedIssue(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedIssue.title}</h2>
              <p className="text-gray-600 mb-4">{selectedIssue.description}</p>
              
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Location:</span> {selectedIssue.location}</p>
                <p><span className="font-medium">Category:</span> {selectedIssue.category}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs capitalize ${
                    selectedIssue.status === 'resolved' 
                      ? 'bg-green-100 text-green-800'
                      : selectedIssue.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedIssue.status.replace('-', ' ')}
                  </span>
                </p>
                <p><span className="font-medium">Reports:</span> {selectedIssue.reportCount}</p>
                <p><span className="font-medium">Reported by:</span> {selectedIssue.reportedBy}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;