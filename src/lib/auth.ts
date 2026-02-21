import { Admin } from '@/types/career';
import { api, apiFetch, setAuthToken, clearAuthToken } from '@/lib/api';

export const authService = {
  async verifyAdminCredentials(email: string, password: string): Promise<string | null> {
    try {
      const response = await api.post<{ token: string; user: Admin }>('auth_login.php', {
        email,
        password,
      });
      return response.token || null;
    } catch (error) {
      console.error('Admin verification error:', error);
      return null;
    }
  },

  async signIn(email: string, password: string): Promise<Admin | null> {
    try {
      console.log('Attempting sign in for:', email);
      
      const response = await api.post<{ token: string; user: Admin }>('auth_login.php', {
        email,
        password,
      });

      if (response.token && response.user) {
        // Store token
        setAuthToken(response.token);
        
        // Store user data
        localStorage.setItem('admin_user', JSON.stringify(response.user));
        
        console.log('Authentication successful for:', email);
        return response.user;
      }

      return null;
    } catch (error) {
      console.error('Sign in error:', error);
      return null;
    }
  },

  async signUp(email: string, password: string, role: 'Admin' | 'Recruiter' = 'Recruiter', name?: string): Promise<Admin | null> {
    try {
      const response = await api.post<{ id?: string; success?: boolean }>('admin_users.php', {
        email,
        password,
        role,
        name: name || email.split('@')[0],
      });

      const id = (response as any)?.id;
      return {
        id: id ? String(id) : 'new',
        email,
        name: name || email.split('@')[0],
        role,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return null;
    }
  },

  async signUpWithAdminToken(
    email: string,
    password: string,
    role: 'Admin' | 'Recruiter' = 'Recruiter',
    name?: string,
    adminToken?: string
  ): Promise<Admin | null> {
    try {
      const response = await apiFetch<{ id?: string; success?: boolean }>('admin_users.php', {
        method: 'POST',
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : undefined,
        body: JSON.stringify({
          email,
          password,
          role,
          name: name || email.split('@')[0],
        }),
      });

      const id = (response as any)?.id;
      return {
        id: id ? String(id) : 'new',
        email,
        name: name || email.split('@')[0],
        role,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Sign up with admin token error:', error);
      return null;
    }
  },

  async signOut(): Promise<void> {
    clearAuthToken();
  },

  async getCurrentUser(): Promise<Admin | null> {
    try {
      const stored = localStorage.getItem('admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  async resetPassword(email: string): Promise<boolean> {
    try {
      console.warn('resetPassword is not implemented for email-based resets:', email);
      return false;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  },

  async listRecruiters(): Promise<Array<{ id: string; email: string; name: string; role: string; created_at: string }>> {
    try {
      const response = await api.get<any>('admin_users.php');
      return Array.isArray(response) ? response : response?.data || [];
    } catch (error) {
      console.error('List recruiters error:', error);
      return [];
    }
  },

  async deleteRecruiter(id: string): Promise<boolean> {
    try {
      await api.delete<{ success: boolean }>(`admin_users.php?id=${encodeURIComponent(id)}`);
      return true;
    } catch (error) {
      console.error('Delete recruiter error:', error);
      return false;
    }
  },

  async resetRecruiterPassword(id: string, password: string): Promise<boolean> {
    try {
      await api.put<{ success: boolean }>('admin_users.php', { id, password });
      return true;
    } catch (error) {
      console.error('Reset recruiter password error:', error);
      return false;
    }
  },

  async updateRecruiterRole(id: string, role: 'Admin' | 'Recruiter'): Promise<boolean> {
    try {
      await api.put<{ success: boolean }>('admin_users.php', { id, role });
      return true;
    } catch (error) {
      console.error('Update recruiter role error:', error);
      return false;
    }
  },
};
