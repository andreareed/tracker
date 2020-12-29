# CRA Docker Template

A full stack template to get `create-react-app` up and running with Docker. Included are 3 preconfigured containers:

- `frontend` - the client side container with the `create-react-app` boilerplate.
  - Includes a login and registration form, connected via redux.
- `api` - the server side container running Hapi.js.
  - Includes all the necessary tools for user registration and login using JSON web tokens.
- `postgres` - a postgres image that uses the credentials in `common.env`.

A self signed certificate is included for https access during development. You'll need to add certificates for production.

## Getting Started

A sample `common.env` file has been provided. Modify `common.template.env` to include your JWT secret and any other keys you'd like to use, and then rename the file to `common.env`.

You'll need to install Docker to use this template. You can download it free [here](https://docs.docker.com/install/).

Once you have Docker installed, run `docker-compose up` from within the directory. This command will run `npm install`, run the migration files, and start all the containers.

Navigate to `https://localhost.com:3000` to see your app in the browser.

### Development Certificates

A certificate has been included in this repo, but you can also generate your own:

### Certificate Authority

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout DevCA.key -out DevCA.crt -reqexts v3_req -extensions v3_ca -config /System/Library/OpenSSL/openssl.cnf -subj /CN="Dev CA"
```

Add this to your keychain by double clicking the generated file. Find it in your keychain and expand the “trust” menu. Select "always trust" from the drop down where it says “when using this certificate:".

## SAN

Create a `DevSAN.cnf` file that includes any of the dev domains required. Example:

```
[ req ]
default_bits       = 2048
distinguished_name = req_distinguished_name
req_extensions     = req_ext
[ req_distinguished_name ]
countryName                 = Country Name (2 letter code)
stateOrProvinceName         = State or Province Name (full name)
localityName               = Locality Name (eg, city)
organizationName           = Organization Name (eg, company)
commonName                 = Common Name (e.g. server FQDN or YOUR name)
[ req_ext ]
subjectAltName = @alt_names
[alt_names]
DNS.1   = localhost
DNS.2   = localhost.com
```

### Private key, signing request, & certificate

- Private key: `openssl genrsa -out dev.key 2048`
- Signing request `openssl req -new -key dev.key -out dev.csr -config DevSAN.cnf`
- Certificate `openssl x509 -req -in dev.csr -CA DevCA.crt -CAkey DevCA.key -CAcreateserial -out dev.crt -days 500 -sha256 -extfile DevSAN.cnf -extensions req_ext`

## Running API Tests

This template includes [Hapi Lab](https://hapi.dev/module/lab/) injection testing for testing API endpoints. To run the test suite, use `docker-compose exec api npm run test`. These tests have also been configured to run in CircleCI if you have enabled it.

## Accessing the Container Bash

Before running terminal commands, such as `npm install <some-package>`, you'll need to access the appropriate container bash prompt. To do so, run `docker-compose exec <container-name> bash`. The standard containers names in this template are `api`, `frontend`, and `postgres`. You can add, remove, or edit containers to suite your specific project needs.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
