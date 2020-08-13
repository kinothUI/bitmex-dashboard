import BaseEntity from "entities/BaseEntity";

export default class MarginFull extends BaseEntity {
  public availableMargin: number;
  public commission: any; // partial null
  public confirmedDebit: number;
  public currency: string;
  public excessMargin: number;
  public excessMarginPcnt: number;
  public grossComm: number;
  public grossExecCost: number;
  public grossLastValue: number;
  public grossMarkValue: number;
  public grossOpenCost: number;
  public grossOpenPremium: number;
  public indicativeTax: number;
  public initMargin: number;
  public maintMargin: number;
  public marginBalance: number;
  public marginBalancePcnt: number;
  public marginLeverage: number;
  public marginUsedPcnt: number;
  public pendingCredit: number;
  public pendingDebit: number;
  public prevRealisedPnl: number;
  public prevState: string;
  public prevUnrealisedPnl: number;
  public realisedPnl: number;
  public riskLimit: number;
  public riskValue: number;
  public sessionMargin: number;
  public state: string;
  public syntheticMargin: any; //partial null
  public targetExcessMargin: number;
  public taxableMargin: number;
  public unrealisedPnl: number;
  public unrealisedProfit: number;
  public varMargin: number;
  public walletBalance: number;
  public withdrawableMargin: number;

  constructor(json: any) {
    super(json);

    this.availableMargin = json.availableMargin;
    this.commission = json.commission;
    this.confirmedDebit = json.confirmedDebit;
    this.currency = json.currency;
    this.excessMargin = json.excessMargin;
    this.excessMarginPcnt = json.excessMarginPcnt;
    this.grossComm = json.grossComm;
    this.grossExecCost = json.grossExecCost;
    this.grossLastValue = json.grossLastValue;
    this.grossMarkValue = json.grossMarkValue;
    this.grossOpenCost = json.grossOpenCost;
    this.grossOpenPremium = json.grossOpenPremium;
    this.indicativeTax = json.indicativeTax;
    this.initMargin = json.initMargin;
    this.maintMargin = json.maintMargin;
    this.marginBalance = json.marginBalance;
    this.marginBalancePcnt = json.marginBalancePcnt;
    this.marginLeverage = json.marginLeverage;
    this.marginUsedPcnt = json.marginUsedPcnt;
    this.pendingCredit = json.pendingCredit;
    this.pendingDebit = json.pendingDebit;
    this.prevRealisedPnl = json.prevRealisedPnl;
    this.prevState = json.prevState;
    this.prevUnrealisedPnl = json.prevUnrealisedPnl;
    this.realisedPnl = json.realisedPnl;
    this.riskLimit = json.riskLimit;
    this.riskValue = json.riskValue;
    this.sessionMargin = json.sessionMargin;
    this.state = json.state;
    this.syntheticMargin = json.syntheticMargin;
    this.targetExcessMargin = json.targetExcessMargin;
    this.taxableMargin = json.taxableMargin;
    this.unrealisedPnl = json.unrealisedPnl;
    this.unrealisedProfit = json.unrealisedProfit;
    this.varMargin = json.varMargin;
    this.walletBalance = json.walletBalance;
    this.withdrawableMargin = json.withdrawableMargin;
  }
}
