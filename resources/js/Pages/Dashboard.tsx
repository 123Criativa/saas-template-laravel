import React from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function Dashboard() {
  const { t } = useLaravelReactI18n();

  return (
    <AppLayout
      title="Dashboard"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {t('Dashboard')}
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <Welcome />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
