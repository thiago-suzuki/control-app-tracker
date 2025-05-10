import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    client: {
        NEXT_PUBLIC_API_ROTA: z
          .string()
          .url()
          .default('https://develop-back-rota.rota361.com.br'),
        NEXT_PUBLIC_TOKEN: z.string(),
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string()
      },
    
    runtimeEnv: {
        NEXT_PUBLIC_API_ROTA: process.env.NEXT_PUBLIC_API_ROTA,
        NEXT_PUBLIC_TOKEN: process.env.NEXT_PUBLIC_TOKEN,
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    },
})