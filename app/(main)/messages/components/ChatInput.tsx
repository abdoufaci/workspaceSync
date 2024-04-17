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
import { uploadFiles } from "@/utils/uploadthing";

import { EmojiPicker } from "./EmojiPicker";
import { Loader2, Mic, Paperclip, SendHorizontal, Trash } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { useEffect, useState } from "react";

const formSchema = z.object({
  message: z.string(),
});

export default function ChatInput({ userId, projectId, chatId }: any) {
  const [uploadAudio, setUploadAudio] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    recordingTime,
  } = useAudioRecorder();

  const { onOpen } = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit({ message }: z.infer<typeof formSchema>) {
    setIsLoading(true);

    await addMessage({
      messageContents: [
        {
          type: "text",
          content: message,
        },
      ],
      fromId: userId,
      projectId,
      chatId,
    });

    setIsLoading(false);
    form.resetField("message");
  }

  const addAudioElement = async () => {
    setUploadAudio(true);
    stopRecording();
  };

  useEffect(() => {
    if (recordingBlob && uploadAudio == true) {
      setUploadAudio(false);
      const uploadAudioFunction = async () => {
        setIsLoading(true);
        const files = [new File([recordingBlob], "test.webm")];
        const res = await uploadFiles("fileMessageUploader", {
          files,
        });

        await addMessage({
          messageContents: [
            {
              type: "audio",
              content: res[0].url,
            },
          ],
          fromId: userId,
          projectId,
          chatId,
        });
        setIsLoading(false);
      };

      uploadAudioFunction();
    }
  }, [recordingBlob]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-x-2">
                  <div className="flex items-center gap-x-1 rounded-xl bg-gray-200 border px-4 w-full">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                    <Input
                      disabled={isLoading}
                      className="h-[50px] bg-transparent border-0 py-6 text-lg"
                      placeholder="Write your message..."
                      {...field}
                    />
                    {!isRecording ? (
                      <Paperclip
                        role="button"
                        onClick={() =>
                          onOpen("fileMessageModal", {
                            userId,
                            projectId,
                            chatId,
                          })
                        }
                        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 w-[30px] h-[30px] transition"
                      />
                    ) : (
                      <div className="flex items-center gap-x-2">
                        <div className="pb-[1px]">{recordingTime}</div>
                        <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      {field.value ? (
                        <button type="submit">
                          <SendHorizontal
                            role="button"
                            className="text-white bg-primary-blue rounded-full w-[40px] h-[40px] p-[8px]"
                          />
                        </button>
                      ) : (
                        <>
                          {!isRecording ? (
                            <div className="text-white bg-primary-blue rounded-full w-[40px] h-[40px] p-[8px]">
                              <Mic role="button" onClick={startRecording} />
                            </div>
                          ) : (
                            <>
                              <div className="bg-gray-800 text-rose-500 rounded-full w-[40px] h-[40px] p-[8px]">
                                <Trash role="button" onClick={stopRecording} />
                              </div>
                              <SendHorizontal
                                role="button"
                                className="text-white bg-primary-blue rounded-full w-[40px] h-[40px] p-[8px]"
                                onClick={addAudioElement}
                              />
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
