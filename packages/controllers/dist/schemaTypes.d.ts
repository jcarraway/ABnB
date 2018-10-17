export interface MeQuery_me {
    email: string;
}
export interface MeQuery {
    me: MeQuery_me | null;
}
export interface ForgotPasswordChangeMutation_forgotPasswordChange {
    path: string;
    message: string;
}
export interface ForgotPasswordChangeMutation {
    forgotPasswordChange: ForgotPasswordChangeMutation_forgotPasswordChange[] | null;
}
export interface ForgotPasswordChangeMutationVariables {
    newPassword: string;
    key: string;
}
export interface CreateListingMutation {
    createListing: boolean;
}
export interface CreateListingMutationVariables {
    picture?: any | null;
    name: string;
    category: string;
    description: string;
    price: number;
    beds: number;
    guests: number;
    latitude: number;
    longitude: number;
    amenities: string[];
}
export interface CreateMessageMutation {
    createMessage: boolean;
}
export interface CreateMessageMutationVariables {
    message: MessageInput;
}
export interface FindListingsQuery_findListings_owner {
    id: string;
    email: string;
}
export interface FindListingsQuery_findListings {
    id: string;
    name: string;
    pictureUrl: string;
    owner: FindListingsQuery_findListings_owner;
}
export interface FindListingsQuery {
    findListings: FindListingsQuery_findListings[];
}
export interface FindOneListingQuery_findOneListing_owner {
    id: string;
    email: string;
}
export interface FindOneListingQuery_findOneListing {
    id: string;
    name: string;
    shortLink: string;
    latitude: number;
    longitude: number;
    description: string;
    category: string;
    price: number;
    beds: number;
    guests: number;
    pictureUrl: string;
    owner: FindOneListingQuery_findOneListing_owner;
}
export interface FindOneListingQuery {
    findOneListing: FindOneListingQuery_findOneListing | null;
}
export interface FindOneListingQueryVariables {
    id: string;
}
export interface SendForgotPasswordEmailMutation {
    sendForgotPasswordEmail: boolean | null;
}
export interface SendForgotPasswordEmailMutationVariables {
    email: string;
}
export interface LoginMutation_login_errors {
    path: string;
    message: string;
}
export interface LoginMutation_login {
    errors: LoginMutation_login_errors[] | null;
    sessionId: string | null;
}
export interface LoginMutation {
    login: LoginMutation_login;
}
export interface LoginMutationVariables {
    email: string;
    password: string;
}
export interface LogoutMutation {
    logout: boolean | null;
}
export interface RegisterMutation_register {
    path: string;
    message: string;
}
export interface RegisterMutation {
    register: RegisterMutation_register[] | null;
}
export interface RegisterMutationVariables {
    email: string;
    password: string;
}
export interface UpdateListingMutation {
    updateListing: boolean;
}
export interface UpdateListingMutationVariables {
    listingId: string;
    input: UpdateListingInput;
}
export interface ViewMessagesQuery_findMessages_user {
    email: string;
    id: string;
}
export interface ViewMessagesQuery_findMessages {
    id: string;
    text: string;
    user: ViewMessagesQuery_findMessages_user;
    listingId: string;
}
export interface ViewMessagesQuery {
    findMessages: ViewMessagesQuery_findMessages[];
}
export interface ViewMessagesQueryVariables {
    listingId: string;
}
export interface NewMessageSubscription_newMessage_user {
    email: string;
    id: string;
}
export interface NewMessageSubscription_newMessage {
    id: string;
    text: string;
    user: NewMessageSubscription_newMessage_user;
    listingId: string;
}
export interface NewMessageSubscription {
    newMessage: NewMessageSubscription_newMessage;
}
export interface NewMessageSubscriptionVariables {
    listingId: string;
}
export interface MessageInput {
    text: string;
    listingId: string;
}
export interface UpdateListingInput {
    name?: string | null;
    picture?: any | null;
    pictureUrl?: string | null;
    category?: string | null;
    description?: string | null;
    price?: number | null;
    beds?: number | null;
    guests?: number | null;
    latitude?: number | null;
    longitude?: number | null;
    amenities?: string[] | null;
}
