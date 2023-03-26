
import { container } from "tsyringe";
import { CACHE_PROVIDER,  FORGOT_PASSWORD_REPOSITORY_KEY, HASH_PROVIDER, MAIL_PROVIDER, PLAYER_REPOSITORY_KEY, REFRESHTOKEN_REPOSITORY_KEY, TEAM_REPOSITORY_KEY, TRANSACTION_REPOSITORY_KEY, USER_REPOSITORY_KEY } from "../../config/constants";
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
import { ITransactionRepository } from "../../modules/transactions/repositories";
import { TransactionRepository } from "../../modules/transactions/infra";
import { IPlayerRepository } from "../../modules/players/repositories";
import { PlayerRepository } from "../../modules/players/infra";
import { ITeamRepository, TeamRepository } from "../../modules/teams";

container.registerSingleton<IUserRepository>(
    USER_REPOSITORY_KEY,
    UserRepository,
);

container.registerSingleton<ITeamRepository>(
  TEAM_REPOSITORY_KEY,
  TeamRepository,
);

container.registerSingleton<IPlayerRepository>(
  PLAYER_REPOSITORY_KEY,
  PlayerRepository,
);

container.registerSingleton<ITransactionRepository>(
  TRANSACTION_REPOSITORY_KEY,
  TransactionRepository,
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