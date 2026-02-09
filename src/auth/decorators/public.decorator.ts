import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = '_k_public_';

export const Public = () => SetMetadata(PUBLIC_KEY, true);
