/* 参考
    * https://qiita.com/_xAGAx_/items/9bf13b020cb605908cf5
    * https://yukaobu.wordpress.com/2016/10/23/googleform-2/
*/
const questionName = "参加されますか？";

function updateGoogleForm(){

    const answerSheets = SpreadsheetApp.openById("1BhJ057fY31KjNQl5MGEPc5Nn2A3YN-dWg3IDNu1UK9g");
    const answerSheet = answerSheets.getSheetByName("フォームの回答 1");
    const answerSheetLastRow = answerSheet.getLastRow();

    let answers;
    let choiceArray = [];

    if (answerSheetLastRow > 1) {
        const questionNames = answerSheet.getRange(1, 1, 1, answerSheet.getLastColumn()).getValues();
        const colCount = questionNames[0].indexOf(questionName);    
        answers = answerSheet.getRange(2, colCount + 1, answerSheetLastRow - 1).getValues();    
    }
  
    const form = FormApp.getActiveForm();
    const items = form.getItems();


    items.forEach(function(item){

        if (item.getTitle() === questionName) {

            //https://tonari-it.com/gas-form-radio-button-multiple-choice-item/
            var choices = item.asMultipleChoiceItem().getChoices();

            for (i = 0 ; i < choices.length ; i++ ){
                choiceArray.push(choices[i].getValue());
            }

            for (answer of answers) {

                choiceArray.push(answer[0]);
            }

            //https://tonari-it.com/gas-form-checkbox/
            item.asMultipleChoiceItem().setChoiceValues(choiceArray).showOtherOption(true);
        }
    });
}