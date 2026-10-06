# Spec Delta

## Purpose

Defines the public Levada marketing homepage, which establishes credibility and price positioning for a visitor and routes them into the calculator or the lead-capture flow.

## ADDED Requirements

### Requirement: Homepage displays a trust bar and a pricing snapshot
The system SHALL display, on the homepage, a 3-stat trust bar (years of experience, minimum print run, starting price) and a pricing snapshot listing the confirmed soft-cover and hard-cover package prices.

#### Scenario: Visitor loads the homepage
- **WHEN** a visitor requests the homepage
- **THEN** the system displays the trust bar with years of experience, minimum print run, and starting price
- **AND** the system displays a pricing snapshot with the confirmed soft-cover and hard-cover prices

### Requirement: Homepage provides the two primary calls to action
The system SHALL let a visitor either request a callback or open the calculator directly from the homepage, and SHALL repeat the callback action in a closing band at the end of the page.

#### Scenario: Visitor requests a callback from the homepage
- **WHEN** a visitor activates "Замовити дзвінок" on the homepage
- **THEN** the system opens the lead-capture flow with no calculator configuration attached

#### Scenario: Visitor opens the calculator from the homepage
- **WHEN** a visitor activates "Розрахувати вартість" on the homepage
- **THEN** the system navigates the visitor to the calculator page

#### Scenario: Visitor reaches the closing CTA band
- **WHEN** a visitor scrolls to the bottom of the homepage
- **THEN** the system displays a closing call-to-action band with a control that opens the lead-capture flow

### Requirement: Homepage lists what Levada prints
The system SHALL display a "Що друкуємо" section listing each printed-item category Levada offers, with its starting price or "за запитом" when no starting price is confirmed.

#### Scenario: Visitor views the "Що друкуємо" section
- **WHEN** a visitor views the "Що друкуємо" section of the homepage
- **THEN** the system displays books, magazines, ISBN & distribution, and short-run/print-on-demand as separate items
- **AND** each item shows its starting price, or "за запитом" if no starting price is confirmed

### Requirement: Homepage layout adapts from mobile to desktop
The system SHALL render the homepage as a single, mobile-first column that remains centered with a bounded maximum width on wider viewports, rather than stretching an undesigned layout across the full screen width.

#### Scenario: Visitor views the homepage on a desktop-width viewport
- **WHEN** a visitor views the homepage on a viewport wider than mobile
- **THEN** the system renders the same single-column layout, centered, with a maximum content width
