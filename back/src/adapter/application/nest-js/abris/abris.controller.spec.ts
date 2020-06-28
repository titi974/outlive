import { Test, TestingModule } from '@nestjs/testing'
import { AbrisController } from './abris.controller'

describe('Abris Controller', () => {
    let controller: AbrisController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AbrisController],
        }).compile()

        controller = module.get<AbrisController>(AbrisController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
