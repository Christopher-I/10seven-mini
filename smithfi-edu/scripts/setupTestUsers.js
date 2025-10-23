/**
 * Setup Test Users in Firebase
 * Run this script to create test users for development
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, serverTimestamp } = require('firebase/firestore');

// Firebase config (same as in your app)
const firebaseConfig = {
  apiKey: "AIzaSyB9TIBVB6GH1s4rcvcG3-Wk8cT8wHr65F0",
  authDomain: "seven-3efe8.firebaseapp.com",
  projectId: "seven-3efe8",
  storageBucket: "seven-3efe8.firebasestorage.app",
  messagingSenderId: "138096486687",
  appId: "1:138096486687:web:9ea1e077f389bf80c9e82a",
  measurementId: "G-FKBNBEE6JP"
};

// Test users to create
const testUsers = [
  {
    email: 'student@fundyourfuture.edu',
    password: 'SmithFi123!',
    displayName: 'Jane Student',
    role: 'student'
  },
  {
    email: 'instructor@fundyourfuture.edu', 
    password: 'Teach123!',
    displayName: 'Prof. Smith',
    role: 'instructor'
  },
  {
    email: 'admin@fundyourfuture.edu',
    password: 'Admin123!',
    displayName: 'Admin User',
    role: 'admin'
  }
];

async function setupTestUsers() {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    console.log('🔥 Setting up test users in Firebase...\n');

    for (const testUser of testUsers) {
      try {
        console.log(`Creating user: ${testUser.email}`);

        // Create user account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          testUser.email,
          testUser.password
        );

        // Update profile with display name
        await updateProfile(userCredential.user, {
          displayName: testUser.displayName,
        });

        // Create user profile in Firestore
        const userRef = doc(db, 'users', userCredential.user.uid);
        await setDoc(userRef, {
          uid: userCredential.user.uid,
          email: testUser.email,
          displayName: testUser.displayName,
          emailVerified: false,
          photoURL: null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          role: testUser.role,
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
            totalXP: testUser.role === 'student' ? 150 : 0,
            level: testUser.role === 'student' ? 2 : 1,
            badges: testUser.role === 'student' ? ['first-login', 'module-1-complete'] : [],
            streakDays: testUser.role === 'student' ? 3 : 0,
            lastActive: serverTimestamp()
          },
          subscription: {
            plan: testUser.role === 'admin' ? 'enterprise' : 'free',
            status: 'active',
            startDate: serverTimestamp(),
            features: testUser.role === 'admin' ? ['all-features'] : ['basic-modules', 'progress-tracking']
          }
        });

        console.log(`✅ Created: ${testUser.displayName} (${testUser.email})`);

      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log(`⚠️  User already exists: ${testUser.email}`);
        } else {
          console.error(`❌ Error creating ${testUser.email}:`, error.message);
        }
      }
    }

    console.log('\n🎉 Test user setup complete!');
    console.log('\n📝 Test Credentials:');
    testUsers.forEach(user => {
      console.log(`${user.role.toUpperCase()}: ${user.email} / ${user.password}`);
    });

    process.exit(0);

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run the setup
setupTestUsers();