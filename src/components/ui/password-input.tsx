"use client";

import * as React from "react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";

export interface PasswordInputProps
  extends React.ComponentProps<"input"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <InputGroup className={className}>
        <InputGroupInput
          type={showPassword ? "text" : "password"}
          ref={ref}
          {...props}
        />
        <InputGroupAddon align={"inline-end"}>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="text-muted-foreground hover:text-foreground"
          >
            <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
