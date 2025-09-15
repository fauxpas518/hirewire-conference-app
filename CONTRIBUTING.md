# Contributing to HireWire Conference App

Thank you for your interest in contributing to the HireWire Conference App! We welcome contributions from the community.

## 🤝 How to Contribute

### Reporting Issues

1. Check the [existing issues](https://github.com/fauxpas518/hirewire-conference-app/issues) first
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/device information

### Submitting Changes

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed
4. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing component patterns
- Use Tailwind CSS for styling
- Maintain mobile-first responsive design
- Follow accessibility best practices (WCAG guidelines)

### Component Structure

```typescript
// components/ui/example.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface ExampleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary"
}

const Example = React.forwardRef<HTMLDivElement, ExampleProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("base-styles", variants[variant], className)}
        {...props}
      />
    )
  }
)
Example.displayName = "Example"

export { Example }
```

### Commit Messages

Use conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Testing

- Test your changes across different screen sizes
- Verify accessibility with screen readers
- Check mobile touch interactions
- Test with keyboard navigation

## 🐛 Bug Reports

When reporting bugs, please include:
- **Description**: Clear description of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, device, screen size
- **Screenshots**: If applicable

## 💡 Feature Requests

For new features:
- Explain the use case and benefit
- Consider if it fits the project's scope
- Discuss implementation approach
- Check if it aligns with the mobile-first design

## 📋 Pull Request Checklist

Before submitting:
- [ ] Code follows the project's style guidelines
- [ ] Self-review completed
- [ ] Changes are tested on mobile devices
- [ ] Documentation updated if needed
- [ ] No console errors or warnings
- [ ] Accessibility considerations addressed
- [ ] Build passes (`npm run build`)
- [ ] Linting passes (`npm run lint`)

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router pages
├── components/             # Reusable components
│   └── ui/                # Primitive UI components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript definitions
└── public/                # Static assets
```

## 📞 Getting Help

- Open an issue for bugs or feature requests
- Check existing documentation in the README
- Review the codebase for patterns and examples

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to HireWire Conference App! 🎉