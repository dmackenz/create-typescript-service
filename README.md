# create-typescript-service
A command line utility to create a TypeScript microservice template quickly.

###### Install
```bash
$ npm i -g create-typescript-service
```

##### Usage
```bash
$ create-typescript-service <service_name>
```

```bash
$ create-typescript-service my_new_microservice
```

##### What Gets Created
.
├── node_modules
├── Dockerfile
├── package-lock.json
├── package.json
├── src
│   ├── index.ts
│   └── routes
│       └── BasicRouter.ts
└── tsconfig.json