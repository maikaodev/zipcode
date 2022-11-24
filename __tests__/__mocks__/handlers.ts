import { rest } from "msw";

export const handlers = [
  rest.get("https://viacep.com.br/ws/:zipcode/json", async (req, res, ctx) => {
    const { zipcode } = req.params;

    if (zipcode === "12345678") {
      return res(
        ctx.status(200),
        ctx.json({
          message: "Digite um CEP válido!",
        })
      );
    }
    if (zipcode === "57000001") {
      return res(
        ctx.status(200),
        ctx.json({
          cep: zipcode,
          street: "Rua Pantera Negra",
          state: "Wakanda",
          city: "Wakanda",
        })
      );
    }
    return res(
      ctx.status(406),
      ctx.json({
        message: "Ocorreu um erro inesperado, tente novamente mais tarde!",
      })
    );
  }),
];
