export class SandboxSetting {
  private readonly eMail: string;

  constructor(eMail: string) {
    this.eMail = eMail;
  }

  get eMail(): string {
    return this.eMail;
  }
}
