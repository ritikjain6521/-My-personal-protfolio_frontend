import React, { useState, useRef } from 'react';
import { Loader2, Image as ImageIcon, Film, X } from 'lucide-react';
import { API_BASE } from "@/lib/api";
import { toast } from 'sonner';

interface FileUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  type?: 'image' | 'video';
}

const FileUpload: React.FC<FileUploadProps> = ({ label, value, onChange, accept = "image/*", type = "image" }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Assuming public upload for now as implemented in backend
      const response = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      // Ensure the returned URL has the API_BASE if it's a relative /uploads path
      const fileUrl = data.url.startsWith('/') ? `${API_BASE}${data.url}` : data.url;
      onChange(fileUrl);
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="w-full">
      <label className="text-white/50 text-xs font-medium mb-1.5 block">{label}</label>
      
      {value ? (
        <div className="relative rounded-xl border border-white/10 overflow-hidden bg-white/5 group h-32">
          {type === 'image' ? (
            <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
          ) : (
            <video src={value} className="w-full h-full object-cover" controls />
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={handleRemove}
              className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-lg transition-colors shadow-lg"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="border border-dashed border-white/20 hover:border-violet-500/50 rounded-xl flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer h-32"
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-violet-400 animate-spin mb-2" />
          ) : (
            type === 'image' ? <ImageIcon className="w-6 h-6 text-white/40 mb-2" /> : <Film className="w-6 h-6 text-white/40 mb-2" />
          )}
          <span className="text-white/60 text-sm font-medium">
            {uploading ? 'Uploading...' : `Click to upload ${type}`}
          </span>
          <span className="text-white/30 text-xs mt-1">or paste URL below</span>
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
        </div>
      )}
      
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Or paste ${type} URL...`}
        className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all"
      />
    </div>
  );
};

export default FileUpload;
