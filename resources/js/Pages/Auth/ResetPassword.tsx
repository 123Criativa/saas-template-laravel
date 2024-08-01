import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputError from '@/Components/InputError';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface Props {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: Props) {
  const route = useRoute();
  const { t } = useLaravelReactI18n();
  const form = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.update'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthenticationCard>
      <Head title={ t('Reset Password') } />

      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>
                { t('Reset Password') }
            </CardTitle>
            <CardDescription>
                { t('Enter your new password') }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="email">
                  { t('Email') }
              </Label>

              <Input
                id="email"
                type="email"
                name="email"
                value={form.data.email}
                className="mt-1 block w-full"
                autoComplete="username"
                onChange={e => form.setData('email', e.currentTarget.value)}
                required
                autoFocus
              />

              <InputError className="mt-2" message={form.errors.email} />
            </div>

            <div className="mt-4">
              <Label htmlFor="password">
                  { t('Password') }
              </Label>

              <Input
                id="password"
                type="password"
                name="password"
                value={form.data.password}
                className="mt-1 block w-full"
                onChange={e => form.setData('password', e.currentTarget.value)}
                required
                autoComplete="new-password"
              />

              <InputError className="mt-2" message={form.errors.password} />
            </div>

            <div className="mt-4">
              <Label htmlFor="password_confirmation">
                  { t('Confirm Password') }
              </Label>

              <Input
                type="password"
                name="password_confirmation"
                value={form.data.password_confirmation}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={e =>
                  form.setData('password_confirmation', e.currentTarget.value)
                }
                required
              />

              <InputError
                className="mt-2"
                message={form.errors.password_confirmation}
              />
            </div>
          </CardContent>

          <CardFooter className="justify-end">
            <Button disabled={form.processing}>
                { t('Reset Password') }
            </Button>
          </CardFooter>
        </Card>
      </form>
    </AuthenticationCard>
  );
}
