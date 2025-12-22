import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// cn() : Tailwind CSS의 클래스들을 보다 더 편리하게 작성할 수 있도록 도와주는 헬퍼 함수
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
