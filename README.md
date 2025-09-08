# 💜 CashCloud Technical Test

Implementation of the **Payments UI module** in Angular 19, replicating the design provided in Figma.
Includes tabs with filters, configurable table, contextual actions, and state persistence (nice-to-have).

---

## 🎯  Objective
- Build the **payment module** according to the design.
- Demonstrate **technical knowledge**, **problem-solving approach**, and **coding style**.

---

## 🚀 Technology Stack
- **Angular 19** (standalone components)
- **TypeScript** con `strict` habilitado
- **RxJS** for gestion (Signals / Component Store)
- **PrimeNG 19** library of user interface components
- **Playwright** for testig 
- **ESLint** for linting and formatting

---

## ♿ Accessibility Review

Accessibility was validated with **WAVE** and **IBM Equal Access Checker**:

- Most issues detected are **contrast-related**, which depend on the visual style and theme.  
- Other warnings arise because the page is still a **simplified test module** and not fully structured semantically.  
- Improvements were documented, and accessibility-friendly practices (e.g., `aria-label`, `sr-only`, semantic HTML) were applied where possible.
- Despite improvements in PrimeNG 19 accessibility, validation with tools such as WAVE and IBM Equal Access Checker still detected warnings due to the library's default structures. Although these issues can be resolved, it was not possible to address them completely due to time constraints. Nevertheless, the best possible accessibility practices were applied. 

[Accessibility_Report-CashcloudApp](Accessibility_Report-CashcloudApp\Accessibility_Report-CashcloudApp.xlsx)
---

## ⚙️ Installation and execution

Clone the repo and enter the folder.

```bash
git clone https://github.com/Rinaplata/cashcloud-technical-test.git
```
---

```bash
npm start
```
---

## Guide to running tests with Playwrigh
```bash
npx playwright test
```
[documentation](https://playwright.dev/docs/intro)
