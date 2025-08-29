import React from "react";
import Dialog from "../../Dialog";
import Button from "../../Button";
import { toast } from "react-toastify";
import api from "@/app/lib/axios";
import { useQueryClient } from "@tanstack/react-query";

type ModalProps = {
  showModal: boolean;
  onClose: () => void;
  noteId: string | number;
};

export default function DeleteNoteModal({
  showModal,
  onClose,
  noteId,
}: ModalProps) {
  const queryClient = useQueryClient();

  const onConfirmDelete = async () => {
    try {
      const response = await api.delete(`/notes/${noteId}/`);

      if (response?.status === 204 || response?.status === 200) {
        toast.success("Note has been deleted successfully");

        // Invalidate all queries related to notes
        queryClient.invalidateQueries({ queryKey: ["notes"] });

        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete note");
    }
  };
  return (
    <Dialog
      className="w-[36rem] min-h-20 p-7"
      isOpen={showModal}
      onClose={onClose}
    >
      <div className="flex flex-col space-y-4">
        {/* Title */}
        <h2 className="text-2xl font-bold text-surface-900">Delete Note</h2>

        {/* Message */}
        <p className="text-surface-600 text-sm font-normal leading-relaxed">
          Are you sure you want to delete this note? This action cannot be
          undone and the note will be permanently removed.
        </p>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            severity="secondary"
            className="rounded-full px-7 py-3"
            onClick={() => onClose()}
            label="Close"
          />
          <Button
            severity="danger"
            className="rounded-full px-7 py-3"
            onClick={() => onConfirmDelete()}
            label="Delete"
          />
        </div>
      </div>
    </Dialog>
  );
}
