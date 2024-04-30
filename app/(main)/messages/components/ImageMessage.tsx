import Image from "next/image";
import { ElementRef, useRef, useState } from "react";

export default function ImageMessage({ content }: any) {
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  return (
    <>
      <Image
        alt="media image"
        src={content}
        width={1000}
        height={1000}
        onClick={() => dialogRef.current?.showModal()}
        className="rounded-2xl w-[40vh] object-cover hover:cursor-pointer"
      />
      <dialog
        ref={dialogRef}
        className="outline-none w-screen h-screen bg-black/80"
        onClick={() => dialogRef.current?.close()}
      >
        <div className="flex justify-center items-center w-full h-full">
          <Image
            alt="media image"
            src={content}
            width={1000}
            height={1000}
            className="rounded-lg max-w-[70vw] max-h-[70vh] object-contain"
          />
        </div>
      </dialog>
    </>
  );
}
