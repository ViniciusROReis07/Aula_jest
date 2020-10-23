const generatedId = require("../../src/utils/generateUUID");

describe("generateUUID",() => {
    it ("se é possivel gerar um uuid úníco",() => {
       const id = generatedId();

       expect(id).toBeDefined();
       expect(typeof id).toBe("string");
       expect(id).toMaveLength(36);
    
    })
})