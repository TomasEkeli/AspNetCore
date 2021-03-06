﻿describe("when not specifying max", function () {
    var exception = null;
    try {
        var validator = Dolittle.validation.range.create({ options: { min: 5 } });
        validator.validate("1234");
    } catch (e) {
        exception = e;
    }

    it("should throw an exception", function () {
        expect(exception instanceof Dolittle.validation.MaxNotSpecified).toBe(true);
    });
});