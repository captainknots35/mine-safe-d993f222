// Test account emails to exclude from analytics
// These accounts are used for testing and should not appear in production metrics
export const TEST_ACCOUNT_EMAILS = [
  "focalpointshopify@gmail.com",
  "christopher.stull@example.com",
  "christopherstull@gmail.com",
  // Add any other test emails here
];

// Check if an email belongs to a test account
export const isTestAccount = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const lowerEmail = email.toLowerCase();
  return TEST_ACCOUNT_EMAILS.some(testEmail => 
    lowerEmail === testEmail.toLowerCase() ||
    lowerEmail.includes("stull")
  );
};

// Filter out test accounts from a list of profiles
export const filterTestAccounts = <T extends { email?: string | null }>(items: T[]): T[] => {
  return items.filter(item => !isTestAccount(item.email));
};
