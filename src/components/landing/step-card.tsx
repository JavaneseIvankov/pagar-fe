import type { HugeiconsProps } from "@hugeicons/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface StepCardProps
  extends Omit<React.ComponentProps<typeof motion.div>, "title" | "content"> {
  variant?: "default" | "outline";
  color?: "purple" | "green" | "blue";
  stepNumber: string;
  title: ReactNode;
  content: ReactNode;
  icon: NonNullable<HugeiconsProps["icon"]>;
  iconPosition?: "left" | "right";
  className?: string;
  variants?: Variants;
}

const colorStyles = {
  purple: {
    bgDefault: "transform bg-purple-700 text-white shadow-xl",
    bgOutline: "border border-purple-200 bg-purple-50",
    stepDefault: "text-purple-300",
    stepOutline: "text-purple-700",
    contentDefault: "text-purple-100",
    iconDefault: "text-purple-300",
    iconOutline: "text-purple-400",
  },
  green: {
    bgDefault: "transform bg-green-700 text-white shadow-xl",
    bgOutline: "border border-green-200 bg-green-50",
    stepDefault: "text-green-300",
    stepOutline: "text-green-700",
    contentDefault: "text-green-100",
    iconDefault: "text-green-300",
    iconOutline: "text-green-400",
  },
  blue: {
    bgDefault: "transform bg-sky-500 text-white shadow-xl",
    bgOutline: "border border-sky-200 bg-sky-50",
    stepDefault: "text-sky-200",
    stepOutline: "text-sky-600",
    contentDefault: "text-sky-50",
    iconDefault: "text-sky-200",
    iconOutline: "text-sky-400",
  },
};

export function StepCard({
  variant = "outline",
  color = "purple",
  stepNumber,
  title,
  content,
  icon,
  iconPosition = "left",
  className,
  variants,
  ...props
}: StepCardProps) {
  const isDefault = variant === "default";
  const styles = colorStyles[color];

  return (
    <motion.div
      variants={variants}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-8 transition-all",
        isDefault ? styles.bgDefault : styles.bgOutline,
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "mb-4 font-extrabold text-3xl",
          isDefault ? styles.stepDefault : styles.stepOutline,
        )}
      >
        {stepNumber}
      </div>
      <h3
        className={cn(
          "mb-3 font-bold text-xl",
          !isDefault && "text-neutral-900",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mb-10 text-sm leading-relaxed",
          isDefault ? styles.contentDefault : "text-neutral-600",
        )}
      >
        {content}
      </p>
      <div
        className={cn(
          "absolute bottom-6 opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100",
          isDefault ? styles.iconDefault : styles.iconOutline,
          iconPosition === "left"
            ? "left-6 origin-bottom-left"
            : "right-6 origin-bottom-right",
        )}
      >
        <HugeiconsIcon icon={icon} size={40} />
      </div>
    </motion.div>
  );
}
