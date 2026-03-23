---
name: skeleton-generator
description: Generates static, boring skeleton loading components using `@/components/ui/skeleton`. Use this skill whenever the user asks to create a loading state, skeleton, placeholder, or loading UI for an existing component. It focuses on decent layout approximations rather than pixel-perfect exactness.
---

# Skeleton Generator

This skill teaches you how to generate skeleton loaders (placeholder UI) that approximate the structure of an existing target component.

## Core Principles

1. **Keep it Boring & Static**:
   Do NOT use clever logic, `Array.from()`, maps, or loops to generate multiple skeleton items. If a component represents a list, just write out the skeletons manually (e.g., 3 static rows). Do not use conditionals or complex state. The result must be completely static and dumb.

2. **Decent Approximation (Freedom of Mapping)**:
   Your goal is to generate an *accurate, decent approximation* of the represented UI. You do not need to match every single pixel, padding, or text size exactly. Give yourself the freedom to simplify the layout while maintaining the overall visual hierarchy (e.g., a circle for an avatar, a wide block for a title, thinner blocks for paragraphs).

3. **Isolated Generation**:
   Generate *only* the isolated skeleton component (e.g., `export function MyComponentSkeleton() { ... }`). Do not attempt to wire it up into the parent component with `Suspense` or ternary operators unless the user explicitly asks for it. 

4. **Strict Imports**:
   Only import `Skeleton` from `@/components/ui/skeleton`. Do not import other UI libraries, icons, or external layout components unless absolutely necessary to match the structure. Use standard HTML elements (`div`, `span`) with Tailwind classes for layout.

## Mapping Guidelines

When looking at a target component, map its elements to skeletons using these general approximations:

- **Avatars/Icons**: Use a circular skeleton.
  ```tsx
  <Skeleton className="h-10 w-10 rounded-full" />
  ```
- **Titles/Headings**: Use a thicker, partial-width block.
  ```tsx
  <Skeleton className="h-6 w-1/2" />
  ```
- **Text/Paragraphs**: Use thinner, varying-width blocks.
  ```tsx
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-full" />
  ```
- **Buttons**: Use a standard block.
  ```tsx
  <Skeleton className="h-10 w-[100px] rounded-md" />
  ```
- **Layouts**: Preserve the outer structure (e.g., `flex`, `grid`, `gap-*`, `p-*`, `items-center`). You can drop non-layout styling classes (like text colors, borders, shadows) since the skeleton itself is the visual element.

## Example

**Target Component:**
```tsx
export function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
      <img src={user.avatar} className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-lg">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <button className="ml-auto px-4 py-2 bg-blue-500 rounded-md text-white">
        Follow
      </button>
    </div>
  )
}
```

**Output Skeleton:**
```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function UserCardSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
      {/* Avatar */}
      <Skeleton className="h-12 w-12 rounded-full" />
      
      {/* Text Info */}
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-5 w-[120px]" />
        <Skeleton className="h-4 w-[180px]" />
      </div>

      {/* Button */}
      <Skeleton className="h-10 w-[80px] rounded-md ml-auto" />
    </div>
  )
}
```