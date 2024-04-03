import { ComponentProps } from "react";

interface TableComponentProps extends ComponentProps<"table"> {}

export default function Table(props: TableComponentProps) {
  return (
    <div className="border border-white/10 rounded-lg">
      <table {...props} className="w-full " />
    </div>
  );
}
