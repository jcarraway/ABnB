import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthRoute } from '@abb/controllers';

import { RegisterConnector } from '../modules/register/RegisterConnector';
import { LoginConnector } from '../modules/login/LoginConnector';
import { ForgotPasswordConnector } from '../modules/forgotPassword/ForgotPasswordConnector';
import { ChangePasswordConnector } from '../modules/changePassword/ChangePasswordConnector';
import { CreateListingConnector } from '../modules/listing/create/CreateListingConnector';
import { TextPage } from '../modules/textPage';
import { FindListingsConnector } from '../modules/listing/find/FindListingsConnector';
import { Logout } from '../modules/logout';
import { FindOneListingConnector } from '../modules/listing/detail/FindOneListingConnector';
import { MessagesConnector } from '../modules/messages/MessagesConnector';
import { UpdateListingConnector } from '../modules/listing/update/UpdateListingConnector';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
      <Route exact={true} path="/reset" component={ForgotPasswordConnector} />
      <Route
        exact={true}
        path="/change-password/:key"
        component={ChangePasswordConnector}
      />
      <Route path="/m" component={TextPage} />
      <Route path="/listings" component={FindListingsConnector} />
      <Route path="/logout" component={Logout} />
      <Route
        exact={true}
        path="/listing/:listingId"
        component={FindOneListingConnector}
      />
      <Route
        exact={true}
        path="/listing/:listingId/chat"
        component={MessagesConnector}
      />
      <Route
        exact={true}
        path="/listing/:listingId/edit"
        component={UpdateListingConnector}
      />
      <AuthRoute path="/create-listing" component={CreateListingConnector} />
    </Switch>
  </BrowserRouter>
);
