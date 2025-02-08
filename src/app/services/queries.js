import useSWR from "swr"


// *Session: Users
export function useUsersJoinTeamlead(){
    return useSWR("/api/totalUsers/joinTeamLeader")
}

export function useUsers(){
    return useSWR("/api/totalUsers")
}

export function useUser(id, { enabled = true } = {}){
    const shouldFetch = enabled && id; // Fetch only if enabled and id is truthy
  return useSWR(shouldFetch ? `/api/totalUsers/${id}` : null);
}

export function useUserLastId(){
    return useSWR(`/api/totalUsers/lastId`)
}

export function useUsersAll(){
    return useSWR(`/api/totalUsers/byAllUsers`)
}

export function useUsersJoinBillabilityProject(){
    return useSWR(`/api/totalUsers/joinBillabilityProject`)
}

export function useUsersJoinTimeOff(){
    return useSWR(`/api/totalUsers/joinTimeoff`)
}

export function useUsersTeamConsultant(){
    return useSWR(`/api/totalUsers/teamConsultant`)
}

// *End Session: Users

// *Session: Coverletters

export function useCoverLetters(){
    return useSWR("/api/totalCoverletter")
}
export function useLastCoverLetters(){
    return useSWR("/api/lastCoverletter")
}

export function useCoverLetter(id){
    return useSWR(`/api/totalCoverletter/${id}`)
}

// *End Session: Coverletters

// *Session: Projects

export function useProjects(){
    return useSWR(`/api/totalProject`)
}

export function useProject(id){
    return useSWR(`/api/totalProject/${id}`)
}

export function useProjectLast(){
    return useSWR(`/api/totalProject/last`)
}

// *End Session: Projects

// *Session: Carrecords

export function useCarrecord(){
    return useSWR(`api/totalCarrecord`)
}
export function useLastCarrecord(){
    return useSWR(`api/lastCarrecord`)
}

// *End Session: Carrecords

// *Session: Reserves

export function useReserve(id){
    return useSWR(`/api/totalReserve/${id}`)
}
export function useReserves(){
    return useSWR(`/api/totalReserve`)
}

export function useMeetingRoomJoinEmployees(sortDate){
    return useSWR(`/api/totalReserve/joinMeetingRoomEmployees?sortDate=${sortDate}`)
}

export function useReserveLastId(){
    return useSWR(`/api/totalReserve/lastId`)
}

export function useReserveCategory(category){
    return useSWR(`/api/totalReserve/category?items=${category}`)
}

// *End Session: Reserves

// *Session: Announcements

export function useAnnouncements(){
    return useSWR(`/api/totalAnnouncement`)
}

// *End Session: Announcements

// *Session: Timeoffs

export function useTimeOffs(){
    return useSWR(`/api/totalTimeOff`)
}
export function useTimeOff(id){
    return useSWR(`/api/totalTimeOff/${id}`)
}

export function useTimeOffLast(){
    return useSWR(`/api/totalTimeOff/last`)
}

export function useTimeOffUser(user){
    return useSWR(`api/totalTimeOff/user?value=${user}`)
}

export function useTimeOffJoinUsers(){
    return useSWR(`api/totalTimeOff/joinEmployee`)
}

// *End Session: Timeoffs

// *Session: Topups

export function useTopUps(){
    return useSWR(`/api/totalTopUp`)
}
export function useTopUpsJoinEmployees(){
    return useSWR(`/api/totalTopUp/joinEmployees`)
}

export function useTopUp(id){
    return useSWR(`/api/totalTopUp/${id}`)
}

export function useTopUpLast(){
    return useSWR(`/api/totalTopUp/last`)
}

// *End Session: Topups

// *Session: Swap date

export function useSwapDates(){
    return useSWR(`/api/totalSwapDate`)
}

export function useSwapDate(id){
    return useSWR(`/api/totalSwapDate/${id}`)
}

export function useSwapDateLast(){
    return useSWR(`/api/totalSwapDate/last`)
}

export function useSwapDateJoinEmployee(){
    return useSWR(`/api/totalSwapDate/joinEmployee`)
}

export function useGetDocumentations(){
    return useSWR(`/api/getDocumentation`)
}

export function useGetKnowledges(){
    return useSWR(`/api/getKnowledge`)
}

export function useGetKnowledgeById(id){
    return useSWR(`/api/getKnowledge/${id}`)
}

export function useGetWorkprocess(){
    return useSWR(`/api/getWorkprocess`)
}

export function useGetNotificationByUserId(id){
    return useSWR(`/api/totalNotification/byUserId?userId=${id}`)
}


export function useGetNotifications(){
    return useSWR(`/api/totalNotification`)
}

// *Session: Internal Charges

export function useInternalCharges(){
    return useSWR(`/api/totalInternalCharge`)
}

export function useInternalChargeById(id){
    return useSWR(`/api/totalInternalCharge/${id}`)
}

// *End Session: Internal Charges

// *Session: Resignations

export function useResignations(){
    return useSWR(`/api/totalResignation`)
}