"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var author_model_1 = require('./author.model');
var author_service_1 = require('./author.service');
var AboutComponent = (function () {
    function AboutComponent(router, authorService) {
        this.router = router;
        this.authorService = authorService;
        this.msg = "Hello from about!";
        this.useRedBack = false;
        this.author = new author_model_1.Author("Bill", 20);
    }
    AboutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authorService.getAuthors()
            .then(function (authors) { return _this.authors = authors; });
    };
    AboutComponent.prototype.goBack = function () {
        // Go back.
        window.history.back();
        // Navigate to intro.
        //let link = ['/intro']; // [path, param].
        //this.router.navigate(link);
    };
    AboutComponent.prototype.toggleStyle = function (state) {
        this.useRedBack = state;
    };
    AboutComponent.prototype.showDetails = function (author) {
        alert(JSON.stringify(author));
    };
    AboutComponent.prototype.getHello = function (hello) {
        alert(hello);
    };
    AboutComponent.prototype.event1 = function () {
        alert("Event 1");
    };
    AboutComponent.prototype.event2 = function () {
        alert("Event 2");
    };
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'my-about',
            templateUrl: 'app/about.component.html',
            styleUrls: ['app/about.component.css'],
            providers: [author_service_1.AuthorService],
        }), 
        __metadata('design:paramtypes', [router_1.Router, author_service_1.AuthorService])
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map