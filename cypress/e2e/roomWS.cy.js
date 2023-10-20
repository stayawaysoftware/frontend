describe("Testing websocket", () => {
  beforeEach(() => {
    // cy.exec("npm run start:backend &");
  });

  afterEach(() => {
    // cy.exec("rm ../backend/src/database.sqlite");
  });

  it("Create room with backend running", () => {
    cy.visit("/");
    cy.login("Visitante1");

    cy.createRoomNoIntercept("Sala de prueba");

    // room name and user name should be visible
    cy.contains("Sala de prueba").should("be.visible");
    cy.contains("Visitante1").should("be.visible");

    // start button should be disabled
    cy.contains("Empezar partida").should("be.disabled");
    // cy.get("button").contains("Salir").click();

    // cy.wait(7000);
  });

  it("Join room and see other user", () => {
    cy.visit("/");
    cy.login("Visitante2");

    //join first room
    cy.get("div[id=0]").click();
    cy.contains("Unirse").click();

    // room name and user name should be visible
    cy.contains("Sala de prueba").should("be.visible");
    cy.contains("Visitante1").should("be.visible");
    cy.contains("Visitante2").should("be.visible");
    // start button should be disabled
    cy.contains("Empezar partida").should("be.disabled");

    cy.wait(10000);
  });
});
