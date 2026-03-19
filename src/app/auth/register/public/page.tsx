import { AuthContentLayout } from "@/components/auth/auth-content-layout";
import { RegisterPublicForm } from "@/components/auth/register-public-form";

export default function RegisterPublicPage() {
  return (
    <AuthContentLayout>
      <RegisterPublicForm />
    </AuthContentLayout>
  );
}
