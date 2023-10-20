// describe("checks home page", () => {
//   let i = 1;
//   beforeEach("login the user", () => {
//     cy.visit("/");
//     cy.login(`Visitante${i}`);
//     i++;
//     cy.location("pathname").should("eq", "/");
//   });

//   it("render home page", () => {
//     cy.contains("Lista de salas").should("be.visible");
//     cy.contains("Unirse").should("be.visible");
//     cy.contains("Crear Sala").should("be.visible");
//   });

//   it("join room disabled", () => {
//     cy.contains("Unirse").should("be.visible");
//     cy.contains("Unirse").should("be.disabled");
//   });

//   it("get data", () => {
//     cy.intercept("GET", "/rooms*", (req) => {
//       req.reply((res) => {
//         expect(res.statusCode).to.eq(200);
//       });
//     });
//   });

//   it("create a room", () => {
//     cy.create_room(`Sala de prueba`);
//   });

//   it("user can join to a room", () => {
//     cy.join_room();
//   });
// });

const empty_room_list = [];
const joinable_room = {
  id: 1,
  name: "Sala disponible",
  in_game: false,
  is_private: false,
  users: {
    min: 4,
    max: 12,
    names: ["VisitanteA", "VisitanteB", "VisitanteC", "VisitanteD"],
  },
};

const full_room = {
  id: 2,
  name: "Sala llena",
  in_game: false,
  is_private: false,
  users: {
    min: 4,
    max: 4,
    names: ["VisitanteZ", "VisitanteY", "VisitanteX", "VisitanteW"],
  },
};

describe("checks home page", () => {
  // beforeEach("login the user", () => {
  //   cy.complete_login("Visitante");
  // });

  it("Render home page with no rooms", () => {
    //intercept GET request to /room/list to return an empty list
    cy.intercept("GET", "/room/list", {
      statusCode: 200,
      body: empty_room_list,
    }).as("getRooms");

    cy.complete_login("Visitante");
    cy.wait("@getRooms");
    cy.contains("Lista de salas").should("be.visible");
    cy.contains("Unirse").should("be.disabled");
    cy.contains("Crear Sala").should("be.visible");
  });

  it("Render home page with joinable room and full room", () => {
    cy.intercept("GET", "/room/list", {
      statusCode: 200,
      body: [joinable_room, full_room],
    }).as("getRooms");

    cy.complete_login("Visitante");
    cy.wait("@getRooms");
    cy.contains("Lista de salas").should("be.visible");

    cy.contains("Crear Sala").should("be.visible");
    //the both rooms name should be visible
    cy.contains(joinable_room.name).should("be.visible");
    cy.contains(full_room.name).should("be.visible");

    //click the joinable room
    cy.get("div[id=0]").click();
    //the room should display the number of users, max users and the game status
    cy.contains(joinable_room.users.names.length).should("be.visible");
    cy.contains(joinable_room.users.max).should("be.visible");
    cy.contains("Esperando jugadores").should("be.visible");
    //the join button should be enabled
    cy.contains("Unirse").should("be.enabled");

    //click the full room
    cy.get("div[id=1]").click();
    //the room should display the number of users, max users and the game status
    cy.contains(full_room.users.names.length).should("be.visible");
    cy.contains(full_room.users.max).should("be.visible");
    cy.contains("Sala llena").should("be.visible");
    //the join button should be disabled
    cy.contains("Unirse").should("be.disabled");
  });

  it("Create a room", () => {
    cy.intercept("GET", "/room/list", {
      statusCode: 200,
      body: empty_room_list,
    }).as("getRooms");

    cy.intercept("POST", "/room/new", {
      statusCode: 201,
      body: {
        id: 1,
      },
    }).as("createRoom");

    cy.complete_login("Visitante");
    cy.wait("@getRooms");

    cy.contains("Crear Sala").should("be.visible");
    cy.contains("Crear Sala").click();

    //the create room dialog should be visible
    cy.contains("Crear Sala").should("be.visible");
    cy.contains("Cancelar").should("be.visible");
    //fill the Nombre de la sala field, its the first input
    cy.get("form").find("input").first().type("Sala de prueba");
    //click the create button
    cy.get(".MuiDialogActions-root > .MuiButton-contained").click();

    cy.wait("@createRoom");
    //verify that the response is correct
    cy.get("@createRoom").should((req) => {
      expect(req.response.statusCode).to.equal(201);
      expect(req.response.body).to.have.property("id", 1);
    });

    //verify that the user is redirected to the room
    // cy.location("pathname").should("include", "/room");
  });
});
