//delgetstei ajillah controller
var uiController = (function () {
  //1.html,css class-g uur object hiin public bolgoh
  var DOMStrings = {
    inputType: ".add__type",
    inputDiscription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  /////// private func////
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        discription: document.querySelector(DOMStrings.inputDiscription).value,
        value: document.querySelector(DOMStrings.inputValue).value,
      };
    },

    //2.DOMStrings-ee function bolgov
    getDomstrings: function () {
      return DOMStrings;
    },
  };
})();

//sanhuutei ajillah controller
var financeController = (function () {
  //orlogo,zarlaga hadgalah object///private data////
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
  //closure ashiglan public service bolgoj bn/////
  return {
    addItem: function (type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type == "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);
    },

    seeData: function () {
      return data;
    },
  };
})();

//programiin holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1.oruulah ugugdliig delgetsees olj avna.
    var input = uiController.getInput();
    console.log(input);

    //2.olj avsn ugugdluudee sanhuugiin controllerm damjuulj tend hadgalna.
    financeController.addItem(input.type, input.discription, input.value);
    //3.olj avsan ugugdluudee web deeree tohiroh hesegt ni gargana.
    //4.tusviig tootsoolno.
    //5.etssiin uldegdel, tootsoog delgetsd gargana
  };

  var setupEventListeners = function () {
    //3.DOM public ugugdul bolgon damjuulav
    var DOM = uiController.getDomstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (KeyboardEvent.keyCode === 13 || UIEvent.which === 13) ctrlAddItem();
    });
  };

  return {
    init: function () {
      console.log("Starting app...");
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
