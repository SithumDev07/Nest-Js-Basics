import { Injectable, NotFoundException, Param } from "@nestjs/common";
import { CreateFAQDTO } from "./dto/create-faq.dto";
import { UpdateFAQDTO } from "./dto/update-faq.dto";
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

    deleteOne(id: number) {
        this.getOne(id);
        this.faqs = this.faqs.filter(faq => faq.id !== id);
    }

    update(id: number, updateData: UpdateFAQDTO) {
        const faq = this.getOne(id);
        this.deleteOne(id);
        this.faqs.push({ ...faq, ...updateData });
    }
}