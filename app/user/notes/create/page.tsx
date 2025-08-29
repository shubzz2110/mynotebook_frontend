"use client";

import api from "@/app/lib/axios";
import {
  BreadcrumbOption,
  MultiSelectOption,
  Tag,
} from "@/app/lib/definitions";
import Breadcrumb from "@/app/ui/Breadcrumb";
import Button from "@/app/ui/Button";
import MultiSelect from "@/app/ui/MultiSelect";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function Page() {
  const router = useRouter();
  const [tags, setTags] = useState<MultiSelectOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
  });

  const validateField = async (field: string, value: string) => {
    try {
      await formSchema.validateAt(field, {
        title,
        content,
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
      await formSchema.validate({ title, content }, { abortEarly: false });
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

  const fetchTags = async () => {
    try {
      const response = await api.get("/tags");
      const formattedTags = response.data.map((tag: Tag) => ({
        label: tag.name,
        value: tag.id,
      }));
      setTags(formattedTags);
    } catch (error) {
      toast.error("Unable to fetch tags");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);
  const breadcrumbs: BreadcrumbOption[] = [
    { icon: <Home size={20} />, label: "" },
    { label: "Notes", command: () => router.push("/user/notes") },
    { label: "Create", active: true },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validateForm()) {
      try {
        setIsSubmitting(true);

        await api.post("/notes/", {
          title,
          content,
          tags: selectedTags,
        });

        router.push("/user/notes");
      } catch (error: any) {
        console.log(error);
        toast.error(error.message || "Unexpected error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-7">
      <div className="flex items-start justify-between w-full h-max">
        <div className="flex flex-col space-y-2.5">
          <h1 className="page-heading">Create Note</h1>
          <p className="page-description">
            Please fill the following form to create a note
          </p>
        </div>
      </div>
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex flex-col w-full h-full bg-surface-50 border border-surface-200 rounded-[15px] grow shrink basis-0 p-7">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-5"
        >
          {/* Title */}
          <div className="flex flex-col space-y-2.5">
            <label htmlFor="create_title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="create_title"
              className="form-input bg-white"
              placeholder="Enter note title"
              maxLength={200}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                validateField("title", e.target.value);
              }}
              disabled={isSubmitting}
            />
            {errors.title && <span className="text-error">{errors.title}</span>}
          </div>

          {/* Content */}
          <div className="flex flex-col space-y-2.5">
            <label htmlFor="create_content" className="form-label">
              Content:
            </label>
            <textarea
              name="content"
              id="create_content"
              className="form-input bg-white !rounded-[15px] h-full min-h-80"
              placeholder="Start writing from here..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                validateField("content", e.target.value);
              }}
              disabled={isSubmitting}
            />
            {errors.content && (
              <span className="text-error">{errors.content}</span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-col space-y-2.5">
            <label className="form-label">Tags: </label>
            <MultiSelect
              options={tags}
              className="form-input w-full bg-white"
              placeholder="Select Tags"
              value={selectedTags}
              onChange={(e) => setSelectedTags(e)}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            label="Create"
            severity="primary"
            className="w-max px-6 py-3"
            loading={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
