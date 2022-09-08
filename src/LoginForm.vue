<template>
    <form
        class="form"
        :action="Action"
        :method="Method"
        @keypress.enter="submit"
    >
        <input type="hidden" :value="CsrfToken" name="_csrf_token" />
        <input type="hidden" :value="TargetPath" name="_target_path" />
        <div class="field">
            <div class="input">
                <i class="icon fa-solid fa-user"></i>
                <input
                    type="text"
                    id="username"
                    name="_username"
                    :placeholder="UserNamePlaceholder"
                    v-model="UserName"
                />
            </div>
        </div>
        <div class="field">
            <div class="input">
                <i class="icon fa-solid fa-lock"></i>
                <input
                    type="password"
                    id="password"
                    name="_password"
                    :placeholder="PasswordPlaceholder"
                    v-model="Password"
                />
            </div>
        </div>
        <div v-if="RememberMe" class="field">
            <div class="checkbox">
                <input
                    type="checkbox"
                    id="remember_me"
                    name="_remember_me"
                    tabindex="0"
                    v-model="RememberMeValue"
                />
                <label>{{ RememberLabel }}</label>
            </div>
        </div>
        <button v-if="Action !== null" class="button" type="submit">
            {{ LoginButtonLabel }}
        </button>
        <button v-else class="button" type="button" @click="submit">
            {{ LoginButtonLabel }}
        </button>
    </form>
</template>

<script>
export default {
    name: "LoginForm",
    props: {
        CsrfToken: {
            type: String,
            default: "",
        },
        /**
         * Адрес страницы, с которой произошло перенаправление на лгин
         */
        TargetPath: {
            type: String,
            default: "",
        },

        // флаг указывающий на то, что будет задействан action в form
        Action: {
            type: String,
            default: null,
        },
        Method: {
            type: String,
            default: "POST",
        },
        UserNamePlaceholder: {
            type: String,
            default: "Enter login",
        },
        PasswordPlaceholder: {
            type: String,
            default: "Enter password",
        },
        SubmitUrl: {
            type: String,
            default: "",
        },
        LastUserName: {
            type: String,
            default: "",
        },
        RememberLabel: {
            type: String,
            default: "Remember me",
        },
        LoginButtonLabel: {
            type: String,
            default: "Login",
        },
        RememberMe: {
            type: Boolean,
            default: false,
        },
    },
    data: function () {
        return {
            UserName: this.LastUserName,
            Password: "",
            RememberMeValue: false,
        };
    },
    methods: {
        submit(EventData) {
            this.$emit("submit-form", {
                _username: this.UserName,
                _password: this.Password,
                _remember_me: this.RememberMeValue,
                _csrf_token: this.CsrfToken,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
form {
    --form-font-size: 1em;
    --input-text-font-size: calc(var(--form-font-size) * 1.15);

    font-size: var(--form-font-size);

    > * {
        margin: 0 auto var(--form-font-size) auto;
    }

    .button {
        // font-family: sans-serif;
        font-size: var(--form-font-size);
        line-height: var(--form-font-size);
        margin: 0;
        padding: calc(var(--form-font-size) / 4);
    }

    .field {
        position: relative;
        width: 100%;

        .input {
            --input-top-padding: calc(
                var(--input-text-font-size) / 2
            ); /* 0.5em; */
            --input-bottom-padding: calc(
                var(--input-text-font-size) / 2
            ); /* 0.5em; */
            --input-left-padding: calc(
                var(--input-text-font-size) * 2
            ); /* 2em; */
            --input-right-padding: calc(var(--input-text-font-size)); /* 1em; */

            display: flex;
            height: calc(var(--input-text-font-size) * 2);

            font-size: var(--input-text-font-size);

            input[type="text"],
            input[type="password"],
            input[type="number"] {
                width: 100%;
                height: 100%;
                box-sizing: border-box;

                padding-top: var(--input-top-padding) !important;
                padding-bottom: var(--input-bottom-padding) !important;
                padding-left: var(--input-left-padding) !important;
                padding-right: var(--input-right-padding) !important;

                margin: 0;
                outline: 0;
                appearance: none;
                line-height: 0; /* calc(var(--input-text-font-size) * 2); */
                font-size: var(--input-text-font-size);
                background: #fff;
                border: 1px solid rgba(34, 36, 38, 0.15);
                color: rgba(0, 0, 0, 0.87);
                border-radius: calc(var(--input-text-font-size) / 10);
                box-shadow: 0 0 0 0 transparent inset;
                transition: color 0.1s ease, border-color 0.1s ease;
            }
            input[type="text"]:focus,
            input[type="password"]:focus,
            input[type="number"]:focus {
                box-shadow: 0 0 0 100px ivory inset !important;
                border-color: #d5c315 !important;
            }
        }

        .checkbox {
            position: relative;
            display: inline-block;
            backface-visibility: hidden;
            outline: 0;
            vertical-align: baseline;
            font-style: normal;
            min-height: var(--form-font-size);
            font-size: var(--form-font-size);
            /* line-height: 17px; */
            min-width: var(--form-font-size);

            label {
                cursor: auto;
                position: relative;
                display: block;
                padding-left: calc(var(--form-font-size) * 1.5);
                outline: 0;
                font-size: var(--form-font-size);
            }
            label::before {
                /* box-sizing: border-box; */
                position: absolute;
                top: 0;
                left: 0;
                width: var(--form-font-size);
                height: var(--form-font-size);
                content: "";
                background: #fff;
                border-radius: calc(var(--form-font-size) / 5);
                transition: border 0.1s ease, opacity 0.1s ease,
                    transform 0.1s ease, box-shadow 0.1s ease;
                border: 1px solid #d4d4d5;
            }
            input:checked ~ label::after {
                font-family: "Font Awesome 6 Free";

                box-sizing: border-box;
                /* margin-top: calc(var(--form-font-size) * -0.5); */
                /* top: 50%; */

                content: "\f00c"; /* "X"; /* "\f00c"; */
                opacity: 1;

                position: absolute;
                font-size: var(--form-font-size);
                font-weight: bold;
                opacity: 0.5;
                top: 0;
                left: 0;
                width: var(--form-font-size);
                height: var(--form-font-size);
                text-align: center;

                transition: border 0.1s ease, opacity 0.1s ease,
                    transform 0.1s ease, box-shadow 0.1s ease;

                /** 
                    прозрачный бордюр нужен, чтобы выровнять размеры с элементом ::before,
                    у которого грница толщиной 1px
                 */
                border: 1px solid rgba(0, 0, 0, 0);
            }

            input[type="radio"],
            input[type="checkbox"] {
                cursor: pointer;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0 !important;
                outline: 0;
                z-index: 3;
                width: var(--form-font-size);
                height: var(--form-font-size);
            }
        }
    }

    .input .icon {
        cursor: default;
        position: absolute;
        line-height: var(--input-text-font-size);
        text-align: center;
        left: 0;
        margin: 0;
        opacity: 0.5;
        transition: opacity 0.3s ease;

        height: var(--input-text-font-size);
        width: var(--input-text-font-size);

        top: 50%;
        margin-top: calc(var(--input-text-font-size) / -2);
        margin-left: calc(
            (var(--input-left-padding) / 2) - (var(--input-text-font-size) / 2)
        );
    }
}
</style>