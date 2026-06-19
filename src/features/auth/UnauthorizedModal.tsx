import * as Dialog from "@radix-ui/react-dialog";
import { useAppStore } from "@/shared/stores/appStore";
import { useAuth } from "@/features/auth/useAuth";

export function UnauthorizedModal() {
  const open = useAppStore((s) => s.unauthorizedModalOpen);
  const setOpen = useAppStore((s) => s.setUnauthorizedModalOpen);
  const { login } = useAuth();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-spotify-highlight p-6 text-white shadow-xl">
          <Dialog.Title className="text-lg font-semibold">Session expired</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-white/70">
            Your Spotify session has expired. Please sign in again to continue.
          </Dialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-full px-4 py-2 text-sm text-white/70 hover:text-white"
              >
                Dismiss
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                void login();
              }}
              className="rounded-full bg-spotify-green px-4 py-2 text-sm font-medium text-black"
            >
              Sign in with Spotify
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
