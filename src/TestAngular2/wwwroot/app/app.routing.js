"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var intro_component_1 = require("./intro.component");
var about_component_1 = require("./about.component");
var author_details_component_1 = require("./author-details.component");
var appRoutes = [
    {
        path: '',
        redirectTo: '/intro',
        pathMatch: 'full'
    },
    {
        path: 'intro',
        component: intro_component_1.IntroComponent
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent
    },
    {
        path: 'details/:name',
        component: author_details_component_1.AuthorDetailsComponent
    },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map