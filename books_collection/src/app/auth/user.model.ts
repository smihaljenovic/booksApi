export class User {
  id: number;
  createdAt?: Date | number;
  updatedAt?: Date | number;
  email?: string;
  firstName?: string;
  lastName?: string;
  isAuthor?: boolean;
  rememberMeToken?: string;
  role?: string;
  password?: string;


  constructor(init?: any) {
    if (init.id) this.id = init.id;
    if (init.created_at) this.createdAt = init.created_at || null;
    if (init.updated_at) this.updatedAt = init.updated_at || null;
    if (init.email) this.email = init.email || '';
    if (init.first_name) this.firstName = init.first_name || '';
    if (init.last_name) this.lastName = init.last_name || '';
    if (init.is_author) this.isAuthor = init.is_author || false;
    if (init.remember_me_token) this.rememberMeToken = init.remember_me_token || '';
    if (init.role) this.role = init.role || 'ROLE_USER';
    if (init.password) this.password = init.password || '';
  }

}
