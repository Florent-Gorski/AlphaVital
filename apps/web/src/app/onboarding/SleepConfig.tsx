"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function SleepConfig()
{
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Heure de coucher */}
      <Controller
        name="bedtimeTarget"
        control={control}
        defaultValue="22:30"
        render={({ field }) => (
          <div className="grid gap-2">
            <Label htmlFor="bedtimeTarget">Heure de coucher souhaitée</Label>
            <Input
              id="bedtimeTarget"
              type="time"
              step={300}
              aria-label="Heure de coucher souhaitée"
              value={field.value}
              onChange={field.onChange}
            />
          </div>
        )}
      />

      {/* Durée cible */}
      <Controller
        name="sleepDurationMin"
        control={control}
        defaultValue={480}
        render={({ field }) =>
        {
          const val = Number(field.value ?? 480);
          return (
            <div className="grid gap-2">
              <Label>Durée de sommeil visée</Label>
              <div className="flex items-center gap-3">
                <Slider
                  min={360}
                  max={540}
                  step={15}
                  value={[val]}
                  onValueChange={(v) => field.onChange(v[0])}
                  className="w-full"
                  aria-label="Durée de sommeil visée"
                />
                <span className="w-16 text-right tabular-nums">
                  {Math.floor(val / 60)}h{String(val % 60).padStart(2, "0")}
                </span>
              </div>
            </div>
          );
        }}
      />

      {/* Environnement */}
      <div className="grid gap-3">
        <Label>Évalue ton environnement de sommeil</Label>
        <div className="grid sm:grid-cols-2 gap-3">
          <EnvCheckbox name="sleepEnv.dark" label="Chambre sombre" />
          <EnvCheckbox name="sleepEnv.temp19c" label="Température ~19°C" />
          <EnvCheckbox name="sleepEnv.noScreens" label="Aucun écran dans la chambre" />
          <EnvCheckbox name="sleepEnv.quiet" label="Silence / bruits blancs" />
        </div>
      </div>
    </div>
  );
}

function EnvCheckbox({ name, label }: { name: string; label: string })
{
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <label
          htmlFor={name}
          className="flex items-center gap-3 rounded-xl border p-3 hover:bg-muted cursor-pointer"
        >
          <Checkbox
            id={name}
            aria-label={label}
            checked={!!field.value}
            onCheckedChange={field.onChange}
          />
          <span>{label}</span>
        </label>
      )}
    />
  );
}
