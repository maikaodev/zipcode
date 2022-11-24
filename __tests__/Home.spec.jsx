import mockRouter from "next-router-mock";
import { render, fireEvent, screen } from "@testing-library/react";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import "@testing-library/jest-dom/extend-expect";

// Component
import Home from "../src/pages";
import { getServerSideProps } from "../src/pages/[zipcodeParam]";

// Mock Router
jest.mock("next/router", () => require("next-router-mock"));

mockRouter.useParser(createDynamicRouteParser(["/[zipcodeParam]"]));

describe("Home page", () => {
  //
  it("should be a form", () => {
    //render
    const { getByTestId } = render(<Home />);

    // Elements
    const form = getByTestId("form_zipcode");
    const input = getByTestId("input_zipcode");
    const button = getByTestId("button_zipcode");

    // Assert
    expect(form).toBeInTheDocument();
    expect(form).toContainElement(input);
    expect(form).toContainElement(button);

    expect(input).toBeEnabled();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should be a valid zip code", async () => {
    //render
    const { getByTestId } = render(<Home />);

    // Elements
    const input = getByTestId("input_zipcode");

    // Mock -> values
    const input_values = ["aaaaabbccdd", "????@@@@$$%%%", "(⌐□_□)", "💫", "❗"];

    input_values.forEach((value) => {
      //
      fireEvent.change(input, { target: { value: value } });

      // Assert
      expect(input).toHaveValue("");
    });
  });

  it("should become a parameter", async () => {
    //
    const { getByTestId } = render(<Home />);

    // Elements
    const input = getByTestId("input_zipcode");
    const button = getByTestId("button_zipcode");

    // Event
    fireEvent.change(input, { target: { value: 57015040 } });
    fireEvent.click(button);

    // Assert
    expect(mockRouter).toMatchObject({
      pathname: "/[zipcodeParam]",
      query: { zipcodeParam: "57015040" },
    });
  });

  it("should be sent an alert to the user", async () => {
    // render
    const { getByTestId } = render(<Home />);

    // Elements
    const input = getByTestId("input_zipcode");
    const button = getByTestId("button_zipcode");

    // Mock -> values
    const input_values = ["1234567", "12345678", "66666666"];

    input_values.forEach((value) => {
      fireEvent.change(input, { target: { value } });
      fireEvent.click(button);

      expect(screen.getByTestId("modal")).toBeInTheDocument();
      expect(screen.getByTestId("modal")).toHaveTextContent(
        "Digite um CEP válido!"
      );
    });
  });

  it("should be a good request", async () => {
    // Mock -> data
    const data = {
      cep: "57073-541",
      logradouro: "1ª Travessa Costa Nabal",
      localidade: "Maceió",
      uf: "AL",
    };

    // render
    render(<Home data={data} />);

    // Assert
    expect(screen.getByText(`CEP: ${data.cep}`));
    expect(screen.getByText(`Estado: ${data.uf}`));
    expect(screen.getByText(`Cidade: ${data.localidade}`));
    expect(screen.getByText(`Logradouro: ${data.logradouro}`));
  });
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

    console.log("[PROP MESSAGE] =======> ", result.props.data.message);
    expect(result.props.data.message).toEqual("Digite um CEP válido!");
  });
  it("should be a bad request with api mocked", async () => {
    const result = await getServerSideProps({
      params: { zipcodeParam: "87654321" },
    });

    console.log("[PROP MESSAGE] =======> ", result.props.data.message);
    expect(result.props.data.message).toEqual(
      "Ocorreu um erro inesperado, tente novamente mais tarde!"
    );
  });
});
