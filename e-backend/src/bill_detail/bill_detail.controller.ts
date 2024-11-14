import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillDetailService } from './bill_detail.service';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';

@Controller('bill-detail')
export class BillDetailController {
  constructor(private readonly billDetailService: BillDetailService) {}


}
