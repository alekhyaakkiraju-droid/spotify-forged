export interface VisualizerSlice {
  isActive: boolean;
  barCount: number;
  frequencyData: number[];
  setActive: (isActive: boolean) => void;
  setBarCount: (barCount: number) => void;
  setFrequencyData: (data: number[]) => void;
}

export const createVisualizerSlice = (
  set: (
    partial:
      | Partial<VisualizerSlice>
      | ((state: VisualizerSlice) => Partial<VisualizerSlice>),
  ) => void,
): VisualizerSlice => ({
  isActive: false,
  barCount: 64,
  frequencyData: [],
  setActive: (isActive) => set({ isActive }),
  setBarCount: (barCount) => set({ barCount }),
  setFrequencyData: (frequencyData) => set({ frequencyData }),
});
