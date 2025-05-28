//delgetstei ajillah controller
var uiController = (function () {
  //1.html,css class-g uur object hiih
  var DOMStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
  };

  /////// private func////
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        ////////parseInt ni buhel too bolgono utguudiig hoorond nemeh function
        value: parseInt(document.querySelector(DOMStrings.inputValue).value),
      };
    },

    //2.DOMStrings-ee function bolgov
    getDomstrings: function () {
      return DOMStrings;
    },
    //CLEAR HIIH FUNCTION!!! haisan ur dungee tseverleh function
    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMStrings.inputDescription + "," + DOMStrings.inputValue
      );

      //Convert List to Array// garj irsn ur dungee slice hiih
      var fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function (el, index, array) {
        el.value = "";
      });

      //  for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }

      // CURSORoo ehnii 0 dahi array deer avaachih uildel!!! focus ni cursor hna bgaag zaadag function
      fieldsArr[0].focus();
    },

    showBudget: function (budget) {
      document.querySelector(DOMStrings.budgetLabel).textContent =
        budget.budget;
      document.querySelector(DOMStrings.incomeLabel).textContent =
        budget.totalInc;
      document.querySelector(DOMStrings.expenseLabel).textContent =
        budget.totalExp;

      if (budget.percent !== 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent =
          budget.percent + "%";
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent =
          budget.percent;
      }
    },

    ///////orlogo,zarlaga-iig ui deer haruulah
    addListItem: function (item, type) {
      //orlogo zarlagiin elementiig aguulsan html-iig beltgene.
      var html, list;
      if (type === "inc") {
        //html-ees
        list = DOMStrings.incomeList;

        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';
      } else {
        list = DOMStrings.expenseList;

        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //ter html dotroo orlogo zarlagiin utguudiig replace ashiglaj ugnu.
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);
      //beltgesen html ee dom ruu hiij ugnu
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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

  ///////////ORLOGO ZARLAGA-iin tusad ni niilber oloh//////
  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
  };

  //private date
  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },

    budget: 0,

    percent: 0,
  };

  //closure ashiglan public service bolgoj bn/////
  return {
    ///////ORLOGO, ZARLAGA TOOTSOOLOH FUNCTION/////////////////
    calculateBudget: function () {
      calculateTotal("inc");
      calculateTotal("exp");

      //////budget-iig shineer tootsoolno/////
      data.budget = data.totals.inc - data.totals.exp;

      ////////ORLOGO.ZARLAGA-iin huviig tootsoolno/////
      data.percent = Math.round((data.totals.exp / data.totals.inc) * 100);
    },
    getBudget: function () {
      return {
        budget: data.budget,
        percent: data.percent,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },

    ///////////////////////////////////////////
    addItem: function (type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);

      return item;
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

    ////////HOOSON MUR gargaj bgaag boliulah condition(zaaval 2ula hooson bj yu ch garj irehgui)
    if (input.description !== "" && input.value !== "") {
      //2.olj avsn ugugdluudee sanhuugiin controllerm damjuulj tend hadgalna.
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );

      //3.olj avsan ugugdluudee web deeree tohiroh hesegt ni gargana.
      uiController.addListItem(item, input.type);
      uiController.clearFields();

      //4.tusviig tootsoolno.
      financeController.calculateBudget();

      //5.etssiin uldegdel
      var budget = financeController.getBudget();

      //6.tusviin tootsoog delgetsend gargana
      uiController.showBudget(budget);
    }
  };
  ////////////////////////////

  var setupEventListeners = function () {
    //3.DOM public ugugdul bolgon damjuulav
    var DOM = uiController.getDomstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keydown", function () {
      if (event.key === "Enter") {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("App starting...");
      uiController.showBudget({
        budget: 0,
        percent: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
