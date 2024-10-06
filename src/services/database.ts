import localforage from 'localforage';

// ... (keep existing interfaces)

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const handleDatabaseError = async (operation: string, fn: () => Promise<any>, retries = 0): Promise<any> => {
  try {
    return await fn();
  } catch (error) {
    console.error(`Error in ${operation}:`, error);
    if (error instanceof Error && error.name === 'InvalidStateError' && retries < MAX_RETRIES) {
      console.log(`Retrying ${operation} (attempt ${retries + 1})...`);
      await wait(RETRY_DELAY);
      return handleDatabaseError(operation, fn, retries + 1);
    }
    throw new Error(`Failed to ${operation}. Please try again.`);
  }
};

export const createUser = async (email: string, password: string, role: string): Promise<void> => {
  await handleDatabaseError('create user', async () => {
    const users = await localforage.getItem<Record<string, User>>('users') || {};
    if (users[email]) {
      throw new Error('User already exists');
    }
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      role,
    };
    users[email] = newUser;
    await localforage.setItem('users', users);
    console.log('User created successfully:', email);
  });
};

export const verifyPassword = async (email: string, password: string): Promise<boolean> => {
  return handleDatabaseError('verify password', async () => {
    const users = await localforage.getItem<Record<string, User>>('users') || {};
    const user = users[email];
    if (!user) {
      return false;
    }
    return user.password === password;
  });
};

export const updateUserPassword = async (email: string, currentPassword: string, newPassword: string): Promise<void> => {
  await handleDatabaseError('update user password', async () => {
    const users = await localforage.getItem<Record<string, User>>('users') || {};
    const user = users[email];
    if (!user || user.password !== currentPassword) {
      throw new Error('Invalid current password');
    }
    user.password = newPassword;
    await localforage.setItem('users', users);
    console.log('Password updated successfully for:', email);
  });
};

export const exportData = async (): Promise<string> => {
  return handleDatabaseError('export data', async () => {
    const data = {
      users: await localforage.getItem('users'),
      customers: await localforage.getItem('customers'),
      invoices: await localforage.getItem('invoices'),
      roles: await localforage.getItem('roles'),
    };
    return JSON.stringify(data);
  });
};

export const importData = async (jsonData: string): Promise<void> => {
  await handleDatabaseError('import data', async () => {
    const data = JSON.parse(jsonData);
    await localforage.setItem('users', data.users);
    await localforage.setItem('customers', data.customers);
    await localforage.setItem('invoices', data.invoices);
    await localforage.setItem('roles', data.roles);
    console.log('Data imported successfully');
  });
};

export const initializeDatabase = async (): Promise<void> => {
  await handleDatabaseError('initialize database', async () => {
    const users = await localforage.getItem('users');
    if (!users) {
      await localforage.setItem('users', {});
    }
    const customers = await localforage.getItem('customers');
    if (!customers) {
      await localforage.setItem('customers', []);
    }
    const invoices = await localforage.getItem('invoices');
    if (!invoices) {
      await localforage.setItem('invoices', []);
    }
    const roles = await localforage.getItem('roles');
    if (!roles) {
      await localforage.setItem('roles', []);
    }
    console.log('Database initialized');
  });
};