# Animations: Motion (formerly Framer Motion)

Using Motion for all animations and transitions. Provides declarative API for complex animations with good performance.

**Why Motion**: Already in dependencies, familiar API, handles complex orchestration well. Good React integration and layout animation support.

**Trade-offs considered**:
- CSS animations only: Less powerful for complex sequences, harder to orchestrate
- GSAP: More powerful but heavier, overkill for this project
- React Spring: Different API paradigm, less declarative

**Consequences**: Additional bundle size from Motion library. Need to be intentional about which animations add value vs. decorative.
