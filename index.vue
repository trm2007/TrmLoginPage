<template>
    <div
        class="login-wrapper"
        :style="
            BackgroundImage
                ? 'background-image: url(' + BackgroundImage + ')'
                : ''
        "
    >
        <div
            class="login-div"
            :style="{
                opacity: FormOpacity,
            }"
        >
            <div class="row">
                <div class="column">
                    <h2 v-if="FormTitle" class="teal header">
                        {{ FormTitle }}
                    </h2>
                    <transition name="fade">
                        <div v-if="MessageVisible" class="negative message">
                            <i
                                class="close fa-solid fa-circle-xmark"
                                @click="closeAttention"
                            ></i>
                            <div class="header">Внимание!</div>
                            <p>{{ CurrentErrorMessage }}</p>
                        </div>
                    </transition>
                    <LoginForm
                        :Action="Action"
                        :Method="Method"
                        :SubmitUrl="SubmitUrl"
                        :UserNamePlaceholder="UserNamePlaceholder"
                        :PasswordPlaceholder="PasswordPlaceholder"
                        :RememberLabel="RememberLabel"
                        :LoginButtonLabel="LoginButtonLabel"
                        :CsrfToken="CsrfToken"
                        :TargetPath="TargetPath"
                        :RememberMe="RememberMe"
                        @submit-form="submitForm"
                    />
                </div>
                <div v-if="FeedbackEmail" class="column">
                    <div class="header">
                        <i class="world fa-solid fa-globe"></i>
                        <div>
                            <a
                                :href="'mailto:' + FeedbackEmail"
                                style="color: #1b1b1b"
                                >{{ FeedbackMessage }}</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// require("semantic-ui-css/semantic.min.css");
// require("font-awesome/css/font-awesome.min.css");
// require("@fortawesome/fontawesome-free/css/fontawesome.min.css");
// require("@fortawesome/fontawesome-free/css/solid.css");
// require("@fortawesome/fontawesome-free/js/solid.js");
// require("@fortawesome/fontawesome-free/js/all.js");
import axios from "axios";
import LoginForm from "./src/LoginForm";

export default {
    name: "LoginWrapper",
    props: {
        /**
         * Токен, генерируемый сервером для единарозового использования,
         * чтобы не предотвратить отправку формы сторонними сайтами при перехвате сессии (cookies)
         */
        CsrfToken: {
            type: String,
            default: "",
        },
        /**
         * Адрес страницы, с которой произошло перенаправление на логин
         */
        TargetPath: {
            type: String,
            default: "",
        },
        /**
         * url, которые будет использован в action в form
         * не используется вместе с SubmitUrl
         */
        Action: {
            type: String,
            default: null,
        },
        /**
         * GET, PUT, POST или другой метод, с помощтю которого отправляются данные
         */
        Method: {
            type: String,
            default: "POST",
        },
        /**
         * если не задан Action, то используется для AJAX-запроса при событии submit-form,
         * которое в этом случае генерируется формой при нажатии кнопки
         */
        SubmitUrl: {
            type: String,
            //required: true,
            default: "",
        },
        /**
         * если задана эта функция, то вызывается перед отправкой AJAX-запроса при событии submit-form
         */
        SubmitCallback: {
            type: Function,
            default: null,
        },
        /**
         * если задана эта функция, то вызывается после удачного AJAX-запроса при событии submit-form
         */
        AjaxResponseCallback: {
            type: Function,
            default: null,
        },
        /*RedirectUrl: {
                type: String,
                //required: true,
                default: ""
        },*/
        /**
         * Заголовок формы
         */
        FormTitle: {
            type: String,
            default: "Авторизация",
        },
        /**
         * прозрачность формы
         */
        FormOpacity: {
            type: [Number, String],
            default: 0.9,
        },
        /**
         * подсказка для имени пользователя
         */
        UserNamePlaceholder: {
            type: String,
            default: "Enter login",
        },
        /**
         * подсказка для пароля
         */
        PasswordPlaceholder: {
            type: String,
            default: "Enter password",
        },
        /**
         * подпись для галочки "Запомнить"
         */
        RememberLabel: {
            type: String,
            default: "Remember...",
        },
        /**
         * ссылка на фоновый рисунок
         */
        BackgroundImage: {
            type: String,
            default: "",
        },
        /**
         * e-mail для обратной связи
         */
        FeedbackEmail: {
            type: String,
            default: "",
        },
        /**
         * Текст сообщения об ошибки, если его нужно показать
         */
        ErrorMessage: {
            type: String,
            default: "",
        },
        /**
         * Подпись для кнопки входа
         */
        LoginButtonLabel: {
            type: String,
            default: "Login",
        },
        /**
         * Подпись для формы обратной связи
         */
        FeedbackMessage: {
            type: String,
            default: "Does anyone have any questions?",
        },
        /**
         * Флаг, показывать или нет поле "Remember Me" на форме,
         * по умолчанию не показывается
         */
        RememberMe: {
            type: Boolean,
            default: false,
        },
    },
    data: function () {
        return {
            /**
             * Сообщение об ошибке, которое будет выводиться,
             * по умолчанию устанавливается в this.ErrorMessage
             */
            CurrentErrorMessage: this.ErrorMessage,
        };
    },
    watch: {
        ErrorMessage: function () {
            this.CurrentErrorMessage = this.ErrorMessage;
        },
    },
    computed: {
        /**
         * Флаг, устанавливается в true,
         * если есть сообщение об ошибке
         */
        MessageVisible() {
            return this.CurrentErrorMessage && this.CurrentErrorMessage.length
                ? true
                : false;
        },
    },
    components: {
        LoginForm,
    },
    methods: {
        closeAttention: function () {
            // this.MessageVisible = false;
            this.CurrentErrorMessage = "";
        },
        submitForm: function (data) {
            if (this.SubmitCallback) {
                this.SubmitCallback(data);
            }
            if (this.SubmitUrl) {
                axios
                    .post(this.SubmitUrl, data)
                    .then((response) => {
                        console.log("AXIOS then: ", response);
                        if (this.AjaxResponseCallback) {
                            this.AjaxResponseCallback(response);
                        }
                    })
                    .catch((error) => {
                        let ErrorMessage = "";
                        if (error instanceof Error) {
                            console.log(
                                "[submitForm] catch ",
                                error.name,
                                error.message
                            );
                            ErrorMessage = error.message;
                        } else if (
                            typeof error === typeof { a: 1 } ||
                            typeof error === typeof [1]
                        ) {
                            let keys = Object.keys(error);
                            console.log("keys: ", keys);

                            for (let key in error) {
                                console.log(`[${key}] => ${error[key]}`);
                                ErrorMessage += error[key];
                            }
                        } else {
                            console.log(error);
                            ErrorMessage = error;
                        }
                        this.CurrentErrorMessage = ErrorMessage;
                    });
            }
        },
    },
};
</script>

