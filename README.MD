# LoginWrapper

## Обновление

06.09.2022 отключена библиотека semantic-ui-css.
Теперь на странице используются собственные стили.

<!-- В этом компоненте на 31.08.2022 используется css-библиотека - semantic-ui-css
Послденее её обновление (по данным npmjs.com) произошло 4 года назад.
При ее установке возникает конфликт версий webpack из зависимости semantic-ui-css и нашим текущим.
От этой библиотеки нужно избавиться, и переделать все стили. -->

## Описание

Компонент LoginWrapper (на VUE 2.6.11) реализует страницу login выполнен в виде отдельной страницы.

## Подключение

В js-файле:

```javascript
import Vue from 'vue';
import LoginWrapper from '../components/LoginPage';

/**
здесь возможна настойка параметров 
LoginWrapper.props.ХХХ.default = ...;
*/

Vue.component("login-wrapper", LoginWrapper);

new Vue({el: '#login-div'}); //
```

Далее, в html-фале нужно вставить следующий код:

```html
<div id="login-div">
  <login-wrapper  
    user-name-placeholder="{{ 'security.login.username'|trans }}" 
    password-placeholder="{{ 'security.login.password'|trans }}"
    remember-label="{{ 'security.login.remember_me'|trans }}"
    submit-url="{{ path('fos_user_security_check') }}"
    form-title="Welcome to Exchange"
    background-image="/build/images/LoginComponents/back.jpg"
    feedback-email="evrinoma@gmail.com"
    remember-me
    {% if error %}
    error-message="{{ error.messageKey|trans(error.messageData, 'security') }}"
    {% endif %}
  />
</div>
```

В папке '../components/LoginComponents/images/back.jpg' хранится картинка фона по умолчанию.

## Настройка

Доступные параметры LoginWrapper на 08.10.2020

[в js-файле (в html) - описание]:

- UserNamePlaceholder (user-name-placeholder) - placeholder для поля имя пользователя
- PasswordPlaceholder (password-placeholder) - placeholder для поля с паролем
- RememberLabel (remember-label) - если присвоено значение. то появлется checkbox remrmber_me с данной подписью
- FormTitle (form-title) - звголовок формы
- SubmitUrl (submit-url) - путь для action формы
- BackgroundImage (background-image)* - фоновая картинк, 
  - если картинка задана в js-файле через LoginWrapper.props.BackgroundImage.default = "...",
  - то она перекроет картинку по умолчанию подгружаемую из "assets\components\LoginComponents\images\back.jpg",
  - если картинка задана как атрибут div-а в HTML-файле, то она перекроет все другие (в js и по умолчанию)...
- FeedbackEmail (feedback-email) - E-mail для обратной связи, если задан, то справа появится надпись с предложением написать вопрос
- ErrorMessage (error-message) - сообщение об ощибке, если указано, то сверху формы будет выведено предупреждение
- RememberMe (remember-me) - флаг, показывать или нет поле "Remember Me" на форме, по умолчанию не показывается

`*` в данной сборке WebPack настроен на копирование всего содержимого папки "assets/images" в папку "public/images"
