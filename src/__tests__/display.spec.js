import {
    shallowMount
} from '@vue/test-utils'

import Display from '../components/Display'


describe('Display', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = shallowMount(Display, {
            propsData: {
                value: 20,
                test: ['20+', '10+']
            }
        })
    })

    it('A propriedade value foi iniciada', () => {
        expect(wrapper.props().value).toBe(20);
    });

    it('A propriedade test foi iniciada', () => {
        expect(wrapper.props().test).toEqual(['20+', '10+'])
    })

    it('Se o método computado history() recebe e retorna a propriedade test', () => {
        expect(wrapper.vm.history).toBe('20+ 10=')
    });

    it('Se test conter apenas 1 chave retorna o próprio valor', async () => {
        const test = ['10+']
        await wrapper.setProps({ test });
        expect(wrapper.vm.history).toBe(test[0])
    });

})