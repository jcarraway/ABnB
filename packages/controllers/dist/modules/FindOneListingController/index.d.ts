import * as React from 'react';
import { FindOneListingQuery_findOneListing } from '../../schemaTypes';
export declare const findOneListingQuery: any;
interface WithFindOneListing {
    listing: FindOneListingQuery_findOneListing | null;
    loading: boolean;
}
interface Props {
    listingId: string;
    children: (data: WithFindOneListing) => JSX.Element | null;
}
export declare class FindOneListing extends React.PureComponent<Props> {
    render(): JSX.Element;
}
export {};
