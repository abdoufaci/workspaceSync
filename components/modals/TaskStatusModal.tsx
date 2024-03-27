"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { PlusIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

export const TaskStatusModal = () => {
  const [showInput, setShowInput] = useState(false);
  const [titles, setTitles] = useState([
    "UX design",
    "Web dev",
    "Front End",
    "Back End",
  ]);

  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "taskStatus";

  /*const onClick = async () => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };*/

  const showHideInput = () => {
    setShowInput((prev) => !prev);
  };

  const addTitle = (formData: any) => {
    const title = formData.get("title");

    setTitles((prev) => [...prev, title]);
    showHideInput();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="px-6 py-2">
          <DialogTitle className="text-2xl text-start font-bold">
            Task Status
          </DialogTitle>
        </DialogHeader>
        <div className="flex p-2 justify-around">
          <div className="flex gap-x-2">
            <h1>Priority :</h1>
            <RadioGroup defaultValue="low">
              <div className="flex items-center space-x-2 p-2">
                <RadioGroupItem value="low" id="r1" />
                <Label htmlFor="r1">
                  <Badge>Low</Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-2">
                <RadioGroupItem value="medium" id="r2" />
                <Label htmlFor="r2">
                  <Badge>Medium</Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-2">
                <RadioGroupItem value="high" id="r3" />
                <Label htmlFor="r3">
                  <Badge>High</Badge>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex gap-x-2">
            <h1>Titles :</h1>
            <div className="flex flex-col gap-y-1">
              {titles.map((title) => (
                <div key={title} className="flex items-center space-x-2">
                  <Checkbox id={title} />
                  <label
                    htmlFor={title}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Badge>{title}</Badge>
                  </label>
                </div>
              ))}
              {showInput ? (
                <form action={addTitle}>
                  <Input
                    autoFocus
                    name="title"
                    onBlur={showHideInput}
                    className="w-[70px] h-[20px] mt-1 focus:outline-none border-none"
                  ></Input>
                </form>
              ) : (
                <PlusIcon
                  size={20}
                  className="p-[2px] hover:cursor-pointer outline-dashed rounded-full outline-2 mt-1"
                  onClick={showHideInput}
                />
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 py-2 border-t">
          <div className="flex items-center justify-between w-full">
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button onClick={onClose}>Confirm</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
