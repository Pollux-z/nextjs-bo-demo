import React from 'react'

const FilterYearID: React.FC<{ issueDate: string, idCreate: number }> = ({issueDate, idCreate}) => {
    const dates = new Date(issueDate);
    const getYear = dates.getFullYear();
    const objID = idCreate < 10 ? `000${idCreate}` : idCreate < 100 ? `00${idCreate}` : `0${idCreate}`
    const idYear = `${getYear}/${objID}`
  return idYear;
}

export default FilterYearID