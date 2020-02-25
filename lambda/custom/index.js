// (1) モジュールを読み込む
const Alexa = require('ask-sdk-core')
require('date-utils');

function getCurrentDateTime() {
    let dt = new Date();
    let year = dt.toFormat("YYYY");
    let month = dt.toFormat("MM");
    let day = dt.toFormat("DD");
    let hour = dt.toFormat("HH24");
    let minutes = dt.toFormat("MI");
    let seconds = dt.toFormat("SS");
    return {year, month, day, hour, minutes, seconds};
}

// (2) リクエストハンドラーを定義する
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('はい、どうぞ。')
            .reprompt('はい、どうぞ')
            .getResponse();
    },
};

const RecordItemIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type == 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name == 'RecordItemIntent';
    },
    handle(handlerInput) {
        const {year, month, day, hour, minutes, seconds} = getCurrentDateTime();
        const memoContent = handlerInput.requestEnvelope.request.intent.slots.Item.value;
        const speechText = hour + '時' + minutes +'分に' + memoContent + 'とおっしゃいました';
        const cardText = month + '月' + day + '日' + hour + '時' + minutes + '分：' + memoContent;

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('時間メモ', cardText)
            .getResponse();
    },
};

const ReadItemsIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type == 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name == 'ReadItemsIntent';
    },
    handle(handlerInput) {
        const speechText = 'この応答はまだ未完成です';

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    },
};

const DeleteAllItemsIntentHander = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type == 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name == 'DeleteAllItemsIntent';
    },
    handle(handlerInput) {
        const speechText = 'この応答はまだ未完成です';

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello world', speechText)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
            || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
  
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};
  
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};
  
// （3）エラーハンドラーを定義する
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
  
        return handlerInput.responseBuilder
            .speak('うまく聞き取れませんでした。')
            .reprompt('もういちどお願いします。')
            .getResponse();
    },
};
  
// （4）Lambda 関数ハンドラーを定義する
const skillBuilder = Alexa.SkillBuilders.custom();
  
exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        RecordItemIntentHandler,
        ReadItemsIntentHandler,
        DeleteAllItemsIntentHander,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
