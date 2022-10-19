const isAuthenticated = (state) => !!state.auth.access_token;
const getToken = (state) => state.auth.access_token;
const getUser = (state) => state.auth.user;
const getLoading = (state) => state.auth.loading;

const exports = { isAuthenticated, getToken, getUser, getLoading };
export default exports;
