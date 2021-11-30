import { AxiosResponse } from 'axios';

import { client } from '@base/api/client';

import { AuthResponse, AuthRequest } from '@base/api/interface';

export function login(authRequest: AuthRequest) {
  return client.post<AuthRequest, AxiosResponse<AuthResponse>>(
    'auth/authenticate',
    authRequest
  );
}
