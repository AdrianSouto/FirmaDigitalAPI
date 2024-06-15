/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ValidationGuard } from './validation/validation.guard';
@UseGuards(ValidationGuard)
@Controller()
export class AppController {
}
