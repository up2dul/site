# Design system: Coss UI + shadcn

Using Coss.com's design language with shadcn components and custom styling. Coss UI provides the visual foundation and component patterns, while shadcn gives us accessible primitives we can style to match.

**Why Coss**: The design aesthetic matches the intended direction — clean, modern, professional. The custom styling layer bridges shadcn's defaults to Coss's visual language.

**Trade-offs considered**:
- Pure shadcn: Too generic, wouldn't match the Coss aesthetic
- Custom components from scratch: More work, less accessible by default
- Other UI libraries (MUI, Ant): Heavier, less flexible styling

**Consequences**: Need to maintain a custom styling layer between shadcn primitives and Coss visual design. Component updates require checking both shadcn upstream and Coss design changes.
