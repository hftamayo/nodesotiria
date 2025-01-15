# Node.js RESTful API Boilerplate

This is a boilerplate project for building RESTful APIs using Node.js, Express, TypeScript, and typeORM. The project is designed to start as a monolith architecture with the potential to evolve into a microservice architecture.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **TypeScript**: Strongly typed language for better development experience.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **typeORM**: Modern database toolkit and ORM.
- **Jest**: Delightful JavaScript testing framework.
- **ESLint**: Pluggable linting utility for JavaScript and TypeScript.
- **Prettier**: Opinionated code formatter.
- **Docker**: Containerization for consistent development and deployment environments.
- **Husky**: Git hooks for enforcing code quality.
- **Lint-Staged**: Run linters on staged files before committing.

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root directory and add the necessary environment variables. Refer to the [Environment Variables](#environment-variables) section for more details.

4. **Run database migrations**:
   ```sh
   npx prisma migrate dev
   ```

## Usage

1. **Start the development server**:

   ```sh
   npm run dev
   ```

2. **Build the project**:

   ```sh
   npm run build
   ```

3. **Start the production server**:
   ```sh
   npm start
   ```

## Testing

1. **Run tests**:

   ```sh
   npm test
   ```

2. **Run tests with coverage**:
   ```sh
   npm run test:coverage
   ```

## Project Structure
