# Jacob & Julia Wedding Day Site

Static phone-first site for the wedding-day QR code.

## Files

- `index.html` contains the page structure.
- `styles.css` contains the mobile-first theme.
- `script.js` powers the itinerary/table tabs and live search.
- `guests.js` contains the seating chart data.

## Updating Seating

Edit `guests.js` and replace the sample records:

```js
{ name: "Guest Name", table: "7", party: "Family Name" }
```

The search ignores capitalization, punctuation, and extra spaces. Guests can type first name, last name, or both.
