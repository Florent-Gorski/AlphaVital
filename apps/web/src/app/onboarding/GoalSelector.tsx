"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const GOAL_OPTIONS = [
  { id: "fat_loss", label: "Perdre du gras" },
  { id: "muscle", label: "Gagner du muscle" },
  { id: "energy", label: "Augmenter l’énergie" },
  { id: "sleep", label: "Mieux dormir" },
];

export default function GoalSelector()
{
  const { control } = useFormContext();

  return (
    <Controller
      name="goals" // string[]
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <div className="space-y-3">
          <p className="mb-2 text-base font-medium">
            Quel est votre objectif principal ?{" "}
            <span className="block text-sm text-muted-foreground">
              Vous pouvez sélectionner plusieurs objectifs
            </span>
          </p>

          <ToggleGroup
            type="multiple"
            value={field.value ?? []}
            onValueChange={(val) => field.onChange(val)}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Objectifs principaux"
          >
            {GOAL_OPTIONS.map((opt) => (
              <ToggleGroupItem
                key={opt.id}
                value={opt.id}
                aria-label={opt.label}
                className="h-12 justify-center rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary data-[state=on]:bg-primary/10 data-[state=on]:border-primary"
              >
                {opt.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )}
    />
  );
}
