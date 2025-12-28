# 1.0.0 (2025-12-28)

### Bug Fixes

- update mock implementation in AuthLoginByEmailCommandHandler test to use explicit query type for better TypeScript compliance ([b4ff38e](https://github.com/sisques-labs/project-starter/commit/b4ff38e6d9ed95ec408e2e8a24ab4ad6d4eaf1e8))

### Features

- add AuthUserProfileResponseDto and related query for fetching user profile; refactor authentication services and mappers ([3df2566](https://github.com/sisques-labs/project-starter/commit/3df2566fbc444dcce502cd9388a71e7cc5b54209))
- enhance AppLayoutWithSidebar to include sidebar header and footer data, improve logout functionality, and update SidebarData interface for better structure ([56c7c68](https://github.com/sisques-labs/project-starter/commit/56c7c68f1fd83cd71e20f0d7098ea664b9ff54af))
- enhance AppLayoutWithSidebar to include user profile data in sidebar and update SidebarData interface for improved navigation ([aa8bfbf](https://github.com/sisques-labs/project-starter/commit/aa8bfbf4aa5e34af3adc922b7cfd996f2dc8033e))
- enhance user profile page with new sections and improved loading/error handling; update localization for profile details ([38d6e07](https://github.com/sisques-labs/project-starter/commit/38d6e0782011ef3fc14f6b17ae75e805f7357ac0))
- implement profileMe query and related SDK methods for fetching authenticated user profile ([8139eed](https://github.com/sisques-labs/project-starter/commit/8139eeda6ee85a933e4b3134980504dbe3270b14))
- improve user update form by adding dirty state check and adjusting button behavior for submission ([99283c3](https://github.com/sisques-labs/project-starter/commit/99283c31cca8fdf7f47601efc49d65d14352cce0))
- integrate AppLayoutWithSidebar in locale layout, enhance user profile page structure, and improve routing localization for sidebar navigation ([28b1333](https://github.com/sisques-labs/project-starter/commit/28b133316cb1a7bb6ddef7d1c831b16db13e05bb))
- synchronize user profile with sidebar store in useAuthProfileMe and useUserUpdate hooks, and streamline routing by removing locale dependency ([463eee8](https://github.com/sisques-labs/project-starter/commit/463eee827c86e79c40df6de4814541165cafdc5c))
