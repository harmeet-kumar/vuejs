import { shallowMount } from "@vue/test-utils";
import UserPreview from "@/components/UserPreview";

const article = {
    slug: "how-to-train-your-dragon",
    title: "How to train your dragon",
    description: "Ever wonder how?",
    body: "It takes a Jacobian",
    tagList: ["dragons", "training"],
    createdAt: "2016-02-18T03:22:56.637Z",
    updatedAt: "2016-02-18T03:48:35.824Z",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "jake",
      bio: "I work at statefarm",
      image: "https://i.stack.imgur.com/xHWG8.jpg",
      following: false
    }
  };

describe("UserPreview.vue", () => {
  it("renders user details like edit, delete for article when the article is created by the user himself", () => {
    
    const wrapper = shallowMount(UserPreview, {
      propsData: { article : article,
        isAdmin: true },
        stubs: ['router-link']
    });
    expect(wrapper.text()).toMatch(article.author.username);
    expect(wrapper.text()).toMatch('Edit Article');
    expect(wrapper.text()).toMatch('Delete Article');
  }),
  
  it("renders details like Follow or favourite article when the article is not created by the user himself", () => {
    const wrapper = shallowMount(UserPreview, {
      propsData: { article : article,
        isAdmin: false },
        stubs: ['router-link']
    });
    expect(wrapper.text()).toMatch(article.author.username);
    expect(wrapper.text()).toMatch('Follow');
    expect(wrapper.text()).toMatch('Favorite Post');
  });
});
