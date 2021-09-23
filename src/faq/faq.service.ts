import { Injectable, NotFoundException, Param } from "@nestjs/common";
import { CreateFAQDTO } from "./dto/create-faq.dto";
import { FAQ } from "./entities/FAQEntity";

@Injectable()
export class FAQService {
    private faqs: FAQ[] = [];

    getAll(): FAQ[] {
        return this.faqs;
    }

    getOne(id: number): FAQ {
        const faq = this.faqs.find(faq => faq.id === id);
        if (!faq) {
            throw new NotFoundException(`Faq With id:${id} is not found.`)
        }
        return faq;
    }

    create(faqData: CreateFAQDTO) {
        this.faqs.push({
            id: this.faqs.length + 1,
            ...faqData
        })
    }

}