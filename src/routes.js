import docs from 'Src/routes/docs';

let routes = [].concat(docs);

//Convert nested routes to simple routes
function convertNestedRoutes(routes) {

    try {
        if (routes.length) {
            routes.forEach(function (route) {
                if (route.resources && route.resources.length) {
                    routes = routes.concat(convertNestedRoutes(route.resources));
                }
            });
        }
        return routes;
    } catch (e) {
        //Error
    }
}

routes = convertNestedRoutes(routes);

export default routes;
