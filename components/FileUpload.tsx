"use client";

import { CircleMinus, X } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/utils/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value?: string;
}

export const FileUpload = ({ onChange, value }: FileUploadProps) => {
  if (value) {
    return (
      <div className="flex items-center gap-x-4 border w-fit p-2 rounded-r-full bg-[#E7F1F8]">
        <Image
          alt="project image"
          src={value}
          height={100}
          width={100}
          className="w-[200px] rounded-md object-cover"
        />
        <CircleMinus
          role="button"
          color="#1778ff"
          strokeWidth={1.25}
          className="rounded-full w-16 h-16 float:right"
          onClick={() => onChange(undefined)}
        />
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
