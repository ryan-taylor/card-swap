# React Card Stack

A minimalist React application showcasing a dynamic card stack with smooth animations using Framer Motion. Built with Vite for fast development and bundling.

## Features

- Interactive card stack with swipe functionality
- Smooth animations powered by Framer Motion
- Responsive design using Tailwind CSS
- Modern React setup with Vite
- Simulated API call with dynamic card border color

## Tech Stack

- React 18
- Vite
- Framer Motion
- Tailwind CSS
- ESLint for code quality

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

## Project Structure

- `src/App.jsx`: Main component containing the SwipeCards and Card components
- `src/main.jsx`: Entry point of the application
- `src/index.css`: Global styles and Tailwind CSS imports
- `public/`: Static assets

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run lint`: Run ESLint to check for code quality issues
- `npm run preview`: Preview the production build locally

## Customization

To modify the card content or add more cards, edit the `cards` state in `src/App.jsx`. The current implementation includes two cards with simulated API data.

## Card Component

The `Card` component is responsible for rendering individual cards with animations. It uses Framer Motion for smooth transitions and supports dynamic border colors based on API results.

## API Simulation

The application includes a simulated API call that randomly sets a boolean value. This value determines the border color of the second card (red for true, green for false).

## Animations

The card stack uses Framer Motion for animations, including:

- Card flipping
- Smooth transitions between front and back positions
- Scale and rotation effects

## Accessibility

This application has been designed with accessibility in mind:

- Keyboard navigation: Users can navigate through cards using arrow keys, Enter, or Space.
- Screen reader compatibility: ARIA attributes have been added to improve the experience for screen reader users.

### Yet to be resolved

- Color contrast: The use of red and green for indicating the border color of the second card based on the API result might not meet accessibility standards, particularly for users with color vision deficiencies. 

Here are the concerns:

1. Color alone should not be used to convey important information.
2. Red and green can be difficult to distinguish for people with certain types of color blindness.

- The current color scheme may not provide sufficient contrast for all users.

    To address this, consider the following recommendations:

    1. Use additional visual cues along with color, such as icons, patterns, or text labels.

    2. Choose colors with sufficient contrast not only against the background but also between each other. Consider using tools like WebAIM's Color Contrast Checker to ensure a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.

    3. Provide a text alternative that describes the meaning of the color.

    To ensure the best experience for all users, please test the application with various assistive technologies and in different color schemes (light mode, dark mode, and high contrast mode).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).