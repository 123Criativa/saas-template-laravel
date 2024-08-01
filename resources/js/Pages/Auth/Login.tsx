import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputError from '@/Components/InputError';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import { Button } from '@/shadcn/ui/button';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface Props {
  canResetPassword: boolean;
  status: string;
}

export default function Login({ canResetPassword, status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
    password: '',
    remember: '',
  });

  const { t } = useLaravelReactI18n();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('login'), {
      onFinish: () => form.reset('password'),
    });
  }

  return (
    <AuthenticationCard>
      <Head title= { t('Log in') } />

      <form onSubmit={onSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">
                { t('Login') }
            </CardTitle>
            <CardDescription>
                { t('Enter your email below to login to your account') }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status && (
              <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                {status}
              </div>
            )}

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">
                    { t('Email') }
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={ t('myemail@example.com') }
                  value={form.data.email}
                  onChange={e => form.setData('email', e.currentTarget.value)}
                  required
                />
                <InputError className="mt-2" message={form.errors.email} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">
                      { t('Password') }
                  </Label>
                  <Link
                    href={route('password.request')}
                    className="ml-auto inline-block text-sm underline"
                  >
                      { t('Forgot your password?') }
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={form.data.password}
                  onChange={e => form.setData('password', e.currentTarget.value)}
                  required
                  autoComplete="current-password"
                />
                <InputError className="mt-2" message={form.errors.password} /></div>
              <Button type="submit" className="w-full">
                  { t('Log in') }
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                { t('Don\'t have an account?') }{' '}
              <Link href={route('register')} className="underline">
                  { t('Sign up') }
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </AuthenticationCard>
  );
}
