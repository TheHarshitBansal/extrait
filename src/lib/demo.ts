export const DEMO_SUMMARY = `# ⚛️ React Hooks Cheat Sheet: Your Guide to Functional Components! 🚀
🔖 Master React Hooks for cleaner, more efficient components.
🔎 Quick reference for managing state, side effects, and reusability.

## Document Details
📄 Type: Cheat Sheet
👥 For: React Developers

## Key Highlights
- ⚛️ useState: Easily manage component state.
- 🔄 useReducer: For complex state logic.
- useEffect: Handle side effects like API calls.
- 🎨 useLayoutEffect: Perform DOM mutations before the browser paints.
- 📦 useContext: Access context values without prop drilling.
- 🧠 useMemo: Memoize expensive calculations.
- 📞 useCallback: Memoize functions to prevent unnecessary re-renders.
- 📍 useRef: Access DOM nodes or persist values across renders.
- 🤝 useImperativeHandle: Customize the ref exposed to parent components.
- 🛠️ Custom Hooks: Extract reusable logic.

## Why It Matters
💡 React Hooks revolutionize component development by enabling functional components to manage state and side effects, leading to more readable, testable, and reusable code. This cheat sheet provides a quick reference to effectively leverage these powerful tools.

## Main Points
- ⚛️ useState: Manages simple state within functional components. Replaces class-based state management.
- 🔄 useReducer: Alternative to useState for complex state transitions. Ideal for managing multiple related state values.
- ⏳ useEffect: Handles side effects like data fetching, subscriptions, and manual DOM manipulations after rendering.
- 🧱 useLayoutEffect: Similar to useEffect, but fires synchronously after DOM mutations and before the browser paints.
- 📦 useContext: Simplifies access to React Context values, avoiding prop drilling through multiple components.
- 🧠 useMemo: Memoizes the result of a function, recalculating only when dependencies change, optimizing performance.
- 📞 useCallback: Returns a memoized version of a function that only changes if one of the dependencies has changed.
- 📍 useRef: Creates a mutable ref object that persists across renders. Can be used to access DOM nodes or store mutable values.
- 🤝 useImperativeHandle: Customizes the instance value that is exposed to parent components when using useRef.
- ♻️ Custom Hooks: Enables extracting and reusing stateful logic between components.

## Pro Tips
- ⏳ useEffect cleanup: Always return a cleanup function to prevent memory leaks.
- 🧱 useLayoutEffect caution: Use sparingly as it can impact performance due to synchronous execution.
- 📦 useContext usage: Ensure the Context provider is an ancestor of the component using useContext.
- 🧠 useMemo dependencies: Include all values from the component scope that are used in the memoized function.
- 📞 useCallback dependencies: Similar to useMemo, include all values used inside the callback.
- 📍 useRef mutations: Mutating ref.current does not trigger a re-render.
- 🤝 useImperativeHandle best practices: Use judiciously as it can make component behavior less predictable.
- ♻️ Custom Hooks naming: Start custom hook names with "use" to follow React conventions.

## Key Terms to Know
- ⚛️ State: Data that changes over time and affects the component's output.
- ⏳ Side Effects: Operations that affect something outside the scope of the component (e.g., API calls, DOM manipulation).
- 🧱 DOM: Document Object Model, a programming interface for HTML and XML documents.
- 🧠 Memoization: Optimization technique where results of expensive function calls are cached and reused.
- 📍 Refs: A way to access DOM nodes or persist mutable values.
- 📦 Context: A way to share values between components without explicitly passing a prop through every level of the tree.
- ♻️ Reusability: The practice of writing code that can be used in multiple parts of an application.

## Bottom Line
📌 React Hooks empower developers to write more concise, maintainable, and performant React components by bringing state management and side effect handling into functional components. Mastering these hooks is crucial for modern React development.
`