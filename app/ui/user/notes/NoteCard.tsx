"use client";
import { MenuProp, Note } from "@/app/lib/definitions";
import { Edit2, EllipsisVertical, Heart, PinIcon, Trash2 } from "lucide-react";
import moment from "moment";
import React, { useRef, useState } from "react";
import MenuPopup from "../../MenuPopup";
import { useRouter } from "next/navigation";
import DeleteNoteModal from "./DeleteNoteModal";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const [showMenuPopUp, setShowMenuPopUp] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, right: 0 });
  const [showDeleteNoteModal, setShowDeleteNoteModal] =
    useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();

  // Menu items to be passed as props
  const menuItems: MenuProp[] = [
    {
      icon: <i className="bi bi-pencil-square text-xl leading-0"></i>,
      label: "Edit",
      onClick: () => router.push(`/user/notes/${note.id}/edit`),
    },
    {
      icon: <i className="bi bi-trash text-xl leading-0"></i>,
      label: "Delete",
      onClick: () => setShowDeleteNoteModal(true),
    },
  ];
  const handleToggleMenu = () => {
    let rect;
    if (imgRef.current) {
      rect = imgRef.current.getBoundingClientRect();
    } else if (buttonRef.current) {
      rect = buttonRef.current.getBoundingClientRect();
    }

    if (rect) {
      setPopupPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setShowMenuPopUp(!showMenuPopUp);
  };
  return (
    <div
      role="button"
      key={note.id}
      className="note-card"
      onClick={() => router.push(`/user/notes/${note.id}`)}
    >
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between w-full h-max">
          <div className="flex items-center gap-1">
            {note.is_pinned && (
              <i className="bi bi-pin-angle-fill text-xl text-green-600"></i>
            )}
            {note.is_favorite && <i className="bi bi-star-fill text-xl text-yellow-500 leading-none"></i>}
            <h3 className="text-base font-semibold text-gray-900 truncate lg:max-w-72">
              {note.title}
            </h3>
          </div>
          <button
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleMenu();
            }}
            className="text-surface-700 cursor-pointer"
          >
            <i className="bi bi-three-dots-vertical text-xl leading-0"></i>
          </button>
        </div>
        <p className="text-sm text-surface-600 line-clamp-2">{note.content}</p>
        {note.tags.length > 0 && (
          <div className="flex items-center gap-1.5">
            {note.tags.slice(0, 3).map((tag) => (
              <div key={tag.id} className="bg-blue-100 rounded px-2.5 py-1">
                <h1 className="text-blue-600 font-medium text-xs leading-3 capitalize">
                  {tag.name}
                </h1>
              </div>
            ))}
            {note.tags.length > 3 && (
              <span className="text-xs text-blue-600">
                +{note.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <span className="text-xs text-surface-500 font-normal">
          Created {moment(note.created_at).fromNow()}
        </span>
      </div>
      {showMenuPopUp && (
        <MenuPopup
          onClose={() => setShowMenuPopUp(false)}
          position={popupPosition}
          items={menuItems}
        />
      )}
      {showDeleteNoteModal && (
        <DeleteNoteModal
          onClose={() => setShowDeleteNoteModal(false)}
          showModal={showDeleteNoteModal}
          noteId={note.id}
        />
      )}
    </div>
  );
}
