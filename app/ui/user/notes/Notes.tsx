"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import Skeleton from "../../Skeleton";
import Pagination from "../../Pagination";
import NoteCard from "./NoteCard";
import { Note } from "@/app/lib/definitions";
import { fetchNotes } from "@/app/lib/api/notes";

interface NotesComponentProps {
  currentTab: string; // Active tab (e.g. "all", "favorite", "pinned")
  search: string;     // Incoming search query (from parent)
  filters: Record<string, any>; // Filters object (tags, categories, etc.)
  sortBy: string;     // Sorting option
}

type NotesResponse = {
  notes: Note[];
  totalCount: number;
};

/**
 * Notes Component
 * ---------------------------------------------------
 * Displays a paginated, searchable, and filterable
 * list of notes. Uses TanStack Query for data fetching
 * with automatic caching, revalidation, and state handling.
 */
export default function Notes({
  currentTab,
  filters,
  search,
  sortBy,
}: NotesComponentProps) {
  // --- Local state ---
  const [pageSize] = useState(9);       // Number of notes per page
  const [page, setPage] = useState(1);  // Current pagination page
  const [searchTerm, setSearchTerm] = useState(search); // Controlled search term

  /**
   * Debounced search handler
   * - Waits 500ms after the user stops typing before
   *   triggering a new query.
   * - Prevents excessive API calls while typing.
   */
  const debouncedSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
    setPage(1); // Reset pagination when new search is applied
  }, 500);

  /**
   * Effect: Update searchTerm when the incoming `search` prop changes.
   * - Useful if the search bar is outside this component.
   * - Runs through the debounced handler.
   */
  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  /**
   * Fetch notes using TanStack Query
   * - queryKey: determines when the query should refetch (any dependency change)
   * - queryFn: API call function
   */
  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ["notes", searchTerm, sortBy, filters, page, pageSize, currentTab],
    queryFn: () =>
      fetchNotes({
        search: searchTerm,
        sortBy,
        filters,
        page,
        pageSize,
        currentTab,
      }),
  });

  // --- Derived values from API response ---
  const notes = data?.notes || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  /**
   * UI: Loading skeletons
   * - Shown while API call is in progress.
   */
  const renderLoadingState = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {Array.from({ length: pageSize }).map((_, i) => (
        <Skeleton key={i} className="h-[136px] w-full !rounded-[15px]" />
      ))}
    </div>
  );

  /**
   * UI: Empty state
   * - Shown when no notes are returned from the API.
   * - Differentiates between "no search results" and "no notes at all".
   */
  const renderEmptyState = () => (
    <div className="flex items-center justify-center w-full py-10 text-gray-600">
      {searchTerm ? (
        <>
          No results found for{" "}
          <span className="font-semibold px-1">“{searchTerm}”</span>
        </>
      ) : (
        <>
          No notes found.{" "}
          <span className="font-semibold pl-1">Create one!</span>
        </>
      )}
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* Loading, Data, or Empty */}
      {isLoading ? (
        renderLoadingState()
      ) : notes.length > 0 ? (
        <div className="grow shrink basis-0 flex flex-col w-full h-full overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {notes.map((note: Note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      ) : (
        renderEmptyState()
      )}

      {/* Pagination (only show if multiple pages exist) */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(p) => setPage(p)}
        />
      )}
    </div>
  );
}
