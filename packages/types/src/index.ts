import { z } from 'zod';

// User schemas
export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  displayName: z.string().min(1).max(100),
  createdAt: z.date(),
  locale: z.enum(['fr', 'es']).default('fr'),
  tz: z.string().default('Europe/Zurich'),
  heightCm: z.number().int().min(100).max(250).optional(),
  weightKg: z.number().min(30).max(300).optional(),
  birthDate: z.date().optional(),
  targetWeightKg: z.number().min(30).max(300).optional(),
  primaryGoal: z.enum(['fat-loss', 'energy', 'muscle', 'health']).optional(),
  timeAvailable: z.enum(['15-20', '25-30', '45-60', 'variable']).optional(),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  displayName: z.string().min(1).max(100),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const OnboardingSchema = z.object({
  age: z.number().int().min(18).max(80),
  heightCm: z.number().int().min(100).max(250),
  weightKg: z.number().min(30).max(300),
  targetWeightKg: z.number().min(30).max(300),
  primaryGoal: z.enum(['fat-loss', 'energy', 'muscle', 'health']),
  timeAvailable: z.enum(['15-20', '25-30', '45-60', 'variable']),
  bedtimeTarget: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/), // HH:MM format
});

// Sleep schemas
export const SleepLogSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  date: z.date(),
  bedtime: z.date().optional(),
  wakeTime: z.date().optional(),
  durationM: z.number().int().min(0).max(1440).optional(),
  quality: z.number().int().min(1).max(5).optional(),
  notes: z.string().max(500).optional(),
});

export const CreateSleepLogSchema = SleepLogSchema.omit({ id: true, userId: true });

export const SleepChecklistSchema = z.object({
  noScreens90min: z.boolean(),
  hotShower2h: z.boolean(),
  readingRoutine: z.boolean(),
  room19degrees: z.boolean(),
  totalDarkness: z.boolean(),
  phoneOutside: z.boolean(),
});

// Hormone test schemas
export const HormoneScoresSchema = z.object({
  testoOestro: z.number().min(0).max(5),
  ghrelineLeptine: z.number().min(0).max(5),
  cortisolMelatonine: z.number().min(0).max(5),
  insulineGlucagon: z.number().min(0).max(5),
});

export const HormoneTestSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  createdAt: z.date(),
  scores: HormoneScoresSchema,
  answers: z.record(z.boolean()),
  summary: z.string(),
  priorityOrder: z.array(z.enum(['testoOestro', 'ghrelineLeptine', 'cortisolMelatonine', 'insulineGlucagon'])),
});

export const CreateHormoneTestSchema = z.object({
  answers: z.record(z.boolean()),
});

// Workout schemas
export const ExerciseEnum = z.enum(['SWING', 'SQUAT', 'PRESS', 'PUSHUP']);

export const WorkoutSetSchema = z.object({
  id: z.string().cuid(),
  sessionId: z.string().cuid(),
  order: z.number().int().min(1),
  exercise: ExerciseEnum,
  reps: z.number().int().min(0),
  weightKg: z.number().min(0).optional(),
});

export const WorkoutSessionSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  date: z.date(),
  pyramidTop: z.number().int().min(6).max(15),
  durationMin: z.number().int().min(5).max(60),
  afterburnH: z.number().int().min(12).max(48),
  perceivedEff: z.number().int().min(1).max(10).optional(),
  totalReps: z.number().int().min(0),
  notes: z.string().max(500).optional(),
  sets: z.array(WorkoutSetSchema),
});

export const CreateWorkoutSessionSchema = z.object({
  pyramidTop: z.number().int().min(6).max(15),
  sets: z.array(WorkoutSetSchema.omit({ id: true, sessionId: true })),
  perceivedEff: z.number().int().min(1).max(10).optional(),
  notes: z.string().max(500).optional(),
});

// Habit schemas
export const HabitSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  key: z.string(),
  enabled: z.boolean().default(true),
  progress: z.record(z.any()).optional(),
});

export const HabitProgressSchema = z.object({
  date: z.string(), // YYYY-MM-DD
  completed: z.boolean(),
  notes: z.string().optional(),
});

