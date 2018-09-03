import * as React from 'react';
import { LoginMutationVariables } from '../../schemaTypes';
interface Props {
    onSessionId?: (sessionId: string) => void;
    children: (data: {
        submit: (values: LoginMutationVariables) => Promise<{
            [key: string]: string;
        } | null>;
    }) => JSX.Element | null;
}
export declare const LoginController: React.ComponentClass<Props>;
export {};
