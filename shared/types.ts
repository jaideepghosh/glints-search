export type ScheduleType = {
    day: string
    start: string,
    end: string
}
export type ScheduleProps = {
    schedule: Array<ScheduleType>,
    id: number
}
export type RestaurantResponseType = {
    id: number,
    name: string,
    schedule: Array<ScheduleType>
}