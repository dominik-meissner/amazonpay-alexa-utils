export class SandboxSetting {
  private readonly eMail: string;

  constructor(email: string) {
    this.eMail = email;
  }

  get email(): string {
    return this.email;
  }
}
