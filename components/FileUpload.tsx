"use client";

import { CircleMinus, X } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/utils/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value?: string | null;
  endpoint: "imageUploader" | "labelFile";
}

export const FileUpload = ({
  onChange,
  value,
  endpoint = "imageUploader",
}: FileUploadProps) => {
  if (value && endpoint === "imageUploader") {
    return (
      <div className="flex items-center justify-center gap-x-4 border w-full p-2 rounded bg-[#E7F1F8] relative ">
        <Image
          alt="project image"
          src={value}
          height={100}
          width={100}
          className="w-[95%] mx-auto rounded-md object-cover"
        />
        <X
          className="rounded-full w-8 h-8 absolute top-2 right-2 cursor-pointer text-primary-blue bg-transparent"
          onClick={() => onChange("")}
        />
      </div>
    );
  }

  if (value && endpoint === "labelFile") {
    return (
      <div className="flex items-center justify-center gap-x-4 border w-full p-2 rounded bg-[#E7F1F8] relative ">
        <div className="bg-white text-black p-2 rounded font-medium">
          <h1>File uploaded !</h1>
        </div>
        <X
          className="rounded-full w-8 h-8 absolute top-2 right-2 cursor-pointer text-primary-blue bg-transparent"
          onClick={() => onChange("")}
        />
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
