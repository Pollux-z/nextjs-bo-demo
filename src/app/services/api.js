import { axiosInstance } from "./fetcher";

// Section create (POST) Data
export const createUser = async (url, { arg }) => {
  await axiosInstance.post(url, {
    userCode: arg.userCode,
    nameTh: arg.nameTh,
    nameEng: arg.nameEng,
    employeeEmail: arg.employeeEmail,
    password: arg.password,
    nickNameTh: arg.nickNameTh,
    employeeProfile: arg.employeeProfile,
    employeeTitle: arg.employeeTitle,
    employeeTeams: arg.employeeTeams,
    employeeTel: arg.employeeTel,
    employeeBirthDay: arg.employeeBirthDay,
    startDate: arg.startDate,
    endDate: arg.endDate,
    teamLeader: arg.teamLeader,
    year2024Leave: arg.year2024Leave,
    year2025Leave: arg.year2025Leave,
    role: arg.role,
    costPerManDay: arg.costPerManDay,
    targetManDay: arg.targetManDay,
    remark: arg.remark,
    userCreate: arg.userCreate,
  });
};

export const createSendEmail = async (url, { arg }) => {
  await axiosInstance.post(url, {
    to: arg.to,
    subject: arg.subject,
    textEmail: arg.textEmail,
  });
};

export const createReserveCarrecord = async (url, { arg }) => {
  await axiosInstance.post(url, {
    id: arg.id,
    category: arg.category,
    subject: arg.subject,
    startDate: arg.startDate,
    endDate: arg.endDate,
    startTime: arg.startTime,
    endTime: arg.endTime,
    userCreate: arg.userCreate,
    remark: arg.remark,
  });
};

export const createCarrecord = async (url, { arg }) => {
  await axiosInstance.post(url, {
    code: arg.code,
    destination: arg.destination,
    startDistance: arg.startDistance,
    remark: arg.remark,
    userCreate: arg.userCreate,
  });
};

export const createMeetingRoom = async (url, { arg }) => {
  await axiosInstance.post(url, {
    id: arg.id,
    category: arg.category,
    subject: arg.subject,
    startDate: arg.startDate,
    endDate: arg.endDate,
    startTime: arg.startTime,
    endTime: arg.endTime,
    remark: arg.remark,
    userCreate: arg.userCreate,
  });
};

export const createTimeOff = async (url, { arg }) => {
  await axiosInstance.post(url, {
    id: arg.id,
    employee: arg.employee,
    type: arg.type,
    reason: arg.reason,
    issueDate: arg.issueDate,
    status: arg.status,
    halfDay: arg.halfDay,
    userCreate: arg.userCreate,
  });
};

export const createProject = async (url, { arg }) => {
  await axiosInstance.post(url, {
    projectCode: arg.projectCode,
    projectEng: arg.projectEng,
    projectTh: arg.projectTh,
    contactCode: arg.contactCode,
    customerName: arg.customerName,
    customerAddress: arg.customerAddress,
    customerTax: arg.customerTax,
    value: arg.value,
    valuePeriod: arg.valuePeriod,
    billabilityProjects: arg.billabilityProjects,
    projectOwner: arg.projectOwner,
    projectManager: arg.projectManager,
    startDateContact: arg.startDateContact,
    endDateContact: arg.endDateContact,
    letterGuarantee: arg.letterGuarantee,
    status: arg.status,
    bankGuaranteeSend: arg.bankGuaranteeSend,
    bankGuaranteeReceive: arg.bankGuaranteeReceive,
    latterGuaranteeSend: arg.latterGuaranteeSend,
    letterGuaranteeReceive: arg.letterGuaranteeReceive,
    refund: arg.refund,
    pdmoBranch: arg.pdmoBranch,
    expert: arg.expert,
    remark: arg.remark,
    // projectTarget: arg.projectTarget,
    // projectScope: arg.projectScope,
    // fileContact1: arg.fileContact1,
    // fileContact2: arg.fileContact2,
    // fileContact3: arg.fileContact3,
    userCreate: arg.userCreate,
  });
};

export const createCoverletter = async (url, { arg }) => {
  await axiosInstance.post(url, {
    id: arg.id,
    subject: arg.subject,
    project: arg.project,
    issueDate: arg.issueDate,
    remark: arg.remark,
    userCreate: arg.userCreate,
  });
};

export const createTopUp = async (url, { arg }) => {
  await axiosInstance.post(url, {
    employee: arg.employee,
    topUpDay: arg.topUpDay,
    type: arg.type,
    remark: arg.remark,
    userCreate: arg.userCreate,
  });
};

export const createSwapDate = async (url, { arg }) => {
  await axiosInstance.post(url, {
    id: arg.id,
    employee: arg.employee,
    actionDate: arg.actionDate,
    projectAction: arg.projectAction,
    swapDate: arg.swapDate,
    status: arg.status,
    attachFile: arg.attachFile,
    remark: arg.remark,
    userCreate: arg.userCreate,
  });
};

// section update (PUT) Data
export const updateCarrecord = async (url, { arg }) => {
  await axiosInstance.put(url, {
    endDistance: arg.endDistance,
    floor: arg.floor,
    slot: arg.slot,
    remark: arg.remark,
  });
};

