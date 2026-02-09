import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = '_k_permissions_';

export const Permissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
