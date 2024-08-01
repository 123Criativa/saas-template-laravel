import useRoute from '@/Hooks/useRoute';
import ActionSection from '@/Components/ActionSection';
import ConfirmationModal from '@/Components/ConfirmationModal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Team } from '@/types';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface Props {
  team: Team;
}

export default function DeleteTeamForm({ team }: Props) {
  const { t } = useLaravelReactI18n();
  const route = useRoute();
  const [confirmingTeamDeletion, setConfirmingTeamDeletion] = useState(false);
  const form = useForm({});

  function confirmTeamDeletion() {
    setConfirmingTeamDeletion(true);
  }

  function deleteTeam() {
    form.delete(route('teams.destroy', [team]), {
      errorBag: 'deleteTeam',
    });
  }

  return (
    <ActionSection
      title={ t('Delete Team') }
      description={ t('Permanently delete this team.') }
    >
      <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
          { t('Once a team is deleted, all of its resources and data will be permanently deleted. Before deleting this team, please download any data or information regarding this team that you wish to retain.') }
      </div>

      <div className="mt-5">
        <DangerButton onClick={confirmTeamDeletion}>
            { t('Delete Team') }
        </DangerButton>
      </div>

      {/* <!-- Delete Team Confirmation Modal --> */}
      <ConfirmationModal
        isOpen={confirmingTeamDeletion}
        onClose={() => setConfirmingTeamDeletion(false)}
      >
        <ConfirmationModal.Content title={ t('Delete Team') }>
            { t('Are you sure you want to delete this team? Once a team is deleted, all of its resources and data will be permanently deleted.') }
        </ConfirmationModal.Content>

        <ConfirmationModal.Footer>
          <SecondaryButton onClick={() => setConfirmingTeamDeletion(false)}>
              { t('Cancel') }
          </SecondaryButton>

          <DangerButton
            onClick={deleteTeam}
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
              { t('Delete Team') }
          </DangerButton>
        </ConfirmationModal.Footer>
      </ConfirmationModal>
    </ActionSection>
  );
}
