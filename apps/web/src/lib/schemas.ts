import { z } from "zod";

export const OnboardingSchema = z.object({
  // Informations de base
  age: z.number().min(18, "L'âge doit être d'au moins 18 ans").max(80, "L'âge doit être inférieur à 80 ans"),
  heightCm: z.number().min(150, "La taille doit être d'au moins 150 cm").max(220, "La taille doit être inférieure à 220 cm"),
  weightKg: z.number().min(50, "Le poids doit être d'au moins 50 kg").max(200, "Le poids doit être inférieur à 200 kg"),
  targetWeightKg: z.number().min(50, "Le poids objectif doit être d'au moins 50 kg").max(200, "Le poids objectif doit être inférieur à 200 kg"),
  
  // Objectifs (multi-sélection)
  goals: z.array(z.enum(["fat_loss", "muscle", "energy", "sleep"])).min(1, "Choisir au moins un objectif"),
  
  // Temps d'entraînement
  timeAvailable: z.enum(["15-20", "25-30", "45-60", "variable"], {
    required_error: "Veuillez sélectionner votre temps disponible"
  }),
  
  // Configuration sommeil
  bedtimeTarget: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Format d'heure invalide (HH:mm)"),
  sleepDurationMin: z.number().min(360, "Durée minimum 6h").max(540, "Durée maximum 9h"),
  sleepEnv: z.object({
    roomDark: z.boolean(),
    temp19c: z.boolean(),
    noScreens: z.boolean(),
    noiseControlled: z.boolean(),
  }),
});

export type OnboardingData = z.infer<typeof OnboardingSchema>;

export const defaultOnboardingValues: OnboardingData = {
  age: 45,
  heightCm: 175,
  weightKg: 85,
  targetWeightKg: 75,
  goals: [],
  timeAvailable: "25-30",
  bedtimeTarget: "22:30",
  sleepDurationMin: 480,
  sleepEnv: {
    roomDark: false,
    temp19c: false,
    noScreens: false,
    noiseControlled: false,
  },
};