import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "ADD_POST":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content
        }
      ];

    case "DELETE_POST":
      return state.filter(state => state.id !== action.payload);

    case "EDIT_POST":
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });

    default:
      return state;
  }
};

const addBlogPost = dispatch => {
  return (title, content, callback) => {
    dispatch({
      type: "ADD_POST",
      payload: {
        title,
        content
      }
    });
    callback ? callback() : null;
  };
};

const deleteBlogPost = dispatch => {
  return id => {
    dispatch({
      type: "DELETE_POST",
      payload: id
    });
  };
};

const editBlogPost = dispatch => {
  return (id, title, content, callback) => {
    dispatch({
      type: "EDIT_POST",
      payload: {
        id,
        title,
        content
      }
    });
    callback ? callback() : null;
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{ title: "Test Post", content: "Test content", id: 1 }]
);
