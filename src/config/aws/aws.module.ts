import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws.service';

@Module({
  providers: [AwsS3Service],
  exports: [AwsS3Service],
})
export class AwsS3Module {}
