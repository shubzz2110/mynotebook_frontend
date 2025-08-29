"use client";

import api from "@/app/lib/axios";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Button from "@/app/ui/Button";
import { toast } from "react-toastify";

export default function GetStartedForm() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords does not match"),
  });

  const validateField = async (field: string, value: string) => {
    try {
      await formSchema.validateAt(field, {
        name,
        email,
        password,
        confirmPassword,
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
      await formSchema.validate(
        { name, email, password, confirmPassword },
        { abortEarly: false }
      );
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

        const response = await api.post("/accounts/register/", {
          name,
          email,
          password,
        });

        // ✅ Success
        if (response.data.success) {
          toast.success(response.data.message);
          resetForm();
          router.push("/auth/login");
        } else {
          // ✅ Shouldn’t normally happen since success=false is 400
          toast.error(response.data.message || "Something went wrong");
        }
      } catch (error: any) {
        console.log(error);

        if (error.response) {
          const data = error.response.data;

          // ✅ Our backend response format
          if (data && typeof data === "object") {
            // Collect error messages if present
            const messages = data.errors
              ? Object.values(data.errors).flat().join(" ")
              : data.message;

            toast.error(messages || "Validation failed");
          } else {
            toast.error("Unexpected server response");
          }
        } else if (error.request) {
          toast.error("No response from server. Please try again.");
        } else {
          toast.error(error.message || "Unexpected error");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="flex flex-col w-full h-full space-y-5"
    >
      {/* Name */}
      <div className="flex flex-col w-full space-y-1.5">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-input"
          name="name"
          id="name"
          placeholder="Enter full name"
          maxLength={40}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            validateField("name", e.target.value);
          }}
        />
        {errors.name && <span className="text-error">{errors.name}</span>}
      </div>

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

      {/* Confirm Password */}
      <div className="flex flex-col w-full space-y-1.5">
        <label htmlFor="confirm-password" className="form-label">
          Confirm Password:
        </label>
        <input
          id="confirm-password"
          type="password"
          className="form-input"
          name="confirmPassword"
          placeholder="Re-Enter password"
          maxLength={15}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validateField("confirmPassword", e.target.value);
          }}
        />
        {errors.confirmPassword && (
          <span className="text-error">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="pt-5">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-7 py-3.5 w-full"
          severity="primary"
          label="Register"
          loading={isSubmitting}
        />
      </div>

      <p className="mb-0 text-center form-label">
        Have an account?{" "}
        <Link className="text-blue-600 underline" href={"/auth/login"}>
          Login
        </Link>
      </p>
    </form>
  );
}
