import CreateTeamForm from '@/Pages/Teams/Partials/CreateTeamForm';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function Create() {
  const { t } = useLaravelReactI18n();

  return (
    <AppLayout
      title={ t('Create Team') }
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            { t('Create Team') }
        </h2>
      )}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <CreateTeamForm />
        </div>
      </div>
    </AppLayout>
  );
}
