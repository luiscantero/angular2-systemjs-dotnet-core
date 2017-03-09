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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var author_search_service_1 = require("./author-search.service");
var AuthorSearchComponent = (function () {
    function AuthorSearchComponent(authorSearchService, router) {
        this.authorSearchService = authorSearchService;
        this.router = router;
        this.searchSubject = new Subject_1.Subject(); // Observable/Observer.
        this.allTerms = [];
        this.term = new forms_1.FormControl();
    }
    // Push search term into observable stream.
    AuthorSearchComponent.prototype.search = function (term) { console.log(term); this.searchSubject.next(term); };
    AuthorSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authors = this.searchSubject
            .asObservable() // Cast to Observable.
            .debounceTime(300) // Wait 300 ms after input finished.
            .distinctUntilChanged() // Ignore if same as previous.
            .switchMap(function (term) { return term // Switch to new observable each time.
            ? _this.authorSearchService.search(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // Todo: Real error handling.
            console.log(error);
            return Observable_1.Observable.of([]);
        });
        this.terms = this.term.valueChanges
            .debounceTime(300) // Wait 300 ms after input finished.
            .distinctUntilChanged() // Ignore if same as previous.
            .switchMap(function (term) { return term // Switch to new observable each time.
            ? (function (term) {
                _this.allTerms.splice(0, 0, term); // Push to beginning.
                return Observable_1.Observable.of(_this.allTerms);
            })(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // Todo: Real error handling.
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    AuthorSearchComponent.prototype.gotoDetails = function (author) {
        //alert(author.name);
        var link = ['/details', author.name];
        this.router.navigate(link);
    };
    return AuthorSearchComponent;
}());
AuthorSearchComponent = __decorate([
    core_1.Component({
        selector: 'author-search',
        templateUrl: 'app/author-search.component.html',
        providers: [author_search_service_1.AuthorSearchService]
    }),
    __metadata("design:paramtypes", [author_search_service_1.AuthorSearchService,
        router_1.Router])
], AuthorSearchComponent);
exports.AuthorSearchComponent = AuthorSearchComponent;
//# sourceMappingURL=author-search.component.js.map