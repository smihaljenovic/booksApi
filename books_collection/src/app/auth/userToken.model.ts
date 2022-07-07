export class UserToken {
  type: string;
  token: string;
  expires_at: Date | number;


  constructor(init?: any) {
    if (init.type) this.type = init.type;
    if (init.token) this.token = init.token;
    if (init.expires_at) this.expires_at = new Date(init.expires_at);
  }

  get isValid() {
    if (!this.token || new Date() > this.expires_at) return false
    return true
  }

}
