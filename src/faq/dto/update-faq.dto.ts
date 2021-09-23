import { PartialType } from "@nestjs/mapped-types";
import { CreateFAQDTO } from "./create-faq.dto";

export class UpdateFAQDTO extends PartialType(CreateFAQDTO) {

}