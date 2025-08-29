"use client";

import api from "@/app/lib/axios";
import {
  MultiSelectOption,
  SelectOption,
  Tab,
  Tag,
} from "@/app/lib/definitions";
import Button from "@/app/ui/Button";
import MultiSelect from "@/app/ui/MultiSelect";
import Select from "@/app/ui/Select";
import TabsMenu from "@/app/ui/TabsMenu";
import Notes from "@/app/ui/user/notes/Notes";
import { Notebook, Pin, Plus, Search, SortAsc, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [currentTab, setCurrentTab] = useState("all");
  const [search, setSearch] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ tags: MultiSelectOption[] }>({
    tags: [],
  });
  const [tags, setTags] = useState<MultiSelectOption[]>([]);

  const router = useRouter();

  // Tabs
  const tabs: Tab[] = [
    { label: "All", value: "all", icon: <i className="bi bi-stickies text-xl leading-0"></i> },
    {
      label: "Favorite",
      value: "favorite",
      icon: <i className="bi bi-star text-xl leading-0"></i>,
    },
    {
      label: "Pinned",
      value: "pinned",
      icon: <i className="bi bi-pin-angle text-xl leading-0"></i>,
    },
  ];
  const [sort, setSort] = useState("latest");
  const sortOptions: SelectOption[] = [
    {
      label: "Latest",
      value: "latest",
    },
    { label: "A - Z", value: "az" },
    {
      label: "Z - A",
      value: "za",
    },
    { label: "Oldest", value: "oldest" },
  ];

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

  const clearFilters = () => {
    setFilters((prev) => ({ ...prev, tags: [] }));
    setShowFilters(false);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-7">
      <div className="flex items-start justify-between w-full h-max">
        <div className="flex flex-col space-y-2.5">
          <h1 className="page-heading">MyNotes</h1>
          <p className="page-description">
            Here you can see all your notes & create new note
          </p>
        </div>
        <Button
          icon={<i className="bi bi-plus-lg text-xl leading-0"></i>}
          severity="primary"
          label="Create new note"
          className="px-5 py-3.5"
          onClick={() => router.push("/user/notes/create")}
        />
      </div>
      <div className="flex flex-col w-full h-full grow shrink basis-0 bg-surface-50 border border-surface-200 rounded-[15px]">
        <TabsMenu
          tabs={tabs}
          currentTab={currentTab}
          onChange={setCurrentTab}
        />
        <div className="flex flex-col w-full h-full gap-5 px-5 pt-5">
          <div className="flex items-center justify-between w-full h-max">
            <div className="flex gap-2.5">
              <div className="relative">
                <i className="bi bi-search text-sm text-surface-600 leading-0 absolute top-2.5 left-3.5"></i>
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="bg-surface-200 border border-surface-200 py-1.5 pr-7 pl-10 rounded-full text-sm text-surface-800 placeholder:text-surface-500 placeholder:font-normal font-semibold focus:outline-none"
                  placeholder="Search a note..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {!showFilters ? (
                <button
                  onClick={() => setShowFilters(true)}
                  className="p-2 bg-surface-200 rounded-full flex items-center text-surface-800 font-semibold text-sm leading-4 tracking-normal cursor-pointer hover:bg-surface-300 transition-colors gap-1"
                >
                  <i className="bi bi-plus-lg text-lg leading-0"></i>
                  <span>Add filters</span>
                </button>
              ) : (
                <button
                  onClick={() => clearFilters()}
                  className="p-2 bg-red-200 rounded-full flex items-center text-red-800 font-semibold text-sm leading-4 tracking-normal cursor-pointer hover:bg-red-300 transition-colors gap-1"
                >
                  <i className="bi bi-plus-lg text-lg leading-0"></i>
                  <span>Clear filters</span>
                </button>
              )}
            </div>
            <div className="flex items-center space-x-2.5">
              <h6 className="text-surface-500 font-normal text-sm leading-4">
                Sort by:
              </h6>
              <Select
                className="p-2 bg-surface-200 rounded-full text-surface-800 font-semibold text-sm leading-4 tracking-normal hover:bg-surface-300"
                options={sortOptions}
                value={sort}
                onChange={setSort}
                icon={<SortAsc size={16} />}
              />
            </div>
          </div>
          {showFilters && (
            <MultiSelect
              options={tags}
              value={filters["tags"]}
              onChange={(newTags) =>
                setFilters((prev) => ({ ...prev, tags: newTags }))
              }
              className="form-input w-[24rem] bg-white"
              placeholder="Filter by tags"
            />
          )}
          <Notes
            sortBy={sort}
            search={search}
            currentTab={currentTab}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
}
