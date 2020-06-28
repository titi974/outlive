import { Test, TestingModule } from '@nestjs/testing'
import { AbrisService } from './abris.service'

describe('AbrisService', () => {
    let service: AbrisService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AbrisService],
        }).compile()

        service = module.get<AbrisService>(AbrisService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
