import * as React from '../../../../app/node_modules/@types/react-native/node_modules/@types/react';
import { RegisterMutationVariables } from '../../schemaTypes';
interface Props {
    children: (data: {
        submit: (values: RegisterMutationVariables) => Promise<null>;
    }) => JSX.Element | null;
}
export declare const RegisterController: React.ComponentClass<Props>;
export {};
