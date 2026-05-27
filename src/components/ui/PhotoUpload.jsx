import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function PhotoUpload({ currentUrl, onUpload }) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    disabled: uploading,
    onDrop: async (acceptedFiles) => {
      if (!acceptedFiles.length) return
      setUploading(true)
      setUploadError(null)
      try {
        await onUpload(acceptedFiles[0])
      } catch {
        setUploadError('Upload failed. Please try again.')
      } finally {
        setUploading(false)
      }
    },
  })

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-medium text-text-primary">
        Profile photo{' '}
        <span className="font-normal text-text-secondary">(optional)</span>
      </label>

      {currentUrl ? (
        <div className="flex items-center gap-4">
          <img src={currentUrl} alt="Profile" className="w-16 h-16 rounded-full object-cover shadow-card" />
          <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <span className="text-[14px] text-accent hover:underline">Change photo</span>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={[
            'border-2 border-dashed rounded-card p-8 text-center transition-colors duration-200',
            uploading
              ? 'border-accent/40 cursor-wait'
              : isDragActive
              ? 'border-accent bg-accent/5 cursor-copy'
              : 'border-gray-200 hover:border-gray-300 cursor-pointer',
          ].join(' ')}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Spinner />
              <span className="text-[14px] text-text-secondary">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <CameraIcon />
              <span className="text-[14px] text-text-secondary">
                {isDragActive ? 'Drop your photo here' : 'Upload a photo (optional)'}
              </span>
              <span className="text-[12px] text-text-secondary">or click to browse</span>
            </div>
          )}
        </div>
      )}

      {uploadError && <span className="text-[13px] text-danger">{uploadError}</span>}
    </div>
  )
}

function Spinner() {
  return <div className="w-6 h-6 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
}

function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}
