import React, { ComponentProps } from "react";

interface TheadProps extends ComponentProps<"th"> {}

export default function TableHeader(props: TheadProps) {
  return (
    <th className="py-3 px-4 font-semibold text-sm text-left" {...props} />
  );
}
