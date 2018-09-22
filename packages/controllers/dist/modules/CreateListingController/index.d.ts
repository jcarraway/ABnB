import * as React from 'react';
import { CreateListingMutationVariables } from '../../schemaTypes';
export declare const createListingMutation: any;
export interface CreateListingProps {
    createListing: (variables: CreateListingMutationVariables) => void;
}
export declare const withCreateListing: (WrappedComponent: React.ComponentType<any>) => React.ComponentClass<any>;
