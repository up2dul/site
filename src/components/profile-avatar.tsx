"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  src: string;
  alt: string;
  fallback: string;
}

export function ProfileAvatar({ src, alt, fallback }: ProfileAvatarProps) {
  return (
    <Avatar className="size-16 rounded-lg">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
