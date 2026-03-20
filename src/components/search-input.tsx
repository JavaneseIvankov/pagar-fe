"use client";

import { Search01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export interface SearchInputProps extends React.ComponentProps<"input"> {
  inputClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      inputClassName,
      type = "search",
      placeholder = "Search...",
      ...props
    },
    ref,
  ) => {
    return (
      <InputGroup className={cn("bg-background", className)}>
        <InputGroupAddon>
          <HugeiconsIcon icon={Search01FreeIcons} />
        </InputGroupAddon>
        <InputGroupInput
          type={type}
          placeholder={placeholder}
          ref={ref}
          className={inputClassName}
          {...props}
        />
      </InputGroup>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
