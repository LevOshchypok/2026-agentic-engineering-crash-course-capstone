# Spec Delta

## Purpose

Defines the portfolio ("Наші роботи") listing that showcases past print jobs with placeholder imagery and spec details, to build visitor trust ahead of a callback request.

## ADDED Requirements

### Requirement: Portfolio lists past work items with placeholder imagery
The system SHALL display a list of past-work items on the portfolio page, each with a placeholder image area, a short description, and spec tags covering cover, binding, format, page count, and quantity.

#### Scenario: Visitor views the portfolio page
- **WHEN** a visitor requests the portfolio page
- **THEN** the system displays a list of past-work items
- **AND** each item shows a placeholder image area, a short description, and spec tags for cover, binding, format, pages, and quantity

### Requirement: Portfolio layout adapts from mobile to desktop
The system SHALL render the portfolio page as a single, mobile-first column that remains centered with a bounded maximum width on wider viewports.

#### Scenario: Visitor views the portfolio page on a desktop-width viewport
- **WHEN** a visitor views the portfolio page on a viewport wider than mobile
- **THEN** the system renders the same layout, centered, with a maximum content width
