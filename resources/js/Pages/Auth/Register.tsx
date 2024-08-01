import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import { Button } from '@/shadcn/ui/button';
import { Checkbox } from '@/shadcn/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function Register() {
  const page = useTypedPage();
  const route = useRoute();
  const { t } = useLaravelReactI18n();
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('register'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthenticationCard>
      <Head title={ t('Register') } />

      <form onSubmit={onSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">
                { t('Sign up') }
            </CardTitle>
            <CardDescription>
                { t('Enter your information to create an account') }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">
                    { t('Name') }
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={ t('Full Name') }
                  onChange={e => form.setData('name', e.currentTarget.value)}
                  value={form.data.name}
                  required
                  autoFocus
                  autoComplete="name"
                />
                <InputError className="mt-2" message={form.errors.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">
                    { t('Email') }
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={ t('myemail@example.com') }
                  onChange={e => form.setData('email', e.currentTarget.value)}
                  value={form.data.email}
                  required
                />
                <InputError className="mt-2" message={form.errors.email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">
                    { t('Password') }
                </Label>
                <Input
                  id="password"
                  type="password"
                  onChange={e => form.setData('password', e.currentTarget.value)}
                  value={form.data.password}
                  required
                  autoComplete="new-password"
                />
                <InputError className="mt-2" message={form.errors.password} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">
                    { t('Retype Password') }
                </Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  onChange={e =>
                    form.setData('password_confirmation', e.currentTarget.value)
                  }
                  value={form.data.password_confirmation}
                  required
                  autoComplete="new-password"
                />
                <InputError
                  className="mt-2"
                  message={form.errors.password_confirmation}
                />
              </div>

              {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
                <div className="mt-4">
                  <InputLabel htmlFor="terms">
                    <div className="flex items-center">
                      <Checkbox
                        name="terms"
                        id="terms"
                        checked={form.data.terms}
                        onCheckedChange={e => {
                          form.setData('terms', e.valueOf() as boolean);
                        }}
                        required
                      />

                      <div className="ml-2">
                          { t('I agree to the') }
                        <a
                          target="_blank"
                          href={route('terms.show')}
                          className="ml-1 mr-1 underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            { t('Terms') }
                        </a>
                          { t('and') }
                        <a
                          target="_blank"
                          href={route('policy.show')}
                          className="ml-1 underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            { t('Privacy Policy') }
                        </a>
                      </div>
                    </div>
                    <InputError className="mt-2" message={form.errors.terms} />
                  </InputLabel>
                </div>
              )}

              <Button type="submit" className="w-full">
                  { t('Create an account') }
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                { t('Already have an account?') }{' '}
              <Link href={route('login')} className="underline">
                  { t('Sign in') }
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </AuthenticationCard>
  );
}
