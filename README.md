<h1 align="center">Stay Away - Frontend</h1>

Project for the subject of Software Engineering I, FAMAF

## Introduction

The purpose of the system is to create a web version of the card game “Stay Away!” that allows participants to experience its operation online.

This particular repository is in charge of the frontend of the app.

## Tech stack

- React
- Docker

## :whale: Installation guide

### Option 1

This alternative requires having [docker](https://www.docker.com/get-started/) installed.

- Build container:
  - `make build`
- Start container:
  - `make run`

Now, react app should be up and running on http://localhost:3000.

- To stop and delete a container:
  - `make delete`

### Option 2

You will need to have [Node](https://nodejs.org) on your local development machine. In this case with version >= 12 should work perfectly.

Setup react app:

```
npm install
npm start
```

Installs all dependancies and runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

## Developer team

Frontend:

- [Agustina Mollea](https://github.com/AgusMollea)
- [Gastón Bonfils](https://github.com/gastonBonfils)
- [Ignacio Martinez](https://github.com/IgnaCat)

Backend:

- [Benjamin Lozano](https://github.com/Lozano-Benjamin)
- [Emanuel Nicolas Herrador](https://github.com/helcsnewsxd)
- [Geremias Baudino](https://github.com/gbaudino)
