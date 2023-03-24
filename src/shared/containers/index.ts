
import { container } from "tsyringe";
import { CACHE_PROVIDER,  FORGOT_PASSWORD_REPOSITORY_KEY, HASH_PROVIDER, MAIL_PROVIDER, REFRESHTOKEN_REPOSITORY_KEY, USER_REPOSITORY_KEY } from "../../config/constants";
import { UserRepository } from "../../modules/accounts/infra/prisma/repositories/UserRepository";
import { IRefreshTokenRepository, IUserRepository } from "../../modules/accounts/repositories";
import { ICacheProvider } from './providers/CacheProvider/models/ICacheProvider';
import { CacheProvider } from './providers/CacheProvider/implementations/CacheProvider';
import { RefreshTokenRepository } from "../../modules/accounts/infra/prisma/repositories/RefreshTokenRepository";
import { IHashProvider } from "../../modules/accounts/providers/HashProvider/models";
import { BCryptHashProvider } from "../../modules/accounts/providers/HashProvider/implementations/BCryptHashProvider";
import { IMailProvider } from "./providers/MailProvider/models";
import { MailProvider } from "./providers/MailProvider/implementations/MailProvider";
import { IForgotPasswordRepository } from "../../modules/accounts/repositories/IForgotPasswordRepository";
import { ForgotPasswordRepository } from "../../modules/accounts/infra/prisma/repositories/ForgotPasswordRepository";

container.registerSingleton<IUserRepository>(
    USER_REPOSITORY_KEY,
    UserRepository,
);

container.registerSingleton<IRefreshTokenRepository>(
    REFRESHTOKEN_REPOSITORY_KEY,
    RefreshTokenRepository,
  );

container.registerSingleton<IForgotPasswordRepository>(
    FORGOT_PASSWORD_REPOSITORY_KEY,
    ForgotPasswordRepository,
  );  


container.registerSingleton<IHashProvider>(
  HASH_PROVIDER,
  BCryptHashProvider,
  );



container.registerSingleton<ICacheProvider>(CACHE_PROVIDER, CacheProvider);
container.registerSingleton<IMailProvider>(MAIL_PROVIDER, MailProvider);