"use client";

import api from "@/app/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/ui/Button";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const reason = params.get("reason");

  useEffect(() => {
    if (reason === "expired") {
      alert("Your session has expired. Please log in again.");
    }
  }, []);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const validateField = async (field: string, value: string) => {
    try {
      await formSchema.validateAt(field, {
        email,
        password,
        [field]: value,
      });
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [field]: error.message }));
      }
    }
  };

  const validateForm = async () => {
    try {
      await formSchema.validate({ email, password }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validateForm()) {
      try {
        setIsSubmitting(true);
        const response = await api.post("/accounts/login/", {
          email: email,
          password: password,
        });
        if (response.data.success) {
          resetForm();
          router.push("/user/dashboard");
        } else {
          toast.error(response.data.message || "Something went wrong");
        }
      } catch (error: any) {
        // Handle axios error properly
        if (error.response) {
          // Server responded with a status code
          toast.error(error.response.data.message || "Server error occurred");
        } else if (error.request) {
          // Request made but no response
          toast.error("No response from server. Please try again.");
        } else {
          // Something else (like network error)
          toast.error(error.message || "Unexpected error");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="flex flex-col w-full h-full space-y-5"
    >
      {/* Email */}
      <div className="flex flex-col w-full space-y-1.5">
        <label htmlFor="register-email" className="form-label">
          Email:
        </label>
        <input
          id="register-email"
          type="email"
          className="form-input"
          name="email"
          placeholder="Enter your email"
          maxLength={255}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateField("email", e.target.value);
          }}
        />
        {errors.email && <span className="text-error">{errors.email}</span>}
      </div>

      {/* Password */}
      <div className="flex flex-col w-full space-y-1.5">
        <label htmlFor="register-password" className="form-label">
          Password:
        </label>
        <input
          id="register-password"
          type="password"
          className="form-input"
          name="password"
          placeholder="Create a password"
          maxLength={15}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validateField("password", e.target.value);
          }}
        />
        {errors.password && (
          <span className="text-error">{errors.password}</span>
        )}
      </div>

      <div className="pt-5">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-7 py-3.5 w-full"
          severity="primary"
          label="Login"
          loading={isSubmitting}
        />
      </div>

      <p className="mb-0 text-center form-label">
        Need an account?{" "}
        <Link className="text-blue-600 underline" href={"/auth/get-started"}>
          Register
        </Link>
      </p>
    </form>
  );
}
