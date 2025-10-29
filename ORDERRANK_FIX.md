# Fix OrderRank Corruption

The "Unknown bucket: a6" error is caused by corrupted orderRank data.

## Quick Fix using Vision Tool

1. Go to http://localhost:3001/studio/vision
2. Paste and run each of these queries ONE AT A TIME:

```groq
// Fix Pages
*[_type == "page" && defined(orderRank)] {
  "patch": {
    "id": _id,
    "unset": ["orderRank"]
  }
}
```

```groq
// Fix Industries
*[_type == "industry" && defined(orderRank)] {
  "patch": {
    "id": _id,
    "unset": ["orderRank"]
  }
}
```

3. For each query result, click the "Mutations" tab
4. Click "Commit" to apply the changes
5. Refresh the Studio

The orderRanks will regenerate automatically when you reorder items.
