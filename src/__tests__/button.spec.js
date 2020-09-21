import {
    shallowMount
} from '@vue/test-utils'

import VButton from '../components/VButton'


describe('VButton', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = shallowMount(VButton)
    })

    it('btn-primary aplicado quando usado a propriedade primary', async () => {
        await wrapper.setProps({
            primary: true
        });
        expect(wrapper.classes('btn-primary')).toBeTruthy();
    });

    it('btn-spot aplicado quando usado a propriedade spot', async () => {
        await wrapper.setProps({
            spot:true
        });
        expect(wrapper.classes('btn-spot')).toBeTruthy();
    });

    it('w-100 aplicado quando usado a propriedade block', async ()=>{
        await wrapper.setProps({
            block:true
        });
        expect(wrapper.classes('w-100')).toBeTruthy();
    });

    it('Emissão do evento click', async ()=>{
        wrapper.vm.$emit('click', 2);
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted('click')[0][0]).toEqual(2)
    })

    it('Emissão do evendo click String', async () => {
        wrapper.vm.$emit('click', 'testando');
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('click')[1][0]).toBe('testando')
    })
})