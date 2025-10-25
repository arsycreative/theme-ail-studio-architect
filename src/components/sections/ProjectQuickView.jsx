"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import ProjectMediaCarousel from "@/components/sections/ProjectMediaCarousel";

export default function ProjectQuickView({ open, onClose, project }) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          w-[96vw] lg:w-[94vw] xl:w-[90vw]
          max-w-[1800px] h-[90vh]
          p-0 overflow-hidden rounded-3xl
          border border-border/70 bg-background/95 shadow-2xl
        "
      >
        <div
          className="
            h-full
            grid
            md:grid-cols-[65%_35%]
            lg:grid-cols-[68%_32%]
            xl:grid-cols-[70%_30%]
          "
        >
          {/* Kiri: gambar carousel */}
          <div className="p-4 md:p-6 flex flex-col h-full min-w-0">
            <div className="flex-1 min-h-0 min-w-0">
              <ProjectMediaCarousel
                images={project.images || [project.cover]}
                slug={project.slug}
              />
            </div>
          </div>

          {/* Kanan: informasi */}
          <div className="p-6 md:p-8 space-y-4 overflow-y-auto min-w-0">
            <DialogTitle className="text-2xl md:text-3xl font-semibold">
              {project.title}
            </DialogTitle>

            <DialogDescription className="text-muted-foreground">
              {project.location} • {project.year}
            </DialogDescription>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description ||
                "A calm spatial narrative with precise details and enduring materials."}
            </p>

            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            )}

            <div className="pt-4 flex gap-3">
              <Link
                href={`/case-studies/${project.slug}`}
                className="underline underline-offset-4"
                data-cursor="View"
              >
                Open Case Study
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                href="/contact"
                className="underline underline-offset-4"
                data-cursor="View"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
