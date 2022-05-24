let bookmarkApp = angular.module('bookmarkApp', []);

bookmarkApp.controller('BookmarkController', function BookmarkController($scope) {
  const vm = $scope;

  vm.bookmarks = [{
      title: 'Solution Intent Integração Brain',
      url: 'https://confluence.bradesco.com.br:8443/pages/viewpage.action?pageId=199361752',
      description: 'Solution Intent Integração Brain',
      tags: ['Integração Brain', 'Confluence']
    },{
      title: 'Srv Registration Swagger',
      url: 'https://confluence.bradesco.com.br:8443/pages/viewpage.action?pageId=199361752',
      description: 'Srv Registration Swagger',
      tags: ['Swagger']
    },{
      title: 'Artefatos Arquitetura',
      url: 'https://bitbucket.bradesco.com.br:8443/projects/PLDPJ/repos/pdpj-srv-design-authority/browse',
      description: 'Srv Registration Swagger',
      tags: ['bitbucket']
    }
  ];
});