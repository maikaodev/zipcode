// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${id}/json`);
    const data = await response.json();

    if (data.erro) {
      throw new Error();
    }
    res.status(200).json({
      cep: data.cep,
      logradouro: data.logradouro,
      localidade: data.localidade,
      uf: data.uf,
    });
  } catch (error) {
    return res.status(406).send({ message: "Digite um CEP válido!" });
  }
}

export default handler;
