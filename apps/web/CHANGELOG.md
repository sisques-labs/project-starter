# Changelog

## 1.0.0 (2025-12-28)


### Features

* add AuthUserProfileResponseDto and related query for fetching user profile; refactor authentication services and mappers ([3df2566](https://github.com/sisques-labs/project-starter/commit/3df2566fbc444dcce502cd9388a71e7cc5b54209))
* add loading skeleton to UserProfilePage component ([1e929fd](https://github.com/sisques-labs/project-starter/commit/1e929fd134c64b69255b89c59bc3b96d8d96fe67))
* enhance AppLayoutWithSidebar to include sidebar header and footer data, improve logout functionality, and update SidebarData interface for better structure ([56c7c68](https://github.com/sisques-labs/project-starter/commit/56c7c68f1fd83cd71e20f0d7098ea664b9ff54af))
* enhance AppLayoutWithSidebar to include user profile data in sidebar and update SidebarData interface for improved navigation ([aa8bfbf](https://github.com/sisques-labs/project-starter/commit/aa8bfbf4aa5e34af3adc922b7cfd996f2dc8033e))
* enhance user profile page with new sections and improved loading/error handling; update localization for profile details ([38d6e07](https://github.com/sisques-labs/project-starter/commit/38d6e0782011ef3fc14f6b17ae75e805f7357ac0))
* improve user update form by adding dirty state check and adjusting button behavior for submission ([99283c3](https://github.com/sisques-labs/project-starter/commit/99283c31cca8fdf7f47601efc49d65d14352cce0))
* integrate AppLayoutWithSidebar in locale layout, enhance user profile page structure, and improve routing localization for sidebar navigation ([28b1333](https://github.com/sisques-labs/project-starter/commit/28b133316cb1a7bb6ddef7d1c831b16db13e05bb))
* synchronize user profile with sidebar store in useAuthProfileMe and useUserUpdate hooks, and streamline routing by removing locale dependency ([463eee8](https://github.com/sisques-labs/project-starter/commit/463eee827c86e79c40df6de4814541165cafdc5c))


### Bug Fixes

* correct logo source comment in AppLayoutWithSidebar component ([5a9c77a](https://github.com/sisques-labs/project-starter/commit/5a9c77a5b8ce66e94669116f52e6f1d82754f97b))
* update logo source in AppLayoutWithSidebar component ([b9b24fc](https://github.com/sisques-labs/project-starter/commit/b9b24fc6b9d3b2b46898585eb084b74a37bee857))
* update mock implementation in AuthLoginByEmailCommandHandler test to use explicit query type for better TypeScript compliance ([b4ff38e](https://github.com/sisques-labs/project-starter/commit/b4ff38e6d9ed95ec408e2e8a24ab4ad6d4eaf1e8))
