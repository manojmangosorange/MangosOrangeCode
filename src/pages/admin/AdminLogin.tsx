import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authService } from '@/lib/auth';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, ArrowLeft } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  name: z.string().min(1, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  adminEmail: z.string().email('Please enter a valid admin email'),
  adminPassword: z.string().min(6, 'Admin password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', adminEmail: '', adminPassword: '' },
  });

  const onLogin = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const user = await authService.signIn(data.email, data.password);
      if (user) {
        toast.success('Welcome back!');
        // Redirect based on role
        if (user.role === 'Admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/admin');
        }
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const onSignup = async (data: SignupFormData) => {
    setLoading(true);
    try {
      // Verify admin credentials first
      const adminToken = await authService.verifyAdminCredentials(data.adminEmail, data.adminPassword);
      if (!adminToken) {
        toast.error('Invalid admin credentials. Only admins can create accounts.');
        return;
      }

      const created = await authService.signUpWithAdminToken(
        data.email,
        data.password,
        'Recruiter',
        data.name,
        adminToken
      );
      if (!created) {
        toast.error('Failed to create account');
        return;
      }

      // Sign in as the newly created recruiter to get their token
      const user = await authService.signIn(data.email, data.password);
      if (!user) {
        toast.error('Account created, but login failed. Please sign in.');
        return;
      }

      toast.success('Account created successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to website */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-800 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>
        </div>

        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">MangosOrange Admin</CardTitle>
            <CardDescription>
              Career Management System
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                     <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Re-enter password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="border-t pt-4 mt-4">
                      <p className="text-sm text-muted-foreground mb-3">Admin verification required to create accounts:</p>
                      
                      <FormField
                        control={signupForm.control}
                        name="adminEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Admin Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter admin email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signupForm.control}
                        name="adminPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Admin Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter admin password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
