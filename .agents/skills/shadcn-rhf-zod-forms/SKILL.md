---
name: shadcn-rhf-zod-forms
description: Guide for creating forms using shadcn/ui, react-hook-form (RHF), and Zod. Make sure to use this skill whenever the user mentions building, refactoring, or updating any form, login page, registration flow, or data entry component.
---

# Building Forms with shadcn/ui + react-hook-form + zod

When asked to implement or refactor a form, you must strictly follow this pattern to ensure consistency across the project. Form components should generally be client-side components (`"use client"`) isolated from the main page structures.

## 1. Directory Structure

- Extract the form logic into a dedicated UI component (e.g., `src/components/auth/login-form.tsx`).
- Keep the actual `page.tsx` as a simple Server Component wrapper that pulls in layout components and the new form component.

## 2. Setting up the Schema

- Define the `zod` schema strictly outside of the component. Use standard validations (`min`, `regex`, custom messages).
- If passwords need confirmation, use `.refine()` on the object.
- Infer the RHF form values type using `z.infer`.

```tsx
import * as z from 'zod';

const formSchema = z.object({
   username: z.string().min(3, 'Username minimal 3 karakter'),
   password: z.string().min(8, 'Kata sandi minimal 8 karakter'),
});

type FormValues = z.infer<typeof formSchema>;
```

## 3. Form Initialization

- Initialize `useForm` with the `zodResolver`.
- _Note:_ If using Zod v4 and older hookform resolvers, you may see a type mismatch. Bypass it explicitly with `any` and a biome-ignore comment if required.

```tsx
export function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // biome-ignore lint/suspicious/noExplicitAny: <Zod 4 type mismatch>
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  // ...
```

## 4. Building the UI with shadcn (`FieldGroup` and `Field`)

Forms must use the explicit semantic `<Field>` and `<FieldGroup>` primitives. Never use raw `div` tags for form component wrapping.

- Wrap the entire set of fields in `<FieldGroup>`.
- For each input, wrap it in `<Field data-invalid={!!errors.fieldName}>`.
- Inside the `<Field>`, place:
   1. `<FieldLabel>`
   2. The input element (e.g., `<Input>`, `<PasswordInput>`) passing `{...register("fieldName")}` and applying `aria-invalid={!!errors.fieldName}`.
   3. `<FieldError>` dynamically rendered if `errors.fieldName` exists.

```tsx
import {
   Field,
   FieldError,
   FieldGroup,
   FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

return (
   <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 p-4 rounded-md"
   >
      <FieldGroup>
         <Field data-invalid={!!errors.username}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
               id="username"
               placeholder="Masukkan username"
               {...register('username')}
               aria-invalid={!!errors.username}
            />
            {errors.username && (
               <FieldError>{errors.username.message}</FieldError>
            )}
         </Field>

         <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
               type="password"
               id="password"
               placeholder="••••••••"
               {...register('password')}
               aria-invalid={!!errors.password}
            />
            {errors.password && (
               <FieldError>{errors.password.message}</FieldError>
            )}
         </Field>
      </FieldGroup>

      <Button type="submit" className="w-full">
         Submit
      </Button>
   </form>
);
```

## 5. Important Rules

- `data-invalid` on the `<Field>` element determines the red coloring of Labels and Description/Errors.
- `aria-invalid` on the `<Input>` determines the red coloring of the input border itself. Both MUST be provided explicitly.
- Always implement accessible HTML `id` attributes that match the `htmlFor` on `<FieldLabel>`.
