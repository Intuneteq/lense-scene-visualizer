# 🕶️ Lens Scene Visualizer

> A full-stack recreation of SunGod’s interactive lens preview feature using Next.js.

---

## 🌍 Overview

While shopping for sunglasses on [SunGod](https://www.sungod.co/products/9150/renegades?pdp=1), I came across their **interactive lens preview tool**, a feature that allows users to view how different lenses alter real-world scenes. I decided to recreate this functionality from scratch as a **personal project**, focusing on clean architecture, scalability, and interactivity.

The **Lens Scene Visualizer** is a full-stack web application built with **Next.js 15**, combining both frontend and backend within a single framework. It allows users to:

* Select a lens from a dynamic list of 50+ lenses.
* View real-time scene comparisons (Mountain, Beach, Road, Naked Eye).
* Interactively compare “naked eye” vs “through the lens” images with a draggable divider.

This project demonstrates my ability to design **data-driven, performant, and interactive full-stack applications**.

---

## ⚙️ Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Data Fetching:** SWR
* **Deployment:** Vercel

---

## ☁️ Cloud Services

* **Vercel:** Hosting, image optimization, and edge caching

---

## 🧩 Architecture Summary

The application is fully full-stack within Next.js, leveraging **API routes** to simulate backend endpoints for lenses and scenes.
It consumes two JSON sources (`product.json` and `scene.json`) and exposes them as structured, validated API responses.

### **Key Backend Endpoints**

| Endpoint                        | Description                                        |
| ------------------------------- | -------------------------------------------------- |
| `/api/lenses`                   | Returns all available lenses (id, name, sku)       |
| `/api/lenses/:sku/scenes/:name` | Returns scene data for a given lens and scene type |

This modular structure allows incremental data loading — only fetching what’s needed per user action.

---

## 🧱 Backend Design Decisions

1. **Full-stack Next.js Architecture**

   * Eliminated the need for a separate backend by colocating API routes and UI logic within one project.
   * Simplified deployment and maintenance using a single runtime.

2. **Data Modeling & Type Safety**

   * Defined strong TypeScript models: `Product`, `Lense`, `Scene`, `ImageType`.
   * Created a reusable `LenseSKU` union type representing all 57 lens variations.

3. **Data Mapping Utility**

   * Implemented `buildLensSceneMap` to efficiently map lens SKUs to their corresponding scene images (O(1) lookup).

4. **Validation Layer**

   * Separated schemas in `src/utils/validations` to keep domain models pure and maintain single responsibility.

5. **Error Handling**

   * Built structured error responses for missing data, invalid inputs, and internal errors without exposing sensitive info.

---

## 💻 Frontend Design Decisions

1. **Parallel Routing**

   * Used Next.js **parallel routes** to independently load the lens selector and scene preview components — preventing one slow fetch from blocking the other.

2. **URL-Based State Management**

   * Lens and scene selections are stored in query parameters (`?sku=&scene=`), making states **shareable and bookmarkable**.

3. **SWR for Data Fetching**

   * Implemented SWR for automatic caching, optimistic updates, and revalidation to maintain responsive UI behavior.

4. **Interactive Scene Comparison**

   * Built a custom **ImageCompare** component with a draggable divider for side-by-side visual comparison.
   * Leveraged Next.js Image optimization for responsive, high-performance image rendering.

5. **Robust UX Handling**

   * Added validation for invalid URLs or missing selections, gracefully displaying fallback UI states.

---

## 🧠 Roles & Contributions

### **Frontend**

* Developed parallel routes for lens and scene loading.
* Managed state via `useSearchParams` for consistent hydration.
* Built a responsive, accessible UI with Tailwind CSS.
* Implemented SWR for data caching and real-time updates.
* Created the ImageCompare component for visual interactions.
* Handled error, loading, and empty states gracefully.

### **Backend**

* Modeled data structures with strong TypeScript typing.
* Created RESTful API routes (`/lenses`, `/lenses/:sku/scenes/:name`).
* Built `buildLensSceneMap` for data mapping and retrieval.
* Implemented schema-based validation and error handling.
* Simulated incremental data loading from JSON sources.

---

## 🔑 Key Features

✅ Dynamic lens and scene selection
✅ Real-time interactive image comparison
✅ Fully typed API with validation and modular structure
✅ Optimized image loading and rendering
✅ URL-based shareable states
✅ Clear error and empty-state handling

---

## 🚀 Future Improvements

* **Automated Testing:** Add unit and integration tests for endpoints and components.
* **Server-Side Caching:** Cache computed scene maps for repeated access.
* **Accessibility Enhancements:** Improve focus states and ARIA attributes for interactive elements.
* **Custom Fonts:** Integrate self-hosted fonts (TWK Lausanne) as in the original design.

---

## 🧾 Reflection
The process reaffirmed how **Next.js excels as a full-stack framework**, and how thoughtful structure (validation, modularization, and type safety) can elevate even small projects into maintainable, production-quality builds. I focused on architectural clarity, clean data flow, and a smooth user experience.

---

**🔗 Demo:** [https://lens-scene-visualizer.intunteq.com](#)
**💻 Source:** [https://github.com/Intuneteq/lense-scene-visualizer](#)