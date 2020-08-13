// import BaseEntity from "entities/BaseEntity";

export default class UserFull {
  public id?: number;
  public ownerId?: number;
  public firstname?: string;
  public lastname?: string;
  public username: string;
  public email?: string;
  public phone?: string;
  public created?: string;
  public lastUpdated?: string;
  public preferences?: {
    alertOnLiquidations?: boolean;
    animationsEnabled?: boolean;
    announcementsLastSeen?: string;
    chatChannelID?: number;
    colorTheme?: string;
    currency?: string;
    debug?: boolean;
    disableEmails?: string[];
    disablePush?: string[];
    hideConfirmDialogs?: string[];
    hideConnectionModal?: boolean;
    hideFromLeaderboard?: boolean;
    hideNameFromLeaderboard?: boolean;
    hideNotifications?: string[];
    locale?: string;
    msgsSeen?: string[];
    orderBookBinning?: object;
    orderBookType?: string;
    orderClearImmediate?: boolean;
    orderControlsPlusMinus?: boolean;
    showLocaleNumbers?: boolean;
    sounds?: string[];
    strictIPCheck?: boolean;
    strictTimeout?: boolean;
    tickerGroup?: string;
    tickerPinned?: boolean;
    tradeLayout?: string;
  };
  public TFAEnabled?: string;
  public affiliateID?: string;
  public pgpPubKey?: string;
  public pgpPubKeyCreated?: string;
  public country?: string;
  public geoipCountry?: string;
  public geoipRegion?: string;
  public typ?: string;

  constructor(json: any) {
    // super(json);

    this.id = json.id;
    this.ownerId = json.ownerId;
    this.firstname = json.firstname;
    this.lastname = json.lastname;
    this.username = json.username;
    this.email = json.email;
    this.phone = json.phone;
    this.created = json.created;
    this.lastUpdated = json.lastUpdated;
    this.preferences = json.preferences;
    this.TFAEnabled = json.TFAEnabled;
    this.affiliateID = json.affiliateID;
    this.pgpPubKey = json.pgpPubKey;
    this.pgpPubKeyCreated = json.pgpPubKeyCreated;
    this.country = json.country;
    this.geoipCountry = json.geoipCountry;
    this.geoipRegion = json.geoipRegion;
    this.typ = json.typ;
  }
}
