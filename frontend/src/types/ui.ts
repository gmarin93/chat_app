import { ButtonHTMLAttributes, FormHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "light"
    | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right" | "top" | "bottom";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
}

export interface ErrorMessageProps {
  error: string;
  onDismiss?: () => void;
}

//Forms types
export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
}

export interface FormHandle {
  reset: () => void;
  submit: () => void;
  getFormElement: () => HTMLFormElement | null;
}

export interface MessageTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface SendButtonProps {
  hasMessage: boolean;
  onClick: () => void;
}

export interface SidebarHeaderAction {
  icon: ReactNode;
  onClick?: () => void;
  label: string;
}

export interface SidebarHeaderProps {
  title: string;
  avatar: ReactNode;
  subtitle?: string;
  extra?: ReactNode;
  actions?: SidebarHeaderAction[];
}

export interface SidebarListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
  header: ReactNode;
  searchPlaceholder?: string;
  filterKey: (item: T) => string;
  emptyMessage?: string;
  emptySearchMessage?: string;
}