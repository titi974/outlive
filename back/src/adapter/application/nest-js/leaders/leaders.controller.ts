import {Controller, Get} from '@nestjs/common';

@Controller('leaders')
export class LeadersController {

    @Get('randoms')
    getRandom() {

    }

}
