# Mystical Realms

Welcome to Mystical Realms! This project is a comprehensive application designed to manage and interact with tarot card data. It leverages modern web technologies and follows best practices for development and deployment.

## Features

- **Database Management**: Uses Prisma for database interactions.
- **Authentication**: Supports multiple providers including Discord, GitHub, and Google via NextAuth.js.
- **Seeding**: Includes scripts to seed the database with tarot card data.
- **Environment Configuration**: Utilizes environment variables for configuration.

## Getting Started

### Prerequisites

- Node.js
- Docker (for local database setup)
- pnpm (package manager)

### Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/yourusername/mystical-realms.git
  cd mystical-realms
  ```

2. Install dependencies:
  ```sh
  pnpm install
  ```

3. Set up environment variables:
  - Copy `.env.example` to `.env` and fill in the required values.

4. Start the database:
  ```sh
  ./start-database.sh
  ```

5. Run database migrations and seed data:
  ```sh
  pnpm db:generate
  pnpm db:seed:deck
  ```

6. Start the development server:
  ```sh
  pnpm dev
  ```

## Contributing

We welcome contributions! Please read our [Contributing Guide](docs/CONTRIBUTING.md) for more information on how to get started.

## License

This project is licensed under the GNU Affero General Public License v3.0. See the [LICENSE](LICENSE) file for details.
