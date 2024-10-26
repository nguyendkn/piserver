var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/reflect-metadata/Reflect.js
var require_Reflect = __commonJS(() => {
  /*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  var Reflect2;
  (function(Reflect3) {
    (function(factory) {
      var root = typeof globalThis === "object" ? globalThis : typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
      var exporter = makeExporter(Reflect3);
      if (typeof root.Reflect !== "undefined") {
        exporter = makeExporter(root.Reflect, exporter);
      }
      factory(exporter, root);
      if (typeof root.Reflect === "undefined") {
        root.Reflect = Reflect3;
      }
      function makeExporter(target, previous) {
        return function(key, value) {
          Object.defineProperty(target, key, { configurable: true, writable: true, value });
          if (previous)
            previous(key, value);
        };
      }
      function functionThis() {
        try {
          return Function("return this;")();
        } catch (_) {
        }
      }
      function indirectEvalThis() {
        try {
          return (undefined, eval)("(function() { return this; })()");
        } catch (_) {
        }
      }
      function sloppyModeThis() {
        return functionThis() || indirectEvalThis();
      }
    })(function(exporter, root) {
      var hasOwn = Object.prototype.hasOwnProperty;
      var supportsSymbol = typeof Symbol === "function";
      var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
      var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
      var supportsCreate = typeof Object.create === "function";
      var supportsProto = { __proto__: [] } instanceof Array;
      var downLevel = !supportsCreate && !supportsProto;
      var HashMap = {
        create: supportsCreate ? function() {
          return MakeDictionary(Object.create(null));
        } : supportsProto ? function() {
          return MakeDictionary({ __proto__: null });
        } : function() {
          return MakeDictionary({});
        },
        has: downLevel ? function(map, key) {
          return hasOwn.call(map, key);
        } : function(map, key) {
          return key in map;
        },
        get: downLevel ? function(map, key) {
          return hasOwn.call(map, key) ? map[key] : undefined;
        } : function(map, key) {
          return map[key];
        }
      };
      var functionPrototype = Object.getPrototypeOf(Function);
      var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
      var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
      var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
      var registrySymbol = supportsSymbol ? Symbol.for("@reflect-metadata:registry") : undefined;
      var metadataRegistry = GetOrCreateMetadataRegistry();
      var metadataProvider = CreateMetadataProvider(metadataRegistry);
      function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
          if (!IsArray(decorators))
            throw new TypeError;
          if (!IsObject(target))
            throw new TypeError;
          if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
            throw new TypeError;
          if (IsNull(attributes))
            attributes = undefined;
          propertyKey = ToPropertyKey(propertyKey);
          return DecorateProperty(decorators, target, propertyKey, attributes);
        } else {
          if (!IsArray(decorators))
            throw new TypeError;
          if (!IsConstructor(target))
            throw new TypeError;
          return DecorateConstructor(decorators, target);
        }
      }
      exporter("decorate", decorate);
      function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError;
          if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
            throw new TypeError;
          OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
      }
      exporter("metadata", metadata);
      function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      exporter("defineMetadata", defineMetadata);
      function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasMetadata", hasMetadata);
      function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasOwnMetadata", hasOwnMetadata);
      function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
      }
      exporter("getMetadata", getMetadata);
      function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("getOwnMetadata", getOwnMetadata);
      function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
      }
      exporter("getMetadataKeys", getMetadataKeys);
      function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
      }
      exporter("getOwnMetadataKeys", getOwnMetadataKeys);
      function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        if (!IsObject(target))
          throw new TypeError;
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        var provider = GetMetadataProvider(target, propertyKey, false);
        if (IsUndefined(provider))
          return false;
        return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
      }
      exporter("deleteMetadata", deleteMetadata);
      function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1;i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsConstructor(decorated))
              throw new TypeError;
            target = decorated;
          }
        }
        return target;
      }
      function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1;i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target, propertyKey, descriptor);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsObject(decorated))
              throw new TypeError;
            descriptor = decorated;
          }
        }
        return descriptor;
      }
      function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn2)
          return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
          return OrdinaryHasMetadata(MetadataKey, parent, P);
        return false;
      }
      function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var provider = GetMetadataProvider(O, P, false);
        if (IsUndefined(provider))
          return false;
        return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
      }
      function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn2)
          return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
          return OrdinaryGetMetadata(MetadataKey, parent, P);
        return;
      }
      function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var provider = GetMetadataProvider(O, P, false);
        if (IsUndefined(provider))
          return;
        return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
      }
      function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var provider = GetMetadataProvider(O, P, true);
        provider.OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
      }
      function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null)
          return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0)
          return ownKeys;
        if (ownKeys.length <= 0)
          return parentKeys;
        var set = new _Set;
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys;_i < ownKeys_1.length; _i++) {
          var key = ownKeys_1[_i];
          var hasKey = set.has(key);
          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }
        for (var _a = 0, parentKeys_1 = parentKeys;_a < parentKeys_1.length; _a++) {
          var key = parentKeys_1[_a];
          var hasKey = set.has(key);
          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }
        return keys;
      }
      function OrdinaryOwnMetadataKeys(O, P) {
        var provider = GetMetadataProvider(O, P, false);
        if (!provider) {
          return [];
        }
        return provider.OrdinaryOwnMetadataKeys(O, P);
      }
      function Type(x) {
        if (x === null)
          return 1;
        switch (typeof x) {
          case "undefined":
            return 0;
          case "boolean":
            return 2;
          case "string":
            return 3;
          case "symbol":
            return 4;
          case "number":
            return 5;
          case "object":
            return x === null ? 1 : 6;
          default:
            return 6;
        }
      }
      function IsUndefined(x) {
        return x === undefined;
      }
      function IsNull(x) {
        return x === null;
      }
      function IsSymbol(x) {
        return typeof x === "symbol";
      }
      function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
      }
      function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
          case 0:
            return input;
          case 1:
            return input;
          case 2:
            return input;
          case 3:
            return input;
          case 4:
            return input;
          case 5:
            return input;
        }
        var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== undefined) {
          var result = exoticToPrim.call(input, hint);
          if (IsObject(result))
            throw new TypeError;
          return result;
        }
        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
      }
      function OrdinaryToPrimitive(O, hint) {
        if (hint === "string") {
          var toString_1 = O.toString;
          if (IsCallable(toString_1)) {
            var result = toString_1.call(O);
            if (!IsObject(result))
              return result;
          }
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result))
              return result;
          }
        } else {
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result))
              return result;
          }
          var toString_2 = O.toString;
          if (IsCallable(toString_2)) {
            var result = toString_2.call(O);
            if (!IsObject(result))
              return result;
          }
        }
        throw new TypeError;
      }
      function ToBoolean(argument) {
        return !!argument;
      }
      function ToString(argument) {
        return "" + argument;
      }
      function ToPropertyKey(argument) {
        var key = ToPrimitive(argument, 3);
        if (IsSymbol(key))
          return key;
        return ToString(key);
      }
      function IsArray(argument) {
        return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
      }
      function IsCallable(argument) {
        return typeof argument === "function";
      }
      function IsConstructor(argument) {
        return typeof argument === "function";
      }
      function IsPropertyKey(argument) {
        switch (Type(argument)) {
          case 3:
            return true;
          case 4:
            return true;
          default:
            return false;
        }
      }
      function SameValueZero(x, y) {
        return x === y || x !== x && y !== y;
      }
      function GetMethod(V, P) {
        var func = V[P];
        if (func === undefined || func === null)
          return;
        if (!IsCallable(func))
          throw new TypeError;
        return func;
      }
      function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method))
          throw new TypeError;
        var iterator = method.call(obj);
        if (!IsObject(iterator))
          throw new TypeError;
        return iterator;
      }
      function IteratorValue(iterResult) {
        return iterResult.value;
      }
      function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
      }
      function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f)
          f.call(iterator);
      }
      function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
          return proto;
        if (proto !== functionPrototype)
          return proto;
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
          return proto;
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
          return proto;
        if (constructor === O)
          return proto;
        return constructor;
      }
      function CreateMetadataRegistry() {
        var fallback;
        if (!IsUndefined(registrySymbol) && typeof root.Reflect !== "undefined" && !(registrySymbol in root.Reflect) && typeof root.Reflect.defineMetadata === "function") {
          fallback = CreateFallbackProvider(root.Reflect);
        }
        var first;
        var second;
        var rest;
        var targetProviderMap = new _WeakMap;
        var registry = {
          registerProvider,
          getProvider,
          setProvider
        };
        return registry;
        function registerProvider(provider) {
          if (!Object.isExtensible(registry)) {
            throw new Error("Cannot add provider to a frozen registry.");
          }
          switch (true) {
            case fallback === provider:
              break;
            case IsUndefined(first):
              first = provider;
              break;
            case first === provider:
              break;
            case IsUndefined(second):
              second = provider;
              break;
            case second === provider:
              break;
            default:
              if (rest === undefined)
                rest = new _Set;
              rest.add(provider);
              break;
          }
        }
        function getProviderNoCache(O, P) {
          if (!IsUndefined(first)) {
            if (first.isProviderFor(O, P))
              return first;
            if (!IsUndefined(second)) {
              if (second.isProviderFor(O, P))
                return first;
              if (!IsUndefined(rest)) {
                var iterator = GetIterator(rest);
                while (true) {
                  var next = IteratorStep(iterator);
                  if (!next) {
                    return;
                  }
                  var provider = IteratorValue(next);
                  if (provider.isProviderFor(O, P)) {
                    IteratorClose(iterator);
                    return provider;
                  }
                }
              }
            }
          }
          if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) {
            return fallback;
          }
          return;
        }
        function getProvider(O, P) {
          var providerMap = targetProviderMap.get(O);
          var provider;
          if (!IsUndefined(providerMap)) {
            provider = providerMap.get(P);
          }
          if (!IsUndefined(provider)) {
            return provider;
          }
          provider = getProviderNoCache(O, P);
          if (!IsUndefined(provider)) {
            if (IsUndefined(providerMap)) {
              providerMap = new _Map;
              targetProviderMap.set(O, providerMap);
            }
            providerMap.set(P, provider);
          }
          return provider;
        }
        function hasProvider(provider) {
          if (IsUndefined(provider))
            throw new TypeError;
          return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
        }
        function setProvider(O, P, provider) {
          if (!hasProvider(provider)) {
            throw new Error("Metadata provider not registered.");
          }
          var existingProvider = getProvider(O, P);
          if (existingProvider !== provider) {
            if (!IsUndefined(existingProvider)) {
              return false;
            }
            var providerMap = targetProviderMap.get(O);
            if (IsUndefined(providerMap)) {
              providerMap = new _Map;
              targetProviderMap.set(O, providerMap);
            }
            providerMap.set(P, provider);
          }
          return true;
        }
      }
      function GetOrCreateMetadataRegistry() {
        var metadataRegistry2;
        if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
          metadataRegistry2 = root.Reflect[registrySymbol];
        }
        if (IsUndefined(metadataRegistry2)) {
          metadataRegistry2 = CreateMetadataRegistry();
        }
        if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
          Object.defineProperty(root.Reflect, registrySymbol, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: metadataRegistry2
          });
        }
        return metadataRegistry2;
      }
      function CreateMetadataProvider(registry) {
        var metadata2 = new _WeakMap;
        var provider = {
          isProviderFor: function(O, P) {
            var targetMetadata = metadata2.get(O);
            if (IsUndefined(targetMetadata))
              return false;
            return targetMetadata.has(P);
          },
          OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata2,
          OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata2,
          OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata2,
          OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys2,
          OrdinaryDeleteMetadata
        };
        metadataRegistry.registerProvider(provider);
        return provider;
        function GetOrCreateMetadataMap(O, P, Create) {
          var targetMetadata = metadata2.get(O);
          var createdTargetMetadata = false;
          if (IsUndefined(targetMetadata)) {
            if (!Create)
              return;
            targetMetadata = new _Map;
            metadata2.set(O, targetMetadata);
            createdTargetMetadata = true;
          }
          var metadataMap = targetMetadata.get(P);
          if (IsUndefined(metadataMap)) {
            if (!Create)
              return;
            metadataMap = new _Map;
            targetMetadata.set(P, metadataMap);
            if (!registry.setProvider(O, P, provider)) {
              targetMetadata.delete(P);
              if (createdTargetMetadata) {
                metadata2.delete(O);
              }
              throw new Error("Wrong provider for target.");
            }
          }
          return metadataMap;
        }
        function OrdinaryHasOwnMetadata2(MetadataKey, O, P) {
          var metadataMap = GetOrCreateMetadataMap(O, P, false);
          if (IsUndefined(metadataMap))
            return false;
          return ToBoolean(metadataMap.has(MetadataKey));
        }
        function OrdinaryGetOwnMetadata2(MetadataKey, O, P) {
          var metadataMap = GetOrCreateMetadataMap(O, P, false);
          if (IsUndefined(metadataMap))
            return;
          return metadataMap.get(MetadataKey);
        }
        function OrdinaryDefineOwnMetadata2(MetadataKey, MetadataValue, O, P) {
          var metadataMap = GetOrCreateMetadataMap(O, P, true);
          metadataMap.set(MetadataKey, MetadataValue);
        }
        function OrdinaryOwnMetadataKeys2(O, P) {
          var keys = [];
          var metadataMap = GetOrCreateMetadataMap(O, P, false);
          if (IsUndefined(metadataMap))
            return keys;
          var keysObj = metadataMap.keys();
          var iterator = GetIterator(keysObj);
          var k = 0;
          while (true) {
            var next = IteratorStep(iterator);
            if (!next) {
              keys.length = k;
              return keys;
            }
            var nextValue = IteratorValue(next);
            try {
              keys[k] = nextValue;
            } catch (e) {
              try {
                IteratorClose(iterator);
              } finally {
                throw e;
              }
            }
            k++;
          }
        }
        function OrdinaryDeleteMetadata(MetadataKey, O, P) {
          var metadataMap = GetOrCreateMetadataMap(O, P, false);
          if (IsUndefined(metadataMap))
            return false;
          if (!metadataMap.delete(MetadataKey))
            return false;
          if (metadataMap.size === 0) {
            var targetMetadata = metadata2.get(O);
            if (!IsUndefined(targetMetadata)) {
              targetMetadata.delete(P);
              if (targetMetadata.size === 0) {
                metadata2.delete(targetMetadata);
              }
            }
          }
          return true;
        }
      }
      function CreateFallbackProvider(reflect) {
        var { defineMetadata: defineMetadata2, hasOwnMetadata: hasOwnMetadata2, getOwnMetadata: getOwnMetadata2, getOwnMetadataKeys: getOwnMetadataKeys2, deleteMetadata: deleteMetadata2 } = reflect;
        var metadataOwner = new _WeakMap;
        var provider = {
          isProviderFor: function(O, P) {
            var metadataPropertySet = metadataOwner.get(O);
            if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P)) {
              return true;
            }
            if (getOwnMetadataKeys2(O, P).length) {
              if (IsUndefined(metadataPropertySet)) {
                metadataPropertySet = new _Set;
                metadataOwner.set(O, metadataPropertySet);
              }
              metadataPropertySet.add(P);
              return true;
            }
            return false;
          },
          OrdinaryDefineOwnMetadata: defineMetadata2,
          OrdinaryHasOwnMetadata: hasOwnMetadata2,
          OrdinaryGetOwnMetadata: getOwnMetadata2,
          OrdinaryOwnMetadataKeys: getOwnMetadataKeys2,
          OrdinaryDeleteMetadata: deleteMetadata2
        };
        return provider;
      }
      function GetMetadataProvider(O, P, Create) {
        var registeredProvider = metadataRegistry.getProvider(O, P);
        if (!IsUndefined(registeredProvider)) {
          return registeredProvider;
        }
        if (Create) {
          if (metadataRegistry.setProvider(O, P, metadataProvider)) {
            return metadataProvider;
          }
          throw new Error("Illegal state.");
        }
        return;
      }
      function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = function() {
          function MapIterator2(keys, values, selector) {
            this._index = 0;
            this._keys = keys;
            this._values = values;
            this._selector = selector;
          }
          MapIterator2.prototype["@@iterator"] = function() {
            return this;
          };
          MapIterator2.prototype[iteratorSymbol] = function() {
            return this;
          };
          MapIterator2.prototype.next = function() {
            var index = this._index;
            if (index >= 0 && index < this._keys.length) {
              var result = this._selector(this._keys[index], this._values[index]);
              if (index + 1 >= this._keys.length) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              } else {
                this._index++;
              }
              return { value: result, done: false };
            }
            return { value: undefined, done: true };
          };
          MapIterator2.prototype.throw = function(error) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            throw error;
          };
          MapIterator2.prototype.return = function(value) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            return { value, done: true };
          };
          return MapIterator2;
        }();
        var Map2 = function() {
          function Map3() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }
          Object.defineProperty(Map3.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });
          Map3.prototype.has = function(key) {
            return this._find(key, false) >= 0;
          };
          Map3.prototype.get = function(key) {
            var index = this._find(key, false);
            return index >= 0 ? this._values[index] : undefined;
          };
          Map3.prototype.set = function(key, value) {
            var index = this._find(key, true);
            this._values[index] = value;
            return this;
          };
          Map3.prototype.delete = function(key) {
            var index = this._find(key, false);
            if (index >= 0) {
              var size = this._keys.length;
              for (var i = index + 1;i < size; i++) {
                this._keys[i - 1] = this._keys[i];
                this._values[i - 1] = this._values[i];
              }
              this._keys.length--;
              this._values.length--;
              if (SameValueZero(key, this._cacheKey)) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              return true;
            }
            return false;
          };
          Map3.prototype.clear = function() {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };
          Map3.prototype.keys = function() {
            return new MapIterator(this._keys, this._values, getKey);
          };
          Map3.prototype.values = function() {
            return new MapIterator(this._keys, this._values, getValue);
          };
          Map3.prototype.entries = function() {
            return new MapIterator(this._keys, this._values, getEntry);
          };
          Map3.prototype["@@iterator"] = function() {
            return this.entries();
          };
          Map3.prototype[iteratorSymbol] = function() {
            return this.entries();
          };
          Map3.prototype._find = function(key, insert) {
            if (!SameValueZero(this._cacheKey, key)) {
              this._cacheIndex = -1;
              for (var i = 0;i < this._keys.length; i++) {
                if (SameValueZero(this._keys[i], key)) {
                  this._cacheIndex = i;
                  break;
                }
              }
            }
            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;
              this._keys.push(key);
              this._values.push(undefined);
            }
            return this._cacheIndex;
          };
          return Map3;
        }();
        return Map2;
        function getKey(key, _) {
          return key;
        }
        function getValue(_, value) {
          return value;
        }
        function getEntry(key, value) {
          return [key, value];
        }
      }
      function CreateSetPolyfill() {
        var Set2 = function() {
          function Set3() {
            this._map = new _Map;
          }
          Object.defineProperty(Set3.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });
          Set3.prototype.has = function(value) {
            return this._map.has(value);
          };
          Set3.prototype.add = function(value) {
            return this._map.set(value, value), this;
          };
          Set3.prototype.delete = function(value) {
            return this._map.delete(value);
          };
          Set3.prototype.clear = function() {
            this._map.clear();
          };
          Set3.prototype.keys = function() {
            return this._map.keys();
          };
          Set3.prototype.values = function() {
            return this._map.keys();
          };
          Set3.prototype.entries = function() {
            return this._map.entries();
          };
          Set3.prototype["@@iterator"] = function() {
            return this.keys();
          };
          Set3.prototype[iteratorSymbol] = function() {
            return this.keys();
          };
          return Set3;
        }();
        return Set2;
      }
      function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return function() {
          function WeakMap2() {
            this._key = CreateUniqueKey();
          }
          WeakMap2.prototype.has = function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            return table !== undefined ? HashMap.has(table, this._key) : false;
          };
          WeakMap2.prototype.get = function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            return table !== undefined ? HashMap.get(table, this._key) : undefined;
          };
          WeakMap2.prototype.set = function(target, value) {
            var table = GetOrCreateWeakMapTable(target, true);
            table[this._key] = value;
            return this;
          };
          WeakMap2.prototype.delete = function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            return table !== undefined ? delete table[this._key] : false;
          };
          WeakMap2.prototype.clear = function() {
            this._key = CreateUniqueKey();
          };
          return WeakMap2;
        }();
        function CreateUniqueKey() {
          var key;
          do
            key = "@@WeakMap@@" + CreateUUID();
          while (HashMap.has(keys, key));
          keys[key] = true;
          return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
          if (!hasOwn.call(target, rootKey)) {
            if (!create)
              return;
            Object.defineProperty(target, rootKey, { value: HashMap.create() });
          }
          return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
          for (var i = 0;i < size; ++i)
            buffer[i] = Math.random() * 255 | 0;
          return buffer;
        }
        function GenRandomBytes(size) {
          if (typeof Uint8Array === "function") {
            var array = new Uint8Array(size);
            if (typeof crypto !== "undefined") {
              crypto.getRandomValues(array);
            } else if (typeof msCrypto !== "undefined") {
              msCrypto.getRandomValues(array);
            } else {
              FillRandomBytes(array, size);
            }
            return array;
          }
          return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
          var data = GenRandomBytes(UUID_SIZE);
          data[6] = data[6] & 79 | 64;
          data[8] = data[8] & 191 | 128;
          var result = "";
          for (var offset = 0;offset < UUID_SIZE; ++offset) {
            var byte = data[offset];
            if (offset === 4 || offset === 6 || offset === 8)
              result += "-";
            if (byte < 16)
              result += "0";
            result += byte.toString(16).toLowerCase();
          }
          return result;
        }
      }
      function MakeDictionary(obj) {
        obj.__ = undefined;
        delete obj.__;
        return obj;
      }
    });
  })(Reflect2 || (Reflect2 = {}));
});

// src/core/decorators/action.ts
var import_reflect_metadata = __toESM(require_Reflect(), 1);
function Action(route) {
  return (target, propertyKey) => {
    const actions = Reflect.getMetadata("controller:actions", target) || [];
    actions.push({ route, propertyKey });
    Reflect.defineMetadata("controller:actions", actions, target);
  };
}
// src/core/decorators/controller.ts
var import_reflect_metadata2 = __toESM(require_Reflect(), 1);
function Controller(path) {
  return (target) => {
    Reflect.defineMetadata("controller:path", path, target);
  };
}
// src/core/decorators/scopes.ts
var import_reflect_metadata4 = __toESM(require_Reflect(), 1);

// node_modules/inversify/es/constants/metadata_keys.js
var NAMED_TAG = "named";
var NAME_TAG = "name";
var UNMANAGED_TAG = "unmanaged";
var OPTIONAL_TAG = "optional";
var INJECT_TAG = "inject";
var MULTI_INJECT_TAG = "multi_inject";
var TAGGED = "inversify:tagged";
var TAGGED_PROP = "inversify:tagged_props";
var PARAM_TYPES = "inversify:paramtypes";
var DESIGN_PARAM_TYPES = "design:paramtypes";
var POST_CONSTRUCT = "post_construct";
var PRE_DESTROY = "pre_destroy";
function getNonCustomTagKeys() {
  return [
    INJECT_TAG,
    MULTI_INJECT_TAG,
    NAME_TAG,
    UNMANAGED_TAG,
    NAMED_TAG,
    OPTIONAL_TAG
  ];
}
var NON_CUSTOM_TAG_KEYS = getNonCustomTagKeys();

// node_modules/inversify/es/constants/literal_types.js
var BindingScopeEnum = {
  Request: "Request",
  Singleton: "Singleton",
  Transient: "Transient"
};
var BindingTypeEnum = {
  ConstantValue: "ConstantValue",
  Constructor: "Constructor",
  DynamicValue: "DynamicValue",
  Factory: "Factory",
  Function: "Function",
  Instance: "Instance",
  Invalid: "Invalid",
  Provider: "Provider"
};
var TargetTypeEnum = {
  ClassProperty: "ClassProperty",
  ConstructorArgument: "ConstructorArgument",
  Variable: "Variable"
};

// node_modules/inversify/es/utils/id.js
var idCounter = 0;
function id() {
  return idCounter++;
}

// node_modules/inversify/es/bindings/binding.js
var Binding = function() {
  function Binding2(serviceIdentifier, scope) {
    this.id = id();
    this.activated = false;
    this.serviceIdentifier = serviceIdentifier;
    this.scope = scope;
    this.type = BindingTypeEnum.Invalid;
    this.constraint = function(request) {
      return true;
    };
    this.implementationType = null;
    this.cache = null;
    this.factory = null;
    this.provider = null;
    this.onActivation = null;
    this.onDeactivation = null;
    this.dynamicValue = null;
  }
  Binding2.prototype.clone = function() {
    var clone = new Binding2(this.serviceIdentifier, this.scope);
    clone.activated = clone.scope === BindingScopeEnum.Singleton ? this.activated : false;
    clone.implementationType = this.implementationType;
    clone.dynamicValue = this.dynamicValue;
    clone.scope = this.scope;
    clone.type = this.type;
    clone.factory = this.factory;
    clone.provider = this.provider;
    clone.constraint = this.constraint;
    clone.onActivation = this.onActivation;
    clone.onDeactivation = this.onDeactivation;
    clone.cache = this.cache;
    return clone;
  };
  return Binding2;
}();

// node_modules/inversify/es/constants/error_msgs.js
var DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
var NULL_ARGUMENT = "NULL argument";
var KEY_NOT_FOUND = "Key Not Found";
var AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
var CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
var NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
var MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
var MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
var CIRCULAR_DEPENDENCY = "Circular dependency found:";
var INVALID_BINDING_TYPE = "Invalid binding type:";
var NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
var INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
var INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
var LAZY_IN_SYNC = function(key) {
  return "You are attempting to construct ".concat(keyToString(key), " in a synchronous way ") + "but it has asynchronous dependencies.";
};
var INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " + "used as service identifier";
var INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " + "must be applied to the parameters of a class constructor or a class property.";
var ARGUMENTS_LENGTH_MISMATCH = function() {
  var values = [];
  for (var _i = 0;_i < arguments.length; _i++) {
    values[_i] = arguments[_i];
  }
  return "The number of constructor arguments in the derived class " + "".concat(values[0], " must be >= than the number of constructor arguments of its base class.");
};
var CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " + "must be an object.";
var CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " + 'be a string ("singleton" or "transient").';
var CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " + "be a boolean";
var CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " + "be a boolean";
var ASYNC_UNBIND_REQUIRED = "Attempting to unbind dependency with asynchronous destruction (@preDestroy or onDeactivation)";
var POST_CONSTRUCT_ERROR = function(clazz, errorMessage) {
  return "@postConstruct error in class ".concat(clazz, ": ").concat(errorMessage);
};
var PRE_DESTROY_ERROR = function(clazz, errorMessage) {
  return "@preDestroy error in class ".concat(clazz, ": ").concat(errorMessage);
};
var ON_DEACTIVATION_ERROR = function(clazz, errorMessage) {
  return "onDeactivation() error in class ".concat(clazz, ": ").concat(errorMessage);
};
var CIRCULAR_DEPENDENCY_IN_FACTORY = function(factoryType, serviceIdentifier) {
  return "It looks like there is a circular dependency in one of the '".concat(factoryType, "' bindings. Please investigate bindings with ") + "service identifier '".concat(serviceIdentifier, "'.");
};
var STACK_OVERFLOW = "Maximum call stack size exceeded";
function keyToString(key) {
  if (typeof key === "function") {
    return "[function/class ".concat(key.name || "<anonymous>", "]");
  }
  if (typeof key === "symbol") {
    return key.toString();
  }
  return "'".concat(key, "'");
}

// node_modules/inversify/es/planning/metadata_reader.js
var MetadataReader = function() {
  function MetadataReader2() {
  }
  MetadataReader2.prototype.getConstructorMetadata = function(constructorFunc) {
    var compilerGeneratedMetadata = Reflect.getMetadata(PARAM_TYPES, constructorFunc);
    var userGeneratedMetadata = Reflect.getMetadata(TAGGED, constructorFunc);
    return {
      compilerGeneratedMetadata,
      userGeneratedMetadata: userGeneratedMetadata || {}
    };
  };
  MetadataReader2.prototype.getPropertiesMetadata = function(constructorFunc) {
    var userGeneratedMetadata = Reflect.getMetadata(TAGGED_PROP, constructorFunc) || [];
    return userGeneratedMetadata;
  };
  return MetadataReader2;
}();

// node_modules/inversify/es/bindings/binding_count.js
var BindingCount = {
  MultipleBindingsAvailable: 2,
  NoBindingsAvailable: 0,
  OnlyOneBindingAvailable: 1
};

// node_modules/inversify/es/utils/exceptions.js
function isStackOverflowException(error) {
  return error instanceof RangeError || error.message === STACK_OVERFLOW;
}
var tryAndThrowErrorIfStackOverflow = function(fn, errorCallback) {
  try {
    return fn();
  } catch (error) {
    if (isStackOverflowException(error)) {
      error = errorCallback();
    }
    throw error;
  }
};

// node_modules/inversify/es/utils/serialization.js
function getServiceIdentifierAsString(serviceIdentifier) {
  if (typeof serviceIdentifier === "function") {
    var _serviceIdentifier = serviceIdentifier;
    return _serviceIdentifier.name;
  } else if (typeof serviceIdentifier === "symbol") {
    return serviceIdentifier.toString();
  } else {
    var _serviceIdentifier = serviceIdentifier;
    return _serviceIdentifier;
  }
}
function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
  var registeredBindingsList = "";
  var registeredBindings = getBindings(container, serviceIdentifier);
  if (registeredBindings.length !== 0) {
    registeredBindingsList = "\nRegistered bindings:";
    registeredBindings.forEach(function(binding) {
      var name = "Object";
      if (binding.implementationType !== null) {
        name = getFunctionName(binding.implementationType);
      }
      registeredBindingsList = "".concat(registeredBindingsList, "\n ").concat(name);
      if (binding.constraint.metaData) {
        registeredBindingsList = "".concat(registeredBindingsList, " - ").concat(binding.constraint.metaData);
      }
    });
  }
  return registeredBindingsList;
}
function alreadyDependencyChain(request, serviceIdentifier) {
  if (request.parentRequest === null) {
    return false;
  } else if (request.parentRequest.serviceIdentifier === serviceIdentifier) {
    return true;
  } else {
    return alreadyDependencyChain(request.parentRequest, serviceIdentifier);
  }
}
function dependencyChainToString(request) {
  function _createStringArr(req, result) {
    if (result === undefined) {
      result = [];
    }
    var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
    result.push(serviceIdentifier);
    if (req.parentRequest !== null) {
      return _createStringArr(req.parentRequest, result);
    }
    return result;
  }
  var stringArr = _createStringArr(request);
  return stringArr.reverse().join(" --> ");
}
function circularDependencyToException(request) {
  request.childRequests.forEach(function(childRequest) {
    if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
      var services = dependencyChainToString(childRequest);
      throw new Error("".concat(CIRCULAR_DEPENDENCY, " ").concat(services));
    } else {
      circularDependencyToException(childRequest);
    }
  });
}
function listMetadataForTarget(serviceIdentifierString, target) {
  if (target.isTagged() || target.isNamed()) {
    var m_1 = "";
    var namedTag = target.getNamedTag();
    var otherTags = target.getCustomTags();
    if (namedTag !== null) {
      m_1 += namedTag.toString() + "\n";
    }
    if (otherTags !== null) {
      otherTags.forEach(function(tag) {
        m_1 += tag.toString() + "\n";
      });
    }
    return " ".concat(serviceIdentifierString, "\n ").concat(serviceIdentifierString, " - ").concat(m_1);
  } else {
    return " ".concat(serviceIdentifierString);
  }
}
function getFunctionName(func) {
  if (func.name) {
    return func.name;
  } else {
    var name_1 = func.toString();
    var match = name_1.match(/^function\s*([^\s(]+)/);
    return match ? match[1] : "Anonymous function: ".concat(name_1);
  }
}
function getSymbolDescription(symbol) {
  return symbol.toString().slice(7, -1);
}

// node_modules/inversify/es/planning/context.js
var Context = function() {
  function Context2(container) {
    this.id = id();
    this.container = container;
  }
  Context2.prototype.addPlan = function(plan) {
    this.plan = plan;
  };
  Context2.prototype.setCurrentRequest = function(currentRequest) {
    this.currentRequest = currentRequest;
  };
  return Context2;
}();

// node_modules/inversify/es/planning/metadata.js
var Metadata = function() {
  function Metadata2(key, value) {
    this.key = key;
    this.value = value;
  }
  Metadata2.prototype.toString = function() {
    if (this.key === NAMED_TAG) {
      return "named: ".concat(String(this.value).toString(), " ");
    } else {
      return "tagged: { key:".concat(this.key.toString(), ", value: ").concat(String(this.value), " }");
    }
  };
  return Metadata2;
}();

// node_modules/inversify/es/planning/plan.js
var Plan = function() {
  function Plan2(parentContext, rootRequest) {
    this.parentContext = parentContext;
    this.rootRequest = rootRequest;
  }
  return Plan2;
}();

// node_modules/inversify/es/annotation/lazy_service_identifier.js
var LazyServiceIdentifier = function() {
  function LazyServiceIdentifier2(cb) {
    this._cb = cb;
  }
  LazyServiceIdentifier2.prototype.unwrap = function() {
    return this._cb();
  };
  return LazyServiceIdentifier2;
}();

// node_modules/inversify/es/planning/queryable_string.js
var QueryableString = function() {
  function QueryableString2(str) {
    this.str = str;
  }
  QueryableString2.prototype.startsWith = function(searchString) {
    return this.str.indexOf(searchString) === 0;
  };
  QueryableString2.prototype.endsWith = function(searchString) {
    var reverseString = "";
    var reverseSearchString = searchString.split("").reverse().join("");
    reverseString = this.str.split("").reverse().join("");
    return this.startsWith.call({ str: reverseString }, reverseSearchString);
  };
  QueryableString2.prototype.contains = function(searchString) {
    return this.str.indexOf(searchString) !== -1;
  };
  QueryableString2.prototype.equals = function(compareString) {
    return this.str === compareString;
  };
  QueryableString2.prototype.value = function() {
    return this.str;
  };
  return QueryableString2;
}();

// node_modules/inversify/es/planning/target.js
var Target = function() {
  function Target2(type, identifier, serviceIdentifier, namedOrTagged) {
    this.id = id();
    this.type = type;
    this.serviceIdentifier = serviceIdentifier;
    var queryableName = typeof identifier === "symbol" ? getSymbolDescription(identifier) : identifier;
    this.name = new QueryableString(queryableName || "");
    this.identifier = identifier;
    this.metadata = new Array;
    var metadataItem = null;
    if (typeof namedOrTagged === "string") {
      metadataItem = new Metadata(NAMED_TAG, namedOrTagged);
    } else if (namedOrTagged instanceof Metadata) {
      metadataItem = namedOrTagged;
    }
    if (metadataItem !== null) {
      this.metadata.push(metadataItem);
    }
  }
  Target2.prototype.hasTag = function(key) {
    for (var _i = 0, _a = this.metadata;_i < _a.length; _i++) {
      var m = _a[_i];
      if (m.key === key) {
        return true;
      }
    }
    return false;
  };
  Target2.prototype.isArray = function() {
    return this.hasTag(MULTI_INJECT_TAG);
  };
  Target2.prototype.matchesArray = function(name) {
    return this.matchesTag(MULTI_INJECT_TAG)(name);
  };
  Target2.prototype.isNamed = function() {
    return this.hasTag(NAMED_TAG);
  };
  Target2.prototype.isTagged = function() {
    return this.metadata.some(function(metadata) {
      return NON_CUSTOM_TAG_KEYS.every(function(key) {
        return metadata.key !== key;
      });
    });
  };
  Target2.prototype.isOptional = function() {
    return this.matchesTag(OPTIONAL_TAG)(true);
  };
  Target2.prototype.getNamedTag = function() {
    if (this.isNamed()) {
      return this.metadata.filter(function(m) {
        return m.key === NAMED_TAG;
      })[0];
    }
    return null;
  };
  Target2.prototype.getCustomTags = function() {
    if (this.isTagged()) {
      return this.metadata.filter(function(metadata) {
        return NON_CUSTOM_TAG_KEYS.every(function(key) {
          return metadata.key !== key;
        });
      });
    } else {
      return null;
    }
  };
  Target2.prototype.matchesNamedTag = function(name) {
    return this.matchesTag(NAMED_TAG)(name);
  };
  Target2.prototype.matchesTag = function(key) {
    var _this = this;
    return function(value) {
      for (var _i = 0, _a = _this.metadata;_i < _a.length; _i++) {
        var m = _a[_i];
        if (m.key === key && m.value === value) {
          return true;
        }
      }
      return false;
    };
  };
  return Target2;
}();

// node_modules/inversify/es/planning/reflection_utils.js
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar;i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function getDependencies(metadataReader, func) {
  var constructorName = getFunctionName(func);
  return getTargets(metadataReader, constructorName, func, false);
}
function getTargets(metadataReader, constructorName, func, isBaseClass) {
  var metadata = metadataReader.getConstructorMetadata(func);
  var serviceIdentifiers = metadata.compilerGeneratedMetadata;
  if (serviceIdentifiers === undefined) {
    var msg = "".concat(MISSING_INJECTABLE_ANNOTATION, " ").concat(constructorName, ".");
    throw new Error(msg);
  }
  var constructorArgsMetadata = metadata.userGeneratedMetadata;
  var keys = Object.keys(constructorArgsMetadata);
  var hasUserDeclaredUnknownInjections = func.length === 0 && keys.length > 0;
  var hasOptionalParameters = keys.length > func.length;
  var iterations = hasUserDeclaredUnknownInjections || hasOptionalParameters ? keys.length : func.length;
  var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
  var propertyTargets = getClassPropsAsTargets(metadataReader, func, constructorName);
  var targets = __spreadArray(__spreadArray([], constructorTargets, true), propertyTargets, true);
  return targets;
}
function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
  var targetMetadata = constructorArgsMetadata[index.toString()] || [];
  var metadata = formatTargetMetadata(targetMetadata);
  var isManaged = metadata.unmanaged !== true;
  var serviceIdentifier = serviceIdentifiers[index];
  var injectIdentifier = metadata.inject || metadata.multiInject;
  serviceIdentifier = injectIdentifier ? injectIdentifier : serviceIdentifier;
  if (serviceIdentifier instanceof LazyServiceIdentifier) {
    serviceIdentifier = serviceIdentifier.unwrap();
  }
  if (isManaged) {
    var isObject = serviceIdentifier === Object;
    var isFunction = serviceIdentifier === Function;
    var isUndefined = serviceIdentifier === undefined;
    var isUnknownType = isObject || isFunction || isUndefined;
    if (!isBaseClass && isUnknownType) {
      var msg = "".concat(MISSING_INJECT_ANNOTATION, " argument ").concat(index, " in class ").concat(constructorName, ".");
      throw new Error(msg);
    }
    var target = new Target(TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
    target.metadata = targetMetadata;
    return target;
  }
  return null;
}
function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
  var targets = [];
  for (var i = 0;i < iterations; i++) {
    var index = i;
    var target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);
    if (target !== null) {
      targets.push(target);
    }
  }
  return targets;
}
function _getServiceIdentifierForProperty(inject, multiInject, propertyName, className) {
  var serviceIdentifier = inject || multiInject;
  if (serviceIdentifier === undefined) {
    var msg = "".concat(MISSING_INJECTABLE_ANNOTATION, " for property ").concat(String(propertyName), " in class ").concat(className, ".");
    throw new Error(msg);
  }
  return serviceIdentifier;
}
function getClassPropsAsTargets(metadataReader, constructorFunc, constructorName) {
  var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
  var targets = [];
  var symbolKeys = Object.getOwnPropertySymbols(classPropsMetadata);
  var stringKeys = Object.keys(classPropsMetadata);
  var keys = stringKeys.concat(symbolKeys);
  for (var _i = 0, keys_1 = keys;_i < keys_1.length; _i++) {
    var key = keys_1[_i];
    var targetMetadata = classPropsMetadata[key];
    var metadata = formatTargetMetadata(targetMetadata);
    var identifier = metadata.targetName || key;
    var serviceIdentifier = _getServiceIdentifierForProperty(metadata.inject, metadata.multiInject, key, constructorName);
    var target = new Target(TargetTypeEnum.ClassProperty, identifier, serviceIdentifier);
    target.metadata = targetMetadata;
    targets.push(target);
  }
  var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
  if (baseConstructor !== Object) {
    var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor, constructorName);
    targets = __spreadArray(__spreadArray([], targets, true), baseTargets, true);
  }
  return targets;
}
function getBaseClassDependencyCount(metadataReader, func) {
  var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
  if (baseConstructor !== Object) {
    var baseConstructorName = getFunctionName(baseConstructor);
    var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
    var metadata = targets.map(function(t) {
      return t.metadata.filter(function(m) {
        return m.key === UNMANAGED_TAG;
      });
    });
    var unmanagedCount = [].concat.apply([], metadata).length;
    var dependencyCount = targets.length - unmanagedCount;
    if (dependencyCount > 0) {
      return dependencyCount;
    } else {
      return getBaseClassDependencyCount(metadataReader, baseConstructor);
    }
  } else {
    return 0;
  }
}
function formatTargetMetadata(targetMetadata) {
  var targetMetadataMap = {};
  targetMetadata.forEach(function(m) {
    targetMetadataMap[m.key.toString()] = m.value;
  });
  return {
    inject: targetMetadataMap[INJECT_TAG],
    multiInject: targetMetadataMap[MULTI_INJECT_TAG],
    targetName: targetMetadataMap[NAME_TAG],
    unmanaged: targetMetadataMap[UNMANAGED_TAG]
  };
}

// node_modules/inversify/es/planning/request.js
var Request = function() {
  function Request2(serviceIdentifier, parentContext, parentRequest, bindings, target) {
    this.id = id();
    this.serviceIdentifier = serviceIdentifier;
    this.parentContext = parentContext;
    this.parentRequest = parentRequest;
    this.target = target;
    this.childRequests = [];
    this.bindings = Array.isArray(bindings) ? bindings : [bindings];
    this.requestScope = parentRequest === null ? new Map : null;
  }
  Request2.prototype.addChildRequest = function(serviceIdentifier, bindings, target) {
    var child = new Request2(serviceIdentifier, this.parentContext, this, bindings, target);
    this.childRequests.push(child);
    return child;
  };
  return Request2;
}();

// node_modules/inversify/es/planning/planner.js
function getBindingDictionary(cntnr) {
  return cntnr._bindingDictionary;
}
function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
  var metadataKey = isMultiInject ? MULTI_INJECT_TAG : INJECT_TAG;
  var injectMetadata = new Metadata(metadataKey, serviceIdentifier);
  var target = new Target(targetType, name, serviceIdentifier, injectMetadata);
  if (key !== undefined) {
    var tagMetadata = new Metadata(key, value);
    target.metadata.push(tagMetadata);
  }
  return target;
}
function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
  var bindings = getBindings(context.container, target.serviceIdentifier);
  var activeBindings = [];
  if (bindings.length === BindingCount.NoBindingsAvailable && context.container.options.autoBindInjectable && typeof target.serviceIdentifier === "function" && metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata) {
    context.container.bind(target.serviceIdentifier).toSelf();
    bindings = getBindings(context.container, target.serviceIdentifier);
  }
  if (!avoidConstraints) {
    activeBindings = bindings.filter(function(binding) {
      var request = new Request(binding.serviceIdentifier, context, parentRequest, binding, target);
      return binding.constraint(request);
    });
  } else {
    activeBindings = bindings;
  }
  _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container);
  return activeBindings;
}
function _validateActiveBindingCount(serviceIdentifier, bindings, target, container) {
  switch (bindings.length) {
    case BindingCount.NoBindingsAvailable:
      if (target.isOptional()) {
        return bindings;
      } else {
        var serviceIdentifierString = getServiceIdentifierAsString(serviceIdentifier);
        var msg = NOT_REGISTERED;
        msg += listMetadataForTarget(serviceIdentifierString, target);
        msg += listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
        throw new Error(msg);
      }
    case BindingCount.OnlyOneBindingAvailable:
      return bindings;
    case BindingCount.MultipleBindingsAvailable:
    default:
      if (!target.isArray()) {
        var serviceIdentifierString = getServiceIdentifierAsString(serviceIdentifier);
        var msg = "".concat(AMBIGUOUS_MATCH, " ").concat(serviceIdentifierString);
        msg += listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
        throw new Error(msg);
      } else {
        return bindings;
      }
  }
}
function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
  var activeBindings;
  var childRequest;
  if (parentRequest === null) {
    activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, null, target);
    childRequest = new Request(serviceIdentifier, context, null, activeBindings, target);
    var thePlan = new Plan(context, childRequest);
    context.addPlan(thePlan);
  } else {
    activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target);
    childRequest = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target);
  }
  activeBindings.forEach(function(binding) {
    var subChildRequest = null;
    if (target.isArray()) {
      subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
    } else {
      if (binding.cache) {
        return;
      }
      subChildRequest = childRequest;
    }
    if (binding.type === BindingTypeEnum.Instance && binding.implementationType !== null) {
      var dependencies = getDependencies(metadataReader, binding.implementationType);
      if (!context.container.options.skipBaseClassChecks) {
        var baseClassDependencyCount = getBaseClassDependencyCount(metadataReader, binding.implementationType);
        if (dependencies.length < baseClassDependencyCount) {
          var error = ARGUMENTS_LENGTH_MISMATCH(getFunctionName(binding.implementationType));
          throw new Error(error);
        }
      }
      dependencies.forEach(function(dependency) {
        _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency);
      });
    }
  });
}
function getBindings(container, serviceIdentifier) {
  var bindings = [];
  var bindingDictionary = getBindingDictionary(container);
  if (bindingDictionary.hasKey(serviceIdentifier)) {
    bindings = bindingDictionary.get(serviceIdentifier);
  } else if (container.parent !== null) {
    bindings = getBindings(container.parent, serviceIdentifier);
  }
  return bindings;
}
function plan(metadataReader, container, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
  if (avoidConstraints === undefined) {
    avoidConstraints = false;
  }
  var context = new Context(container);
  var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);
  try {
    _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target);
    return context;
  } catch (error) {
    if (isStackOverflowException(error)) {
      circularDependencyToException(context.plan.rootRequest);
    }
    throw error;
  }
}
function createMockRequest(container, serviceIdentifier, key, value) {
  var target = new Target(TargetTypeEnum.Variable, "", serviceIdentifier, new Metadata(key, value));
  var context = new Context(container);
  var request = new Request(serviceIdentifier, context, null, [], target);
  return request;
}

// node_modules/inversify/es/utils/async.js
function isPromise(object) {
  var isObjectOrFunction = typeof object === "object" && object !== null || typeof object === "function";
  return isObjectOrFunction && typeof object.then === "function";
}
function isPromiseOrContainsPromise(object) {
  if (isPromise(object)) {
    return true;
  }
  return Array.isArray(object) && object.some(isPromise);
}

// node_modules/inversify/es/scope/scope.js
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : undefined, done: true };
  }
};
var tryGetFromScope = function(requestScope, binding) {
  if (binding.scope === BindingScopeEnum.Singleton && binding.activated) {
    return binding.cache;
  }
  if (binding.scope === BindingScopeEnum.Request && requestScope.has(binding.id)) {
    return requestScope.get(binding.id);
  }
  return null;
};
var saveToScope = function(requestScope, binding, result) {
  if (binding.scope === BindingScopeEnum.Singleton) {
    _saveToSingletonScope(binding, result);
  }
  if (binding.scope === BindingScopeEnum.Request) {
    _saveToRequestScope(requestScope, binding, result);
  }
};
var _saveToRequestScope = function(requestScope, binding, result) {
  if (!requestScope.has(binding.id)) {
    requestScope.set(binding.id, result);
  }
};
var _saveToSingletonScope = function(binding, result) {
  binding.cache = result;
  binding.activated = true;
  if (isPromise(result)) {
    _saveAsyncResultToSingletonScope(binding, result);
  }
};
var _saveAsyncResultToSingletonScope = function(binding, asyncResult) {
  return __awaiter(undefined, undefined, undefined, function() {
    var result, ex_1;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4, asyncResult];
        case 1:
          result = _a.sent();
          binding.cache = result;
          return [3, 3];
        case 2:
          ex_1 = _a.sent();
          binding.cache = null;
          binding.activated = false;
          throw ex_1;
        case 3:
          return [2];
      }
    });
  });
};

// node_modules/inversify/es/utils/factory_type.js
var FactoryType;
(function(FactoryType2) {
  FactoryType2["DynamicValue"] = "toDynamicValue";
  FactoryType2["Factory"] = "toFactory";
  FactoryType2["Provider"] = "toProvider";
})(FactoryType || (FactoryType = {}));

// node_modules/inversify/es/utils/binding_utils.js
var ensureFullyBound = function(binding) {
  var boundValue = null;
  switch (binding.type) {
    case BindingTypeEnum.ConstantValue:
    case BindingTypeEnum.Function:
      boundValue = binding.cache;
      break;
    case BindingTypeEnum.Constructor:
    case BindingTypeEnum.Instance:
      boundValue = binding.implementationType;
      break;
    case BindingTypeEnum.DynamicValue:
      boundValue = binding.dynamicValue;
      break;
    case BindingTypeEnum.Provider:
      boundValue = binding.provider;
      break;
    case BindingTypeEnum.Factory:
      boundValue = binding.factory;
      break;
  }
  if (boundValue === null) {
    var serviceIdentifierAsString = getServiceIdentifierAsString(binding.serviceIdentifier);
    throw new Error("".concat(INVALID_BINDING_TYPE, " ").concat(serviceIdentifierAsString));
  }
};
var getFactoryDetails = function(binding) {
  switch (binding.type) {
    case BindingTypeEnum.Factory:
      return { factory: binding.factory, factoryType: FactoryType.Factory };
    case BindingTypeEnum.Provider:
      return { factory: binding.provider, factoryType: FactoryType.Provider };
    case BindingTypeEnum.DynamicValue:
      return { factory: binding.dynamicValue, factoryType: FactoryType.DynamicValue };
    default:
      throw new Error("Unexpected factory type ".concat(binding.type));
  }
};

// node_modules/inversify/es/resolution/instantiation.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length;i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator2 = function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : undefined, done: true };
  }
};
var __spreadArray2 = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar;i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function _resolveRequests(childRequests, resolveRequest) {
  return childRequests.reduce(function(resolvedRequests, childRequest) {
    var injection = resolveRequest(childRequest);
    var targetType = childRequest.target.type;
    if (targetType === TargetTypeEnum.ConstructorArgument) {
      resolvedRequests.constructorInjections.push(injection);
    } else {
      resolvedRequests.propertyRequests.push(childRequest);
      resolvedRequests.propertyInjections.push(injection);
    }
    if (!resolvedRequests.isAsync) {
      resolvedRequests.isAsync = isPromiseOrContainsPromise(injection);
    }
    return resolvedRequests;
  }, { constructorInjections: [], propertyInjections: [], propertyRequests: [], isAsync: false });
}
function _createInstance(constr, childRequests, resolveRequest) {
  var result;
  if (childRequests.length > 0) {
    var resolved = _resolveRequests(childRequests, resolveRequest);
    var createInstanceWithInjectionsArg = __assign(__assign({}, resolved), { constr });
    if (resolved.isAsync) {
      result = createInstanceWithInjectionsAsync(createInstanceWithInjectionsArg);
    } else {
      result = createInstanceWithInjections(createInstanceWithInjectionsArg);
    }
  } else {
    result = new constr;
  }
  return result;
}
function createInstanceWithInjections(args) {
  var _a;
  var instance = new ((_a = args.constr).bind.apply(_a, __spreadArray2([undefined], args.constructorInjections, false)));
  args.propertyRequests.forEach(function(r, index) {
    var property = r.target.identifier;
    var injection = args.propertyInjections[index];
    if (!r.target.isOptional() || injection !== undefined) {
      instance[property] = injection;
    }
  });
  return instance;
}
function createInstanceWithInjectionsAsync(args) {
  return __awaiter2(this, undefined, undefined, function() {
    var constructorInjections, propertyInjections;
    return __generator2(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4, possiblyWaitInjections(args.constructorInjections)];
        case 1:
          constructorInjections = _a.sent();
          return [4, possiblyWaitInjections(args.propertyInjections)];
        case 2:
          propertyInjections = _a.sent();
          return [2, createInstanceWithInjections(__assign(__assign({}, args), { constructorInjections, propertyInjections }))];
      }
    });
  });
}
function possiblyWaitInjections(possiblePromiseinjections) {
  return __awaiter2(this, undefined, undefined, function() {
    var injections, _i, possiblePromiseinjections_1, injection;
    return __generator2(this, function(_a) {
      injections = [];
      for (_i = 0, possiblePromiseinjections_1 = possiblePromiseinjections;_i < possiblePromiseinjections_1.length; _i++) {
        injection = possiblePromiseinjections_1[_i];
        if (Array.isArray(injection)) {
          injections.push(Promise.all(injection));
        } else {
          injections.push(injection);
        }
      }
      return [2, Promise.all(injections)];
    });
  });
}
function _getInstanceAfterPostConstruct(constr, result) {
  var postConstructResult = _postConstruct(constr, result);
  if (isPromise(postConstructResult)) {
    return postConstructResult.then(function() {
      return result;
    });
  } else {
    return result;
  }
}
function _postConstruct(constr, instance) {
  var _a, _b;
  if (Reflect.hasMetadata(POST_CONSTRUCT, constr)) {
    var data = Reflect.getMetadata(POST_CONSTRUCT, constr);
    try {
      return (_b = (_a = instance)[data.value]) === null || _b === undefined ? undefined : _b.call(_a);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(POST_CONSTRUCT_ERROR(constr.name, e.message));
      }
    }
  }
}
function _validateInstanceResolution(binding, constr) {
  if (binding.scope !== BindingScopeEnum.Singleton) {
    _throwIfHandlingDeactivation(binding, constr);
  }
}
function _throwIfHandlingDeactivation(binding, constr) {
  var scopeErrorMessage = "Class cannot be instantiated in ".concat(binding.scope === BindingScopeEnum.Request ? "request" : "transient", " scope.");
  if (typeof binding.onDeactivation === "function") {
    throw new Error(ON_DEACTIVATION_ERROR(constr.name, scopeErrorMessage));
  }
  if (Reflect.hasMetadata(PRE_DESTROY, constr)) {
    throw new Error(PRE_DESTROY_ERROR(constr.name, scopeErrorMessage));
  }
}
function resolveInstance(binding, constr, childRequests, resolveRequest) {
  _validateInstanceResolution(binding, constr);
  var result = _createInstance(constr, childRequests, resolveRequest);
  if (isPromise(result)) {
    return result.then(function(resolvedResult) {
      return _getInstanceAfterPostConstruct(constr, resolvedResult);
    });
  } else {
    return _getInstanceAfterPostConstruct(constr, result);
  }
}

// node_modules/inversify/es/resolution/resolver.js
var __awaiter3 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator3 = function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : undefined, done: true };
  }
};
var _resolveRequest = function(requestScope) {
  return function(request) {
    request.parentContext.setCurrentRequest(request);
    var bindings = request.bindings;
    var childRequests = request.childRequests;
    var targetIsAnArray = request.target && request.target.isArray();
    var targetParentIsNotAnArray = !request.parentRequest || !request.parentRequest.target || !request.target || !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);
    if (targetIsAnArray && targetParentIsNotAnArray) {
      return childRequests.map(function(childRequest) {
        var _f = _resolveRequest(requestScope);
        return _f(childRequest);
      });
    } else {
      if (request.target.isOptional() && bindings.length === 0) {
        return;
      }
      var binding = bindings[0];
      return _resolveBinding(requestScope, request, binding);
    }
  };
};
var _resolveFactoryFromBinding = function(binding, context) {
  var factoryDetails = getFactoryDetails(binding);
  return tryAndThrowErrorIfStackOverflow(function() {
    return factoryDetails.factory.bind(binding)(context);
  }, function() {
    return new Error(CIRCULAR_DEPENDENCY_IN_FACTORY(factoryDetails.factoryType, context.currentRequest.serviceIdentifier.toString()));
  });
};
var _getResolvedFromBinding = function(requestScope, request, binding) {
  var result;
  var childRequests = request.childRequests;
  ensureFullyBound(binding);
  switch (binding.type) {
    case BindingTypeEnum.ConstantValue:
    case BindingTypeEnum.Function:
      result = binding.cache;
      break;
    case BindingTypeEnum.Constructor:
      result = binding.implementationType;
      break;
    case BindingTypeEnum.Instance:
      result = resolveInstance(binding, binding.implementationType, childRequests, _resolveRequest(requestScope));
      break;
    default:
      result = _resolveFactoryFromBinding(binding, request.parentContext);
  }
  return result;
};
var _resolveInScope = function(requestScope, binding, resolveFromBinding) {
  var result = tryGetFromScope(requestScope, binding);
  if (result !== null) {
    return result;
  }
  result = resolveFromBinding();
  saveToScope(requestScope, binding, result);
  return result;
};
var _resolveBinding = function(requestScope, request, binding) {
  return _resolveInScope(requestScope, binding, function() {
    var result = _getResolvedFromBinding(requestScope, request, binding);
    if (isPromise(result)) {
      result = result.then(function(resolved) {
        return _onActivation(request, binding, resolved);
      });
    } else {
      result = _onActivation(request, binding, result);
    }
    return result;
  });
};
function _onActivation(request, binding, resolved) {
  var result = _bindingActivation(request.parentContext, binding, resolved);
  var containersIterator = _getContainersIterator(request.parentContext.container);
  var container;
  var containersIteratorResult = containersIterator.next();
  do {
    container = containersIteratorResult.value;
    var context_1 = request.parentContext;
    var serviceIdentifier = request.serviceIdentifier;
    var activationsIterator = _getContainerActivationsForService(container, serviceIdentifier);
    if (isPromise(result)) {
      result = _activateContainerAsync(activationsIterator, context_1, result);
    } else {
      result = _activateContainer(activationsIterator, context_1, result);
    }
    containersIteratorResult = containersIterator.next();
  } while (containersIteratorResult.done !== true && !getBindingDictionary(container).hasKey(request.serviceIdentifier));
  return result;
}
var _bindingActivation = function(context, binding, previousResult) {
  var result;
  if (typeof binding.onActivation === "function") {
    result = binding.onActivation(context, previousResult);
  } else {
    result = previousResult;
  }
  return result;
};
var _activateContainer = function(activationsIterator, context, result) {
  var activation = activationsIterator.next();
  while (!activation.done) {
    result = activation.value(context, result);
    if (isPromise(result)) {
      return _activateContainerAsync(activationsIterator, context, result);
    }
    activation = activationsIterator.next();
  }
  return result;
};
var _activateContainerAsync = function(activationsIterator, context, resultPromise) {
  return __awaiter3(undefined, undefined, undefined, function() {
    var result, activation;
    return __generator3(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4, resultPromise];
        case 1:
          result = _a.sent();
          activation = activationsIterator.next();
          _a.label = 2;
        case 2:
          if (!!activation.done)
            return [3, 4];
          return [4, activation.value(context, result)];
        case 3:
          result = _a.sent();
          activation = activationsIterator.next();
          return [3, 2];
        case 4:
          return [2, result];
      }
    });
  });
};
var _getContainerActivationsForService = function(container, serviceIdentifier) {
  var activations = container._activations;
  return activations.hasKey(serviceIdentifier) ? activations.get(serviceIdentifier).values() : [].values();
};
var _getContainersIterator = function(container) {
  var containersStack = [container];
  var parent = container.parent;
  while (parent !== null) {
    containersStack.push(parent);
    parent = parent.parent;
  }
  var getNextContainer = function() {
    var nextContainer = containersStack.pop();
    if (nextContainer !== undefined) {
      return { done: false, value: nextContainer };
    } else {
      return { done: true, value: undefined };
    }
  };
  var containersIterator = {
    next: getNextContainer
  };
  return containersIterator;
};
function resolve(context) {
  var _f = _resolveRequest(context.plan.rootRequest.requestScope);
  return _f(context.plan.rootRequest);
}

// node_modules/inversify/es/syntax/constraint_helpers.js
var traverseAncerstors = function(request, constraint) {
  var parent = request.parentRequest;
  if (parent !== null) {
    return constraint(parent) ? true : traverseAncerstors(parent, constraint);
  } else {
    return false;
  }
};
var taggedConstraint = function(key) {
  return function(value) {
    var constraint = function(request) {
      return request !== null && request.target !== null && request.target.matchesTag(key)(value);
    };
    constraint.metaData = new Metadata(key, value);
    return constraint;
  };
};
var namedConstraint = taggedConstraint(NAMED_TAG);
var typeConstraint = function(type) {
  return function(request) {
    var binding = null;
    if (request !== null) {
      binding = request.bindings[0];
      if (typeof type === "string") {
        var serviceIdentifier = binding.serviceIdentifier;
        return serviceIdentifier === type;
      } else {
        var constructor = request.bindings[0].implementationType;
        return type === constructor;
      }
    }
    return false;
  };
};

// node_modules/inversify/es/syntax/binding_when_syntax.js
var BindingWhenSyntax = function() {
  function BindingWhenSyntax2(binding) {
    this._binding = binding;
  }
  BindingWhenSyntax2.prototype.when = function(constraint) {
    this._binding.constraint = constraint;
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenTargetNamed = function(name) {
    this._binding.constraint = namedConstraint(name);
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenTargetIsDefault = function() {
    this._binding.constraint = function(request) {
      if (request === null) {
        return false;
      }
      var targetIsDefault = request.target !== null && !request.target.isNamed() && !request.target.isTagged();
      return targetIsDefault;
    };
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenTargetTagged = function(tag, value) {
    this._binding.constraint = taggedConstraint(tag)(value);
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenInjectedInto = function(parent) {
    this._binding.constraint = function(request) {
      return request !== null && typeConstraint(parent)(request.parentRequest);
    };
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenParentNamed = function(name) {
    this._binding.constraint = function(request) {
      return request !== null && namedConstraint(name)(request.parentRequest);
    };
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenParentTagged = function(tag, value) {
    this._binding.constraint = function(request) {
      return request !== null && taggedConstraint(tag)(value)(request.parentRequest);
    };
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenAnyAncestorIs = function(ancestor) {
    this._binding.constraint = function(request) {
      return request !== null && traverseAncerstors(request, typeConstraint(ancestor));
    };
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenNoAncestorIs = function(ancestor) {
    this._binding.constraint = function(request) {
      return request !== null && !traverseAncerstors(request, typeConstraint(ancestor));
    };
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenAnyAncestorNamed = function(name) {
    this._binding.constraint = function(request) {
      return request !== null && traverseAncerstors(request, namedConstraint(name));
    };
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenNoAncestorNamed = function(name) {
    this._binding.constraint = function(request) {
      return request !== null && !traverseAncerstors(request, namedConstraint(name));
    };
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenAnyAncestorTagged = function(tag, value) {
    this._binding.constraint = function(request) {
      return request !== null && traverseAncerstors(request, taggedConstraint(tag)(value));
    };
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenNoAncestorTagged = function(tag, value) {
    this._binding.constraint = function(request) {
      return request !== null && !traverseAncerstors(request, taggedConstraint(tag)(value));
    };
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenAnyAncestorMatches = function(constraint) {
    this._binding.constraint = function(request) {
      return request !== null && traverseAncerstors(request, constraint);
    };
    return new BindingOnSyntax(this._binding);
  };
  BindingWhenSyntax2.prototype.whenNoAncestorMatches = function(constraint) {
    this._binding.constraint = function(request) {
      return request !== null && !traverseAncerstors(request, constraint);
    };
    return new BindingOnSyntax(this._binding);
  };
  return BindingWhenSyntax2;
}();

// node_modules/inversify/es/syntax/binding_on_syntax.js
var BindingOnSyntax = function() {
  function BindingOnSyntax2(binding) {
    this._binding = binding;
  }
  BindingOnSyntax2.prototype.onActivation = function(handler) {
    this._binding.onActivation = handler;
    return new BindingWhenSyntax(this._binding);
  };
  BindingOnSyntax2.prototype.onDeactivation = function(handler) {
    this._binding.onDeactivation = handler;
    return new BindingWhenSyntax(this._binding);
  };
  return BindingOnSyntax2;
}();

// node_modules/inversify/es/syntax/binding_when_on_syntax.js
var BindingWhenOnSyntax = function() {
  function BindingWhenOnSyntax2(binding) {
    this._binding = binding;
    this._bindingWhenSyntax = new BindingWhenSyntax(this._binding);
    this._bindingOnSyntax = new BindingOnSyntax(this._binding);
  }
  BindingWhenOnSyntax2.prototype.when = function(constraint) {
    return this._bindingWhenSyntax.when(constraint);
  };
  BindingWhenOnSyntax2.prototype.whenTargetNamed = function(name) {
    return this._bindingWhenSyntax.whenTargetNamed(name);
  };
  BindingWhenOnSyntax2.prototype.whenTargetIsDefault = function() {
    return this._bindingWhenSyntax.whenTargetIsDefault();
  };
  BindingWhenOnSyntax2.prototype.whenTargetTagged = function(tag, value) {
    return this._bindingWhenSyntax.whenTargetTagged(tag, value);
  };
  BindingWhenOnSyntax2.prototype.whenInjectedInto = function(parent) {
    return this._bindingWhenSyntax.whenInjectedInto(parent);
  };
  BindingWhenOnSyntax2.prototype.whenParentNamed = function(name) {
    return this._bindingWhenSyntax.whenParentNamed(name);
  };
  BindingWhenOnSyntax2.prototype.whenParentTagged = function(tag, value) {
    return this._bindingWhenSyntax.whenParentTagged(tag, value);
  };
  BindingWhenOnSyntax2.prototype.whenAnyAncestorIs = function(ancestor) {
    return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
  };
  BindingWhenOnSyntax2.prototype.whenNoAncestorIs = function(ancestor) {
    return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
  };
  BindingWhenOnSyntax2.prototype.whenAnyAncestorNamed = function(name) {
    return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
  };
  BindingWhenOnSyntax2.prototype.whenAnyAncestorTagged = function(tag, value) {
    return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
  };
  BindingWhenOnSyntax2.prototype.whenNoAncestorNamed = function(name) {
    return this._bindingWhenSyntax.whenNoAncestorNamed(name);
  };
  BindingWhenOnSyntax2.prototype.whenNoAncestorTagged = function(tag, value) {
    return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
  };
  BindingWhenOnSyntax2.prototype.whenAnyAncestorMatches = function(constraint) {
    return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
  };
  BindingWhenOnSyntax2.prototype.whenNoAncestorMatches = function(constraint) {
    return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
  };
  BindingWhenOnSyntax2.prototype.onActivation = function(handler) {
    return this._bindingOnSyntax.onActivation(handler);
  };
  BindingWhenOnSyntax2.prototype.onDeactivation = function(handler) {
    return this._bindingOnSyntax.onDeactivation(handler);
  };
  return BindingWhenOnSyntax2;
}();

// node_modules/inversify/es/syntax/binding_in_syntax.js
var BindingInSyntax = function() {
  function BindingInSyntax2(binding) {
    this._binding = binding;
  }
  BindingInSyntax2.prototype.inRequestScope = function() {
    this._binding.scope = BindingScopeEnum.Request;
    return new BindingWhenOnSyntax(this._binding);
  };
  BindingInSyntax2.prototype.inSingletonScope = function() {
    this._binding.scope = BindingScopeEnum.Singleton;
    return new BindingWhenOnSyntax(this._binding);
  };
  BindingInSyntax2.prototype.inTransientScope = function() {
    this._binding.scope = BindingScopeEnum.Transient;
    return new BindingWhenOnSyntax(this._binding);
  };
  return BindingInSyntax2;
}();

// node_modules/inversify/es/syntax/binding_in_when_on_syntax.js
var BindingInWhenOnSyntax = function() {
  function BindingInWhenOnSyntax2(binding) {
    this._binding = binding;
    this._bindingWhenSyntax = new BindingWhenSyntax(this._binding);
    this._bindingOnSyntax = new BindingOnSyntax(this._binding);
    this._bindingInSyntax = new BindingInSyntax(binding);
  }
  BindingInWhenOnSyntax2.prototype.inRequestScope = function() {
    return this._bindingInSyntax.inRequestScope();
  };
  BindingInWhenOnSyntax2.prototype.inSingletonScope = function() {
    return this._bindingInSyntax.inSingletonScope();
  };
  BindingInWhenOnSyntax2.prototype.inTransientScope = function() {
    return this._bindingInSyntax.inTransientScope();
  };
  BindingInWhenOnSyntax2.prototype.when = function(constraint) {
    return this._bindingWhenSyntax.when(constraint);
  };
  BindingInWhenOnSyntax2.prototype.whenTargetNamed = function(name) {
    return this._bindingWhenSyntax.whenTargetNamed(name);
  };
  BindingInWhenOnSyntax2.prototype.whenTargetIsDefault = function() {
    return this._bindingWhenSyntax.whenTargetIsDefault();
  };
  BindingInWhenOnSyntax2.prototype.whenTargetTagged = function(tag, value) {
    return this._bindingWhenSyntax.whenTargetTagged(tag, value);
  };
  BindingInWhenOnSyntax2.prototype.whenInjectedInto = function(parent) {
    return this._bindingWhenSyntax.whenInjectedInto(parent);
  };
  BindingInWhenOnSyntax2.prototype.whenParentNamed = function(name) {
    return this._bindingWhenSyntax.whenParentNamed(name);
  };
  BindingInWhenOnSyntax2.prototype.whenParentTagged = function(tag, value) {
    return this._bindingWhenSyntax.whenParentTagged(tag, value);
  };
  BindingInWhenOnSyntax2.prototype.whenAnyAncestorIs = function(ancestor) {
    return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
  };
  BindingInWhenOnSyntax2.prototype.whenNoAncestorIs = function(ancestor) {
    return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
  };
  BindingInWhenOnSyntax2.prototype.whenAnyAncestorNamed = function(name) {
    return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
  };
  BindingInWhenOnSyntax2.prototype.whenAnyAncestorTagged = function(tag, value) {
    return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
  };
  BindingInWhenOnSyntax2.prototype.whenNoAncestorNamed = function(name) {
    return this._bindingWhenSyntax.whenNoAncestorNamed(name);
  };
  BindingInWhenOnSyntax2.prototype.whenNoAncestorTagged = function(tag, value) {
    return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
  };
  BindingInWhenOnSyntax2.prototype.whenAnyAncestorMatches = function(constraint) {
    return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
  };
  BindingInWhenOnSyntax2.prototype.whenNoAncestorMatches = function(constraint) {
    return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
  };
  BindingInWhenOnSyntax2.prototype.onActivation = function(handler) {
    return this._bindingOnSyntax.onActivation(handler);
  };
  BindingInWhenOnSyntax2.prototype.onDeactivation = function(handler) {
    return this._bindingOnSyntax.onDeactivation(handler);
  };
  return BindingInWhenOnSyntax2;
}();

// node_modules/inversify/es/syntax/binding_to_syntax.js
var BindingToSyntax = function() {
  function BindingToSyntax2(binding) {
    this._binding = binding;
  }
  BindingToSyntax2.prototype.to = function(constructor) {
    this._binding.type = BindingTypeEnum.Instance;
    this._binding.implementationType = constructor;
    return new BindingInWhenOnSyntax(this._binding);
  };
  BindingToSyntax2.prototype.toSelf = function() {
    if (typeof this._binding.serviceIdentifier !== "function") {
      throw new Error("".concat(INVALID_TO_SELF_VALUE));
    }
    var self2 = this._binding.serviceIdentifier;
    return this.to(self2);
  };
  BindingToSyntax2.prototype.toConstantValue = function(value) {
    this._binding.type = BindingTypeEnum.ConstantValue;
    this._binding.cache = value;
    this._binding.dynamicValue = null;
    this._binding.implementationType = null;
    this._binding.scope = BindingScopeEnum.Singleton;
    return new BindingWhenOnSyntax(this._binding);
  };
  BindingToSyntax2.prototype.toDynamicValue = function(func) {
    this._binding.type = BindingTypeEnum.DynamicValue;
    this._binding.cache = null;
    this._binding.dynamicValue = func;
    this._binding.implementationType = null;
    return new BindingInWhenOnSyntax(this._binding);
  };
  BindingToSyntax2.prototype.toConstructor = function(constructor) {
    this._binding.type = BindingTypeEnum.Constructor;
    this._binding.implementationType = constructor;
    this._binding.scope = BindingScopeEnum.Singleton;
    return new BindingWhenOnSyntax(this._binding);
  };
  BindingToSyntax2.prototype.toFactory = function(factory) {
    this._binding.type = BindingTypeEnum.Factory;
    this._binding.factory = factory;
    this._binding.scope = BindingScopeEnum.Singleton;
    return new BindingWhenOnSyntax(this._binding);
  };
  BindingToSyntax2.prototype.toFunction = function(func) {
    if (typeof func !== "function") {
      throw new Error(INVALID_FUNCTION_BINDING);
    }
    var bindingWhenOnSyntax = this.toConstantValue(func);
    this._binding.type = BindingTypeEnum.Function;
    this._binding.scope = BindingScopeEnum.Singleton;
    return bindingWhenOnSyntax;
  };
  BindingToSyntax2.prototype.toAutoFactory = function(serviceIdentifier) {
    this._binding.type = BindingTypeEnum.Factory;
    this._binding.factory = function(context) {
      var autofactory = function() {
        return context.container.get(serviceIdentifier);
      };
      return autofactory;
    };
    this._binding.scope = BindingScopeEnum.Singleton;
    return new BindingWhenOnSyntax(this._binding);
  };
  BindingToSyntax2.prototype.toAutoNamedFactory = function(serviceIdentifier) {
    this._binding.type = BindingTypeEnum.Factory;
    this._binding.factory = function(context) {
      return function(named) {
        return context.container.getNamed(serviceIdentifier, named);
      };
    };
    return new BindingWhenOnSyntax(this._binding);
  };
  BindingToSyntax2.prototype.toProvider = function(provider) {
    this._binding.type = BindingTypeEnum.Provider;
    this._binding.provider = provider;
    this._binding.scope = BindingScopeEnum.Singleton;
    return new BindingWhenOnSyntax(this._binding);
  };
  BindingToSyntax2.prototype.toService = function(service) {
    this.toDynamicValue(function(context) {
      return context.container.get(service);
    });
  };
  return BindingToSyntax2;
}();

// node_modules/inversify/es/container/container_snapshot.js
var ContainerSnapshot = function() {
  function ContainerSnapshot2() {
  }
  ContainerSnapshot2.of = function(bindings, middleware, activations, deactivations, moduleActivationStore) {
    var snapshot = new ContainerSnapshot2;
    snapshot.bindings = bindings;
    snapshot.middleware = middleware;
    snapshot.deactivations = deactivations;
    snapshot.activations = activations;
    snapshot.moduleActivationStore = moduleActivationStore;
    return snapshot;
  };
  return ContainerSnapshot2;
}();

// node_modules/inversify/es/utils/clonable.js
function isClonable(obj) {
  return typeof obj === "object" && obj !== null && "clone" in obj && typeof obj.clone === "function";
}

// node_modules/inversify/es/container/lookup.js
var Lookup = function() {
  function Lookup2() {
    this._map = new Map;
  }
  Lookup2.prototype.getMap = function() {
    return this._map;
  };
  Lookup2.prototype.add = function(serviceIdentifier, value) {
    if (serviceIdentifier === null || serviceIdentifier === undefined) {
      throw new Error(NULL_ARGUMENT);
    }
    if (value === null || value === undefined) {
      throw new Error(NULL_ARGUMENT);
    }
    var entry = this._map.get(serviceIdentifier);
    if (entry !== undefined) {
      entry.push(value);
    } else {
      this._map.set(serviceIdentifier, [value]);
    }
  };
  Lookup2.prototype.get = function(serviceIdentifier) {
    if (serviceIdentifier === null || serviceIdentifier === undefined) {
      throw new Error(NULL_ARGUMENT);
    }
    var entry = this._map.get(serviceIdentifier);
    if (entry !== undefined) {
      return entry;
    } else {
      throw new Error(KEY_NOT_FOUND);
    }
  };
  Lookup2.prototype.remove = function(serviceIdentifier) {
    if (serviceIdentifier === null || serviceIdentifier === undefined) {
      throw new Error(NULL_ARGUMENT);
    }
    if (!this._map.delete(serviceIdentifier)) {
      throw new Error(KEY_NOT_FOUND);
    }
  };
  Lookup2.prototype.removeIntersection = function(lookup) {
    var _this = this;
    this.traverse(function(serviceIdentifier, value) {
      var lookupActivations = lookup.hasKey(serviceIdentifier) ? lookup.get(serviceIdentifier) : undefined;
      if (lookupActivations !== undefined) {
        var filteredValues = value.filter(function(lookupValue) {
          return !lookupActivations.some(function(moduleActivation) {
            return lookupValue === moduleActivation;
          });
        });
        _this._setValue(serviceIdentifier, filteredValues);
      }
    });
  };
  Lookup2.prototype.removeByCondition = function(condition) {
    var _this = this;
    var removals = [];
    this._map.forEach(function(entries, key) {
      var updatedEntries = [];
      for (var _i = 0, entries_1 = entries;_i < entries_1.length; _i++) {
        var entry = entries_1[_i];
        var remove = condition(entry);
        if (remove) {
          removals.push(entry);
        } else {
          updatedEntries.push(entry);
        }
      }
      _this._setValue(key, updatedEntries);
    });
    return removals;
  };
  Lookup2.prototype.hasKey = function(serviceIdentifier) {
    if (serviceIdentifier === null || serviceIdentifier === undefined) {
      throw new Error(NULL_ARGUMENT);
    }
    return this._map.has(serviceIdentifier);
  };
  Lookup2.prototype.clone = function() {
    var copy = new Lookup2;
    this._map.forEach(function(value, key) {
      value.forEach(function(b) {
        return copy.add(key, isClonable(b) ? b.clone() : b);
      });
    });
    return copy;
  };
  Lookup2.prototype.traverse = function(func) {
    this._map.forEach(function(value, key) {
      func(key, value);
    });
  };
  Lookup2.prototype._setValue = function(serviceIdentifier, value) {
    if (value.length > 0) {
      this._map.set(serviceIdentifier, value);
    } else {
      this._map.delete(serviceIdentifier);
    }
  };
  return Lookup2;
}();

// node_modules/inversify/es/container/module_activation_store.js
var ModuleActivationStore = function() {
  function ModuleActivationStore2() {
    this._map = new Map;
  }
  ModuleActivationStore2.prototype.remove = function(moduleId) {
    if (this._map.has(moduleId)) {
      var handlers = this._map.get(moduleId);
      this._map.delete(moduleId);
      return handlers;
    }
    return this._getEmptyHandlersStore();
  };
  ModuleActivationStore2.prototype.addDeactivation = function(moduleId, serviceIdentifier, onDeactivation) {
    this._getModuleActivationHandlers(moduleId).onDeactivations.add(serviceIdentifier, onDeactivation);
  };
  ModuleActivationStore2.prototype.addActivation = function(moduleId, serviceIdentifier, onActivation) {
    this._getModuleActivationHandlers(moduleId).onActivations.add(serviceIdentifier, onActivation);
  };
  ModuleActivationStore2.prototype.clone = function() {
    var clone = new ModuleActivationStore2;
    this._map.forEach(function(handlersStore, moduleId) {
      clone._map.set(moduleId, {
        onActivations: handlersStore.onActivations.clone(),
        onDeactivations: handlersStore.onDeactivations.clone()
      });
    });
    return clone;
  };
  ModuleActivationStore2.prototype._getModuleActivationHandlers = function(moduleId) {
    var moduleActivationHandlers = this._map.get(moduleId);
    if (moduleActivationHandlers === undefined) {
      moduleActivationHandlers = this._getEmptyHandlersStore();
      this._map.set(moduleId, moduleActivationHandlers);
    }
    return moduleActivationHandlers;
  };
  ModuleActivationStore2.prototype._getEmptyHandlersStore = function() {
    var handlersStore = {
      onActivations: new Lookup,
      onDeactivations: new Lookup
    };
    return handlersStore;
  };
  return ModuleActivationStore2;
}();

// node_modules/inversify/es/container/container.js
var __assign2 = function() {
  __assign2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length;i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
var __awaiter4 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator4 = function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : undefined, done: true };
  }
};
var __spreadArray3 = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar;i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var Container = function() {
  function Container2(containerOptions) {
    var options = containerOptions || {};
    if (typeof options !== "object") {
      throw new Error("".concat(CONTAINER_OPTIONS_MUST_BE_AN_OBJECT));
    }
    if (options.defaultScope === undefined) {
      options.defaultScope = BindingScopeEnum.Transient;
    } else if (options.defaultScope !== BindingScopeEnum.Singleton && options.defaultScope !== BindingScopeEnum.Transient && options.defaultScope !== BindingScopeEnum.Request) {
      throw new Error("".concat(CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE));
    }
    if (options.autoBindInjectable === undefined) {
      options.autoBindInjectable = false;
    } else if (typeof options.autoBindInjectable !== "boolean") {
      throw new Error("".concat(CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE));
    }
    if (options.skipBaseClassChecks === undefined) {
      options.skipBaseClassChecks = false;
    } else if (typeof options.skipBaseClassChecks !== "boolean") {
      throw new Error("".concat(CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK));
    }
    this.options = {
      autoBindInjectable: options.autoBindInjectable,
      defaultScope: options.defaultScope,
      skipBaseClassChecks: options.skipBaseClassChecks
    };
    this.id = id();
    this._bindingDictionary = new Lookup;
    this._snapshots = [];
    this._middleware = null;
    this._activations = new Lookup;
    this._deactivations = new Lookup;
    this.parent = null;
    this._metadataReader = new MetadataReader;
    this._moduleActivationStore = new ModuleActivationStore;
  }
  Container2.merge = function(container1, container2) {
    var containers = [];
    for (var _i = 2;_i < arguments.length; _i++) {
      containers[_i - 2] = arguments[_i];
    }
    var container = new Container2;
    var targetContainers = __spreadArray3([container1, container2], containers, true).map(function(targetContainer) {
      return getBindingDictionary(targetContainer);
    });
    var bindingDictionary = getBindingDictionary(container);
    function copyDictionary(origin, destination) {
      origin.traverse(function(_key, value) {
        value.forEach(function(binding) {
          destination.add(binding.serviceIdentifier, binding.clone());
        });
      });
    }
    targetContainers.forEach(function(targetBindingDictionary) {
      copyDictionary(targetBindingDictionary, bindingDictionary);
    });
    return container;
  };
  Container2.prototype.load = function() {
    var modules = [];
    for (var _i = 0;_i < arguments.length; _i++) {
      modules[_i] = arguments[_i];
    }
    var getHelpers = this._getContainerModuleHelpersFactory();
    for (var _a = 0, modules_1 = modules;_a < modules_1.length; _a++) {
      var currentModule = modules_1[_a];
      var containerModuleHelpers = getHelpers(currentModule.id);
      currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction, containerModuleHelpers.unbindAsyncFunction, containerModuleHelpers.onActivationFunction, containerModuleHelpers.onDeactivationFunction);
    }
  };
  Container2.prototype.loadAsync = function() {
    var modules = [];
    for (var _i = 0;_i < arguments.length; _i++) {
      modules[_i] = arguments[_i];
    }
    return __awaiter4(this, undefined, undefined, function() {
      var getHelpers, _a, modules_2, currentModule, containerModuleHelpers;
      return __generator4(this, function(_b) {
        switch (_b.label) {
          case 0:
            getHelpers = this._getContainerModuleHelpersFactory();
            _a = 0, modules_2 = modules;
            _b.label = 1;
          case 1:
            if (!(_a < modules_2.length))
              return [3, 4];
            currentModule = modules_2[_a];
            containerModuleHelpers = getHelpers(currentModule.id);
            return [4, currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction, containerModuleHelpers.unbindAsyncFunction, containerModuleHelpers.onActivationFunction, containerModuleHelpers.onDeactivationFunction)];
          case 2:
            _b.sent();
            _b.label = 3;
          case 3:
            _a++;
            return [3, 1];
          case 4:
            return [2];
        }
      });
    });
  };
  Container2.prototype.unload = function() {
    var _this = this;
    var modules = [];
    for (var _i = 0;_i < arguments.length; _i++) {
      modules[_i] = arguments[_i];
    }
    modules.forEach(function(module) {
      var deactivations = _this._removeModuleBindings(module.id);
      _this._deactivateSingletons(deactivations);
      _this._removeModuleHandlers(module.id);
    });
  };
  Container2.prototype.unloadAsync = function() {
    var modules = [];
    for (var _i = 0;_i < arguments.length; _i++) {
      modules[_i] = arguments[_i];
    }
    return __awaiter4(this, undefined, undefined, function() {
      var _a, modules_3, module_1, deactivations;
      return __generator4(this, function(_b) {
        switch (_b.label) {
          case 0:
            _a = 0, modules_3 = modules;
            _b.label = 1;
          case 1:
            if (!(_a < modules_3.length))
              return [3, 4];
            module_1 = modules_3[_a];
            deactivations = this._removeModuleBindings(module_1.id);
            return [4, this._deactivateSingletonsAsync(deactivations)];
          case 2:
            _b.sent();
            this._removeModuleHandlers(module_1.id);
            _b.label = 3;
          case 3:
            _a++;
            return [3, 1];
          case 4:
            return [2];
        }
      });
    });
  };
  Container2.prototype.bind = function(serviceIdentifier) {
    var scope = this.options.defaultScope || BindingScopeEnum.Transient;
    var binding = new Binding(serviceIdentifier, scope);
    this._bindingDictionary.add(serviceIdentifier, binding);
    return new BindingToSyntax(binding);
  };
  Container2.prototype.rebind = function(serviceIdentifier) {
    this.unbind(serviceIdentifier);
    return this.bind(serviceIdentifier);
  };
  Container2.prototype.rebindAsync = function(serviceIdentifier) {
    return __awaiter4(this, undefined, undefined, function() {
      return __generator4(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, this.unbindAsync(serviceIdentifier)];
          case 1:
            _a.sent();
            return [2, this.bind(serviceIdentifier)];
        }
      });
    });
  };
  Container2.prototype.unbind = function(serviceIdentifier) {
    if (this._bindingDictionary.hasKey(serviceIdentifier)) {
      var bindings = this._bindingDictionary.get(serviceIdentifier);
      this._deactivateSingletons(bindings);
    }
    this._removeServiceFromDictionary(serviceIdentifier);
  };
  Container2.prototype.unbindAsync = function(serviceIdentifier) {
    return __awaiter4(this, undefined, undefined, function() {
      var bindings;
      return __generator4(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!this._bindingDictionary.hasKey(serviceIdentifier))
              return [3, 2];
            bindings = this._bindingDictionary.get(serviceIdentifier);
            return [4, this._deactivateSingletonsAsync(bindings)];
          case 1:
            _a.sent();
            _a.label = 2;
          case 2:
            this._removeServiceFromDictionary(serviceIdentifier);
            return [2];
        }
      });
    });
  };
  Container2.prototype.unbindAll = function() {
    var _this = this;
    this._bindingDictionary.traverse(function(_key, value) {
      _this._deactivateSingletons(value);
    });
    this._bindingDictionary = new Lookup;
  };
  Container2.prototype.unbindAllAsync = function() {
    return __awaiter4(this, undefined, undefined, function() {
      var promises;
      var _this = this;
      return __generator4(this, function(_a) {
        switch (_a.label) {
          case 0:
            promises = [];
            this._bindingDictionary.traverse(function(_key, value) {
              promises.push(_this._deactivateSingletonsAsync(value));
            });
            return [4, Promise.all(promises)];
          case 1:
            _a.sent();
            this._bindingDictionary = new Lookup;
            return [2];
        }
      });
    });
  };
  Container2.prototype.onActivation = function(serviceIdentifier, onActivation) {
    this._activations.add(serviceIdentifier, onActivation);
  };
  Container2.prototype.onDeactivation = function(serviceIdentifier, onDeactivation) {
    this._deactivations.add(serviceIdentifier, onDeactivation);
  };
  Container2.prototype.isBound = function(serviceIdentifier) {
    var bound = this._bindingDictionary.hasKey(serviceIdentifier);
    if (!bound && this.parent) {
      bound = this.parent.isBound(serviceIdentifier);
    }
    return bound;
  };
  Container2.prototype.isCurrentBound = function(serviceIdentifier) {
    return this._bindingDictionary.hasKey(serviceIdentifier);
  };
  Container2.prototype.isBoundNamed = function(serviceIdentifier, named) {
    return this.isBoundTagged(serviceIdentifier, NAMED_TAG, named);
  };
  Container2.prototype.isBoundTagged = function(serviceIdentifier, key, value) {
    var bound = false;
    if (this._bindingDictionary.hasKey(serviceIdentifier)) {
      var bindings = this._bindingDictionary.get(serviceIdentifier);
      var request_1 = createMockRequest(this, serviceIdentifier, key, value);
      bound = bindings.some(function(b) {
        return b.constraint(request_1);
      });
    }
    if (!bound && this.parent) {
      bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
    }
    return bound;
  };
  Container2.prototype.snapshot = function() {
    this._snapshots.push(ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware, this._activations.clone(), this._deactivations.clone(), this._moduleActivationStore.clone()));
  };
  Container2.prototype.restore = function() {
    var snapshot = this._snapshots.pop();
    if (snapshot === undefined) {
      throw new Error(NO_MORE_SNAPSHOTS_AVAILABLE);
    }
    this._bindingDictionary = snapshot.bindings;
    this._activations = snapshot.activations;
    this._deactivations = snapshot.deactivations;
    this._middleware = snapshot.middleware;
    this._moduleActivationStore = snapshot.moduleActivationStore;
  };
  Container2.prototype.createChild = function(containerOptions) {
    var child = new Container2(containerOptions || this.options);
    child.parent = this;
    return child;
  };
  Container2.prototype.applyMiddleware = function() {
    var middlewares = [];
    for (var _i = 0;_i < arguments.length; _i++) {
      middlewares[_i] = arguments[_i];
    }
    var initial = this._middleware ? this._middleware : this._planAndResolve();
    this._middleware = middlewares.reduce(function(prev, curr) {
      return curr(prev);
    }, initial);
  };
  Container2.prototype.applyCustomMetadataReader = function(metadataReader) {
    this._metadataReader = metadataReader;
  };
  Container2.prototype.get = function(serviceIdentifier) {
    var getArgs = this._getNotAllArgs(serviceIdentifier, false);
    return this._getButThrowIfAsync(getArgs);
  };
  Container2.prototype.getAsync = function(serviceIdentifier) {
    return __awaiter4(this, undefined, undefined, function() {
      var getArgs;
      return __generator4(this, function(_a) {
        getArgs = this._getNotAllArgs(serviceIdentifier, false);
        return [2, this._get(getArgs)];
      });
    });
  };
  Container2.prototype.getTagged = function(serviceIdentifier, key, value) {
    var getArgs = this._getNotAllArgs(serviceIdentifier, false, key, value);
    return this._getButThrowIfAsync(getArgs);
  };
  Container2.prototype.getTaggedAsync = function(serviceIdentifier, key, value) {
    return __awaiter4(this, undefined, undefined, function() {
      var getArgs;
      return __generator4(this, function(_a) {
        getArgs = this._getNotAllArgs(serviceIdentifier, false, key, value);
        return [2, this._get(getArgs)];
      });
    });
  };
  Container2.prototype.getNamed = function(serviceIdentifier, named) {
    return this.getTagged(serviceIdentifier, NAMED_TAG, named);
  };
  Container2.prototype.getNamedAsync = function(serviceIdentifier, named) {
    return this.getTaggedAsync(serviceIdentifier, NAMED_TAG, named);
  };
  Container2.prototype.getAll = function(serviceIdentifier) {
    var getArgs = this._getAllArgs(serviceIdentifier);
    return this._getButThrowIfAsync(getArgs);
  };
  Container2.prototype.getAllAsync = function(serviceIdentifier) {
    var getArgs = this._getAllArgs(serviceIdentifier);
    return this._getAll(getArgs);
  };
  Container2.prototype.getAllTagged = function(serviceIdentifier, key, value) {
    var getArgs = this._getNotAllArgs(serviceIdentifier, true, key, value);
    return this._getButThrowIfAsync(getArgs);
  };
  Container2.prototype.getAllTaggedAsync = function(serviceIdentifier, key, value) {
    var getArgs = this._getNotAllArgs(serviceIdentifier, true, key, value);
    return this._getAll(getArgs);
  };
  Container2.prototype.getAllNamed = function(serviceIdentifier, named) {
    return this.getAllTagged(serviceIdentifier, NAMED_TAG, named);
  };
  Container2.prototype.getAllNamedAsync = function(serviceIdentifier, named) {
    return this.getAllTaggedAsync(serviceIdentifier, NAMED_TAG, named);
  };
  Container2.prototype.resolve = function(constructorFunction) {
    var isBound = this.isBound(constructorFunction);
    if (!isBound) {
      this.bind(constructorFunction).toSelf();
    }
    var resolved = this.get(constructorFunction);
    if (!isBound) {
      this.unbind(constructorFunction);
    }
    return resolved;
  };
  Container2.prototype._preDestroy = function(constructor, instance) {
    var _a, _b;
    if (Reflect.hasMetadata(PRE_DESTROY, constructor)) {
      var data = Reflect.getMetadata(PRE_DESTROY, constructor);
      return (_b = (_a = instance)[data.value]) === null || _b === undefined ? undefined : _b.call(_a);
    }
  };
  Container2.prototype._removeModuleHandlers = function(moduleId) {
    var moduleActivationsHandlers = this._moduleActivationStore.remove(moduleId);
    this._activations.removeIntersection(moduleActivationsHandlers.onActivations);
    this._deactivations.removeIntersection(moduleActivationsHandlers.onDeactivations);
  };
  Container2.prototype._removeModuleBindings = function(moduleId) {
    return this._bindingDictionary.removeByCondition(function(binding) {
      return binding.moduleId === moduleId;
    });
  };
  Container2.prototype._deactivate = function(binding, instance) {
    var _this = this;
    var constructor = Object.getPrototypeOf(instance).constructor;
    try {
      if (this._deactivations.hasKey(binding.serviceIdentifier)) {
        var result = this._deactivateContainer(instance, this._deactivations.get(binding.serviceIdentifier).values());
        if (isPromise(result)) {
          return this._handleDeactivationError(result.then(function() {
            return _this._propagateContainerDeactivationThenBindingAndPreDestroyAsync(binding, instance, constructor);
          }), constructor);
        }
      }
      var propagateDeactivationResult = this._propagateContainerDeactivationThenBindingAndPreDestroy(binding, instance, constructor);
      if (isPromise(propagateDeactivationResult)) {
        return this._handleDeactivationError(propagateDeactivationResult, constructor);
      }
    } catch (ex) {
      if (ex instanceof Error) {
        throw new Error(ON_DEACTIVATION_ERROR(constructor.name, ex.message));
      }
    }
  };
  Container2.prototype._handleDeactivationError = function(asyncResult, constructor) {
    return __awaiter4(this, undefined, undefined, function() {
      var ex_1;
      return __generator4(this, function(_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4, asyncResult];
          case 1:
            _a.sent();
            return [3, 3];
          case 2:
            ex_1 = _a.sent();
            if (ex_1 instanceof Error) {
              throw new Error(ON_DEACTIVATION_ERROR(constructor.name, ex_1.message));
            }
            return [3, 3];
          case 3:
            return [2];
        }
      });
    });
  };
  Container2.prototype._deactivateContainer = function(instance, deactivationsIterator) {
    var _this = this;
    var deactivation = deactivationsIterator.next();
    while (deactivation.value) {
      var result = deactivation.value(instance);
      if (isPromise(result)) {
        return result.then(function() {
          return _this._deactivateContainerAsync(instance, deactivationsIterator);
        });
      }
      deactivation = deactivationsIterator.next();
    }
  };
  Container2.prototype._deactivateContainerAsync = function(instance, deactivationsIterator) {
    return __awaiter4(this, undefined, undefined, function() {
      var deactivation;
      return __generator4(this, function(_a) {
        switch (_a.label) {
          case 0:
            deactivation = deactivationsIterator.next();
            _a.label = 1;
          case 1:
            if (!deactivation.value)
              return [3, 3];
            return [4, deactivation.value(instance)];
          case 2:
            _a.sent();
            deactivation = deactivationsIterator.next();
            return [3, 1];
          case 3:
            return [2];
        }
      });
    });
  };
  Container2.prototype._getContainerModuleHelpersFactory = function() {
    var _this = this;
    var setModuleId = function(bindingToSyntax, moduleId) {
      bindingToSyntax._binding.moduleId = moduleId;
    };
    var getBindFunction = function(moduleId) {
      return function(serviceIdentifier) {
        var bindingToSyntax = _this.bind(serviceIdentifier);
        setModuleId(bindingToSyntax, moduleId);
        return bindingToSyntax;
      };
    };
    var getUnbindFunction = function() {
      return function(serviceIdentifier) {
        return _this.unbind(serviceIdentifier);
      };
    };
    var getUnbindAsyncFunction = function() {
      return function(serviceIdentifier) {
        return _this.unbindAsync(serviceIdentifier);
      };
    };
    var getIsboundFunction = function() {
      return function(serviceIdentifier) {
        return _this.isBound(serviceIdentifier);
      };
    };
    var getRebindFunction = function(moduleId) {
      return function(serviceIdentifier) {
        var bindingToSyntax = _this.rebind(serviceIdentifier);
        setModuleId(bindingToSyntax, moduleId);
        return bindingToSyntax;
      };
    };
    var getOnActivationFunction = function(moduleId) {
      return function(serviceIdentifier, onActivation) {
        _this._moduleActivationStore.addActivation(moduleId, serviceIdentifier, onActivation);
        _this.onActivation(serviceIdentifier, onActivation);
      };
    };
    var getOnDeactivationFunction = function(moduleId) {
      return function(serviceIdentifier, onDeactivation) {
        _this._moduleActivationStore.addDeactivation(moduleId, serviceIdentifier, onDeactivation);
        _this.onDeactivation(serviceIdentifier, onDeactivation);
      };
    };
    return function(mId) {
      return {
        bindFunction: getBindFunction(mId),
        isboundFunction: getIsboundFunction(),
        onActivationFunction: getOnActivationFunction(mId),
        onDeactivationFunction: getOnDeactivationFunction(mId),
        rebindFunction: getRebindFunction(mId),
        unbindFunction: getUnbindFunction(),
        unbindAsyncFunction: getUnbindAsyncFunction()
      };
    };
  };
  Container2.prototype._getAll = function(getArgs) {
    return Promise.all(this._get(getArgs));
  };
  Container2.prototype._get = function(getArgs) {
    var planAndResolveArgs = __assign2(__assign2({}, getArgs), { contextInterceptor: function(context) {
      return context;
    }, targetType: TargetTypeEnum.Variable });
    if (this._middleware) {
      var middlewareResult = this._middleware(planAndResolveArgs);
      if (middlewareResult === undefined || middlewareResult === null) {
        throw new Error(INVALID_MIDDLEWARE_RETURN);
      }
      return middlewareResult;
    }
    return this._planAndResolve()(planAndResolveArgs);
  };
  Container2.prototype._getButThrowIfAsync = function(getArgs) {
    var result = this._get(getArgs);
    if (isPromiseOrContainsPromise(result)) {
      throw new Error(LAZY_IN_SYNC(getArgs.serviceIdentifier));
    }
    return result;
  };
  Container2.prototype._getAllArgs = function(serviceIdentifier) {
    var getAllArgs = {
      avoidConstraints: true,
      isMultiInject: true,
      serviceIdentifier
    };
    return getAllArgs;
  };
  Container2.prototype._getNotAllArgs = function(serviceIdentifier, isMultiInject, key, value) {
    var getNotAllArgs = {
      avoidConstraints: false,
      isMultiInject,
      serviceIdentifier,
      key,
      value
    };
    return getNotAllArgs;
  };
  Container2.prototype._planAndResolve = function() {
    var _this = this;
    return function(args) {
      var context = plan(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
      context = args.contextInterceptor(context);
      var result = resolve(context);
      return result;
    };
  };
  Container2.prototype._deactivateIfSingleton = function(binding) {
    var _this = this;
    if (!binding.activated) {
      return;
    }
    if (isPromise(binding.cache)) {
      return binding.cache.then(function(resolved) {
        return _this._deactivate(binding, resolved);
      });
    }
    return this._deactivate(binding, binding.cache);
  };
  Container2.prototype._deactivateSingletons = function(bindings) {
    for (var _i = 0, bindings_1 = bindings;_i < bindings_1.length; _i++) {
      var binding = bindings_1[_i];
      var result = this._deactivateIfSingleton(binding);
      if (isPromise(result)) {
        throw new Error(ASYNC_UNBIND_REQUIRED);
      }
    }
  };
  Container2.prototype._deactivateSingletonsAsync = function(bindings) {
    return __awaiter4(this, undefined, undefined, function() {
      var _this = this;
      return __generator4(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, Promise.all(bindings.map(function(b) {
              return _this._deactivateIfSingleton(b);
            }))];
          case 1:
            _a.sent();
            return [2];
        }
      });
    });
  };
  Container2.prototype._propagateContainerDeactivationThenBindingAndPreDestroy = function(binding, instance, constructor) {
    if (this.parent) {
      return this._deactivate.bind(this.parent)(binding, instance);
    } else {
      return this._bindingDeactivationAndPreDestroy(binding, instance, constructor);
    }
  };
  Container2.prototype._propagateContainerDeactivationThenBindingAndPreDestroyAsync = function(binding, instance, constructor) {
    return __awaiter4(this, undefined, undefined, function() {
      return __generator4(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!this.parent)
              return [3, 2];
            return [4, this._deactivate.bind(this.parent)(binding, instance)];
          case 1:
            _a.sent();
            return [3, 4];
          case 2:
            return [4, this._bindingDeactivationAndPreDestroyAsync(binding, instance, constructor)];
          case 3:
            _a.sent();
            _a.label = 4;
          case 4:
            return [2];
        }
      });
    });
  };
  Container2.prototype._removeServiceFromDictionary = function(serviceIdentifier) {
    try {
      this._bindingDictionary.remove(serviceIdentifier);
    } catch (e) {
      throw new Error("".concat(CANNOT_UNBIND, " ").concat(getServiceIdentifierAsString(serviceIdentifier)));
    }
  };
  Container2.prototype._bindingDeactivationAndPreDestroy = function(binding, instance, constructor) {
    var _this = this;
    if (typeof binding.onDeactivation === "function") {
      var result = binding.onDeactivation(instance);
      if (isPromise(result)) {
        return result.then(function() {
          return _this._preDestroy(constructor, instance);
        });
      }
    }
    return this._preDestroy(constructor, instance);
  };
  Container2.prototype._bindingDeactivationAndPreDestroyAsync = function(binding, instance, constructor) {
    return __awaiter4(this, undefined, undefined, function() {
      return __generator4(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!(typeof binding.onDeactivation === "function"))
              return [3, 2];
            return [4, binding.onDeactivation(instance)];
          case 1:
            _a.sent();
            _a.label = 2;
          case 2:
            return [4, this._preDestroy(constructor, instance)];
          case 3:
            _a.sent();
            return [2];
        }
      });
    });
  };
  return Container2;
}();
// node_modules/inversify/es/annotation/injectable.js
function injectable() {
  return function(target) {
    if (Reflect.hasOwnMetadata(PARAM_TYPES, target)) {
      throw new Error(DUPLICATED_INJECTABLE_DECORATOR);
    }
    var types = Reflect.getMetadata(DESIGN_PARAM_TYPES, target) || [];
    Reflect.defineMetadata(PARAM_TYPES, types, target);
    return target;
  };
}
// src/core/infrastructure/container.ts
var import_reflect_metadata3 = __toESM(require_Reflect(), 1);
var container = new Container({ defaultScope: "Singleton" });

// src/core/decorators/scopes.ts
function Singleton() {
  return function(target) {
    injectable()(target);
    container.bind(target).toSelf().inSingletonScope();
  };
}
function Transient() {
  return function(target) {
    injectable()(target);
    container.bind(target).toSelf().inTransientScope();
  };
}
function Scoped() {
  return function(target) {
    injectable()(target);
    container.bind(target).toSelf().inRequestScope();
  };
}
// src/core/infrastructure/server.ts
async function createServer(server, config) {
  const { controllers, middlewares = [], port } = config;
  controllers.forEach((ControllerClass) => {
    const controllerInstance = new ControllerClass;
    const path = Reflect.getMetadata("controller:path", ControllerClass);
    const actions = Reflect.getMetadata("controller:actions", ControllerClass.prototype) || [];
    actions.forEach(({ route, propertyKey }) => {
      const actionHandler = controllerInstance[propertyKey];
      server({
        port,
        fetch: async (req) => {
          if (req.url === `${path}${route}`) {
            let response = await actionHandler(req);
            for (const middleware of middlewares) {
              response = await middleware.execute(req, async () => response);
            }
            return response;
          }
          return new Response("Not Found", { status: 404 });
        }
      });
    });
  });
}
export {
  createServer,
  container,
  Transient,
  Singleton,
  Scoped,
  Controller,
  Action
};
