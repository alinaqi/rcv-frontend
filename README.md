# RCV - Contract Validator Frontend

A modern React application for validating contracts at Ramboll. This application helps Ramboll employees and vendors streamline their contract validation process.

## Features

- Contract Upload and Validation
- Real-time Contract Viewing
- Compliance Checking
- Modern, Responsive UI
- Secure File Handling

## Tech Stack

- React 18+
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Prerequisites

- Node.js (Latest LTS version)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/alinaqi/rcv-frontend.git
cd rcv-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.development` for local development
   - Configure API URL in environment files

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Follow the established project structure
- Write clean, maintainable code
- Add proper documentation for new features

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── config/        # Configuration files
├── services/      # API services
└── types/         # TypeScript type definitions
```

## Environment Configuration

The application uses different environment configurations for development and production:

- Development: `.env.development` (API: localhost:8010)
- Production: `.env.production` (Configure with production API URL)

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

FREE TO USE. THIS IS JUST A MIDNIGHT HACKATHON! :)