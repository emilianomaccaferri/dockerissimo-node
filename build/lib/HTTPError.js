"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HTTPError_error_message, _HTTPError_error_code, _HTTPError_response;
Object.defineProperty(exports, "__esModule", { value: true });
class HTTPError {
    constructor(error_message, error_code) {
        _HTTPError_error_message.set(this, void 0);
        _HTTPError_error_code.set(this, void 0);
        _HTTPError_response.set(this, void 0);
        __classPrivateFieldSet(this, _HTTPError_error_message, error_message, "f");
        __classPrivateFieldSet(this, _HTTPError_error_code, error_code, "f");
        __classPrivateFieldSet(this, _HTTPError_response, {
            success: false,
            error: __classPrivateFieldGet(this, _HTTPError_error_message, "f"),
            status: __classPrivateFieldGet(this, _HTTPError_error_code, "f")
        }, "f");
    }
    toResponse(res) {
        return res.status(__classPrivateFieldGet(this, _HTTPError_error_code, "f")).json(__classPrivateFieldGet(this, _HTTPError_response, "f"));
    }
    addParam(key, value) {
        __classPrivateFieldGet(this, _HTTPError_response, "f")[key] = value;
        return this;
    }
    addParams(params) {
        Object.keys(params)
            .forEach(key => {
            __classPrivateFieldGet(this, _HTTPError_response, "f")[key] = params[key];
        });
        return this;
    }
}
exports.default = HTTPError;
_HTTPError_error_message = new WeakMap(), _HTTPError_error_code = new WeakMap(), _HTTPError_response = new WeakMap();
// errors
HTTPError.USER_EXISTS = new HTTPError('user_exists', 409);
HTTPError.NOT_FOUND = new HTTPError('not_found', 404);
HTTPError.INVALID_CREDENTIALS = new HTTPError('invalid_credentials', 401);
HTTPError.EXPIRED_CREDENTIALS = new HTTPError('expired_credentials', 401);
HTTPError.MALFORMED_CREDENTIALS = new HTTPError('malformed_credentials', 400);
HTTPError.GENERIC_ERROR = new HTTPError('generic_error', 500);
HTTPError.USER_NOT_FOUND = new HTTPError('user_not_found', 404);
HTTPError.UNAUTHORIZED = new HTTPError('unauthorized', 401);
HTTPError.USER_INFO_ACCESS_UNAUTHORIZED = new HTTPError('user_info_access_unauthorized', 401);
HTTPError.MAX_SIZE_REACHED = new HTTPError('max_storage_size_reached', 400);
HTTPError.TOO_MANY_FILES = new HTTPError('too_many_files', 413);
HTTPError.TOO_MANY_REQUESTS = new HTTPError('too_many_requests', 429);
HTTPError.INVALID_MIMETYPE = new HTTPError('invalid_mimetype', 400);
HTTPError.BAD_REQUEST = new HTTPError('bad_request', 400);
HTTPError.missingParameters = (...params) => new HTTPError('missing_parameters', 400).addParam('missing', params);
