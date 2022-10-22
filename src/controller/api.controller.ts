import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { StockService } from '../service/stock';
import { ApiResult } from '../util/decorator';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  stockService: StockService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { code: 0, msg: 'OK', data: user };
  }

  @Get('/getStockList')
  @ApiResult()
  async getStockList() {
    return await this.stockService.getStockList();
  }

  @Get('/getBoards')
  @ApiResult()
  async getBoards(@Query('code') code) {
    return await this.stockService.getBoards(code);
  }

  @Get('/getGuideLine')
  @ApiResult()
  async getGuideLine(@Query('code') code, @Query('year') year) {
    return await this.stockService.getGuideLine(code, year);
  }

  @Get('/getDailyHis')
  @ApiResult()
  async getDailyHis(@Query('code') code, @Query('year') year) {
    return await this.stockService.getDailyHis(code, year);
  }

  @Get('/getWeekHis')
  @ApiResult()
  async getWeekHis(@Query('code') code) {
    return await this.stockService.getWeekHis(code);
  }

  @Get('/getMonthHis')
  @ApiResult()
  async getMonthHis(@Query('code') code) {
    return await this.stockService.getMonthHis(code);
  }

  @Get('/getAttentionStockList')
  @ApiResult()
  async getAttentionStockList(@Query('date') date) {
    return await this.stockService.getAttentionStockList(date);
  }

  @Get('/analysisStock')
  @ApiResult()
  async analysisStock(@Query('code') code, @Query('date') date) {
    return await this.stockService.analysisStock(code, date);
  }
}
