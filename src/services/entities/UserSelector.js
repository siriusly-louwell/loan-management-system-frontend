export const selectUserEntity = (state) => {
  const dto = state.auth.user;
  return dto ? new User(dto) : null;
};