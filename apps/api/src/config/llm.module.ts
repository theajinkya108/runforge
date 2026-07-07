import { Global, Module } from '@nestjs/common'
import { createLlmModel } from './llm.provider'
import { LanguageModel } from 'ai'

export const LLM_MODEL_TOKEN = 'LLM_MODEL'

@Global()
@Module({
  providers: [
    {
      provide: LLM_MODEL_TOKEN,
      useFactory: () => createLlmModel(),
    },
  ],
  exports: [LLM_MODEL_TOKEN],
})
export class LlmModule {}