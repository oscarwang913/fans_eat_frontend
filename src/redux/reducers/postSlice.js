import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPostsAPI,
  createPostAPI,
  createPostLikeAPI,
  getAllLikedPostsAPI,
  getAllOwnPostsAPI,
  getTotalPostCountAPI,
  getPostByIdAPI,
} from "../../services/postAPI";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: [],
    allOwnPosts: [],
    singlePost: "",
    totalPostCount: null,
    currentPage: 1,
    newPost: null,
    totalLikeCount: null,
    isLoadingPosts: false,
    isLoadingLikeCount: false,
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPosts = action.payload;
    },
    setIsLoadingLikeCount: (state, action) => {
      state.isLoadingLikeCount = action.payload;
    },
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setTotalPostCount: (state, action) => {
      state.totoalPostCount = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setNewPost: (state, action) => {
      state.newPost = action.payload;
    },
    setTotalLikeCount: (state, action) => {
      state.totalLikeCount = action.payload;
    },
    setAllOwnPosts: (state, action) => {
      state.allOwnPosts = action.payload;
    },
    setSinglePost: (state, action) => {
      state.singlePost = action.payload;
    },
    reset: (state) => {
      state.singlePost = "";
    },
  },
});

export const {
  setIsLoadingPost,
  setAllPosts,
  setTotalPostCount,
  setCurrentPage,
  setNewPost,
  setTotalLikeCount,
  setIsLoadingLikeCount,
  setAllOwnPosts,
  setSinglePost,
  reset,
} = postSlice.actions;

export const getTotalPostCounut = () => (dispatch) => {
  getTotalPostCountAPI().then((res) => {
    if (res.success === false) {
      return;
    }
    dispatch(setTotalPostCount(res.count));
  });
};

export const resetSinglePost = () => (dispatch) => {
  dispatch(reset());
};

export const getAllPost = (page, limit) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getAllPostsAPI(page, limit)
    .then((res) => {
      dispatch(setIsLoadingPost(false));
      if (res.auth === false) {
        return;
      }
      dispatch(setAllPosts(res.posts));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllOwnPosts = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getAllOwnPostsAPI(id)
    .then((res) => {
      dispatch(setIsLoadingPost(false));
      if (res.success === false) {
        return;
      }
      dispatch(setAllOwnPosts(res.posts));
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createPost = (content, file, userId) => (dispatch) => {
  return createPostAPI(content, file, userId).then((res) => {
    if (res.success === false) {
      return;
    }
    dispatch(setNewPost(res));
    return res;
  });
};

export const getTotalLikeCount = () => (dispatch) => {
  getAllLikedPostsAPI().then((res) => {
    if (res.success === false) {
      return;
    }
    dispatch(setTotalLikeCount(res.result));
  });
};

export const createPostLike = (postId) => (dispatch) => {
  dispatch(setIsLoadingLikeCount(true));
  return createPostLikeAPI(postId).then((res) => {
    dispatch(setIsLoadingLikeCount(false));
    if (res.success === false) {
      return res.message;
    }
    dispatch(getTotalLikeCount());
    return res.message;
  });
};

export const getSinglePost = (id) => (dispatch) => {
  return getPostByIdAPI(id).then((res) => {
    if (res.success === false) {
      return res.message;
    }
    dispatch(setSinglePost(res));
    return res;
  });
};
export const selectTotalPostCount = (state) => state.post.totoalPostCount;
export const selectallPosts = (state) => state.post.allPosts;
export const selectallOwnPosts = (state) => state.post.allOwnPosts;
export const selectSinglePost = (state) => state.post.singlePost;
export const selectCurrentPage = (state) => state.post.currentPage;
export const selectTotalLikeCount = (state) => state.post.totalLikeCount;
export const selectIsLoadingPost = (state) => state.post.isLoadingPosts;
export const selectIsLoadingLikeCount = (state) =>
  state.post.isLoadingLikeCount;

export default postSlice.reducer;