<style>
@import "@fortawesome/fontawesome-free/css/all.css";
</style>

<style lang="scss">
// @import "@fortawesome/fontawesome-free/scss/fontawesome.scss";

body {
    margin: 0;
    padding: 0;
}

.icon {
    --icon-size: 1em;

    font-family: "Font Awesome 6 Free";
    font-style: normal;
    font-size: var(--icon-size);
    display: inline;
    width: var(--icon-size);
}
.icon.world::before {
    content: "\f0ac";
}
.icon.user::before {
    content: "\f007";
}
.icon.lock::before {
    content: "\f023";
}
.icon.close::before {
    content: "\f057";
}

a {
    text-decoration: none;
    background-color: transparent;
}

.message {
    position: relative;
    min-height: 1em;
    margin: 1em 0;
    background: #f8f8f9;
    padding: 1em;
    line-height: 1.4em;
    font-size: 1em;

    color: rgba(0, 0, 0, 0.87);
    transition: opacity 0.1s ease, color 0.1s ease, background 0.1s ease,
        box-shadow 0.1s ease;
    border-radius: 4px;
    box-shadow: 0 0 0 1px rgb(34 36 38 / 22%) inset, 0 0 0 0 transparent;
}

.negative {
    background-color: #fff6f6;
    color: #9f3a38;
    box-shadow: 0 0 0 1px #e0b4b4 inset, 0 0 0 0 transparent;
}

.message .header {
    display: block;
    font-weight: 700;
    margin: 0;
}

.message .header + p {
    margin-top: 0.25em;
}
.message p:last-child {
    margin-bottom: 0;
}

.message > .close {
    --close-icon-font-siz: 1.25em;

    border: 0;
    padding: 0;
    margin: 0;

    box-sizing: border-box;
    font-size: var(--close-icon-font-siz);
    width: var(--close-icon-font-siz);
    height: var(--close-icon-font-siz);

    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0.7;
    transition: opacity 0.1s ease;

    &::before {
        font-size: var(--close-icon-font-siz);

        position: absolute;
        top: -50%;
        right: -50%;
    }
}

.login-wrapper {
    height: 100%;
    width: 100%;
    position: fixed;
    background: url("./images/default.jpg") no-repeat center center fixed;
    background-size: cover;
    text-align: center;
    overflow: auto;
}

.login-div {
    top: 15vh;
    position: relative;
    background-color: rgb(255, 255, 255);
    display: inline-block;
    border-radius: 4px;
    padding: 16px;
    font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;

    max-width: 34em;
    box-sizing: border-box;
}

.header {
    margin: 0 0 0.75em 0;
    a {
        font-size: 1.15em;
    }
    .world {
        font-size: 3em;
    }
}

.row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.column {
    width: 50%;
    // flex: 1 1;
    flex-grow: 1;
    flex-direction: column;
    vertical-align: middle;
    align-self: center !important;
}

@media only screen and (max-width: 759px) {
    .login-div {
        margin: 8px;
    }

    .column:not(:last-child) {
        width: 100%;
        margin-bottom: 16px;
    }
}

.teal {
    color: #00b5ad !important;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
</style>
