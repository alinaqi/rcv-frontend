import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle, FileSignature, Users, Shield, Building2 } from 'lucide-react';

function UploadContract() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [formData, setFormData] = useState({
    contractType: '',
    description: ''
  });

  const contractTypes = [
    {
      id: 'service',
      title: 'Service Agreement',
      icon: <FileSignature className="w-6 h-6" />,
      description: 'For professional services and consulting agreements'
    },
    {
      id: 'employment',
      title: 'Employment Contract',
      icon: <Users className="w-6 h-6" />,
      description: 'For new hires and employment terms'
    },
    {
      id: 'nda',
      title: 'Non-Disclosure Agreement',
      icon: <Shield className="w-6 h-6" />,
      description: 'For confidentiality and data protection'
    },
    {
      id: 'vendor',
      title: 'Vendor Agreement',
      icon: <Building2 className="w-6 h-6" />,
      description: 'For supplier and vendor relationships'
    }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) return;

    // In a real application, you would upload the file to your backend here
    // For demo purposes, we'll simulate an upload and redirect to the viewer
    const formData = new FormData();
    formData.append('file', file);
    
    // Simulate API call
    setTimeout(() => {
      navigate('/viewer/123');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#005776] mb-8">Upload Contract for Validation</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* File Upload Section */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragging ? 'border-[#005776] bg-[#005776]/5' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex items-center justify-center space-x-4">
              <FileText className="w-8 h-8 text-[#005776]" />
              <span className="text-lg">{file.name}</span>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 text-[#005776] mx-auto mb-4" />
              <p className="text-lg mb-2">Drag and drop your contract here</p>
              <p className="text-sm text-gray-500 mb-4">or</p>
              <label className="bg-[#005776] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#003d52] transition-colors">
                Browse Files
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
        </div>

        {/* Contract Details */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Contract Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contractTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.contractType === type.id
                      ? 'border-[#005776] bg-[#005776]/5'
                      : 'border-gray-200 hover:border-[#005776]/50'
                  }`}
                  onClick={() => setFormData({ ...formData, contractType: type.id })}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${
                      formData.contractType === type.id
                        ? 'bg-[#005776] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{type.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#005776] focus:ring focus:ring-[#005776] focus:ring-opacity-50"
              placeholder="Provide a brief description of the contract..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!file}
            className={`px-6 py-3 rounded-md text-white font-medium flex items-center space-x-2
              ${file ? 'bg-[#005776] hover:bg-[#003d52]' : 'bg-gray-300 cursor-not-allowed'}
            `}
          >
            <span>Validate Contract</span>
            <AlertCircle className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadContract;