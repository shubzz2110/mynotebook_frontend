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
import ToggleSwitch from "@/app/ui/ToggleSwitch";
import { Home, Pin, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function Page() {
  const router = useRouter();
  const params = useParams();

  const [tags, setTags] = useState<MultiSelectOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [is_favorite, setIs_Favorite] = useState<boolean>(false);
  const [is_pinned, setIs_Pinned] = useState<boolean>(false);
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

  const fetchNote = async () => {
    try {
      const response = await api.get(`/notes/${params.id}/`);
      const note = response.data;
      setTitle(note.title);
      setContent(note.content);
      setIs_Favorite(note.is_favorite);
      setIs_Pinned(note.is_pinned);
      setSelectedTags(note.tags.map((tag: Tag) => tag.id));
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch note");
    }
  };

  useEffect(() => {
    fetchTags();
    fetchNote();
  }, []);
  const breadcrumbs: BreadcrumbOption[] = [
    { icon: <Home size={20} />, label: "" },
    { label: "Notes", command: () => router.push("/user/notes") },
    { label: "Edit", active: true },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validateForm()) {
      try {
        setIsSubmitting(true);
        await api.put(`/notes/${params.id}/`, {
          title,
          content,
          tag_ids: selectedTags,
          is_favorite,
          is_pinned,
        });

        toast.success("Note has been updated successfully");
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
          <h1 className="page-heading">Edit Note</h1>
          <p className="page-description">Update the note details here</p>
        </div>
      </div>
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex flex-col w-full h-full bg-surface-50 border border-surface-200 rounded-[15px] grow shrink basis-0 p-7">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-5"
        >
          {/* Mark as favorite and pin notes */}
          <div className="flex items-center gap-5">
            <label
              htmlFor="edit-mark-fav"
              className="flex items-center flex-row space-x-2.5"
            >
              <span className="form-label flex gap-1">
                <Star size={16} />
                Make Favorite:
              </span>
              <ToggleSwitch
                checked={is_favorite}
                onChange={(e) => setIs_Favorite(e)}
                inputId="edit-mark-fav"
              />
            </label>
            <label
              htmlFor="edit-pin"
              className="flex items-center flex-row space-x-2.5"
            >
              <span className="form-label flex gap-1">
                <Pin size={16} className="rotate-45" />
                Pin Note :
              </span>
              <ToggleSwitch
                checked={is_pinned}
                onChange={(e) => setIs_Pinned(e)}
                inputId="edit-pin"
              />
            </label>
          </div>
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

          {/* CTA Buttons */}
          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              label="Cancel"
              severity="secondary"
              className="w-max px-6 py-3"
              onClick={() => router.push("/user/notes")}
            />
            <Button
              type="submit"
              label="Update"
              severity="primary"
              className="w-max px-6 py-3"
              loading={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
