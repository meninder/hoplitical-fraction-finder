# Multiples Hopper

An interactive educational tool for finding the Least Common Denominator (LCD) of two fractions using visual number lines and hopping mechanics.

## Features

- Interactive number lines with animated hoppers
- Visual representation of multiples
- Dynamic number line extension
- Instant feedback when LCD is found
- Responsive design for all screen sizes
- Beautiful UI with Tailwind CSS and shadcn-ui components

## Getting Started

### Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone https://github.com/yourusername/hoplitical-fraction-finder.git

# Navigate to the project directory
cd hoplitical-fraction-finder

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## How to Use

1. The app displays two number lines, each with a colored hopper
2. Click the "Hop" buttons to move the hoppers forward by their respective denominators
3. Click the "Back" buttons to move the hoppers backward
4. The multiples are marked on each number line
5. When the hoppers meet at a common multiple, the LCD is found
6. Use the "New Problem" button to generate a new fraction problem

## Technologies Used

- Vite - Next Generation Frontend Tooling
- TypeScript - JavaScript with syntax for types
- React - A JavaScript library for building user interfaces
- shadcn-ui - Beautifully designed components
- Tailwind CSS - A utility-first CSS framework

## Deployment

### GitHub Pages

This project is configured for GitHub Pages deployment:

1. Build the project:
   ```sh
   npm run build
   ```

2. The build output will be in the `docs` folder

3. Commit and push all changes including the `docs` folder to your GitHub repository

4. Go to your repository settings on GitHub:
   - Under "Pages", select the branch containing your code
   - Set the folder to `/docs`

5. Your site will be published at `https://<username>.github.io/hoplitical-fraction-finder/`

### Custom Domain

You can set up a custom domain in your GitHub repository settings or use services like Netlify for deployment.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
