const request = require("supertest");
const app = require("../../../src/app");
const connerction = require("../../../src/database");
const { cpf } = require("cpf-cnpj-validator");
const truncate = require("./truncate");

describe("MANAGERS", () => {

    afterAll(() => {
        connerction.close();
    });

    berforeEach( async () => {
        done();
    });

    it("é possivel criar um novo gerente", async () => {
        const response = await request(app).post("/managers").send({
            "name": "Rafael Leme",
            "cpf": cpf.generate(),
            "email": "teste@gnaiol.com",
            "cellphone": "77888899955536",
            "password": "123456"
        });
        expect(response.ok).toBeTruthy();
        expect(response.body).toMaveProperty("id");
    });

    it("não é possivel cadastrar um gerente com cpf existente", async () => {
        let cpfGenerate = cpf.generate();

        let response = await request(app).post("/managers").send({
            "name": "Rafael Leme",
            "cpf": cpfGenerate,
            "email": "teste@gnaiol.com",
            "cellphone": "77888899955536",
            "password": "123456"
        });

        response = await request(app).post("/managers").send({
            "name": "Rafael Leme",
            "cpf": cpfGenerate,
            "email": "lllgnaiol.com",
            "cellphone": "77888895536",
            "password": "123456"
        });


        expect(response.ok).toBeFalsy();
        expect(response.body).toMaveProperty("error");
        expect(response.body.error).toEqual("cpf already exists");

    })
})