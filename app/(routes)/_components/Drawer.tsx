"use client";
import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import useGetAllMessages, { MessageProps } from "@/lib/useGetAllMessagesData";

const History = () => {
  const data: MessageProps[] = useGetAllMessages();
  const [sideBarActive, setSideBarActive] = useState<boolean>(false);
  const allMessages = data
    .reverse()
    .map((item) => ({ id: item.id, content: item.messages[0].content }));
  console.log(allMessages);

  return (
    <>
      <Button className="px-2 py-2" variant={"ghost"}>
        <Menu onClick={() => setSideBarActive(true)} />
      </Button>
      <div
        className={`fixed w-[300px] h-[100%] top-0 left-0 bg-zinc-950 flex flex-col gap-1 transition-transform transform ease-in-out duration-500
        ${sideBarActive ? "translate-x-[0%]" : "translate-x-[-100%]"}
        `}
      >
        <div className="h-[60px] flex justify-end items-center px-2">
          <Button
            className="rounded-full h-7 w-7 px-1 py-1"
            variant={"ghost"}
            onClick={() => setSideBarActive(false)}
          >
            <X className="cursor-pointer h-5 w-5" />
          </Button>
        </div>
        <div className="h-[100%-60px] py-5 px-2 flex flex-col gap-3 overflow-y-auto">
          {allMessages.map((item) => (
            <div
              className="px-2 py-2 cursor-pointer rounded hover:bg-zinc-800 flex items-center justify-between"
              key={item.id}
            >
              {item.content ? (item.content as string) : ""}
              <EllipsisVertical />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default History;