// Journal schemas
export const JournalEntrySchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  createdAt: z.date(),
  mood: z.number().int().min(1).max(5).optional(),
  energy: z.number().int().min(1).max(5).optional(),
  text: z.string().max(1000).optional(),
});

export const CreateJournalEntrySchema = JournalEntrySchema.omit({ id: true, userId: true, createdAt: true });

// Badge schemas
export const BadgeSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  key: z.string(),
  acquiredAt: z.date(),
});

// API Response schemas
export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.any().optional(),
});

export const ApiSuccessSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
});

// Stats schemas
export const WeeklyStatsSchema = z.object({
  sleep: z.object({
    avgDuration: z.number(),
    avgQuality: z.number(),
    streak: z.number(),
  }),
  workouts: z.object({
    count: z.number(),
    totalReps: z.number(),
    avgRPE: z.number(),
  }),
  badges: z.array(BadgeSchema),
  currentAfterburn: z.object({
    active: z.boolean(),
    hoursRemaining: z.number().optional(),
  }).optional(),
});

// Export types
export type User = z.infer<typeof UserSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type OnboardingInput = z.infer<typeof OnboardingSchema>;
export type SleepLog = z.infer<typeof SleepLogSchema>;
export type CreateSleepLogInput = z.infer<typeof CreateSleepLogSchema>;
export type SleepChecklist = z.infer<typeof SleepChecklistSchema>;
export type HormoneScores = z.infer<typeof HormoneScoresSchema>;
export type HormoneTest = z.infer<typeof HormoneTestSchema>;
export type CreateHormoneTestInput = z.infer<typeof CreateHormoneTestSchema>;
export type Exercise = z.infer<typeof ExerciseEnum>;
export type WorkoutSet = z.infer<typeof WorkoutSetSchema>;
export type WorkoutSession = z.infer<typeof WorkoutSessionSchema>;
export type CreateWorkoutSessionInput = z.infer<typeof CreateWorkoutSessionSchema>;
export type Habit = z.infer<typeof HabitSchema>;
export type HabitProgress = z.infer<typeof HabitProgressSchema>;
export type JournalEntry = z.infer<typeof JournalEntrySchema>;
export type CreateJournalEntryInput = z.infer<typeof CreateJournalEntrySchema>;
export type Badge = z.infer<typeof BadgeSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
export type ApiSuccess = z.infer<typeof ApiSuccessSchema>;
export type WeeklyStats = z.infer<typeof WeeklyStatsSchema>;

// Hormone test questions (constants)
export const HORMONE_QUESTIONS = {
  testoOestro: [
    'Je manque de motivation pour mes projets personnels',
    'J\'ai des difficultés à prendre du muscle malgré l\'entraînement',
    'Ma libido a diminué ces derniers mois',
    'Je me sens moins confiant qu\'avant',
    'J\'ai tendance à accumuler de la graisse au niveau du ventre'
  ],
  ghrelineLeptine: [
    'J\'ai souvent faim même après avoir mangé',
    'Je grignote fréquemment entre les repas',
    'J\'ai des fringales sucrées difficiles à contrôler',
    'Je ne ressens pas la satiété rapidement',
    'Mon appétit varie beaucoup d\'un jour à l\'autre'
  ],
  cortisolMelatonine: [
    'J\'ai du mal à m\'endormir le soir',
    'Je me réveille souvent la nuit',
    'Je me sens stressé même sans raison apparente',
    'J\'ai des tensions musculaires fréquentes',
    'Mon sommeil n\'est pas réparateur'
  ],
  insulineGlucagon: [
    'J\'ai des coups de fatigue après les repas',
    'J\'ai des envies de sucré en fin d\'après-midi',
    'Mon énergie fluctue beaucoup dans la journée',
    'J\'ai tendance à stocker facilement du gras',
    'Je ressens des hypoglycémies (tremblements, sueurs)'
  ]
} as const;

export const HORMONE_LABELS = {
  testoOestro: 'Testostérone/Œstrogène',
  ghrelineLeptine: 'Ghréline/Leptine',
  cortisolMelatonine: 'Cortisol/Mélatonine',
  insulineGlucagon: 'Insuline/Glucagon'
} as const;