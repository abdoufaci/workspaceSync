"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addMessage } from "@/actions/mutations/chat-actions/addMessage";

import { useCallback, useState } from "react";
import { File, Loader2 } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "@/utils/uploadthing";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import Link from "next/link";
import VideoPlayer from "@/app/(main)/messages/components/VideoPlayer";
import FileMessage from "@/app/(main)/messages/components/FileMessage";

const formSchema = z.object({
  files: z.array(z.any()),
  message: z.string().optional(),
});

export default function FileMessageForm({ userId, projectId, chatId }: any) {
  const { onClose } = useModal();
  const [isLoading, setisLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const urls = [];

    for (let i = 0; i < acceptedFiles.length; i++) {
      urls.push({
        type: acceptedFiles[i].type,
        name: acceptedFiles[i].name,
        url: URL.createObjectURL(acceptedFiles[i]),
      });
    }

    form.setValue("files", form.getValues().files.concat(urls));
    setFiles((prev) => prev.concat(acceptedFiles));
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing(
    "fileMessageUploader",
    {
      onUploadError: (e) => {
        toast.error(e.message);
      },
    }
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { files: [] },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setisLoading(true);
    const res = await startUpload(files);
    const messageContents = [];

    if (res) {
      for (let i = 0; i < data.files.length; i++) {
        messageContents.push({
          name: data.files[i].name,
          type:
            data.files[i].type === "image/jpeg"
              ? "image"
              : data.files[i].type === "video/mp4"
              ? "video"
              : "pdf",
          content: res[i].url,
        });
      }

      if (data.message) {
        messageContents.push({
          type: "text",
          content: data.message,
        });
      }

      await addMessage({ messageContents, fromId: userId, projectId, chatId });

      onClose();
      setisLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex- flex-col"
      >
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-y-2 bg-gray-200 p-2 rounded-lg">
                  <ScrollArea className="h-[260px]">
                    {field.value.length == 0 ? (
                      <div
                        {...getRootProps()}
                        className="flex justify-center items-center h-[260px]"
                      >
                        <input {...getInputProps()} />
                        <div className="p-2 rounded-lg text-white bg-primary-blue hover:bg-primary-blue hover:cursor-pointer">
                          Choose File(s)
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap">
                        {field.value.map((file: any) => (
                          <div
                            className="flex w-[300px] items-center m-[2px] rounded-md"
                            key={file.url}
                          >
                            {file.type == "image/jpeg" ? (
                              <Image
                                alt="media image"
                                src={file.url}
                                width={1000}
                                height={1000}
                                className="rounded-2xl w-[40vh] object-cover"
                              />
                            ) : file.type == "video/mp4" ? (
                              <VideoPlayer content={file.url} />
                            ) : (
                              <FileMessage
                                content={file.url}
                                name={file.name}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                  {field.value.length > 0 && (
                    <div {...getRootProps()} className="flex justify-center">
                      <input {...getInputProps()} />
                      <div className="p-2 rounded-lg text-white bg-primary-blue hover:bg-primary-blue hover:cursor-pointer">
                        Add Files
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-1 items-center">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="border-0"
                    placeholder="Add a caption..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-primary-blue hover:bg-primary-blue h-[34px]"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <p>Send</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
