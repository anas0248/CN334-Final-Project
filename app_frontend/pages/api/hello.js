// Base URL สำหรับ API calls
export const PRODUCT_API_URL = process.env.NEXT_PUBLIC_PRODUCT_API_URL || 'http://localhost:3341';
export const USER_API_URL = process.env.NEXT_PUBLIC_USER_API_URL || 'http://localhost:3342';

// Function สำหรับเรียก Product API
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${PRODUCT_API_URL}/api/products/`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function สำหรับเรียก User API
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${USER_API_URL}/api/users/`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};