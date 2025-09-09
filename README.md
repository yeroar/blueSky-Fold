# BlueSky Fold - React Native Expo Project

This is a React Native Expo project set up for prototyping and testing your BlueSky Fold components.

## Project Structure

```
/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── babel.config.js        # Babel configuration
├── tsconfig.json          # TypeScript configuration
├── assets/                # App assets (icons, splash screens)
├── src/
│   └── fixtures/          # Component fixtures for prototyping
│       ├── IconFixtures.tsx
│       ├── ComponentFixtures.tsx
│       └── index.ts
├── BlueSkyIcons/          # Your existing icon components
├── FoldComponents/        # Your existing fold components
└── generated-tokens/      # Your design tokens
```

## Getting Started

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on specific platforms**:
   ```bash
   npm run ios     # iOS simulator
   npm run android # Android emulator
   npm run web     # Web browser
   ```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser

## Component Usage

Your existing components are ready to use:

### Icons
```tsx
import { ArrowNarrowDownIcon } from './BlueSkyIcons/ArrowNarrowDownIcon';

// Usage
<ArrowNarrowDownIcon width={24} height={24} fill="#000" />
```

### Fold Components
```tsx
// Import your fold components as needed
import { YourComponent } from './FoldComponents/YourComponent';
```

## Prototyping with Fixtures

Use the fixture files in `src/fixtures/` to test and prototype your components:

- `IconFixtures.tsx` - For testing icon components
- `ComponentFixtures.tsx` - For testing fold components

You can import these fixtures into your `App.tsx` to see them in action.

## Dependencies

This project includes:

- **Expo SDK 51** - React Native framework
- **React Native Reanimated** - For animations (used by your components)
- **React Native Unistyles** - For styling (used by your components)
- **React Native SVG** - For SVG icon support
- **TypeScript** - For type safety

## Next Steps

1. **Add component imports** to your fixtures
2. **Test component rendering** with different props
3. **Iterate on component design** and functionality
4. **Simplify theme to tokens** (future iteration)

## Notes

- Components are kept unchanged as requested
- Theme system is preserved but simplified for basic prototyping
- Project is configured for both development and production builds
- All necessary dependencies for your existing components are included
