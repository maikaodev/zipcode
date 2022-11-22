import mockRouter from "next-router-mock";
import { render, fireEvent } from "@testing-library/react";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import "@testing-library/jest-dom/extend-expect";

// Component
import Home from "../pages";

// Mock Router
jest.mock("next/router", () => require("next-router-mock"));

mockRouter.useParser(createDynamicRouteParser(["/[zipcodeParam]"]));

describe("Home", () => {
  //
  it("should be a form", () => {
    const { getByTestId } = render(<Home data={{}} />);

    // Elements
    const form = getByTestId("form_zipcode");
    const input = getByTestId("input_zipcode");
    const button = getByTestId("button_zipcode");

    // Assert
    expect(form).toBeInTheDocument();
    expect(input).toContainElement(input);
    expect(button).toContainElement(button);
  });

  it("should be a valid zip code", async () => {
    const { getByTestId } = render(<Home data={{}} />);

    // Elements
    const input = getByTestId("input_zipcode");

    // Events
    const input_values = [
      "aaaaabbccdd",
      "aaabb123132ccdd",
      "????@@@@$$%%%",
      "(⌐□_□)",
      "💫",
      "❗",
    ];

    // TODO: Verificar a modal

    input_values.forEach((value) => {
      fireEvent.change(input, { target: { value: value } });
    });

    // Assert
    expect(input).toHaveValue("");
  });

  it("should become a parameter", async () => {
    const { getByTestId } = render(<Home data={{}} />);

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
});

/* 
{
  cep: "57015040",
  uf: "AL",
  localidade: "Maceió",
  logradouro: "1° Travessa Costa Nabal",
} 
*/
