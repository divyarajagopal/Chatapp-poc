
export interface IchatItemList {
    message: string;
    type: string;
    date: Date;
    messages: string[];
}
export interface IChatComponentState {
    message: string
    isLoading: boolean
    dataSource: any
    ChatList: IchatItemList[];
  
}