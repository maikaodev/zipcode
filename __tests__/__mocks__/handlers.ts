import { rest } from "msw";

export const handlers = [
  rest.get("https://viacep.com.br/ws/:zipcode/json", async (req, res, ctx) => {
    const { zipcode } = req.params;

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
    if (zipcode === "12345678") {
      return res(
        ctx.status(200),
        ctx.json({
          erro: true,
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
