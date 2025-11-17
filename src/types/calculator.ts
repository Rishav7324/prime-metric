import type { LucideIcon } from "lucide-react";

export type Calculator = {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  implemented: boolean;
  icon: LucideIcon;
};
