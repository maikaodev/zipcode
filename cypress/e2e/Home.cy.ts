describe("Navigation", () => {
  //
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should be sent an alert to the user", () => {
    const invalid_zip_codes: string[] = ["1234567", "12345678", "66666666"];

    invalid_zip_codes.forEach((zip_code: string) => {
      cy.findByTestId("input_zipcode").type(zip_code);
      cy.findByTestId("button_zipcode").click();
      cy.findByTestId("modal").contains("Digite um CEP válido!");
    });
  });

  it("should only have numbers in the input", () => {
    const input_values = ["aaaaabbccdd", "????@@@@$$%%%", "(⌐□_□)", "💫", "❗"];

    input_values.forEach((value) => {
      //
      cy.findByTestId("input_zipcode").type(value).should("have.value", "");
    });
    cy.findByTestId("input_zipcode")
      .type("a2bc6645")
      .should("have.value", "26645");
  });

  it("should become a parameter", () => {
    cy.findByTestId("input_zipcode").type("57073541");

    cy.findByTestId("button_zipcode").click();

    cy.url().should("include", "http://localhost:3000/57073541");
  });

  it("should be a good request from url", () => {
    const data = {
      cep: "57073-541",
      logradouro: "1ª Travessa Costa Nabal",
      localidade: "Maceió",
      uf: "AL",
    };

    cy.visit("http://localhost:3000/57073541");

    cy.findByText(`CEP: ${data.cep}`);
    cy.findByText(`Estado: ${data.uf}`);
    cy.findByText(`Cidade: ${data.localidade}`);
    cy.findByText(`Logradouro: ${data.logradouro}`);
  });

  it("should have social networks and copyright", () => {
    cy.get("[href='https://www.linkedin.com/in/maikaodev/']").should(
      "not.be.disabled"
    );
    cy.get("[href='https://github.com/maikaodev']").should("not.be.disabled");
    cy.get("[href='mailto:maikao.dev@gmail.com']").should("not.be.disabled");
    cy.findByText("Developer by @maikaodev © 2022");
  });
});
