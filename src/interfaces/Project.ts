export type BillabilityProjectType = {
  _id: string;
  userId: string;
  manDay: number;
};


export type ProjectType = {
  _id: string;
  id: number;
  projectCode: string;
  projectEng: string;
  projectTh: string;
  contactCode?: string;
  customerName?: string;
  customerAddress?: string;
  customerTax?: string;
  value?: string;
  valuePeriod?: string[]; // Array of strings
  billabilityProject?: BillabilityProjectType[]; // Array of strings
  projectOwner?: string;
  projectManager?: string;
  startDateContact?: string;
  endDateContact?: string;
  letterGuarantee?: string;
  status: string;
  bankGuaranteeSend?: string;
  bankGuaranteeReceive?: string;
  latterGuaranteeSend?: string;
  letterGuaranteeReceive?: string;
  refund?: string;
  pdmoBranch?: string;
  expert?: string;
  remark?: string;
  projectTarget?: string;
  projectScope?: string;
  fileContact1?: string[]; // Array of strings
  fileContact2?: string;
  fileContact3?: string;
  fileCertificate?: string;
  fileProjectWord?: string;
  fileProjectPowerpoint?: string;
  userCreate?: string;
  createdAt?: Date;
  updatedAt?: Date;
  totalBillability?: number;
};
