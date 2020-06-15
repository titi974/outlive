import {UUIDGenerator} from "../../adapter/id-generator/UUIDGenerator";

describe('UUIGenerator', () => {
	describe('execute', () => {
		it('avec succès', () => {
			const uuid = new UUIDGenerator().execute()
			expect(uuid.length).toBeGreaterThan(16)
		})
	})
})
