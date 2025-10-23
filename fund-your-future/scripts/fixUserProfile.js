/**
 * Fix User Profile in Firestore
 * Creates or updates user profiles for existing auth users
 */

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc, serverTimestamp } = require('firebase/firestore');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB9TIBVB6GH1s4rcvcG3-Wk8cT8wHr65F0",
  authDomain: "seven-3efe8.firebaseapp.com",
  projectId: "seven-3efe8",
  storageBucket: "seven-3efe8.firebasestorage.app",
  messagingSenderId: "138096486687",
  appId: "1:138096486687:web:9ea1e077f389bf80c9e82a",
  measurementId: "G-FKBNBEE6JP"
};

async function fixUserProfiles() {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    console.log('🔧 Fixing user profiles...\n');

    // Test users
    const users = [
      { email: 'student@fundyourfuture.edu', password: 'Fund Your Future123!', displayName: 'Jane Student', role: 'student' },
      { email: 'instructor@fundyourfuture.edu', password: 'Teach123!', displayName: 'Prof. Smith', role: 'instructor' },
      { email: 'admin@fundyourfuture.edu', password: 'Admin123!', displayName: 'Admin User', role: 'admin' }
    ];

    for (const userData of users) {
      try {
        console.log(`Processing: ${userData.email}`);
        
        // Sign in as the user
        const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
        const user = userCredential.user;
        
        // Check if profile exists
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          console.log(`Creating profile for ${userData.email}...`);
          
          // Create profile
          await setDoc(userRef, {
            uid: user.uid,
            email: userData.email,
            displayName: userData.displayName,
            emailVerified: user.emailVerified,
            photoURL: null,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            role: userData.role,
            preferences: {
              theme: 'system',
              notifications: {
                email: true,
                push: true,
                reminders: true
              },
              privacy: {
                shareProgress: false,
                publicProfile: false
              }
            },
            progress: {
              modules: {},
              totalXP: userData.role === 'student' ? 250 : 0,
              level: userData.role === 'student' ? 3 : 1,
              badges: userData.role === 'student' ? ['first-login', 'module-1-complete', 'streak-3'] : [],
              streakDays: userData.role === 'student' ? 5 : 0,
              lastActive: serverTimestamp()
            },
            subscription: {
              plan: userData.role === 'admin' ? 'enterprise' : 'free',
              status: 'active',
              startDate: serverTimestamp(),
              features: userData.role === 'admin' ? ['all-features'] : ['basic-modules', 'progress-tracking']
            }
          });
          
          console.log(`✅ Profile created for ${userData.email}`);
        } else {
          console.log(`✅ Profile already exists for ${userData.email}`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${userData.email}:`, error.message);
      }
    }
    
    console.log('\n🎉 Profile fix complete!');
    console.log('\nNOTE: If you see permission errors, you need to update Firestore rules:');
    console.log('1. Go to Firebase Console > Firestore > Rules');
    console.log('2. Replace with rules from /firebase-rules/firestore.rules');
    console.log('3. Click Publish');
    
    process.exit(0);

  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the fix
fixUserProfiles();