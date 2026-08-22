# CPAD E-Commerce App Assignment Task Tracker

## Assignment Reference

- **Source document:** `Cross_Platform_Assignment_Statement.docx`
- **Course:** Cross platform Application Development
- **Assignment:** App design - E-Commerce App
- **Submission deadline:** 26 Aug 2026, 11:59 PM
- **Weightage:** 10%
  - Logical Architecture: 3%
  - Demo: 5%
  - Neat Documentation: 2%
- **Final submission format:** `CPAD_Assignment_<Group_ID>.zip`
- **Accepted final document formats:** DOC or PDF

## Objective

Create and document an e-commerce application that supports the minimum user flow of logging in, viewing a searchable catalogue, and opening a product detail page. Complete the system analysis and design by defining the architecture, component responsibilities and interactions, physical/resource considerations, and data model.

## Scope and Minimum User Flow

- [x] Launch the application successfully on the target platform.
- [x] Display a **Login Screen**.
- [x] Validate login input and show appropriate success/error states.
- [x] Navigate an authenticated user to the **Main Menu/Dashboard**.
- [x] Display a list of e-commerce items/products.
- [x] Provide a working product **Search** option.
- [x] Open a **Detail Page** for a selected item.
- [x] Display meaningful item details on the detail page.
- [x] Support clear navigation between the required screens.
- [ ] Handle loading, empty, invalid-input, and error states where applicable.

## Work Plan

### 1. Project and Requirement Preparation

- [ ] Confirm group ID, group members, roles, and communication/working arrangement.
- [ ] Confirm the target platform(s), framework, runtime, and development tools.
- [ ] Record functional requirements for login, dashboard/catalogue, search, and product details.
- [ ] Record non-functional requirements: usability, performance, maintainability, security, availability, and compatibility.
- [ ] Identify assumptions, constraints, out-of-scope features, and dependencies.
- [ ] Identify relevant existing e-commerce solutions and summarize useful design observations.
- [ ] Prepare a feasibility summary covering technical, operational, economic, schedule, and resource feasibility.

### 2. Application Design and Implementation

- [ ] Define the application navigation flow and screen states.
- [ ] Design the Login Screen.
- [ ] Design the Main Menu/Dashboard and product list.
- [ ] Design the search interaction, filtering behavior, and no-results state.
- [ ] Design the Product Detail Page.
- [ ] Define the source and shape of product data (local or remote).
- [ ] Implement the application using the selected cross-platform framework.
- [ ] Implement input validation and user feedback.
- [ ] Implement navigation between login, dashboard, and detail views.
- [ ] Implement product listing and search.
- [ ] Implement product detail retrieval/display.
- [ ] Add representative product data for a convincing demo.
- [ ] Verify the application works on the selected target device/emulator.

### 3. Logical Architecture (3%)

- [ ] Choose an architecture suitable for the proposed system and justify the choice.
- [ ] Identify the major layers, for example presentation/UI, application or state-management, domain/business, data-access, and infrastructure/external services.
- [ ] Document the responsibility of every layer.
- [ ] Identify the components/packages within each layer.
- [ ] Apply separation of concerns with clear component boundaries.
- [ ] Define the public responsibilities and dependencies of each component.
- [ ] Describe how the Login Screen, Dashboard, Search, and Detail Page interact with the application logic.
- [ ] Describe how application logic interacts with repositories, data sources, and external services.
- [ ] Document the direction and purpose of inter-component communication.
- [ ] Document relevant runtime/deployment behavior and error boundaries.
- [ ] Create a UML package diagram showing the layers and components.
- [ ] Create any additional UML component, sequence, or deployment diagram needed to make interactions and physical layout clear.
- [ ] Use a UML-compliant diagramming tool and label diagrams consistently.
- [ ] Add a written justification explaining why the selected architecture fits this application.

### 4. ER Model and Data Requirements

- [ ] Identify the business entities required by the proposed system.
- [ ] At minimum consider user/account and product/item entities; include other entities only when justified by scope.
- [ ] Define attributes and data types for each entity.
- [ ] Identify primary keys and candidate keys.
- [ ] Identify foreign keys and referential constraints.
- [ ] Define required/optional fields and nullability.
- [ ] Define uniqueness, validation, range, and domain constraints.
- [ ] Define relationships, cardinality, and optionality between entities.
- [ ] Resolve any many-to-many relationships with associative entities where needed.
- [ ] Check the model for redundancy and reasonable normalization.
- [ ] Create a clear ER diagram using an appropriate ER/UML diagramming tool.
- [ ] Provide a data dictionary explaining every entity and important attribute.
- [ ] Explain how the application screens use the modeled data.
- [ ] State assumptions made where business requirements are unspecified.

### 5. Physical Layout and Resources

