/**
 * Test User Credentials
 * Mock users for development and testing
 */

export interface TestUser {
  email: string;
  password: string;
  displayName: string;
  role: 'student' | 'instructor' | 'admin';
}

export const TEST_USERS: TestUser[] = [
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

export const getTestCredentialsDisplay = (): string => {
  return TEST_USERS.map(user => 
    `${user.role.toUpperCase()}: ${user.email} / ${user.password}`
  ).join('\n');
};