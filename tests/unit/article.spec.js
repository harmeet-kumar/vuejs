import { shallowMount } from "@vue/test-utils";
import ArticlePreview from "@/components/ArticlePreview";

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

function getArticleWrapper(){
      const wrapper = shallowMount(ArticlePreview, {
        propsData: { article : article,
          name: article.slug },
          stubs: ['router-link']
      })
      return wrapper;
}

describe("ArticlePreview.vue", () => {
  it("renders article when passed", () => {
    const wrapper = getArticleWrapper();
    
    expect(wrapper.text()).toMatch(article.title);
  }),
  it("favourite button clicked on article", () => {
    const wrapper = getArticleWrapper();
    
    wrapper.vm.$emit("click");
    expect(wrapper.emitted().click.length).toBe(1);
  })
});
