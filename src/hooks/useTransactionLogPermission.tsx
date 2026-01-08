import { useState, useEffect, useCallback } from 'react';
import { useUserPermissions } from '@/hooks/useAuthUser';
import { TransactionLogAccessRequest, AuthorizationResponse } from '@/Types/verified-permissions';
import { checkTransactionLogAccessAPI } from '@/services/api/transactionLogAccessApi';

interface TransactionLogPermissionState {
  canAccessLogs: boolean;
  loading: boolean;
  error: string | null;
  hasHisaStaffAccess: boolean;
}

interface UseTransactionLogPermissionProps {
  logsId?: string;
  autoCheck?: boolean;
}

/**
 * Custom hook to check if the current user can access transaction logs
 * Uses the Transaction Log Access API for authorization decisions
 */
export const useTransactionLogPermission = ({
  logsId,
  autoCheck = true
}: UseTransactionLogPermissionProps = {}) => {
  const [permissionState, setPermissionState] = useState<TransactionLogPermissionState>({
    canAccessLogs: false,
    loading: true,
    error: null,
    hasHisaStaffAccess: false
  });

  const { userData, permissions, hasAccess } = useUserPermissions();

  const checkPermissionWithAPI = useCallback(async (): Promise<{ canAccess: boolean; hasHisaStaff: boolean }> => {
    if (!userData?.hisaPersonId) {
      return { canAccess: false, hasHisaStaff: false };
    }

    try {
      const request: TransactionLogAccessRequest = {
        userId: userData.hisaPersonId,
        logsId: logsId || 'system-check',
        action: 'view',
        context: {
          userPermissions: permissions,
          userData: userData,
          requestSource: 'transaction-log-permission-hook'
        }
      };

      const response = await checkTransactionLogAccessAPI(request);
      
      const canAccess = response.decision === 'ALLOW';
      // Check if user has HisaStaff access based on the API response
      const hasHisaStaff = canAccess && (
        permissions?.generalAuthGroups?.includes('HisaStaff') ||
        permissions?.generalAuthGroups?.includes('HelpDesk') ||
        false
      );
      
      return { canAccess, hasHisaStaff };
    } catch (error) {
      console.error('Error checking transaction log permission:', error);
      return { canAccess: false, hasHisaStaff: false };
    }
  }, [userData, permissions, logsId]);

  const checkSystemAccess = useCallback(async (): Promise<{ canAccess: boolean; hasHisaStaff: boolean }> => {
    if (!userData?.hisaPersonId) {
      return { canAccess: false, hasHisaStaff: false };
    }

    try {
      const request: TransactionLogAccessRequest = {
        userId: userData.hisaPersonId,
        // No logsId for system-wide access check
        context: {
          userPermissions: permissions,
          userData: userData,
          requestSource: 'system-access-check-hook'
        }
      };

      const response = await checkTransactionLogAccessAPI(request);
      
      const canAccess = response.decision === 'ALLOW';
      const hasHisaStaff = canAccess && (
        permissions?.generalAuthGroups?.includes('HisaStaff') ||
        permissions?.generalAuthGroups?.includes('HelpDesk') ||
        false
      );
      
      return { canAccess, hasHisaStaff };
    } catch (error) {
      console.error('Error checking system access permission:', error);
      return { canAccess: false, hasHisaStaff: false };
    }
  }, [userData, permissions]);

  useEffect(() => {
    if (!autoCheck) return;

    if (!userData && !permissions) {
      setPermissionState({
        canAccessLogs: false,
        loading: false,
        error: 'No user data available',
        hasHisaStaffAccess: false
      });
      return;
    }

    setPermissionState(prev => ({ ...prev, loading: true, error: null }));

    // Check permissions with API
    checkPermissionWithAPI()
      .then(({ canAccess, hasHisaStaff }) => {
        setPermissionState({
          canAccessLogs: canAccess,
          loading: false,
          error: null,
          hasHisaStaffAccess: hasHisaStaff
        });
      })
      .catch(error => {
        setPermissionState({
          canAccessLogs: false,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          hasHisaStaffAccess: false
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, permissions, logsId, autoCheck]);

  const refreshPermissions = useCallback(() => {
    setPermissionState(prev => ({ ...prev, loading: true, error: null }));

    // Check permissions with API
    checkPermissionWithAPI()
      .then(({ canAccess, hasHisaStaff }) => {
        setPermissionState({
          canAccessLogs: canAccess,
          loading: false,
          error: null,
          hasHisaStaffAccess: hasHisaStaff
        });
      })
      .catch(error => {
        setPermissionState({
          canAccessLogs: false,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          hasHisaStaffAccess: false
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkSpecificLog = useCallback(async (specificLogsId: string) => {
    if (!userData?.hisaPersonId) {
      return { canAccess: false, hasHisaStaff: false };
    }

    setPermissionState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const request: TransactionLogAccessRequest = {
        userId: userData.hisaPersonId,
        logsId: specificLogsId,
        action: 'view',
        context: {
          userPermissions: permissions,
          userData: userData,
          requestSource: 'specific-log-check-hook'
        }
      };

      const response = await checkTransactionLogAccessAPI(request);
      
      const canAccess = response.decision === 'ALLOW';
      const hasHisaStaff = canAccess && (
        permissions?.generalAuthGroups?.includes('HisaStaff') ||
        permissions?.generalAuthGroups?.includes('HelpDesk') ||
        false
      );

      setPermissionState({
        canAccessLogs: canAccess,
        loading: false,
        error: null,
        hasHisaStaffAccess: hasHisaStaff
      });
      
      return { canAccess, hasHisaStaff };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setPermissionState({
        canAccessLogs: false,
        loading: false,
        error: errorMessage,
        hasHisaStaffAccess: false
      });
      return { canAccess: false, hasHisaStaff: false };
    }
  }, [userData, permissions]);

  return {
    ...permissionState,
    refreshPermissions,
    checkSystemAccess,
    checkSpecificLog
  };
};