# Spec Delta

## Purpose

Defines the price calculator screen, where a visitor configures a print job and sees a live indicative price, computed from confirmed pricing inputs, before requesting a callback.

## ADDED Requirements

### Requirement: Calculator computes a live price from confirmed pricing inputs
The system SHALL compute a unit price and a total price (unit × quantity) from the page count, color mode, cover, and binding fields whenever every selected value has a confirmed price, and SHALL recompute immediately after any field changes. The system SHALL apply the confirmed volume discount when quantity exceeds 100 copies.

#### Scenario: Visitor selects only priced options
- **WHEN** a visitor selects page count, color mode, cover, and binding values that all have a confirmed price
- **THEN** the system displays a unit price and a total price that update immediately after each field change

#### Scenario: Volume discount applies past 100 copies
- **WHEN** the selected quantity is greater than 100 copies
- **THEN** the system applies the confirmed volume discount to the computed unit price

### Requirement: Calculator marks unpriced options as "за запитом" instead of guessing
The system SHALL display "за запитом" instead of a computed number whenever a visitor selects an option with no confirmed price, and SHALL NOT add an invented amount to the displayed price for that option.

#### Scenario: Visitor selects an option with no confirmed price
- **WHEN** a visitor selects шиття binding, пружина binding, офсет 100 paper, крейда 130 paper, or any lamination/finish option
- **THEN** the system displays "за запитом" instead of a computed total for the affected price
- **AND** the system does not silently add an invented amount to the displayed price

### Requirement: Calculator keeps the current price visible while scrolling
The system SHALL keep the current price state and the callback action visible in a bar pinned to the bottom of the viewport while a visitor scrolls through the calculator's configuration fields.

#### Scenario: Visitor scrolls through the configuration fields
- **WHEN** a visitor scrolls the calculator page
- **THEN** the current unit price and total price, or the "за запитом" state, remain visible in a bar pinned to the bottom of the viewport
- **AND** the "Замовити дзвінок" action remains visible in that same bar

### Requirement: Calculator carries the selected configuration into a callback request
The system SHALL attach the visitor's full selected configuration and the computed price (or "за запитом" state) to the lead-capture flow when a callback is requested from the calculator.

#### Scenario: Visitor requests a callback from the calculator
- **WHEN** a visitor activates "Замовити дзвінок" from the calculator
- **THEN** the system opens the lead-capture flow with the selected configuration (edition type, quantity, format, pages, cover, binding, paper, color, finish) and the computed price or "за запитом" state attached

### Requirement: Calculator v1 excludes print-file upload
The system SHALL NOT present a print-ready file upload control ("Макет") on the calculator in this release.

#### Scenario: Visitor looks for a way to attach a print-ready file
- **WHEN** a visitor uses the calculator
- **THEN** the system does not present a file-upload control for a print-ready file

### Requirement: Calculator layout adapts from mobile to desktop
The system SHALL render the calculator as a single, mobile-first column that remains centered with a bounded maximum width on wider viewports.

#### Scenario: Visitor views the calculator on a desktop-width viewport
- **WHEN** a visitor views the calculator page on a viewport wider than mobile
- **THEN** the system renders the same single-column field layout, centered, with a maximum content width
