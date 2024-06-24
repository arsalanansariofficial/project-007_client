export const state_authenticated_user = {
  details: Object(),
  message: String(),
  name: String(),
  status: Number(200),
  jwt: String(),
  user: {
    id: Number(0),
    blocked: Boolean(false),
    confirmed: Boolean(true),
    email: String(),
    provider: String(),
    username: String(),
    createdAt: String(),
    updatedAt: String()
  }
};