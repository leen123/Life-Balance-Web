import {IActivity} from "../../activity/dtos/activity";

export interface ISection {
    name: string,
    image: string,
    image_name: string,
    icon: string,
    icon_name: string,
    description: string,
    code: string,
    id: number,
    activities: IActivity[],
}