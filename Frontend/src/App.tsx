import { useState, useEffect } from 'react';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import DocumentList from './components/DocumentList';
import Toast from './components/Toast';
import { documentService } from './services/documentService';
import { Document, ToastMessage } from './types';

function App() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Fetch documents on mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await documentService.getAllDocuments();
      setDocuments(data);
    } catch (error) {
      showToast('Failed to load documents', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    fetchDocuments();
    showToast('Document uploaded successfully!', 'success');
  };

  const handleDelete = async (id: number) => {
    try {
      await documentService.deleteDocument(id);
      setDocuments(documents.filter(doc => doc.id !== id));
      showToast('Document deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete document', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Upload Section */}
        <div className="mb-8">
          <UploadForm 
            onUploadSuccess={handleUploadSuccess}
            onUploadError={(message) => showToast(message, 'error')}
          />
        </div>

        {/* Documents List Section */}
        <div>
          <DocumentList
            documents={documents}
            loading={loading}
            onDelete={handleDelete}
            onRefresh={fetchDocuments}
          />
        </div>
      </main>

      {/* Toast Notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;

