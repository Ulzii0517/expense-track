//delgetstei ajillah controller
var uiController = (function () {})();

//sanhuutei ajillah controller
var financeController = (function () {})();

//programiin holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1.oruulah ugugdliig delgetsees olj avna.
    console.log("Delgetsees ugudul avah heseg");
    //2.olj avsn ugugdluudee sanhuugiin controllerm damjuulj tend hadgalna.
    //3.olj avsan ugugdluudee web deeree tohiroh hesegt ni gargana.
    //4.tusviig tootsoolno.
    //5.etssiin uldegdel, tootsoog delgetsd gargana
  };

  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if (KeyboardEvent.keyCode === 13 || UIEvent.which === 13) ctrlAddItem();
  });
})(uiController, financeController);
