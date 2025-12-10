import { useState, useRef } from 'react';
import { documentService } from '../services/documentService';

interface UploadFormProps {
  onUploadSuccess: () => void;
  onUploadError: (message: string) => void;
}

const UploadForm = ({ onUploadSuccess, onUploadError }: UploadFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        onUploadError('Only PDF files are allowed');
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      // Validate file size (10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        onUploadError('File size exceeds 10MB limit');
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      onUploadError('Please select a file');
      return;
    }

    try {
      setUploading(true);
      await documentService.uploadDocument(selectedFile);
      
      // Reset form
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      onUploadSuccess();
    } catch (error: any) {
      onUploadError(error.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <svg 
          className="w-5 h-5 mr-2 text-primary-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
          />
        </svg>
        Upload New Document
      </h2>
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label 
            htmlFor="file-upload" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select PDF File
          </label>
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileSelect}
            className="input-file"
            disabled={uploading}
          />
          <p className="mt-2 text-xs text-gray-500">
            Accepted format: PDF only. Maximum size: 10MB
          </p>
        </div>

        {selectedFile && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg 
                  className="w-5 h-5 text-primary-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
                disabled={uploading}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path 
                    fillRule="evenodd" 
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className="btn-primary flex-1"
          >
            {uploading ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg 
                  className="w-4 h-4 mr-2 inline" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
                Upload Document
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;

