# TypeScript Build Errors - Fixes Required

## Error 1 & 2: HistoryPage.tsx (lines 28, 72)
**Problem**: `useDayLog()` called with 0 arguments, expects 1 (date: string)

**Fix**: 
- Line 28: Change `const { dayLog, isLoading } = useDayLog();` 
- To: `const dateString = selectedDate.toISOString().split('T')[0]; const { dayLog, isLoading } = useDayLog(dateString);`

---

## Error 3 & 4: db-firebase.ts (lines 85, 114)
**Problem**: Type casting `{ id: string }` to `DayLog` is incomplete

**Line 85 context**: Likely in a function that retrieves a document
**Line 114 context**: Another document retrieval

**Fix**: Instead of `as DayLog`, construct a complete object:
```typescript
const data = docSnap.data();
const dayLog: DayLog = {
  date: data.date || '',
  meals: data.meals || { breakfast: [], lunch: [], dinner: [], snack: [] },
  totals: data.totals || { calories: 0, protein: 0, carbs: 0, sugar: 0, fat: 0, saturatedFat: 0, fiber: 0, sodium: 0 },
  goals: data.goals || { calories: 2000, protein: 150, carbs: 250, sugar: 50, fat: 70, fiber: 30, sodium: 2300 }
};
```

---

## Error 5 & 6: db.ts (lines 65, 83)
**Problem**: Same as db-firebase.ts - incomplete type casting

**Fix**: Apply the same solution as above
