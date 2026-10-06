# Spec Delta

## MODIFIED Requirements

### Requirement: Portfolio lists past work items with placeholder imagery
The system SHALL display a list of past-work items on the portfolio page, each with a photo gallery of real photography for that job, a short description, and spec tags covering cover, binding, format, and page count, plus a price-per-copy badge (or "за запитом" when the price is not disclosed for that job).

#### Scenario: Visitor views the portfolio page
- **WHEN** a visitor requests the portfolio page
- **THEN** the system displays a list of past-work items
- **AND** each item shows at least one real photo of that job, a short description, and spec tags for cover, binding, format, and pages
- **AND** each item shows a price-per-copy badge, or "за запитом" when the price is not disclosed for that job

## ADDED Requirements

### Requirement: Portfolio item photo gallery lets visitors browse all photos for a job
The system SHALL let a visitor browse every photo available for a portfolio item via one large "hero" photo plus a strip of tappable thumbnails, without leaving the portfolio page.

#### Scenario: Portfolio item loads with a default hero photo
- **WHEN** a visitor requests the portfolio page
- **THEN** each portfolio item initially displays its first photo as the hero photo

#### Scenario: Visitor taps a thumbnail
- **WHEN** a visitor taps a thumbnail in a portfolio item's thumbnail strip
- **THEN** the system replaces the hero photo with the photo corresponding to that thumbnail
- **AND** the tapped thumbnail is visually indicated as the current selection
