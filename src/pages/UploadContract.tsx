import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle, FileSignature, Users, Shield, Building2, Loader2 } from 'lucide-react';
import CountryAutocomplete from '../components/CountryAutocomplete';
import { ContractAnalysisResponse } from '../types/contract';
import { getApiUrl, API_ENDPOINTS } from '../config/api';

// DOCX MIME type
const DOCX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

function UploadContract() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    contractType: '',
    description: '',
    country: ''
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
    if (droppedFile && droppedFile.type === DOCX_MIME_TYPE) {
      setFile(droppedFile);
    } else {
      setError('Please upload a .docx file');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === DOCX_MIME_TYPE) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError('Please upload a .docx file');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !formData.contractType || !formData.country) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiFormData = new FormData();
      apiFormData.append('file', file);

      const queryParams = {
        description: formData.description,
        contract_type: formData.contractType,
        jurisdiction: formData.country
      };

      const response = await fetch(
        getApiUrl(API_ENDPOINTS.ANALYZE_CONTRACT, queryParams),
        {
          method: 'POST',
          body: apiFormData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ContractAnalysisResponse = await response.json();

      if (data.analysis) {
        try {
          // Store the analysis in localStorage
          localStorage.setItem('contractAnalysis', JSON.stringify(data.analysis));

          // Store the file in localStorage
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const base64Content = reader.result?.toString();
              if (base64Content) {
                localStorage.setItem('contractFile', JSON.stringify({
                  name: file.name,
                  type: file.type,
                  content: base64Content
                }));
                navigate('/viewer/123');
              }
            } catch (storageErr) {
              console.error('Error storing file:', storageErr);
              setError('Unable to store contract data. Please try again.');
              setLoading(false);
            }
          };
          reader.onerror = () => {
            setError('Failed to process the file. Please try again.');
            setLoading(false);
          };
          reader.readAsDataURL(file);
        } catch (storageErr) {
          console.error('Error storing analysis:', storageErr);
          setError('Unable to store contract data. Please try again.');
          setLoading(false);
        }
      } else {
        setError('Invalid response from server. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze contract. Please try again.');
      console.error('Contract analysis error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#005776] mb-8">Upload Contract for Validation</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}
      
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
                  accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">Only .docx files are supported</p>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jurisdiction
            </label>
            <CountryAutocomplete
              value={formData.country}
              onChange={(country) => setFormData({ ...formData, country })}
              className="w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!file || loading}
            className={`px-6 py-3 rounded-md text-white font-medium flex items-center space-x-2
              ${
                file && !loading
                  ? 'bg-[#005776] hover:bg-[#003d52]'
                  : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Contract...</span>
              </>
            ) : (
              <>
                <span>Validate Contract</span>
                <AlertCircle className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadContract;