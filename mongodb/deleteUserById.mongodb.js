// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('test');

// Create a new document in the collection.
db.getCollection('users').deleteOne({
    _id: ObjectId('6719d4290513741912d0ac8a')
});
