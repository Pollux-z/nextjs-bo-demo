export type BusinessOperationType = {
    name: string;
    value: string;
}

export const businessOperations: Array<BusinessOperationType> = [
    {
      name: "เบิกจ่าย",
      value: "expenserequest",
    },
    {
      name: "Swap-date",
      value: "swapdate",
    },
  ];