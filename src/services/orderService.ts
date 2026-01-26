import api, { USE_MOCK_DATA } from './api';
import { Order, CreateOrderData } from '@/types';
import { mockOrders } from '@/data/mockOrders';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const orderService = {
  async create(data: CreateOrderData): Promise<Order> {
    if (USE_MOCK_DATA) {
      await delay(1000);
      
      // Simulate order creation
      const newOrder: Order = {
        _id: 'ord-' + Date.now(),
        userId: '1',
        items: [],
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod,
        paymentStatus: 'paid',
        orderStatus: 'pending',
        subtotal: 0,
        shippingCost: 10,
        tax: 0,
        totalAmount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return newOrder;
    }
    
    const response = await api.post<Order>('/orders', data);
    return response.data;
  },

  async getMyOrders(): Promise<Order[]> {
    if (USE_MOCK_DATA) {
      await delay(500);
      return mockOrders;
    }
    
    const response = await api.get<Order[]>('/orders/my-orders');
    return response.data;
  },

  async getById(id: string): Promise<Order> {
    if (USE_MOCK_DATA) {
      await delay(300);
      const order = mockOrders.find(o => o._id === id);
      if (!order) throw new Error('Order not found');
      return order;
    }
    
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },

  // Admin endpoints
  async getAll(): Promise<Order[]> {
    if (USE_MOCK_DATA) {
      await delay(500);
      return mockOrders;
    }
    
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },

  async updateStatus(id: string, status: Order['orderStatus']): Promise<Order> {
    if (USE_MOCK_DATA) {
      await delay(400);
      const order = mockOrders.find(o => o._id === id);
      if (!order) throw new Error('Order not found');
      return { ...order, orderStatus: status, updatedAt: new Date().toISOString() };
    }
    
    const response = await api.patch<Order>(`/orders/${id}/status`, { status });
    return response.data;
  },
};
