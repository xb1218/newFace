mv src/app/config.js src/app/config-bak.js
mv src/app/config-prod.js src/app/config.js
yarn
yarn build
mv src/app/config.js src/app/config-prod.js
mv src/app/config-bak.js src/app/config.js
