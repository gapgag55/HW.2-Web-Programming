/*
 * Code by Sarayut Lawilai 
 * ID: 5988014
 * 
 * Pattern of this programe
 * is Constructor/Prototype Pattern.
 * 
 */

function PlateGenerator() {
  /*
   * All of this codes below are run when PlateGenerator called.
   * Which means constructor().
   */
  this.idFirst = 'unwantednumber';
  this.idTwo = 'unwantedsummation';

  /*
   * Get Unwanted trigger elements.
   */
  this.elementFirst = document.getElementById(this.idFirst);
  this.elementTwo = document.getElementById(this.idTwo);

  /*
   * Two of these are component.
   * They will be appened by another element soon.
   */
  this.left = document.getElementById('left');
  this.right = document.getElementById('right');
}

PlateGenerator.prototype = {
  /*
   * This Function will be called 
   * when Generate Button was clicked.
   */
  cacheDOM: function (){
    /*
     * Get Unwanted trigger elements.
     */
    this.elementFirst = document.getElementById(this.idFirst);
    this.elementTwo = document.getElementById(this.idTwo);

    /*
     * Get every elements of input[type="checkbox"]
     */
    this.unwantInput = document.getElementsByClassName('unwant')
    this.unwantSum = document.getElementsByClassName('unwantsum')
  },
  generateRow: function () {
    /*
     * Draw Unwant Number rows
     */
    this.drawUnwantNumberRow();
    /*
     * Draw Unwant Summantion rows
     */
    this.drawUnwantSumRow();
  },
  drawUnwantNumberRow: function () {
    /*
     * 1. Create a div
     * 2. Add Class to div; <div class="number row"></div>
     */
    var row = document.createElement('div')
    row.className = 'number row';
    
    /*
     * Generate input value [0, 9]
     */
    var item, input;
    for(var i = 0; i < 10; i++) {
      /*
       * Create div and makes it to be col-lg-6 for layouts.
       */
      item  = document.createElement('div');
      item.className = 'col-lg-6';

      /*
       * Add input into div above
       * <input type="checkbox" class="unwant" value="[0,9]" />
       */
      input = document.createElement('input');
      input.type = 'checkbox';
      input.className = 'unwant';
      input.value = i;

      /*
       * WRAP all of them
       * <div>
       *  <input type="checkbox" class="unwant" value="[0,9]" /> [0,9]
       * </div>
       */
      item.appendChild(input);
      item.innerHTML += ' ' + i;

      row.appendChild(item);
    }

    this.elementFirst.appendChild(row);
  },
  drawUnwantSumRow: function() {
    /*
     * 1. Create a div
     * 2. Add Class to div; <div class="number row"></div>
     */
    var row = document.createElement('div')
    row.className = 'number row';
    
    /*
     * Generate input value [0, 9]
     */
    var item, input, button;
    for(var i = 0; i < 10; i++) {
      /*
       * Create div and makes it to be col-lg-6 for layouts.
       */
      item  = document.createElement('div');
      item.className = 'col-lg-6';

      /*
       * Add input into div above
       * <input type="checkbox" class="unwant" value="[0,9]" />
       */
      input = document.createElement('input');  
      input.type = 'checkbox';
      input.className = 'unwantsum';
      input.value = i;

      /*
       * WRAP all of them
       * <div>
       *  <input type="checkbox" class="unwant" value="[0,9]" /> [0,9]
       * </div>
       */
      item.appendChild(input);
      item.innerHTML += ' ' + i;

      row.appendChild(item);
    }

    button = document.createElement('button');
    button.innerHTML = 'Generate';
    button.className = 'btn btn-primary';
    button.onclick = this.generateTable.bind(this);
    this.left.appendChild(button);
    this.elementTwo.appendChild(row);
  },
  generateTable: function () {
    this.cacheDOM();
    
    /*
     * 1. Takes input[type="checkox"] in to array 
     * 2. Get input value which are checked.
     */
    var arrNumbers = this.getValFromInput(Array.from(this.unwantInput))
    var arrInputSum =this.getValFromInput(Array.from(this.unwantSum))

    /* 
     * Generate Array Plate Number
     */
    var arrPlates = [];
    var arrSplit  = [];
    var check = true;
    var number;
    /*
     * Generate Number from [0, 9999]
     */
    for(var i = 0; i < 9999; i++) {
      /*
       * Makes number into array for easy to calulate
       * Eg. 542 -> [5, 4, 2]
       */
      arrSplit = String(i).split("")

      /*
       * Get all Unwanted Number
       */
      for(var j = 0; j < arrNumbers.length; j++) {

        /*
         * Convert Number into String
         */
        number = String(arrNumbers[j]);

        /*
         * Check wheter Unwanted Number not belongs to NumberArray
         * 
         * Eg. [5, 4, 2].includes(2)
         * Result: false 
         * 
         * Because 2 insides array 
         * So, 542 is Unwanted Number
         * 
         */
        if ( arrSplit.includes(number) ) {
          check = false; break;
        }
      }

      /*
       * Assume NumberArray (542) is not Unwanted Number
       * Check again that 542 is Unwanted summation digits.
       * by using this.summation() Helpmer Method
       */
      if (check && !arrInputSum.includes(this.summation(i)) ) {
        arrPlates[arrPlates.length] = i;
      }

      check = true;
    }

    /*
     * DrawTables into DOM
     */
    this.drawTable(arrPlates)
  },
  drawTable: function (numbers) {
     /* 
      * Remove Old Table if exist
      */
    var oldTable = document.getElementById('table-info')
    if (oldTable != null) {
      this.right.removeChild(oldTable)
    }
    
    /*
     * Create Table tag 
     * Assign ID and CLass 
     * <table id="table-info" class="table table-bordered table-responsive"></table>"
     */
    var table = document.createElement('table');
    table.id = 'table-info'
    table.className = 'table table-bordered table-responsive'
    
    /*
     * Declare variables needed.
     * and makes column = 7
     */
    var sizeColumn = 7;
    var tr, td, value;

    for(var i = 0; i < numbers.length / sizeColumn; i++) {
      tr = document.createElement('tr')
      for(var j = 0; j < sizeColumn; j++) {
        /* Get Value of sequential Array by using Formula
         * (row * 5) + column
         */ 
        var value = numbers[i*sizeColumn+j]

        /*
         * If value exist,
         * Create td tag and assign value into them.
         * <td>[value]</td>
         */
        if (value != undefined) {
          td = document.createElement('td')
          td.innerHTML = value 
          tr.appendChild(td)
        }
      }

      table.appendChild(tr)
    } 

    /*
     * Append to Div right side
     */
    this.right.appendChild(table)
  },
  /*
   * FUNCTION HELPERS
   * 1. Summation = calculate value into single-digit
   * 2. getValFromInput = get value from input checked
   */
  summation: function (value) {
    sum = 0;
    while (value) {
        sum += value % 10;
        value = Math.floor(value / 10);
    }
    /*
     * Summation of above is okay
     * but it may occcurs like a 10
     * So, I using recursion to sum them again.
     */ 
    return ( sum > 9 ) ? this.summation(sum) : sum;
  },
  getValFromInput: function (arr) {
    /*
     * 1. Filter Array and get value only checked.
     * 2. Using map() to redeclare them from input to input.value
     * [input, input] -> [1, 2, 3]
     */
    var newArr = arr.filter( function (item) {
      return item.checked
    }).map(function (item) {
      return parseInt(item.value)
    })

    return newArr;
  }
}

/*
 * WHEN BROWSER LOADS SUCCESSFULLY 
 * THEN CALL THE PLATEGENERATOR()
 */
window.onload = function () {
  (new PlateGenerator()).generateRow();
}