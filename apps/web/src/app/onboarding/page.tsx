"use client";

import * as React from "react";
import { z } from "zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import GoalSelector from "./GoalSelector";
// ⬇️ Import RELATIF (évite l'alias @)
import { SleepConfig } from "../onboarding/SleepConfig";
import { Button } from "@/components/ui/button";

// --- Schéma Zod (cohérent avec les composants) ---
const OnboardingSchema = z.object({
  goals: z
    .array(z.enum(["fat_loss", "muscle", "energy", "sleep"]))
    .min(1, "Choisis au moins un objectif"),
  bedtimeTarget: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Heure invalide (HH:mm)"),
  sleepDurationMin: z.number().min(360).max(540),
  sleepEnv: z.object({
    dark: z.boolean().default(false),
    temp19c: z.boolean().default(false),
    noScreens: z.boolean().default(false),
    quiet: z.boolean().default(false),
  }),
});

type OnboardingData = z.infer<typeof OnboardingSchema>;

export default function OnboardingPage()
{
  const form = useForm<OnboardingData>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      goals: [],
      bedtimeTarget: "22:30",
      sleepDurationMin: 480,
      sleepEnv: { dark: false, temp19c: false, noScreens: false, quiet: false },
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<OnboardingData> = (data) =>
  {
    // TODO: sauvegarde côté API
    console.log("Onboarding data:", data);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Personnalisez votre parcours</h1>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Étape A — Objectifs (multi-sélection) */}
          <section>
            <GoalSelector />
          </section>

          {/* Étape B — Sommeil (éditable) */}
          <section>
            <SleepConfig />
          </section>

          <div className="pt-2">
            <Button type="submit" disabled={!form.formState.isValid}>
              Suivant
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
