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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var AuthorService = (function () {
    function AuthorService(http) {
        this.http = http;
        this.authorsUrl = '/mock-authors.json'; // URL to web api.
    }
    AuthorService.prototype.getAuthors = function () {
        return this.http.get(this.authorsUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    AuthorService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    // Create.
    AuthorService.prototype.post = function (author) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .post(this.authorsUrl, JSON.stringify(author), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    // Update.
    AuthorService.prototype.put = function (author) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.authorsUrl + "/" + author.name;
        return this.http
            .put(url, JSON.stringify(author), { headers: headers })
            .toPromise()
            .then(function () { return author; })
            .catch(this.handleError);
    };
    // Delete.
    AuthorService.prototype.delete = function (author) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.authorsUrl + "/" + author.name;
        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    };
    // Create if new, otherwise update.
    AuthorService.prototype.save = function (author) {
        if (author.name) {
            return this.put(author);
        }
        return this.post(author);
    };
    AuthorService.prototype.getAuthor = function (name) {
        return this.getAuthors()
            .then(function (authors) { return authors.find(function (author) { return author.name === name; }); });
    };
    //getAuthors(): Promise<Author[]> {
    //    return Promise.resolve(AUTHORS);
    //}
    AuthorService.prototype.getAuthorsSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(resolve, 2000);
        }) // 2 s.
            .then(function () { return _this.getAuthors(); });
    };
    return AuthorService;
}());
AuthorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthorService);
exports.AuthorService = AuthorService;
//# sourceMappingURL=author.service.js.map