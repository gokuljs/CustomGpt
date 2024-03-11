"use client";
import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import useGetAllMessages, { MessageProps } from "@/lib/useGetAllMessagesData";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const History = () => {
  const data: MessageProps[] = useGetAllMessages();

  const [sideBarActive, setSideBarActive] = useState<boolean>(false);
  const allMessages =
    data.length > 0
      ? data
          .reverse()
          .map((item) => ({ id: item.id, content: item.messages[0].content }))
      : [];

  function deleteItemById() {
    const localStorageKey = process.env.LOCAL_STORAGE_KEY || "defaultKey";
    // Check if the item exists in local storage
    if (localStorage.getItem(localStorageKey) !== null) {
      // Delete the item
      localStorage.removeItem(localStorageKey);
      toast("Item with ID ${localStorageKey} has been deleted.");
    } else {
      toast("Item with ID ${localStorageKey} does not exist.");
    }
  }

  return (
    <>
      <Button className="px-2 py-2" variant={"ghost"}>
        <Menu onClick={() => setSideBarActive(true)} />
      </Button>
      <div
        className={`fixed w-[300px] h-[100%] top-0 left-0 dark:bg-zinc-950 bg-gray-50 flex flex-col gap-1 transition-transform transform ease-in-out duration-500
        ${sideBarActive ? "translate-x-[0%]" : "translate-x-[-100%]"}
        `}
      >
        <div className="h-[60px] flex justify-between items-center px-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  className="object-cover object-center h-8 w-8 rounded-full"
                  src="/profileThree.jpeg"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => deleteItemById()}>
                Clear History
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className="rounded-full h-7 w-7 px-1 py-1 hover:bg-zinc-800 hover:text-white"
            variant={"ghost"}
            onClick={() => setSideBarActive(false)}
          >
            <X className="cursor-pointer h-5 w-5" />
          </Button>
        </div>
        <div className="h-[100%-60px] py-5 px-2 flex flex-col gap-3 overflow-y-auto">
          {allMessages.map((item) => (
            <div
              className="px-2 py-2 cursor-pointer rounded dark:hover:bg-zinc-800 hover:bg-zinc-800 hover:text-white flex items-center justify-between"
              key={item.id}
            >
              <div className="max-w-xs overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                {item.content ? (item.content as string) : ""}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default History;
