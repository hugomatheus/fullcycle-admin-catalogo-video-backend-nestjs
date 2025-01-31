Permissão para executar start.sh
chmod +x .docker/start.sh

Container app
docker-compose exec app bash

Criar o arquivo package.json
npm init -y

Instalar typescript
npm install typescript -D

Iniciar projeto typescript criando tsconfig.json
npx tsc --init

Instalar o jest
npm install jest @types/jest -D

Instalar swc para compilar typescript para javascript
npm install @swc/core @swc/cli @swc/jest -D

Iniciar jest
npx jest --init

#################################################################################################
The following questions will help Jest to create a suitable configuration for your project

✔ Would you like to use Jest when running "test" script in "package.json"? … yes
✔ Would you like to use Typescript for the configuration file? … yes
✔ Choose the test environment that will be used for testing › node
✔ Do you want Jest to add coverage reports? … no
✔ Which provider should be used to instrument code for coverage? › v8
✔ Automatically clear mock calls, instances, contexts and results before every test? … yes
#################################################################################################

Instalar ts-node
npm install ts-node --save-dev


Rodar testes
npm run test
npm run test -- --watchAll
npm run test -- --verbose

Instalar lodash
npm install lodash

Instalar @types/lodash
npm install @types/lodash -D

Instalar uuid
npm install uuid

Instalar @types/uuid
npm install @types/uuid -D

Instalar class-validator
npm install class-validator

Habilitar no tsconfig utilização de decorators
"experimentalDecorators": true, 
"emitDecoratorMetadata": true,

Desabilitando no tsconfig null checks
"strictNullChecks": false, 

Testes envolvendo classe abstrata:
utilizando tecnica stub por não poder instanciar deve ser criado um stub

Instalando Chance
npm i chance --save-dev
npm i --save-dev @types/chance

