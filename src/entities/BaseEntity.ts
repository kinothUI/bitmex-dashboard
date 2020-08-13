export default abstract class BaseEntity {
  public readonly account: string;
  public readonly action: string;
  public readonly timestamp: string;

  protected constructor(json: any) {
    this.account = json.account;
    this.action = json.action;
    this.timestamp = json.timestamp;
  }
}
