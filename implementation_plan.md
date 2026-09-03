# Implementation Plan: Dynamic Schema-Driven Panelist Registration via API Key

This plan establishes a dynamic panelist registration integration between your custom frontend website and the Panel Management Module (PMM) on `surveybuilder.io`. It utilizes the dynamic schema endpoint (`GET /api/pmm/ingest/:panelId/schema`) to automatically discover panel attributes and the ingestion endpoint (`POST /api/pmm/ingest/:panelId/submit`) to register panelists with custom properties.

## User Review Required

> [!IMPORTANT]
> - **API Key Security**: Ensure `PANEL_API_KEY` is kept in your website's private server-side environment variables (`.env.local` / `.env`) and never exposed to the client-side bundle (do NOT prefix with `NEXT_PUBLIC_`).
> - **Key Reference Matching**: Ensure all custom attributes in `properties` use the exact string keys configured in your panel's **Attributes Schema Editor** (e.g., `education_level` rather than `education_degree`).

---

## Proposed Changes

### Integration & API Layer

#### [MODIFY] [`panel.functions.ts`](file:///e:/Projects/b2bwebsite-glg/lib/api/panel.functions.ts)
*   **Add Type Definitions**: Define interfaces for `PanelField` and `PanelSchemaResponse`.
*   **Add Schema Fetching Action (`getPanelSchema`)**: Implement server action calling `GET /api/pmm/ingest/:panelId/schema` with Next.js ISR/caching options.
*   **Update Validation Schema (`waitlistSchema`)**: Update Zod validation to allow root standard fields (`firstName`, `lastName`, `email`, `phone`) plus a dynamic `properties: z.record(z.any())` object.
*   **Update Submission Action (`submitWaitlistForm`)**: Refactor the payload construction to dynamically forward all custom attributes inside the nested `properties` dictionary to `POST /api/pmm/ingest/:panelId/submit`.

---

### UI Components

#### [NEW] / [MODIFY] Dynamic Registration Form Component
*   **Dynamic Attribute Rendering**: Fetch the schema on load and separate standard root fields from custom panel properties.
*   **Field Type Support**:
    *   `TEXT` / `NUMBER` -> Standard styled text/number inputs.
    *   `DATE` -> Date picker or `<input type="date" />`.
    *   `SINGLE_SELECT` -> `<select>` dropdown populated dynamically with `field.options`.
    *   `MULTI_SELECT` -> Multi-checkbox group or tag selector.
    *   `TRUE_FALSE` -> Switch / Checkbox.
*   **State Management**: Store standard root properties and custom properties in state, packaging them on form submission.

---

## Verification Plan

### Automated / Unit Tests
*   Verify Zod schema validation passes with both minimal inputs and full custom attribute sets.
*   Validate error handling when network requests fail or invalid email/required fields are submitted.

### Manual Verification
1.  **Schema Fetch Verification**: Verify that calling `getPanelSchema()` returns the expected attribute list (`gender`, `education_level`, `date_of_birth`, etc.) with their allowed select options.
2.  **Registration Form Submission**:
    *   Fill out the registration form on the local frontend dev server.
    *   Submit a panelist with custom attributes (e.g. `education_level: "Bachelor's Degree"`).
    *   Confirm a `201 Created` response with `{ success: true, panelistId: "..." }`.
3.  **Panel Management Dashboard Check**:
    *   Open the Panelists list on `surveybuilder.io/panel-management/[panelId]/panelists`.
    *   Verify that the newly registered panelist appears with their source set to `API_KEY` and all custom properties properly populated.
