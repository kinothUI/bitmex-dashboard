import BaseEntity from "./BaseEntity";

export default class OrderFull extends BaseEntity {
  public avgPx: any; // null on testnet
  public clOrdID: string;
  public clOrdLinkID: string;
  public contengencyType: string;
  public cumQty: number;
  public currency: string;
  public displayQty: any; // wahrscheinlich wenn "Display only" Order
  public exDestination: string;
  public execInst: string;
  public leavesQty: number;
  public multiLegReportingType: string;
  public ordRejReason: string;
  public ordStatus: string;
  public ordType: string;
  public orderID: string;
  public orderQty: number;
  public pegOffsetValue: any; // null on testnet
  public pegPriceType: string;
  public price: number;
  public settlCurrency: string;
  public side: string;
  public simpleCumQty: any; // null on testnet
  public simpleLeavesQty: any; // null on testnet
  public simpleOrderQty: any; // null on testnet
  public stopPx: any; // null on testnet
  public symbol: string;
  public text: string;
  public timeInForce: string;
  public transactTime: string;
  public triggered: string;
  public workingIndicator: boolean;

  constructor(json: any) {
    super(json);

    this.clOrdID = json.clOrdID;
    this.clOrdLinkID = json.clOrdLinkID;
    this.contengencyType = json.contengencyType;
    this.cumQty = json.cumQty;
    this.currency = json.currency;
    this.exDestination = json.exDestination;
    this.execInst = json.execInst;
    this.leavesQty = json.leavesQty;
    this.multiLegReportingType = json.multiLegReportingType;
    this.ordRejReason = json.ordRejReason;
    this.ordStatus = json.ordStatus;
    this.ordType = json.ordType;
    this.orderID = json.orderID;
    this.orderQty = json.orderQty;
    this.pegOffsetValue = json.pegOffsetValue;
    this.pegPriceType = json.pegPriceType;
    this.price = json.price;
    this.settlCurrency = json.settlCurrency;
    this.side = json.side;
    this.simpleCumQty = json.simpleCumQty;
    this.simpleLeavesQty = json.simpleLeavesQty;
    this.simpleOrderQty = json.simpleOrderQty;
    this.stopPx = json.stopPx;
    this.symbol = json.symbol;
    this.text = json.text;
    this.timeInForce = json.timeInForce;
    this.transactTime = json.transactTime;
    this.triggered = json.triggered;
    this.workingIndicator = json.workingIndicator;
  }
}
