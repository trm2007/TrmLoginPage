// Импортируем метод `mount()` из `vue-test-utils`
import { mount } from '@vue/test-utils';
// и компонент, который хотим протестировать
import LoginPage from '../index.js';
// сам Vue понадобится, чтобы проверить, что LoginPage является его экземпляром
import Vue from 'vue';

/**
 * @jest-environment jsdom
 */

describe('Компонент LoginPage', () => {
    // Теперь монтируем компонент и получаем wrapper с установленным props.SubmitUrl и FormTitle
    const wrapper = mount(LoginPage, { propsData: { SubmitUrl: "login", FormTitle: "Test title" } });
    // Вы можете получить доступ к экземпляру Vue через `wrapper.vm`
    //const vm = wrapper.vm;
    it("Имеет свойство SubmitUrl", () => {
        expect(wrapper.props().SubmitUrl).toBe("login");
    });

    // Чтобы изучить wrapper подробнее, просто выведите его в консоль
    // и ваши приключения с `vue-test-utils` начнутся
    //console.log(wrapper);

    // test('является экземпляром Vue', () => {
    // expect(wrapper.isVueInstance()).toBeTruthy();
    // });
    it('является экземпляром Vue', () => {
        expect(wrapper.vm).toEqual(expect.any(Vue));
    });


    it('содержит заголовок', () => {
        expect(wrapper.html()).toContain("class=\"login-div\"");
    })

    //также легко проверить наличие других элементов
    it('имеет кнопку', () => {
        expect(wrapper.find("button").exists()).toBe(true);
    })
    //  console.log("wrapper.find('button')->", expect(wrapper.find("button").exists()).toBe(true) );
})