- [ ] Describe the physical/deployment layout of the system.
- [ ] Identify client devices, emulator/device requirements, backend/API, database, and external services, if used.
- [ ] Create a deployment or physical architecture diagram where appropriate.
- [ ] List required software: operating system, SDK, IDE, framework, package manager, database/API tools, and UML tool.
- [ ] List required hardware: development machines, test devices/emulators, storage, and network access.
- [ ] Identify human resources and responsibilities for analysis, design, development, testing, documentation, and demo production.
- [ ] Identify security and privacy considerations for credentials and product/user data.
- [ ] Identify operational assumptions such as connectivity, hosting, and data availability.

### 6. Verification and Testing

- [ ] Test valid login behavior.
- [ ] Test empty and invalid login inputs.
- [ ] Test successful navigation to the dashboard.
- [ ] Test product list rendering with representative data.
- [ ] Test search for an exact match, partial match, case variation, and no results.
- [ ] Test opening a product detail page from the list.
- [ ] Test back/navigation behavior and repeated navigation.
- [ ] Test loading and error states for data access.
- [ ] Test on the agreed target platform/device or emulator.
- [ ] Record defects found and their resolution.
- [ ] Capture screenshots or other evidence for the report and demo.

### 7. Documentation and Justification (2%)

- [ ] Write a clear project overview and problem statement.
- [ ] Document the goals, scope, assumptions, and constraints.
- [ ] Document functional and non-functional requirements.
- [ ] Include the application flow and screen descriptions.
- [ ] Include the logical architecture, layer responsibilities, package diagram, and interaction explanation.
- [ ] Include the ER model, constraints, relationship explanation, and data dictionary.
- [ ] Include physical layout, hardware/software resources, and human resources.
- [ ] Include feasibility findings and design alternatives considered.
- [ ] Explain and justify important architecture and data-model decisions.
- [ ] Include testing approach, results, limitations, and known future improvements.
- [ ] Add figure numbers, captions, legends, and consistent terminology.
- [ ] Add references for the prescribed and consulted sources:
  - Feasibility Study
  - Use Case template by Cockburn
  - Requirements by Craig Larman
  - System Architecture
  - Applying UML and Patterns
  - ER Model
  - ER Diagrams
- [ ] Proofread the document for clarity, consistency, grammar, and completeness.
- [ ] Export the final report to DOC or PDF.

### 8. Demo Video (5%)

- [ ] Plan a short, self-explanatory demonstration script.
- [ ] Show the application launch and Login Screen.
- [ ] Demonstrate valid login and the transition to the dashboard.
- [ ] Demonstrate product listing and search.
- [ ] Demonstrate opening and reading product details.
- [ ] Show relevant error/empty states if they strengthen the demonstration.
- [ ] Explain the architecture and data model briefly, using the diagrams where useful.
- [ ] Ensure the recording is readable, audible, stable, and free of confidential information.
- [ ] Verify the video can be played by the evaluator and matches the submitted application.

### 9. Final Packaging and Submission

- [ ] Review every rubric item against the completed artifacts.
- [ ] Confirm all source code, assets, diagrams, report, and demo details are included as required.
- [ ] Remove generated secrets, credentials, unnecessary build artifacts, and unrelated personal files.
- [ ] Confirm the report is in DOC or PDF format.
- [ ] Confirm the archive follows `CPAD_Assignment_<Group_ID>.zip`.
- [ ] Extract the archive into a clean temporary folder and verify it opens/runs as expected.
- [ ] Perform a final deadline and file-integrity check.
- [ ] Submit the final ZIP through the required channel and retain a backup copy.

## Suggested Deliverables

- [ ] Cross-platform e-commerce application source code.
- [ ] Executable/build or documented run instructions, as applicable.
- [ ] Requirements and feasibility section.
- [ ] UML logical architecture and package diagram.
- [ ] Component interaction and/or deployment diagram.
- [ ] ER diagram and data dictionary.
- [ ] Physical/resource specification.
- [ ] Test evidence and results.
- [ ] Final DOC/PDF report.
- [ ] Self-explanatory demo video.
- [ ] Final archive named `CPAD_Assignment_<Group_ID>.zip`.

## Definition of Done

The assignment is ready for submission when:

- [ ] The three required application capabilities work end to end: login, searchable item list, and item details.
- [ ] Architecture layers, responsibilities, components, separation of concerns, and interactions are explicitly documented.
- [ ] UML package and supporting diagrams are readable and justified.
- [ ] The ER model captures entities, attributes, keys, constraints, relationships, and cardinalities.
- [ ] Physical layout and required hardware, software, and people resources are documented.
- [ ] The report is clear, crisp, referenced, and contains evidence of testing.
- [ ] The demo is self-explanatory and reflects the submitted implementation.
- [ ] The final DOC/PDF and ZIP naming/format requirements are satisfied.

## Task Notes and Decisions

Use this section to record decisions as work progresses.

| Date | Task/Decision | Owner | Status | Notes/Evidence |
|---|---|---|---|---|
|  |  |  | Not started |  |
