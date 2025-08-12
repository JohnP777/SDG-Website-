# Cloud-Deployed Website: (Currently undeployed since Google Cloud doubled its prices, redeploying in September on a different platform) 

# Technologies Used
- **MySQL**: Relational database for structured data storage.
- **Django REST**: Backend framework for handling API requests, authentication, and business logic.
- **React**: Frontend library for building dynamic user interfaces.

# Docker
This project leverages Docker to build and deploy the codebase both locally and for production environments.
Install Docker for [Windows](https://docs.docker.com/desktop/setup/install/windows-install/), [Mac](https://docs.docker.com/desktop/setup/install/mac-install/), and [Linux](https://docs.docker.com/desktop/setup/install/linux/).

# Environment Variables
The [docker-compose](docker-compose.yml) file will retrieve certain environment variables from
a `.env` file if present. Otherwise, it will use some default values that were populated
for development.

If you wish to use this in production, you can set up a `.env` file by duplicating
and renaming our [.env-template](.env-template) file, which has already been populated
with the same development default values mentioned previously.

Note that after the database has been deployed with a password, it will retain
that password after subsequent builds, even if the environment variable changes.

To fix this issue, you may either prune the database volume or manually change its
password.

Refer to the [Querying MySQL Database](#directly-querying-the-mysql-database)
section for more information on changing the password.

# How to Deploy Locally
To deploy, you can run the following command in the project's root directory.
```
docker compose up
```
If you wish to deploy in detached mode (i.e., in server contexts):
```
docker compose up -d
```
You can then access the frontend website on:
```
localhost:3000
```

# How to Deploy on Cloud
Deploying on cloud depends on your own cloud solution. The existing Dockerfiles
are able to be used in cloud deployment. 

For the frontend service, refer to the Prod-Dockerfile for a production-optimised
build.

