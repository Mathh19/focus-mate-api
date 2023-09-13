export type WeekDays =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export interface Task {
  id: string;
  name: string;
  description?: string;
  weekDays?: WeekDays[];
  finished?: boolean;
  inFocous?: boolean;
}