export interface UiSlice {
  sidebarCollapsed: boolean;
  unauthorizedModalOpen: boolean;
  activeModal: string | null;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setUnauthorizedModalOpen: (open: boolean) => void;
  setActiveModal: (modal: string | null) => void;
}

export const createUiSlice = (
  set: (partial: Partial<UiSlice> | ((state: UiSlice) => Partial<UiSlice>)) => void,
): UiSlice => ({
  sidebarCollapsed: false,
  unauthorizedModalOpen: false,
  activeModal: null,
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  setUnauthorizedModalOpen: (unauthorizedModalOpen) => set({ unauthorizedModalOpen }),
  setActiveModal: (activeModal) => set({ activeModal }),
});
