import React from "react";
import { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean;
}

export default function IconButton({ transparent, ...props }: IconButtonProps) {
  return (
    <button
      className={
        transparent
          ? "bg-transparent"
          : "bg-white/10 border border-white/10 rounded-md p-1.5"
      }
      {...props}
    />
  );
}
