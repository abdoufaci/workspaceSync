"use client";

import { File } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import file_size_url from "file_size_url";

export default function FileMessage({ content, name }: any) {
  const [fileSize, setFileSize] = useState(null);
  useEffect(() => {
    const fun = async () => {
      let size = await file_size_url(content).catch((error: any) =>
        console.log(error)
      );

      const words = size.split(" ");

      if (words[1] == "KB") words[0] = Math.round(Number(words[0])).toString();
      if (words[1] == "MB")
        words[0] = Math.round((Number(words[0]) * 10) / 10).toString();

      setFileSize(words[0] + " " + words[1]);
    };

    fun();
  }, []);

  return (
    <Link
      target="_blank"
      href={content}
      className="flex justify-center items-center h-[60px] bg-blue-400 rounded-2xl border-2 border-blue-400 w-fit pr-4 gap-x-1"
    >
      <File className=" w-[50px] h-[50px] text-[rgba(245,245,245)]" />
      <div>
        <h1 className="text-lg font-medium text-white leading-tight">{name}</h1>
        <p className="leading-tight text-white">{fileSize}</p>
      </div>
    </Link>
  );
}
