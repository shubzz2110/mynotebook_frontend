import { ReactElement } from "react"

export type MenuProp = {
  icon: ReactElement,
  label: string,
  onClick: () => void;
}

export type Tab = {
  icon?: ReactElement;
  label: string;
  value: string;
}

export type SelectOption = {
  label: string;
  value: string;
  icon?: ReactElement;
};

export type BreadcrumbOption = {
  label: string;
  icon?: ReactElement;
  command?: () => void;
  className?: string;
  active?: boolean;
}

export type Tag = {
  id: number;
  name: string;
}

export type MultiSelectOption = {
  label: string;
  value: string | number;
  icon?: ReactElement;
}

export type Note = {
  content: string;
  created_at: string;
  id: number;
  is_favorite: false
  is_pinned: false;
  is_shared: false;
  owner: string;
  tags: Tag[];
  title: string;
  updated_at: string;
}