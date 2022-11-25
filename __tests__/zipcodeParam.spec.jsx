import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { getServerSideProps } from "src/pages/[zipcodeParam]";

describe("getServerSideProps", () => {
  //
  it("should be a good request with api mocked", async () => {
    const result = await getServerSideProps({
      params: { zipcodeParam: "57000001" },
    });

    expect(result.props.data.cep).toEqual("57000001");
    expect(result.props.data.street).toEqual("Rua Pantera Negra");
    expect(result.props.data.state).toEqual("Wakanda");
    expect(result.props.data.city).toEqual("Wakanda");
  });

  it("should be a good request with api mocked, but the zip code was not found", async () => {
    const result = await getServerSideProps({
      params: { zipcodeParam: "12345678" },
    });

    expect(result.props.data.message).toEqual("Digite um CEP válido!");
  });

  it("should be a bad request with api mocked", async () => {
    const result = await getServerSideProps({
      params: { zipcodeParam: "87654321" },
    });

    expect(result.props.data.message).toEqual(
      "Ocorreu um erro inesperado, tente novamente mais tarde!"
    );
  });

  it("should be an empty object", async () => {
    const result = await getServerSideProps({ params: { zipcodeParam: "" } });

    expect(result.props.data).toEqual({});
  });
});
