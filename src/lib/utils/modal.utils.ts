import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const handleCloseModalWithSuccess = (router: AppRouterInstance) => {
  router.back();

  setTimeout(() => {
    router.refresh();
  }, 100);
};
