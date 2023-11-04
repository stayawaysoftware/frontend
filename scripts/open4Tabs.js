const puppeteer = require("puppeteer");
const PAGE_URL = "http://localhost:3000";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto(PAGE_URL);

  // Rellenar el formulario
  await page.type("#username", "UsuarioHost"); // Reemplaza con el ID o selector del campo de usuario

  // Hacer clic en un botón type sumbit
  await page.click("button[type=submit]"); // Reemplaza con el ID o selector del botón de submit

  //click Crear partida
  await page.waitForSelector("#createGame");
  await page.click("#createGame");

  // //fill room name
  await page.waitForSelector("#roomName");
  await page.type("#roomName", "SalaPrueba");

  //click create room
  // await page.waitForSelector("#createRoom");
  await page.click("#createRoom");

  // abrir 3 pestañas más

  for (let i = 0; i < 3; i++) {
    const newPage = await browser.newPage();
    await newPage.goto(PAGE_URL);

    // Rellenar el formulario
    await newPage.type("#username", "Parásito" + i); // Reemplaza con el ID o selector del campo de usuario

    // Hacer clic en un botón type sumbit
    await newPage.click("button[type=submit]"); // Reemplaza con el ID o selector del botón de submit

    //click the first room
    // await newPage.waitForSelector("#0");
    // await newPage.click("div[idtest=`SalaPrueba`]");
    // await newPage.click('span.MuiListItemText-primary:has-text("SalaPrueba")');
    await newPage.waitForSelector("[idtest='SalaPrueba']");
    await newPage.click("[idtest='SalaPrueba']");

    // // click join room
    // await newPage.waitForSelector("#joinRoom");
    await newPage.click("#joinRoom");
  }
})();
