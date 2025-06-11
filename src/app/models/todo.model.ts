export interface To_do {
  id?: number;
  todoName: string;
  description: string;
  visible: boolean;
  dueDate: string; // o Date si lo conviertes
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}
