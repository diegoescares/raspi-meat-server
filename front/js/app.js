(function() {
  var app, controllers, directives, filters, services;

  app = angular.module('app', ['app.filters', 'app.services', 'app.directives', 'app.controllers', 'app.filters', 'firebase']);

  filters = angular.module('app.filters', []);

  services = angular.module('app.services', []);

  directives = angular.module('app.directives', []);

  controllers = angular.module('app.controllers', []);

  filters = angular.module('app.filters', []);

  _.mixin({
    objectDeepFlatten: function(data, key) {
      data = _.clone(data);
      return _.reduce(data, function(result, item) {
        var current, currentChildren;
        current = item;
        currentChildren = item[key];
        result.push(current);
        if (currentChildren && currentChildren.length) {
          result = result.concat(_.objectDeepFlatten(currentChildren, key));
        }
        return result;
      }, []);
    },
    search: function(array, searchField, term) {
      term = term.toLowerCase();
      return _.filter(array, function(item) {
        return item[searchField].toLowerCase().indexOf(term) !== -1;
      });
    },
    deepFind: function(data, searchTerms, returnChain, level) {
      var found, results;
      if (returnChain == null) {
        returnChain = true;
      }
      if (level == null) {
        level = 0;
      }
      results = [];
      found = _.find(data, searchTerms);
      if (!found) {
        _.each(data, function(item) {
          var childResults;
          if (item.children && _.isArray(item.children)) {
            childResults = _.deepFind(item.children, searchTerms, returnChain, level + 1);
            if (childResults) {
              if (returnChain) {
                results.push(item);
              }
              return results = results.concat(childResults);
            }
          }
        });
      } else {
        results.push(found);
      }
      if (results.length) {
        return results;
      } else {
        return false;
      }
    }
  });

  app.config(["$locationProvider", function($locationProvider) {
    return $locationProvider.html5Mode(true);
  }]);

  controllers.controller('BaseCtrl', ["$scope", "$firebaseObject", function($scope, $firebaseObject) {
    var baseQuery, ref, setLastSessionData, threshold;
    threshold = 180000;
    ref = new Firebase("https://raspberry-meat.firebaseio.com");
    $scope.status = $firebaseObject(ref.child('status'));
    baseQuery = ref.child('session').orderByChild('id');
    $scope.lastSessions = {};
    setLastSessionData = function(snapshot) {
      var key, result, session;
      result = snapshot.val();
      key = _.keys(result)[0];
      session = result[key];
      $scope.lastSessions[session.id] = session;
      return $scope.$apply();
    };
    baseQuery.equalTo('b_2').limitToLast(1).on('value', setLastSessionData);
    baseQuery.equalTo('b_1').limitToLast(1).on('value', setLastSessionData);
    return $scope.showWarning = function(id) {
      var now, session;
      now = Date.now();
      session = $scope.lastSessions[id];
      if (!session) {
        return false;
      }
      if (session.endTime != null) {
        if (session.duration > threshold && (now - session.endTime) < 30000) {
          return true;
        }
      } else {
        if ((now - session.startTime) > threshold) {
          return true;
        }
      }
      return false;
    };
  }]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJsb2Rhc2guY29mZmVlIiwicm91dGVyLmNvZmZlZSIsIkJhc2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0FBQUEsTUFBQTs7RUFBQSxHQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQUEsQ0FDQSxhQURBLEVBRUEsY0FGQSxFQUdBLGdCQUhBLEVBSUEsaUJBSkEsRUFLQSxhQUxBLEVBTUEsVUFOQSxDQUFBOztFQVNBLE9BQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLGFBQUEsRUFBQSxFQUFBOztFQUNBLFFBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLGNBQUEsRUFBQSxFQUFBOztFQUNBLFVBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLGdCQUFBLEVBQUEsRUFBQTs7RUFDQSxXQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxpQkFBQSxFQUFBLEVBQUE7O0VBQ0EsT0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsYUFBQSxFQUFBLEVBQUE7O0VDZEEsQ0FBQSxDQUFBLEtBQUEsQ0FDQTtJQUFBLGlCQUFBLEVBQUEsU0FBQSxJQUFBLEVBQUEsR0FBQTtNQUNBLElBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLElBQUE7QUFDQSxhQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsSUFBQSxFQUFBLFNBQUEsTUFBQSxFQUFBLElBQUE7QUFDQSxZQUFBO1FBQUEsT0FBQSxHQUFBO1FBQ0EsZUFBQSxHQUFBLElBQUEsQ0FBQSxHQUFBO1FBRUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxPQUFBO1FBQ0EsSUFBQSxlQUFBLElBQUEsZUFBQSxDQUFBLE1BQUE7VUFDQSxNQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsaUJBQUEsQ0FBQSxlQUFBLEVBQUEsR0FBQSxDQUFBLEVBREE7O0FBRUEsZUFBQTtNQVBBLENBQUEsRUFRQSxFQVJBO0lBRkEsQ0FBQTtJQVlBLE1BQUEsRUFBQSxTQUFBLEtBQUEsRUFBQSxXQUFBLEVBQUEsSUFBQTtNQUNBLElBQUEsR0FBQSxJQUFBLENBQUEsV0FBQSxDQUFBO0FBQ0EsYUFBQSxDQUFBLENBQUEsTUFBQSxDQUFBLEtBQUEsRUFBQSxTQUFBLElBQUE7QUFDQSxlQUFBLElBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBO01BREEsQ0FBQTtJQUZBLENBWkE7SUFpQkEsUUFBQSxFQUFBLFNBQUEsSUFBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsS0FBQTtBQUNBLFVBQUE7O1FBREEsY0FBQTs7O1FBQUEsUUFBQTs7TUFDQSxPQUFBLEdBQUE7TUFDQSxLQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsV0FBQTtNQUNBLElBQUEsQ0FBQSxLQUFBO1FBQ0EsQ0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsU0FBQSxJQUFBO0FBQ0EsY0FBQTtVQUFBLElBQUEsSUFBQSxDQUFBLFFBQUEsSUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLENBQUE7WUFDQSxZQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsS0FBQSxHQUFBLENBQUE7WUFDQSxJQUFBLFlBQUE7Y0FDQSxJQUFBLFdBQUE7Z0JBQ0EsT0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBREE7O3FCQUVBLE9BQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLFlBQUEsRUFIQTthQUZBOztRQURBLENBQUEsRUFEQTtPQUFBLE1BQUE7UUFVQSxPQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsRUFWQTs7TUFZQSxJQUFBLE9BQUEsQ0FBQSxNQUFBO0FBQ0EsZUFBQSxRQURBO09BQUEsTUFBQTtBQUVBLGVBQUEsTUFGQTs7SUFmQSxDQWpCQTtHQURBOztFQ0FBLEdBQUEsQ0FBQSxNQUFBLENBQUEsU0FBQSxpQkFBQTtXQUNBLGlCQUFBLENBQUEsU0FBQSxDQUFBLElBQUE7RUFEQSxDQUFBOztFQ0FBLFdBQUEsQ0FBQSxVQUFBLENBQUEsVUFBQSxFQUFBLFNBQUEsTUFBQSxFQUFBLGVBQUE7QUFDQSxRQUFBO0lBQUEsU0FBQSxHQUFBO0lBQ0EsR0FBQSxHQUFBLElBQUEsUUFBQSxDQUFBLHVDQUFBO0lBRUEsTUFBQSxDQUFBLE1BQUEsR0FBQSxlQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxRQUFBLENBQUE7SUFFQSxTQUFBLEdBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLENBQ0EsQ0FBQSxZQURBLENBQ0EsSUFEQTtJQUdBLE1BQUEsQ0FBQSxZQUFBLEdBQUE7SUFFQSxrQkFBQSxHQUFBLFNBQUEsUUFBQTtBQUNBLFVBQUE7TUFBQSxNQUFBLEdBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtNQUNBLEdBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUE7TUFDQSxPQUFBLEdBQUEsTUFBQSxDQUFBLEdBQUE7TUFDQSxNQUFBLENBQUEsWUFBQSxDQUFBLE9BQUEsQ0FBQSxFQUFBLENBQUEsR0FBQTthQUNBLE1BQUEsQ0FBQSxNQUFBLENBQUE7SUFMQTtJQU9BLFNBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxDQUNBLENBQUEsV0FEQSxDQUNBLENBREEsQ0FFQSxDQUFBLEVBRkEsQ0FFQSxPQUZBLEVBRUEsa0JBRkE7SUFJQSxTQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsQ0FDQSxDQUFBLFdBREEsQ0FDQSxDQURBLENBRUEsQ0FBQSxFQUZBLENBRUEsT0FGQSxFQUVBLGtCQUZBO1dBS0EsTUFBQSxDQUFBLFdBQUEsR0FBQSxTQUFBLEVBQUE7QUFDQSxVQUFBO01BQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7TUFDQSxPQUFBLEdBQUEsTUFBQSxDQUFBLFlBQUEsQ0FBQSxFQUFBO01BQ0EsSUFBQSxDQUFBLE9BQUE7QUFBQSxlQUFBLE1BQUE7O01BQ0EsSUFBQSx1QkFBQTtRQUNBLElBQUEsT0FBQSxDQUFBLFFBQUEsR0FBQSxTQUFBLElBQUEsQ0FBQSxHQUFBLEdBQUEsT0FBQSxDQUFBLE9BQUEsQ0FBQSxHQUFBLEtBQUE7QUFDQSxpQkFBQSxLQURBO1NBREE7T0FBQSxNQUFBO1FBSUEsSUFBQSxDQUFBLEdBQUEsR0FBQSxPQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsU0FBQTtBQUNBLGlCQUFBLEtBREE7U0FKQTs7QUFPQSxhQUFBO0lBWEE7RUEzQkEsQ0FBQTtBSENBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIlxuYXBwID0gYW5ndWxhci5tb2R1bGUgJ2FwcCcsIFtcblx0J2FwcC5maWx0ZXJzJ1xuXHQnYXBwLnNlcnZpY2VzJ1xuXHQnYXBwLmRpcmVjdGl2ZXMnXG5cdCdhcHAuY29udHJvbGxlcnMnXG5cdCdhcHAuZmlsdGVycydcblx0J2ZpcmViYXNlJ1xuXVxuXG5maWx0ZXJzICAgICA9IGFuZ3VsYXIubW9kdWxlICdhcHAuZmlsdGVycycsIFtdXG5zZXJ2aWNlcyAgICA9IGFuZ3VsYXIubW9kdWxlICdhcHAuc2VydmljZXMnLCBbXVxuZGlyZWN0aXZlcyAgPSBhbmd1bGFyLm1vZHVsZSAnYXBwLmRpcmVjdGl2ZXMnLCBbXVxuY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSAnYXBwLmNvbnRyb2xsZXJzJywgW11cbmZpbHRlcnMgICAgID0gYW5ndWxhci5tb2R1bGUgJ2FwcC5maWx0ZXJzJywgW11cbiIsIl8ubWl4aW5cblx0b2JqZWN0RGVlcEZsYXR0ZW46IChkYXRhLGtleSktPlxuXHRcdGRhdGEgPSBfLmNsb25lKGRhdGEpXG5cdFx0cmV0dXJuIF8ucmVkdWNlIGRhdGEsIChyZXN1bHQsIGl0ZW0pLT5cblx0XHRcdGN1cnJlbnQgPSBpdGVtXG5cdFx0XHRjdXJyZW50Q2hpbGRyZW4gPSBpdGVtW2tleV1cblx0XHRcdCNkZWxldGUgY3VycmVudFtrZXldXG5cdFx0XHRyZXN1bHQucHVzaCBjdXJyZW50XG5cdFx0XHRpZiBjdXJyZW50Q2hpbGRyZW4gJiYgY3VycmVudENoaWxkcmVuLmxlbmd0aFxuXHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuY29uY2F0IF8ub2JqZWN0RGVlcEZsYXR0ZW4oY3VycmVudENoaWxkcmVuLGtleSlcblx0XHRcdHJldHVybiByZXN1bHRcblx0XHQsW11cblxuXHRzZWFyY2g6IChhcnJheSxzZWFyY2hGaWVsZCx0ZXJtKS0+XG5cdFx0dGVybSA9IHRlcm0udG9Mb3dlckNhc2UoKVxuXHRcdHJldHVybiBfLmZpbHRlciBhcnJheSwgKGl0ZW0pLT5cblx0XHRcdHJldHVybiBpdGVtW3NlYXJjaEZpZWxkXS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGVybSkgIT0gLTFcblxuXHRkZWVwRmluZDogKGRhdGEsc2VhcmNoVGVybXMscmV0dXJuQ2hhaW4gPSB0cnVlLGxldmVsID0gMCktPlxuXHRcdHJlc3VsdHMgPSBbXVxuXHRcdGZvdW5kID0gXy5maW5kIGRhdGEsIHNlYXJjaFRlcm1zXG5cdFx0aWYgISBmb3VuZFxuXHRcdFx0Xy5lYWNoIGRhdGEsIChpdGVtKS0+XG5cdFx0XHRcdGlmIGl0ZW0uY2hpbGRyZW4gJiYgXy5pc0FycmF5KGl0ZW0uY2hpbGRyZW4pXG5cdFx0XHRcdFx0Y2hpbGRSZXN1bHRzID0gXy5kZWVwRmluZChpdGVtLmNoaWxkcmVuLHNlYXJjaFRlcm1zLHJldHVybkNoYWluLCBsZXZlbCsxKVxuXHRcdFx0XHRcdGlmIGNoaWxkUmVzdWx0c1xuXHRcdFx0XHRcdFx0aWYgcmV0dXJuQ2hhaW4gXG5cdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCBpdGVtXG5cdFx0XHRcdFx0XHRyZXN1bHRzID0gcmVzdWx0cy5jb25jYXQgY2hpbGRSZXN1bHRzXG5cblx0XHRlbHNlIFxuXHRcdFx0cmVzdWx0cy5wdXNoIGZvdW5kXG5cdFx0XG5cdFx0aWYgcmVzdWx0cy5sZW5ndGhcblx0XHRcdHJldHVybiByZXN1bHRzXG5cdFx0ZWxzZSByZXR1cm4gZmFsc2UiLCJhcHAuY29uZmlnICgkbG9jYXRpb25Qcm92aWRlcikgLT5cblx0JGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpOyIsImNvbnRyb2xsZXJzLmNvbnRyb2xsZXIgJ0Jhc2VDdHJsJywgKCRzY29wZSwkZmlyZWJhc2VPYmplY3QpLT5cblx0dGhyZXNob2xkID0gMTgwMDAwXG5cdHJlZiA9IG5ldyBGaXJlYmFzZShcImh0dHBzOi8vcmFzcGJlcnJ5LW1lYXQuZmlyZWJhc2Vpby5jb21cIilcblxuXHQkc2NvcGUuc3RhdHVzID0gJGZpcmViYXNlT2JqZWN0KHJlZi5jaGlsZCgnc3RhdHVzJykpXG5cblx0YmFzZVF1ZXJ5ID0gcmVmLmNoaWxkKCdzZXNzaW9uJylcblx0XHQub3JkZXJCeUNoaWxkKCdpZCcpXG5cdFxuXHQkc2NvcGUubGFzdFNlc3Npb25zID0ge31cblxuXHRzZXRMYXN0U2Vzc2lvbkRhdGEgPSAoc25hcHNob3QpLT5cblx0XHRyZXN1bHQgPSBzbmFwc2hvdC52YWwoKVxuXHRcdGtleSA9IF8ua2V5cyhyZXN1bHQpWzBdXG5cdFx0c2Vzc2lvbiA9IHJlc3VsdFtrZXldXG5cdFx0JHNjb3BlLmxhc3RTZXNzaW9uc1tzZXNzaW9uLmlkXSA9IHNlc3Npb24gXG5cdFx0JHNjb3BlLiRhcHBseSgpXG5cdFx0XG5cdGJhc2VRdWVyeS5lcXVhbFRvKCdiXzInKVxuXHRcdC5saW1pdFRvTGFzdCgxKVxuXHRcdC5vbiAndmFsdWUnLCBzZXRMYXN0U2Vzc2lvbkRhdGFcblxuXHRiYXNlUXVlcnkuZXF1YWxUbygnYl8xJylcblx0XHQubGltaXRUb0xhc3QoMSlcblx0XHQub24gJ3ZhbHVlJywgc2V0TGFzdFNlc3Npb25EYXRhXG5cdFxuXG5cdCRzY29wZS5zaG93V2FybmluZyA9IChpZCktPlxuXHRcdG5vdyA9IERhdGUubm93KClcblx0XHRzZXNzaW9uID0gJHNjb3BlLmxhc3RTZXNzaW9uc1tpZF1cblx0XHRyZXR1cm4gZmFsc2UgaWYgISBzZXNzaW9uXG5cdFx0aWYgc2Vzc2lvbi5lbmRUaW1lP1xuXHRcdFx0aWYgc2Vzc2lvbi5kdXJhdGlvbiA+IHRocmVzaG9sZCAmJiAobm93IC0gc2Vzc2lvbi5lbmRUaW1lKSA8IDMwMDAwIFxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdGVsc2Vcblx0XHRcdGlmIChub3cgLSBzZXNzaW9uLnN0YXJ0VGltZSkgPiB0aHJlc2hvbGRcblx0XHRcdFx0cmV0dXJuIHRydWVcblxuXHRcdHJldHVybiBmYWxzZSJdfQ==
