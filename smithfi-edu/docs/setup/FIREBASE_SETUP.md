# 🔥 Firebase Setup Instructions

## Quick Fix for "Profile Loaded: No" Issue

### Step 1: Apply Temporary Firestore Rules (IMMEDIATE FIX)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **seven-3efe8**
3. Navigate to **Firestore Database** → **Rules**
4. Replace ALL existing rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all authenticated users to read/write everything
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

5. Click **Publish**
6. Wait 30 seconds for rules to propagate

### Step 2: Re-run Profile Creation Script

After applying the rules above:

```bash
node scripts/fixUserProfile.js
```

This will create profiles for all test users.

### Step 3: Test Authentication

1. Visit: http://localhost:3004/test-auth
2. Sign out if already logged in
3. Sign in again with any test account
4. You should now see "Profile Loaded: Yes"

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| 👨‍🎓 Student | student@fundyourfuture.edu | Fund Your Future123! |
| 👩‍🏫 Instructor | instructor@fundyourfuture.edu | Teach123! |
| 👑 Admin | admin@fundyourfuture.edu | Admin123! |

## Troubleshooting

### Still seeing "Profile Loaded: No"?

1. **Clear browser data**: 
   - Open DevTools (F12)
   - Go to Application tab
   - Clear Storage → Clear site data

2. **Check Firestore**:
   - Go to Firebase Console → Firestore
   - Look for a `users` collection
   - Check if user documents exist

3. **Re-run the fix script**:
   ```bash
   node scripts/fixUserProfile.js
   ```

### Production Security Rules

Once testing is complete, apply the secure rules from `/firebase-rules/firestore.rules` for production use.

## What This Fixes

- ✅ User profiles will be created in Firestore
- ✅ Progress tracking will work
- ✅ XP and levels will display
- ✅ Game sessions will be saved
- ✅ Analytics will be recorded

## Need Help?

Check the browser console (F12) for detailed error messages. The most common issue is Firestore permissions not being updated.