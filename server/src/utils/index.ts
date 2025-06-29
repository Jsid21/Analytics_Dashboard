export const handleError = (error: any, res: any) => {
  console.error(error);
  res.status(500).json({ message: 'An error occurred', error: error.message });
};

export const validateToken = (token: string) => {
  // Token validation logic goes here
  return true; // Placeholder for actual validation
};