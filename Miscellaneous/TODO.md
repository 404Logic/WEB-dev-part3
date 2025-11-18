# TODO: Enhance JavaScript Validation for All Forms

## Overview
Enhance the existing JavaScript validation in `script.js` for all forms (contact, review, inquiry) with better rules, real-time feedback, and South African-specific validations.

## Tasks
- [ ] Enhance contact form validation (contact.html)
  - Add real-time validation on input blur
  - Improve phone number validation for South African format (+27 XX XXX XXXX)
  - Add minimum/maximum length checks
  - Improve email regex
- [ ] Enhance review form validation (testimonials.html)
  - Add real-time validation
  - Validate rating selection
  - Improve message length requirements
- [ ] Enhance inquiry form validation (products.html)
  - Add real-time validation
  - Validate phone number format
  - Ensure all required fields are properly checked
- [ ] Update validation functions in script.js
  - Add real-time feedback functions
  - Improve error messaging
  - Add success states
- [ ] Test all forms after changes
  - Verify validation works on all pages
  - Check error messages display correctly
  - Ensure forms submit only when valid

## Files to Edit
- script.js (main validation logic)
- Pages/contact.html (if needed for form attributes)
- Pages/testimonials.html (if needed)
- Pages/products.html (if needed)

## Followup Steps
- Test forms in browser
- Verify real-time feedback
- Check South African phone validation
