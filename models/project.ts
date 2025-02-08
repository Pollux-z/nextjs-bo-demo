import mongoose, { Schema } from "mongoose";

interface IProject {
  id?: number;
  projectCode?: string;
  projectEng: string;
  projectTh?: string;
  contactCode?: string;
  customerName?: string;
  customerAddress?: string;
  customerTax?: string;
  value?: string;
  valuePeriod?: any[];
  billabilityProject?: any[];
  projectOwner?: string;
  projectManager?: string;
  startDateContact?: string;
  endDateContact?: string;
  letterGuarantee?: string;
  status?: string;
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
  fileContact1?: any[];
  fileContact2?: string;
  fileContact3?: string;
  fileCertificate?: string;
  fileProjectWord?: string;
  fileProjectPowerpoint?: string;
  userCreate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const projectSchema = new Schema<IProject, Document>(
  {
    id: {
      type: Number,
      default: 0,
    },
    projectCode: {
      type: String,
    },
    projectEng: {
      type: String,
      required: true
    },
    projectTh: {
      type: String,
    },
    contactCode: {
      type: String,
    },
    customerName: {
      type: String,
    },
    customerAddress: {
      type: String,
    },
    customerTax: {
      type: String,
    },
    value: {
      type: String,
    },
    valuePeriod: {
      type: Array,
    },
    billabilityProject: {
      type: Array,
    },
    projectOwner: {
      type: String,
    },
    projectManager: {
      type: String,
    },
    startDateContact: {
      type: String,
    },
    endDateContact: {
      type: String,
    },
    letterGuarantee: {
      type: String,
    },
    status: {
      type: String,
      default: "Proposal"
    },
    bankGuaranteeSend: {
      type: String,
    },
    bankGuaranteeReceive: {
      type: String,
    },
    latterGuaranteeSend: {
      type: String,
    },
    letterGuaranteeReceive: {
      type: String,
    },
    refund: {
      type: String,
    },
    pdmoBranch: {
      type: String,
    },
    expert: {
      type: String,
    },
    remark: {
      type: String,
    },
    projectTarget: {
      type: String,
    },
    projectScope: {
      type: String,
    },
    fileContact1: {
      type: Array,
    },
    fileContact2: {
      type: String,
    },
    fileContact3: {
      type: String,
    },
    fileCertificate: {
      type: String,
    },
    fileProjectWord: {
      type: String,
    },
    fileProjectPowerpoint: {
      type: String,
    },
    userCreate: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;
