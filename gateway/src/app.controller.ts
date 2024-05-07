import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //////////// User Service ////////////

  @Post('user')
  addUser(@Body() { data }): Observable<any> {
    return this.appService.addUser(data);
  }

  @Get('user/:id')
  getUser(@Param('id') id: string): Observable<string> {
    return this.appService.getUser(id);
  }

  @Put('user')
  updateUser(@Body() { data }): Observable<any> {
    return this.appService.updateUser(data);
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string): Observable<string> {
    return this.appService.deleteUser(id);
  }
}
