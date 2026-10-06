# Spec Delta

## Purpose

Defines the "Замовити дзвінок" callback-request flow that captures a visitor's contact details, optionally with a calculator configuration, and routes them into the existing CRM as a storefront customer request.

## ADDED Requirements

### Requirement: Lead-capture flow collects name, phone, and an optional note
The system SHALL let a visitor submit a callback request with a name, a phone number, and an optional free-text note, and SHALL prevent submission when a required field is missing.

#### Scenario: Visitor submits a callback request
- **WHEN** a visitor opens "Замовити дзвінок" and submits a name and phone number, with or without a free-text note
- **THEN** the system submits a storefront customer request for the Levada category with that name, phone, and request text, and no file attachments

#### Scenario: Visitor submits without a required field
- **WHEN** a visitor attempts to submit the callback request without a name or without a phone number
- **THEN** the system prevents submission and indicates which required field is missing

### Requirement: Lead-capture flow attaches calculator configuration when present
The system SHALL include the calculator's selected configuration and computed price (or "за запитом" state) in the submitted request text whenever the flow was opened from the calculator.

#### Scenario: Visitor opens the flow from the calculator
- **WHEN** the lead-capture flow is opened with a selected calculator configuration
- **THEN** the submitted request text includes a summary of edition, quantity, format, pages, cover, binding, paper, color, finish, and the price or "за запитом" state

### Requirement: Lead-capture flow confirms submission without collecting payment
The system SHALL show a confirmation state after a successful submission and SHALL NOT present any payment-collection step at any point in the flow.

#### Scenario: Visitor's request succeeds
- **WHEN** a callback request is submitted successfully
- **THEN** the system shows a confirmation state to the visitor
- **AND** the system does not present a payment-collection step
