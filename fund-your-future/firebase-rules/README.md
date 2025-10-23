# Firebase Setup Instructions

## 🔥 Apply Firebase Security Rules

### 1. Firestore Rules
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `seven-3efe8`
3. Navigate to **Firestore Database > Rules**
4. Copy the contents of `firestore.rules` and paste into the rules editor
5. Click **Publish**

### 2. Authentication Rules
1. Navigate to **Authentication > Settings**
2. In the **Authorized domains** section, add:
   - `localhost` (for development)
   - Your production domain when ready

### 3. Test the Setup
After applying the rules, you can test:

```bash
# Run the development server
npm run dev

# The app will show test credentials on the login screen:
# STUDENT: student@fundyourfuture.edu / Fund Your Future123!
# INSTRUCTOR: instructor@fundyourfuture.edu / Teach123!
# ADMIN: admin@fundyourfuture.edu / Admin123!
```

## 🧪 Test User Accounts Created

The following test accounts are already created in Firebase Auth:

| Role | Email | Password |
|------|-------|----------|
| Student | student@fundyourfuture.edu | Fund Your Future123! |
| Instructor | instructor@fundyourfuture.edu | Teach123! |
| Admin | admin@fundyourfuture.edu | Admin123! |

## 📊 What to Expect

Once rules are applied and you sign in:
1. User profiles will be created in Firestore
2. Progress tracking will work
3. Analytics events will be recorded
4. You'll see user data in Firebase Console

## 🔧 Next Steps

1. Apply the Firestore rules above
2. Test login with any of the test accounts
3. Check Firebase Console to see user data being created
4. Test the whack-a-mole game to see progress tracking