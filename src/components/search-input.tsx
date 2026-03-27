"use client";

import { Search01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export interface SearchInputProps extends React.ComponentProps<"input"> {
  inputClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      inputClassName,
      type = "search",
      placeholder = "Cari laporan…",
      ...props
    },
    ref,
  ) => {
    return (
      <InputGroup className={className}>
        <InputGroupAddon>
          <HugeiconsIcon icon={Search01FreeIcons} aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          type={type}
          placeholder={placeholder}
          ref={ref}
          autoComplete="off"
          className={inputClassName}
          {...props}
        />
      </InputGroup>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
