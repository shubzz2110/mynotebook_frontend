"use client";

import api from "@/app/lib/axios";
import { Note } from "@/app/lib/definitions";
import NoteDetailsSkeleton from "@/app/ui/user/notes/NoteDetailsSkeleton";
import { ArrowLeft, EditIcon, Pin, Share2, Star, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

export default function Page() {
  const router = useRouter();
  const params = useParams();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNote = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/notes/${params.id}/`);
      setNote(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch Note");
    } finally {
      setLoading(false);
    }
  };

  const toggleMarkNoteAsFavorite = async () => {
    try {
      const response = await api.patch(`/notes/${params.id}/`, {
        is_favorite: !note?.is_favorite
      })
      if(response && response.status === 200) {
        setNote(response.data)
        if(note?.is_favorite) {
          toast.success("Note marked as favorite")
        } else {
          toast.success("Note removed from favorite")
        }
      }
    } catch (error) {
      toast.error("Unable to Mark favorite");
    }
  }

  const toggleMarkNoteAsPinned = async () => {
    try {
      const response = await api.patch(`/notes/${params.id}/`, {
        is_pinned: !note?.is_pinned
      })
      if(response && response.status === 200) {
        setNote(response.data)
        if(note?.is_favorite) {
          toast.success("Note marked as pinned")
        } else {
          toast.success("Note removed from pinned")
        }
      }
    } catch (error) {
      toast.error("Unable to Mark pinned");
    }
  }

  const onConfirmDelete = async () => {
    try {
      const response = await api.delete(`/notes/${params.id}/`);

      if (response?.status === 204 || response?.status === 200) {
        toast.success("Note has been deleted successfully");
        router.push("/user/notes");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete note");
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  if (loading) return <NoteDetailsSkeleton />;

  if (!note) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-surface-600">Note not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full gap-7">
      <div className="flex items-start justify-between w-full h-max">
        <div className="flex flex-col space-y-2.5">
          <div className="flex gap-2.5 items-start">
            <button
              onClick={() => router.push("/user/notes")}
              className="p-2 rounded-md hover:bg-surface-200 text-surface-800 cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            {/* Title */}
            <h1 className="page-heading xl:max-w-4xl">{note.title}</h1>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2.5">
          {note.is_favorite ? (
            <button
              title="Mark as favourite"
              onClick={() => toggleMarkNoteAsFavorite()}
              className={`flex items-center justify-center min-w-10 min-h-10 w-10 h-10 rounded-md hover:bg-surface-200 cursor-pointer transition-all duration-300 ease-in-out text-yellow-500`}
            >
              <i className="bi bi-star-fill text-xl leading-none"></i>
            </button>
          ) : (
            <button
              title="Mark as favourite"
              onClick={() => toggleMarkNoteAsFavorite()}
              className={`flex items-center justify-center min-w-10 min-h-10 w-10 h-10 rounded-md hover:bg-surface-200 cursor-pointer transition-all duration-300 ease-in-out text-surface-800`}
            >
              <i className="bi bi-star text-xl leading-none"></i>
            </button>
          )}
          {note.is_pinned ? (
            <button
              title="Pin this note"
              onClick={() => toggleMarkNoteAsPinned()}
              className={`flex items-center justify-center min-w-10 min-h-10 w-10 h-10 rounded-md hover:bg-surface-200 cursor-pointer transition-all duration-300 ease-in-out text-green-600`}
            >
              <i className="bi bi-pin-angle-fill text-xl leading-none"></i>
            </button>
          ) : (
            <button
              title="Pin this note"
              onClick={() => toggleMarkNoteAsPinned()}
              className={`flex items-center justify-center min-w-10 min-h-10 w-10 h-10 rounded-md hover:bg-surface-200 cursor-pointer transition-all duration-300 ease-in-out text-surface-800`}
            >
              <i className="bi bi-pin-angle text-xl leading-none"></i>
            </button>
          )}

          <button
            title="Share this note"
            className={`flex items-center justify-center min-w-10 min-h-10 w-10 h-10 rounded-md hover:bg-surface-200 cursor-pointer transition-all duration-300 ease-in-out ${
              note.is_shared ? "text-green-600" : "text-surface-800"
            }`}
          >
            <Share2 size={20} />
          </button>
          <span className="text-surface-400">|</span>
          <button
            title="Edit this note"
            onClick={() => router.push(`/user/notes/${note.id}/edit`)}
            className="flex items-center justify-center min-w-10 min-h-10 w-10 h-10 rounded-md hover:bg-blue-200 text-blue-600 cursor-pointer transition-all duration-300 ease-in-out"
          >
            <EditIcon size={20} />
          </button>
          <button
            title="Delete this note"
            onClick={() => onConfirmDelete()}
            className="flex items-center justify-center min-w-10 min-h-10 w-10 h-10 rounded-md hover:bg-red-200 text-red-600 cursor-pointer transition-all duration-300 ease-in-out"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 overflow-hidden">
        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-5 prose max-w-none overflow-y-auto">
          <p>{note.content}</p>
        </div>

        {/* Sidebar Metadata */}
        <div className="flex flex-col h-full gap-7">
          <div className="flex flex-col space-y-2.5">
            <h3 className="text-sm font-semibold text-surface-800">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {note.tags.length > 0 ? (
                note.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold capitalize"
                  >
                    {tag.name}
                  </span>
                ))
              ) : (
                <p className="text-sm text-surface-500">No tags</p>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2.5">
            <h3 className="text-sm font-semibold text-surface-800">Owner</h3>
            <p className="text-sm text-surface-800 font-normal">{note.owner}</p>
          </div>

          <div className="flex flex-col space-y-2.5">
            <h3 className="text-sm font-semibold text-surface-800">Status</h3>
            <ul className="space-y-1 text-sm text-surface-800 font-normal">
              <li>📌 Pinned: {note.is_pinned ? "Yes" : "No"}</li>
              <li>⭐ Favorite: {note.is_favorite ? "Yes" : "No"}</li>
              <li>🔗 Shared: {note.is_shared ? "Yes" : "No"}</li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2.5">
            <h3 className="text-sm font-semibold text-surface-800">Dates</h3>
            <p className="text-sm text-surface-800 font-normal">
              Created: {moment(note.created_at).format("MMM DD, YYYY")}
            </p>
            <p className="text-sm text-surface-800 font-normal">
              Updated: {moment(note.updated_at).format("MMM DD, YYYY")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
