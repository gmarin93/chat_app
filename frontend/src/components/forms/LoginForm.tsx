"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/authStore";
import Form from "@/components/forms/Form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { createFallback } from "../error/CreateFallback";
import ErrorBoundary from "../error/ErrorBoundary";

const loginSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(6, "Min 6 chars"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { login, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    await login(data);
    router.push("/home");
  };

  return (
    <ErrorBoundary fallback={createFallback("auth")}>
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && <ErrorMessage error={error} onDismiss={clearError} />}

        <Input
          label="Username"
          {...register("username")}
          error={errors.username?.message}
          disabled={isSubmitting}
        />

        <Input
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </Form>
    </ErrorBoundary>
  );
}
