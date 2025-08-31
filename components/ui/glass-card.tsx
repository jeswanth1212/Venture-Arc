"use client";

import React from 'react'
import { cn } from "@/lib/utils"

type GlassCardVariant = "default" | "highlight" | "accent"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassCardVariant
  hoverEffect?: boolean
  children: React.ReactNode
}

export function GlassCard({
  variant = "default",
  hoverEffect = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 border mx-3 sm:mx-0",
        variant === "default" && "bg-white/[0.05] border-white/10",
        variant === "highlight" && "bg-gradient-to-br from-white/[0.08] to-white/[0.03] border-white/10",
        variant === "accent" && "bg-gradient-to-br from-fuchsia-900/10 to-fuchsia-900/5 border-fuchsia-500/20",
        hoverEffect && "hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface GlassCardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function GlassCardGroup({
  className,
  children,
  ...props
}: GlassCardGroupProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
} 