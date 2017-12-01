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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var author_model_1 = require("./author.model");
var author_service_1 = require("./author.service");
var AuthorDetailsComponent = /** @class */ (function () {
    function AuthorDetailsComponent(route, authorService) {
        this.route = route;
        this.authorService = authorService;
    }
    AuthorDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (typeof (params['name']) !== 'undefined') {
                var name_1 = params['name'];
                _this.authorService.getAuthor(name_1)
                    .then(function (author) { return _this.author = author; });
            }
            else {
                _this.author = new author_model_1.Author("", 0);
            }
        });
    };
    AuthorDetailsComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    AuthorDetailsComponent = __decorate([
        core_1.Component({
            selector: 'author-details',
            templateUrl: 'app/author-details.component.html',
            styleUrls: ['app/author-details.component.css'],
            providers: [author_service_1.AuthorService],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            author_service_1.AuthorService])
    ], AuthorDetailsComponent);
    return AuthorDetailsComponent;
}());
exports.AuthorDetailsComponent = AuthorDetailsComponent;
//# sourceMappingURL=author-details.component.js.map