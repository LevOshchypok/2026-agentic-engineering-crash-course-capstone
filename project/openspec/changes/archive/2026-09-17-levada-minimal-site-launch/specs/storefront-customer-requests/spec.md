# Spec Delta

## ADDED Requirements

### Requirement: CRM users shall be able to configure a category's storefront landing key
The system SHALL allow an authenticated CRM user to set or clear a service category's storefront landing key from the category edit interface, so a category can be made eligible (or ineligible) for storefront customer requests without direct database access.

#### Scenario: CRM user sets a landing key on a category
- **WHEN** an authenticated CRM user edits a service category and sets its storefront landing key
- **THEN** the system saves the landing key so that category becomes eligible to receive storefront customer requests under that key

#### Scenario: CRM user clears a landing key
- **WHEN** an authenticated CRM user removes a previously set storefront landing key from a category
- **THEN** the system saves the category without a landing key so it no longer accepts storefront customer requests