export const updateUser = async (url, { arg }) => {
  await axiosInstance.put(url, {
    nameTh: arg.nameTh,
    nameEng: arg.nameEng,
    nickNameTh: arg.nickNameTh,
    employeeProfile: arg.employeeProfile,
    employeeTitle: arg.employeeTitle,
    employeeTeams: arg.employeeTeams,
    employeeTel: arg.employeeTel,
    employeeEmail: arg.employeeEmail,
    employeeBirthDay: arg.employeeBirthDay,
    startDate: arg.startDate,
    endDate: arg.endDate,
    teamLeader: arg.teamLeader,
    vacationYear: arg.vacationYear,
    vacationLeave: arg.vacationLeave,
    sickLeave: arg.sickLeave,
    personalLeave: arg.personalLeave,
    remark: arg.remark,
    password: arg.password,
    role: arg.role,
  });
};

export const updateTimeOff = async (url, { arg }) => {
  await axiosInstance.put(url, {
    employee: arg.employee,
    type: arg.type,
    reason: arg.reason,
    status: arg.status,
    issueDate: arg.issueDate,
    halfDay: arg.halfDay,
  });
};

export const updateProject = async (url, { arg }) => {
  await axiosInstance.put(url, {
    projectCode: arg.projectCode,
    projectEng: arg.projectEng,
    projectTh: arg.projectTh,
    contactCode: arg.contactCode,
    customerName: arg.customerName,
    customerAddress: arg.customerAddress,
    customerTax: arg.customerTax,
    value: arg.value,
    valuePeriod: arg.valuePeriod,
    billabilityProjects: arg.billabilityProjects,
    projectOwner: arg.projectOwner,
    projectManager: arg.projectManager,
    startDateContact: arg.startDateContact,
    endDateContact: arg.endDateContact,
    letterGuarantee: arg.letterGuarantee,
    status: arg.status,
    bankGuaranteeSend: arg.bankGuaranteeSend,
    bankGuaranteeReceive: arg.bankGuaranteeReceive,
    latterGuaranteeSend: arg.latterGuaranteeSend,
    letterGuaranteeReceive: arg.letterGuaranteeReceive,
    refund: arg.refund,
    pdmoBranch: arg.pdmoBranch,
    expert: arg.expert,
    remark: arg.remark,
    projectTarget: arg.projectTarget,
    projectScope: arg.projectScope,
    userCreate: arg.userCreate,
  });
};

export const updateCoverLetter = async (url, { arg }) => {
  await axiosInstance.put(url, {
    subject: arg.subject,
    project: arg.project,
    issueDate: arg.issueDate,
    remark: arg.remark,
    userCreate: arg.userCreate,
  });
};

export const updateSwapDate = async (url, { arg }) => {
  await axiosInstance.put(url, {
    id: arg.id,
    employee: arg.employee,
    actionDate: arg.actionDate,
    projectAction: arg.projectAction,
    swapDate: arg.swapDate,
    status: arg.status,
    attachFile: arg.attachFile,
    remark: arg.remark,
    userCreate: arg.userCreate,
  });
};

export const updateReserve = async (url, { arg }) => {
  await axiosInstance.put(url, {
    id: arg.id,
    category: arg.category,
    subject: arg.subject,
    startDate: arg.startDate,
    endDate: arg.endDate,
    startTime: arg.startTime,
    endTime: arg.endTime,
    remark: arg.remark,
    userCreate: arg.userCreate,
  });
};

export const deleteReserve = async (url, { arg }) => {
  await axiosInstance.delete(url, {});
};

export const createNotification = async (url, { arg }) => {
  await axiosInstance.post(url, {
    title: arg.title,
    userRequest: arg.userRequest,
    userReceive: arg.userReceive,
    typeRequest: arg.typeRequest,
    timestamp: arg.timestamp,
    message: arg.message,
    statusRead: arg.statusRead,
    userCreate: arg.userCreate,
  });
};

export const createInternalCharge = async (url, { arg }) => {
  await axiosInstance.post(url, {
    title: arg.title,
    buyerUserId: arg.buyerUserId,
    sellerUserId: arg.sellerUserId,
    sellerTeam: arg.sellerTeam,
    sellerUser: arg.sellerUser,
    projectRequest: arg.projectRequest,
    note: arg.note,
    status: arg.status,
  });
}

export const updateInternalCharge = async (url, { arg }) => {
  await axiosInstance.put(url, {
    title: arg.title,
    buyerUserId: arg.buyerUserId,
    sellerUserId: arg.sellerUserId,
    sellerTeam: arg.sellerTeam,
    sellerUser: arg.sellerUser,
    projectRequest: arg.projectRequest,
    note: arg.note,
    status: arg.status,
  });
}

export const deleteInternalCharge = async (url, { arg }) => {
  await axiosInstance.delete(url, {});
};

export const createResignation = async (url, { arg }) => {
  await axiosInstance.post(url, {
    userRequest: arg.userRequest,
    effectiveDate: arg.effectiveDate,
    note: arg.note,
    status: arg.status,
    userCreate: arg.userCreate,
  });
};

export const updateResignation = async (url, { arg }) => {
  await axiosInstance.put(url, {
    userRequest: arg.userRequest,
    effectiveDate: arg.effectiveDate,
    note: arg.note,
    status: arg.status,
    userCreate: arg.userCreate,
  });
};

export const deleteResignation = async (url, { arg }) => {
  await axiosInstance.delete(url, {});
};
