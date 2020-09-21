import { shallowMount } from '@vue/test-utils'

import App from '../App'


describe('App', ()=>{
    let wrapper;

    beforeAll(() => {
        wrapper = shallowMount(App)
    })
    
    afterEach(()=>{
        wrapper.destroy()
    })

    test('Verfificar se é uma instância Vue ', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

})