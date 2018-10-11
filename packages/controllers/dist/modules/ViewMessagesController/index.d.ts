import * as React from 'react';
import { ViewMessagesQuery_findMessages } from '../../schemaTypes';
export declare const viewMessagesQuery: any;
interface WithViewMessages {
    messages: ViewMessagesQuery_findMessages[];
    loading: boolean;
}
interface Props {
    listingId: string;
    children: (data: WithViewMessages) => JSX.Element | null;
}
export declare class ViewMessages extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
