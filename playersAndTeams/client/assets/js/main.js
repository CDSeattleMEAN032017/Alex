var app = angular.module('app', ['ngRoute']);
// routing
app.config(function($routeProvider) {
  $routeProvider
    .when('/players', {
      templateUrl: 'partials/players.html',
      controller: 'playersController'
    })
    .when('/teams', {
      templateUrl: 'partials/teams.html',
      controller: 'teamsController'
    })
    .when('/associations', {
      templateUrl: 'partials/associations.html',
      controller: 'associationsController'
    })
    .otherwise({
      redirectTo: '/players'
    });
});

// factories
app.factory('playerFactory', function() {
  var players = [{name: "Alex", team: "Seahawks"},
                 {name: "Saman", team: "Falcons"}];
  var factory = {};

  factory.all = function(callback) {
    callback(players);
  };
  factory.addPlayer = function(player) {
    player.team = '';
    players.push(player);
  };
  factory.removePlayer = function(player) {
    var index = players.indexOf(player);
    players.splice(index, 1);
  };
  factory.addPlayerToTeam = function(newAssociation) {
    console.log(newAssociation.index);
    players[newAssociation.index].team = newAssociation.team;
  };
  factory.removePlayerFromTeam = function(index) {
    players[index].team = "";
  };
  return factory;
});

app.factory('teamFactory', function() {
  var teams = [{name: "Seahawks"},
               {name: "Eagles"}];
  var factory = {};

  factory.all = function(callback) {
    callback(teams);
  };
  factory.addTeam = function(team) {
    newTeam = team;
    teams.push(newTeam);
  };
  factory.removeTeam = function(team) {
    var index = teams.indexOf(team);
    teams.splice(index, 1);
  };
  return factory;
});

// controllers
app.controller('playersController', ['$scope', 'playerFactory', function ($scope, playerFactory) {
  $scope.players = [];
  playerFactory.all(function(data) {
    $scope.players = data;
  });
  $scope.removePlayer = function(player) {
    playerFactory.removePlayer(player);
  };
  $scope.addPlayer = function(player) {
    playerFactory.addPlayer($scope.player);
    $scope.player = {};
  };
}]);

app.controller('teamsController', ['$scope', 'teamFactory', function ($scope, teamFactory) {
  $scope.teams = [];
  teamFactory.all(function(data) {
    $scope.teams = data;
  });
  $scope.addTeam = function(team) {
    teamFactory.addTeam($scope.team);
    $scope.team = {};
  };
  $scope.removeTeam = function(team) {
    teamFactory.removeTeam(team);
  };
}]);

app.controller('associationsController', ['$scope', 'playerFactory', 'teamFactory', function ($scope, playerFactory, teamFactory) {
  $scope.players = [];
  $scope.teams = [];
  playerFactory.all(function(data) {
    $scope.players = data;
  });
  teamFactory.all(function(data) {
    $scope.teams = data;
  });
  $scope.addPlayerToTeam = function() {
    console.log($scope.newAssociation);
    playerFactory.addPlayerToTeam($scope.newAssociation);
  };
  $scope.removePlayerFromTeam = function(index) {
    playerFactory.removePlayerFromTeam(index);
  };
}]);
