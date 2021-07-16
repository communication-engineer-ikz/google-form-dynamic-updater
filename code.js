/* 参考
    * https://qiita.com/_xAGAx_/items/9bf13b020cb605908cf5
    * https://yukaobu.wordpress.com/2016/10/23/googleform-2/
*/
function updateGoogleForm(){

    const answerSheets = SpreadsheetApp.openById("1BhJ057fY31KjNQl5MGEPc5Nn2A3YN-dWg3IDNu1UK9g");
    const answerSheet = answerSheets.getSheetByName("フォームの回答 1");
    const answerSheetLastRow = answerSheet.getLastRow();
    let answers;
    let choiceArray = [];

    const form = FormApp.getActiveForm();
    const items = form.getItems();

    if (answerSheetLastRow > 1) {
        const questionNames = answerSheet.getRange(1, 1, 1, answerSheet.getLastColumn()).getValues();

        for (item of items) {

            choiceArray = [];
            let questionName = item.getTitle();
            let colCount = questionNames[0].indexOf(questionName);    
            answers = answerSheet.getRange(2, colCount + 1, answerSheetLastRow - 1).getValues();    

            for (answer of answers) {

                choiceArray.push(answer[0]);
            }

            if (item.getType() ==  FormApp.ItemType.MULTIPLE_CHOICE) {

              console.log("multipleChoice");

                //https://tonari-it.com/gas-form-radio-button-multiple-choice-item/
                //https://tonari-it.com/gas-form-checkbox/

                item.asMultipleChoiceItem().setChoiceValues(choiceArray).showOtherOption(true);

            } else if (item.getType() == FormApp.ItemType.CHECKBOX) {

              console.log("checkbox");

                // item.asCheckBoxItem().setChoiceValues(choiceArray).showOtherOption(true);
                item.asCheckboxItem().setChoiceValues(choiceArray).showOtherOption(true);

            }

        }
    }
  

    items.forEach(function(item){

        if (item.getTitle() === questionName) {

        }
    });
}