import jwt from 'jsonwebtoken'

interface DecodedToken {
  user: {
    id: string;
    role: string
  }
}

export const getRoleFromToken = (token: string): string | null => {
  try {
    const decoded = jwt.decode(token) as DecodedToken;
    return decoded?.user?.role || null;
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};

export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwt.decode(token) as DecodedToken;
    return decoded?.user?.id || null;
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};