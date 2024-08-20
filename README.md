# Fastify Boilerplate Webservice

> Fastify boilerplate webservice is a starting point for creating microservice projects. It's designed to help you get up and running quickly, reducing the time spent on boilerplate setup.

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

## Features

- **TypeScript Classes**: The project leverages TypeScript classes and decorators for a clean and intuitive design.
- **Logging Decorator**: A custom logging decorator is used to reduce repetitive logging code and keep things DRY (Don't Repeat Yourself).
- **Dependency Injection**: Fastify plugins are used for dependency injection, providing a simple and effective way to manage dependencies.
- **Style Guide**: The project adheres to the Airbnb style guide for consistent and readable code.
- **Database Management**: Knex.js is used for database connection management, with PostgreSQL as the default database.
- **Logging**: Winston is used for logging, providing features like log rotation out of the box.
- **Testable**: The use of dependency injection makes the project highly testable. Jest and Supertest are used for unit testing.
- **Swagger Docs**: The project includes Swagger documentation, which **reuses the JSON Schema** files created for validation.

## Quickstart

1. Set up a PostgreSQL database.
2. Rename `.env.example` to `.env` and value your settings.
3. Install the dependencies with `npm install`.
4. Build the project with `npm run build`.
5. Start the project with `npm run start`.

## Environment Variables with dotenv and Knex

This project uses `dotenv` for managing its environment variables, a practice that is industry standard and works seamlessly with Docker Compose. The `.env` file containing these variables is located at the root of the project.

Here are a few key points to keep in mind:

1. **Application Startup**: The environment variables are loaded into the application during startup, as handled in the `src/config.ts` file.

2. **Test Suite Startup**: The environment variables are also loaded before the tests are run, as handled in the `jest.config.js` setupFiles section.

3. **Knex Commands**: When running Knex commands via an npm script, the environment variables must be available. This is achieved by preloading `dotenv/config` using the `-r` flag in Node.js. For example, a Knex command in an npm script might look like this: `node -r dotenv/config ./node_modules/.bin/knex migrate:latest`.

## Why Fastify over Express.js?

1. **Performance**: Fastify is designed to be the fastest framework in town - it's significantly faster than Express.js.
2. **Schema-based**: Fastify uses JSON Schema to validate routes and serialize outputs, improving performance and reliability.
3. **Extendable**: Fastify is fully extensible via its hooks, plugins, and decorators.

## Project Overview

This is a boilerplate for a user management system, providing basic CRUD operations. It's designed to be flexible and adaptable to your needs.

- Feel free to swap out components. For example, you might prefer Pino over Winston, or MariaDB over PG.
- Contributions are welcome! Please fork this repository and submit a pull request.
- While the tests mock the data layer, this might be overkill for a simple project. It's included here for completeness.
- This boilerplate aims to accelerate your development process.

## Dependency Injection

This project uses `@fastify/awilix` for dependency injection, providing a robust and flexible way to manage dependencies. The data layer accepts the database, and the service layer takes in the data layer, all managed through the Awilix container and integrated into a Fastify plugin. This approach is suitable for both smaller microservices and more complex projects.

We have also adopted a named parameter best practice, ensuring that dependencies are clearly identified and injected by name, which enhances readability and maintainability.

For more information, refer to the [fastify-awilix](https://github.com/fastify/fastify-awilix) documentation.

## Data Protection in Logging

Our logging system includes a special feature for data protection. It uses a 'sanitizer' in combination with a 'logging decorator'. The sanitizer refers to a list of property names that should be hidden in logs to protect sensitive information. You can find and modify this list in the `sensitiveProps.ts` file.


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/DarrenMa/fastify-typescript-boilerplate-simple.svg?style=flat-square&color=green
[contributors-url]: https://github.com/DarrenMa/fastify-typescript-boilerplate-simple/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/DarrenMa/fastify-typescript-boilerplate-simple?style=flat-square
[forks-url]: https://github.com/DarrenMa/fastify-typescript-boilerplate-simple/network/members
[stars-shield]: https://img.shields.io/github/stars/DarrenMa/fastify-typescript-boilerplate-simple?style=flat-square
[stars-url]: https://github.com/DarrenMa/fastify-typescript-boilerplate-simple/stargazers
[issues-shield]: https://img.shields.io/github/issues/DarrenMa/fastify-typescript-boilerplate-simple?style=flat-square
[issues-url]: https://github.com/DarrenMa/fastify-typescript-boilerplate-simple/issues
[license-shield]: https://img.shields.io/github/license/DarrenMa/fastify-typescript-boilerplate-simple?style=flat-square
[license-url]: https://github.com/DarrenMa/fastify-typescript-boilerplate-simple/blob/master/LICENSE