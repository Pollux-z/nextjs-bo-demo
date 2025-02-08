// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("test");

// Create a new document in the collection.
db.getCollection("users").updateMany(
  {},
  {
    $set: {
      year2025Leave: {
        vacationLeave: 12,
        personalLeave: 7,
        sickLeave: 30,
      },
    },
  }
);
