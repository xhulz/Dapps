App = {
  web3Provider: null,
  contracts: {},

  init: async function() {

    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (typeof web3 !== 'undefined') {      
      web3 = new Web3(web3.currentProvider);
    } else {
      // Set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }

    App.web3Provider = web3.currentProvider;
    // App.web3Provider.currentProvider.enable();

    App.initContract();
  },

  initContract: function() {
    $.getJSON("RealState.json", function(i){
      App.contracts.RealState = TruffleContract(i);
      App.contracts.RealState.setProvider(App.web3Provider);

      App.bindEvents();
    });
  },

  bindEvents: function() {
    App.owner();
    App.get();
    App.set();
    App.listenForEvents();
    App.listenMetaMask();
  },

  listenMetaMask: function() {
    web3.currentProvider.publicConfigStore.on('update', function(result) {
      App.owner();
    });    
  },

  listenForEvents: function(){
    App.contracts.RealState.deployed().then(function(real){
      real.addImmobile({}, {
        fromBlock: 'latest',
        toBlock: 'latest'
      }).watch(function(error, event){
        App.get();
      })
    })
  },  

  set: function() {
    // Button Send
    $("#btSend").on('click', function(){
      if ($("#txtName").val() == "" || $("#txtAddress").val() == "" || $("#txtZipCode").val() == "" || $("#txtState").val() == "") {
        alert("Todos os campos são obrigatórios");
        return false;
      }

      App.contracts.RealState.deployed().then(function(real) {
        return real.add($("#txtName").val(), 
                        $("#txtAddress").val(), 
                        $("#txtZipCode").val(), 
                        $("#txtState").val(),
                        {from: web3.eth.accounts[0], value: 1000000000000000000});
      }).then(function(result){        
        $("#lblTx").html("Parabéns! Seu imóvel foi registrado com sucesso! Segue seu recibo (tx): <b>" + result.tx + "</b>");
        $("#txtName").val("");
        $("#txtAddress").val("");
        $("#txtZipCode").val("");
        $("#txtState").val("");
      });            

      return false;
    });

    // Button Withdraw
    $("#btWithdraw").on('click', function(){
      App.contracts.RealState.deployed().then(function(real) {
        if (confirm("Tem certeza que deseja sacar todo o saldo desse contrato?")) {
          real.owner().then(function(address){
            real.withdraw({from: address}).then(function(result){
              $("#lblTx").html("Parabéns! Seu saque foi realizado com sucesso! Segue seu recibo (tx): <b>" + result.tx + "</b>");
              App.get();
            });
          });
        }

        return false;        
      });        
    });
  },

  get: function() {
    var real = null;
    // Table        
    App.contracts.RealState.deployed().then(function(instance){
      real = instance;
      return real.immobile_count();
    }).then(function(count){

      // Balance
      web3.eth.getBalance(real.address, function(error, balance) {
        $("#lblBalance").html("O saldo desse contrato é de: <b>" + web3.fromWei(balance, 'ether') + " ETH</b>");
      });

      // Table  
      if (count.toNumber() == 0) {
        $("#lblMessage").css("display", "block");
        $("#tblRealState").css("display", "none");
        return false;
      }

      $("#tblRealStateResults").html("");

      var html = "";      
      for (let i = 0; i < count.toNumber(); i++) {   
        real.immobiles(i).then(function(data){
          html = "";
          html += "<tr>";
          html += "<th scope=\"row\">" + (i + 1) + "</th>";
          html += "<td>" + data[0] + "</td>";
          html += "<td>" + data[1] + "</td>";
          html += "<td>" + data[2] + "</td>";
          html += "<td>" + data[3] + "</td>";
          html += "<td>" + data[4] + "</td>";
          html += "</tr>";      
          
          $("#tblRealStateResults").append(html);
        });      
      }
    });    
  },

  owner: function() {
    App.contracts.RealState.deployed().then(function(real){
      // Withdraw      
      real.owner().then(function(address){
        web3.eth.getCoinbase(function(error, account) {
          if (account == address) {
            $("#btWithdraw").css("visibility", "visible");
          } else {
            $("#btWithdraw").css("visibility", "hidden");
          }
        });
      });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
