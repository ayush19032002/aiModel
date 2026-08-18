import bcrypt from 'bcryptjs';

export interface MockUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  status: string;
}

// Global in-memory store for the mock database
export const mockUsers: MockUser[] = [
  {
    id: 'mock-user-123',
    email: 'demo@gbpgrowthpro.com',
    // Hash for "demo123"
    passwordHash: bcrypt.hashSync('demo123', 10),
    name: 'Demo User',
    role: 'ADMIN',
    status: 'ACTIVE'
  }
];

export const findUserByEmail = (email: string): MockUser | undefined => {
  return mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id: string): MockUser | undefined => {
  return mockUsers.find((u) => u.id === id);
};

export const createUser = (email: string, passwordHash: string, name: string): MockUser => {
  const newUser: MockUser = {
    id: `user-${Date.now()}`,
    email: email.toLowerCase(),
    passwordHash,
    name,
    role: 'USER',
    status: 'ACTIVE'
  };
  mockUsers.push(newUser);
  return newUser;
};
