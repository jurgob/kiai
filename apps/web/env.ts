
import { z } from 'zod'

export const envSchema = z.object({
  HF_TOKEN: z.string().startsWith('hf_'),
  AUTH: z.preprocess((val) => val === 'true', z.boolean()).default(false),
  ENV: z
    .union([
    z.literal('development'),
    z.literal('testing'),
    z.literal('production'),
    ])
    .default('development'),
  })

export type Env = z.infer<typeof envSchema>

export const env = envSchema.parse(process.env)