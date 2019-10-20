import { shallowMount } from "@vue/test-utils";
import TagPreview from "@/components/TagPreview";

function getTagWrapper() {
    const wrapper = shallowMount(TagPreview, {
        propsData: { tag : 'testing',
          disabled: true },
          stubs: ['router-link']
    });
    return wrapper;
}

describe("TagPreview.vue", () => {
  it("renders tag when passed", () => {
    const wrapper = getTagWrapper();
    
    expect(wrapper.text()).toMatch('testing');
  }),
  
  it("tag selected function should emit click once clicked", () => {
    const wrapper = getTagWrapper();
    
    wrapper.vm.$emit("click");
    expect(wrapper.emitted().click.length).toBe(1);
  });
});



