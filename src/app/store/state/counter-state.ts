export interface ICounterState {
  count: number;
  faulty: boolean;
}

export const initialCounterState: ICounterState = {
  count: 0,
  faulty: false
};
