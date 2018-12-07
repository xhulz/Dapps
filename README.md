# RealState

Dapp explicando rapidamente como se usa o Truffle e o Ganache.

# Como instalar

1. Baixar e instalar o node.js: https://nodejs.org/en/
2. Baixar e instalar o Truffle: https://truffleframework.com/truffle
3. Baixar e instalar o Ganache: https://truffleframework.com/ganache
4. Baixar e instalar a extensão do Metask para Chrome ou Firefox
5. Baixar e instalar o Visual Studio Code: https://code.visualstudio.com/
6. Instalar as extensões para o Visual Studio Code: 
  6.1: https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity
  6.2: https://marketplace.visualstudio.com/items?itemName=lemon-berry.web3js-snippets

7. Abrir a aplicação no Visual Studio Code
  7.1: Abrir o arquivo: migrations/2_deploy_contracts.js
  7.2: Dentro do arquivo, setar o endereço de carteira para o Owner do Smart Contract. Pode ser qualquer endereço gerado pelo Ganache

8. Abrir o DOS ou Shell
  8.1: Executar o comando CD para o diretório onde se encontra o projeto
  8.2: Rodar as migrações (instalação) do Smart Contract para o Blockchain (Ganache) com o comando: truffle migrate --reset
  8.3: Ainda dentro do diretório, executar o webserver sincronizado com o comando: npm run dev
  

