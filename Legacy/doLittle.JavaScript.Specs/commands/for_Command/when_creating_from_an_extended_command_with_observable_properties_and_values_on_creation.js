﻿describe("when creating from an extended command with properties and values on creation", function () {
    var commandAppliedTo = null;
    var command = null;

    var parameters = {
        commandCoordinator: {
        },
        commandValidationService: {
            applyRulesTo: function (command) {
                commandAppliedTo = command
            },
            validateSilently: sinon.stub()
        },
        commandSecurityService: {
            getContextFor: function () {
                return {
                    continueWith: function () { }
                };
            }
        },
        options: {
            properties: {
                integer: 5,
                number: 5.3,
                string: "hello",
                arrayOfIntegers: [1, 2, 3]
            }
        },
        region: {
            commands: []
        },
        mapper: {}
    }

    var commandType = Dolittle.commands.Command.extend(function () {
        this.integer = ko.observable(0);
        this.number = ko.observable(0.1);
        this.string = ko.observable("");
        this.arrayOfIntegers = [];

        this.onCreated = function () {
        };

        this.onDispose = function () {
        };
    });

    var hasChangesExtender;
    beforeEach(function () {
        hasChangesExtender = ko.extenders.hasChanges;
        ko.extenders.hasChanges = function (target, options) {
            target.hasChanges = ko.observable(true);
        };

        command = commandType.create(parameters);
    });

    afterEach(function () {
        ko.extenders.hasChanges = hasChangesExtender;
    });
    

    it("should make the integer property as an observable", function () {
        expect(ko.isObservable(command.integer)).toBe(true);
    });

    it("should make the number property as an observable", function () {
        expect(ko.isObservable(command.number)).toBe(true);
    });

    it("should make the string property as an observable", function () {
        expect(ko.isObservable(command.string)).toBe(true);
    });

    it("should make the array property as an observable", function () {
        expect(ko.isObservable(command.arrayOfIntegers)).toBe(true);
    });

    it("should initialize the integer", function () {
        expect(command.integer()).toBe(parameters.options.properties.integer);
    });

    it("should initialize the number", function () {
        expect(command.number()).toBe(parameters.options.properties.number);
    });

    it("should initialize the string", function () {
        expect(command.string()).toBe(parameters.options.properties.string);
    });

    it("should initialize the array", function () {
        expect(command.arrayOfIntegers()).toBe(parameters.options.properties.arrayOfIntegers);
    });

    it("should extend integer property with has changes", function () {
        expect(ko.isObservable(command.integer.hasChanges)).toBe(true);
    });

    it("should extend number property with has changes", function () {
        expect(ko.isObservable(command.number.hasChanges)).toBe(true);
    });

    it("should extend string property with has changes", function () {
        expect(ko.isObservable(command.string.hasChanges)).toBe(true);
    });

    it("should extend array property with has changes", function () {
        expect(ko.isObservable(command.arrayOfIntegers.hasChanges)).toBe(true);
    });
});