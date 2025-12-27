import { SagaInstanceModule } from '@/generic/saga-context/saga-instance/saga-instance.module';
import { SagaLogModule } from '@/generic/saga-context/saga-log/saga-log.module';
import { SagaStepModule } from '@/generic/saga-context/saga-step/saga-step.module';
import { SharedModule } from '@/shared/shared.module';
import { Module } from '@nestjs/common';

const MODULES = [SagaInstanceModule, SagaStepModule, SagaLogModule];

@Module({
  imports: [SharedModule, ...MODULES],
  controllers: [],
  providers: [],
  exports: [...MODULES],
})
export class SagaContextModule {}
