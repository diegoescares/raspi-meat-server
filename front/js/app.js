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
    var baseQuery, ref, setLastSessionData;
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
    return $scope.getElapsedTimeFor = function(id) {
      var elapsed;
      elapsed = Date.now() - $scope.lastSessions[id].startTime;
      console.log(elapsed);
      return elapsed;
    };
  }]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJsb2Rhc2guY29mZmVlIiwicm91dGVyLmNvZmZlZSIsIkJhc2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0FBQUEsTUFBQTs7RUFBQSxHQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQUEsQ0FDQSxhQURBLEVBRUEsY0FGQSxFQUdBLGdCQUhBLEVBSUEsaUJBSkEsRUFLQSxhQUxBLEVBTUEsVUFOQSxDQUFBOztFQVNBLE9BQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLGFBQUEsRUFBQSxFQUFBOztFQUNBLFFBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLGNBQUEsRUFBQSxFQUFBOztFQUNBLFVBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLGdCQUFBLEVBQUEsRUFBQTs7RUFDQSxXQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxpQkFBQSxFQUFBLEVBQUE7O0VBQ0EsT0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsYUFBQSxFQUFBLEVBQUE7O0VDZEEsQ0FBQSxDQUFBLEtBQUEsQ0FDQTtJQUFBLGlCQUFBLEVBQUEsU0FBQSxJQUFBLEVBQUEsR0FBQTtNQUNBLElBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLElBQUE7QUFDQSxhQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsSUFBQSxFQUFBLFNBQUEsTUFBQSxFQUFBLElBQUE7QUFDQSxZQUFBO1FBQUEsT0FBQSxHQUFBO1FBQ0EsZUFBQSxHQUFBLElBQUEsQ0FBQSxHQUFBO1FBRUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxPQUFBO1FBQ0EsSUFBQSxlQUFBLElBQUEsZUFBQSxDQUFBLE1BQUE7VUFDQSxNQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsaUJBQUEsQ0FBQSxlQUFBLEVBQUEsR0FBQSxDQUFBLEVBREE7O0FBRUEsZUFBQTtNQVBBLENBQUEsRUFRQSxFQVJBO0lBRkEsQ0FBQTtJQVlBLE1BQUEsRUFBQSxTQUFBLEtBQUEsRUFBQSxXQUFBLEVBQUEsSUFBQTtNQUNBLElBQUEsR0FBQSxJQUFBLENBQUEsV0FBQSxDQUFBO0FBQ0EsYUFBQSxDQUFBLENBQUEsTUFBQSxDQUFBLEtBQUEsRUFBQSxTQUFBLElBQUE7QUFDQSxlQUFBLElBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBO01BREEsQ0FBQTtJQUZBLENBWkE7SUFpQkEsUUFBQSxFQUFBLFNBQUEsSUFBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsS0FBQTtBQUNBLFVBQUE7O1FBREEsY0FBQTs7O1FBQUEsUUFBQTs7TUFDQSxPQUFBLEdBQUE7TUFDQSxLQUFBLEdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsV0FBQTtNQUNBLElBQUEsQ0FBQSxLQUFBO1FBQ0EsQ0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsU0FBQSxJQUFBO0FBQ0EsY0FBQTtVQUFBLElBQUEsSUFBQSxDQUFBLFFBQUEsSUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLENBQUE7WUFDQSxZQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsS0FBQSxHQUFBLENBQUE7WUFDQSxJQUFBLFlBQUE7Y0FDQSxJQUFBLFdBQUE7Z0JBQ0EsT0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBREE7O3FCQUVBLE9BQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLFlBQUEsRUFIQTthQUZBOztRQURBLENBQUEsRUFEQTtPQUFBLE1BQUE7UUFVQSxPQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsRUFWQTs7TUFZQSxJQUFBLE9BQUEsQ0FBQSxNQUFBO0FBQ0EsZUFBQSxRQURBO09BQUEsTUFBQTtBQUVBLGVBQUEsTUFGQTs7SUFmQSxDQWpCQTtHQURBOztFQ0FBLEdBQUEsQ0FBQSxNQUFBLENBQUEsU0FBQSxpQkFBQTtXQUNBLGlCQUFBLENBQUEsU0FBQSxDQUFBLElBQUE7RUFEQSxDQUFBOztFQ0FBLFdBQUEsQ0FBQSxVQUFBLENBQUEsVUFBQSxFQUFBLFNBQUEsTUFBQSxFQUFBLGVBQUE7QUFDQSxRQUFBO0lBQUEsR0FBQSxHQUFBLElBQUEsUUFBQSxDQUFBLHVDQUFBO0lBRUEsTUFBQSxDQUFBLE1BQUEsR0FBQSxlQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxRQUFBLENBQUE7SUFFQSxTQUFBLEdBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLENBQ0EsQ0FBQSxZQURBLENBQ0EsSUFEQTtJQUdBLE1BQUEsQ0FBQSxZQUFBLEdBQUE7SUFFQSxrQkFBQSxHQUFBLFNBQUEsUUFBQTtBQUNBLFVBQUE7TUFBQSxNQUFBLEdBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtNQUNBLEdBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUE7TUFDQSxPQUFBLEdBQUEsTUFBQSxDQUFBLEdBQUE7TUFDQSxNQUFBLENBQUEsWUFBQSxDQUFBLE9BQUEsQ0FBQSxFQUFBLENBQUEsR0FBQTthQUNBLE1BQUEsQ0FBQSxNQUFBLENBQUE7SUFMQTtJQU9BLFNBQUEsQ0FBQSxPQUFBLENBQUEsS0FBQSxDQUNBLENBQUEsV0FEQSxDQUNBLENBREEsQ0FFQSxDQUFBLEVBRkEsQ0FFQSxPQUZBLEVBRUEsa0JBRkE7SUFJQSxTQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsQ0FDQSxDQUFBLFdBREEsQ0FDQSxDQURBLENBRUEsQ0FBQSxFQUZBLENBRUEsT0FGQSxFQUVBLGtCQUZBO1dBS0EsTUFBQSxDQUFBLGlCQUFBLEdBQUEsU0FBQSxFQUFBO0FBQ0EsVUFBQTtNQUFBLE9BQUEsR0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsWUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBO01BQ0EsT0FBQSxDQUFBLEdBQUEsQ0FBQSxPQUFBO0FBQ0EsYUFBQTtJQUhBO0VBMUJBLENBQUE7QUhDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmFwcCA9IGFuZ3VsYXIubW9kdWxlICdhcHAnLCBbXG5cdCdhcHAuZmlsdGVycydcblx0J2FwcC5zZXJ2aWNlcydcblx0J2FwcC5kaXJlY3RpdmVzJ1xuXHQnYXBwLmNvbnRyb2xsZXJzJ1xuXHQnYXBwLmZpbHRlcnMnXG5cdCdmaXJlYmFzZSdcbl1cblxuZmlsdGVycyAgICAgPSBhbmd1bGFyLm1vZHVsZSAnYXBwLmZpbHRlcnMnLCBbXVxuc2VydmljZXMgICAgPSBhbmd1bGFyLm1vZHVsZSAnYXBwLnNlcnZpY2VzJywgW11cbmRpcmVjdGl2ZXMgID0gYW5ndWxhci5tb2R1bGUgJ2FwcC5kaXJlY3RpdmVzJywgW11cbmNvbnRyb2xsZXJzID0gYW5ndWxhci5tb2R1bGUgJ2FwcC5jb250cm9sbGVycycsIFtdXG5maWx0ZXJzICAgICA9IGFuZ3VsYXIubW9kdWxlICdhcHAuZmlsdGVycycsIFtdXG4iLCJfLm1peGluXG5cdG9iamVjdERlZXBGbGF0dGVuOiAoZGF0YSxrZXkpLT5cblx0XHRkYXRhID0gXy5jbG9uZShkYXRhKVxuXHRcdHJldHVybiBfLnJlZHVjZSBkYXRhLCAocmVzdWx0LCBpdGVtKS0+XG5cdFx0XHRjdXJyZW50ID0gaXRlbVxuXHRcdFx0Y3VycmVudENoaWxkcmVuID0gaXRlbVtrZXldXG5cdFx0XHQjZGVsZXRlIGN1cnJlbnRba2V5XVxuXHRcdFx0cmVzdWx0LnB1c2ggY3VycmVudFxuXHRcdFx0aWYgY3VycmVudENoaWxkcmVuICYmIGN1cnJlbnRDaGlsZHJlbi5sZW5ndGhcblx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdCBfLm9iamVjdERlZXBGbGF0dGVuKGN1cnJlbnRDaGlsZHJlbixrZXkpXG5cdFx0XHRyZXR1cm4gcmVzdWx0XG5cdFx0LFtdXG5cblx0c2VhcmNoOiAoYXJyYXksc2VhcmNoRmllbGQsdGVybSktPlxuXHRcdHRlcm0gPSB0ZXJtLnRvTG93ZXJDYXNlKClcblx0XHRyZXR1cm4gXy5maWx0ZXIgYXJyYXksIChpdGVtKS0+XG5cdFx0XHRyZXR1cm4gaXRlbVtzZWFyY2hGaWVsZF0udG9Mb3dlckNhc2UoKS5pbmRleE9mKHRlcm0pICE9IC0xXG5cblx0ZGVlcEZpbmQ6IChkYXRhLHNlYXJjaFRlcm1zLHJldHVybkNoYWluID0gdHJ1ZSxsZXZlbCA9IDApLT5cblx0XHRyZXN1bHRzID0gW11cblx0XHRmb3VuZCA9IF8uZmluZCBkYXRhLCBzZWFyY2hUZXJtc1xuXHRcdGlmICEgZm91bmRcblx0XHRcdF8uZWFjaCBkYXRhLCAoaXRlbSktPlxuXHRcdFx0XHRpZiBpdGVtLmNoaWxkcmVuICYmIF8uaXNBcnJheShpdGVtLmNoaWxkcmVuKVxuXHRcdFx0XHRcdGNoaWxkUmVzdWx0cyA9IF8uZGVlcEZpbmQoaXRlbS5jaGlsZHJlbixzZWFyY2hUZXJtcyxyZXR1cm5DaGFpbiwgbGV2ZWwrMSlcblx0XHRcdFx0XHRpZiBjaGlsZFJlc3VsdHNcblx0XHRcdFx0XHRcdGlmIHJldHVybkNoYWluIFxuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2ggaXRlbVxuXHRcdFx0XHRcdFx0cmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0IGNoaWxkUmVzdWx0c1xuXG5cdFx0ZWxzZSBcblx0XHRcdHJlc3VsdHMucHVzaCBmb3VuZFxuXHRcdFxuXHRcdGlmIHJlc3VsdHMubGVuZ3RoXG5cdFx0XHRyZXR1cm4gcmVzdWx0c1xuXHRcdGVsc2UgcmV0dXJuIGZhbHNlIiwiYXBwLmNvbmZpZyAoJGxvY2F0aW9uUHJvdmlkZXIpIC0+XG5cdCRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTsiLCJjb250cm9sbGVycy5jb250cm9sbGVyICdCYXNlQ3RybCcsICgkc2NvcGUsJGZpcmViYXNlT2JqZWN0KS0+XG5cdHJlZiA9IG5ldyBGaXJlYmFzZShcImh0dHBzOi8vcmFzcGJlcnJ5LW1lYXQuZmlyZWJhc2Vpby5jb21cIilcblxuXHQkc2NvcGUuc3RhdHVzID0gJGZpcmViYXNlT2JqZWN0KHJlZi5jaGlsZCgnc3RhdHVzJykpXG5cblx0YmFzZVF1ZXJ5ID0gcmVmLmNoaWxkKCdzZXNzaW9uJylcblx0XHQub3JkZXJCeUNoaWxkKCdpZCcpXG5cdFxuXHQkc2NvcGUubGFzdFNlc3Npb25zID0ge31cblxuXHRzZXRMYXN0U2Vzc2lvbkRhdGEgPSAoc25hcHNob3QpLT5cblx0XHRyZXN1bHQgPSBzbmFwc2hvdC52YWwoKVxuXHRcdGtleSA9IF8ua2V5cyhyZXN1bHQpWzBdXG5cdFx0c2Vzc2lvbiA9IHJlc3VsdFtrZXldXG5cdFx0JHNjb3BlLmxhc3RTZXNzaW9uc1tzZXNzaW9uLmlkXSA9IHNlc3Npb24gXG5cdFx0JHNjb3BlLiRhcHBseSgpXG5cdFx0XG5cdGJhc2VRdWVyeS5lcXVhbFRvKCdiXzInKVxuXHRcdC5saW1pdFRvTGFzdCgxKVxuXHRcdC5vbiAndmFsdWUnLCBzZXRMYXN0U2Vzc2lvbkRhdGFcblxuXHRiYXNlUXVlcnkuZXF1YWxUbygnYl8xJylcblx0XHQubGltaXRUb0xhc3QoMSlcblx0XHQub24gJ3ZhbHVlJywgc2V0TGFzdFNlc3Npb25EYXRhXG5cdFxuXG5cdCRzY29wZS5nZXRFbGFwc2VkVGltZUZvciA9IChpZCktPlxuXHRcdGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gJHNjb3BlLmxhc3RTZXNzaW9uc1tpZF0uc3RhcnRUaW1lXG5cdFx0Y29uc29sZS5sb2cgZWxhcHNlZFxuXHRcdHJldHVybiBlbGFwc2VkIl19
