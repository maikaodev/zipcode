import { GetServerSideProps } from "next";
import { DataAddressProps } from "../";
export { default } from "../index";

export const getServerSideProps: GetServerSideProps = async ({
  params: { zipcodeParam },
}) => {
  //
  if (!zipcodeParam) return { props: { data: {} } };

  interface DataRequestProps extends DataAddressProps {
    erro?: boolean;
  }

  let data = {} as DataRequestProps;

  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${zipcodeParam}/json`
    );

    if (response.ok) {
      //
      data = await response.json();
      if (data.erro) throw new Error("Digite um CEP válido!");
    } else {
      throw new Error(
        "Ocorreu um erro inesperado, tente novamente mais tarde!"
      );
    }
  } catch (error) {
    if (error) {
      data = { message: error.message };
    }
  } finally {
    return { props: { data } };
  }
};
