
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      try {
        setIsLoading(true);
        const loadingToastId = toast.loading('Uploading...');

        const data = new FormData();
        data.append('file', files[0]);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });

        if (response.ok) {
          const link = await response.json();
          setLink(link);
          toast.success('Upload complete', { id: loadingToastId });
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        toast.error('Upload error');
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      {link ? (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
      ) : (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} disabled={isLoading} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          {isLoading ? 'Uploading...' : 'Change image'}
        </span>
      </label>
    </>
  );
}

