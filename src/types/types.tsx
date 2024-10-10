export type User ={
    name: string
   registrationNumber: string
    email: string
    id: number
    isStudent: boolean
    isSuperAdmin: boolean
    isLecturer: boolean
    isAdmin: boolean
    isActivated: boolean
    accessToken: string
    dropboxAccessToken?: string
}
export type UserResponse ={
    name: string
   registrationNumber: string
    email: string
    id: number
    isStudent: boolean
    isSuperAdmin: boolean
    isLecturer: boolean
    isAdmin: boolean
    isActivated: boolean
    accessToken: string
}
export type lectureNote = {
    noteName: string
    courseCode: string
    levelId : number
    filePath: string
    courseName: string
    lectureNoteId: number
}