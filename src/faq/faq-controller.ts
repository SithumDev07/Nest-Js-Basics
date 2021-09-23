import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateFAQDTO } from './dto/create-faq.dto';
import { FAQ } from './entities/FAQEntity';
import { FAQService } from './faq.service';

@Controller('faqs')
export class FAQController {
    constructor(private readonly faqService: FAQService) { }

    @Get()
    getAll(): FAQ[] {
        return this.faqService.getAll();
    }

    @Get("/:id")
    getOne(@Param("id") id: number): FAQ {
        return this.faqService.getOne(id);
    }

    @Post()
    create(@Body() faqData: CreateFAQDTO) {
        return this.faqService.create(faqData);
    }
}