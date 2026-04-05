/**
 * CASL Ability Types
 * 
 * Define permission types for the application
 */

export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';

export type Subjects = 
  | 'User'
  | 'Project'
  | 'Freelancer'
  | 'Notification'
  | 'all';

export interface AppAbility {
  action: Actions;
  subject: Subjects;
}
