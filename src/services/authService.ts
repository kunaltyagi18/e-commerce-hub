import api, { USE_MOCK_DATA } from './api';
import { User, AuthResponse, LoginCredentials, RegisterCredentials } from '@/types';
import { mockUsers, mockCredentials } from '@/data/mockUsers';

// Simulate network delay for mock data
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      await delay(800);
      
      // Check mock credentials
      if (
        (credentials.email === mockCredentials.user.email && credentials.password === mockCredentials.user.password) ||
        (credentials.email === mockCredentials.admin.email && credentials.password === mockCredentials.admin.password)
      ) {
        const user = mockUsers.find(u => u.email === credentials.email)!;
        const token = 'mock-jwt-token-' + user._id;
        return { user, token };
      }
      
      throw new Error('Invalid email or password');
    }
    
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(data: RegisterCredentials): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      await delay(800);
      
      // Check if email already exists
      if (mockUsers.some(u => u.email === data.email)) {
        throw new Error('Email already registered');
      }
      
      const newUser: User = {
        _id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const token = 'mock-jwt-token-' + newUser._id;
      return { user: newUser, token };
    }
    
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async getProfile(): Promise<User> {
    if (USE_MOCK_DATA) {
      await delay(300);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      throw new Error('Not authenticated');
    }
    
    const response = await api.get<User>('/auth/profile');
    return response.data;
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    if (USE_MOCK_DATA) {
      await delay(500);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = { ...JSON.parse(storedUser), ...data };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
      throw new Error('Not authenticated');
    }
    
    const response = await api.put<User>('/auth/profile', data);
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
